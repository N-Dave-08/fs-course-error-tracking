import logger from "./logger";

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
