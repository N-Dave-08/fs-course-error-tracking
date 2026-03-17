import { NotFoundError, type User, ValidationError } from "./exercise-02";

// simulate async operation that might fail
async function fetchUserData(id: number): Promise<User> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (id < 1) {
				reject(new ValidationError("Invalid User ID"));
				return;
			}

			if (id > 10) {
				reject(new NotFoundError("User"));
				return;
			}

			resolve({ id, name: `User ${id}` });
		}, 100);
	});
}

// handle errors in promise chain
function fetchUserWithPromice(id: number): void {
	fetchUserData(id)
		.then((user) => {
			console.log("user found: ", user);
		})
		.catch((error) => {
			if (error instanceof ValidationError) {
				console.error("validation error: ", error.message);
			} else if (error instanceof NotFoundError) {
				console.error("not found: ", error.message);
			} else {
				console.error("unknown error: ", error);
			}
		});
}

// handle errors with async/await
async function fetchUserWithAsync(id: number): Promise<void> {
	try {
		const user = await fetchUserData(id);
		console.log("User found: ", user);
	} catch (error) {
		if (error instanceof ValidationError) {
			console.error("validation error: ", error.message);
		} else if (error instanceof NotFoundError) {
			console.error("Not Found: ", error.message);
		} else {
			console.error("Unknown error: ", error);
		}
	}
}

// Propagate errors to caller
async function processUser(id: number): Promise<User> {
	try {
		const user = await fetchUserData(id);
		return user;
	} catch (error) {
		console.error("Error processing user: ", error);
		throw error;
	}
}

// test async error handling
console.log("\n=== Exercise 3: Async Error Handling === ");

// Promise Chain
console.log("\n2. Async/await");
(async () => {
	// success
	await fetchUserWithAsync(3);
	// validation error
	await fetchUserWithAsync(-1);
	// not found error
	await fetchUserWithAsync(999);
})();

// Error Propagation
console.log("\n3. Error Propagation");
processUser(5)
	.then((user) => console.log("Processed: ", user))
	.catch((error) => console.error("failed to process: ", error.message));
