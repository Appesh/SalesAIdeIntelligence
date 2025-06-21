import { useState, useRef, useEffect } from 'react';
import { ChatService } from '@/lib/chatService';
import { ConversationContext } from '@/lib/types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface SimpleChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Component to display message content as plain text
function FormattedMessage({ content, sender }: { content: string; sender: 'user' | 'bot' }) {
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
      lineHeight: '1.5',
      color: sender === 'bot' ? '#374151' : 'inherit'
    }}>
      {cleanedContent}
    </div>
  );
}

// Enhanced styles for better UI/UX
const chatWidgetStyles = {
  container: (isOpen: boolean) => ({
    position: 'fixed' as const,
    bottom: '100px',
    right: '20px',
    width: 'min(400px, calc(100vw - 40px))', // Responsive width
    height: 'min(600px, calc(100vh - 140px))', // Responsive height
    maxHeight: '80vh',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    zIndex: 9998,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    opacity: isOpen ? 1 : 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: isOpen ? 'auto' : 'none',
  }),
  header: {
    background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    color: 'white',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '20px 20px 0 0',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
    pointerEvents: 'none' as const,
  },
  avatar: {
    width: '44px',
    height: '44px',
    background: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  closeButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
  },
};

// Additional styles for messages and input
const messageStyles = {
  container: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    scrollBehavior: 'smooth' as const,
  },
  messageWrapper: (sender: 'user' | 'bot') => ({
    display: 'flex',
    justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
    animation: 'slideInMessage 0.3s ease-out',
  }),
  message: (sender: 'user' | 'bot') => ({
    maxWidth: '85%',
    padding: '14px 18px',
    borderRadius: sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    background: sender === 'user'
      ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
      : 'rgba(248, 250, 252, 0.9)',
    color: sender === 'user' ? 'white' : '#374151',
    fontSize: '14px',
    lineHeight: '1.6',
    boxShadow: sender === 'user'
      ? '0 4px 12px rgba(139, 92, 246, 0.3)'
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: sender === 'bot' ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
    backdropFilter: 'blur(10px)',
    position: 'relative' as const,
    wordBreak: 'break-word' as const,
  }),
  inputContainer: {
    padding: '20px',
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    display: 'flex',
    gap: '12px',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    fontSize: '14px',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)',
  },
  sendButton: (hasValue: boolean) => ({
    background: hasValue
      ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
      : 'rgba(156, 163, 175, 0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 20px',
    cursor: hasValue ? 'pointer' : 'not-allowed',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: hasValue ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none',
    transform: hasValue ? 'scale(1)' : 'scale(0.95)',
  }),
  typingIndicator: {
    padding: '12px 16px',
    borderRadius: '18px 18px 18px 4px',
    background: 'rgba(248, 250, 252, 0.8)',
    color: '#6B7280',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(10px)',
  },
};

export function SimpleChatWidget({ isOpen, onClose }: SimpleChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm your Motivio assistant powered by AI. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatService = ChatService.getInstance();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Enhanced keyboard handling
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    console.log('💬 User message sent:', userMessage);
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Create conversation context from current messages
      const context: ConversationContext = {
        previousMessages: messages.map(msg => ({
          id: msg.id,
          content: msg.text,
          sender: msg.sender === 'user' ? 'user' : 'agent',
          timestamp: msg.timestamp,
          type: 'text'
        })),
        userInfo: { businessType: 'retail' },
        sessionContext: { qualificationStage: 'initial' }
      };

      console.log('🤖 Generating AI response for:', currentInput);
      console.log('📋 Context:', context);

      // Generate AI response
      const agentResponse = await chatService.generateResponse(currentInput, context);
      console.log('✅ AI response received:', agentResponse);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: agentResponse.content,
        sender: 'bot',
        timestamp: new Date()
      };

      console.log('💬 Bot message created:', botMessage);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('❌ Error generating AI response:', error);

      // Fallback to hardcoded response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request right now. Let me try to help you with our standard information. " + getBotResponse(currentInput),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! Great to meet you! I'm here to help you understand how Motivio can transform your retail business. What would you like to know?";
    }
    
    if (input.includes('sales') || input.includes('boost')) {
      return "Excellent! Our AI-powered sales optimization has helped retailers achieve an average 40% sales increase. We analyze your data to uncover hidden revenue opportunities. Would you like to know more?";
    }
    
    if (input.includes('price') || input.includes('cost')) {
      return "Great question! Our pricing starts at $299/month for small businesses and scales based on your needs. Most clients see ROI within the first month. Would you like a personalized quote?";
    }
    
    if (input.includes('demo')) {
      return "Absolutely! I'd love to show you Motivio in action. Our personalized demos take just 30 minutes and show real results with your business type. Shall we schedule one?";
    }
    
    return "That's a great question! Motivio helps retail businesses boost sales, optimize inventory, and understand customers better. What specific area interests you most?";
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Enhanced Chat widget with improved styling */}
      <div style={chatWidgetStyles.container(isOpen)}>
        {/* Enhanced Header */}
        <div style={chatWidgetStyles.header}>
          <div style={chatWidgetStyles.headerOverlay} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
            <div style={chatWidgetStyles.avatar}>
              {/* Enhanced AI Avatar with Brain Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  color: 'white',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                  zIndex: 2,
                  position: 'relative'
                }}
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
              {/* Subtle animated background */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
                zIndex: 1
              }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', letterSpacing: '-0.025em' }}>
                Motivio Assistant
              </h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9, fontWeight: '500' }}>
                {isTyping ? 'Typing...' : 'Online now'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              ...chatWidgetStyles.closeButton,
              ':hover': {
                background: 'rgba(255, 255, 255, 0.3)',
                transform: 'scale(1.05)',
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Enhanced Messages Area */}
        <div style={messageStyles.container}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={messageStyles.messageWrapper(message.sender)}
            >
              <div style={messageStyles.message(message.sender)} className="chat-message">
                <FormattedMessage content={message.text} sender={message.sender} />
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={messageStyles.messageWrapper('bot')}>
              <div style={messageStyles.typingIndicator}>
                <span>SalesAIde is typing</span>
                <div style={{
                  display: 'flex',
                  gap: '2px',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#8B5CF6',
                    animation: 'typingDot 1.4s infinite ease-in-out',
                    animationDelay: '0s'
                  }} />
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#8B5CF6',
                    animation: 'typingDot 1.4s infinite ease-in-out',
                    animationDelay: '0.2s'
                  }} />
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#8B5CF6',
                    animation: 'typingDot 1.4s infinite ease-in-out',
                    animationDelay: '0.4s'
                  }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div style={messageStyles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={{
              ...messageStyles.input,
              ':focus': {
                borderColor: '#8B5CF6',
                boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
              }
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#8B5CF6';
              e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
            aria-label="Type your message"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            style={messageStyles.sendButton(!!inputValue.trim())}
            onMouseEnter={(e) => {
              if (inputValue.trim()) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (inputValue.trim()) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
              }
            }}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>

      {/* Add custom CSS animations */}
      <style>{`
        @keyframes slideInMessage {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typingDot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        /* Custom scrollbar for messages */
        div[style*="overflowY: auto"]::-webkit-scrollbar {
          width: 6px;
        }

        div[style*="overflowY: auto"]::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 3px;
        }

        div[style*="overflowY: auto"]::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }

        div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }

        /* Enhanced formatting for message content */
        .chat-message strong {
          font-weight: 600 !important;
          color: #6366F1 !important;
        }

        .chat-message em {
          font-style: italic !important;
          color: #8B5CF6 !important;
        }

        .chat-message p {
          margin: 0 0 8px 0;
        }

        .chat-message p:last-child {
          margin-bottom: 0;
        }

        /* Ensure inline formatting works properly */
        .chat-message span[style*="color"] {
          display: inline !important;
        }

        .chat-message div[dangerouslySetInnerHTML] {
          line-height: 1.5;
        }

        /* Fix for nested formatting */
        .chat-message * {
          line-height: inherit;
        }

        /* Additional CSS to ensure proper rendering */
        .chat-message [style*="font-weight"] {
          font-weight: 600 !important;
        }

        .chat-message [style*="color: #6366F1"] {
          color: #6366F1 !important;
        }

        .chat-message [style*="color: #8B5CF6"] {
          color: #8B5CF6 !important;
        }

        .chat-message [style*="color: #059669"] {
          color: #059669 !important;
        }

        .chat-message [style*="color: #6B7280"] {
          color: #6B7280 !important;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 480px) {
          div[style*="position: fixed"][style*="bottom: 100px"] {
            bottom: 80px !important;
            right: 10px !important;
            left: 10px !important;
            width: calc(100vw - 20px) !important;
            height: calc(100vh - 100px) !important;
            max-height: none !important;
          }
        }
      `}</style>
    </>
  );
}
