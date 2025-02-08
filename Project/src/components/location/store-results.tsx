import { ScrollArea } from "@/components/ui/scroll-area"
import { StoreCard } from "@/components/location/store-card"

export function StoreResults() {
  return (
    <ScrollArea className="h-[calc(100vh-15rem)]">
      <div className="space-y-4 pr-4">
        <StoreCard />
        <StoreCard />
        <StoreCard />
        {/* Add more StoreCard components as needed */}
      </div>
    </ScrollArea>
  )
} 