// Main AI Service exports
export { AIService } from './AIService';
export { HybridAIManager } from './HybridAIManager';

// Configuration exports
export { createAIConfig, validateAIEnvironment, getAIConfigSummary } from './AIConfig';

// Type exports
export type {
  AIMessage,
  AIResponse,
  AIRequest,
  LLMProvider,
  AIProviderConfig,
  HybridAIConfig,
  BusinessLogicResponse,
} from './types';

// Error exports
export {
  AIProviderError,
  AITimeoutError,
  AIQuotaExceededError,
} from './types';

// Provider exports
export { OpenAIProvider } from './providers/OpenAIProvider';
export { AnthropicProvider } from './providers/AnthropicProvider';
export { GoogleGeminiProvider } from './providers/GoogleGeminiProvider';
export { BusinessLogicProvider } from './providers/BusinessLogicProvider';
export { BaseLLMProvider } from './BaseLLMProvider';

// Convenience function to get AI service instance
export const getAIService = () => AIService.getInstance();
