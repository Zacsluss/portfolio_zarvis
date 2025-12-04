# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-11-19

### Added
- Distributed rate limiting with Vercel KV support (fixes serverless cold start issues).
- Response caching service for common questions (30-50% cost reduction).
- Service layer architecture (APIError, RateLimitService, CacheService).
- Architecture diagram in README with Mermaid.
- Comprehensive test coverage for core utilities.
- JSDoc documentation for critical functions
- GitHub Actions CI/CD pipeline
- Issue and pull request templates
- Bundle analyzer configuration

### Changed
- Refactored error handling to centralized APIError class
- Improved structured logging with request context
- Updated documentation for production deployment

### Fixed
- Rate limiting now works correctly in serverless environment
- Removed build artifacts and backup files from repository
- Enhanced input sanitization documentation

### Security
- Distributed rate limiting prevents API abuse
- Response caching reduces attack surface
- Improved error messages prevent information leakage

## [1.0.0] - 2025-01-14

### Added
- GPT-4o-mini conversational AI assistant
- Voice input with OpenAI Whisper API transcription
- Streaming chat responses with real-time rendering
- Dual personality modes: Professional consultant + D&D Dungeon Master
- Production security: Rate limiting, input sanitization, CSP headers
- Comprehensive error handling (401, 429, 500, quota detection)
- Modern UI: Glassmorphism, parallax effects, 3D elements
- Complete documentation
- Unit tests for core utilities (logger, config, store)

### Security
- Server-side API key protection (keys never exposed to client)
- Input sanitization (removes control characters, length limits)
- Environment variable validation
- Rate limiting (10 req/min default, configurable)
