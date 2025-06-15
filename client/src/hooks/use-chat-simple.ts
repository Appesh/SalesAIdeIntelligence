import { useState, useCallback } from 'react';
import { ChatState, ChatMessage, ChatSession } from '@/lib/types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialChatState: ChatState = {
  isOpen: false,
  session: null,
  isTyping: false,
  unreadCount: 0,
};

export function useChatSimple() {
  const [chatState, setChatState] = useState<ChatState>(initialChatState);

  console.log('useChatSimple hook called, current state:', chatState);

  const openChat = useCallback(() => {
    console.log('Opening chat (simple version)...');
    
    setChatState(prev => {
      if (!prev.session) {
        const welcomeMessage: ChatMessage = {
          id: generateId(),
          content: "👋 Hi! I'm your SalesAIde assistant. How can I help you today?",
          sender: 'agent',
          timestamp: new Date(),
          type: 'text'
        };

        const newSession: ChatSession = {
          id: generateId(),
          messages: [welcomeMessage],
          isActive: true,
          startedAt: new Date(),
        };

        return {
          ...prev,
          isOpen: true,
          session: newSession,
          unreadCount: 0,
        };
      }

      return {
        ...prev,
        isOpen: true,
        unreadCount: 0,
      };
    });
  }, []);

  const closeChat = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    console.log('Sending message (simple):', content);

    // Add user message immediately
    setChatState(prev => {
      if (!prev.session) return prev;

      const userMessage: ChatMessage = {
        id: generateId(),
        content: content.trim(),
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      return {
        ...prev,
        session: {
          ...prev.session,
          messages: [...prev.session.messages, userMessage],
        },
        isTyping: true,
      };
    });

    // Add agent response after delay
    setTimeout(() => {
      setChatState(prev => {
        if (!prev.session) return prev;

        const agentMessage: ChatMessage = {
          id: generateId(),
          content: getSimpleResponse(content),
          sender: 'agent',
          timestamp: new Date(),
          type: 'text'
        };

        return {
          ...prev,
          session: {
            ...prev.session,
            messages: [...prev.session.messages, agentMessage],
          },
          isTyping: false,
        };
      });
    }, 1000);
  }, []);

  const clearChat = useCallback(() => {
    setChatState(initialChatState);
  }, []);

  return {
    chatState,
    openChat,
    closeChat,
    sendMessage,
    clearChat,
  };
}

function getSimpleResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('hello') || msg.includes('hi')) {
    return "Hello! Great to meet you! I'm here to help you understand how SalesAIde can transform your retail business. What would you like to know?";
  }
  
  if (msg.includes('sales') || msg.includes('boost')) {
    return "Excellent! Our AI-powered sales optimization has helped retailers achieve an average 40% sales increase. We analyze your data to uncover hidden revenue opportunities. Would you like to know more?";
  }
  
  if (msg.includes('price') || msg.includes('cost')) {
    return "Great question! Our pricing starts at $299/month for small businesses and scales based on your needs. Most clients see ROI within the first month. Would you like a personalized quote?";
  }
  
  if (msg.includes('demo')) {
    return "Absolutely! I'd love to show you SalesAIde in action. Our personalized demos take just 30 minutes and show real results with your business type. Shall we schedule one?";
  }
  
  return "That's a great question! SalesAIde helps retail businesses boost sales, optimize inventory, and understand customers better. What specific area interests you most?";
}
