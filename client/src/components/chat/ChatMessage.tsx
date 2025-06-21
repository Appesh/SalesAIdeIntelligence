import { ChatMessage as ChatMessageType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { LeadCaptureForm } from './LeadCaptureForm';

interface ChatMessageProps {
  message: ChatMessageType;
  onOptionClick?: (option: string) => void;
  onLeadCapture?: (data: any) => void;
}

// Function to clean message content and display as plain text
function cleanMessageContent(content: string): string {
  let cleaned = content;

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
}

export function ChatMessage({ message, onOptionClick, onLeadCapture }: ChatMessageProps) {
  const isAgent = message.sender === 'agent';
  
  return (
    <div className={`flex gap-3 mb-4 ${isAgent ? 'justify-start' : 'justify-end'} chat-bounce-in`}>
      {isAgent && (
        <Avatar className="h-8 w-8 bg-gradient-to-r from-primary to-accent">
          <AvatarFallback>
            <Bot className="h-4 w-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${isAgent ? 'order-2' : 'order-1'}`}>
        <div
          className={`
            rounded-2xl px-4 py-3 text-sm
            ${isAgent 
              ? 'bg-gray-100 text-gray-900' 
              : 'bg-gradient-to-r from-primary to-accent text-white'
            }
          `}
        >
          <div className="whitespace-pre-wrap">
            {cleanMessageContent(message.content)}
          </div>
        </div>
        
        {message.type === 'options' && message.options && (
          <div className="mt-3 space-y-2">
            {message.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="mr-2 mb-2 text-xs hover:bg-primary hover:text-white transition-colors"
                onClick={() => onOptionClick?.(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {message.type === 'lead-form' && (
          <div className="mt-3">
            <LeadCaptureForm
              onSubmit={(data) => onLeadCapture?.(data)}
              onCancel={() => onOptionClick?.('Continue chatting first')}
            />
          </div>
        )}
        
        <div className={`text-xs text-gray-500 mt-1 ${isAgent ? 'text-left' : 'text-right'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {!isAgent && (
        <Avatar className="h-8 w-8 bg-gray-600">
          <AvatarFallback>
            <User className="h-4 w-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
