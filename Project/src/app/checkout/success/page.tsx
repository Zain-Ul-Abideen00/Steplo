import { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Confirmed - Steplo",
  description: "Your order has been confirmed",
};

interface PageProps {
  searchParams: Promise<{ orderId?: string }>;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image_url: string;
  size: string;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const supabase = await createClient();

  // Await searchParams before accessing orderId
  const { orderId } = await searchParams;

  if (!orderId) redirect("/");

  // Fetch order with all necessary details
  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      items,
      shipping_address,
      shipping_details,
      shipments (
        tracking_number,
        carrier,
        label_url,
        status
      )
    `
    )
    .eq("id", orderId)
    .single();

  if (error || !order) {
    console.error("Order fetch error:", error);
    redirect("/");
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            {/* Order ID and Status */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <Badge>Confirmed</Badge>
            </div>

            {/* Shipping Information */}
            {(order.tracking_number ||
              order.shipments?.[0]?.tracking_number) && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h2 className="font-semibold">Shipping Information</h2>
                <div className="space-y-4">
                  {/* Tracking Info */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tracking Number
                      </p>
                      <p className="font-medium">
                        {order.tracking_number ||
                          order.shipments?.[0]?.tracking_number}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Carrier</p>
                      <p className="font-medium">
                        {order.carrier || order.shipments?.[0]?.carrier}
                      </p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Delivery Address
                    </p>
                    <div className="text-sm">
                      <p className="font-medium">
                        {order.shipping_address.firstName}{" "}
                        {order.shipping_address.lastName}
                      </p>
                      <p>{order.shipping_address.address1}</p>
                      <p>
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.state}{" "}
                        {order.shipping_address.postalCode}
                      </p>
                      <p>{order.shipping_address.country}</p>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  {order.shipping_details?.estimated_days && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estimated Delivery
                      </p>
                      <p className="font-medium">
                        {new Date(
                          Date.now() +
                            order.shipping_details.estimated_days *
                              24 *
                              60 *
                              60 *
                              1000
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}

                  {/* Track Order Button */}
                  <div className="flex gap-2">
                    {order.shipping_label_url && (
                      <Button variant="outline" className="w-full" asChild>
                        <a
                          href={order.shipping_label_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Shipping Label
                        </a>
                      </Button>
                    )}
                    <Button className="w-full" asChild>
                      <Link href={`/member/orders/${order.id}`}>
                        Track Order
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="space-y-4">
              <h2 className="font-semibold">Order Items</h2>
              {order.items.map((item: OrderItem, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} | Size: {item.size}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="font-medium">Total</p>
                <p className="font-medium">{formatPrice(order.total)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Email Confirmation Notice */}
        <div className="text-center text-sm text-muted-foreground">
          <p>A confirmation email will be sent to {order.email} shortly.</p>
          <p className="mt-2">
            <Button variant="link" asChild>
              <Link href="/member/orders">View Order History</Link>


            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
