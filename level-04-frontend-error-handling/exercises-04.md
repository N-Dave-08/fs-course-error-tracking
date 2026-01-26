# Exercises 04: Frontend Error Handling

## Learning Objectives

By completing these exercises, you will:
- ✅ Create React error boundaries
- ✅ Build error handling hooks
- ✅ Display user-friendly errors
- ✅ Handle async errors
- ✅ Provide retry mechanisms
- ✅ Practice frontend error patterns

## Before You Start

**Prerequisites:**
- Frontend development knowledge
- React knowledge
- Understanding of error boundaries
- Next.js basics

**Setup:**
1. Navigate to `fs-course-frontend/level-04-frontend-error-handling/`
2. Ensure Next.js project is set up
3. All exercises should be created in `project/src/`

---

## Exercise 1: Error Boundary

**Objective:** Create error boundary component.

**Instructions:**
Create `project/src/components/ErrorBoundary.tsx`:
1. Catch React errors
2. Display fallback UI
3. Log to error tracking

**Expected Code Structure:**
```typescript
// project/src/components/ErrorBoundary.tsx
"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 bg-red-50 border border-red-200 rounded">
          <h2 className="text-xl font-bold text-red-900">Something went wrong</h2>
          <p className="text-red-800 mt-2">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Verification:**
- Error boundary catches errors
- Fallback UI displays
- Errors logged

**File:** `project/src/components/ErrorBoundary.tsx`

---

## Exercise 2: Error Hook

**Objective:** Create error handling hook.

**Instructions:**
Create `project/src/hooks/useErrorHandler.ts`:
1. Manage error state
2. Handle async errors
3. Provide error utilities

**Expected Code Structure:**
```typescript
// project/src/hooks/useErrorHandler.ts
"use client";

import { useState, useCallback } from 'react';

export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((err: Error) => {
    setError(err);
    console.error('Error:', err);
    // Send to error tracking
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeWithErrorHandling = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T | null> => {
      try {
        clearError();
        return await fn();
      } catch (err) {
        handleError(err instanceof Error ? err : new Error('Unknown error'));
        return null;
      }
    },
    [handleError, clearError]
  );

  return {
    error,
    handleError,
    clearError,
    executeWithErrorHandling,
  };
}
```

**Verification:**
- Hook works correctly
- Errors handled
- State managed properly

**File:** `project/src/hooks/useErrorHandler.ts`

---

## Exercise 3: User-Friendly Errors

**Objective:** Display user-friendly errors.

**Instructions:**
Create `project/src/components/ErrorDisplay.tsx`:
1. Show helpful messages
2. Hide technical details
3. Provide retry options

**Expected Code Structure:**
```typescript
// project/src/components/ErrorDisplay.tsx
"use client";

interface ErrorDisplayProps {
  error: Error | null;
  onRetry?: () => void;
  message?: string;
}

export default function ErrorDisplay({ 
  error, 
  onRetry,
  message = 'Something went wrong. Please try again.' 
}: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <h3 className="text-lg font-semibold text-red-900">Error</h3>
      <p className="text-red-800 mt-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}
```

**Verification:**
- Errors displayed clearly
- User-friendly messages
- Retry works

**File:** `project/src/components/ErrorDisplay.tsx`

---

## Running Exercises

```bash
cd project
pnpm dev
```

## Verification Checklist

- [ ] Error boundary works
- [ ] Error hook works
- [ ] Error display works
- [ ] User-friendly messages
- [ ] Retry mechanisms work

## Next Steps

1. ✅ **Review**: Understand frontend error handling
2. ✅ **Experiment**: Add more features
3. 📖 **Continue**: Move to [Level 5: Sentry Integration](../level-05-sentry-integration/lesson-01-sentry-setup.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Use error boundaries for React errors
- Handle async errors with hooks
- Show user-friendly messages
- Provide retry options
- Log errors for debugging
- Hide technical details from users

**Good luck! Happy coding! 🚀**
