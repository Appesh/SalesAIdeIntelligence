#!/usr/bin/env node

// Test script to check Gemini API integration
import fetch from 'node-fetch';

console.log('🚀 Starting Gemini API test script...');

const GOOGLE_API_KEY = 'AIzaSyBbmtCByHgSe5Sj9DDHKx8wk5dmc6Mn6Bc';
const GOOGLE_MODEL = 'gemini-2.0-flash';

async function testGeminiAPI() {
  console.log('🔥 Testing Gemini API...');
  console.log('🔥 API Key:', GOOGLE_API_KEY ? `${GOOGLE_API_KEY.substring(0, 10)}...` : 'NOT SET');
  console.log('🔥 Model:', GOOGLE_MODEL);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_MODEL}:generateContent?key=${GOOGLE_API_KEY}`;
  
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: "You are a helpful AI assistant for Motivio, a retail AI platform. A user asks: 'Hello, can you help me understand how Motivio can boost my sales?' Please provide a helpful, engaging response that explains Motivio's benefits for retail businesses."
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000,
      topP: 0.8,
      topK: 10
    }
  };

  console.log('🔥 Request URL:', url);
  console.log('🔥 Request body:', JSON.stringify(requestBody, null, 2));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('🔥 Response status:', response.status);
    console.log('🔥 Response headers:', response.headers.raw());

    const data = await response.json();
    console.log('🔥 Response data:', JSON.stringify(data, null, 2));

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;
      console.log('✅ SUCCESS! Gemini API is working');
      console.log('📝 Generated response:', responseText);
      return true;
    } else {
      console.log('❌ FAILED! No valid response from Gemini API');
      return false;
    }
  } catch (error) {
    console.error('❌ ERROR testing Gemini API:', error);
    return false;
  }
}

// Test different scenarios
async function testMultipleScenarios() {
  console.log('\n=== Testing Multiple Chat Scenarios ===\n');
  
  const scenarios = [
    "Hello, I'm interested in Motivio",
    "How can Motivio help boost my retail sales?",
    "I want to understand my customers better and improve customer analytics",
    "What's the pricing for Motivio?",
    "Can you show me a demo?"
  ];

  for (const scenario of scenarios) {
    console.log(`\n--- Testing scenario: "${scenario}" ---`);
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_MODEL}:generateContent?key=${GOOGLE_API_KEY}`;
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a helpful AI assistant for Motivio, a retail AI platform that helps businesses boost sales through AI-powered insights and automation. 

Context: Motivio is a comprehensive retail AI solution that:
- Increases sales by an average of 40%
- Provides customer analytics and insights
- Offers inventory optimization
- Includes predictive analytics
- Has helped hundreds of retailers

User message: "${scenario}"

Please provide a helpful, engaging, and specific response that addresses their query about Motivio. Be conversational and focus on the benefits for their retail business.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
        topP: 0.8,
        topK: 10
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const responseText = data.candidates[0].content.parts[0].text;
        console.log('✅ Response:', responseText);
        
        // Check if response is repetitive or generic
        if (responseText.length < 50) {
          console.log('⚠️  WARNING: Response seems too short');
        }
        if (responseText.toLowerCase().includes('i apologize') || responseText.toLowerCase().includes('i cannot')) {
          console.log('⚠️  WARNING: Response seems like an error or refusal');
        }
      } else {
        console.log('❌ No valid response received');
        console.log('Raw response:', JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function main() {
  console.log('🚀 Starting Gemini API Tests\n');
  
  // Test basic API connectivity
  const basicTest = await testGeminiAPI();
  
  if (basicTest) {
    // Test multiple scenarios
    await testMultipleScenarios();
  }
  
  console.log('\n🏁 Tests completed');
}

main().catch(console.error);
