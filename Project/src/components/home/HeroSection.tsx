"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const HeroSection = () => {
  const router = useRouter();

  const handleShopAirMax = () => {
    router.push("/products?category=air-max");
  };

  const handleNotifyMe = () => {
    toast.info("Coming Soon!", {
      description: "Notification feature will be available soon. Stay tuned!",
      duration: 3000,
    });
  };

  return (
    <section className="w-full">
      {/* Steplo App Banner */}
      <div className="w-full h-auto min-h-[58px] bg-[#F5F5F5] py-3">
        <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="text-sm text-[#111]">Hello Steplo App</h3>
            <p className="text-xs sm:text-sm text-[#111] mt-1 sm:mt-2 px-4">
              Download the app to access everything Steplo. Get Your Great
            </p>
          </div>
        </div>
      </div>

      {/* Hero Image and Content */}
      <div className="mx-auto px-5 sm:px-10 py-6 sm:py-[58px]">
        <div className="relative">
          <div className="w-full rounded-lg h-[300px] sm:h-[500px] lg:h-[700px] relative overflow-hidden group">
            <Image
              src="/hero2 (2).jpeg"
              alt="Steplo Air Max Pulse"
              fill
              sizes="100vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-12 text-center px-4">
            <span className="text-sm sm:text-base inline-block hover:text-gray-600 cursor-pointer transition-colors">
              First Look
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[60px] mt-4 sm:mt-7">
              Steplo Air Max Pulse
            </h1>
            <p className="max-w-[511px] mx-auto mt-4 sm:mt-7 text-sm sm:text-base px-4">
              Extreme comfort. Hyper durable. Max volume. Introducing the Air
              Max Pulse —designed to push you past your limits and help you go
              to the max.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-1.5 mt-6 sm:mt-8 lg:mt-12">
              <Button
                onClick={handleNotifyMe}
                className="hover:scale-105 transition-transform"
              >
                Notify Me
              </Button>
              <Button
                onClick={handleShopAirMax}
                className="hover:scale-105 transition-transform"
              >
                Shop Air Max
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
