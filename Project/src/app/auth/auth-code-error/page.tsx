import Link from "next/link";

export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="text-gray-600">
          There was an error with the authentication code.
        </p>
        <p className="text-gray-600">Please try signing in again.</p>
        <Link
          href="/login"
          className="inline-block px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
