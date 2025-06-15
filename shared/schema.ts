import { pgTable, text, serial, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone").notNull(),
  businessType: text("business_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Chat Sessions Table
export const chatSessions = pgTable("chat_sessions", {
  id: text("id").primaryKey(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  endedAt: timestamp("ended_at"),
  isActive: boolean("is_active").default(true).notNull(),
  qualificationStage: text("qualification_stage").default("initial").notNull(),
  businessSize: text("business_size"), // 'small', 'medium', 'enterprise'
  currentTopic: text("current_topic"),
  userIntent: text("user_intent"),
  painPoints: jsonb("pain_points").$type<string[]>().default([]),
  budget: text("budget"),
  timeline: text("timeline"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Chat Messages Table
export const chatMessages = pgTable("chat_messages", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").references(() => chatSessions.id).notNull(),
  content: text("content").notNull(),
  sender: text("sender").notNull(), // 'user' | 'agent'
  messageType: text("message_type").default("text").notNull(), // 'text' | 'options' | 'form' | 'lead-form'
  options: jsonb("options").$type<string[]>(),
  metadata: jsonb("metadata").$type<{
    intent?: string;
    confidence?: number;
    followUp?: string;
  }>(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Chat Leads Table (for captured leads from chat)
export const chatLeads = pgTable("chat_leads", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").references(() => chatSessions.id).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone"),
  businessType: text("business_type").notNull(),
  interests: jsonb("interests").$type<string[]>().default([]),
  qualificationStage: text("qualification_stage").notNull(),
  leadScore: integer("lead_score").default(0),
  isConverted: boolean("is_converted").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Chat Analytics Table
export const chatAnalytics = pgTable("chat_analytics", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").references(() => chatSessions.id).notNull(),
  messageCount: integer("message_count").default(0),
  userMessageCount: integer("user_message_count").default(0),
  agentMessageCount: integer("agent_message_count").default(0),
  duration: integer("duration"), // in milliseconds
  leadCaptured: boolean("lead_captured").default(false),
  conversationFlow: jsonb("conversation_flow").$type<string[]>().default([]),
  intents: jsonb("intents").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Create insert schemas
export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  timestamp: true,
});

export const insertChatLeadSchema = createInsertSchema(chatLeads).omit({
  id: true,
  createdAt: true,
});

export const insertChatAnalyticsSchema = createInsertSchema(chatAnalytics).omit({
  id: true,
  createdAt: true,
});

// Export types
export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatLead = typeof chatLeads.$inferSelect;
export type InsertChatLead = z.infer<typeof insertChatLeadSchema>;
export type ChatAnalytics = typeof chatAnalytics.$inferSelect;
export type InsertChatAnalytics = z.infer<typeof insertChatAnalyticsSchema>;
