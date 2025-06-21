import { BaseLLMProvider } from '../BaseLLMProvider';
import { AIRequest, AIResponse, AIProviderConfig } from '../types';

export class GoogleGeminiProvider extends BaseLLMProvider {
  name = 'google';

  constructor(config: AIProviderConfig) {
    super(config);
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    console.log('🔥 GoogleGeminiProvider.generateResponse called');
    console.log('🔥 Config:', this.config);
    console.log('🔥 Request:', request);
    console.log('🔥 User message:', request.messages?.[request.messages.length - 1]?.content);

    try {
      const content = this.prepareContent(request);
      console.log('🔥 Prepared content:', content);

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent?key=${this.config.apiKey}`;
      console.log('🔥 API URL:', url);

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: content
              }
            ]
          }
        ],
        generationConfig: {
          temperature: request.options?.temperature || this.config.temperature || 0.7,
          maxOutputTokens: request.options?.maxTokens || this.config.maxTokens,
          topP: 0.8,
          topK: 10
        }
      };

      console.log('🔥 Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('🔥 Response status:', response.status);
      console.log('🔥 Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('🔥 Gemini API error:', errorData);
        throw new Error(`Google Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('🔥 Gemini API response:', data);

      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log('🔥 Extracted response text:', responseText);
      console.log('🔥 ===== GEMINI RESPONSE =====');
      console.log('🔥', responseText);
      console.log('🔥 ===========================');

      if (!responseText) {
        console.error('🔥 No response text received from Gemini');
        throw new Error('No response text received from Gemini');
      }
      
      const aiResponse = {
        content: responseText,
        confidence: this.calculateConfidence(responseText, request),
        provider: this.name,
        model: this.config.model,
        usage: {
          promptTokens: data.usageMetadata?.promptTokenCount || 0,
          completionTokens: data.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: data.usageMetadata?.totalTokenCount || 0,
        },
        metadata: {
          intent: this.extractIntent(responseText),
          sentiment: this.extractSentiment(responseText),
          businessContext: this.extractBusinessContext(responseText, request.context),
          finishReason: data.candidates?.[0]?.finishReason,
        },
      };

      console.log('🔥 Final AI response:', aiResponse);
      return aiResponse;
    } catch (error) {
      console.error('🔥 GoogleGeminiProvider error:', error);
      throw this.handleError(error);
    }
  }

  validateConfig(): boolean {
    return this.validateCommonConfig() && 
           !!this.config.apiKey && 
           this.config.apiKey.length > 10; // Basic API key validation
  }

  getModelInfo() {
    const modelInfo: Record<string, any> = {
      'gemini-pro': {
        name: 'Gemini Pro',
        maxTokens: 30720,
        supportedFeatures: ['chat', 'reasoning', 'code-generation'],
      },
      'gemini-2.0-flash': {
        name: 'Gemini 2.0 Flash',
        maxTokens: 8192,
        supportedFeatures: ['chat', 'fast-response', 'reasoning'],
      },
      'gemini-1.5-pro': {
        name: 'Gemini 1.5 Pro',
        maxTokens: 2097152,
        supportedFeatures: ['chat', 'long-context', 'reasoning', 'multimodal'],
      },
      'gemini-1.5-flash': {
        name: 'Gemini 1.5 Flash',
        maxTokens: 1048576,
        supportedFeatures: ['chat', 'fast-response', 'long-context'],
      },
    };

    return modelInfo[this.config.model] || {
      name: this.config.model,
      maxTokens: this.config.maxTokens,
      supportedFeatures: ['chat'],
    };
  }

  private prepareContent(request: AIRequest): string {
    // Combine system prompt with conversation
    let content = this.createSystemPrompt(request.context) + '\n\n';
    
    // Add conversation history
    const conversationHistory = request.messages
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
    
    content += 'Conversation:\n' + conversationHistory;
    
    return content;
  }

  private extractIntent(content: string): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('demo') || lowerContent.includes('demonstration')) {
      return 'demo_request';
    }
    if (lowerContent.includes('price') || lowerContent.includes('cost') || lowerContent.includes('pricing')) {
      return 'pricing_inquiry';
    }
    if (lowerContent.includes('sales') || lowerContent.includes('revenue')) {
      return 'sales_optimization';
    }
    if (lowerContent.includes('inventory') || lowerContent.includes('stock')) {
      return 'inventory_management';
    }
    if (lowerContent.includes('customer') || lowerContent.includes('analytics')) {
      return 'customer_analytics';
    }
    
    return 'general_inquiry';
  }

  private extractSentiment(content: string): string {
    const positiveWords = ['great', 'excellent', 'amazing', 'perfect', 'love', 'fantastic', 'wonderful'];
    const negativeWords = ['problem', 'issue', 'difficult', 'struggling', 'frustrated', 'disappointed'];
    
    const lowerContent = content.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private extractBusinessContext(content: string, context?: any): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('small business') || lowerContent.includes('startup')) {
      return 'small_business';
    }
    if (lowerContent.includes('enterprise') || lowerContent.includes('large company')) {
      return 'enterprise';
    }
    if (lowerContent.includes('retail') || lowerContent.includes('store')) {
      return 'retail';
    }
    if (lowerContent.includes('ecommerce') || lowerContent.includes('online')) {
      return 'ecommerce';
    }
    
    return context?.businessType || 'general';
  }
}
