"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { PaymentMethod, StripeError } from "@stripe/stripe-js";
import { formatPrice } from "@/lib/utils";
const billingSchema = z.object({
  sameAsShipping: z.boolean(),
  firstName: z.string().min(2, "First name is required").optional(),
  lastName: z.string().min(2, "Last name is required").optional(),
  address1: z.string().min(5, "Address is required").optional(),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required").optional(),
  state: z.string().min(2, "State is required").optional(),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, "Invalid postal code")
    .optional(),
  country: z.string().min(2, "Country is required").optional(),
});

type BillingFormValues = z.infer<typeof billingSchema>;

export interface BillingAddress {
  sameAsShipping: boolean;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface PaymentFormProps {
  billingAddress: BillingAddress;
  setBillingAddress: (address: BillingAddress) => void;
  onSubmit: (paymentMethod: PaymentMethod) => Promise<void>;
  isLoading: boolean;
  amount: number;
}

export default function PaymentForm({
  billingAddress,
  onSubmit,
  isLoading,
  amount,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: billingAddress,
  });

  const showBillingAddress = !form.watch("sameAsShipping");

  const handlePaymentError = async (error: StripeError) => {
    console.error("Payment error:", error);

    if (error.type === "card_error") {
      setError(`Payment failed: ${error.message}`);
      toast.error("Payment failed", {
        description: error.message,
      });
    } else if (error.type === "validation_error") {
      setError("Please check your payment details");
      toast.error("Invalid payment details");
    } else {
      setError("An unexpected error occurred");
      toast.error("Payment processing error", {
        description: "Please try again or use a different payment method",
      });
    }

    setRetryCount((prev) => prev + 1);
  };

  const handleSubmit = async (data: BillingFormValues) => {
    if (!stripe || !elements) {
      setError("Payment system is not ready. Please try again.");
      return;
    }

    // Reset error state
    setError(null);

    try {
      // Validate the payment element
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      // Create payment method
      const { paymentMethod, error: createError } =
        await stripe.createPaymentMethod({
          elements,
          params: {
            billing_details: showBillingAddress
              ? {
                  name: `${data.firstName} ${data.lastName}`,
                  address: {
                    line1: data.address1,
                    line2: data.address2 ?? undefined,
                    city: data.city,
                    state: data.state,
                    postal_code: data.postalCode,
                    country: data.country,
                  },
                }
              : undefined,
          },
        });

      if (createError) {
        throw createError;
      }

      if (paymentMethod) {
        await onSubmit(paymentMethod);
      }
    } catch (err) {
      await handlePaymentError(err as StripeError);
    }
  };

  // Show alternative payment methods after multiple retries
  const showAlternativeMethods = retryCount >= 2;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Payment Information</h2>

          {/* Stripe Payment Element */}
          <div className="space-y-4">
            <PaymentElement />
          </div>

          {/* Show alternative payment methods */}
          {showAlternativeMethods && (
            <div className="p-4 bg-orange-50 rounded-lg text-sm text-orange-800">
              <p>Having trouble? You can also:</p>
              <ul className="list-disc ml-4 mt-2">
                <li>Try a different card</li>
                <li>Use UPI payment</li>
                <li>Contact support for assistance</li>
              </ul>
            </div>
          )}

          {/* Billing Address Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="sameAsShipping"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Same as shipping address</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {showBillingAddress && (
              <div className="space-y-4">
                <h3 className="font-semibold">Billing Address</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Apt 4B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="US" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 rounded-lg text-sm text-red-800">
            <p className="font-medium">Payment Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Amount to be paid:</span>
            <span className="font-semibold">{formatPrice(amount / 100)}</span>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg"
            disabled={isLoading}
          >
            {isLoading && <FiLoader className="mr-2 h-5 w-5 animate-spin" />}
            Pay {formatPrice(amount / 100)}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Your payment is secured by Stripe. We never store your card details.
        </p>
      </form>
    </Form>
  );
}
