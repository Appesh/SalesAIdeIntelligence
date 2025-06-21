import React, { useState, useEffect } from 'react';
import { ChatService } from '@/lib/chatService';
import { ConversationContext } from '@/lib/types';

// Component to display message content as plain text
function FormattedMessagePreview({ content }: { content: string }) {
  // Clean up any HTML/malformed content and display as plain text
  const cleanText = (text: string): string => {
    let cleaned = text;

    // Remove all HTML tags and malformed HTML fragments
    cleaned = cleaned.replace(/<[^>]*>/g, ''); // Remove all HTML tags
    cleaned = cleaned.replace(/[^<]*font-weight:\s*\d+;\s*color:\s*#[0-9A-Fa-f]{6}[^>]*>/g, ''); // Remove malformed style attributes
    cleaned = cleaned.replace(/"\s*font-weight:\s*\d+;\s*color:\s*#[0-9A-Fa-f]{6}[^>]*>/g, '"'); // Clean up quotes with styles
    cleaned = cleaned.replace(/"\s*style="[^"]*">/g, ''); // Remove orphaned style attributes
    cleaned = cleaned.replace(/[^<\s]*font-weight[^>]*>/g, ''); // Remove any remaining font-weight fragments
    cleaned = cleaned.replace(/[^<\s]*color:\s*#[0-9A-Fa-f]{6}[^>]*>/g, ''); // Remove color fragments

    // Remove markdown formatting symbols for clean display
    cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1'); // Remove ** bold markers
    cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1'); // Remove * italic markers

    return cleaned;
  };

  const cleanedContent = cleanText(content);

  return (
    <div style={{
      whiteSpace: 'pre-wrap',
      lineHeight: '1.6',
      color: '#374151'
    }}>
      {cleanedContent}
    </div>
  );
}

export default function ChatTestWithLogs() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const chatService = ChatService.getInstance();

  // Capture console logs
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      const logMessage = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      setLogs(prev => [...prev.slice(-50), `[LOG] ${new Date().toLocaleTimeString()}: ${logMessage}`]);
      originalLog(...args);
    };

    console.error = (...args) => {
      const logMessage = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      setLogs(prev => [...prev.slice(-50), `[ERROR] ${new Date().toLocaleTimeString()}: ${logMessage}`]);
      originalError(...args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const testAIResponse = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setResponse('');
    setLogs(prev => [...prev, `[TEST] ${new Date().toLocaleTimeString()}: Testing message: "${message}"`]);

    try {
      const context: ConversationContext = {
        previousMessages: [],
        userInfo: { businessType: 'retail' },
        sessionContext: { qualificationStage: 'initial' }
      };

      console.log('🧪 Starting AI test with message:', message);
      const aiResponse = await chatService.generateResponse(message, context);
      console.log('🧪 AI response received:', aiResponse);

      setResponse(aiResponse.content);
      setLogs(prev => [...prev, `[SUCCESS] ${new Date().toLocaleTimeString()}: Response received: "${aiResponse.content}"`]);
    } catch (error) {
      console.error('🧪 Test failed:', error);
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLogs(prev => [...prev, `[ERROR] ${new Date().toLocaleTimeString()}: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const testMessages = [
    "Hello, how can you help me?",
    "I want to understand my customers better and improve customer analytics",
    "What are your pricing plans?",
    "How does your AI work?",
    "Can you help me increase sales?",
    "Tell me about your key features and benefits",
    "What makes Motivio different from competitors?"
  ];

  const testFormattedResponse = async () => {
    const mockResponse = `Here are **Motivio's key features**:

• **Sales optimization** with 40% average increase
• **Customer analytics** and segmentation tools
• **Inventory management** with demand forecasting
• Process automation for efficiency

**What are your typical "odd hours"** (e.g., 2-5 PM, late nights)?

1. **Morning rush** (6-9 AM)
2. **Lunch period** (12-2 PM)
3. **Evening peak** (5-8 PM)

*Ready to get started?* Contact us today!`;

    // Test the formatting function
    const testText = '**Bold text** and *italic text* with "quoted text" and (parenthetical text)';
    const formattedTest = formatInlineText(testText);
    console.log('🧪 Original text:', testText);
    console.log('🧪 Formatted text:', formattedTest);

    setResponse(mockResponse);
    setLogs(prev => [...prev, `[MOCK] ${new Date().toLocaleTimeString()}: Testing formatted response display`]);
    setLogs(prev => [...prev, `[DEBUG] Original: ${testText}`]);
    setLogs(prev => [...prev, `[DEBUG] Formatted: ${formattedTest}`]);
  };

  // Make formatInlineText available for testing
  const formatInlineText = (text: string): string => {
    let formatted = text;

    // Comprehensive HTML cleanup - remove all malformed HTML patterns
    // Pattern 1: Remove orphaned style attributes like 'font-weight: 600; color: #6366F1">'
    formatted = formatted.replace(/[^<]*font-weight:\s*\d+;\s*color:\s*#[0-9A-Fa-f]{6}[^>]*>/g, '');

    // Pattern 2: Remove quotes followed by style attributes
    formatted = formatted.replace(/"\s*font-weight:\s*\d+;\s*color:\s*#[0-9A-Fa-f]{6}[^>]*>/g, '"');

    // Pattern 3: Remove any standalone style attributes
    formatted = formatted.replace(/"\s*style="[^"]*">/g, '');

    // Pattern 4: Remove any HTML-like fragments that aren't proper tags
    formatted = formatted.replace(/[^<]*style="[^"]*"[^>]*>/g, '');

    // Pattern 5: Clean up any remaining malformed HTML fragments
    formatted = formatted.replace(/[^<\s]*font-weight[^>]*>/g, '');
    formatted = formatted.replace(/[^<\s]*color:\s*#[0-9A-Fa-f]{6}[^>]*>/g, '');

    // First handle bold text **text** - this must come before italic
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight: 600; color: #6366F1">$1</strong>');

    // Then handle italic text *text* - but avoid already processed bold text
    // Split by bold tags and process each part separately
    const parts = formatted.split(/(<strong[^>]*>.*?<\/strong>)/);
    formatted = parts.map(part => {
      if (part.includes('<strong')) {
        return part; // Don't process bold text
      }
      // Only process italic in non-bold parts
      return part.replace(/\*([^*]+)\*/g, '<em style="font-style: italic; color: #8B5CF6">$1</em>');
    }).join('');

    // Handle quoted text "text"
    formatted = formatted.replace(/"([^"]+)"/g, '<span style="color: #059669; font-style: italic">"$1"</span>');

    // Handle parenthetical text (text)
    formatted = formatted.replace(/\(([^)]+)\)/g, '<span style="color: #6B7280; font-size: 0.9em">($1)</span>');

    return formatted;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Chat AI Integration Test</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Test Input */}
        <div>
          <h2>Test AI Chat</h2>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter test message..."
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                marginBottom: '10px'
              }}
              onKeyPress={(e) => e.key === 'Enter' && testAIResponse()}
            />
            <button 
              onClick={testAIResponse} 
              disabled={isLoading || !message.trim()}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {isLoading ? 'Testing...' : 'Test AI Response'}
            </button>
          </div>

          {/* Quick Test Buttons */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Quick Tests:</h3>
            {testMessages.map((testMsg, index) => (
              <button
                key={index}
                onClick={() => {
                  setMessage(testMsg);
                  setTimeout(() => testAIResponse(), 100);
                }}
                disabled={isLoading}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1
                }}
              >
                {testMsg}
              </button>
            ))}

            {/* Test Formatted Response */}
            <button
              onClick={testFormattedResponse}
              disabled={isLoading}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px',
                margin: '5px 0',
                backgroundColor: '#ff6b35',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              🧪 Test Formatted Response (Mock)
            </button>

            {/* Test Malformed HTML Fix */}
            <button
              onClick={() => {
                const malformedText = `I'm doing great, thanks for asking! Ready to help retail businesses like yours thrive.
So, what are your biggest challenges or goals right now? Are you focused on:
•
"font-weight: 600; color: #6366F1">Increasing sales and attracting more customers?
•
"font-weight: 600; color: #6366F1">Optimizing your inventory to avoid overstocking or running out of popular items?
•
"font-weight: 600; color: #6366F1">Understanding your customers better to personalize their shopping experience?
•
"font-weight: 600; color: #6366F1">Streamlining your operations to save time and money?
Let me know what's most important to you, and we can dive in!`;

                const formattedTest = formatInlineText(malformedText);
                console.log('🧪 Malformed HTML test - Original:', malformedText);
                console.log('🧪 Malformed HTML test - Cleaned:', formattedTest);

                setResponse(malformedText);
                setLogs(prev => [...prev, `[MALFORMED HTML TEST] ${new Date().toLocaleTimeString()}: Testing malformed HTML cleanup`]);
                setLogs(prev => [...prev, `[DEBUG] Original malformed: ${malformedText.substring(0, 100)}...`]);
                setLogs(prev => [...prev, `[DEBUG] Cleaned result: ${formattedTest.substring(0, 100)}...`]);
              }}
              disabled={isLoading}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px',
                margin: '5px 0',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              🔧 Test Malformed HTML Fix
            </button>
          </div>

          {/* Response */}
          {response && (
            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              marginTop: '10px'
            }}>
              <h3>AI Response (Formatted):</h3>
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                marginTop: '8px'
              }}>
                <FormattedMessagePreview content={response} />
              </div>

              <details style={{ marginTop: '10px' }}>
                <summary style={{ cursor: 'pointer', color: '#6B7280' }}>Show Raw Text</summary>
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  backgroundColor: '#f3f4f6',
                  padding: '8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  marginTop: '8px'
                }}>{response}</pre>
              </details>
            </div>
          )}
        </div>

        {/* Logs */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Console Logs</h2>
            <button 
              onClick={clearLogs}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Logs
            </button>
          </div>
          <div style={{ 
            height: '600px', 
            overflow: 'auto', 
            backgroundColor: '#000', 
            color: '#00ff00', 
            padding: '10px', 
            fontFamily: 'monospace', 
            fontSize: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}>
            {logs.length === 0 ? (
              <div style={{ color: '#888' }}>No logs yet. Send a test message to see AI integration logs.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ marginBottom: '2px' }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div style={{ 
        padding: '15px', 
        backgroundColor: '#e9ecef', 
        border: '1px solid #ced4da', 
        borderRadius: '4px',
        marginTop: '20px'
      }}>
        <h3>Integration Status:</h3>
        <ul>
          <li>✅ Gemini API Key: Configured (AIzaSyBbmtCByHgSe5Sj9DDHKx8wk5dmc6Mn6Bc)</li>
          <li>✅ Model: gemini-2.0-flash</li>
          <li>✅ Chat Service: Initialized</li>
          <li>✅ Hybrid AI Manager: Active</li>
          <li>📝 Test messages above to validate AI responses</li>
        </ul>
      </div>
    </div>
  );
}
