/**
 * Input Validation & Sanitization
 * Protects against XSS, SQL injection, and other attacks
 */

export class InputValidator {
  /**
   * Validate search query input
   */
  static validateSearchQuery(query: unknown): string | null {
    if (!query || typeof query !== 'string') {
      return 'Query must be a string';
    }
    
    if (query.length === 0) {
      return 'Query cannot be empty';
    }
    
    if (query.length > 500) {
      return 'Query too long (max 500 characters)';
    }
    
    // XSS prevention - check for script tags and event handlers
    if (/<script[^>]*>|javascript:|on\w+\s*=/i.test(query)) {
      return 'Invalid characters detected in query';
    }
    
    // SQL injection prevention (belt and suspenders approach)
    const sqlPatterns = [
      /(\b(union|select|insert|delete|drop|update|create|alter|exec|execute)\b)/i,
      /(--|\/\*|\*\/|;)/,
      /(0x[0-9a-f]+)/i
    ];
    
    if (sqlPatterns.some(pattern => pattern.test(query))) {
      return 'Invalid query content detected';
    }
    
    // Check for suspicious patterns
    if (/(\.\.|\\|\/etc\/|\/proc\/|cmd\.exe)/i.test(query)) {
      return 'Suspicious characters detected';
    }
    
    return null; // Valid
  }
  
  /**
   * Sanitize query for safe processing
   */
  static sanitizeQuery(query: string): string {
    return query
      .trim()
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/["']/g, '') // Remove quotes
      .replace(/[^\w\s\-.,!?]/g, '') // Keep only safe characters
      .substring(0, 500); // Truncate to max length
  }  
  /**
   * Validate email input
   */
  static validateEmail(email: unknown): string | null {
    if (!email || typeof email !== 'string') {
      return 'Email must be a string';
    }
    
    if (email.length > 254) {
      return 'Email too long';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    
    // Check for suspicious patterns
    if (/<script|javascript:|on\w+=/i.test(email)) {
      return 'Invalid characters in email';
    }
    
    return null;
  }
  
  /**
   * Validate API mode parameter
   */
  static validateMode(mode: unknown): string | null {
    if (!mode || typeof mode !== 'string') {
      return 'Mode must be a string';
    }
    
    const validModes = ['hybrid', 'traditional', 'claude-smarts'];
    if (!validModes.includes(mode)) {
      return 'Invalid search mode';
    }
    
    return null;
  }
  
  /**
   * General purpose text sanitization
   */
  static sanitizeText(text: string, maxLength: number = 1000): string {
    return text
      .trim()
      .replace(/[<>]/g, '')
      .replace(/[^\w\s\-.,!?@]/g, '')
      .substring(0, maxLength);
  }
}
