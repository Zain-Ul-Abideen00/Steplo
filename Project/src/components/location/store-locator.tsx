import { SearchStores } from "@/components/location/search-stores"
import { StoreResults } from "@/components/location/store-results"
import StoreMap from "./store-map"

export default function StoreLocator() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 space-y-6">
        <h1 className="text-2xl font-bold">Find a Steplo Store</h1>
        <SearchStores />
        <StoreResults />
      </div>
      <div className="lg:col-span-8 h-[calc(100vh-2rem)]">
        <StoreMap />
      </div>
    </div>
  )
} 