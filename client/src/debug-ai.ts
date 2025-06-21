// Debug script to test AI service
import { AIService } from './lib/ai';
import { ChatService } from './lib/chatService';

// Add to window for browser console access
declare global {
  interface Window {
    debugAI: typeof debugAIService;
    debugChat: typeof debugChatService;
    testIntent: typeof testIntentDetection;
  }
}

export async function debugAIService() {
  console.log('🔍 Debugging AI Service...');

  try {
    // Get AI service instance
    const aiService = AIService.getInstance();
    console.log('✅ AI Service instance created');

    // Try to initialize
    console.log('🚀 Initializing AI Service...');
    await aiService.initialize();
    console.log('✅ AI Service initialized');

    // Check health
    console.log('🏥 Checking health...');
    const health = await aiService.getHealthStatus();
    console.log('Health status:', health);

    // Test a simple chat response
    console.log('💬 Testing chat response...');
    const testContext = {
      previousMessages: [],
      userInfo: { businessType: 'retail' },
      sessionContext: { qualificationStage: 'initial' as const }
    };

    const response = await aiService.generateChatResponse('Hello, I want to boost my sales', testContext);
    console.log('✅ AI Response:', response);

    return { success: true, response };

  } catch (error) {
    console.error('❌ AI Service Error:', error);
    return { success: false, error };
  }
}

export async function debugChatService() {
  console.log('🔍 Debugging Chat Service...');

  try {
    const chatService = ChatService.getInstance();
    console.log('✅ Chat Service instance created');

    const testContext = {
      previousMessages: [],
      userInfo: { businessType: 'retail' },
      sessionContext: { qualificationStage: 'initial' as const }
    };

    // Test customer analytics intent detection
    console.log('🧪 Testing customer analytics intent...');
    const customerQuery = 'I want to understand my customers better and improve customer analytics';
    console.log('🧪 Query:', customerQuery);

    const response = await chatService.generateResponse(customerQuery, testContext);
    console.log('✅ Chat Service Response:', response);

    return { success: true, response };

  } catch (error) {
    console.error('❌ Chat Service Error:', error);
    return { success: false, error };
  }
}

export async function testIntentDetection() {
  console.log('🔍 Testing Intent Detection...');

  const testMessages = [
    'I want to understand my customers better',
    'How can I improve customer analytics',
    'I need customer analytics',
    'Help me with customer data',
    'Customer behavior analysis'
  ];

  // Access the private method through reflection (for debugging)
  const chatService = ChatService.getInstance();

  testMessages.forEach(message => {
    console.log(`🧪 Testing: "${message}"`);
    // We'll need to check the intent detection logic manually
    const msg = message.toLowerCase();

    if (msg.includes('customer') || msg.includes('analytics') || msg.includes('behavior') || msg.includes('data')) {
      console.log('✅ Should detect: customer_analytics');
    } else {
      console.log('❌ Would detect: general_inquiry');
    }
  });
}

// Make it available globally for browser console testing
(window as any).debugAI = debugAIService;
(window as any).debugChat = debugChatService;
(window as any).testIntent = testIntentDetection;
