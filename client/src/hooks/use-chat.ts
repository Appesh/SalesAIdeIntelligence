import { useState, useCallback, useEffect } from 'react';
import { ChatState, ChatMessage, ChatSession, ConversationContext } from '@/lib/types';
import { ChatService } from '@/lib/chatService';
import { ChatAnalyticsService } from '@/lib/chatAnalytics';
import { ChatApiService } from '@/lib/chatApiService';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialChatState: ChatState = {
  isOpen: false,
  session: null,
  isTyping: false,
  unreadCount: 0,
};

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>(initialChatState);
  const chatService = ChatService.getInstance();
  const analyticsService = ChatAnalyticsService.getInstance();
  const apiService = ChatApiService.getInstance();

  // Track session changes for analytics and sync with backend
  useEffect(() => {
    if (chatState.session) {
      analyticsService.trackSession(chatState.session);

      // Temporarily disable auto-sync to improve responsiveness
      // TODO: Re-enable with better optimization
      /*
      const syncTimeout = setTimeout(() => {
        syncSessionWithBackend(chatState.session).catch(error => {
          console.warn('Background sync failed:', error);
        });
      }, 5000); // Sync every 5 seconds instead of on every change

      return () => clearTimeout(syncTimeout);
      */
    }
  }, [chatState.session, analyticsService]);

  // Sync session data with backend (non-blocking)
  const syncSessionWithBackend = async (session: ChatSession) => {
    try {
      const sessionData = {
        id: session.id,
        startedAt: session.startedAt,
        qualificationStage: session.context?.qualificationStage || 'initial',
        businessSize: session.context?.businessSize,
        currentTopic: session.context?.currentTopic,
        userIntent: session.context?.userIntent,
        painPoints: session.context?.painPoints || [],
        budget: session.context?.budget,
        timeline: session.context?.timeline,
        isActive: session.isActive
      };

      const messages = session.messages.map(msg => ({
        id: msg.id,
        sessionId: session.id,
        content: msg.content,
        sender: msg.sender,
        messageType: msg.type || 'text',
        options: msg.options,
        metadata: msg.metadata
      }));

      // Use a timeout to prevent hanging
      const result = await Promise.race([
        apiService.syncSession(session.id, sessionData, messages),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Sync timeout')), 3000)
        )
      ]);

      return result;
    } catch (error) {
      console.warn('Background sync failed (chat continues to work):', error);
      // Chat continues to work even if backend sync fails
      return { success: false, error: error.message };
    }
  };

  const openChat = useCallback(() => {
    console.log('Opening chat...');

    setChatState(prev => {
      console.log('Previous chat state:', prev);

      if (!prev.session) {
        // Create new session with welcome message
        const welcomeMessage: ChatMessage = {
          id: generateId(),
          content: "👋 Hi there! I'm your SalesAIde assistant. I'm here to help you discover how our AI-powered solutions can boost your retail sales. What would you like to know about?",
          sender: 'agent',
          timestamp: new Date(),
          type: 'text'
        };

        console.log('Created welcome message:', welcomeMessage);

        const newSession: ChatSession = {
          id: generateId(),
          messages: [welcomeMessage],
          isActive: true,
          startedAt: new Date(),
          context: {
            qualificationStage: 'initial'
          }
        };

        console.log('Created new session:', newSession);

        const newState = {
          ...prev,
          isOpen: true,
          session: newSession,
          unreadCount: 0,
        };

        console.log('New chat state:', newState);
        return newState;
      }

      const existingState = {
        ...prev,
        isOpen: true,
        unreadCount: 0,
      };

      console.log('Returning existing state:', existingState);
      return existingState;
    });
  }, []);

  const closeChat = useCallback(() => {
    setChatState(prev => {
      // Track session end when chat is closed
      if (prev.session) {
        analyticsService.endSession(prev.session.id);
      }

      return {
        ...prev,
        isOpen: false,
      };
    });
  }, [analyticsService]);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    console.log('Sending message:', content);

    setChatState(prev => {
      if (!prev.session) {
        console.log('No session found');
        return prev;
      }

      const userMessage: ChatMessage = {
        id: generateId(),
        content: content.trim(),
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      const updatedSession = {
        ...prev.session,
        messages: [...prev.session.messages, userMessage],
      };

      console.log('Updated session with user message:', updatedSession);

      return {
        ...prev,
        session: updatedSession,
        isTyping: true,
      };
    });

    // Generate enhanced agent response after a delay
    setTimeout(() => {
      console.log('Generating agent response for:', content);

      setChatState(prev => {
        if (!prev.session) {
          console.log('No session found for agent response');
          return prev;
        }

        // Create conversation context
        const context: ConversationContext = {
          previousMessages: prev.session.messages,
          userInfo: prev.session.userInfo,
          sessionContext: prev.session.context
        };

        console.log('Context for agent response:', context);

        const agentResponse = chatService.generateResponse(content, context);
        console.log('Generated agent response:', agentResponse);

        const agentMessage: ChatMessage = {
          id: generateId(),
          content: agentResponse.content,
          sender: 'agent',
          timestamp: new Date(),
          type: agentResponse.type || 'text',
          options: agentResponse.options,
        };

        const updatedSession = {
          ...prev.session,
          messages: [...prev.session.messages, agentMessage],
          context: {
            ...prev.session.context,
            ...agentResponse.contextUpdate
          },
          userInfo: {
            ...prev.session.userInfo,
            ...agentResponse.userInfoUpdate
          }
        };

        console.log('Final updated session:', updatedSession);

        return {
          ...prev,
          session: updatedSession,
          isTyping: false,
          unreadCount: prev.isOpen ? 0 : prev.unreadCount + 1,
        };
      });
    }, 1000); // Fixed 1 second delay for debugging
  }, [chatService]);

  const handleLeadCapture = useCallback((leadData: any) => {
    setChatState(prev => {
      if (!prev.session) return prev;

      // Update user info with captured lead data
      const updatedSession = {
        ...prev.session,
        userInfo: {
          ...prev.session.userInfo,
          name: leadData.name,
          email: leadData.email,
          company: leadData.company,
          phone: leadData.phone,
          businessType: leadData.businessType,
          interests: leadData.interests
        },
        context: {
          ...prev.session.context,
          qualificationStage: 'demo-scheduling' as const
        }
      };

      // Add confirmation message
      const confirmationMessage: ChatMessage = {
        id: generateId(),
        content: `Perfect! Thanks ${leadData.name}! I've got your information and I'm excited to help ${leadData.company} achieve amazing results with SalesAIde.

Based on your interests in ${leadData.interests.join(', ')}, I can already see some great opportunities for your ${leadData.businessType} business.

What would you like to do next?`,
        sender: 'agent',
        timestamp: new Date(),
        type: 'options',
        options: [
          'Schedule personalized demo',
          'Get custom ROI calculation',
          'Speak with sales expert',
          'Start free trial',
          'More questions first'
        ]
      };

      // Save lead to backend (non-blocking)
      const saveLeadToBackend = async () => {
        try {
          const leadRequest = {
            sessionId: updatedSession.id,
            name: leadData.name,
            email: leadData.email,
            company: leadData.company,
            phone: leadData.phone,
            businessType: leadData.businessType,
            interests: leadData.interests,
            qualificationStage: 'demo-scheduling',
            leadScore: calculateLeadScore(leadData, updatedSession.context)
          };

          const analyticsRequest = {
            sessionId: updatedSession.id,
            messageCount: updatedSession.messages.length + 1,
            userMessageCount: updatedSession.messages.filter(m => m.sender === 'user').length,
            agentMessageCount: updatedSession.messages.filter(m => m.sender === 'agent').length + 1,
            leadCaptured: true,
            conversationFlow: extractConversationFlow(updatedSession.messages),
            intents: extractIntents(updatedSession.messages)
          };

          await apiService.saveLeadWithAnalytics(leadRequest, analyticsRequest);
        } catch (error) {
          console.warn('Failed to save lead to backend:', error);
          // Don't block UI for backend failures
        }
      };

      // Execute save in background (temporarily disabled for better performance)
      // TODO: Re-enable with better optimization
      // saveLeadToBackend();

      return {
        ...prev,
        session: {
          ...updatedSession,
          messages: [...updatedSession.messages, confirmationMessage]
        }
      };
    });
  }, [apiService]);

  const clearChat = useCallback(() => {
    setChatState(initialChatState);
  }, []);

  return {
    chatState,
    openChat,
    closeChat,
    sendMessage,
    handleLeadCapture,
    clearChat,
  };
}

// Helper functions
function calculateLeadScore(leadData: any, context: any): number {
  let score = 0;

  // Base score for providing contact info
  score += 20;

  // Business type scoring
  const highValueBusinessTypes = ['electronics', 'fashion', 'automotive'];
  if (highValueBusinessTypes.includes(leadData.businessType)) {
    score += 15;
  }

  // Interest scoring
  if (leadData.interests?.length > 0) {
    score += leadData.interests.length * 5;
  }

  // Business size scoring
  if (context?.businessSize === 'enterprise') {
    score += 25;
  } else if (context?.businessSize === 'medium') {
    score += 15;
  } else if (context?.businessSize === 'small') {
    score += 10;
  }

  // Pain points scoring
  if (context?.painPoints?.length > 0) {
    score += context.painPoints.length * 8;
  }

  // Qualification stage scoring
  if (context?.qualificationStage === 'demo-scheduling') {
    score += 20;
  } else if (context?.qualificationStage === 'solution-matching') {
    score += 15;
  }

  return Math.min(score, 100); // Cap at 100
}

function extractConversationFlow(messages: ChatMessage[]): string[] {
  return messages
    .filter(m => m.sender === 'agent' && m.type === 'options')
    .map(m => m.metadata?.intent || 'unknown');
}

function extractIntents(messages: ChatMessage[]): string[] {
  const intents: string[] = [];

  messages.forEach(message => {
    if (message.metadata?.intent) {
      intents.push(message.metadata.intent);
    }
  });

  return [...new Set(intents)]; // Remove duplicates
}


