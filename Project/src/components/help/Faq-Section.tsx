"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export default function FAQSection() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isLargeScreen) {
    return (
      <div className="space-y-6 mt-8">
        <h2 className="text-lg font-semibold">FAQs</h2>

        <div className="space-y-12">
          {/* First FAQ Item */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Does my card need international purchases enabled?
            </h3>
            <div className="space-y-4">
              <p>
                Yes, we recommend asking your bank to enable international
                purchases on your card. You will be notified at checkout if
                international purchases need to be enabled.
              </p>
              <p className="text-sm">
                Please note, some banks may charge a small transaction fee for
                international orders.
              </p>
            </div>
          </div>

          {/* Second FAQ Item */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Can I pay for my order with multiple methods?
            </h3>
            <p>
              No, payment for Steplo orders can&apos;t be split between multiple
              payment methods.
            </p>
          </div>

          {/* Third FAQ Item */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              What payment method is accepted for SNKRS orders?
            </h3>
            <p>
              You can use any accepted credit card to pay for your SNKRS order.
            </p>
          </div>

          {/* Fourth FAQ Item */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Why don&apos;t I see Apple Pay as an option?
            </h3>
            <p>
              To see Apple Pay as an option in the Steplo App or on Steplo.com,
              you&apos;ll need to use a compatible Apple device running the
              latest OS, be signed in to your iCloud account and have a
              supported card in your Wallet. Additionally, you&apos;ll need to
              use Safari to use Apple Pay on Steplo.com.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mobile and Tablet View
  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-lg font-semibold">FAQs</h2>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            Does my card need international purchases enabled?
          </AccordionTrigger>
          <AccordionContent>
            Yes, we recommend asking your bank to enable international purchases
            on your card. You will be notified at checkout if international
            purchases need to be enabled.
            <p className="mt-4 text-sm">
              Please note, some banks may charge a small transaction fee for
              international orders.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">
            Can I pay for my order with multiple methods?
          </AccordionTrigger>
          <AccordionContent>
            No, payment for Steplo orders can&apos;t be split between multiple
            payment methods.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            What payment method is accepted for SNKRS orders?
          </AccordionTrigger>
          <AccordionContent>
            You can use any accepted credit card to pay for your SNKRS order.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left">
            Why don&apos;t I see Apple Pay as an option?
          </AccordionTrigger>
          <AccordionContent>
            To see Apple Pay as an option in the Steplo App or on Steplo.com,
            you&apos;ll need to use a compatible Apple device running the latest
            OS, be signed in to your iCloud account and have a supported card in
            your Wallet. Additionally, you&apos;ll need to use Safari to use
            Apple Pay on Steplo.com.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
