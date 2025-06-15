import type { Express } from "express";
import { storage } from "../storage";
import { 
  insertChatSessionSchema, 
  insertChatMessageSchema, 
  insertChatLeadSchema,
  insertChatAnalyticsSchema 
} from "@shared/schema";
import { ZodError } from "zod";

export function registerChatRoutes(app: Express): void {
  
  // Create a new chat session
  app.post("/api/chat/sessions", async (req, res) => {
    try {
      const validatedData = insertChatSessionSchema.parse(req.body);
      const session = await storage.createChatSession(validatedData);
      res.json({ success: true, session });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get a specific chat session
  app.get("/api/chat/sessions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getChatSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ 
          success: false, 
          message: "Session not found" 
        });
      }

      res.json({ success: true, session });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Update a chat session
  app.patch("/api/chat/sessions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const updates = req.body;
      
      const session = await storage.updateChatSession(sessionId, updates);
      res.json({ success: true, session });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      if (errorMessage.includes("not found")) {
        res.status(404).json({
          success: false,
          message: errorMessage
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  // Get all chat sessions (with pagination)
  app.get("/api/chat/sessions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const sessions = await storage.getChatSessions(limit);
      res.json({ success: true, sessions });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Create a new chat message
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.json({ success: true, message });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get messages for a specific session
  app.get("/api/chat/sessions/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json({ success: true, messages });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Create a new chat lead
  app.post("/api/chat/leads", async (req, res) => {
    try {
      const validatedData = insertChatLeadSchema.parse(req.body);
      const lead = await storage.createChatLead(validatedData);
      res.json({ success: true, lead });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all chat leads
  app.get("/api/chat/leads", async (req, res) => {
    try {
      const leads = await storage.getChatLeads();
      res.json({ success: true, leads });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Update a chat lead
  app.patch("/api/chat/leads/:leadId", async (req, res) => {
    try {
      const leadId = parseInt(req.params.leadId);
      const updates = req.body;
      
      if (!storage.updateChatLead) {
        return res.status(501).json({
          success: false,
          message: "Update lead functionality not implemented"
        });
      }
      const lead = await storage.updateChatLead(leadId, updates);
      res.json({ success: true, lead });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      if (errorMessage.includes("not found")) {
        res.status(404).json({
          success: false,
          message: errorMessage
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  // Create chat analytics
  app.post("/api/chat/analytics", async (req, res) => {
    try {
      const validatedData = insertChatAnalyticsSchema.parse(req.body);
      const analytics = await storage.createChatAnalytics(validatedData);
      res.json({ success: true, analytics });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all chat analytics
  app.get("/api/chat/analytics", async (req, res) => {
    try {
      const analytics = await storage.getChatAnalytics();
      res.json({ success: true, analytics });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get analytics for a specific session
  app.get("/api/chat/analytics/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const analytics = await storage.getChatAnalyticsBySession(sessionId);
      
      if (!analytics) {
        return res.status(404).json({ 
          success: false, 
          message: "Analytics not found for this session" 
        });
      }

      res.json({ success: true, analytics });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get chat dashboard summary
  app.get("/api/chat/dashboard", async (req, res) => {
    try {
      const sessions = await storage.getChatSessions();
      const leads = await storage.getChatLeads();
      const analytics = await storage.getChatAnalytics();

      const totalSessions = sessions.length;
      const activeSessions = sessions.filter(s => s.isActive).length;
      const totalLeads = leads.length;
      const convertedLeads = leads.filter(l => l.isConverted).length;
      const conversionRate = totalSessions > 0 ? (totalLeads / totalSessions) * 100 : 0;

      // Calculate average session duration
      const completedAnalytics = analytics.filter(a => a.duration);
      const avgDuration = completedAnalytics.length > 0 
        ? completedAnalytics.reduce((sum, a) => sum + (a.duration || 0), 0) / completedAnalytics.length
        : 0;

      // Get top intents
      const allIntents = analytics.flatMap(a => a.intents || []);
      const intentCounts: { [key: string]: number } = {};
      allIntents.forEach(intent => {
        intentCounts[intent] = (intentCounts[intent] || 0) + 1;
      });
      const topIntents = Object.entries(intentCounts)
        .map(([intent, count]) => ({ intent, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const summary = {
        totalSessions,
        activeSessions,
        totalLeads,
        convertedLeads,
        conversionRate: parseFloat(conversionRate.toFixed(1)),
        avgDuration: Math.round(avgDuration / 1000), // Convert to seconds
        topIntents,
        recentSessions: sessions.slice(0, 10),
        recentLeads: leads.slice(0, 10)
      };

      res.json({ success: true, summary });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });
}
