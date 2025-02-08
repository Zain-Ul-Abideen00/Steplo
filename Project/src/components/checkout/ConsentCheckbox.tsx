import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function ConsentCheckbox() {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox id="consent" className="mt-1" />
      <Label htmlFor="consent" className="text-sm text-muted-foreground">
        I have read and consent to eShopWorld processing my information in
        accordance with the{" "}
        <a href="#" className="underline">
          Privacy Statement
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Cookie Policy
        </a>
        . eShopWorld is a trusted Steplo partner.
      </Label>
    </div>
  )
} 