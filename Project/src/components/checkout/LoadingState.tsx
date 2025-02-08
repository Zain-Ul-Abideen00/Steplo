export function CheckoutLoadingState() {
  return (
    <div className="container max-w-[1200px] py-8">
      <div className="grid gap-8 md:grid-cols-[1fr,400px]">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-px w-16 bg-gray-200 mx-4 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Form Skeleton */}
          <div className="space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
