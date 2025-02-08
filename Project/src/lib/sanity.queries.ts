import { client } from "../sanity/lib/client";

export const productsQuery = `*[_type == "product"] {
  _id,
  name,
  description,
  price,
  isNew,
  colors,
  category,
  "imageUrl": image.asset->url,
  "slug": slug.current 
}`;

export async function getProducts() {
  const products = await client.fetch(productsQuery);
  return products;
}
