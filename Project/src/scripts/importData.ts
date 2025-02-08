import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2023-10-10', // Use the latest API version
});

// Function to upload image to Sanity
async function uploadImageToSanity(imageUrl: string): Promise<string | null> {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

// Function to import data from json-server to Sanity
async function importData() {
  try {
    console.log('Fetching products from json-server...');
    const response = await axios.get('http://localhost:5000/products'); // Adjust the URL if needed
    const products = response.data;
    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      console.log(`Processing product: ${product.name}`);
      let imageRef = null;

      // Upload product image to Sanity if it exists
      if (product.image) {
        imageRef = await uploadImageToSanity(`http://localhost:5000${product.image}`);
      }

      // Create Sanity product document
      const sanityProduct = {
        _type: 'product', // Ensure this matches your Sanity schema type
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        isNew: product.isNew,
        colors: product.colors,
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
      };

      console.log('Uploading product to Sanity:', sanityProduct.name);
      const result = await client.create(sanityProduct);
      console.log(`Product uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Run the import function
importData();
