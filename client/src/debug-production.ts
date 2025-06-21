// Production environment debugging for Gemini integration
import { getAIConfigSummary } from './lib/ai/AIConfig';
import { AIService } from './lib/ai';

export async function debugProductionEnvironment() {
  console.log('🔍 === PRODUCTION ENVIRONMENT DEBUG ===');
  
  // 1. Check environment variables
  console.log('\n📋 Environment Variables:');
  console.log('VITE_AI_PROVIDER:', import.meta.env.VITE_AI_PROVIDER);
  console.log('VITE_GOOGLE_API_KEY:', import.meta.env.VITE_GOOGLE_API_KEY ? `${import.meta.env.VITE_GOOGLE_API_KEY.substring(0, 10)}...` : 'NOT SET');
  console.log('VITE_GOOGLE_MODEL:', import.meta.env.VITE_GOOGLE_MODEL);
  console.log('VITE_GOOGLE_MAX_TOKENS:', import.meta.env.VITE_GOOGLE_MAX_TOKENS);
  console.log('VITE_HYBRID_FALLBACK_ORDER:', import.meta.env.VITE_HYBRID_FALLBACK_ORDER);
  console.log('VITE_HYBRID_USE_BUSINESS_LOGIC:', import.meta.env.VITE_HYBRID_USE_BUSINESS_LOGIC);
  console.log('VITE_HYBRID_AI_CONFIDENCE_THRESHOLD:', import.meta.env.VITE_HYBRID_AI_CONFIDENCE_THRESHOLD);
  console.log('VITE_AI_RESPONSE_TIMEOUT:', import.meta.env.VITE_AI_RESPONSE_TIMEOUT);
  
  // 2. Check AI configuration
  console.log('\n⚙️ AI Configuration Summary:');
  try {
    const configSummary = getAIConfigSummary();
    console.log('Config:', JSON.stringify(configSummary.config, null, 2));
    console.log('Validation:', JSON.stringify(configSummary.validation, null, 2));
    console.log('Available Providers:', JSON.stringify(configSummary.availableProviders, null, 2));
  } catch (error) {
    console.error('❌ Error getting AI config summary:', error);
  }
  
  // 3. Test AI Service initialization
  console.log('\n🚀 Testing AI Service Initialization:');
  try {
    const aiService = AIService.getInstance();
    await aiService.initialize();
    console.log('✅ AI Service initialized successfully');
    
    // Get health status
    const healthStatus = await aiService.getHealthStatus();
    console.log('🏥 Health Status:', JSON.stringify(healthStatus, null, 2));
    
  } catch (error) {
    console.error('❌ AI Service initialization failed:', error);
  }
  
  // 4. Test direct Gemini API call
  console.log('\n🔥 Testing Direct Gemini API Call:');
  await testDirectGeminiCall();
  
  // 5. Test chat response generation
  console.log('\n💬 Testing Chat Response Generation:');
  await testChatResponseGeneration();
}

async function testDirectGeminiCall() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const model = import.meta.env.VITE_GOOGLE_MODEL || 'gemini-2.0-flash';
  
  if (!apiKey || apiKey === 'your-google-api-key-here') {
    console.log('❌ No valid Google API key found');
    return;
  }
  
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: "Hello, this is a test from the production environment. Please respond with 'Production test successful' if you can see this message."
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 100,
        topP: 0.8,
        topK: 10
      }
    };
    
    console.log('🔥 Making direct API call to:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('🔥 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API call failed:', errorText);
      return;
    }
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;
      console.log('✅ Direct API call successful!');
      console.log('📝 Response:', responseText);
    } else {
      console.log('❌ Unexpected response format:', JSON.stringify(data, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Direct API call error:', error);
  }
}

async function testChatResponseGeneration() {
  try {
    const aiService = AIService.getInstance();
    
    const testContext = {
      previousMessages: [],
      userInfo: { businessType: 'retail' },
      sessionContext: { qualificationStage: 'initial' }
    };
    
    console.log('💬 Testing chat response generation...');
    const response = await aiService.generateChatResponse('Hello, can you help me with Motivio?', testContext);
    
    console.log('✅ Chat response generated successfully!');
    console.log('📝 Response:', JSON.stringify(response, null, 2));
    
  } catch (error) {
    console.error('❌ Chat response generation failed:', error);
  }
}

// Auto-run in development
if (import.meta.env.DEV) {
  console.log('🔧 Development mode detected, running production debug...');
  debugProductionEnvironment().catch(console.error);
}

// Export for manual testing
(window as any).debugProductionEnvironment = debugProductionEnvironment;
