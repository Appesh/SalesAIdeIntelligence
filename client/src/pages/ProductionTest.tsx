import React, { useState, useEffect } from 'react';
import { debugProductionEnvironment } from '../debug-production';

export default function ProductionTest() {
  const [debugOutput, setDebugOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const runDebug = async () => {
    setIsRunning(true);
    setDebugOutput('Running production environment debug...\n');
    
    // Capture console output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    let output = '';
    
    const captureLog = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      output += message + '\n';
      originalLog(...args);
    };
    
    const captureError = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      output += 'ERROR: ' + message + '\n';
      originalError(...args);
    };
    
    const captureWarn = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      output += 'WARN: ' + message + '\n';
      originalWarn(...args);
    };
    
    console.log = captureLog;
    console.error = captureError;
    console.warn = captureWarn;
    
    try {
      await debugProductionEnvironment();
    } catch (error) {
      output += `FATAL ERROR: ${error}\n`;
    }
    
    // Restore original console methods
    console.log = originalLog;
    console.error = captureError;
    console.warn = captureWarn;
    
    setDebugOutput(output);
    setIsRunning(false);
  };

  const testDirectGemini = async () => {
    setDebugOutput(prev => prev + '\n=== DIRECT GEMINI TEST ===\n');
    
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const model = import.meta.env.VITE_GOOGLE_MODEL || 'gemini-2.0-flash';
    
    if (!apiKey || apiKey === 'your-google-api-key-here') {
      setDebugOutput(prev => prev + 'ERROR: No valid Google API key found\n');
      return;
    }
    
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: "You are a helpful AI assistant for Motivio. A user asks: 'Hello, I'm testing the production environment. Can you confirm this is working?' Please provide a brief, helpful response."
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
          topP: 0.8,
          topK: 10
        }
      };
      
      setDebugOutput(prev => prev + `Making API call to: ${url}\n`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      setDebugOutput(prev => prev + `Response status: ${response.status}\n`);
      
      if (!response.ok) {
        const errorText = await response.text();
        setDebugOutput(prev => prev + `API Error: ${errorText}\n`);
        return;
      }
      
      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const responseText = data.candidates[0].content.parts[0].text;
        setDebugOutput(prev => prev + `SUCCESS! Gemini Response: ${responseText}\n`);
      } else {
        setDebugOutput(prev => prev + `Unexpected response format: ${JSON.stringify(data, null, 2)}\n`);
      }
      
    } catch (error) {
      setDebugOutput(prev => prev + `Direct API Error: ${error}\n`);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace', 
      backgroundColor: '#1a1a1a', 
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#8B5CF6', marginBottom: '20px' }}>
        🔍 Motivio Production Environment Test
      </h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={runDebug}
          disabled={isRunning}
          style={{
            padding: '10px 20px',
            backgroundColor: '#8B5CF6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            marginRight: '10px',
            opacity: isRunning ? 0.6 : 1
          }}
        >
          {isRunning ? 'Running...' : 'Run Full Debug'}
        </button>
        
        <button
          onClick={testDirectGemini}
          style={{
            padding: '10px 20px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Test Direct Gemini
        </button>
        
        <button
          onClick={() => setDebugOutput('')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#DC2626',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear Output
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#6366F1' }}>Environment Info:</h3>
        <div style={{ backgroundColor: '#2a2a2a', padding: '10px', borderRadius: '5px' }}>
          <div>Environment: {import.meta.env.MODE}</div>
          <div>Google API Key: {import.meta.env.VITE_GOOGLE_API_KEY ? `${import.meta.env.VITE_GOOGLE_API_KEY.substring(0, 10)}...` : 'NOT SET'}</div>
          <div>Google Model: {import.meta.env.VITE_GOOGLE_MODEL || 'NOT SET'}</div>
          <div>AI Provider: {import.meta.env.VITE_AI_PROVIDER || 'NOT SET'}</div>
          <div>Fallback Order: {import.meta.env.VITE_HYBRID_FALLBACK_ORDER || 'NOT SET'}</div>
        </div>
      </div>
      
      <div>
        <h3 style={{ color: '#6366F1' }}>Debug Output:</h3>
        <pre style={{
          backgroundColor: '#2a2a2a',
          padding: '15px',
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          maxHeight: '500px',
          overflowY: 'auto',
          fontSize: '12px',
          lineHeight: '1.4'
        }}>
          {debugOutput || 'Click "Run Full Debug" to start testing...'}
        </pre>
      </div>
    </div>
  );
}
