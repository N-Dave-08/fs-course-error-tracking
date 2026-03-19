"use client";

interface ErrorDisplayProps {
	error: Error | null;
	onRetry?: () => void;
	message?: string;
}

export default function ErroDisplay({
	error,
	onRetry,
	message = "Something went wrong. Please try again.",
}: ErrorDisplayProps) {
	if (!error) return null;

	return (
		<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
			<h3 className="text-lg font-semibold text-red-900">Error</h3>
			<p className="text-red-800 mt-2">{message}</p>
			{onRetry && (
				<button
					type="button"
					onClick={onRetry}
					className="mt-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
				>
					Retry
				</button>
			)}
		</div>
	);
}
