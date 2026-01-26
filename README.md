# Full Stack Course: Error Tracking

Master error handling, logging, and monitoring for production applications.

## Overview

This course teaches comprehensive error tracking and logging using Winston, Sentry, and best practices. You'll learn error handling patterns, structured logging, and production monitoring.

## Prerequisites

- Node.js 22+ LTS
- pnpm package manager
- Understanding of backend concepts

## Course Structure

This course consists of **6 progressive levels**:

1. **Level 1: Error Handling Basics** - Introduction, error types, patterns
2. **Level 2: Logging** - Logging concepts, Winston setup, log levels
3. **Level 3: Backend Error Handling** - Express error middleware, error responses, structured logging
4. **Level 4: Frontend Error Handling** - React error boundaries, hooks, user-friendly errors
5. **Level 5: Sentry Integration** - Sentry setup, error tracking, performance monitoring
6. **Level 6: Production Error Handling** - Monitoring, alerting, error analysis

## Tech Stack

- **Winston**: 3.15+ (logging)
- **Sentry**: 10.36+ (error tracking)
- **Morgan**: 1.10+ (HTTP request logging)
- **Node.js**: 22+ LTS

## Getting Started

1. **Read the Setup Guide**: Start with [LEARNING-GUIDE.md](./LEARNING-GUIDE.md)
2. **Follow Setup Instructions**: Install logging and error tracking dependencies
3. **Start Learning**: Begin with Level 1

## Related Courses

- **fs-course-backend** - Integrate error tracking into Express.js
- **fs-course-frontend** - Add error boundaries to Next.js
- **fs-course-infrastructure** - Monitor in production

## Cross-Repository Integration

This error tracking course provides observability across the stack:

- **Integrates with**: `fs-course-backend` (Winston logging, Sentry server-side)
- **Integrates with**: `fs-course-frontend` (Sentry client-side, error boundaries)
- **Monitored in**: `fs-course-infrastructure` (production monitoring)

### Integration Points

1. **Backend Integration**:
   - Winston logging in Express.js
   - Sentry error tracking
   - Structured logging for APIs
   - Connection: `SENTRY_DSN` environment variable

2. **Frontend Integration**:
   - Sentry client-side error tracking
   - React error boundaries
   - User-friendly error messages
   - Connection: `NEXT_PUBLIC_SENTRY_DSN` environment variable

3. **Infrastructure Integration**:
   - Log aggregation in production
   - Error monitoring dashboards
   - Alerting for critical errors

### Environment Variables

```env
# Backend error tracking
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info

# Frontend error tracking
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Error Flow

```text
Application Error → Winston Log → Sentry → Dashboard
                              ↓
                    Error Analysis & Alerts
```
