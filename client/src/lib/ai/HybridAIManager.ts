import { 
  LLMProvider, 
  AIRequest, 
  AIResponse, 
  HybridAIConfig,
  AIProviderError,
  AITimeoutError 
} from './types';
import { OpenAIProvider } from './providers/OpenAIProvider';
import { AnthropicProvider } from './providers/AnthropicProvider';
import { GoogleGeminiProvider } from './providers/GoogleGeminiProvider';
import { BusinessLogicProvider } from './providers/BusinessLogicProvider';

export class HybridAIManager {
  private providers: Map<string, LLMProvider> = new Map();
  private config: HybridAIConfig;
  private businessLogicProvider: BusinessLogicProvider;

  constructor(config: HybridAIConfig) {
    this.config = config;
    this.businessLogicProvider = new BusinessLogicProvider();
    this.initializeProviders();
  }

  private initializeProviders(): void {
    // Initialize providers based on environment variables
    const env = this.getEnvironmentConfig();

    // OpenAI Provider
    if (env.openai.enabled) {
      this.providers.set('openai', new OpenAIProvider(env.openai));
    }

    // Anthropic Provider
    if (env.anthropic.enabled) {
      this.providers.set('anthropic', new AnthropicProvider(env.anthropic));
    }

    // Google Gemini Provider
    if (env.google.enabled) {
      this.providers.set('google', new GoogleGeminiProvider(env.google));
    }

    // Always add business logic as fallback
    this.providers.set('business-logic', this.businessLogicProvider);
  }

  private getEnvironmentConfig() {
    return {
      openai: {
        name: 'openai',
        apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
        maxTokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || '1000'),
        temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE || '0.7'),
        enabled: !!(import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY !== 'your-openai-api-key-here'),
        timeout: parseInt(import.meta.env.VITE_AI_RESPONSE_TIMEOUT || '30000'),
      },
      anthropic: {
        name: 'anthropic',
        apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
        model: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
        maxTokens: parseInt(import.meta.env.VITE_ANTHROPIC_MAX_TOKENS || '1000'),
        enabled: !!(import.meta.env.VITE_ANTHROPIC_API_KEY && import.meta.env.VITE_ANTHROPIC_API_KEY !== 'your-anthropic-api-key-here'),
        timeout: parseInt(import.meta.env.VITE_AI_RESPONSE_TIMEOUT || '30000'),
      },
      google: {
        name: 'google',
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
        model: import.meta.env.VITE_GOOGLE_MODEL || 'gemini-2.0-flash',
        maxTokens: parseInt(import.meta.env.VITE_GOOGLE_MAX_TOKENS || '1000'),
        enabled: !!(import.meta.env.VITE_GOOGLE_API_KEY && import.meta.env.VITE_GOOGLE_API_KEY !== 'your-google-api-key-here'),
        timeout: parseInt(import.meta.env.VITE_AI_RESPONSE_TIMEOUT || '30000'),
      },
    };
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    console.log('🎯 HybridAIManager.generateResponse called');

    // Try providers in order of preference
    const providerOrder = this.getProviderOrder();
    console.log('🎯 Provider order:', providerOrder);

    for (const providerName of providerOrder) {
      console.log(`🎯 Trying provider: ${providerName}`);

      try {
        const provider = this.providers.get(providerName);
        if (!provider) {
          console.warn(`🎯 Provider ${providerName} not found, skipping...`);
          continue;
        }

        // Check if provider is available (skip for business logic)
        if (providerName !== 'business-logic') {
          console.log(`🎯 Checking availability for ${providerName}...`);
          const isAvailable = await provider.isAvailable();
          console.log(`🎯 Provider ${providerName} available: ${isAvailable}`);

          if (!isAvailable) {
            console.warn(`🎯 Provider ${providerName} is not available, trying next...`);
            continue;
          }
        }

        console.log(`🎯 Attempting to generate response using ${providerName}...`);

        // Generate response with timeout
        const response = await Promise.race([
          provider.generateResponse(request),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new AITimeoutError(providerName, this.config.timeout)), this.config.timeout)
          )
        ]);

        console.log(`🎯 Response from ${providerName}:`, response);

        // Check if response meets confidence threshold (except for business logic)
        if (providerName !== 'business-logic' && response.confidence < this.config.confidenceThreshold) {
          console.warn(`🎯 Response from ${providerName} below confidence threshold (${response.confidence}), trying next...`);
          continue;
        }

        // Enhance response with hybrid logic
        console.log(`🎯 Enhancing response from ${providerName}...`);
        const enhancedResponse = await this.enhanceResponse(response, request, providerName);

        console.log(`🎯 Successfully generated response using ${providerName} in ${Date.now() - startTime}ms`);
        console.log(`🎯 Final enhanced response:`, enhancedResponse);
        return enhancedResponse;

      } catch (error) {
        console.error(`🎯 Error with provider ${providerName}:`, error);

        // If this is the last provider, throw the error
        if (providerName === providerOrder[providerOrder.length - 1]) {
          console.error(`🎯 Last provider ${providerName} failed, throwing error`);
          throw error;
        }

        // Otherwise, continue to next provider
        console.log(`🎯 Continuing to next provider after ${providerName} failed`);
        continue;
      }
    }

    // This should never happen since business logic is always last
    console.error('🎯 All AI providers failed - this should not happen!');
    throw new Error('All AI providers failed');
  }

  private getProviderOrder(): string[] {
    // Start with configured fallback order
    let order = this.config.fallbackProviders.slice();
    
    // Ensure business logic is always last
    order = order.filter(p => p !== 'business-logic');
    order.push('business-logic');
    
    // Filter to only include available providers
    return order.filter(name => this.providers.has(name));
  }

  private async enhanceResponse(
    response: AIResponse, 
    request: AIRequest, 
    providerName: string
  ): Promise<AIResponse> {
    // If business logic is enabled, enhance AI responses with business context
    if (this.config.useBusinessLogic && providerName !== 'business-logic') {
      try {
        // Get business logic insights
        const businessResponse = await this.businessLogicProvider.generateResponse(request);
        
        // Merge insights
        response.metadata = {
          ...response.metadata,
          businessLogicIntent: businessResponse.metadata?.intent,
          hybridConfidence: (response.confidence + businessResponse.confidence) / 2,
        };

        // Add business-specific follow-up suggestions
        if (businessResponse.metadata?.intent) {
          response.metadata.followUpSuggestions = this.generateFollowUpSuggestions(
            businessResponse.metadata.intent
          );
        }
      } catch (error) {
        console.warn('Failed to enhance response with business logic:', error);
      }
    }

    return response;
  }

  private generateFollowUpSuggestions(intent: string): string[] {
    const suggestions: Record<string, string[]> = {
      'sales_optimization': [
        'Show me ROI calculator',
        'Schedule a demo',
        'See case studies',
        'Learn about pricing',
      ],
      'inventory_management': [
        'Demo inventory features',
        'Calculate inventory savings',
        'See integration options',
        'Learn about automation',
      ],
      'customer_analytics': [
        'View sample reports',
        'See customer segmentation',
        'Learn about privacy',
        'Schedule consultation',
      ],
      'pricing_inquiry': [
        'Calculate my ROI',
        'See pricing plans',
        'Start free trial',
        'Schedule consultation',
      ],
      'demo_request': [
        'Schedule 15-min demo',
        'Schedule 30-min demo',
        'Request custom workshop',
        'See demo video',
      ],
    };

    return suggestions[intent] || [
      'Learn more about features',
      'See pricing',
      'Schedule demo',
      'Contact sales',
    ];
  }

  // Health check for all providers
  async getProviderStatus(): Promise<Record<string, { available: boolean; model: string; features: string[] }>> {
    const status: Record<string, any> = {};
    
    for (const [name, provider] of this.providers) {
      try {
        const available = await provider.isAvailable();
        const modelInfo = provider.getModelInfo();
        
        status[name] = {
          available,
          model: modelInfo.name,
          features: modelInfo.supportedFeatures,
        };
      } catch (error) {
        status[name] = {
          available: false,
          model: 'unknown',
          features: [],
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }
    
    return status;
  }

  // Update configuration at runtime
  updateConfig(newConfig: Partial<HybridAIConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current configuration
  getConfig(): HybridAIConfig {
    return { ...this.config };
  }
}
