import ContactInfo from "@/components/help/Contact-Info"
import FAQSection from "@/components/help/Faq-Section"
import FeedbackSection from "@/components/help/feedback-section"
import HelpHeader from "@/components/help/Help-Header"
import HelpSearchBar from "@/components/help/Help-Search"
import PaymentInfo from "@/components/help/Payment-Info"
import RelatedLinks from "@/components/help/Related-Links"

export default function HelpPage() {
  return (
    <div className="min-h-screen mx-auto px-5 sm:px-10 bg-white">
      <div className="container mx-auto py-8">
        <div className="space-y-8">
          <HelpHeader />
          <HelpSearchBar />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PaymentInfo />
              <FAQSection />
              <FeedbackSection />
              <RelatedLinks />
            </div>
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
