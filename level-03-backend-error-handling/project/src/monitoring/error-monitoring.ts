// src/monitoring/error-monitor.ts
interface ErrorMetrics {
	totalErrors: number;
	errorRate: number;
	errorsByType: Record<string, number>;
	errorsByEndpoint: Record<string, number>;
}

class ErrorMonitor {
	private errors: Array<{ type: string; endpoint: string; timestamp: Date }> =
		[];

	recordError(type: string, endpoint: string) {
		this.errors.push({ type, endpoint, timestamp: new Date() });
	}

	getMetrics(timeWindow: number = 3600000): ErrorMetrics {
		const windowStart = new Date(Date.now() - timeWindow);
		const recentErrors = this.errors.filter((e) => e.timestamp >= windowStart);

		const errorsByType: Record<string, number> = {};
		const errorsByEndpoint: Record<string, number> = {};

		recentErrors.forEach((error) => {
			errorsByType[error.type] = (errorsByType[error.type] || 0) + 1;
			errorsByEndpoint[error.endpoint] =
				(errorsByEndpoint[error.endpoint] || 0) + 1;
		});

		return {
			totalErrors: recentErrors.length,
			errorRate: recentErrors.length / (timeWindow / 1000 / 60), // errors per minute
			errorsByType,
			errorsByEndpoint,
		};
	}
}

export default new ErrorMonitor();
