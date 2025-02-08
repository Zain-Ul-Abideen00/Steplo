import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-4xl font-bold mb-4">Product Not Found</h2>
      <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
      <Link 
        href="/products" 
        className="text-black underline hover:text-gray-600"
      >
        Back to Products
      </Link>
    </div>
  );
} 