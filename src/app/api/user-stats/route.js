import { NextResponse } from "next/server";
import { client } from "@/utils/sanity";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    // Get the authenticated user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user email from query params
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email");

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 },
      );
    }

    // Get user statistics
    const stats = await client.fetch(
      `{
      "totalCars": count(*[_type == "car" && userEmail == $userEmail]),
      "activeCars": count(*[_type == "car" && userEmail == $userEmail && isActive != false]),
      "inactiveCars": count(*[_type == "car" && userEmail == $userEmail && isActive == false]),
      "recentCars": *[_type == "car" && userEmail == $userEmail] | order(_createdAt desc)[0...3] {
        _id,
        carName,
        carModel,
        carPrice,
        _createdAt
      }
    }`,
      { userEmail },
    );

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
