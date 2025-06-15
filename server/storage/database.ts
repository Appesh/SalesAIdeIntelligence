import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { 
  contacts, 
  chatSessions, 
  chatMessages, 
  chatLeads, 
  chatAnalytics,
  type Contact,
  type ChatSession,
  type ChatMessage,
  type ChatLead,
  type ChatAnalytics,
  type InsertContact,
  type InsertChatSession,
  type InsertChatMessage,
  type InsertChatLead,
  type InsertChatAnalytics
} from "@shared/schema";
import { eq, desc, and, count, avg, sql } from "drizzle-orm";
import { dbConfig } from "../config";
import { logger } from "../logger";
import type { IStorage } from "../storage";

// Initialize database connection
const sql_client = neon(dbConfig.url);
const db = drizzle(sql_client);

export class DatabaseStorage implements IStorage {
  constructor() {
    logger.info("🗄️ Database storage initialized", "database");
  }

  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      const [contact] = await db.insert(contacts).values(insertContact).returning();
      logger.debug("Contact created", "database", { contactId: contact.id });
      return contact;
    } catch (error) {
      logger.error("Failed to create contact", "database", error);
      throw error;
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      const result = await db.select().from(contacts).orderBy(desc(contacts.createdAt));
      logger.debug(`Retrieved ${result.length} contacts`, "database");
      return result;
    } catch (error) {
      logger.error("Failed to get contacts", "database", error);
      throw error;
    }
  }

  // Chat session operations
  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    try {
      const [session] = await db.insert(chatSessions).values(insertSession).returning();
      logger.debug("Chat session created", "database", { sessionId: session.id });
      return session;
    } catch (error) {
      logger.error("Failed to create chat session", "database", error);
      throw error;
    }
  }

  async getChatSession(sessionId: string): Promise<ChatSession | null> {
    try {
      const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, sessionId));
      return session || null;
    } catch (error) {
      logger.error("Failed to get chat session", "database", { sessionId, error });
      throw error;
    }
  }

  async updateChatSession(sessionId: string, updates: Partial<InsertChatSession>): Promise<ChatSession> {
    try {
      const [session] = await db
        .update(chatSessions)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(chatSessions.id, sessionId))
        .returning();
      
      if (!session) {
        throw new Error(`Chat session ${sessionId} not found`);
      }
      
      logger.debug("Chat session updated", "database", { sessionId });
      return session;
    } catch (error) {
      logger.error("Failed to update chat session", "database", { sessionId, error });
      throw error;
    }
  }

  async getChatSessions(limit = 50): Promise<ChatSession[]> {
    try {
      const sessions = await db
        .select()
        .from(chatSessions)
        .orderBy(desc(chatSessions.createdAt))
        .limit(limit);
      
      logger.debug(`Retrieved ${sessions.length} chat sessions`, "database");
      return sessions;
    } catch (error) {
      logger.error("Failed to get chat sessions", "database", error);
      throw error;
    }
  }

  // Chat message operations
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    try {
      const [message] = await db.insert(chatMessages).values(insertMessage).returning();
      logger.debug("Chat message created", "database", { messageId: message.id, sessionId: message.sessionId });
      return message;
    } catch (error) {
      logger.error("Failed to create chat message", "database", error);
      throw error;
    }
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    try {
      const messages = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, sessionId))
        .orderBy(chatMessages.timestamp);
      
      logger.debug(`Retrieved ${messages.length} messages for session`, "database", { sessionId });
      return messages;
    } catch (error) {
      logger.error("Failed to get chat messages", "database", { sessionId, error });
      throw error;
    }
  }

  // Chat lead operations
  async createChatLead(insertLead: InsertChatLead): Promise<ChatLead> {
    try {
      const [lead] = await db.insert(chatLeads).values(insertLead).returning();
      logger.debug("Chat lead created", "database", { leadId: lead.id, sessionId: lead.sessionId });
      return lead;
    } catch (error) {
      logger.error("Failed to create chat lead", "database", error);
      throw error;
    }
  }

  async getChatLeads(): Promise<ChatLead[]> {
    try {
      const leads = await db
        .select()
        .from(chatLeads)
        .orderBy(desc(chatLeads.createdAt));
      
      logger.debug(`Retrieved ${leads.length} chat leads`, "database");
      return leads;
    } catch (error) {
      logger.error("Failed to get chat leads", "database", error);
      throw error;
    }
  }

  async getChatLeadsBySession(sessionId: string): Promise<ChatLead[]> {
    try {
      const leads = await db
        .select()
        .from(chatLeads)
        .where(eq(chatLeads.sessionId, sessionId))
        .orderBy(desc(chatLeads.createdAt));
      
      return leads;
    } catch (error) {
      logger.error("Failed to get chat leads by session", "database", { sessionId, error });
      throw error;
    }
  }

  // Chat analytics operations
  async createChatAnalytics(insertAnalytics: InsertChatAnalytics): Promise<ChatAnalytics> {
    try {
      const [analytics] = await db.insert(chatAnalytics).values(insertAnalytics).returning();
      logger.debug("Chat analytics created", "database", { analyticsId: analytics.id, sessionId: analytics.sessionId });
      return analytics;
    } catch (error) {
      logger.error("Failed to create chat analytics", "database", error);
      throw error;
    }
  }

  async getChatAnalytics(): Promise<ChatAnalytics[]> {
    try {
      const analytics = await db
        .select()
        .from(chatAnalytics)
        .orderBy(desc(chatAnalytics.createdAt));
      
      logger.debug(`Retrieved ${analytics.length} chat analytics`, "database");
      return analytics;
    } catch (error) {
      logger.error("Failed to get chat analytics", "database", error);
      throw error;
    }
  }

  async getChatAnalyticsBySession(sessionId: string): Promise<ChatAnalytics | null> {
    try {
      const [analytics] = await db
        .select()
        .from(chatAnalytics)
        .where(eq(chatAnalytics.sessionId, sessionId));
      
      return analytics || null;
    } catch (error) {
      logger.error("Failed to get chat analytics by session", "database", { sessionId, error });
      throw error;
    }
  }

  // Health check for database connection
  async healthCheck(): Promise<boolean> {
    try {
      await db.execute(sql`SELECT 1`);
      return true;
    } catch (error) {
      logger.error("Database health check failed", "database", error);
      return false;
    }
  }
}
