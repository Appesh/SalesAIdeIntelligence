// Test script for the Hybrid AI system
import { AIService, getAIConfigSummary } from './index';

export async function testHybridAI() {
  console.log('🧪 Testing Hybrid AI System...');
  
  try {
    // 1. Check configuration
    console.log('\n📋 Configuration Summary:');
    const configSummary = getAIConfigSummary();
    console.log(JSON.stringify(configSummary, null, 2));
    
    // 2. Initialize AI service
    console.log('\n🚀 Initializing AI Service...');
    const aiService = AIService.getInstance();
    await aiService.initialize();
    console.log('✅ AI Service initialized successfully');
    
    // 3. Check health status
    console.log('\n🏥 Health Check:');
    const healthStatus = await aiService.getHealthStatus();
    console.log(JSON.stringify(healthStatus, null, 2));
    
    // 4. Test chat response
    console.log('\n💬 Testing Chat Response:');
    const testContext = {
      previousMessages: [],
      userInfo: { businessType: 'retail' },
      sessionContext: { qualificationStage: 'initial' as const }
    };
    
    const response = await aiService.generateChatResponse('Hello, I want to boost my sales', testContext);
    console.log('Response:', JSON.stringify(response, null, 2));
    
    console.log('\n✅ Hybrid AI test completed successfully!');
    return true;
    
  } catch (error) {
    console.error('\n❌ Hybrid AI test failed:', error);
    return false;
  }
}

// Helper function to test in browser console
export function runAITest() {
  testHybridAI().then(success => {
    if (success) {
      console.log('🎉 All tests passed!');
    } else {
      console.log('💥 Some tests failed. Check the logs above.');
    }
  });
}

// Export for easy testing
(window as any).testAI = runAITest;
