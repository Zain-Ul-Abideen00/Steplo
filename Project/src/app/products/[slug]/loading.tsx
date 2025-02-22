import { Loading } from "@/components/ui/loading";

export default function ProductDetailsLoading() {
  return (
    <div className="container max-w-6xl mx-auto px-5 sm:px-10 py-8">
      <Loading variant="productDetailsSkeleton" />
    </div>
  );
}
