/**
 * Base application error class.
 * We extend the built-in Error to gain stack trace capabilities while adding
 * metadata useful for HTTP responses and monitoring.
 */
class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(
		message: string,
		statusCode: number = 500,
		// We set a default to 'true' because most manual errors are
		// "operational" (expected logic failures) rather than system crashes.
		isOperational: boolean = true,
	) {
		// 1. super(message) calls the Error constructor.
		// This sets the .message property and starts the stack trace.
		super(message);

		this.statusCode = statusCode;
		this.isOperational = isOperational;

		/**
		 * 2. Error.captureStackTrace (Node.js specific)
		 * This "v8" engine method captures the current stack trace but
		 * excludes this constructor call from it.
		 * Result: Your logs show where the error was THROWN, not where
		 * the AppError class was CREATED.
		 */
		Error.captureStackTrace(this, this.constructor);

		/**
		 * 3. Object.setPrototypeOf
		 * CRITICAL FOR TYPESCRIPT: When extending built-in classes like Error,
		 * the prototype chain can get broken during transpilation.
		 * This line ensures that 'instanceof AppError' correctly returns true
		 * throughout your application.
		 */
		Object.setPrototypeOf(this, AppError.prototype);
	}
}

// Validation error (400)
export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, 400);
		Object.setPrototypeOf(this, ValidationError.prototype);
	}
}

// Not found error (404)
export class NotFoundError extends AppError {
	constructor(resource: string) {
		super(`${resource} not found`, 404);
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string = "Unauthorized") {
		super(message, 401);
		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}
}

// ===============
// Example usage
// ===============

// Validation Error
function validateEmail(email: string): void {
	if (!email.includes("@")) {
		throw new ValidationError("Invalid email format");
	}
}

try {
	validateEmail("invalid-email");
} catch (error) {
	if (error instanceof ValidationError) {
		console.error("validation error: ", error.message);
		console.error("status code: ", error.statusCode);
	}
}

// Not Found Error
export interface User {
	id: number;
	name: string;
}

function findUser(id: number): User {
	const users = [
		{ id: 1, name: "Bob" },
		{ id: 2, name: "Jacob" },
	];

	const user = users.find((u) => u.id === id);
	if (!user) {
		throw new NotFoundError("User");
	}

	return user;
}

try {
	findUser(4);
} catch (error) {
	if (error instanceof NotFoundError) {
		console.error("Not Found Error: ", error.message);
		console.error("status code: ", error.statusCode);
	}
}

try {
	const user = findUser(1);
	console.log("Found user: ", user);
} catch (error) {
	console.error("Error: ", error);
}

// Unauthorized Error
