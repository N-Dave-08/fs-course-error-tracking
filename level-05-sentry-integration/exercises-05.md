# Exercises 05: Sentry Integration

## Learning Objectives

By completing these exercises, you will:
- ✅ Set up Sentry in backend and frontend
- ✅ Capture and track errors
- ✅ Add context to errors
- ✅ Monitor performance
- ✅ Use Sentry dashboard
- ✅ Practice error tracking best practices

## Before You Start

**Prerequisites:**
- Backend error handling (Level 3)
- Frontend error handling (Level 4)
- Sentry account (free tier works)
- Understanding of error tracking

**Setup:**
1. Navigate to `fs-course-error-tracking/level-05-sentry-integration/`
2. Install: `pnpm add @sentry/node @sentry/nextjs`
3. Get Sentry DSN from dashboard
4. All exercises should be created in `project/src/`

---

## Exercise 1: Sentry Setup

**Objective:** Set up Sentry in both backend and frontend.

**Instructions:**
Create `project/src/config/sentry.ts`:
1. Initialize in backend
2. Initialize in frontend
3. Test error capture

**Expected Code Structure:**
```typescript
// project/src/config/sentry.ts
import * as Sentry from '@sentry/node';

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0,
  });
}

// In Next.js frontend (sentry.client.config.ts)
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

**Verification:**
- Sentry initialized
- Errors captured
- Dashboard shows errors

**File:** `project/src/config/sentry.ts`

---

## Exercise 2: Error Tracking

**Objective:** Integrate error tracking.

**Instructions:**
Create `project/src/middleware/sentry.middleware.ts`:
1. Capture exceptions
2. Add context
3. Test in Sentry dashboard

**Expected Code Structure:**
```typescript
// project/src/middleware/sentry.middleware.ts
import * as Sentry from '@sentry/node';
import { Request, Response, NextFunction } from 'express';

export function sentryErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  Sentry.withScope((scope) => {
    scope.setContext('request', {
      method: req.method,
      url: req.url,
      headers: req.headers,
    });
    Sentry.captureException(err);
  });

  next(err);
}
```

**Verification:**
- Errors tracked
- Context added
- Dashboard updated

**File:** `project/src/middleware/sentry.middleware.ts`

---

## Exercise 3: Performance Monitoring

**Objective:** Set up performance monitoring.

**Instructions:**
Create `project/src/middleware/performance.ts`:
1. Track transactions
2. Monitor API endpoints
3. Analyze performance

**Expected Code Structure:**
```typescript
// project/src/middleware/performance.ts
import * as Sentry from '@sentry/node';
import { Request, Response, NextFunction } from 'express';

export function performanceMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const transaction = Sentry.startTransaction({
    op: 'http.server',
    name: `${req.method} ${req.path}`,
  });

  res.on('finish', () => {
    transaction.setHttpStatus(res.statusCode);
    transaction.finish();
  });

  next();
}
```

**Verification:**
- Performance tracked
- Transactions logged
- Metrics available

**File:** `project/src/middleware/performance.ts`

---

## Running Exercises

```bash
cd project
pnpm dev
# Trigger errors to test Sentry
```

## Verification Checklist

- [X] Sentry set up correctly
- [X] Errors captured
- [X] Context added
- [X] Performance monitored
- [X] Dashboard shows data

## Next Steps

1. ✅ **Review**: Understand Sentry integration
2. ✅ **Experiment**: Add more features
3. 📖 **Continue**: Move to [Level 6: Production Error Handling](../level-06-production-error-handling/lesson-01-error-monitoring.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Sentry tracks errors automatically
- Add context for debugging
- Monitor performance
- Use Sentry dashboard
- Filter and search errors
- Set up alerts

**Good luck! Happy coding! 🚀**
