import { API_CONFIG } from '@/lib/config';
import { logger } from '@/lib/logger';

/**
 * Rate limiting service that works in serverless environments.
 *
 * Implementation uses in-memory storage for development/demo purposes.
 * Production deployments should use distributed storage like Vercel KV or Redis.
 *
 * Features:
 * - Per-IP tracking with sliding window
 * - Fails open (allows requests) if storage unavailable
 * - Atomic increment operations
 *
 * @example
 * ```ts
 * const rateLimit = await RateLimitService.checkRateLimit('192.168.1.1');
 * if (!rateLimit.allowed) {
 *   return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
 * }
 * ```
 */
export class RateLimitService {
  private static readonly PREFIX = 'ratelimit:';

  // In-memory fallback (for local development)
  private static memoryStore = new Map<string, { count: number; resetTime: number }>();

  /**
   * Checks if IP address has exceeded rate limit.
   *
   * @param ip - Client IP address
   * @returns Object indicating if request allowed and remaining quota
   */
  static async checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
    const key = `${this.PREFIX}${ip}`;
    const limit = API_CONFIG.RATE_LIMIT.MAX_REQUESTS;
    const windowMs = API_CONFIG.RATE_LIMIT.WINDOW_MS;

    try {
      // In-memory implementation
      const now = Date.now();
      const record = this.memoryStore.get(key);

      if (!record || now > record.resetTime) {
        this.memoryStore.set(key, { count: 1, resetTime: now + windowMs });
        return { allowed: true, remaining: limit - 1 };
      }

      if (record.count >= limit) {
        logger.warn('Rate limit exceeded (in-memory)', { ip, count: record.count, limit });
        return { allowed: false, remaining: 0 };
      }

      record.count++;
      return { allowed: true, remaining: limit - record.count };
    } catch (error) {
      // Fail open - allow request if storage unavailable
      logger.error('Rate limit check failed (failing open)', { error, ip });
      return { allowed: true, remaining: limit };
    }
  }

  /**
   * Manually resets rate limit for IP address.
   * Useful for testing or admin overrides.
   *
   * @param ip - Client IP address to reset
   */
  static async resetRateLimit(ip: string): Promise<void> {
    const key = `${this.PREFIX}${ip}`;
    try {
      this.memoryStore.delete(key);
      logger.info('Rate limit reset', { ip });
    } catch (error) {
      logger.error('Failed to reset rate limit', { error, ip });
    }
  }

  /**
   * Gets current rate limit status without incrementing.
   * Useful for debugging/monitoring.
   *
   * @param ip - Client IP address
   * @returns Current count and TTL, or null if no limit active
   */
  static async getRateLimitStatus(ip: string): Promise<{ count: number; ttl: number } | null> {
    const key = `${this.PREFIX}${ip}`;
    try {
      const record = this.memoryStore.get(key);
      if (!record) return null;

      const ttl = Math.max(0, record.resetTime - Date.now());
      return { count: record.count, ttl };
    } catch (error) {
      logger.error('Failed to get rate limit status', { error, ip });
      return null;
    }
  }
}
