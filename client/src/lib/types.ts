export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  features: string[];
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  color: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface Stats {
  value: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  businessType: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'options' | 'form' | 'lead-form';
  options?: string[];
  metadata?: {
    intent?: string;
    confidence?: number;
    followUp?: string;
  };
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  isActive: boolean;
  startedAt: Date;
  userInfo?: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
    businessType?: string;
    interests?: string[];
  };
  context?: {
    currentTopic?: string;
    qualificationStage?: 'initial' | 'needs-assessment' | 'solution-matching' | 'lead-capture' | 'demo-scheduling';
    userIntent?: string;
    businessSize?: 'small' | 'medium' | 'enterprise';
    painPoints?: string[];
    budget?: string;
    timeline?: string;
  };
}

export interface ChatState {
  isOpen: boolean;
  session: ChatSession | null;
  isTyping: boolean;
  unreadCount: number;
}

export interface ConversationContext {
  previousMessages: ChatMessage[];
  userInfo: ChatSession['userInfo'];
  sessionContext: ChatSession['context'];
  currentIntent?: string;
}

export interface AgentResponse {
  content: string;
  type?: 'text' | 'options' | 'form' | 'lead-form';
  options?: string[];
  followUpQuestions?: string[];
  contextUpdate?: Partial<ChatSession['context']>;
  userInfoUpdate?: Partial<ChatSession['userInfo']>;
}
