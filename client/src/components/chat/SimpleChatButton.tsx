import { useState } from 'react';

interface SimpleChatButtonProps {
  onClick: () => void;
}

// Enhanced button styles
const buttonStyles = {
  button: (isHovered: boolean) => ({
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: isHovered
      ? 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)'
      : 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontSize: '26px',
    cursor: 'pointer',
    zIndex: 9999,
    boxShadow: isHovered
      ? '0 8px 25px rgba(139, 92, 246, 0.4), 0 0 0 0 rgba(139, 92, 246, 0.7)'
      : '0 6px 20px rgba(139, 92, 246, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    animation: isHovered ? 'none' : 'pulse 2s infinite',
  }),
  pulseRing: (isHovered: boolean) => ({
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '2px solid rgba(139, 92, 246, 0.6)',
    transform: 'translate(-50%, -50%)',
    animation: isHovered ? 'none' : 'pulseRing 2s infinite',
    pointerEvents: 'none' as const,
  }),
};

export function SimpleChatButton({ onClick }: SimpleChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Enhanced Chat button with pulse effect */}
      <div style={{ position: 'relative' }}>
        <div style={buttonStyles.pulseRing(isHovered)} />
        <button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={buttonStyles.button(isHovered)}
          title="Chat with Motivio Assistant"
          aria-label="Open chat with Motivio Assistant"
        >
          {/* AI Avatar with Brain Icon */}
          <div style={{
            width: '36px',
            height: '36px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}>
            {/* Brain SVG Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
            >
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
              <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
              <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
              <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
              <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
              <path d="M6 18a4 4 0 0 1-1.967-.516"/>
              <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Enhanced Tooltip */}
      <div style={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        color: '#374151',
        padding: '12px 16px',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 999,
        maxWidth: '220px',
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'none',
        border: '1px solid rgba(139, 92, 246, 0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>💬</span>
          <span>Need help? Chat with our AI assistant!</span>
        </div>
        {/* Tooltip arrow */}
        <div style={{
          position: 'absolute',
          bottom: '-6px',
          right: '24px',
          width: '12px',
          height: '12px',
          background: 'rgba(255, 255, 255, 0.95)',
          transform: 'rotate(45deg)',
          border: '1px solid rgba(139, 92, 246, 0.1)',
          borderTop: 'none',
          borderLeft: 'none',
        }} />
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3), 0 0 0 0 rgba(139, 92, 246, 0.7);
          }
          70% {
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3), 0 0 0 10px rgba(139, 92, 246, 0);
          }
          100% {
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3), 0 0 0 0 rgba(139, 92, 246, 0);
          }
        }

        @keyframes pulseRing {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        /* Mobile responsive adjustments */
        @media (max-width: 480px) {
          button[style*="position: fixed"][style*="bottom: 20px"] {
            bottom: 20px !important;
            right: 15px !important;
            width: 56px !important;
            height: 56px !important;
            fontSize: 22px !important;
          }

          div[style*="bottom: 100px"][style*="right: 20px"] {
            bottom: 85px !important;
            right: 15px !important;
            left: 15px !important;
            maxWidth: calc(100vw - 30px) !important;
          }
        }
      `}</style>
    </>
  );
}
