import { createHash } from 'crypto';
import { logger } from '@/lib/logger';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

/**
 * Response caching service to reduce OpenAI API calls for common questions.
 *
 * Implementation uses in-memory storage for development/demo purposes.
 * Production deployments should use distributed storage like Vercel KV or Redis.
 *
 * Cache strategy:
 * - Key: SHA256 hash of user message content
 * - TTL: 1 hour (configurable)
 * - Only caches single-turn conversations (no multi-turn context)
 *
 * @example
 * ```ts
 * const cached = await CacheService.getCachedResponse(messages);
 * if (cached) {
 *   return new Response(cached);
 * }
 *
 * const response = await openai.chat.completions.create({...});
 * await CacheService.cacheResponse(messages, responseText);
 * ```
 */
export class CacheService {
  private static readonly PREFIX = 'chat:';
  private static readonly TTL_SECONDS = 60 * 60; // 1 hour

  // In-memory fallback (for local development)
  private static memoryCache = new Map<string, { value: string; expiresAt: number }>();

  /**
   * Generates cache key from user message.
   * Uses SHA256 hash to create consistent, fixed-length keys.
   *
   * @param content - User message content
   * @returns Cache key (e.g., "chat:abc123...")
   */
  private static generateKey(content: string): string {
    const hash = createHash('sha256')
      .update(content.toLowerCase().trim())
      .digest('hex')
      .substring(0, 16); // First 16 chars of hash

    return `${this.PREFIX}${hash}`;
  }

  /**
   * Retrieves cached response if available.
   * Returns null for cache miss.
   *
   * @param messages - Conversation messages array
   * @returns Cached response text or null
   */
  static async getCachedResponse(messages: ChatCompletionMessageParam[]): Promise<string | null> {
    // Only cache single-turn conversations (to avoid context mismatch)
    if (messages.length !== 1 || messages[0].role !== 'user') {
      return null;
    }

    const content =
      typeof messages[0].content === 'string'
        ? messages[0].content
        : JSON.stringify(messages[0].content);
    const key = this.generateKey(content);

    try {
      // Try to use Vercel KV if available
      if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
          const { kv } = await import('@vercel/kv');
          const cached = await kv.get<string>(key);

          if (cached) {
            logger.info('Cache hit', { key, contentPreview: content.substring(0, 50) });
            return cached;
          }

          logger.debug('Cache miss', { key });
          return null;
        } catch (kvError) {
          logger.warn('Vercel KV unavailable, falling back to in-memory', { error: kvError });
          // Fall through to in-memory implementation
        }
      }

      // In-memory fallback
      const cached = this.memoryCache.get(key);

      if (cached && cached.expiresAt > Date.now()) {
        logger.info('Cache hit (in-memory)', { key, contentPreview: content.substring(0, 50) });
        return cached.value;
      }

      if (cached && cached.expiresAt <= Date.now()) {
        this.memoryCache.delete(key); // Clean up expired entry
      }

      logger.debug('Cache miss', { key });
      return null;
    } catch (error) {
      logger.error('Cache get failed', { error, key });
      return null; // Fail gracefully
    }
  }

  /**
   * Caches AI response for future identical questions.
   * Sets TTL to expire after 1 hour.
   *
   * @param messages - Conversation messages array
   * @param response - AI response text to cache
   */
  static async cacheResponse(
    messages: ChatCompletionMessageParam[],
    response: string
  ): Promise<void> {
    // Only cache single-turn conversations
    if (messages.length !== 1 || messages[0].role !== 'user') {
      return;
    }

    const content =
      typeof messages[0].content === 'string'
        ? messages[0].content
        : JSON.stringify(messages[0].content);
    const key = this.generateKey(content);

    try {
      // Try to use Vercel KV if available
      if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
          const { kv } = await import('@vercel/kv');
          await kv.set(key, response, { ex: this.TTL_SECONDS });
          logger.info('Response cached', { key, ttl: this.TTL_SECONDS });
          return;
        } catch (kvError) {
          logger.warn('Vercel KV unavailable, falling back to in-memory', { error: kvError });
          // Fall through to in-memory implementation
        }
      }

      // In-memory fallback
      const expiresAt = Date.now() + this.TTL_SECONDS * 1000;
      this.memoryCache.set(key, { value: response, expiresAt });
      logger.info('Response cached (in-memory)', { key, ttl: this.TTL_SECONDS });
    } catch (error) {
      logger.error('Cache set failed', { error, key });
      // Don't throw - caching is optional enhancement
    }
  }

  /**
   * Clears all cached responses.
   * Useful for testing or after data updates.
   */
  static async clearCache(): Promise<void> {
    try {
      this.memoryCache.clear();
      logger.info('Cache cleared (in-memory)');
    } catch (error) {
      logger.error('Cache clear failed', { error });
    }
  }

  /**
   * Gets cache statistics (hits, misses, size).
   * Useful for monitoring cache effectiveness.
   */
  static async getStats(): Promise<{ size: number; keys: number } | null> {
    try {
      // In-memory fallback
      const now = Date.now();
      let validKeys = 0;

      // Clean up expired entries
      for (const [key, cached] of this.memoryCache.entries()) {
        if (cached.expiresAt <= now) {
          this.memoryCache.delete(key);
        } else {
          validKeys++;
        }
      }

      return {
        size: this.memoryCache.size,
        keys: validKeys,
      };
    } catch (error) {
      logger.error('Cache stats failed', { error });
      return null;
    }
  }
}
