/**
 * Centralized API error handling for OpenAI and internal errors.
 * Provides consistent error responses with user-friendly messages.
 *
 * @example
 * ```ts
 * try {
 *   await openai.chat.completions.create({...});
 * } catch (error) {
 *   const apiError = APIError.fromOpenAIError(error);
 *   return NextResponse.json(apiError.toJSON(), { status: apiError.statusCode });
 * }
 * ```
 */
export class APIError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly userMessage: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'APIError';

    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }
  }

  /**
   * Maps OpenAI API errors to user-friendly APIError instances.
   * Handles authentication, rate limiting, server errors, and quota issues.
   *
   * @param error - Unknown error from OpenAI API call
   * @returns APIError with appropriate status code and user message
   */
  static fromOpenAIError(error: unknown): APIError {
    if (!error || typeof error !== 'object') {
      return new APIError(
        500,
        'Unknown error',
        'An unexpected error occurred. Please try again.',
        error
      );
    }

    // Handle OpenAI API status codes
    if ('status' in error) {
      const status = error.status as number;
      const message = 'message' in error ? String(error.message) : 'Unknown error';

      // Check for quota errors before status code mapping
      if (message.includes('insufficient_quota') || message.includes('quota')) {
        return new APIError(
          402,
          message,
          'OpenAI account has insufficient quota. Please check your billing settings.',
          error
        );
      }

      // Map status codes to user-friendly messages
      const errorMap: Record<number, string> = {
        400: 'Invalid request to AI service. Please try a different message.',
        401: 'Invalid API key configuration. Please check your OpenAI API key.',
        429: 'OpenAI API rate limit exceeded. Please try again in a moment.',
        500: 'OpenAI service is temporarily unavailable. Please try again later.',
        503: 'OpenAI service is temporarily unavailable. Please try again later.',
      };

      const userMessage = errorMap[status] || 'An error occurred processing your request. Please try again.';

      return new APIError(status, message, userMessage, error);
    }

    // Fallback for unexpected error shapes
    return new APIError(
      500,
      'Unknown error',
      'An error occurred processing your request. Please try again.',
      error
    );
  }

  /**
   * Converts error to JSON response format.
   * Use with NextResponse.json() for consistent API responses.
   *
   * @returns Object with error message and status code
   */
  toJSON() {
    return {
      error: this.userMessage,
      code: this.statusCode,
    };
  }

  /**
   * Checks if error is a client error (4xx).
   */
  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  /**
   * Checks if error is a server error (5xx).
   */
  isServerError(): boolean {
    return this.statusCode >= 500 && this.statusCode < 600;
  }
}
