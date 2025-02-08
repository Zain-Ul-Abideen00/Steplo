import Link from "next/link"

export default function RelatedLinks() {
  return (
    <div className="space-y-4 mt-8 font-semibold">
      <h3 className="text-gray-500 uppercase">Related</h3>

      <div className="space-y-4 pl-4">
        <Link
          href="/help/delivery-options"
          className="block text-[#111111] hover:underline"
        >
          WHAT ARE STEPLO&apos;S DELIVERY OPTIONS?
        </Link>

        <Link
          href="/help/free-delivery"
          className="block text-[#111111] hover:underline"
        >
          HOW DO I GET FREE DELIVERY ON STEPLO ORDERS?
        </Link>
      </div>
    </div>
  );
}
