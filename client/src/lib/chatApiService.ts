import { apiRequest } from './queryClient';

// Types for API requests/responses
export interface CreateSessionRequest {
  id: string;
  startedAt?: Date;
  qualificationStage?: string;
  businessSize?: string;
  currentTopic?: string;
  userIntent?: string;
  painPoints?: string[];
  budget?: string;
  timeline?: string;
}

export interface CreateMessageRequest {
  id: string;
  sessionId: string;
  content: string;
  sender: 'user' | 'agent';
  messageType?: string;
  options?: string[];
  metadata?: {
    intent?: string;
    confidence?: number;
    followUp?: string;
  };
}

export interface CreateLeadRequest {
  sessionId: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  businessType: string;
  interests?: string[];
  qualificationStage: string;
  leadScore?: number;
}

export interface CreateAnalyticsRequest {
  sessionId: string;
  messageCount?: number;
  userMessageCount?: number;
  agentMessageCount?: number;
  duration?: number;
  leadCaptured?: boolean;
  conversationFlow?: string[];
  intents?: string[];
}

export class ChatApiService {
  private static instance: ChatApiService;

  public static getInstance(): ChatApiService {
    if (!ChatApiService.instance) {
      ChatApiService.instance = new ChatApiService();
    }
    return ChatApiService.instance;
  }

  // Session operations
  async createSession(sessionData: CreateSessionRequest) {
    const response = await apiRequest('POST', '/api/chat/sessions', sessionData);
    return response.json();
  }

  async getSession(sessionId: string) {
    const response = await apiRequest('GET', `/api/chat/sessions/${sessionId}`);
    return response.json();
  }

  async updateSession(sessionId: string, updates: Partial<CreateSessionRequest>) {
    const response = await apiRequest('PATCH', `/api/chat/sessions/${sessionId}`, updates);
    return response.json();
  }

  async getSessions(limit = 50) {
    const response = await apiRequest('GET', `/api/chat/sessions?limit=${limit}`);
    return response.json();
  }

  // Message operations
  async createMessage(messageData: CreateMessageRequest) {
    const response = await apiRequest('POST', '/api/chat/messages', messageData);
    return response.json();
  }

  async getMessages(sessionId: string) {
    const response = await apiRequest('GET', `/api/chat/sessions/${sessionId}/messages`);
    return response.json();
  }

  // Lead operations
  async createLead(leadData: CreateLeadRequest) {
    const response = await apiRequest('POST', '/api/chat/leads', leadData);
    return response.json();
  }

  async getLeads() {
    const response = await apiRequest('GET', '/api/chat/leads');
    return response.json();
  }

  async updateLead(leadId: number, updates: Partial<CreateLeadRequest>) {
    const response = await apiRequest('PATCH', `/api/chat/leads/${leadId}`, updates);
    return response.json();
  }

  // Analytics operations
  async createAnalytics(analyticsData: CreateAnalyticsRequest) {
    const response = await apiRequest('POST', '/api/chat/analytics', analyticsData);
    return response.json();
  }

  async getAnalytics() {
    const response = await apiRequest('GET', '/api/chat/analytics');
    return response.json();
  }

  async getSessionAnalytics(sessionId: string) {
    const response = await apiRequest('GET', `/api/chat/analytics/${sessionId}`);
    return response.json();
  }

  // Dashboard operations
  async getDashboardSummary() {
    const response = await apiRequest('GET', '/api/chat/dashboard');
    return response.json();
  }

  // Batch operations for efficiency
  async saveSessionWithMessages(sessionData: CreateSessionRequest, messages: CreateMessageRequest[]) {
    try {
      // Create session first
      const sessionResponse = await this.createSession(sessionData);
      
      if (!sessionResponse.success) {
        throw new Error('Failed to create session');
      }

      // Create all messages
      const messagePromises = messages.map(message => this.createMessage(message));
      const messageResponses = await Promise.all(messagePromises);

      // Check if all messages were created successfully
      const failedMessages = messageResponses.filter(response => !response.success);
      if (failedMessages.length > 0) {
        console.warn('Some messages failed to save:', failedMessages);
      }

      return {
        success: true,
        session: sessionResponse.session,
        messages: messageResponses.filter(r => r.success).map(r => r.message)
      };
    } catch (error) {
      console.error('Failed to save session with messages:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async saveLeadWithAnalytics(leadData: CreateLeadRequest, analyticsData: CreateAnalyticsRequest) {
    try {
      // Create lead and analytics in parallel
      const [leadResponse, analyticsResponse] = await Promise.all([
        this.createLead(leadData),
        this.createAnalytics(analyticsData)
      ]);

      return {
        success: leadResponse.success && analyticsResponse.success,
        lead: leadResponse.lead,
        analytics: analyticsResponse.analytics,
        errors: [
          ...(leadResponse.success ? [] : [leadResponse.message]),
          ...(analyticsResponse.success ? [] : [analyticsResponse.message])
        ]
      };
    } catch (error) {
      console.error('Failed to save lead with analytics:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Utility methods
  async syncSession(sessionId: string, sessionData: any, messages: any[]) {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Sync timeout')), 5000)
      );

      const syncPromise = this.performSync(sessionId, sessionData, messages);

      return await Promise.race([syncPromise, timeoutPromise]);
    } catch (error) {
      console.warn('Failed to sync session:', error);
      return { success: false, error: error.message };
    }
  }

  private async performSync(sessionId: string, sessionData: any, messages: any[]) {
    // Try to create session first (simpler approach)
    try {
      await this.createSession({ id: sessionId, ...sessionData });
    } catch (error) {
      // If creation fails, try to update
      try {
        await this.updateSession(sessionId, sessionData);
      } catch (updateError) {
        console.warn('Session sync failed:', updateError);
      }
    }

    // Only sync the last few messages to avoid overwhelming the API
    const recentMessages = messages.slice(-5);
    if (recentMessages.length > 0) {
      try {
        const messagePromises = recentMessages.map(message =>
          this.createMessage({ ...message, sessionId }).catch(err => {
            console.warn('Message sync failed:', err);
            return { success: false };
          })
        );
        await Promise.all(messagePromises);
      } catch (error) {
        console.warn('Message sync failed:', error);
      }
    }

    return { success: true };
  }
}
