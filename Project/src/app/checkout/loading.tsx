import { Loading } from "@/components/ui/loading";

export default function CheckoutLoading() {
  return (
    <div className="container mx-auto px-5 sm:px-10 py-8">
      <Loading variant="checkoutSkeleton" />
    </div>
  );
}
