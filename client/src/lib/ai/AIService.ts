import { HybridAIManager } from './HybridAIManager';
import { createAIConfig, validateAIEnvironment } from './AIConfig';
import { AIRequest, AIResponse, AIMessage } from './types';
import { ConversationContext } from '../types';

export class AIService {
  private static instance: AIService;
  private hybridManager: HybridAIManager;
  private isInitialized: boolean = false;

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('🔄 AI Service already initialized');
      return;
    }

    console.log('🚀 Starting AI Service initialization...');

    try {
      // Validate environment
      console.log('🔍 Validating AI environment...');
      const validation = validateAIEnvironment();
      console.log('🔍 Environment validation result:', validation);

      if (!validation.isValid) {
        console.error('❌ AI Environment validation failed:', validation.errors);
        throw new Error(`AI configuration errors: ${validation.errors.join(', ')}`);
      }

      if (validation.warnings.length > 0) {
        console.warn('⚠️ AI Environment warnings:', validation.warnings);
      }

      // Create configuration
      console.log('⚙️ Creating AI configuration...');
      const config = createAIConfig();
      console.log('⚙️ AI service config:', config);

      // Initialize hybrid manager
      console.log('🔧 Initializing hybrid manager...');
      this.hybridManager = new HybridAIManager(config);

      // Test provider availability
      console.log('🏥 Testing provider availability...');
      const providerStatus = await this.hybridManager.getProviderStatus();
      console.log('🏥 AI Provider status:', providerStatus);

      this.isInitialized = true;
      console.log('✅ AI Service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize AI service:', error);
      throw error;
    }
  }

  public async generateChatResponse(
    userMessage: string,
    context: ConversationContext
  ): Promise<{
    content: string;
    type: 'text' | 'options' | 'form';
    options?: string[];
    metadata?: any;
  }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Convert conversation context to AI request format
      const aiRequest = this.createAIRequest(userMessage, context);
      
      // Generate response using hybrid AI
      const aiResponse = await this.hybridManager.generateResponse(aiRequest);
      
      // Convert AI response to chat format
      return this.convertToChatResponse(aiResponse, context);
    } catch (error) {
      console.error('Error generating AI chat response:', error);
      
      // Fallback to a generic error response
      return {
        content: "I apologize, but I'm having trouble processing your request right now. Let me connect you with our support team, or you can try asking your question again.",
        type: 'options',
        options: [
          'Try again',
          'Contact support',
          'See our FAQ',
          'Schedule a call'
        ],
        metadata: {
          error: true,
          fallback: true,
        },
      };
    }
  }

  private createAIRequest(userMessage: string, context: ConversationContext): AIRequest {
    // Convert previous messages to AI format
    const messages: AIMessage[] = [];
    
    // Add conversation history
    if (context.previousMessages) {
      for (const msg of context.previousMessages.slice(-5)) { // Last 5 messages for context
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content,
          timestamp: msg.timestamp,
        });
      }
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    });

    return {
      messages,
      context: {
        businessType: context.userInfo?.businessType,
        userInfo: context.userInfo,
        conversationStage: context.sessionContext?.qualificationStage,
        previousIntent: context.sessionContext?.userIntent,
      },
      options: {
        maxTokens: 800, // Reasonable limit for chat responses
        temperature: 0.7, // Balanced creativity and consistency
      },
    };
  }

  private convertToChatResponse(
    aiResponse: AIResponse,
    context: ConversationContext
  ): {
    content: string;
    type: 'text' | 'options' | 'form';
    options?: string[];
    metadata?: any;
  } {
    let responseType: 'text' | 'options' | 'form' = 'text';
    let options: string[] | undefined;

    // Determine response type based on content and metadata
    const content = aiResponse.content;
    const intent = aiResponse.metadata?.intent || aiResponse.metadata?.businessLogicIntent;

    // Add follow-up options for certain intents
    if (aiResponse.metadata?.followUpSuggestions) {
      responseType = 'options';
      options = aiResponse.metadata.followUpSuggestions;
    } else if (intent === 'demo_request') {
      responseType = 'options';
      options = [
        'Schedule 15-min demo',
        'Schedule 30-min demo',
        'See demo video',
        'More questions first'
      ];
    } else if (intent === 'pricing_inquiry') {
      responseType = 'options';
      options = [
        'Calculate my ROI',
        'See pricing plans',
        'Start free trial',
        'More questions first'
      ];
    } else if (intent === 'contact_sharing' || content.toLowerCase().includes('contact') || content.toLowerCase().includes('email')) {
      responseType = 'form';
    }

    return {
      content,
      type: responseType,
      options,
      metadata: {
        provider: aiResponse.provider,
        model: aiResponse.model,
        confidence: aiResponse.confidence,
        intent,
        sentiment: aiResponse.metadata?.sentiment,
        businessContext: aiResponse.metadata?.businessContext,
        usage: aiResponse.usage,
      },
    };
  }

  // Health check method
  public async getHealthStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    providers: Record<string, any>;
    lastCheck: Date;
  }> {
    if (!this.isInitialized) {
      return {
        status: 'unhealthy',
        providers: {},
        lastCheck: new Date(),
      };
    }

    try {
      const providerStatus = await this.hybridManager.getProviderStatus();
      const availableProviders = Object.values(providerStatus).filter(p => p.available).length;
      
      let status: 'healthy' | 'degraded' | 'unhealthy';
      if (availableProviders === 0) {
        status = 'unhealthy';
      } else if (availableProviders === 1 && providerStatus['business-logic']?.available) {
        status = 'degraded'; // Only business logic available
      } else {
        status = 'healthy';
      }

      return {
        status,
        providers: providerStatus,
        lastCheck: new Date(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        providers: { error: error instanceof Error ? error.message : 'Unknown error' },
        lastCheck: new Date(),
      };
    }
  }

  // Configuration methods
  public getConfiguration() {
    return this.hybridManager?.getConfig();
  }

  public updateConfiguration(newConfig: any) {
    if (this.hybridManager) {
      this.hybridManager.updateConfig(newConfig);
    }
  }
}
