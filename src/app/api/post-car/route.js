import { NextResponse } from "next/server";
import { writeClient } from "@/utils/sanity";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

function generateUniqueKey(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    // Extract car fields
    const carData = JSON.parse(formData.get("carData"));
    const imageFiles = formData.getAll("images");

    // Upload images server-side
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

    const result = await writeClient.create({
      _type: "car",
      ...carData,
      images: uploadedImages,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error posting car:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
