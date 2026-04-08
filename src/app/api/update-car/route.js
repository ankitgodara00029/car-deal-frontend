import { NextResponse } from "next/server";
import { writeClient } from "@/utils/sanity";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

function generateUniqueKey(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function PATCH(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const carId = formData.get("carId");
    const carData = JSON.parse(formData.get("carData"));
    const imageFiles = formData.getAll("images");

    const patch = writeClient.patch(carId).set(carData);

    if (imageFiles.length > 0) {
      const uploadedImages = [];
      for (const file of imageFiles) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const asset = await writeClient.assets.upload("image", buffer, {
          filename: file.name,
          contentType: file.type,
        });
        uploadedImages.push({
          _type: "image",
          _key: generateUniqueKey("image"),
          asset: { _type: "reference", _ref: asset._id },
        });
      }
      patch.set({ images: uploadedImages });
    }

    const result = await patch.commit();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
