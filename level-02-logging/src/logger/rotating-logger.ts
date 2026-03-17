import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const rotatingLogger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
	),
	transports: [
		new DailyRotateFile({
			filename: "logs/applicaiton-%DATA%.log",
			datePattern: "YYYY-MM-DD",
			maxSize: "20m",
			maxFiles: "14d",
		}),
	],
});

export default rotatingLogger;
