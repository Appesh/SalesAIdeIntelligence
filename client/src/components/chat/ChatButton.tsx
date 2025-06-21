// Temporarily simplified for debugging
// import { MessageCircle, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';

interface ChatButtonProps {
  isOpen: boolean;
  unreadCount: number;
  onClick: () => void;
}

export function ChatButton({ isOpen, unreadCount, onClick }: ChatButtonProps) {
  console.log('ChatButton rendered, isOpen:', isOpen, 'unreadCount:', unreadCount);

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      {/* Debug indicator */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '0',
        background: 'yellow',
        color: 'black',
        padding: '2px 5px',
        fontSize: '10px',
        zIndex: 9999
      }}>
        CHAT BTN
      </div>
      <button
        onClick={onClick}
        style={{
          position: 'relative',
          height: '52px',
          width: '52px',
          borderRadius: '50%',
          background: isOpen ? '#4B5563' : 'linear-gradient(to right, #8B5CF6, #EC4899)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '20px',
          minHeight: '44px',
          minWidth: '44px'
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '✕' : '💬'}

        {!isOpen && unreadCount > 0 && (
          <div style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            height: '24px',
            width: '24px',
            borderRadius: '50%',
            background: '#EF4444',
            color: 'white',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </button>
      
      {!isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          padding: '8px 12px',
          maxWidth: '180px',
          fontSize: '13px',
          color: '#374151',
          whiteSpace: 'nowrap'
        }}>
          💬 Need help? Chat with us!
        </div>
      )}
    </div>
  );
}
