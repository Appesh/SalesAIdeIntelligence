# Gemini Production Integration Setup Guide

## Current Status
✅ **Local Environment**: Gemini API is working correctly
❓ **Production Environment**: Needs verification and potential fixes

## Environment Variables Required for Production

### Vercel Environment Variables
The following environment variables must be set in your Vercel dashboard:

```bash
# AI Configuration
VITE_AI_PROVIDER=hybrid
VITE_AI_FALLBACK_ENABLED=true
VITE_AI_RESPONSE_TIMEOUT=30000

# Google Gemini Configuration
VITE_GOOGLE_API_KEY=AIzaSyBbmtCByHgSe5Sj9DDHKx8wk5dmc6Mn6Bc
VITE_GOOGLE_MODEL=gemini-2.0-flash
VITE_GOOGLE_MAX_TOKENS=1000

# Hybrid AI Settings
VITE_HYBRID_USE_BUSINESS_LOGIC=true
VITE_HYBRID_AI_CONFIDENCE_THRESHOLD=0.8
VITE_HYBRID_FALLBACK_ORDER=google,openai,anthropic,business-logic
```

## Steps to Fix Production Issues

### 1. Verify Environment Variables in Vercel
1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to "Environment Variables" section
4. Ensure all the above variables are set correctly
5. Make sure they are set for "Production" environment

### 2. Check API Key Validity
- The Google API key should be valid and have the Generative AI API enabled
- Test the API key using the production test page: `/production-test`

### 3. CORS and Network Issues
Gemini API should work from browser environments, but check for:
- Network restrictions
- Firewall issues
- CORS policies (shouldn't be an issue with Google's API)

### 4. Build Process Issues
The current build process uses `build:simple` which only builds the client:
```json
"build:simple": "vite build"
```

This is correct for a client-side deployment like Vercel.

## Testing Production Environment

### Method 1: Use the Production Test Page
1. Deploy your changes
2. Visit: `https://your-domain.vercel.app/production-test`
3. Click "Run Full Debug" to see detailed diagnostics
4. Click "Test Direct Gemini" to test API connectivity

### Method 2: Browser Console Testing
In production, open browser console and run:
```javascript
// Test environment variables
console.log('VITE_GOOGLE_API_KEY:', import.meta.env.VITE_GOOGLE_API_KEY);

// Test debug function
if (window.debugProductionEnvironment) {
  window.debugProductionEnvironment();
}
```

### Method 3: Manual API Test
```javascript
// Direct API test in browser console
const testGemini = async () => {
  const apiKey = 'AIzaSyBbmtCByHgSe5Sj9DDHKx8wk5dmc6Mn6Bc';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Hello, test from production' }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 100 }
    })
  });
  
  const data = await response.json();
  console.log('Gemini Response:', data);
};

testGemini();
```

## Common Production Issues and Solutions

### Issue 1: Environment Variables Not Loading
**Symptoms**: `import.meta.env.VITE_GOOGLE_API_KEY` is undefined
**Solution**: 
- Ensure variables are prefixed with `VITE_`
- Redeploy after setting environment variables
- Check Vercel deployment logs

### Issue 2: API Key Invalid
**Symptoms**: 403 or 401 errors from Gemini API
**Solution**:
- Verify API key is correct
- Check Google Cloud Console for API quotas
- Ensure Generative AI API is enabled

### Issue 3: Network/CORS Issues
**Symptoms**: Network errors or CORS errors
**Solution**:
- Gemini API supports CORS, so this shouldn't be an issue
- Check browser network tab for actual error details

### Issue 4: Fallback to Business Logic
**Symptoms**: Getting generic responses instead of AI responses
**Solution**:
- Check console logs for AI initialization errors
- Verify environment variables are loaded correctly
- Test direct API call

## Deployment Checklist

- [ ] Environment variables set in Vercel dashboard
- [ ] All variables prefixed with `VITE_`
- [ ] Google API key is valid and has correct permissions
- [ ] Generative AI API is enabled in Google Cloud Console
- [ ] Test deployment with `/production-test` page
- [ ] Verify chatbot responses are dynamic and contextual
- [ ] Check browser console for any errors

## Monitoring and Debugging

### Production Logs
- Use Vercel's function logs to monitor API calls
- Check browser console for client-side errors
- Monitor API usage in Google Cloud Console

### Performance Monitoring
- Monitor API response times
- Check for rate limiting issues
- Monitor token usage and costs

## Next Steps After Fixing

1. Test the chatbot with various queries
2. Verify responses are contextual and not repetitive
3. Monitor for any errors or performance issues
4. Consider implementing error tracking (e.g., Sentry)
5. Set up monitoring alerts for API failures
