import { useState } from 'react';

interface SimpleChatButtonProps {
  onClick: () => void;
}

export function SimpleChatButton({ onClick }: SimpleChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Chat button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isHovered 
            ? 'linear-gradient(45deg, #7C3AED, #DB2777)' 
            : 'linear-gradient(45deg, #8B5CF6, #EC4899)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="Chat with SalesAIde Assistant"
      >
        💬
      </button>

      {/* Tooltip */}
      <div style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        background: 'white',
        color: '#374151',
        padding: '8px 12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontSize: '14px',
        zIndex: 999,
        maxWidth: '200px',
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.3s ease',
        pointerEvents: 'none'
      }}>
        💬 Need help? Chat with our AI assistant!
      </div>
    </>
  );
}
