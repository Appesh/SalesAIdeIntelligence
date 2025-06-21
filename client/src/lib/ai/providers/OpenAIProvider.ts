import { BaseLLMProvider } from '../BaseLLMProvider';
import { AIRequest, AIResponse, AIProviderConfig, AIMessage } from '../types';

export class OpenAIProvider extends BaseLLMProvider {
  name = 'openai';

  constructor(config: AIProviderConfig) {
    super(config);
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    try {
      const messages = this.prepareMessages(request);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages,
          max_tokens: request.options?.maxTokens || this.config.maxTokens,
          temperature: request.options?.temperature || this.config.temperature || 0.7,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';
      
      return {
        content,
        confidence: this.calculateConfidence(content, request),
        provider: this.name,
        model: this.config.model,
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
        },
        metadata: {
          intent: this.extractIntent(content),
          sentiment: this.extractSentiment(content),
          businessContext: this.extractBusinessContext(content, request.context),
        },
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  validateConfig(): boolean {
    return this.validateCommonConfig() && 
           !!this.config.apiKey && 
           this.config.apiKey.startsWith('sk-');
  }

  getModelInfo() {
    const modelInfo: Record<string, any> = {
      'gpt-4': {
        name: 'GPT-4',
        maxTokens: 8192,
        supportedFeatures: ['chat', 'function-calling', 'json-mode'],
      },
      'gpt-4-turbo': {
        name: 'GPT-4 Turbo',
        maxTokens: 128000,
        supportedFeatures: ['chat', 'function-calling', 'json-mode', 'vision'],
      },
      'gpt-3.5-turbo': {
        name: 'GPT-3.5 Turbo',
        maxTokens: 4096,
        supportedFeatures: ['chat', 'function-calling'],
      },
    };

    return modelInfo[this.config.model] || {
      name: this.config.model,
      maxTokens: this.config.maxTokens,
      supportedFeatures: ['chat'],
    };
  }

  private prepareMessages(request: AIRequest): any[] {
    const messages: any[] = [];
    
    // Add system prompt
    messages.push({
      role: 'system',
      content: this.createSystemPrompt(request.context),
    });

    // Add conversation history
    messages.push(...this.formatMessages(request.messages));

    return messages;
  }

  private extractIntent(content: string): string {
    // Simple intent extraction based on content analysis
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
    // Simple sentiment analysis
    const positiveWords = ['great', 'excellent', 'amazing', 'perfect', 'love', 'fantastic'];
    const negativeWords = ['problem', 'issue', 'difficult', 'struggling', 'frustrated'];
    
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
