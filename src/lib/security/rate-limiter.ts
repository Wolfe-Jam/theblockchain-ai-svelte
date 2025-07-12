/**
 * Rate Limiter
 * Supports both in-memory (development) and Redis (production) backends
 */

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

export class RateLimiter {
  private memoryStore = new Map<string, { count: number; resetTime: number }>();
  private redisClient?: any; // Redis client if available
  
  constructor() {
    // Initialize Redis client if available
    this.initializeRedis();
  }
  
  /**
   * Check if request is within rate limit
   */
  async checkLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
    const now = Date.now();
    const windowMs = windowSeconds * 1000;
    const resetTime = now + windowMs;
    
    if (this.redisClient) {
      return this.checkRedisLimit(key, limit, windowSeconds, now);
    } else {
      return this.checkMemoryLimit(key, limit, windowMs, now, resetTime);
    }
  }
  
  /**
   * Get remaining requests for a key
   */
  async getRemainingRequests(key: string, limit: number): Promise<number> {
    if (this.redisClient) {
      try {
        const current = await this.redisClient.get(key);
        return Math.max(0, limit - (current || 0));
      } catch {
        return limit; // Fail open
      }
    } else {
      const data = this.memoryStore.get(key);
      if (!data || Date.now() > data.resetTime) {
        return limit;
      }
      return Math.max(0, limit - data.count);
    }
  }
  
  /**
   * Clear rate limit for a key (for testing or admin override)
   */
  async clearLimit(key: string): Promise<void> {
    if (this.redisClient) {
      try {
        await this.redisClient.del(key);
      } catch (error) {
        console.error('Redis clear failed:', error);
      }
    } else {
      this.memoryStore.delete(key);
    }
  }
  
  /**
   * In-memory rate limiting (development/fallback)
   */
  private checkMemoryLimit(
    key: string, 
    limit: number, 
    windowMs: number, 
    now: number, 
    resetTime: number
  ): RateLimitResult {
    let data = this.memoryStore.get(key);
    
    // Reset if window expired
    if (!data || now > data.resetTime) {
      data = { count: 0, resetTime };
      this.memoryStore.set(key, data);
    }
    
    data.count++;
    
    const allowed = data.count <= limit;
    const remaining = Math.max(0, limit - data.count);
    
    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance
      this.cleanupMemoryStore();
    }
    
    return {
      allowed,
      remaining,
      resetTime: data.resetTime,
      retryAfter: allowed ? undefined : Math.ceil((data.resetTime - now) / 1000)
    };
  }  
  /**
   * Redis-based rate limiting (production)
   */
  private async checkRedisLimit(
    key: string, 
    limit: number, 
    windowSeconds: number, 
    now: number
  ): Promise<RateLimitResult> {
    try {
      const pipeline = this.redisClient.pipeline();
      pipeline.incr(key);
      pipeline.expire(key, windowSeconds);
      
      const results = await pipeline.exec();
      const count = results[0][1];
      
      const allowed = count <= limit;
      const remaining = Math.max(0, limit - count);
      const resetTime = now + (windowSeconds * 1000);
      
      return {
        allowed,
        remaining,
        resetTime,
        retryAfter: allowed ? undefined : windowSeconds
      };
    } catch (error) {
      console.error('Redis rate limit error:', error);
      // Fail open - allow request if Redis is down
      return {
        allowed: true,
        remaining: limit,
        resetTime: now + (windowSeconds * 1000)
      };
    }
  }
  
  /**
   * Initialize Redis client if credentials available
   */
  private initializeRedis(): void {
    try {
      // Only initialize Redis in server environment with credentials
      if (typeof window === 'undefined' && 
          process.env.UPSTASH_REDIS_REST_URL && 
          process.env.UPSTASH_REDIS_REST_TOKEN) {
        
        // Dynamic import to avoid bundling Redis in client - with error handling
        import('@upstash/redis').then(({ Redis }) => {
          this.redisClient = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!
          });
        }).catch((error) => {
          console.warn('Redis initialization failed, falling back to memory store:', error);
          this.redisClient = null;
        });
      }
    } catch (error) {
      console.warn('Redis not available, using memory store:', error);
      this.redisClient = null;
    }
  }
  
  /**
   * Clean up expired entries from memory store
   */
  private cleanupMemoryStore(): void {
    const now = Date.now();
    for (const [key, data] of this.memoryStore.entries()) {
      if (now > data.resetTime) {
        this.memoryStore.delete(key);
      }
    }
  }
  
  /**
   * Get rate limit stats for monitoring
   */
  getStats(): { totalKeys: number; backend: 'redis' | 'memory' } {
    return {
      totalKeys: this.redisClient ? -1 : this.memoryStore.size, // Redis doesn't track this easily
      backend: this.redisClient ? 'redis' : 'memory'
    };
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();
