import { config } from "dotenv";
import { z } from "zod";

// Load environment variables
config();

// Environment validation schema
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().transform(Number).default("5000"),
  HOST: z.string().default("localhost"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters"),
  CORS_ORIGIN: z.string().default("http://localhost:5000"),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default("900000"), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default("100"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  CHAT_SESSION_TIMEOUT: z.string().transform(Number).default("1800000"), // 30 minutes
  TRUST_PROXY: z.string().transform(Boolean).default("false"),
  SECURE_COOKIES: z.string().transform(Boolean).default("false"),
});

// Validate and export configuration
export const appConfig = envSchema.parse(process.env);

// Helper functions
export const isDevelopment = () => appConfig.NODE_ENV === "development";
export const isProduction = () => appConfig.NODE_ENV === "production";
export const isTest = () => appConfig.NODE_ENV === "test";

// Database configuration
export const dbConfig = {
  url: appConfig.DATABASE_URL,
  ssl: isProduction() ? { rejectUnauthorized: false } : false,
};

// CORS configuration
export const corsConfig = {
  origin: isProduction() 
    ? appConfig.CORS_ORIGIN.split(",").map(origin => origin.trim())
    : true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: appConfig.RATE_LIMIT_WINDOW_MS,
  max: appConfig.RATE_LIMIT_MAX_REQUESTS,
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
};

// Session configuration
export const sessionConfig = {
  secret: appConfig.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction() && appConfig.SECURE_COOKIES,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: "lax" as const,
  },
};

// Helmet security configuration
export const helmetConfig = {
  contentSecurityPolicy: isDevelopment() ? false : {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      connectSrc: ["'self'", "ws:", "wss:"],
    },
  },
  crossOriginEmbedderPolicy: false,
};
