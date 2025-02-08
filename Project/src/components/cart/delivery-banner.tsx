import { Info } from "lucide-react";

interface DeliveryBannerProps {
  className?: string;
}

const DeliveryBanner = ({ className }: DeliveryBannerProps) => {
  return (
    <div className={`bg-gray-100 p-4 rounded-sm ${className || ""}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="font-semibold">Free Delivery</h2>
          <p className="text-sm text-gray-600">
            Applies to orders of Rs 14 000.00 or more.
            <button className="ml-2 underline">View details</button>
          </p>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <Info className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default DeliveryBanner;
