import { client, generateUniqueKey } from "@/utils/sanity";

export async function POST() {
  try {
    console.log("Starting to fix missing keys...");

    // Fetch all car documents that have images
    const cars = await client.fetch(`*[_type == "car" && defined(images)]`);

    console.log(`Found ${cars.length} cars with images`);
    let fixedCount = 0;

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
          fixedCount++;
          console.log(`Fixed missing keys for car: ${car._id}`);
        }
      }
    }

    return Response.json({
      success: true,
      message: `Fixed ${fixedCount} cars with missing keys`,
      totalCars: cars.length,
      fixedCars: fixedCount,
    });
  } catch (error) {
    console.error("Error fixing missing keys:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
