#!/usr/bin/env node

/**
 * Production Test Script for SalesAIde
 * Tests the production build and basic functionality
 */

import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 5001; // Use different port for testing
const HOST = 'localhost';
const TEST_ENV = {
  NODE_ENV: 'production',
  PORT: PORT.toString(),
  HOST: HOST,
  DATABASE_URL: 'postgresql://test:test@localhost:5432/test', // Mock DB URL
  SESSION_SECRET: 'test-secret-key-for-production-testing-minimum-32-chars',
  CORS_ORIGIN: `http://${HOST}:${PORT}`,
  LOG_LEVEL: 'info'
};

console.log('🧪 Motivio Production Test Suite');
console.log('=====================================\n');

// Check if build exists
function checkBuild() {
  console.log('📦 Checking production build...');
  
  const distPath = join(__dirname, 'dist');
  const indexPath = join(distPath, 'index.js');
  const publicPath = join(distPath, 'public');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist/ directory not found. Run: npm run build');
    process.exit(1);
  }
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.js not found. Run: npm run build');
    process.exit(1);
  }
  
  if (!fs.existsSync(publicPath)) {
    console.error('❌ dist/public/ directory not found. Run: npm run build');
    process.exit(1);
  }
  
  console.log('✅ Production build found');
}

// Start production server
function startServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting production server...');
    
    const serverProcess = spawn('node', ['dist/index.js'], {
      env: { ...process.env, ...TEST_ENV },
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let serverReady = false;
    
    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`[SERVER] ${output.trim()}`);
      
      if (output.includes(`serving on ${HOST}:${PORT}`) || output.includes('server running')) {
        serverReady = true;
        resolve(serverProcess);
      }
    });
    
    serverProcess.stderr.on('data', (data) => {
      console.error(`[SERVER ERROR] ${data.toString().trim()}`);
    });
    
    serverProcess.on('error', (error) => {
      reject(error);
    });
    
    serverProcess.on('exit', (code) => {
      if (!serverReady) {
        reject(new Error(`Server exited with code ${code}`));
      }
    });
    
    // Timeout after 10 seconds
    setTimeout(() => {
      if (!serverReady) {
        serverProcess.kill();
        reject(new Error('Server startup timeout'));
      }
    }, 10000);
  });
}

// Test HTTP endpoints
function testEndpoints() {
  return new Promise((resolve, reject) => {
    console.log('🔍 Testing endpoints...');
    
    const tests = [
      { path: '/health', name: 'Health Check' },
      { path: '/api/status', name: 'API Status' },
      { path: '/', name: 'Frontend' }
    ];
    
    let completedTests = 0;
    const results = [];
    
    tests.forEach((test) => {
      const req = http.get(`http://${HOST}:${PORT}${test.path}`, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          const success = res.statusCode >= 200 && res.statusCode < 300;
          results.push({
            name: test.name,
            path: test.path,
            status: res.statusCode,
            success
          });
          
          console.log(`${success ? '✅' : '❌'} ${test.name}: ${res.statusCode}`);
          
          completedTests++;
          if (completedTests === tests.length) {
            resolve(results);
          }
        });
      });
      
      req.on('error', (error) => {
        results.push({
          name: test.name,
          path: test.path,
          error: error.message,
          success: false
        });
        
        console.log(`❌ ${test.name}: ${error.message}`);
        
        completedTests++;
        if (completedTests === tests.length) {
          resolve(results);
        }
      });
      
      req.setTimeout(5000, () => {
        req.destroy();
        results.push({
          name: test.name,
          path: test.path,
          error: 'Timeout',
          success: false
        });
        
        console.log(`❌ ${test.name}: Timeout`);
        
        completedTests++;
        if (completedTests === tests.length) {
          resolve(results);
        }
      });
    });
  });
}

// Main test function
async function runTests() {
  let serverProcess = null;
  
  try {
    // Check build
    checkBuild();
    
    // Start server
    serverProcess = await startServer();
    
    // Wait a moment for server to fully initialize
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test endpoints
    const results = await testEndpoints();
    
    // Print summary
    console.log('\n📊 Test Summary');
    console.log('================');
    
    const passed = results.filter(r => r.success).length;
    const total = results.length;
    
    console.log(`✅ Passed: ${passed}/${total}`);
    
    if (passed === total) {
      console.log('\n🎉 All tests passed! Production build is ready.');
      console.log(`\n🌐 Your application is running at: http://${HOST}:${PORT}`);
      console.log('📊 Health check: http://localhost:5001/health');
      console.log('🔧 API status: http://localhost:5001/api/status');
    } else {
      console.log('\n⚠️  Some tests failed. Check the logs above.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error(`\n❌ Test failed: ${error.message}`);
    process.exit(1);
  } finally {
    // Clean up
    if (serverProcess) {
      console.log('\n🛑 Stopping test server...');
      serverProcess.kill();
    }
  }
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('\n🛑 Test interrupted');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Test terminated');
  process.exit(0);
});

// Run tests
runTests().catch((error) => {
  console.error(`\n💥 Unexpected error: ${error.message}`);
  process.exit(1);
});
