import { APIError } from '@/lib/errors/APIError';

describe('APIError', () => {
  describe('constructor', () => {
    it('should create APIError with all properties', () => {
      const error = new APIError(404, 'Not found', 'Resource not found', { detail: 'extra' });

      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Not found');
      expect(error.userMessage).toBe('Resource not found');
      expect(error.originalError).toEqual({ detail: 'extra' });
      expect(error.name).toBe('APIError');
    });

    it('should capture stack trace', () => {
      const error = new APIError(500, 'Server error', 'Internal error');

      expect(error.stack).toBeDefined();
    });
  });

  describe('fromOpenAIError', () => {
    it('should handle quota errors specifically', () => {
      const openAIError = {
        status: 429,
        message: 'insufficient_quota: You exceeded your current quota',
      };

      const apiError = APIError.fromOpenAIError(openAIError);

      expect(apiError.statusCode).toBe(402);
      expect(apiError.userMessage).toContain('insufficient quota');
    });

    it('should handle 400 Bad Request errors', () => {
      const openAIError = {
        status: 400,
        message: 'Invalid request',
      };

      const apiError = APIError.fromOpenAIError(openAIError);

      expect(apiError.statusCode).toBe(400);
      expect(apiError.userMessage).toContain('Invalid request');
    });

    it('should handle 401 Unauthorized errors', () => {
      const openAIError = {
        status: 401,
        message: 'Invalid API key',
      };

      const apiError = APIError.fromOpenAIError(openAIError);

      expect(apiError.statusCode).toBe(401);
      expect(apiError.userMessage).toContain('Invalid API key');
    });

    it('should handle 429 Rate Limit errors', () => {
      const openAIError = {
        status: 429,
        message: 'Rate limit exceeded',
      };

      const apiError = APIError.fromOpenAIError(openAIError);

      expect(apiError.statusCode).toBe(429);
      expect(apiError.userMessage).toContain('rate limit');
    });

    it('should handle 500 Server errors', () => {
      const openAIError = {
        status: 500,
        message: 'Internal server error',
      };

      const apiError = APIError.fromOpenAIError(openAIError);

      expect(apiError.statusCode).toBe(500);
      expect(apiError.userMessage).toBe(
        'OpenAI service is temporarily unavailable. Please try again later.'
      );
    });

    it('should handle 503 Service Unavailable errors', () => {
      const openAIError = {
        status: 503,
        message: 'Service unavailable',
      };

      const apiError = APIError.fromOpenAIError(openAIError);

      expect(apiError.statusCode).toBe(503);
      expect(apiError.userMessage).toBe(
        'OpenAI service is temporarily unavailable. Please try again later.'
      );
    });

    it('should handle unknown status codes', () => {
      const openAIError = {
        status: 418,
        message: "I'm a teapot",
      };

      const apiError = APIError.fromOpenAIError(openAIError);

      expect(apiError.statusCode).toBe(418);
      expect(apiError.userMessage).toBe(
        'An error occurred processing your request. Please try again.'
      );
    });

    it('should handle non-object errors', () => {
      const apiError = APIError.fromOpenAIError('string error');

      expect(apiError.statusCode).toBe(500);
      expect(apiError.userMessage).toBe('An unexpected error occurred. Please try again.');
    });

    it('should handle null errors', () => {
      const apiError = APIError.fromOpenAIError(null);

      expect(apiError.statusCode).toBe(500);
      expect(apiError.userMessage).toBe('An unexpected error occurred. Please try again.');
    });

    it('should handle errors without status property', () => {
      const error = { message: 'Something went wrong' };

      const apiError = APIError.fromOpenAIError(error);

      expect(apiError.statusCode).toBe(500);
      expect(apiError.userMessage).toBe(
        'An error occurred processing your request. Please try again.'
      );
    });
  });

  describe('toJSON', () => {
    it('should serialize to JSON with error and code', () => {
      const error = new APIError(404, 'Not found', 'Resource not found');

      const json = error.toJSON();

      expect(json).toEqual({
        error: 'Resource not found',
        code: 404,
      });
    });
  });
});
