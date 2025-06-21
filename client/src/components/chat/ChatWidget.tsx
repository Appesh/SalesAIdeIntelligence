import { useEffect, useRef } from 'react';
import { X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { useChatSimple as useChat } from '@/hooks/use-chat-simple';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const { chatState, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Debug logging
  useEffect(() => {
    console.log('ChatWidget - chatState updated:', chatState);
    console.log('ChatWidget - isOpen prop:', isOpen);
  }, [chatState, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.session?.messages, chatState.isTyping]);

  const handleOptionClick = (option: string) => {
    sendMessage(option);
  };

  if (!isOpen) {
    console.log('ChatWidget not rendering because isOpen is false');
    return null;
  }

  console.log('ChatWidget rendering...');

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 w-[calc(100vw-1rem)] sm:w-96 max-w-sm sm:max-w-none h-[70vh] sm:h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden chat-slide-up">
      {/* Debug indicator */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        left: '0',
        background: 'green',
        color: 'white',
        padding: '2px 5px',
        fontSize: '10px',
        zIndex: 9999
      }}>
        CHAT WIDGET
      </div>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm sm:text-lg">🤖</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm sm:text-base truncate">Motivio Assistant</h3>
            <p className="text-xs opacity-90 truncate">
              {chatState.session?.context?.qualificationStage === 'demo-scheduling'
                ? 'Ready to schedule your demo'
                : chatState.session?.context?.qualificationStage === 'lead-capture'
                ? 'Let\'s get you connected'
                : chatState.session?.context?.qualificationStage === 'solution-matching'
                ? 'Finding your perfect solution'
                : 'Online • Ready to help'
              }
            </p>
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 h-8 w-8 p-0 hidden sm:flex"
            aria-label="Minimize chat"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatState.session?.messages ? (
            chatState.session.messages.map((message) => {
              console.log('Rendering message:', message);
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onOptionClick={handleOptionClick}
                />
              );
            })
          ) : (
            <div>No messages found</div>
          )}

          {chatState.isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput
        onSendMessage={sendMessage}
        disabled={chatState.isTyping}
      />
    </div>
  );
}
