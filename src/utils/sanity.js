// lib/sanity.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// 👇 Read-only client (safe to expose to frontend)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03", // Use a stable API version
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN, // 🔥 must add in .env.local
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Helper function to generate unique keys for array items
export function generateUniqueKey(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to fix existing documents with missing keys
export async function fixMissingKeys() {
  try {
    // Fetch all car documents
    const cars = await client.fetch(`*[_type == "car" && defined(images)]`);

    for (const car of cars) {
      if (car.images && Array.isArray(car.images)) {
        let needsUpdate = false;
        const updatedImages = car.images.map((image, index) => {
          if (!image._key) {
            needsUpdate = true;
            return {
              ...image,
              _key: generateUniqueKey("image"),
            };
          }
          return image;
        });

        if (needsUpdate) {
          await client.patch(car._id).set({ images: updatedImages }).commit();
          console.log(`Fixed missing keys for car: ${car._id}`);
        }
      }
    }

    console.log("Finished fixing missing keys");
  } catch (error) {
    console.error("Error fixing missing keys:", error);
  }
}
