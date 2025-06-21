import { HybridAIConfig } from './types';

// Default configuration for the hybrid AI system
export const DEFAULT_AI_CONFIG: HybridAIConfig = {
  primaryProvider: 'openai',
  fallbackProviders: ['openai', 'anthropic', 'business-logic'],
  useBusinessLogic: true,
  confidenceThreshold: 0.8,
  timeout: 30000,
  retryAttempts: 2,
};

// Environment-based configuration
export function createAIConfig(): HybridAIConfig {
  const envProvider = import.meta.env.VITE_AI_PROVIDER || 'hybrid';
  const fallbackOrder = import.meta.env.VITE_HYBRID_FALLBACK_ORDER?.split(',') || DEFAULT_AI_CONFIG.fallbackProviders;

  return {
    primaryProvider: envProvider === 'hybrid' ? 'google' : envProvider,
    fallbackProviders: fallbackOrder,
    useBusinessLogic: import.meta.env.VITE_HYBRID_USE_BUSINESS_LOGIC === 'true',
    confidenceThreshold: parseFloat(import.meta.env.VITE_HYBRID_AI_CONFIDENCE_THRESHOLD || '0.8'),
    timeout: parseInt(import.meta.env.VITE_AI_RESPONSE_TIMEOUT || '30000'),
    retryAttempts: parseInt(import.meta.env.VITE_AI_RETRY_ATTEMPTS || '2'),
  };
}

// Validate environment configuration
export function validateAIEnvironment(): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if at least one AI provider is configured
  const hasOpenAI = import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY !== 'your-openai-api-key-here';
  const hasAnthropic = import.meta.env.VITE_ANTHROPIC_API_KEY && import.meta.env.VITE_ANTHROPIC_API_KEY !== 'your-anthropic-api-key-here';
  const hasGoogle = import.meta.env.VITE_GOOGLE_API_KEY && import.meta.env.VITE_GOOGLE_API_KEY !== 'your-google-api-key-here';

  if (!hasOpenAI && !hasAnthropic && !hasGoogle) {
    warnings.push('No AI providers configured. System will fall back to business logic only.');
  }

  // Validate OpenAI configuration
  if (hasOpenAI) {
    if (!import.meta.env.VITE_OPENAI_MODEL) {
      warnings.push('VITE_OPENAI_MODEL not specified, using default: gpt-4');
    }

    const maxTokens = parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || '1000');
    if (maxTokens < 100 || maxTokens > 4000) {
      warnings.push('VITE_OPENAI_MAX_TOKENS should be between 100 and 4000 for optimal performance');
    }
  }

  // Validate Anthropic configuration
  if (hasAnthropic) {
    if (!import.meta.env.VITE_ANTHROPIC_MODEL) {
      warnings.push('VITE_ANTHROPIC_MODEL not specified, using default: claude-3-sonnet-20240229');
    }
  }

  // Validate hybrid configuration
  const confidenceThreshold = parseFloat(import.meta.env.VITE_HYBRID_AI_CONFIDENCE_THRESHOLD || '0.8');
  if (confidenceThreshold < 0.1 || confidenceThreshold > 1.0) {
    errors.push('VITE_HYBRID_AI_CONFIDENCE_THRESHOLD must be between 0.1 and 1.0');
  }

  const timeout = parseInt(import.meta.env.VITE_AI_RESPONSE_TIMEOUT || '30000');
  if (timeout < 5000 || timeout > 120000) {
    warnings.push('VITE_AI_RESPONSE_TIMEOUT should be between 5000ms and 120000ms for optimal performance');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// Get provider-specific configuration
export function getProviderConfig(providerName: string) {
  switch (providerName) {
    case 'openai':
      return {
        name: 'openai',
        apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
        maxTokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || '1000'),
        temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE || '0.7'),
        enabled: !!(import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY !== 'your-openai-api-key-here'),
        timeout: parseInt(import.meta.env.VITE_AI_RESPONSE_TIMEOUT || '30000'),
      };

    case 'anthropic':
      return {
        name: 'anthropic',
        apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
        model: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
        maxTokens: parseInt(import.meta.env.VITE_ANTHROPIC_MAX_TOKENS || '1000'),
        enabled: !!(import.meta.env.VITE_ANTHROPIC_API_KEY && import.meta.env.VITE_ANTHROPIC_API_KEY !== 'your-anthropic-api-key-here'),
        timeout: parseInt(import.meta.env.VITE_AI_RESPONSE_TIMEOUT || '30000'),
      };

    case 'google':
      return {
        name: 'google',
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
        model: import.meta.env.VITE_GOOGLE_MODEL || 'gemini-2.0-flash',
        maxTokens: parseInt(import.meta.env.VITE_GOOGLE_MAX_TOKENS || '1000'),
        enabled: !!(import.meta.env.VITE_GOOGLE_API_KEY && import.meta.env.VITE_GOOGLE_API_KEY !== 'your-google-api-key-here'),
        timeout: parseInt(import.meta.env.VITE_AI_RESPONSE_TIMEOUT || '30000'),
      };

    default:
      throw new Error(`Unknown provider: ${providerName}`);
  }
}

// Development helpers
export function getAIConfigSummary() {
  const config = createAIConfig();
  const validation = validateAIEnvironment();
  
  return {
    config,
    validation,
    availableProviders: {
      openai: !!(import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY !== 'your-openai-api-key-here'),
      anthropic: !!(import.meta.env.VITE_ANTHROPIC_API_KEY && import.meta.env.VITE_ANTHROPIC_API_KEY !== 'your-anthropic-api-key-here'),
      google: !!(import.meta.env.VITE_GOOGLE_API_KEY && import.meta.env.VITE_GOOGLE_API_KEY !== 'your-google-api-key-here'),
      businessLogic: true,
    },
  };
}
