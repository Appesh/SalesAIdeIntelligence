// Universal AI/LLM Types and Interfaces

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface AIResponse {
  content: string;
  confidence: number;
  provider: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  metadata?: {
    intent?: string;
    sentiment?: string;
    businessContext?: string;
    followUpSuggestions?: string[];
  };
}

export interface AIProviderConfig {
  name: string;
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature?: number;
  baseUrl?: string;
  timeout?: number;
  enabled: boolean;
}

export interface AIRequest {
  messages: AIMessage[];
  context?: {
    businessType?: string;
    userInfo?: any;
    conversationStage?: string;
    previousIntent?: string;
  };
  options?: {
    maxTokens?: number;
    temperature?: number;
    stream?: boolean;
  };
}

// Universal LLM Provider Interface
export interface LLMProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  generateResponse(request: AIRequest): Promise<AIResponse>;
  validateConfig(): boolean;
  getModelInfo(): {
    name: string;
    maxTokens: number;
    supportedFeatures: string[];
  };
}

// Hybrid AI Configuration
export interface HybridAIConfig {
  primaryProvider: string;
  fallbackProviders: string[];
  useBusinessLogic: boolean;
  confidenceThreshold: number;
  timeout: number;
  retryAttempts: number;
}

// Business Logic Response (for fallback)
export interface BusinessLogicResponse {
  content: string;
  type: 'text' | 'options' | 'form';
  options?: string[];
  intent: string;
  confidence: number;
  contextUpdate?: any;
}

// Error types for AI operations
export class AIProviderError extends Error {
  constructor(
    message: string,
    public provider: string,
    public code?: string,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'AIProviderError';
  }
}

export class AITimeoutError extends AIProviderError {
  constructor(provider: string, timeout: number) {
    super(`AI request timed out after ${timeout}ms`, provider, 'TIMEOUT', true);
    this.name = 'AITimeoutError';
  }
}

export class AIQuotaExceededError extends AIProviderError {
  constructor(provider: string) {
    super(`API quota exceeded for provider ${provider}`, provider, 'QUOTA_EXCEEDED', false);
    this.name = 'AIQuotaExceededError';
  }
}
