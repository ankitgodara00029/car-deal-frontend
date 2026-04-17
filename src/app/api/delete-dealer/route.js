import { NextResponse } from "next/server";
import { writeClient } from "@/utils/sanity";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dealerId = searchParams.get("id");

    if (!dealerId) {
      return NextResponse.json(
        { error: "Dealer ID is required" },
        { status: 400 },
      );
    }

    const dealer = await writeClient.fetch(
      `*[_type == "dealerInfo" && _id == $dealerId][0]{ _id, clerkUserId }`,
      { dealerId },
    );

    if (!dealer) {
      return NextResponse.json({ error: "Dealer not found" }, { status: 404 });
    }

    if (dealer.clerkUserId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await writeClient.delete(dealerId);

    return NextResponse.json(
      { message: "Dealer info deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting dealer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
