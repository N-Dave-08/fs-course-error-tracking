# Exercises 01: Error Handling Basics

## Learning Objectives

By completing these exercises, you will:
- ✅ Implement try-catch error handling
- ✅ Create custom error classes
- ✅ Handle errors in async operations
- ✅ Understand error propagation
- ✅ Practice graceful error handling
- ✅ Learn error logging patterns

## Before You Start

**Prerequisites:**
- Node.js 22+ LTS
- TypeScript knowledge
- Understanding of JavaScript errors

**Setup:**
1. Navigate to `fs-course-error-tracking/level-01-error-handling-basics/`
2. Create `exercises/` directory
3. All exercises should be created in this directory

---

## Exercise 1: Try-Catch

**Objective:** Implement basic error handling with try-catch blocks.

**Instructions:**
Create `exercises/exercise-01.ts` that:
1. Wraps risky operations in try-catch
2. Catches and logs errors
3. Handles errors gracefully

**Expected Code Structure:**
```typescript
// exercises/exercise-01.ts
/**
 * Risky operation that might throw
 */
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

/**
 * Safe division with error handling
 */
function safeDivide(a: number, b: number): number | null {
  try {
    return divide(a, b);
  } catch (error) {
    console.error('Division error:', error);
    return null; // Return null instead of throwing
  }
}

/**
 * Process user input with error handling
 */
function processUserInput(input: string): number {
  try {
    const number = parseFloat(input);
    
    if (isNaN(number)) {
      throw new Error(`Invalid number: ${input}`);
    }
    
    return number;
  } catch (error) {
    console.error('Input processing error:', error);
    throw error; // Re-throw to let caller handle
  }
}

// Test error handling
console.log('=== Exercise 1: Try-Catch ===');

// Test 1: Successful division
try {
  const result1 = divide(10, 2);
  console.log('10 / 2 =', result1);
} catch (error) {
  console.error('Error:', error);
}

// Test 2: Division by zero
try {
  const result2 = divide(10, 0);
  console.log('10 / 0 =', result2);
} catch (error) {
  console.error('Caught error:', (error as Error).message);
}

// Test 3: Safe division
const result3 = safeDivide(10, 0);
console.log('Safe divide result:', result3); // null

// Test 4: Input processing
try {
  const num = processUserInput('123');
  console.log('Parsed number:', num);
} catch (error) {
  console.error('Failed to process input:', error);
}
```

**Verification Steps:**
1. Run: `npx ts-node exercises/exercise-01.ts`
2. Verify errors are caught and logged
3. Check that program continues after errors

**Expected Output:**
```
=== Exercise 1: Try-Catch ===
10 / 2 = 5
Caught error: Division by zero is not allowed
Division error: Error: Division by zero is not allowed
Safe divide result: null
Parsed number: 123
```

**Hints:**
- Use `try-catch` for operations that might throw
- Log errors for debugging
- Decide whether to re-throw or handle gracefully
- Use type assertions for error types

**Common Mistakes:**
- ❌ Not catching errors at all
- ❌ Catching but not handling
- ❌ Swallowing errors silently
- ❌ Not logging errors

**File:** `exercises/exercise-01.ts`

---

## Exercise 2: Custom Errors

**Objective:** Create custom error classes for better error handling.

**Instructions:**
Create custom error classes:
1. Base `AppError` class
2. Specific error types (ValidationError, NotFoundError)
3. Use them in functions

**Expected Code Structure:**
```typescript
// exercises/exercise-02.ts
/**
 * Base application error class
 */
class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    // Maintains proper stack trace
    Error.captureStackTrace(this, this.constructor);
    
    // Set the prototype explicitly
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Validation error (400)
 */
class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Not found error (404)
 */
class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Unauthorized error (401)
 */
class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

// Example usage
function validateEmail(email: string): void {
  if (!email.includes('@')) {
    throw new ValidationError('Invalid email format');
  }
}

function findUser(id: number): { id: number; name: string } {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new NotFoundError('User');
  }
  
  return user;
}

// Test custom errors
console.log('=== Exercise 2: Custom Errors ===');

// Test 1: Validation error
try {
  validateEmail('invalid-email');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation Error:', error.message);
    console.error('Status Code:', error.statusCode);
  }
}

// Test 2: Not found error
try {
  findUser(999);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.error('Not Found Error:', error.message);
    console.error('Status Code:', error.statusCode);
  }
}

// Test 3: Successful operation
try {
  const user = findUser(1);
  console.log('Found user:', user);
} catch (error) {
  console.error('Error:', error);
}
```

**Verification Steps:**
1. Run the script
2. Verify custom errors are thrown correctly
3. Check error properties (statusCode, message)
4. Test error type checking with `instanceof`

**Expected Output:**
```
=== Exercise 2: Custom Errors ===
Validation Error: Invalid email format
Status Code: 400
Not Found Error: User not found
Status Code: 404
Found user: { id: 1, name: 'Alice' }
```

**Hints:**
- Extend `Error` class for custom errors
- Add custom properties (statusCode, etc.)
- Use `instanceof` to check error types
- Set prototype for proper inheritance

**Common Mistakes:**
- ❌ Not extending Error class properly
- ❌ Forgetting to set prototype
- ❌ Not maintaining stack trace
- ❌ Not using instanceof for type checking

**File:** `exercises/exercise-02.ts`

---

## Exercise 3: Async Error Handling

**Objective:** Handle errors in asynchronous operations.

**Instructions:**
Create error handling for:
1. Promise chains
2. Async/await functions
3. Error propagation

**Expected Code Structure:**
```typescript
// exercises/exercise-03.ts
import { ValidationError, NotFoundError } from './exercise-02';

/**
 * Simulate async operation that might fail
 */
async function fetchUserData(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < 1) {
        reject(new ValidationError('Invalid user ID'));
        return;
      }
      
      if (id > 10) {
        reject(new NotFoundError('User'));
        return;
      }
      
      resolve({ id, name: `User ${id}` });
    }, 100);
  });
}

/**
 * Handle errors in promise chain
 */
function fetchUserWithPromise(id: number): void {
  fetchUserData(id)
    .then(user => {
      console.log('User found:', user);
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        console.error('Validation error:', error.message);
      } else if (error instanceof NotFoundError) {
        console.error('Not found:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    });
}

/**
 * Handle errors with async/await
 */
async function fetchUserWithAsync(id: number): Promise<void> {
  try {
    const user = await fetchUserData(id);
    console.log('User found:', user);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof NotFoundError) {
      console.error('Not found:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
}

/**
 * Propagate errors to caller
 */
async function processUser(id: number): Promise<{ id: number; name: string }> {
  try {
    const user = await fetchUserData(id);
    // Process user data...
    return user;
  } catch (error) {
    // Log error but re-throw
    console.error('Error processing user:', error);
    throw error; // Propagate to caller
  }
}

// Test async error handling
console.log('=== Exercise 3: Async Error Handling ===');

// Test 1: Promise chain
console.log('\n1. Promise chain:');
fetchUserWithPromise(5); // Success
fetchUserWithPromise(0); // Validation error
fetchUserWithPromise(999); // Not found error

// Test 2: Async/await
console.log('\n2. Async/await:');
(async () => {
  await fetchUserWithAsync(3); // Success
  await fetchUserWithAsync(-1); // Validation error
  await fetchUserWithAsync(999); // Not found error
})();

// Test 3: Error propagation
console.log('\n3. Error propagation:');
processUser(5)
  .then(user => console.log('Processed:', user))
  .catch(error => console.error('Failed to process:', error.message));
```

**Verification Steps:**
1. Run the script
2. Verify errors are caught in async operations
3. Check error propagation works
4. Test both promise and async/await patterns

**Expected Behavior:**
- Errors caught in promise chains
- Errors caught in async/await
- Errors can be propagated to callers
- Error types are preserved

**Hints:**
- Use `.catch()` for promise chains
- Use `try-catch` with async/await
- Re-throw errors to propagate
- Always handle errors in async code

**Common Mistakes:**
- ❌ Not awaiting async functions
- ❌ Forgetting `.catch()` in promise chains
- ❌ Not handling errors in async functions
- ❌ Swallowing errors without logging

**File:** `exercises/exercise-03.ts`

---

## Running Exercises

### Run Individual Exercises

```bash
npx ts-node exercises/exercise-01.ts
npx ts-node exercises/exercise-02.ts
npx ts-node exercises/exercise-03.ts
```

### Run All Exercises

```bash
for file in exercises/exercise-*.ts; do
  echo "Running $file..."
  npx ts-node "$file"
  echo ""
done
```

## Verification Checklist

After completing all exercises, verify:

- [ ] Try-catch blocks work correctly
- [ ] Errors are caught and logged
- [ ] Custom error classes work
- [ ] Error types can be checked with instanceof
- [ ] Async errors are handled properly
- [ ] Errors can be propagated when needed
- [ ] All code is type-safe

## Troubleshooting

### Issue: Errors not being caught

**Solution:**
- Ensure try-catch wraps the risky operation
- Check that errors are actually being thrown
- Verify async functions are awaited

### Issue: Custom errors not working

**Solution:**
- Check Error class extension
- Verify prototype is set correctly
- Ensure instanceof checks work

### Issue: Async errors not caught

**Solution:**
- Use await with try-catch
- Or use .catch() with promises
- Don't forget to handle errors

## Next Steps

After completing these exercises:

1. ✅ **Review**: Understand error handling patterns
2. ✅ **Experiment**: Add more error types
3. ✅ **Practice**: Implement error recovery strategies
4. 📖 **Continue**: Move to [Level 2: Logging](../level-02-logging/lesson-01-logging-concepts.md)
5. 💻 **Reference**: Check `project/` folder for complete implementation

## Additional Resources

- [Error Handling Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Custom Errors in TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget)

---

**Key Takeaways:**
- Always handle errors, don't let them crash your app
- Use try-catch for synchronous errors
- Use try-catch with async/await or .catch() with promises
- Custom errors provide better error information
- Log errors for debugging
- Decide when to handle vs propagate errors

**Good luck! Happy coding! 🚀**
