"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ArrowLeft,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Box,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatOrderId } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { OrderTrackingInfo } from "@/components/order/OrderTrackingInfo";
import { Loading } from "@/components/ui/loading";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image_url: string;
}

interface OrderDetailsProps {
  order: {
    id: string;
    created_at: string;
    status: string;
    total: number;
    payment_status: string;
    shipping_address: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address1: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    items: OrderItem[];
    shipping_details?: {
      provider: string;
      service: string;
      estimated_days: number;
      price: number
    };
    carrier?: string;
    tracking_number?: string;
    shipping_label_url?: string;
    shipping_rate_id?: string;
    tracking_url?: string;
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const progressBarVariant = {
  initial: { width: 0 },
  animate: {
    width: "100%",
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

export function OrderDetails({ order }: OrderDetailsProps) {
  useEffect(() => {
    if (order.status === "processing") {
      toast.info("Your order is being processed", {
        description: "We'll notify you when it ships!",
      });
    }
  }, [order.status]);

  if (!order) {
    return <Loading variant="spinner" size="lg" />;
  }

  const getStatusStep = () => {
    switch (order.status) {
      case "delivered":
        return 4;
      case "shipped":
        return 3;
      case "processing":
        return 2;
      default:
        return 1;
    }
  };

  const statusStep = getStatusStep();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="container max-w-[1200px] mx-auto px-4 py-8"
        data-status-step={statusStep}
      >
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="space-y-6 mb-8"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/member/orders"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold">
                Order #{formatOrderId(order.id)}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formatDistance(new Date(order.created_at), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Box className="h-4 w-4" />
                  <span>
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    {order.items.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    ) === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>
              </div>
            </div>
            <Badge
              variant={
                order.status === "delivered"
                  ? "success"
                  : order.status === "processing"
                    ? "default"
                    : "secondary"
              }
              className="text-sm px-3 py-1.5"
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </motion.div>
        </motion.div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Order Progress */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.7 }}>
              <Card className="p-6 overflow-hidden">
                <h2 className="font-semibold text-lg mb-6">Order Progress</h2>
                <div className="relative">
                  <motion.div className="absolute left-0 top-[22px] w-full h-[2px] bg-gray-200">
                    <motion.div
                      variants={progressBarVariant}
                      className="h-full bg-primary"
                      style={{
                        width: `${((getStatusStep() - 1) / 3) * 100}%`,
                      }}
                    />
                  </motion.div>

                  <div className="relative flex justify-between">
                    {/* Status Steps */}
                    {["Confirmed", "Processing", "Shipped", "Delivered"].map(
                      (step, index) => (
                        <motion.div
                          key={step}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.5 + index * 0.2,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 100,
                          }}
                          className="text-center"
                        >
                          <div
                            className={`w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                              getStatusStep() >= index + 1
                                ? "border-primary bg-primary text-white"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            {index === 0 && <Package className="h-6 w-6" />}
                            {index === 1 && <Package className="h-6 w-6" />}
                            {index === 2 && <Truck className="h-6 w-6" />}
                            {index === 3 && <CheckCircle className="h-6 w-6" />}
                          </div>
                          <p className="mt-2 text-sm font-medium">{step}</p>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Order Items */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
              <Card className="p-6">
                <h2 className="font-semibold text-lg mb-6">Order Items</h2>
                <motion.div variants={staggerContainer} className="space-y-6">
                  {order.items.map((item, index) => (
                    <motion.div
                      key={`${order.id}-${item.id}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.8 + index * 0.2,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="flex gap-6"
                    >
                      <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-50 border">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-10 w-10 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-lg">{item.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-lg">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <Separator className="my-6" />
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      {formatPrice(
                          order.items.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                        )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <div className="text-right">
                        {order.shipping_details ? (
                          <>
                            <p>{formatPrice(order.shipping_details.price)}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.shipping_details.provider} - {order.shipping_details.service}
                              {order.shipping_details.estimated_days && (
                                <span> ({order.shipping_details.estimated_days} business days)</span>
                              )}
                            </p>
                          </>
                        ) : (
                          <span>Calculated at checkout</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>
                        {formatPrice(
                          order.items.reduce(
                            (total, item) =>
                              total + Math.round(item.price * item.quantity * 0.05),
                            0
                          )
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span>-</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <div className="text-right">
                        <span className="text-lg font-semibold">{formatPrice(order.total)}</span>
                        <p className="text-sm text-muted-foreground">Including taxes</p>
                      </div>
                    </div>
                    {order.payment_status && (
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Payment Status</span>
                        <Badge variant={order.payment_status === "paid" ? "success" : "default"}>
                          {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                        </Badge>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.9 }}
            className="space-y-8"
          >
            {/* Shipping Information */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Card className="p-6">
                <h2 className="font-semibold text-lg mb-6">
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {order.shipping_address.firstName}{" "}
                        {order.shipping_address.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.shipping_address.address1}
                        <br />
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.state}{" "}
                        {order.shipping_address.postalCode}
                        <br />
                        {order.shipping_address.country}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">{order.shipping_address.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">{order.shipping_address.email}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Need Help */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Card className="p-6 bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-primary/10">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      If you have any questions about your order, please contact
                      our support team.
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Add Tracking Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg border shadow-sm mt-8"
        >
          <div className="p-6">
            <OrderTrackingInfo
              trackingNumber={order.tracking_number}
              carrier={order.carrier}
              labelUrl={order.shipping_label_url}
              trackingUrl={order.tracking_url}
              shippingDetails={order.shipping_details}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
