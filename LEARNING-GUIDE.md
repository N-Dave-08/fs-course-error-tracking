# Error Tracking Course Setup Guide

Complete setup instructions for the error tracking course.

## Prerequisites

1. **Node.js 22+ LTS**
2. **pnpm** package manager
3. **Sentry Account** (free tier available)

## Initial Setup

### Step 1: Navigate to Course Directory

```bash
cd fs-course-error-tracking
```

### Step 2: Initialize Package.json

```bash
pnpm init
```

### Step 3: Install Dependencies

```bash
# Logging
pnpm add winston@^3.15.0 morgan@^1.10.0

# Error Tracking
pnpm add @sentry/node@^10.36.0 @sentry/nextjs@^10.36.0

# TypeScript
pnpm add -D typescript@^5.7.0 @types/node@^22.0.0 @types/morgan@^1.9.0 ts-node@^10.9.0
```

### Step 4: Create TypeScript Config

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Step 5: Set Up Sentry

1. Create account at [sentry.io](https://sentry.io)
2. Create a new project
3. Get your DSN (Data Source Name)
4. Add to `.env`:

```env
SENTRY_DSN=your-sentry-dsn-here
SENTRY_ENVIRONMENT=development
```

### Step 6: Test Setup

Create `test-logging.ts`:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});

logger.info('✅ Logging setup successful!');
```

Run: `npx ts-node test-logging.ts`

## Workflow

### Using Winston

```typescript
import logger from './logger';

logger.info('Information message');
logger.error('Error message', { error });
```

### Using Sentry

```typescript
import * as Sentry from '@sentry/node';

Sentry.captureException(error);
Sentry.captureMessage('Something went wrong');
```

## Next Steps

1. ✅ Verify setup with test-logging.ts
2. 📖 Start with [Level 1: Error Handling Basics](./level-01-error-handling-basics/lesson-01-introduction.md)

Happy learning! 🚀
