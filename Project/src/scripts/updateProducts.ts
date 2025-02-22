import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: "2023-10-10", // Use the latest API version
});

// Function to generate a slug from the product name
function generateSlug(name: string | null): string | null {
  if (!name) {
    console.warn(
      "Product name is null or undefined. Skipping slug generation."
    );
    return null;
  }
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove special characters
    .slice(0, 96); // Limit to 96 characters
}

// Function to update products in Sanity
async function updateProducts() {
  try {
    console.log("Fetching existing products from Sanity...");
    const existingProducts = await client.fetch(`*[_type == "product"] {
      _id,
      name,
      description,
      price,
      isNew,
      colors,
      category,
      image
    }`);

    console.log(`Found ${existingProducts.length} products to update.`);

    for (const product of existingProducts) {
      if (!product.name) {
        console.warn(
          `Skipping product with ID ${product._id} because it has no name.`
        );
        continue; // Skip products with no name
      }

      console.log(`Updating product: ${product.name}`);

      // Generate a slug for the product
      const slug = generateSlug(product.name);

      if (!slug) {
        console.warn(
          `Skipping product ${product.name} because slug generation failed.`
        );
        continue; // Skip products with invalid slugs
      }

      // Map the old category to the new category options
      const categoryMap: Record<string, string> = {
        "Men's Shoes": "mens-shoes",
        "Men's Top": "mens-top",
        "Men's Shorts": "mens-shorts",
        "Women's Shoes": "womens-shoes",
        "Women's Top": "womens-top",
        "Women's Shorts": "womens-shorts",
        Kids: "kids",
      };

      const newCategory = categoryMap[product.category] || "mens-shoes"; // Default to "mens-shoes" if category is not found

      // Prepare the updated product data
      const updatedProduct = {
        ...product,
        slug: {
          _type: "slug",
          current: slug,
        },
        category: newCategory,
      };

      // Patch the product in Sanity
      try {
        console.log("Patching product in Sanity:", updatedProduct.name);
        await client.patch(product._id).set(updatedProduct).commit();
        console.log(`Product updated successfully: ${updatedProduct.name}`);
      } catch (error) {
        console.error(`Failed to update product ${product.name}:`, error);
      }
    }

    console.log("Product update completed successfully!");
  } catch (error) {
    console.error("Error updating products:", error);
  }
}

// Run the update function
updateProducts();
