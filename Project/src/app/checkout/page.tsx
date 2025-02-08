import { Metadata } from "next";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import StripeProvider from "@/components/providers/StripeProvider";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Checkout - Steplo",
  description: "Complete your purchase",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isGuestMode = (await searchParams)?.mode === "guest";

  if (!user && !isGuestMode) {
    redirect("/checkout/tunnel");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <StripeProvider>
        <CheckoutForm isGuestMode={isGuestMode} user={user} />
      </StripeProvider>
    </div>
  );
}
