import React, { useState } from 'react';
import { useChatSimple as useChat } from '@/hooks/use-chat-simple';
import { ChatButton } from './ChatButton';
import { ChatWidget } from './ChatWidget';
import { ChatAnalyticsPanel } from './ChatAnalyticsPanel';
import { AdminDashboard } from './AdminDashboard';

export function ChatContainer() {
  const { chatState, openChat, closeChat } = useChat();
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Debug logging
  console.log('ChatContainer rendered, chatState:', chatState);

  const handleToggleChat = () => {
    if (chatState.isOpen) {
      closeChat();
    } else {
      openChat();
    }
  };

  // Development shortcuts: Ctrl+Shift+A for analytics, Ctrl+Shift+D for admin
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      setShowAnalytics(true);
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      setShowAdmin(true);
    }
  };

  // Add event listener for development shortcut
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <ChatButton
        isOpen={chatState.isOpen}
        unreadCount={chatState.unreadCount}
        onClick={handleToggleChat}
      />

      <ChatWidget
        isOpen={chatState.isOpen}
        onClose={closeChat}
      />

      <ChatAnalyticsPanel
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
      />

      <AdminDashboard
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
      />
    </>
  );
}
