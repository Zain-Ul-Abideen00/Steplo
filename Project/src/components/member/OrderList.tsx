"use client";

import { motion } from "framer-motion";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Package, ChevronRight, Clock, Box } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatOrderId } from "@/lib/utils";
import { Button } from "../ui/Button";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image_url: string;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: OrderItem[];
}

interface OrderListProps {
  orders: Order[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function OrderList({ orders }: OrderListProps) {
  if (!orders.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto"
      >
        <Card className="p-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.4,
              }}
              className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto"
            >
              <Package className="h-8 w-8 text-gray-400" />
            </motion.div>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl font-semibold"
            >
              No orders yet
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground max-w-sm mx-auto"
            >
              When you place an order, it will appear here. Start shopping to
              fill your order history.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button asChild className="mt-4">
                <Link href="/products">Start Shopping</Link>
              </Button>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6 w-full"
    >
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          variants={fadeInUp}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            type: "spring",
            damping: 20,
          }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 w-full transform hover:-translate-y-1">
            {/* Order Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-4 sm:p-6 bg-gray-50 border-b"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      #{formatOrderId(order.id)}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {formatDistance(
                          new Date(order.created_at),
                          new Date(),
                          {
                            addSuffix: true,
                          }
                        )}
                      </span>
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
                    className="capitalize ml-2"
                  >
                    {order.status}
                  </Badge>
                </div>
                <Link
                  href={`/member/orders/${order.id}`}
                  className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-4 sm:p-6"
            >
              <div className="space-y-4">
                {order.items.map((item, itemIndex) => (
                  <motion.div
                    key={`${order.id}-item-${itemIndex}-${item.id || item.name}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4 + itemIndex * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="flex items-center gap-4"
                  >
                    <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-gray-50 border">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 64px, 96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-base truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-primary mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Order Footer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="px-4 sm:px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Box className="h-4 w-4" />
                <span>
                  {order.items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  {order.items.reduce((acc, item) => acc + item.quantity, 0) ===
                  1
                    ? " item"
                    : " items"}
                </span>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-lg font-semibold text-primary">
                  {formatPrice(order.total)}
                </p>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
