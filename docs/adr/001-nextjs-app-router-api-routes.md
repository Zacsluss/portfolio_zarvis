# ADR 001: Next.js App Router with Server-Side API Routes

## Status

Accepted

## Context

The portfolio requires integration with OpenAI's GPT-4o API for conversational AI functionality. API keys must be protected from client-side exposure, and the application needs to support both server-side rendering and client-side interactivity.

## Decision

We will use Next.js 14 with the App Router architecture and implement API routes as server-side endpoints.

### Key Choices:

1. **App Router over Pages Router**: Leverages latest Next.js features including React Server Components, improved routing, and better TypeScript support
2. **Server-side API routes**: All OpenAI API calls go through `/app/api/*` routes to protect API keys
3. **Streaming responses**: Use Server-Sent Events (SSE) for real-time AI responses

## Consequences

### Positive:

- **Security**: API keys never exposed to client, preventing unauthorized usage
- **Performance**: Server components reduce JavaScript bundle size by ~30%
- **Type Safety**: Better TypeScript integration with App Router
- **Streaming**: Real-time response generation improves perceived performance (TTFB <500ms)
- **Scalability**: Serverless functions auto-scale with demand

### Negative:

- **Latency**: Additional network hop adds 50-100ms compared to direct API calls
- **Cold Starts**: Serverless functions may experience initial delays (~500ms)
- **Complexity**: Streaming SSE requires more complex error handling

## Alternatives Considered

### 1. Client-Side API Calls

- **Rejected**: Exposes API keys in browser, creating security vulnerability
- API keys could be extracted and abused, leading to unexpected costs

### 2. Traditional Server (Express/Fastify)

- **Rejected**: Requires dedicated server infrastructure
- Higher operational complexity and hosting costs compared to serverless

### 3. Pages Router

- **Rejected**: Older Next.js architecture with less optimal performance
- App Router provides better DX and performance characteristics

## Implementation Notes

- All API routes in `/app/api/*` directories
- Environment variables validated at startup
- Rate limiting applied at API route level
- Response caching implemented for cost optimization

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [OpenAI API Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- Security analysis in `/docs/SECURITY.md`
