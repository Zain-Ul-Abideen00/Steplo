import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function HelpSearchBar() {
  return (
    <div className="relative max-w-[500px] mx-auto">
      <Input 
        placeholder="What can we help you with?"
        className="pl-3 h-14 rounded-lg border-gray-400"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  )
}
