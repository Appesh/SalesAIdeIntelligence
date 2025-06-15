import {
  contacts,
  chatSessions,
  chatMessages,
  chatLeads,
  chatAnalytics,
  type Contact,
  type InsertContact,
  type ChatSession,
  type InsertChatSession,
  type ChatMessage,
  type InsertChatMessage,
  type ChatLead,
  type InsertChatLead,
  type ChatAnalytics,
  type InsertChatAnalytics
} from "@shared/schema";

export interface IStorage {
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  // Chat session operations
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(sessionId: string): Promise<ChatSession | null>;
  updateChatSession(sessionId: string, updates: Partial<InsertChatSession>): Promise<ChatSession>;
  getChatSessions(limit?: number): Promise<ChatSession[]>;

  // Chat message operations
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;

  // Chat lead operations
  createChatLead(lead: InsertChatLead): Promise<ChatLead>;
  getChatLeads(): Promise<ChatLead[]>;
  updateChatLead(leadId: number, updates: Partial<InsertChatLead>): Promise<ChatLead>;

  // Chat analytics operations
  createChatAnalytics(analytics: InsertChatAnalytics): Promise<ChatAnalytics>;
  getChatAnalytics(): Promise<ChatAnalytics[]>;
  getChatAnalyticsBySession(sessionId: string): Promise<ChatAnalytics | null>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private chatSessions: Map<string, ChatSession>;
  private chatMessages: Map<string, ChatMessage[]>;
  private chatLeads: Map<number, ChatLead>;
  private chatAnalytics: Map<string, ChatAnalytics>;
  private currentContactId: number;
  private currentLeadId: number;
  private currentAnalyticsId: number;

  constructor() {
    this.contacts = new Map();
    this.chatSessions = new Map();
    this.chatMessages = new Map();
    this.chatLeads = new Map();
    this.chatAnalytics = new Map();
    this.currentContactId = 1;
    this.currentLeadId = 1;
    this.currentAnalyticsId = 1;
  }

  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Chat session operations
  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const session: ChatSession = {
      ...insertSession,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.chatSessions.set(session.id, session);
    this.chatMessages.set(session.id, []); // Initialize empty messages array
    return session;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | null> {
    return this.chatSessions.get(sessionId) || null;
  }

  async updateChatSession(sessionId: string, updates: Partial<InsertChatSession>): Promise<ChatSession> {
    const existingSession = this.chatSessions.get(sessionId);
    if (!existingSession) {
      throw new Error(`Chat session ${sessionId} not found`);
    }

    const updatedSession: ChatSession = {
      ...existingSession,
      ...updates,
      updatedAt: new Date(),
    };

    this.chatSessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  async getChatSessions(limit = 50): Promise<ChatSession[]> {
    const sessions = Array.from(this.chatSessions.values());
    return sessions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  // Chat message operations
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const message: ChatMessage = {
      ...insertMessage,
      timestamp: new Date(),
    };

    const sessionMessages = this.chatMessages.get(insertMessage.sessionId) || [];
    sessionMessages.push(message);
    this.chatMessages.set(insertMessage.sessionId, sessionMessages);

    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return this.chatMessages.get(sessionId) || [];
  }

  // Chat lead operations
  async createChatLead(insertLead: InsertChatLead): Promise<ChatLead> {
    const id = this.currentLeadId++;
    const lead: ChatLead = {
      ...insertLead,
      id,
      createdAt: new Date(),
    };
    this.chatLeads.set(id, lead);
    return lead;
  }

  async getChatLeads(): Promise<ChatLead[]> {
    return Array.from(this.chatLeads.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateChatLead(leadId: number, updates: Partial<InsertChatLead>): Promise<ChatLead> {
    const existingLead = this.chatLeads.get(leadId);
    if (!existingLead) {
      throw new Error(`Chat lead ${leadId} not found`);
    }

    const updatedLead: ChatLead = {
      ...existingLead,
      ...updates,
    };

    this.chatLeads.set(leadId, updatedLead);
    return updatedLead;
  }

  // Chat analytics operations
  async createChatAnalytics(insertAnalytics: InsertChatAnalytics): Promise<ChatAnalytics> {
    const id = this.currentAnalyticsId++;
    const analytics: ChatAnalytics = {
      ...insertAnalytics,
      id,
      createdAt: new Date(),
    };
    this.chatAnalytics.set(insertAnalytics.sessionId, analytics);
    return analytics;
  }

  async getChatAnalytics(): Promise<ChatAnalytics[]> {
    return Array.from(this.chatAnalytics.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getChatAnalyticsBySession(sessionId: string): Promise<ChatAnalytics | null> {
    return this.chatAnalytics.get(sessionId) || null;
  }
}

export const storage = new MemStorage();
