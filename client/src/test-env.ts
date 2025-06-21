// Test environment variables
export function testEnvironmentVariables() {
  console.log('🔍 Testing Environment Variables...');

  const envVars = {
    'VITE_GOOGLE_API_KEY': import.meta.env.VITE_GOOGLE_API_KEY,
    'VITE_GOOGLE_MODEL': import.meta.env.VITE_GOOGLE_MODEL,
    'VITE_GOOGLE_MAX_TOKENS': import.meta.env.VITE_GOOGLE_MAX_TOKENS,
    'VITE_HYBRID_FALLBACK_ORDER': import.meta.env.VITE_HYBRID_FALLBACK_ORDER,
    'VITE_HYBRID_USE_BUSINESS_LOGIC': import.meta.env.VITE_HYBRID_USE_BUSINESS_LOGIC,
    'VITE_AI_PROVIDER': import.meta.env.VITE_AI_PROVIDER,
  };

  console.log('Environment Variables:', envVars);

  // Check if Google API key is available
  const hasGoogleKey = !!(envVars.VITE_GOOGLE_API_KEY && envVars.VITE_GOOGLE_API_KEY !== 'your-google-api-key-here');
  console.log('Has Google API Key:', hasGoogleKey);

  if (hasGoogleKey) {
    console.log('✅ Google API Key is configured');
    console.log('Key preview:', envVars.VITE_GOOGLE_API_KEY?.substring(0, 10) + '...');
  } else {
    console.log('❌ Google API Key is missing or not configured');
  }

  return envVars;
}

// Test Google API directly
export async function testGoogleAPI() {
  console.log('🔍 Testing Google API directly...');

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ No Google API key found');
    return;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Hello, test message"
                }
              ]
            }
          ]
        }),
      }
    );

    console.log('🔍 Google API response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Google API working:', data);
      return data;
    } else {
      const error = await response.text();
      console.error('❌ Google API error:', error);
      return null;
    }
  } catch (error) {
    console.error('❌ Google API fetch error:', error);
    return null;
  }
}

// Make it available globally
(window as any).testEnv = testEnvironmentVariables;
(window as any).testGoogleAPI = testGoogleAPI;
