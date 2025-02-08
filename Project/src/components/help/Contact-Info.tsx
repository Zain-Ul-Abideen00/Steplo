import { Smartphone, MessageCircle, MapPin, Mail } from "lucide-react";

export default function ContactInfo() { 
  return (
    <div className="lg:border-l space-y-8 lg:sticky lg:top-8 center">
      <h2 className="text-2xl font-bold text-center mb-8">CONTACT US</h2>

      <div className="space-y-8">
        {/* Phone Support */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Smartphone className="h-12 w-12" />
          </div>
          <h3 className="font-bold">000 800 919 0566</h3>
          <div className="mt-2 text-sm">
            <p>Products & Orders: 24 hours a day,</p>
            <p>7 days a week</p>
            <p>Company Info & Enquiries: 07:30 - 12:30,</p>
            <p>Monday - Friday</p>
          </div>
        </div>

        {/* Chat Support */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <MessageCircle className="h-12 w-12" />
          </div>
          <div className="text-sm">
            <p className="font-bold">24 hours a day</p>
            <p>7 days a week</p>
          </div>
        </div>

        {/* Email Support */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12" />
            </div>
          </div>
          <div className="text-sm">
            <p className="font-bold">We&apos;ll reply within</p>
            <p>five business days</p>
          </div>
        </div>

        {/* Store Locator */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <MapPin className="h-12 w-12" />
          </div>
          <h3 className="font-bold">STORE LOCATOR</h3>
          <p className="text-sm">Find Steplo retail stores near you</p>
        </div>
      </div>
    </div>
  );
}
