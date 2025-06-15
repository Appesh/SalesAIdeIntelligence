import { useState } from 'react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function ChatTest() {
  const [debugInfo, setDebugInfo] = useState('');
  const [showChat, setShowChat] = useState(true);

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => prev + '\n' + new Date().toLocaleTimeString() + ': ' + info);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Chat Test Page</h1>
      <p>This page is for debugging the chat functionality.</p>
      
      <div style={{ 
        background: '#f0f0f0', 
        padding: '10px', 
        marginBottom: '20px',
        whiteSpace: 'pre-wrap',
        maxHeight: '200px',
        overflow: 'auto'
      }}>
        <strong>Debug Info:</strong>
        {debugInfo || 'No debug info yet...'}
      </div>

      <button 
        onClick={() => addDebugInfo('Test button clicked')}
        style={{ 
          padding: '10px 20px', 
          background: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          marginRight: '10px'
        }}
      >
        Test Debug
      </button>

      <button
        onClick={() => setDebugInfo('')}
        style={{
          padding: '10px 20px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginRight: '10px'
        }}
      >
        Clear Debug
      </button>

      <button
        onClick={() => setShowChat(!showChat)}
        style={{
          padding: '10px 20px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {showChat ? 'Hide' : 'Show'} Chat
      </button>

      <div style={{ marginTop: '20px' }}>
        <h2>Simple Test Button:</h2>
        <button
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
          onClick={() => addDebugInfo('Simple button clicked!')}
        >
          💬
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Chat Container should appear below:</h2>
        <p>Show Chat: {showChat ? 'Yes' : 'No'}</p>
        {showChat && (
          <ErrorBoundary>
            <ChatContainer />
          </ErrorBoundary>
        )}
      </div>

      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        left: '10px', 
        background: 'orange', 
        color: 'black', 
        padding: '5px',
        fontSize: '12px',
        zIndex: 9999
      }}>
        Chat Test Page Loaded
      </div>
    </div>
  );
}
