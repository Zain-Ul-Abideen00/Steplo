import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { OrderDetails } from "@/components/member/OrderDetails";
import { Suspense } from "react";
import { toast } from "sonner";
import { Loading } from "@/components/ui/loading";

interface PageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Await params before accessing orderId
  const { orderId } = await params;
  return {
    title: `Order #${orderId} - Steplo`,
    description: "View your order details",
  };
}

export default async function OrderDetailsPage({ params }: PageProps) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        created_at,
        status,
        total,
        payment_status,
        shipping_address,
        shipping_details,
        shipping_rate_id,
        carrier,
        tracking_number,
        tracking_url,
        shipping_label_url,
        items
      `
      )
      .eq("id", (await params).orderId)
      .single();

    if (error) {
      throw error;
    }

    if (!order) {
      redirect("/member/orders");
    }

    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Loading variant="bounce" />
          </div>
        }
      >
        <OrderDetails order={order} />
      </Suspense>
    );
  } catch (error) {
    toast.error("Failed to load order details");
    console.error("Error fetching order details:", error);
    redirect("/member/orders");
  }
}
