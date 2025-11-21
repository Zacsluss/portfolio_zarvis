import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { generateSystemPrompt, assistantConfig } from '@/lib/assistant-context';
import { logger } from '@/lib/logger';
import { API_CONFIG, APP_CONFIG } from '@/lib/config';
import { APIError } from '@/lib/errors/APIError';
import { RateLimitService } from '@/lib/services/RateLimitService';
import { CacheService } from '@/lib/services/CacheService';

// Initialize OpenAI client lazily to avoid build-time errors
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
  });
}

/**
 * Sanitize user input to prevent injection attacks.
 * Removes potentially dangerous characters and limits length.
 *
 * Security measures:
 * - Limits length to {@link API_CONFIG.INPUT.MAX_LENGTH}
 * - Removes null bytes and control characters (prevent log injection)
 * - Trims whitespace
 *
 * @param text - Raw user input string
 * @returns Sanitized string safe for processing
 *
 * @example
 * ```ts
 * sanitizeInput("Hello\x00World  "); // "HelloWorld"
 * sanitizeInput("A".repeat(10000));  // Limited to MAX_LENGTH
 * ```
 */
function sanitizeInput(text: string): string {
  if (!text || typeof text !== 'string') return '';

  // Limit length to prevent abuse
  let sanitized = text.slice(0, API_CONFIG.INPUT.MAX_LENGTH);

  // Remove null bytes and control characters (log injection prevention)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
               req.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit (now using service layer)
    const rateLimit = await RateLimitService.checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60'
          }
        }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      );
    }

    // Validate and sanitize messages
    if (messages.length === 0 || messages.length > API_CONFIG.INPUT.MAX_MESSAGES) {
      return NextResponse.json(
        { error: 'Invalid message count' },
        { status: 400 }
      );
    }

    // Sanitize all message content
    const sanitizedMessages: ChatCompletionMessageParam[] = messages
      .map((msg: { role?: string; content?: string }) => {
        const role = (msg.role === 'user' || msg.role === 'assistant' ? msg.role : 'user') as 'user' | 'assistant';
        return {
          role,
          content: sanitizeInput(msg.content || ''),
        };
      })
      .filter((msg) => msg.content.length > 0);

    // Check cache before calling OpenAI (reduces costs)
    const cachedResponse = await CacheService.getCachedResponse(sanitizedMessages);
    if (cachedResponse) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: cachedResponse })}\n\n`));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Cache-Status': 'HIT',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      logger.error('OPENAI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Service configuration error: API key not found. Please check server configuration.' },
        { status: 503 }
      );
    }

    // Validate API key format
    if (!process.env.OPENAI_API_KEY.startsWith(APP_CONFIG.OPENAI_KEY_PREFIX)) {
      logger.error('OPENAI_API_KEY has invalid format (should start with sk-)');
      return NextResponse.json(
        { error: 'Service configuration error: Invalid API key format.' },
        { status: 503 }
      );
    }

    // Generate system prompt with portfolio context
    const systemPrompt = generateSystemPrompt();

    // Get OpenAI client
    const openai = getOpenAIClient();

    // Call OpenAI API with streaming
    const response = await openai.chat.completions.create({
      model: assistantConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...sanitizedMessages,
      ],
      temperature: assistantConfig.temperature,
      max_tokens: assistantConfig.maxTokens,
      stream: true,
    });

    // Create a readable stream for the response
    // Collect full response for caching
    let fullResponse = '';
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              fullResponse += text; // Collect for caching
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }

          // Cache the complete response for future identical queries
          await CacheService.cacheResponse(sanitizedMessages, fullResponse);

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          logger.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Cache-Status': 'MISS',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      },
    });

  } catch (error: unknown) {
    // Use centralized error handling
    const apiError = APIError.fromOpenAIError(error);

    logger.error('Chat API error:', {
      statusCode: apiError.statusCode,
      message: apiError.message,
      userMessage: apiError.userMessage,
    });

    return NextResponse.json(
      apiError.toJSON(),
      { status: apiError.statusCode }
    );
  }
}
