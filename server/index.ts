import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { appConfig, corsConfig, rateLimitConfig, helmetConfig, isProduction } from "./config";
import { logger } from "./logger";

const app = express();

// Trust proxy if in production
if (isProduction() && appConfig.TRUST_PROXY) {
  app.set("trust proxy", 1);
}

// Security middleware
app.use(helmet(helmetConfig));
app.use(cors(corsConfig));

// Rate limiting
const limiter = rateLimit(rateLimitConfig);
app.use("/api", limiter);

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// Request logging
app.use(logger.requestLogger());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: appConfig.NODE_ENV,
    version: process.env.npm_package_version || "unknown",
  });
});

// API status endpoint
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    message: "SalesAIde API is running",
    timestamp: new Date().toISOString(),
  });
});

(async () => {
  try {
    const server = await registerRoutes(app);

    // Error logging middleware
    app.use(logger.errorLogger());

    // Global error handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = isProduction() ? "Internal Server Error" : err.message;

      logger.error(`Unhandled error: ${err.message}`, "express", {
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
      });

      res.status(status).json({
        success: false,
        message,
        ...(isProduction() ? {} : { stack: err.stack })
      });
    });

    // Setup Vite in development or serve static files in production
    if (appConfig.NODE_ENV === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Start server
    const port = appConfig.PORT;
    const host = isProduction() ? "0.0.0.0" : appConfig.HOST;

    server.listen(port, host, () => {
      logger.info(`🚀 SalesAIde server running on ${host}:${port}`, "server");
      logger.info(`📊 Environment: ${appConfig.NODE_ENV}`, "server");
      logger.info(`🔗 Health check: http://${host}:${port}/health`, "server");
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`📴 Received ${signal}, shutting down gracefully...`, "server");

      server.close(() => {
        logger.info("✅ Server closed successfully", "server");
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error("❌ Forced shutdown after timeout", "server");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  } catch (error) {
    logger.error("❌ Failed to start server", "server", error);
    process.exit(1);
  }
})();
