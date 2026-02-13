import { NextResponse } from "next/server";
import { client } from "@/utils/sanity";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(request) {
  try {
    // Get the authenticated user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { carId, isActive } = body;

    if (!carId || typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "Car ID and status are required" },
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

    // Update the car status
    const updatedCar = await client.patch(carId).set({ isActive }).commit();

    return NextResponse.json(
      { message: "Car status updated successfully", car: updatedCar },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating car status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
