# Error Handling Cheatsheet

## Try-Catch

```typescript
try {
  riskyOperation();
} catch (error) {
  handleError(error);
}
```

## Async Error Handling

```typescript
try {
  await asyncOperation();
} catch (error) {
  handleError(error);
}
```

## Winston Logging

```typescript
logger.error('Error message', { error, context });
logger.warn('Warning message');
logger.info('Info message');
```

## Sentry

```typescript
Sentry.captureException(error);
Sentry.captureMessage('Message', 'level');
Sentry.setUser({ id: user.id });
```
