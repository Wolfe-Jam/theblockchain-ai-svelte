/**
 * Security Monitoring & Logging
 * Tracks security events and suspicious activity
 */

interface SecurityEvent {
  type: 'rate_limit' | 'auth_failure' | 'invalid_input' | 'suspicious_request' | 'cors_violation';
  ip: string;
  userAgent?: string;
  endpoint: string;
  details: any;
  timestamp?: string;
}

export class SecurityMonitor {
  private static events: SecurityEvent[] = [];
  private static readonly MAX_EVENTS = 1000;
  
  /**
   * Log a security event
   */
  static logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>) {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString()
    };
    
    // Store in memory (replace with persistent storage in production)
    this.events.push(fullEvent);
    
    // Keep only recent events
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS);
    }
    
    // Log to console with appropriate level
    const logLevel = this.getLogLevel(event.type);
    console[logLevel](`[SECURITY] ${event.type} from ${event.ip} on ${event.endpoint}`, event.details);
    
    // In production, send to monitoring service
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(fullEvent).catch(console.error);
    }
  }
  
  /**
   * Check for suspicious activity patterns
   */
  static async checkForSuspiciousActivity(ip: string): Promise<boolean> {
    const recentEvents = this.events.filter(
      event => event.ip === ip && 
      Date.now() - new Date(event.timestamp!).getTime() < 300000 // Last 5 minutes
    );
    
    // Multiple failed attempts
    if (recentEvents.filter(e => e.type === 'auth_failure').length >= 5) {
      return true;
    }
    
    // Rapid rate limit hits
    if (recentEvents.filter(e => e.type === 'rate_limit').length >= 3) {
      return true;
    }
    
    // Multiple invalid inputs (potential attack)
    if (recentEvents.filter(e => e.type === 'invalid_input').length >= 10) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Get recent security events for monitoring dashboard
   */
  static getRecentEvents(limit: number = 100): SecurityEvent[] {
    return this.events.slice(-limit).reverse();
  }
  
  /**
   * Get security statistics
   */
  static getSecurityStats(timeWindow: number = 3600000): {
    totalEvents: number;
    eventsByType: Record<string, number>;
    topIPs: Array<{ ip: string; count: number }>;
  } {
    const cutoff = Date.now() - timeWindow;
    const recentEvents = this.events.filter(
      event => new Date(event.timestamp!).getTime() > cutoff
    );
    
    const eventsByType: Record<string, number> = {};
    const ipCounts: Record<string, number> = {};
    
    recentEvents.forEach(event => {
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
      ipCounts[event.ip] = (ipCounts[event.ip] || 0) + 1;
    });
    
    const topIPs = Object.entries(ipCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }));
    
    return {
      totalEvents: recentEvents.length,
      eventsByType,
      topIPs
    };
  }  
  /**
   * Get appropriate log level for event type
   */
  private static getLogLevel(type: SecurityEvent['type']): 'log' | 'warn' | 'error' {
    switch (type) {
      case 'rate_limit':
        return 'warn';
      case 'auth_failure':
      case 'suspicious_request':
        return 'error';
      case 'invalid_input':
      case 'cors_violation':
        return 'warn';
      default:
        return 'log';
    }
  }
  
  /**
   * Send event to external monitoring service
   */
  private static async sendToMonitoringService(event: SecurityEvent): Promise<void> {
    try {
      // Example: Send to Sentry, DataDog, or custom endpoint
      if (process.env.SECURITY_WEBHOOK_URL) {
        await fetch(process.env.SECURITY_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: 'theblockchain.ai',
            environment: process.env.NODE_ENV,
            event
          })
        });
      }
    } catch (error) {
      console.error('Failed to send security event to monitoring service:', error);
    }
  }
  
  /**
   * Check if IP should be blocked
   */
  static shouldBlockIP(ip: string): boolean {
    // Check known bad IPs (in production, use external service)
    const blockedIPs = new Set([
      // Add known malicious IPs here
    ]);
    
    return blockedIPs.has(ip);
  }
  
  /**
   * Rate limit check with progressive penalties
   */
  static getProgressivePenalty(ip: string): number {
    const violations = this.events.filter(
      event => event.ip === ip && 
      event.type === 'rate_limit' &&
      Date.now() - new Date(event.timestamp!).getTime() < 3600000 // Last hour
    ).length;
    
    // Progressive penalties: 1 min, 5 min, 15 min, 1 hour
    if (violations >= 5) return 3600; // 1 hour
    if (violations >= 3) return 900;  // 15 minutes
    if (violations >= 2) return 300;  // 5 minutes
    if (violations >= 1) return 60;   // 1 minute
    
    return 0; // No penalty
  }
}
