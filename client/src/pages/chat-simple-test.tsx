import { SimpleChatContainer } from '@/components/chat/SimpleChatContainer';

export default function ChatSimpleTest() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to br, #f3f4f6, #e5e7eb)',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#1f2937'
        }}>
          Simple Chat Test
        </h1>
        
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#6b7280', 
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          This is a simple test page to verify the chat container is working properly.
          You should see a chat button in the bottom-right corner of the screen.
        </p>

        <div style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#374151'
          }}>
            Expected Behavior:
          </h2>
          <ul style={{ 
            listStyle: 'disc', 
            paddingLeft: '1.5rem',
            color: '#6b7280',
            lineHeight: '1.6'
          }}>
            <li>A purple/pink gradient chat button should appear in the bottom-right corner</li>
            <li>The button should have a 💬 emoji and pulse animation</li>
            <li>Clicking the button should open a chat widget</li>
            <li>The chat widget should have a modern glassmorphism design</li>
            <li>You can type messages and get automated responses</li>
            <li>Press ESC to close the chat widget</li>
          </ul>
        </div>

        <div style={{
          background: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '2rem'
        }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: '#92400e'
          }}>
            Troubleshooting:
          </h3>
          <p style={{ color: '#92400e', lineHeight: '1.6' }}>
            If you don't see the chat button, check the browser console for any JavaScript errors.
            The button should be positioned with high z-index (9999) to appear above other content.
          </p>
        </div>

        {/* Add some content to test scrolling */}
        <div style={{ height: '100vh', background: '#f3f4f6', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Scroll Test Area</h3>
          <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
            This area is here to test scrolling behavior. The chat button should remain visible
            and accessible even when scrolling through long content.
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <SimpleChatContainer />
    </div>
  );
}
