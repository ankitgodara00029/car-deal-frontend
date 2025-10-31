// Run this script to fix existing documents with missing _key properties
// You can run this in your browser console or create a temporary API route

import { client, generateUniqueKey } from "./sanity.js";

export async function fixMissingKeys() {
  try {
    console.log("Starting to fix missing keys...");

    // Fetch all car documents that have images
    const cars = await client.fetch(`*[_type == "car" && defined(images)]`);

    console.log(`Found ${cars.length} cars with images`);

    for (const car of cars) {
      if (car.images && Array.isArray(car.images)) {
        let needsUpdate = false;
        const updatedImages = car.images.map((image, index) => {
          if (!image._key) {
            needsUpdate = true;
            console.log(
              `Adding missing key to image ${index} in car ${car._id}`
            );
            return {
              ...image,
              _key: generateUniqueKey("image"),
            };
          }
          return image;
        });

        if (needsUpdate) {
          await client.patch(car._id).set({ images: updatedImages }).commit();
          console.log(`✅ Fixed missing keys for car: ${car._id}`);
        } else {
          console.log(`✓ Car ${car._id} already has all keys`);
        }
      }
    }

    console.log("✅ Finished fixing missing keys");
    return { success: true, message: "All missing keys have been fixed" };
  } catch (error) {
    console.error("❌ Error fixing missing keys:", error);
    return { success: false, error: error.message };
  }
}

// Uncomment the line below to run immediately when imported
// fixMissingKeys();
