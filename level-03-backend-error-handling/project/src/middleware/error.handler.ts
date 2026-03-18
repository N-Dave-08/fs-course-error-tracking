import type { NextFunction, Request, Response } from "express";
import logger from "../../../../level-02-logging/src/logger/logger";

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	logger.error("Error occured", {
		error: err.message,
		stach: err.stack,
		path: req.path,
		method: req.method,
	});

	res.status(500).json({
		success: false,
		error:
			process.env.NODE_ENV === "production"
				? "Internal server error"
				: err.message,
	});
}
