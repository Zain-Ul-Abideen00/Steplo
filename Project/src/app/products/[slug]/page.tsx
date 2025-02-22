import { ProductDetails } from "@/components/productDetails/ProductDetails";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      description,
      price,
      isNew,
      colors,
      category,
      "imageUrl": image.asset->url,
      "slug": slug.current
    }`,
    { slug: (await params).slug }
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-5 sm:px-10 py-8">
      <ProductDetails product={product} />
      <RelatedProducts
        currentProduct={product}
        pageType="product"
        category={product.category}
        limit={6}
      />
    </div>
  );
}
