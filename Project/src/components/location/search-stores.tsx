import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/Button"
import { Search } from "lucide-react"

export function SearchStores() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Input 
          placeholder="Search Location" 
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Use my location</Button>
        <Button variant="outline" size="sm">Filter</Button>
      </div>
    </div>
  )
} 