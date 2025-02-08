"use client";

import LoginForm from "@/components/login/LoginForm";
import { Button } from "@/components/ui/Button";
import { FiCheck } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CheckoutTunnel() {
  const router = useRouter();

  const handleGuestCheckout = () => {
    router.push("/checkout?mode=guest");
  };

  return (
    <div className="container max-w-[1200px] py-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Member Login */}
          <div className="space-y-6 p-6 border rounded-lg">
            <div>
              <h2 className="text-2xl font-bold mb-2">RETURNING MEMBER</h2>
              <p className="text-muted-foreground">
                Sign in to speed up the checkout process
              </p>
            </div>
            <LoginForm redirectPath="/checkout" />
          </div>

          {/* Right Column - Guest Checkout */}
          <div className="space-y-6 p-6 border rounded-lg">
            <div>
              <h2 className="text-2xl font-bold mb-2">NEW TO STEPLO?</h2>
              <p className="text-muted-foreground">
                You can create an account after checkout
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleGuestCheckout}
            >
              Continue as Guest
            </Button>

            <div className="space-y-4">
              <h3 className="font-semibold">
                Benefits of Creating an Account:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <FiCheck className="h-4 w-4" />
                  Faster checkout
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="h-4 w-4" />
                  Easy order tracking
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="h-4 w-4" />
                  Exclusive offers and updates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
