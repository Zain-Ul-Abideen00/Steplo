"use client";

import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function CheckoutErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: Error) => {
      console.error("Checkout error:", error);
      setError(error);
      setHasError(true);
    };

    window.addEventListener("error", (event) => handleError(event.error));
    return () =>
      window.removeEventListener("error", (event) => handleError(event.error));
  }, []);

  if (hasError) {
    return (
      <div className="min-h-[50vh] container max-w-[1200px] py-8 flex items-center justify-center">
        <div className="text-center space-y-4 p-6 bg-gray-50 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h2>
          <p className="text-gray-600">
            {error?.message || "An unexpected error occurred during checkout"}
          </p>
          <div className="space-x-4">
            <Button onClick={() => window.location.reload()}>Try again</Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
