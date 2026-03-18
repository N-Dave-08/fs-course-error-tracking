# Exercises 03: Backend Error Handling

## Learning Objectives

By completing these exercises, you will:
- ✅ Create error handling middleware
- ✅ Wrap async route handlers
- ✅ Implement request logging
- ✅ Handle errors consistently
- ✅ Log errors properly
- ✅ Practice backend error patterns

## Before You Start

**Prerequisites:**
- Logging (Level 2)
- Express.js knowledge
- Understanding of middleware
- Error handling concepts

**Setup:**
1. Navigate to `fs-course-error-tracking/level-03-backend-error-handling/`
2. Ensure Express app is set up
3. All exercises should be created in `project/src/`

---

## Exercise 1: Error Middleware

**Objective:** Create error handling middleware.

**Instructions:**
Create `project/src/middleware/errorHandler.ts`:
1. Catch all errors
2. Log errors
3. Return consistent format

**Expected Code Structure:**
```typescript
// project/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Return consistent error format
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
  });
}
```

**Verification:**
- Errors caught
- Logged correctly
- Consistent format

**File:** `project/src/middleware/errorHandler.ts`

---

## Exercise 2: Async Handler

**Objective:** Create async handler wrapper.

**Instructions:**
Create `project/src/middleware/asyncHandler.ts`:
1. Wrap async route handlers
2. Catch promise rejections
3. Pass to error middleware

**Expected Code Structure:**
```typescript
// project/src/middleware/asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export function asyncHandler(fn: AsyncFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Usage:
// router.get('/users', asyncHandler(async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// }));
```

**Verification:**
- Async handlers work
- Errors caught
- Passed to error middleware

**File:** `project/src/middleware/asyncHandler.ts`

---

## Exercise 3: Request Logging

**Objective:** Implement request logging.

**Instructions:**
Create `project/src/middleware/requestLogger.ts`:
1. Log all requests
2. Include relevant context
3. Log responses

**Expected Code Structure:**
```typescript
// project/src/middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request completed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });
  });

  next();
}
```

**Verification:**
- Requests logged
- Context included
- Responses logged

**File:** `project/src/middleware/requestLogger.ts`

---

## Running Exercises

```bash
cd project
pnpm dev
```

## Verification Checklist

- [X] Error middleware works
- [X] Async handler works
- [X] Request logging works
- [X] Errors handled consistently
- [X] Logs formatted correctly

## Next Steps

1. ✅ **Review**: Understand backend error handling
2. ✅ **Experiment**: Add more features
3. 📖 **Continue**: Move to [Level 4: Frontend Error Handling](../level-04-frontend-error-handling/lesson-01-react-error-boundaries.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Centralize error handling
- Wrap async handlers
- Log all errors
- Use consistent format
- Include context
- Handle gracefully

**Good luck! Happy coding! 🚀**
