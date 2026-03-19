"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Error caught by boundary: ", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="p-6 bg-red-50 border border-red-200 rounded">
						<h2 className="text-xl font-bold text-red-900">
							Something went wrong
						</h2>
						<p className="text-red-800 mt-2">
							{this.state.error?.message || "An unexpected error occurred"}
						</p>
					</div>
				)
			);
		}

		return this.props.children;
	}
}
