# Exercises 02: Logging

## Learning Objectives

By completing these exercises, you will:
- ✅ Set up Winston logger
- ✅ Implement structured logging
- ✅ Configure log rotation
- ✅ Use appropriate log levels
- ✅ Format logs consistently
- ✅ Practice logging best practices

## Before You Start

**Prerequisites:**
- Error handling basics (Level 1)
- Node.js knowledge
- Understanding of logging concepts
- Winston package

**Setup:**
1. Navigate to `fs-course-error-tracking/level-02-logging/`
2. Install: `pnpm add winston winston-daily-rotate-file`
3. Create `src/logger/` directory

---

## Exercise 1: Winston Setup

**Objective:** Set up Winston logger.

**Instructions:**
Create `src/logger/logger.ts`:
1. Configure transports
2. Set log levels
3. Create custom format

**Expected Code Structure:**
```typescript
// src/logger/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'app' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

export default logger;
```

**Verification:**
- Logger works
- Logs written to files
- Console logging in dev

**File:** `src/logger/logger.ts`

---

## Exercise 2: Structured Logging

**Objective:** Implement structured logging.

**Instructions:**
Create `src/logger/structured-logger.ts`:
1. Log with context
2. Use appropriate levels
3. Format logs consistently

**Expected Code Structure:**
```typescript
// src/logger/structured-logger.ts
import logger from './logger';

class StructuredLogger {
  info(message: string, context?: any) {
    logger.info(message, { context });
  }

  error(message: string, error: Error, context?: any) {
    logger.error(message, {
      error: error.message,
      stack: error.stack,
      context,
    });
  }

  warn(message: string, context?: any) {
    logger.warn(message, { context });
  }

  debug(message: string, context?: any) {
    logger.debug(message, { context });
  }
}

export default new StructuredLogger();
```

**Verification:**
- Structured logging works
- Context included
- Levels used correctly

**File:** `src/logger/structured-logger.ts`

---

## Exercise 3: Log Rotation

**Objective:** Set up log rotation.

**Instructions:**
Create `src/logger/rotating-logger.ts`:
1. Rotate logs by size
2. Rotate logs by date
3. Clean up old logs

**Expected Code Structure:**
```typescript
// src/logger/rotating-logger.ts
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const rotatingLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export default rotatingLogger;
```

**Verification:**
- Rotation works
- Old logs cleaned
- Size limits enforced

**File:** `src/logger/rotating-logger.ts`

---

## Running Exercises

```bash
npx ts-node src/logger/logger.ts
```

## Verification Checklist

- [X] Winston set up correctly
- [X] Structured logging works
- [X] Log rotation works
- [X] Logs formatted correctly
- [X] Levels used appropriately

## Next Steps

1. ✅ **Review**: Understand logging
2. ✅ **Experiment**: Add more features
3. 📖 **Continue**: Move to [Level 3: Backend Error Handling](../level-03-backend-error-handling/lesson-01-express-error-middleware.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Use appropriate log levels
- Structure logs consistently
- Rotate logs regularly
- Include context in logs
- Separate error logs
- Monitor log files

**Good luck! Happy coding! 🚀**
