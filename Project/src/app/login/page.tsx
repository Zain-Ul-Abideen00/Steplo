import { LoginHeader } from "@/components/login/LoginHeader";
import LoginForm from "@/components/login/LoginForm";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function LoginPage() {
  return (
    <main className="min-h-[95vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white p-5 space-y-8">
        <Suspense fallback={<LoadingSpinner />}>
          <LoginHeader />
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
