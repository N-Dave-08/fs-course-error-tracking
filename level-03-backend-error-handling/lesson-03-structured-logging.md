# Lesson 3: Structured Logging

## Learning Objectives

By the end of this lesson, you will be able to:
- Implement request/response logging for Express APIs safely
- Understand when to use Morgan vs custom structured logs
- Capture high-value request context (requestId, userId, route, latency)
- Avoid logging sensitive data and reduce log noise
- Use consistent structured log fields for production searchability

## Why Structured Logging Matters

In production, “pretty console logs” aren’t enough.
You want logs that are:
- queryable (filter by `requestId`, `status`, `route`)
- consistent across services
- safe (no secrets)

Structured logs make incident response dramatically faster.

```mermaid
flowchart LR
  req[Request] --> app[ExpressApp]
  app --> logs[StructuredLogs]
  logs --> search[SearchAndFilter]
  search --> debug[Debugging]
```

## Request Logging (Morgan)

Morgan is convenient for standardized HTTP access logs:

```typescript
import morgan from "morgan";

app.use(morgan("combined")); // Apache combined format
app.use(morgan("dev")); // Development format
```

### When Morgan is a good fit

- quick access logs
- consistent format without much code

### When Morgan isn’t enough

Morgan logs are often text-based; structured JSON logs with context are more powerful for production search.

## Custom Morgan Format

```typescript
morgan.token("user", (req) => req.user?.id || "anonymous");

app.use(morgan(":method :url :status :response-time ms - :user"));
```

## Structured Request Logging (Custom Middleware)

```typescript
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info("Request", {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  next();
});
```

### Add correlation IDs

In real systems, add `requestId` and include it on every log line to correlate events.

## Response Logging (Latency + Status)

```typescript
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info("Response", {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration,
    });
  });

  next();
});
```

### Why response logging matters

It gives you:
- latency per route
- status codes per request
- a baseline signal for monitoring and debugging

## What NOT to Log

Avoid logging:
- passwords, tokens, cookies
- full request bodies (especially auth forms)
- full headers (often contain secrets)

If you need request body logging for debugging:
- sample it
- redact sensitive fields
- keep it disabled by default in production

## Real-World Scenario: Tracing a Single Request

When a user reports a failure:
1. find their `requestId`
2. search logs by `requestId`
3. view request/response logs and errors together

This requires consistent structured fields.

## Best Practices

### 1) Standardize log fields

Common fields:
- `requestId`
- `userId`
- `route`/`path`
- `method`
- `status`
- `durationMs`

### 2) Keep logs high-signal

Prefer:
- one request log and one response log (or a single combined log)
- error logs with stacks and context

### 3) Separate access logs from app logs

Access logs track HTTP traffic; app logs track business events and errors.

## Common Pitfalls and Solutions

### Pitfall 1: Logging sensitive data

**Problem:** secrets leak into logs.

**Solution:** redact, whitelist fields, and avoid logging bodies/headers.

### Pitfall 2: Too much logging

**Problem:** cost increases and debugging gets harder.

**Solution:** log at appropriate levels, sample noisy events.

### Pitfall 3: No correlation IDs

**Problem:** can’t stitch logs together per request.

**Solution:** generate a requestId and include it everywhere.

## Troubleshooting

### Issue: You can’t tell which endpoint is slow

**Symptoms:**
- users report slowness but logs are unclear

**Solutions:**
1. Ensure response logs include duration and route.
2. Add percentiles via metrics (later), but logs can still show per-request latency.

## Next Steps

Now that you can do structured backend logging:

1. ✅ **Practice**: Add `requestId` and include it in request/response/error logs
2. ✅ **Experiment**: Log only high-signal events and reduce noise in production
3. 📖 **Next Level**: Move into frontend error handling and user-friendly messaging
4. 💻 **Complete Exercises**: Work through [Exercises 03](./exercises-03.md)

## Additional Resources

- [Morgan](https://github.com/expressjs/morgan)

---

**Key Takeaways:**
- Structured logs with consistent fields are essential for production debugging.
- Capture method/path/status/duration and correlation IDs; avoid logging secrets.
- Morgan is useful for access logs, but custom JSON logs add richer context.
