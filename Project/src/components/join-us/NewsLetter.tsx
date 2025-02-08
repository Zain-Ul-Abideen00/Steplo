"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function NewsletterCheckbox() {
  return (
    <div className="flex items-start space-x-3">
      <Checkbox id="newsletter" />
      <label
        htmlFor="newsletter"
        className="text-sm text-gray-500 leading-tight"
      >
        Sign up for emails to get updates from Steplo on products, offers and your
        Member benefits
      </label>
    </div>
  );
}
