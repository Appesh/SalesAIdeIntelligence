import { BaseLLMProvider } from '../BaseLLMProvider';
import { AIRequest, AIResponse, AIProviderConfig } from '../types';

export class AnthropicProvider extends BaseLLMProvider {
  name = 'anthropic';

  constructor(config: AIProviderConfig) {
    super(config);
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    try {
      const messages = this.prepareMessages(request);
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: request.options?.maxTokens || this.config.maxTokens,
          temperature: request.options?.temperature || this.config.temperature || 0.7,
          system: this.createSystemPrompt(request.context),
          messages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Anthropic API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.content[0]?.text || '';
      
      return {
        content,
        confidence: this.calculateConfidence(content, request),
        provider: this.name,
        model: this.config.model,
        usage: {
          promptTokens: data.usage?.input_tokens || 0,
          completionTokens: data.usage?.output_tokens || 0,
          totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
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
           !!this.config.apiKey;
  }

  getModelInfo() {
    const modelInfo: Record<string, any> = {
      'claude-3-opus-20240229': {
        name: 'Claude 3 Opus',
        maxTokens: 200000,
        supportedFeatures: ['chat', 'analysis', 'reasoning'],
      },
      'claude-3-sonnet-20240229': {
        name: 'Claude 3 Sonnet',
        maxTokens: 200000,
        supportedFeatures: ['chat', 'analysis', 'reasoning'],
      },
      'claude-3-haiku-20240307': {
        name: 'Claude 3 Haiku',
        maxTokens: 200000,
        supportedFeatures: ['chat', 'fast-response'],
      },
    };

    return modelInfo[this.config.model] || {
      name: this.config.model,
      maxTokens: this.config.maxTokens,
      supportedFeatures: ['chat'],
    };
  }

  private prepareMessages(request: AIRequest): any[] {
    // Claude expects messages without system role in the messages array
    return request.messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      }));
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
