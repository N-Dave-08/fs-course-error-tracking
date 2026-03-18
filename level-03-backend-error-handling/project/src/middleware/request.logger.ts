import type { NextFunction, Request, Response } from "express";
import logger from "../../../../level-02-logging/src/logger/logger";

export function requestLogger(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
		logger.info("Request completed", {
			method: req.method,
			path: req.path,
			statusCode: res.statusCode,
			duration: `${duration} ms`,
			ip: req.ip,
		});
	});

	next();
}
