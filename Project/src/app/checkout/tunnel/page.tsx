import { Metadata } from "next";
import { redirect } from "next/navigation";
import CheckoutTunnel from "@/components/checkout/CheckoutTunnel";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Checkout - Steplo",
  description: "Checkout your items",
};

export default async function CheckoutTunnelPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is already logged in, redirect to checkout
  if (session?.user) {
    redirect("/checkout");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center px-4 py-8">
      <CheckoutTunnel />
    </div>
  );


}
