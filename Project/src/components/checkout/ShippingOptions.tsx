"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ShippingOptionsProps {
  rates: Array<{
    id: string;
    provider: string;
    service: string;
    price: number;
    currency: string;
    estimated_days: number;
  }>;
  selectedRate: {
    id: string;
    provider: string;
    service: string;
    price: number;
    currency: string;
    estimated_days: number;
  } | null;
  onSelect: (rate: {
    id: string;
    provider: string;
    service: string;
    price: number;
    currency: string;
    estimated_days: number;
  }) => void;
}

export function ShippingOptions({
  rates,
  onSelect,
  selectedRate,
}: ShippingOptionsProps) {
  return (
    <RadioGroup
      defaultValue={selectedRate?.id}
      onValueChange={(value) => {
        const rate = rates.find((r) => r.id === value);
        if (rate) onSelect(rate);
      }}
    >
      <div className="space-y-4">
        {rates.map((rate) => (
          <div key={rate.id}>
            <Label className="cursor-pointer">
              <Card
                className={`p-4 ${
                  selectedRate?.id === rate.id ? "border-primary" : ""
                }`}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={rate.id} id={rate.id} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{rate.provider}</p>
                        <p className="text-sm text-muted-foreground">
                          {rate.service}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Estimated delivery: {rate.estimated_days} days
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          Rs{rate.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
