import { RateLimitService } from '@/lib/services/RateLimitService';
import { API_CONFIG } from '@/lib/config';

describe('RateLimitService', () => {
  beforeEach(() => {
    // Clear the in-memory store before each test
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (RateLimitService as any).memoryStore.clear();
  });

  describe('checkRateLimit', () => {
    it('should allow first request', async () => {
      const result = await RateLimitService.checkRateLimit('192.168.1.1');

      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(API_CONFIG.RATE_LIMIT.MAX_REQUESTS - 1);
    });

    it('should track multiple requests from same IP', async () => {
      const ip = '192.168.1.1';

      const result1 = await RateLimitService.checkRateLimit(ip);
      expect(result1.allowed).toBe(true);
      expect(result1.remaining).toBe(API_CONFIG.RATE_LIMIT.MAX_REQUESTS - 1);

      const result2 = await RateLimitService.checkRateLimit(ip);
      expect(result2.allowed).toBe(true);
      expect(result2.remaining).toBe(API_CONFIG.RATE_LIMIT.MAX_REQUESTS - 2);
    });

    it('should block requests exceeding rate limit', async () => {
      const ip = '192.168.1.1';
      const maxRequests = API_CONFIG.RATE_LIMIT.MAX_REQUESTS;

      // Make max allowed requests
      for (let i = 0; i < maxRequests; i++) {
        await RateLimitService.checkRateLimit(ip);
      }

      // Next request should be blocked
      const result = await RateLimitService.checkRateLimit(ip);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should track different IPs separately', async () => {
      const ip1 = '192.168.1.1';
      const ip2 = '192.168.1.2';

      const result1 = await RateLimitService.checkRateLimit(ip1);
      const result2 = await RateLimitService.checkRateLimit(ip2);

      expect(result1.allowed).toBe(true);
      expect(result2.allowed).toBe(true);
      expect(result1.remaining).toBe(result2.remaining);
    });

    it('should reset after time window expires', async () => {
      const ip = '192.168.1.1';

      // First request
      const result1 = await RateLimitService.checkRateLimit(ip);
      expect(result1.allowed).toBe(true);

      // Manually expire the time window
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const memoryStore = (RateLimitService as any).memoryStore;
      const key = `ratelimit:${ip}`;
      const record = memoryStore.get(key);
      record.resetTime = Date.now() - 1000; // Set to past

      // Should allow new request after expiry
      const result2 = await RateLimitService.checkRateLimit(ip);
      expect(result2.allowed).toBe(true);
      expect(result2.remaining).toBe(API_CONFIG.RATE_LIMIT.MAX_REQUESTS - 1);
    });
  });

  describe('resetRateLimit', () => {
    it('should reset rate limit for IP', async () => {
      const ip = '192.168.1.1';

      // Make several requests
      await RateLimitService.checkRateLimit(ip);
      await RateLimitService.checkRateLimit(ip);

      // Reset
      await RateLimitService.resetRateLimit(ip);

      // Should be back to full quota
      const result = await RateLimitService.checkRateLimit(ip);
      expect(result.remaining).toBe(API_CONFIG.RATE_LIMIT.MAX_REQUESTS - 1);
    });

    it('should not affect other IPs', async () => {
      const ip1 = '192.168.1.1';
      const ip2 = '192.168.1.2';

      await RateLimitService.checkRateLimit(ip1);
      await RateLimitService.checkRateLimit(ip2);

      await RateLimitService.resetRateLimit(ip1);

      const result2 = await RateLimitService.checkRateLimit(ip2);
      expect(result2.remaining).toBe(API_CONFIG.RATE_LIMIT.MAX_REQUESTS - 2);
    });
  });

  describe('getRateLimitStatus', () => {
    it('should return null for IP with no limits', async () => {
      const status = await RateLimitService.getRateLimitStatus('192.168.1.1');

      expect(status).toBeNull();
    });

    it('should return current count and TTL', async () => {
      const ip = '192.168.1.1';

      await RateLimitService.checkRateLimit(ip);
      await RateLimitService.checkRateLimit(ip);

      const status = await RateLimitService.getRateLimitStatus(ip);

      expect(status).not.toBeNull();
      expect(status?.count).toBe(2);
      expect(status?.ttl).toBeGreaterThan(0);
      expect(status?.ttl).toBeLessThanOrEqual(API_CONFIG.RATE_LIMIT.WINDOW_MS);
    });

    it('should return 0 TTL for expired limits', async () => {
      const ip = '192.168.1.1';

      await RateLimitService.checkRateLimit(ip);

      // Manually expire the time window
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const memoryStore = (RateLimitService as any).memoryStore;
      const key = `ratelimit:${ip}`;
      const record = memoryStore.get(key);
      record.resetTime = Date.now() - 1000; // Set to past

      const status = await RateLimitService.getRateLimitStatus(ip);

      expect(status?.ttl).toBe(0);
    });
  });
});
