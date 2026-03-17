// Risky opration that might thorw
function divide(a: number, b: number): number {
	if (b === 0) {
		throw new Error("Division by zero is not allowed");
	}
	return a / b;
}

// Safe division with error handling
function safeDivide(a: number, b: number): number | null {
	try {
		return divide(a, b);
	} catch (error) {
		console.error("Division error: ", error);
		return null;
	}
}

// Process user input with error handling
function processUserInput(input: string): number {
	try {
		const num = parseFloat(input);

		if (Number.isNaN(num)) {
			throw new Error(`Invalid number : ${input}`);
		}

		return num;
	} catch (error) {
		console.error("Input processing error: ", error);
		throw error;
	}
}

// Test error handling
console.log("=== Exercise 1: Try-Catch ===");

// Test 1: Successful division
try {
	const result1 = divide(10, 2);
	console.log("10 / 2 = ", result1);
} catch (error) {
	console.error("Error: ", error);
}

// Test 2: Divison by zero
try {
	const result2 = divide(10, 0);
	console.log("10 / 0 = ", result2);
} catch (error) {
	console.error("Caught error: ", (error as Error).message);
}

// Test 3: Safe division
const result3 = safeDivide(10, 0);
console.log("Safe divide result: ", result3);

// Test 4: Input processing
try {
	const num = processUserInput("123");
	console.log("Parsed number: ", num);
} catch (error) {
	console.error("Failed to precess input: ", error);
}
