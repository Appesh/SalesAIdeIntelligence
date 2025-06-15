import { appConfig } from "./config";

export type LogLevel = "error" | "warn" | "info" | "debug";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  source?: string;
  data?: any;
}

class Logger {
  private logLevels: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  };

  private shouldLog(level: LogLevel): boolean {
    return this.logLevels[level] <= this.logLevels[appConfig.LOG_LEVEL];
  }

  private formatMessage(entry: LogEntry): string {
    const { timestamp, level, message, source, data } = entry;
    let logMessage = `${timestamp} [${level.toUpperCase()}]`;
    
    if (source) {
      logMessage += ` [${source}]`;
    }
    
    logMessage += ` ${message}`;
    
    if (data) {
      logMessage += ` ${JSON.stringify(data)}`;
    }
    
    return logMessage;
  }

  private log(level: LogLevel, message: string, source?: string, data?: any): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      source,
      data,
    };

    const formattedMessage = this.formatMessage(entry);

    switch (level) {
      case "error":
        console.error(formattedMessage);
        break;
      case "warn":
        console.warn(formattedMessage);
        break;
      case "info":
        console.info(formattedMessage);
        break;
      case "debug":
        console.debug(formattedMessage);
        break;
    }
  }

  error(message: string, source?: string, data?: any): void {
    this.log("error", message, source, data);
  }

  warn(message: string, source?: string, data?: any): void {
    this.log("warn", message, source, data);
  }

  info(message: string, source?: string, data?: any): void {
    this.log("info", message, source, data);
  }

  debug(message: string, source?: string, data?: any): void {
    this.log("debug", message, source, data);
  }

  // Express middleware for request logging
  requestLogger() {
    return (req: any, res: any, next: any) => {
      const start = Date.now();
      const { method, url, ip } = req;

      res.on("finish", () => {
        const duration = Date.now() - start;
        const { statusCode } = res;
        
        const level: LogLevel = statusCode >= 400 ? "warn" : "info";
        this.log(level, `${method} ${url} ${statusCode} - ${duration}ms`, "express", { ip });
      });

      next();
    };
  }

  // Error logging middleware
  errorLogger() {
    return (err: any, req: any, res: any, next: any) => {
      this.error(
        `${req.method} ${req.url} - ${err.message}`,
        "express",
        {
          stack: err.stack,
          ip: req.ip,
          userAgent: req.get("User-Agent"),
        }
      );
      next(err);
    };
  }
}

export const logger = new Logger();
