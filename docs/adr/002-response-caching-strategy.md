# ADR 002: Response Caching Strategy

## Status

Accepted

## Context

OpenAI API calls cost money (~$0.002 per 1K tokens for GPT-4o-mini). Portfolio visitors often ask similar questions, leading to redundant API calls and unnecessary costs. Response times for identical queries could be improved.

## Decision

We will implement a response caching layer with the following characteristics:

1. **Cache Key**: SHA256 hash of normalized user message (lowercase, trimmed)
2. **TTL**: 1 hour (3600 seconds)
3. **Scope**: Single-turn conversations only (no multi-turn context caching)
4. **Storage**: In-memory for development, Vercel KV for production
5. **Strategy**: Cache-aside pattern with fail-open behavior

## Consequences

### Positive:

- **Cost Reduction**: 30-50% reduction in OpenAI API costs for common questions
- **Performance**: Cached responses return in <50ms vs 1-3s for API calls
- **Reliability**: Cached responses continue serving even if OpenAI API is down
- **User Experience**: Instant responses for frequently asked questions

### Negative:

- **Stale Data**: Cached responses may be outdated if portfolio content changes
- **Storage Costs**: Vercel KV adds ~$10/month for production (offset by API savings)
- **Memory Usage**: In-memory cache grows unbounded in development without KV
- **Complexity**: Cache invalidation adds operational overhead

## Trade-offs Analyzed

### Cache TTL Selection (1 hour chosen):

| TTL        | Cost Savings | Staleness Risk | Memory Usage |
| ---------- | ------------ | -------------- | ------------ |
| 5 min      | 10-15%       | Low            | Low          |
| **1 hour** | **30-50%**   | **Medium**     | **Medium**   |
| 24 hours   | 60-70%       | High           | High         |

**Rationale**: 1 hour balances cost savings with acceptable staleness risk. Portfolio content changes infrequently (weekly/monthly).

### Single-Turn Only Caching:

- Multi-turn conversations have too much context variability
- Would lead to cache pollution with low hit rates
- Complexity not justified by potential savings

## Alternatives Considered

### 1. No Caching

- **Rejected**: Wastes money on identical API calls
- Estimated $50-100/month in unnecessary costs for moderate traffic

### 2. Browser Local Storage Caching

- **Rejected**: Only benefits individual users
- No cross-user savings, complex cache invalidation

### 3. CDN Edge Caching (Vercel Edge)

- **Rejected**: Cannot cache dynamic AI responses at CDN level
- Edge caching unsuitable for user-specific content

### 4. Redis/Upstash

- **Considered**: Similar to Vercel KV but different provider
- Vercel KV chosen for tighter integration and simpler auth

## Implementation Details

### Cache Key Generation:

```typescript
SHA256(lowercase(trim(userMessage))).substring(0, 16);
```

### Cache Hit Flow:

1. Normalize user message (lowercase, trim)
2. Generate SHA256 hash
3. Check cache for key
4. If hit: return cached response with `X-Cache-Status: HIT` header
5. If miss: call OpenAI API, cache response, return with `X-Cache-Status: MISS`

### Cache Invalidation:

- Automatic TTL expiration (1 hour)
- Manual invalidation via `/api/admin/clear-cache` (future feature)
- Full cache clear on deployment (production only)

## Monitoring

- Track cache hit/miss ratio
- Monitor cache size growth
- Alert if hit rate drops below 20%

## Migration Path to Production

Current: In-memory (development only)
Target: Vercel KV (production)

Steps:

1. Install `@vercel/kv` package
2. Create KV database in Vercel dashboard
3. Update `CacheService` to use KV instead of Map
4. Set `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars
5. Deploy and monitor

## References

- Cache implementation: `/lib/services/CacheService.ts`
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- Cost analysis spreadsheet: `/docs/cost-analysis.md` (to be created)
