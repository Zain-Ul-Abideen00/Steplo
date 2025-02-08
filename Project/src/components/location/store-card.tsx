import { Button } from "@/components/ui/Button" 
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function StoreCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="font-bold">Steplo Store - Downtown</h3>
        <p className="text-sm text-muted-foreground">1.2 miles away</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          123 Steplo Street<br />
          City, State 12345<br />
          (555) 123-4567
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Directions</Button>
          <Button variant="outline" size="sm">Store Details</Button>
        </div>
      </CardContent>
    </Card>
  )
} 