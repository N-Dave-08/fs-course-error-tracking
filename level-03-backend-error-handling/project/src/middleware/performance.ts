// project/src/middleware/performance.ts
import * as Sentry from "@sentry/node";
import type { NextFunction, Request, Response } from "express";

export function performanceMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	// 1. Link to any incoming trace headers (Distributed Tracing)
	// 2. Start a span that represents the HTTP request
	Sentry.continueTrace(
		{
			sentryTrace: req.headers["sentry-trace"] as string,
			baggage: req.headers["baggage"] as string,
		},
		() => {
			Sentry.startSpan(
				{
					op: "http.server",
					name: `${req.method} ${req.route?.path || req.path}`,
				},
				async () => {
					// The span stays active while the rest of the request executes
					next();
				},
			);
		},
	);
}
