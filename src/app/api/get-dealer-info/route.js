import { NextResponse } from "next/server";
import { client, urlFor } from "@/utils/sanity";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const dealer = await client.fetch(
      `*[_type == "dealerInfo" && clerkUserId == $userId][0] {
        _id, name, businessName, address, phone, image
      }`,
      { userId },
    );

    if (!dealer) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json({
      ...dealer,
      imageUrl: dealer.image
        ? urlFor(dealer.image).width(400).height(300).url()
        : null,
    });
  } catch (error) {
    console.error("Error fetching dealer info:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
