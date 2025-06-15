import { useState, useRef, useEffect } from 'react';

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

export function SimpleChatWidget({ isOpen, onClose }: SimpleChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm your SalesAIde assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! Great to meet you! I'm here to help you understand how SalesAIde can transform your retail business. What would you like to know?";
    }
    
    if (input.includes('sales') || input.includes('boost')) {
      return "Excellent! Our AI-powered sales optimization has helped retailers achieve an average 40% sales increase. We analyze your data to uncover hidden revenue opportunities. Would you like to know more?";
    }
    
    if (input.includes('price') || input.includes('cost')) {
      return "Great question! Our pricing starts at $299/month for small businesses and scales based on your needs. Most clients see ROI within the first month. Would you like a personalized quote?";
    }
    
    if (input.includes('demo')) {
      return "Absolutely! I'd love to show you SalesAIde in action. Our personalized demos take just 30 minutes and show real results with your business type. Shall we schedule one?";
    }
    
    return "That's a great question! SalesAIde helps retail businesses boost sales, optimize inventory, and understand customers better. What specific area interests you most?";
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Chat widget */}
      <div style={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        width: '350px',
        height: '500px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        border: '1px solid #e5e7eb',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
          color: 'white',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🤖
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>SalesAIde Assistant</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Online now</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: '12px',
                background: message.sender === 'user' 
                  ? 'linear-gradient(45deg, #8B5CF6, #EC4899)'
                  : '#f3f4f6',
                color: message.sender === 'user' ? 'white' : '#374151',
                fontSize: '14px',
                lineHeight: '1.4'
              }}>
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '8px 12px',
                borderRadius: '12px',
                background: '#f3f4f6',
                color: '#374151',
                fontSize: '14px'
              }}>
                <span>SalesAIde is typing</span>
                <span style={{ animation: 'blink 1s infinite' }}>...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '8px'
        }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            style={{
              background: inputValue.trim() 
                ? 'linear-gradient(45deg, #8B5CF6, #EC4899)'
                : '#d1d5db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              fontSize: '14px'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
