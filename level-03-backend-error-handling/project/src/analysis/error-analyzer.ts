// src/analysis/error-analyzer.ts
import errorMonitor from "../monitoring/error-monitoring";

class ErrorAnalyzer {
	groupErrors() {
		const metrics = errorMonitor.getMetrics();

		return {
			byType: metrics.errorsByType,
			byEndpoint: metrics.errorsByEndpoint,
			topErrors: Object.entries(metrics.errorsByType)
				.sort(([, a], [, b]) => b - a)
				.slice(0, 5),
		};
	}

	generateReport() {
		const grouped = this.groupErrors();
		const metrics = errorMonitor.getMetrics();

		return {
			summary: {
				totalErrors: metrics.totalErrors,
				errorRate: metrics.errorRate,
			},
			breakdown: grouped,
			recommendations: this.getRecommendations(metrics),
		};
	}

	private getRecommendations(metrics: any): string[] {
		const recommendations: string[] = [];

		if (metrics.errorRate > 10) {
			recommendations.push("Error rate is high - investigate immediately");
		}

		return recommendations;
	}
}

export default new ErrorAnalyzer();
