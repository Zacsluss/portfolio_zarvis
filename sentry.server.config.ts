import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Filter out known errors
  beforeSend(event, hint) {
    const error = hint.originalException;

    // Ignore specific errors
    if (error && typeof error === 'object' && 'message' in error) {
      const message = error.message as string;

      // Ignore OpenAI rate limit errors (we handle these gracefully)
      if (message.includes('rate limit') || message.includes('insufficient_quota')) {
        return null;
      }

      // Ignore expected validation errors
      if (message.includes('Invalid request') || message.includes('Invalid message count')) {
        return null;
      }
    }

    return event;
  },

  environment: process.env.NODE_ENV,
});
