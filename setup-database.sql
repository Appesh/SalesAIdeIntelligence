-- SalesAIde Database Setup Script
-- Run this script to create all required tables

-- Create contacts table
CREATE TABLE IF NOT EXISTS "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text NOT NULL,
	"phone" text NOT NULL,
	"business_type" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS "chat_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"ended_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"qualification_stage" text DEFAULT 'initial' NOT NULL,
	"business_size" text,
	"current_topic" text,
	"user_intent" text,
	"pain_points" jsonb DEFAULT '[]'::jsonb,
	"budget" text,
	"timeline" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS "chat_messages" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"content" text NOT NULL,
	"sender" text NOT NULL,
	"message_type" text DEFAULT 'text' NOT NULL,
	"options" jsonb,
	"metadata" jsonb,
	"timestamp" timestamp DEFAULT now() NOT NULL
);

-- Create chat_leads table
CREATE TABLE IF NOT EXISTS "chat_leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text NOT NULL,
	"phone" text,
	"business_type" text NOT NULL,
	"interests" jsonb DEFAULT '[]'::jsonb,
	"qualification_stage" text NOT NULL,
	"lead_score" integer DEFAULT 0,
	"is_converted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Create chat_analytics table
CREATE TABLE IF NOT EXISTS "chat_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"message_count" integer DEFAULT 0,
	"user_message_count" integer DEFAULT 0,
	"agent_message_count" integer DEFAULT 0,
	"duration" integer,
	"lead_captured" boolean DEFAULT false,
	"conversation_flow" jsonb DEFAULT '[]'::jsonb,
	"intents" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Add foreign key constraints
ALTER TABLE "chat_messages" 
ADD CONSTRAINT IF NOT EXISTS "chat_messages_session_id_chat_sessions_id_fk" 
FOREIGN KEY ("session_id") REFERENCES "chat_sessions"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "chat_leads" 
ADD CONSTRAINT IF NOT EXISTS "chat_leads_session_id_chat_sessions_id_fk" 
FOREIGN KEY ("session_id") REFERENCES "chat_sessions"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "chat_analytics" 
ADD CONSTRAINT IF NOT EXISTS "chat_analytics_session_id_chat_sessions_id_fk" 
FOREIGN KEY ("session_id") REFERENCES "chat_sessions"("id") ON DELETE no action ON UPDATE no action;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_chat_messages_session_id" ON "chat_messages"("session_id");
CREATE INDEX IF NOT EXISTS "idx_chat_leads_session_id" ON "chat_leads"("session_id");
CREATE INDEX IF NOT EXISTS "idx_chat_analytics_session_id" ON "chat_analytics"("session_id");
CREATE INDEX IF NOT EXISTS "idx_contacts_email" ON "contacts"("email");
CREATE INDEX IF NOT EXISTS "idx_chat_sessions_created_at" ON "chat_sessions"("created_at");

-- Insert a test record to verify everything works
INSERT INTO "contacts" ("name", "email", "company", "phone", "business_type", "message") 
VALUES ('Test User', 'test@salesaide.com', 'SalesAIde', '+1-555-0123', 'Technology', 'Database setup test')
ON CONFLICT DO NOTHING;

-- Display success message
SELECT 'SalesAIde database setup completed successfully!' as status;
