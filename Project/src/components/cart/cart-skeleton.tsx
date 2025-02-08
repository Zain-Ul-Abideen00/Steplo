export function CartSkeleton() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex gap-4 py-6 border-b last:border-0"
                  >
                    <div className="h-24 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Skeleton */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
