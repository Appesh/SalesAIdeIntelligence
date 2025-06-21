import { 
  LLMProvider, 
  AIRequest, 
  AIResponse, 
  AIProviderConfig,
  AIProviderError,
  AITimeoutError 
} from './types';

export abstract class BaseLLMProvider implements LLMProvider {
  protected config: AIProviderConfig;
  
  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  abstract name: string;
  
  // Abstract methods that each provider must implement
  abstract generateResponse(request: AIRequest): Promise<AIResponse>;
  abstract validateConfig(): boolean;
  abstract getModelInfo(): { name: string; maxTokens: number; supportedFeatures: string[] };
  
  // Common implementation for availability check
  async isAvailable(): Promise<boolean> {
    if (!this.config.enabled || !this.validateConfig()) {
      return false;
    }
    
    try {
      // Simple health check - try a minimal request
      const healthCheckRequest: AIRequest = {
        messages: [
          { role: 'user', content: 'Hello' }
        ],
        options: { maxTokens: 10 }
      };
      
      await Promise.race([
        this.generateResponse(healthCheckRequest),
        new Promise((_, reject) => 
          setTimeout(() => reject(new AITimeoutError(this.name, 5000)), 5000)
        )
      ]);
      
      return true;
    } catch (error) {
      console.warn(`Provider ${this.name} is not available:`, error);
      return false;
    }
  }

  // Common utility methods
  protected createSystemPrompt(context?: any): string {
    const basePrompt = `You are Motivio AI, an intelligent sales assistant for retail businesses.
You help retailers optimize sales, manage inventory, and understand customers better.

Key capabilities:
• Sales optimization (average 40% increase)
• Inventory management and demand forecasting
• Customer analytics and segmentation
• Process automation
• ROI calculation and business insights

Brand voice: Direct, approachable, and encouraging.
Always focus on business value and practical solutions.

CRITICAL FORMATTING GUIDELINES:
- Use simple bullet points (•) for lists
- Use numbered lists (1., 2., 3.) for steps or processes
- Use PLAIN TEXT ONLY - no formatting symbols like ** or * or HTML
- Use line breaks to separate different topics
- Keep responses conversational but well-structured
- Ask engaging questions to continue the conversation
- Provide specific, actionable insights when possible
- NEVER include HTML tags, CSS styles, or markdown formatting
- Write in plain text that is easy to read without any special formatting`;

    if (context?.businessType) {
      return `${basePrompt}\n\nUser's business type: ${context.businessType}`;
    }
    
    if (context?.conversationStage) {
      return `${basePrompt}\n\nConversation stage: ${context.conversationStage}`;
    }

    return basePrompt;
  }

  protected handleError(error: any): AIProviderError {
    if (error instanceof AIProviderError) {
      return error;
    }

    // Common error patterns
    if (error.message?.includes('timeout')) {
      return new AITimeoutError(this.name, this.config.timeout || 30000);
    }

    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return new AIProviderError(
        `Rate limit or quota exceeded for ${this.name}`,
        this.name,
        'QUOTA_EXCEEDED',
        false
      );
    }

    if (error.message?.includes('unauthorized') || error.message?.includes('invalid key')) {
      return new AIProviderError(
        `Invalid API key for ${this.name}`,
        this.name,
        'INVALID_KEY',
        false
      );
    }

    // Generic error
    return new AIProviderError(
      `Unknown error in ${this.name}: ${error.message}`,
      this.name,
      'UNKNOWN',
      true
    );
  }

  protected validateCommonConfig(): boolean {
    return !!(
      this.config.name &&
      this.config.model &&
      this.config.maxTokens > 0
    );
  }

  // Helper to format messages for different providers
  protected formatMessages(messages: AIRequest['messages']): any[] {
    return messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  // Helper to extract usage information
  protected extractUsage(response: any): AIResponse['usage'] {
    // This will be overridden by specific providers
    return undefined;
  }

  // Helper to calculate confidence based on response quality
  protected calculateConfidence(response: string, request: AIRequest): number {
    // Basic confidence calculation - can be enhanced
    let confidence = 0.8; // Base confidence for AI responses

    // Increase confidence for longer, more detailed responses
    if (response.length > 100) confidence += 0.1;
    if (response.length > 300) confidence += 0.1;

    // Decrease confidence for very short responses
    if (response.length < 50) confidence -= 0.2;

    // Check for business-relevant keywords
    const businessKeywords = ['sales', 'inventory', 'customer', 'revenue', 'ROI', 'optimization'];
    const keywordMatches = businessKeywords.filter(keyword => 
      response.toLowerCase().includes(keyword)
    ).length;
    
    confidence += keywordMatches * 0.05;

    return Math.min(Math.max(confidence, 0.1), 1.0);
  }
}
