"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useCartStore } from "@/store/cartStore";
import { AddressForm } from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { cn, formatPrice, calculateOrderTotal } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { calculateTotal } from "@/lib/cart";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { ShippingFormValues } from "@/lib/validations/checkout";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/icons";
import { ShippingOptions } from "./ShippingOptions";
import { PaymentIntent } from "@stripe/stripe-js";
import OrderSummaryContent from "./OrderSummaryContent";

interface CheckoutFormProps {
  isGuestMode: boolean;
  user: User | null;
}

interface Rate {
  id: string;
  provider: string;
  service: string;
  price: number;
  currency: string;
  estimated_days: number;
}

type CheckoutStep = "shipping" | "payment" | "review";

export default function CheckoutForm({
  isGuestMode,
  user: initialUser,
}: CheckoutFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const cart = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const stripe = useStripe();
  const elements = useElements();

  // State declarations
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(initialUser);
  const [shippingAddress, setShippingAddress] = useState<ShippingFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "IN",
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState<{
    id: string;
    provider: string;
    service: string;
    price: number;
    currency: string;
    estimated_days: number;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  // Auth state effect
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Cart check effect
  useEffect(() => {
    if (!isPaymentComplete && (!cart || cart.length === 0)) {
      router.push("/cart");
    }
  }, [cart, router, isPaymentComplete]);

  const createPaymentIntent = async () => {
    if (paymentIntentId) return;

    try {
      const subtotal = calculateTotal(cart);
      const shippingCost = selectedRate?.price || 0;
      const total = subtotal + shippingCost;
      const amount = Math.round(total * 100);
      const simplifiedItems = cart.map((item) => ({
        id: item.productId,
        name: item.name,
        qty: item.quantity,
        price: item.price,
        size: item.size,
        image_url: item.image,
      }));

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          items: simplifiedItems,
          userId: user?.id,
          shippingRateId: selectedRate?.id,
          email: shippingAddress?.email,
          metadata: {
            items: JSON.stringify(simplifiedItems),
            shipping_address: JSON.stringify({
              name: `${shippingAddress?.firstName} ${shippingAddress?.lastName}`,
              address1: shippingAddress?.address1,
              city: shippingAddress?.city,
              state: shippingAddress?.state,
              postal_code: shippingAddress?.postalCode,
              country: shippingAddress?.country,
            }),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment intent");
      }

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      }
    } catch (error: Error | unknown) {
      console.error("Payment intent error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to initialize payment"
      );
    }
  };

  const handleShippingSubmit = async (data: ShippingFormValues) => {
    try {
      setIsCalculating(true);
      const response = await fetch("/api/shipping/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: {
            name: `${data.firstName} ${data.lastName}`,
            street1: data.address1,
            city: data.city,
            state: data.state,
            zip: data.postalCode,
            country: data.country,
            email: data.email,
            phone: data.phone,
          },
          items: cart,
        }),
      });

      if (!response.ok) throw new Error("Failed to calculate shipping");

      const ratesData = await response.json();
      setShippingRates(ratesData.rates);
      setShippingAddress(data);

      // Don't automatically select and proceed
      if (ratesData.rates.length > 0) {
        setCurrentStep("shipping"); // Stay on shipping step to let user select rate
      }
    } catch (err) {
      toast.error("Failed to calculate shipping rates");
      console.error("Shipping rate calculation error:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  // Separate the rate selection from progression
  const handleRateSelection = (rate: Rate) => {
    setSelectedRate(rate);
    // Remove the automatic setCurrentStep("review") from here
  };

  // Add a separate handler for continuing to review
  const handleContinueToReview = () => {
    if (selectedRate) {
      setCurrentStep("review");
    }
  };

  const handleReviewBack = () => {
    setCurrentStep("shipping");
  };

  const handleReviewContinue = async () => {
    await createPaymentIntent();
    setCurrentStep("payment");
  };

  const handlePaymentBack = () => {
    setCurrentStep("review");
  };

  const handlePaymentSuccess = async (paymentIntent: PaymentIntent) => {
    try {
      setIsProcessing(true);
      setIsPaymentComplete(true); // Set flag before clearing cart

      // Create shipping label first
      const selectedRateId = selectedRate?.id;
      let shippingTransaction = null;

      if (selectedRateId) {
        try {
          const response = await fetch("/api/shipping/label", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rateId: selectedRateId }),
          });

          if (!response.ok) {
            throw new Error("Failed to create shipping label");
          }

          shippingTransaction = await response.json();
        } catch (error) {
          console.error("Shipping label creation error:", error);
        }
      }

      const orderTotal = calculateOrderTotal(cart, selectedRate);

      // Create order with shipping details
      const { data: order, error: orderError } = await supabase

        .from("orders")
        .insert({
          user_id: user?.id || null,
          payment_intent_id: paymentIntent.id,
          total: orderTotal,
          status: "processing",
          payment_status: "paid",
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image_url: item.image,
            productId: item.productId,
            size: item.size,
          })),
          shipping_address: shippingAddress,
          shipping_details: {
            rate_id: selectedRate?.id,
            provider: selectedRate?.provider,
            service: selectedRate?.service,
            price: selectedRate?.price,
            estimated_days: selectedRate?.estimated_days,
          },
          shipping_rate_id: selectedRate?.id,
          carrier: selectedRate?.provider,
          tracking_number: shippingTransaction?.trackingNumber || null,
          shipping_label_url: shippingTransaction?.labelUrl || null,
          email: user?.email || shippingAddress.email,
          guest_mode: isGuestMode,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create shipment record with tracking details
      const { error: shipmentError } = await supabase.from("shipments").insert({
        order_id: order.id,
        carrier: selectedRate?.provider || "",
        tracking_number: shippingTransaction?.trackingNumber || "PENDING",
        rate_id: selectedRate?.id || "",
        status: shippingTransaction ? "pre_transit" : "pending",
        label_url: shippingTransaction?.labelUrl || null,
        estimated_delivery: selectedRate?.estimated_days || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (shipmentError) {
        console.error("Shipment creation error:", shipmentError);
        throw shipmentError;
      }

      // Create tracking record if we have tracking details
      if (shippingTransaction?.trackingNumber) {
        await supabase.from("shipment_tracking").insert({
          tracking_number: shippingTransaction.trackingNumber,
          carrier: selectedRate?.provider,
          status: "pre_transit",
          status_details: "Label created, waiting for pickup",
          location: shippingAddress.city,
        });
      }

      // Redirect and clear cart
      await router.push(`/checkout/success?orderId=${order.id}`);

      setTimeout(async () => {
        try {
          if (user?.id) {
            await supabase.from("cart_items").delete().eq("user_id", user.id);
          }
          clearCart();
          toast.success("Order placed successfully!");
        } catch (error) {
          console.error("Failed to clear cart:", error);
        }
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Order creation error:", error);
        toast.error("Payment successful but order creation failed");
      }
      setIsProcessing(false);
      setIsPaymentComplete(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      toast.error("Payment system not ready");
      return;
    }

    setIsLoading(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (error) throw error;

      if (paymentIntent && paymentIntent.status === "succeeded") {
        await handlePaymentSuccess(paymentIntent);
      } else {
        throw new Error("Payment status unknown. Please contact support.");
      }
    } catch (error: unknown) {
      console.error("Payment error:", error);
      toast.error(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Main render
  if (!cart || cart.length === 0) {
    return null;
  }

  return (
    <div className="container max-w-[1200px] py-8 mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                currentStep === "shipping"
                  ? "bg-black text-white"
                  : "bg-gray-100"
              )}
            >
              1
            </div>
            <span className="hidden sm:inline">Shipping</span>
          </div>
          <div className="h-px bg-gray-200 flex-1 mx-4" />
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                currentStep === "review" ? "bg-black text-white" : "bg-gray-100"
              )}
            >
              2
            </div>
            <span className="hidden sm:inline">Review</span>
          </div>
          <div className="h-px bg-gray-200 flex-1 mx-4" />
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                currentStep === "payment"
                  ? "bg-black text-white"
                  : "bg-gray-100"
              )}
            >
              3
            </div>
            <span className="hidden sm:inline">Payment</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        {/* Left Column - Forms */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg border">
            {currentStep === "shipping" && (
              <>
                <AddressForm
                  initialData={shippingAddress}
                  onSubmit={handleShippingSubmit}
                  isGuestMode={isGuestMode}
                />
                {isCalculating ? (
                  <div className="flex items-center justify-center p-4">
                    <Icons.spinner className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  shippingRates.length > 0 && (
                    <>
                      <h3 className="font-semibold mb-4">
                        Select Shipping Method
                      </h3>
                      <ShippingOptions
                        rates={shippingRates}
                        selectedRate={selectedRate}
                        onSelect={handleRateSelection}
                      />
                      <Button
                        onClick={handleContinueToReview}
                        disabled={!selectedRate}
                        className="w-full"
                      >
                        Continue to Review
                      </Button>
                    </>
                  )
                )}
              </>
            )}

            {currentStep === "review" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Review Your Order</h2>

                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-2">Shipping Address</h3>
                    <div className="text-sm text-gray-600">
                      {shippingAddress.firstName} {shippingAddress.lastName}
                      <br />
                      {shippingAddress.address1}
                      <br />
                      {shippingAddress.city}, {shippingAddress.state}{" "}
                      {shippingAddress.postalCode}
                      <br />
                      {shippingAddress.country}
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-2">Order Summary</h3>
                    <OrderSummaryContent
                      cart={cart}
                      selectedRate={selectedRate}
                      variant="review"
                      className="space-y-2" // Add any specific styling classes needed for the review section
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReviewBack}
                  >
                    Back to Shipping
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReviewContinue}
                    className="flex-1"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "payment" && !clientSecret ? (
              <div className="flex items-center justify-center p-6">
                <Icons.spinner className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              currentStep === "payment" && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePaymentBack}
                  >
                    Back to Review
                  </Button>
                  <PaymentElement
                    options={{
                      layout: "accordion",
                      defaultValues: {
                        billingDetails: {
                          email: user?.email || undefined,
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={!stripe || !elements || isLoading || isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <Icons.spinner className="h-4 w-4 animate-spin" />
                    ) : (
                      `Pay ${formatPrice(calculateOrderTotal(cart, selectedRate))}`
                    )}
                  </Button>
                </form>
              )
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <OrderSummary cart={cart} selectedRate={selectedRate} />
          </div>
        </div>
      </div>
    </div>
  );
}
