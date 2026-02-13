import { NextResponse } from "next/server";
import { client } from "@/utils/sanity";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(request) {
  try {
    // Get the authenticated user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get car ID from request
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get("id");

    if (!carId) {
      return NextResponse.json(
        { error: "Car ID is required" },
        { status: 400 },
      );
    }

    // First, fetch the car to verify ownership
    const car = await client.fetch(`*[_type == "car" && _id == $carId][0]`, {
      carId,
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Delete the car
    await client.delete(carId);

    return NextResponse.json(
      { message: "Car deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
