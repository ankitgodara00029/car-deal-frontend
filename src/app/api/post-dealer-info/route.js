import { NextResponse } from "next/server";
import { writeClient } from "@/utils/sanity";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const dealerData = JSON.parse(formData.get("dealerData"));
    const imageFile = formData.get("image");
    const dealerId = formData.get("dealerId");

    let imageAsset = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const asset = await writeClient.assets.upload("image", buffer, {
        filename: imageFile.name,
        contentType: imageFile.type,
      });
      imageAsset = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      };
    }

    let result;

    if (dealerId) {
      const updateData = {
        ...dealerData,
        ...(imageAsset && { image: imageAsset }),
      };

      const cleanId = dealerId.replace(/^drafts\./, "");

      // Try published doc first, fall back to draft
      const published = await writeClient.fetch(`*[_id == $id][0]._id`, {
        id: cleanId,
      });
      const draftExists = await writeClient.fetch(`*[_id == $id][0]._id`, {
        id: `drafts.${cleanId}`,
      });

      const targetId = published
        ? cleanId
        : draftExists
          ? `drafts.${cleanId}`
          : cleanId;

      result = await writeClient
        .patch(targetId)
        .set(updateData)
        .commit({ autoGenerateArrayKeys: true });
    } else {
      // Check if user already has dealer info
      const existing = await writeClient.fetch(
        `*[_type == "dealerInfo" && clerkUserId == $userId][0]`,
        { userId },
      );

      if (existing) {
        return NextResponse.json(
          {
            error:
              "You already have a dealer profile. Please update it instead.",
          },
          { status: 400 },
        );
      }

      // Create new dealer info
      result = await writeClient.create({
        _type: "dealerInfo",
        ...dealerData,
        clerkUserId: userId,
        ...(imageAsset && { image: imageAsset }),
      });
    }

    return NextResponse.json(result, { status: dealerId ? 200 : 201 });
  } catch (error) {
    console.error("Error posting dealer info:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
