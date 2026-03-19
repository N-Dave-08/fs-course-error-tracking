import type { NextFunction, Request, Response } from "express";
import * as Sentry from "@sentry/node";
export function sentryErrorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	Sentry.withScope((scope) => {
		scope.setContext("request", {
			method: req.method,
			url: req.url,
			headers: req.headers,
		});
		Sentry.captureException(err);
	});

	next(err);
}
