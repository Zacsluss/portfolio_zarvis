import { CacheService } from '@/lib/services/CacheService';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

describe('CacheService', () => {
  beforeEach(() => {
    // Clear the in-memory cache before each test
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (CacheService as any).memoryCache.clear();
  });

  describe('getCachedResponse', () => {
    it('should return null for cache miss', async () => {
      const messages: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Hello' }];

      const result = await CacheService.getCachedResponse(messages);

      expect(result).toBeNull();
    });

    it('should return cached response for cache hit', async () => {
      const messages: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Hello' }];
      const response = 'Hi there!';

      await CacheService.cacheResponse(messages, response);
      const cached = await CacheService.getCachedResponse(messages);

      expect(cached).toBe(response);
    });

    it('should return null for multi-turn conversations', async () => {
      const messages: ChatCompletionMessageParam[] = [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi!' },
        { role: 'user', content: 'How are you?' },
      ];

      const result = await CacheService.getCachedResponse(messages);

      expect(result).toBeNull();
    });

    it('should return null for non-user first message', async () => {
      const messages: ChatCompletionMessageParam[] = [{ role: 'assistant', content: 'Hello' }];

      const result = await CacheService.getCachedResponse(messages);

      expect(result).toBeNull();
    });

    it('should be case-insensitive', async () => {
      const messages1: ChatCompletionMessageParam[] = [{ role: 'user', content: 'HELLO WORLD' }];
      const messages2: ChatCompletionMessageParam[] = [{ role: 'user', content: 'hello world' }];
      const response = 'Greetings!';

      await CacheService.cacheResponse(messages1, response);
      const cached = await CacheService.getCachedResponse(messages2);

      expect(cached).toBe(response);
    });

    it('should ignore trailing whitespace', async () => {
      const messages1: ChatCompletionMessageParam[] = [{ role: 'user', content: '  Hello  ' }];
      const messages2: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Hello' }];
      const response = 'Hi!';

      await CacheService.cacheResponse(messages1, response);
      const cached = await CacheService.getCachedResponse(messages2);

      expect(cached).toBe(response);
    });

    it('should return null for expired cache entries', async () => {
      const messages: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Hello' }];
      const response = 'Hi there!';

      await CacheService.cacheResponse(messages, response);

      // Manually expire the cache entry
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const memoryCache = (CacheService as any).memoryCache;
      const keys = Array.from(memoryCache.keys());
      const entry = memoryCache.get(keys[0]);
      entry.expiresAt = Date.now() - 1000; // Set to past

      const cached = await CacheService.getCachedResponse(messages);

      expect(cached).toBeNull();
    });
  });

  describe('cacheResponse', () => {
    it('should cache single-turn conversations', async () => {
      const messages: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Test message' }];
      const response = 'Test response';

      await CacheService.cacheResponse(messages, response);

      const cached = await CacheService.getCachedResponse(messages);
      expect(cached).toBe(response);
    });

    it('should not cache multi-turn conversations', async () => {
      const messages: ChatCompletionMessageParam[] = [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi!' },
      ];
      const response = 'How can I help?';

      await CacheService.cacheResponse(messages, response);

      // Should not be cached
      const cached = await CacheService.getCachedResponse([{ role: 'user', content: 'Hello' }]);
      expect(cached).toBeNull();
    });

    it('should overwrite existing cache entries', async () => {
      const messages: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Hello' }];

      await CacheService.cacheResponse(messages, 'First response');
      await CacheService.cacheResponse(messages, 'Second response');

      const cached = await CacheService.getCachedResponse(messages);
      expect(cached).toBe('Second response');
    });
  });

  describe('clearCache', () => {
    it('should clear all cached entries', async () => {
      const messages1: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Message 1' }];
      const messages2: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Message 2' }];

      await CacheService.cacheResponse(messages1, 'Response 1');
      await CacheService.cacheResponse(messages2, 'Response 2');

      await CacheService.clearCache();

      const cached1 = await CacheService.getCachedResponse(messages1);
      const cached2 = await CacheService.getCachedResponse(messages2);

      expect(cached1).toBeNull();
      expect(cached2).toBeNull();
    });
  });

  describe('getStats', () => {
    it('should return zero stats for empty cache', async () => {
      const stats = await CacheService.getStats();

      expect(stats).not.toBeNull();
      expect(stats?.size).toBe(0);
      expect(stats?.keys).toBe(0);
    });

    it('should return correct stats for populated cache', async () => {
      const messages1: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Message 1' }];
      const messages2: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Message 2' }];

      await CacheService.cacheResponse(messages1, 'Response 1');
      await CacheService.cacheResponse(messages2, 'Response 2');

      const stats = await CacheService.getStats();

      expect(stats?.size).toBe(2);
      expect(stats?.keys).toBe(2);
    });

    it('should clean up expired entries when getting stats', async () => {
      const messages: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Hello' }];

      await CacheService.cacheResponse(messages, 'Response');

      // Manually expire the entry
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const memoryCache = (CacheService as any).memoryCache;
      const keys = Array.from(memoryCache.keys());
      const entry = memoryCache.get(keys[0]);
      entry.expiresAt = Date.now() - 1000; // Set to past

      const stats = await CacheService.getStats();

      expect(stats?.keys).toBe(0);
    });
  });
});
