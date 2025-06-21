#!/usr/bin/env node

// Script to check and set Vercel environment variables for Gemini integration

const { execSync } = require('child_process');

const requiredEnvVars = {
  'VITE_AI_PROVIDER': 'hybrid',
  'VITE_AI_FALLBACK_ENABLED': 'true',
  'VITE_AI_RESPONSE_TIMEOUT': '30000',
  'VITE_GOOGLE_API_KEY': 'AIzaSyBbmtCByHgSe5Sj9DDHKx8wk5dmc6Mn6Bc',
  'VITE_GOOGLE_MODEL': 'gemini-2.0-flash',
  'VITE_GOOGLE_MAX_TOKENS': '1000',
  'VITE_HYBRID_USE_BUSINESS_LOGIC': 'true',
  'VITE_HYBRID_AI_CONFIDENCE_THRESHOLD': '0.8',
  'VITE_HYBRID_FALLBACK_ORDER': 'google,openai,anthropic,business-logic'
};

console.log('🔍 Checking Vercel Environment Variables for Gemini Integration...\n');

// Function to run vercel env commands
function runVercelCommand(command) {
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    return output.trim();
  } catch (error) {
    console.error(`❌ Error running command: ${command}`);
    console.error(error.message);
    return null;
  }
}

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('❌ Vercel CLI not found. Please install it with: npm i -g vercel');
  process.exit(1);
}

// List current environment variables
console.log('\n📋 Current Vercel Environment Variables:');
const envList = runVercelCommand('vercel env ls');
if (envList) {
  console.log(envList);
} else {
  console.log('❌ Could not retrieve environment variables');
}

console.log('\n🔧 Required Environment Variables for Gemini:');
console.log('================================================');

for (const [key, value] of Object.entries(requiredEnvVars)) {
  console.log(`${key}=${value}`);
}

console.log('\n📝 To set these variables in Vercel, run:');
console.log('==========================================');

for (const [key, value] of Object.entries(requiredEnvVars)) {
  console.log(`vercel env add ${key} production`);
  console.log(`# Enter value: ${value}`);
  console.log('');
}

console.log('\n🚀 Alternative: Set via Vercel Dashboard');
console.log('========================================');
console.log('1. Go to https://vercel.com/dashboard');
console.log('2. Select your project');
console.log('3. Go to Settings > Environment Variables');
console.log('4. Add each variable with the values shown above');
console.log('5. Make sure to select "Production" environment');
console.log('6. Redeploy your application');

console.log('\n🧪 Testing Commands:');
console.log('===================');
console.log('# Test locally:');
console.log('npm run dev');
console.log('# Then visit: http://localhost:5000/production-test');
console.log('');
console.log('# Test in production:');
console.log('# Visit: https://your-domain.vercel.app/production-test');

console.log('\n✅ Setup Complete!');
console.log('After setting the environment variables, your Gemini integration should work in production.');
