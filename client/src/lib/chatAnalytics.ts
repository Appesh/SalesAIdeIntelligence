import { ChatSession, ChatMessage } from './types';

export interface ChatAnalytics {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  messageCount: number;
  userMessageCount: number;
  agentMessageCount: number;
  qualificationStage: string;
  leadCaptured: boolean;
  userInfo?: any;
  conversationFlow: string[];
  intents: string[];
  duration?: number;
}

export class ChatAnalyticsService {
  private static instance: ChatAnalyticsService;
  private analytics: ChatAnalytics[] = [];

  public static getInstance(): ChatAnalyticsService {
    if (!ChatAnalyticsService.instance) {
      ChatAnalyticsService.instance = new ChatAnalyticsService();
    }
    return ChatAnalyticsService.instance;
  }

  public trackSession(session: ChatSession): void {
    const analytics: ChatAnalytics = {
      sessionId: session.id,
      startTime: session.startedAt,
      messageCount: session.messages.length,
      userMessageCount: session.messages.filter(m => m.sender === 'user').length,
      agentMessageCount: session.messages.filter(m => m.sender === 'agent').length,
      qualificationStage: session.context?.qualificationStage || 'initial',
      leadCaptured: !!(session.userInfo?.email),
      userInfo: session.userInfo,
      conversationFlow: this.extractConversationFlow(session.messages),
      intents: this.extractIntents(session.messages),
    };

    // Update or add analytics
    const existingIndex = this.analytics.findIndex(a => a.sessionId === session.id);
    if (existingIndex >= 0) {
      this.analytics[existingIndex] = analytics;
    } else {
      this.analytics.push(analytics);
    }

    // Log to console for development (in production, send to analytics service)
    console.log('Chat Analytics:', analytics);
  }

  public endSession(sessionId: string): void {
    const analytics = this.analytics.find(a => a.sessionId === sessionId);
    if (analytics) {
      analytics.endTime = new Date();
      analytics.duration = analytics.endTime.getTime() - analytics.startTime.getTime();
    }
  }

  public getSessionAnalytics(sessionId: string): ChatAnalytics | undefined {
    return this.analytics.find(a => a.sessionId === sessionId);
  }

  public getAllAnalytics(): ChatAnalytics[] {
    return this.analytics;
  }

  public getConversionRate(): number {
    const totalSessions = this.analytics.length;
    const convertedSessions = this.analytics.filter(a => a.leadCaptured).length;
    return totalSessions > 0 ? convertedSessions / totalSessions : 0;
  }

  public getAverageSessionDuration(): number {
    const completedSessions = this.analytics.filter(a => a.duration);
    if (completedSessions.length === 0) return 0;
    
    const totalDuration = completedSessions.reduce((sum, a) => sum + (a.duration || 0), 0);
    return totalDuration / completedSessions.length;
  }

  public getTopIntents(): { intent: string; count: number }[] {
    const intentCounts: { [key: string]: number } = {};
    
    this.analytics.forEach(a => {
      a.intents.forEach(intent => {
        intentCounts[intent] = (intentCounts[intent] || 0) + 1;
      });
    });

    return Object.entries(intentCounts)
      .map(([intent, count]) => ({ intent, count }))
      .sort((a, b) => b.count - a.count);
  }

  private extractConversationFlow(messages: ChatMessage[]): string[] {
    return messages
      .filter(m => m.sender === 'agent' && m.type === 'options')
      .map(m => m.metadata?.intent || 'unknown');
  }

  private extractIntents(messages: ChatMessage[]): string[] {
    const intents: string[] = [];
    
    messages.forEach(message => {
      if (message.metadata?.intent) {
        intents.push(message.metadata.intent);
      }
    });

    return [...new Set(intents)]; // Remove duplicates
  }

  // Development helper to view analytics
  public logAnalyticsSummary(): void {
    console.log('=== Chat Analytics Summary ===');
    console.log(`Total Sessions: ${this.analytics.length}`);
    console.log(`Conversion Rate: ${(this.getConversionRate() * 100).toFixed(1)}%`);
    console.log(`Average Duration: ${(this.getAverageSessionDuration() / 1000).toFixed(1)}s`);
    console.log('Top Intents:', this.getTopIntents().slice(0, 5));
    console.log('Recent Sessions:', this.analytics.slice(-3));
  }
}
