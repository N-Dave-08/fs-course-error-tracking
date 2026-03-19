// src/alerting/alert-manager.ts
import errorMonitor from "../monitoring/error-monitoring";

interface AlertConfig {
	errorRateThreshold: number;
	errorCountThreshold: number;
	alertChannels: string[];
}

class AlertManager {
	private config: AlertConfig = {
		errorRateThreshold: 10, // errors per minute
		errorCountThreshold: 50, // total errors
		alertChannels: ["email", "slack"],
	};

	checkAlerts() {
		const metrics = errorMonitor.getMetrics();

		if (metrics.errorRate > this.config.errorRateThreshold) {
			this.sendAlert("High error rate detected", metrics);
		}

		if (metrics.totalErrors > this.config.errorCountThreshold) {
			this.sendAlert("High error count detected", metrics);
		}
	}

	private sendAlert(message: string, metrics: any) {
		// Send to configured channels
		console.log("ALERT:", message, metrics);
	}
}

export default new AlertManager();
