export function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Category */}
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />

          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Price */}
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4 pt-6">
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Description */}
          <div className="space-y-2 pt-6">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
