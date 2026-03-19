"use client";

import { useState, useCallback } from "react";

export function useErrorHandler() {
	const [error, setError] = useState<Error | null>(null);

	const handleError = useCallback((err: Error) => {
		setError(err);
		console.error("Error: ", err);
	}, []);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	const executeWithErrorHandling = useCallback(
		async <T>(fn: () => Promise<T>): Promise<T | null> => {
			try {
				clearError();
				return await fn();
			} catch (err) {
				handleError(err instanceof Error ? err : new Error("unknown error"));
				return null;
			}
		},
		[handleError, clearError],
	);

	return {
		error,
		handleError,
		clearError,
		executeWithErrorHandling,
	};
}
