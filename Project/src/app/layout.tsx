import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/components/providers/CartProvider";
import { AuthProvider } from "@/context/AuthContext";
import ClientLayout from "@/components/layout/ClientLayout";
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata: Metadata = {
  title: "Steplo",
  description: "Steplo E-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <WishlistProvider>
            <ClientLayout>
              <CartProvider>
                <Header />
                <main>{children}</main>
                <Toaster />
                <Footer />
              </CartProvider>
            </ClientLayout>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
