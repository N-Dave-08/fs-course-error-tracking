# Logging Patterns

## Structured Logging

```typescript
logger.info('User action', {
  userId: user.id,
  action: 'login',
  timestamp: new Date().toISOString()
});
```

## Request Logging

```typescript
app.use((req, res, next) => {
  logger.info('Request', {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  next();
});
```

## Error Logging

```typescript
logger.error('Operation failed', {
  error: error.message,
  stack: error.stack,
  context: { userId, operation }
});
```

## Log Levels

- **Error**: System errors
- **Warn**: Warnings
- **Info**: General information
- **Debug**: Debug information
