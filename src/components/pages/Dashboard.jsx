"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { client, urlFor } from "@/utils/sanity";
import Image from "next/image";
import { toast } from "react-toastify";
import CustomPopup from "@/components/common/CustomPopup";
import Preloader from "@/components/common/Preloader";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const [userCars, setUserCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("cars");
  const [toggling, setToggling] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, inactive

  // Fetch user's posted cars
  const fetchUserCars = async () => {
    if (!user?.emailAddresses?.[0]?.emailAddress) return;

    try {
      setLoading(true);
      const query = `*[_type == "car" && userEmail == $userEmail] | order(_createdAt desc) {
        _id,
        _createdAt,
        carName,
        carModel,
        carYear,
        carPrice,
        carMileage,
        carFuelType,
        carTransmission,
        carColor,
        carDescription,
        userEmail,
        userName,
        userPhone,
        images,
        isActive
      }`;

      const cars = await client.fetch(query, {
        userEmail: user.emailAddresses[0].emailAddress,
      });

      setUserCars(cars);
    } catch (error) {
      console.error("Error fetching user cars:", error);
      toast.error("Failed to fetch your cars");
    } finally {
      setLoading(false);
    }
  };

  // Delete car function
  const deleteCar = async () => {
    if (!selectedCar) return;

    try {
      setDeleting(true);

      const response = await fetch(`/api/delete-car?id=${selectedCar._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      // Update local state
      setUserCars((prev) => prev.filter((car) => car._id !== selectedCar._id));

      toast.success("Car deleted successfully!");
      setDeletePopup(false);
      setSelectedCar(null);
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car");
    } finally {
      setDeleting(false);
    }
  };

  // Handle delete click
  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setDeletePopup(true);
  };

  // Toggle car active status
  const toggleCarStatus = async (carId, currentStatus) => {
    try {
      setToggling(carId);

      const response = await fetch("/api/toggle-car-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carId,
          isActive: !currentStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update car status");
      }

      // Update local state
      setUserCars((prev) =>
        prev.map((car) =>
          car._id === carId ? { ...car, isActive: !currentStatus } : car,
        ),
      );

      toast.success(
        `Car ${!currentStatus ? "activated" : "deactivated"} successfully!`,
      );
    } catch (error) {
      console.error("Error toggling car status:", error);
      toast.error("Failed to update car status");
    } finally {
      setToggling(null);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserCars();
    }
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return <Preloader />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please sign in to access dashboard
          </h2>
          <a
            href="/sign-in"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // Filter cars based on selected filter
  const filteredCars = userCars.filter((car) => {
    if (filter === "active") return car.isActive !== false;
    if (filter === "inactive") return car.isActive === false;
    return true; // all
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <span className="text-2xl font-bold text-blue-600">
                  {user.firstName?.[0] ||
                    user.emailAddresses[0].emailAddress[0].toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user.firstName || "User"}!
              </h1>
              <p className="text-gray-600">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <a
            href="/post-your-car"
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            <div className="text-2xl mb-2">🚗</div>
            <div className="font-medium">Post New Car</div>
          </a>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-medium text-green-800">
              {userCars.filter((car) => car.isActive !== false).length} Active
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">⏸️</div>
            <div className="font-medium text-yellow-800">
              {userCars.filter((car) => car.isActive === false).length} Inactive
            </div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium text-purple-800">
              {userCars.length} Total Cars
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("cars")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "cars"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                My Cars ({userCars.length})
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "cars" && (
              <div>
                {/* Filter buttons */}
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    All Cars ({userCars.length})
                  </button>
                  <button
                    onClick={() => setFilter("active")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === "active"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Active (
                    {userCars.filter((car) => car.isActive !== false).length})
                  </button>
                  <button
                    onClick={() => setFilter("inactive")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === "inactive"
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Inactive (
                    {userCars.filter((car) => car.isActive === false).length})
                  </button>
                </div>

                {filteredCars.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {filter === "all"
                        ? "No cars posted yet"
                        : `No ${filter} cars found`}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {filter === "all"
                        ? "Start by posting your first car to sell"
                        : `You don't have any ${filter} cars at the moment`}
                    </p>
                    {filter === "all" && (
                      <a
                        href="/post-your-car"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Post Your Car
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                      <div
                        key={car._id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        {/* Car Image */}
                        <div className="relative h-48 bg-gray-200">
                          {car.images && car.images.length > 0 ? (
                            <Image
                              src={urlFor(car.images[0]).url()}
                              alt={car.carName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <span className="text-gray-400">No Image</span>
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                car.isActive !== false
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {car.isActive !== false ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>

                        {/* Car Details */}
                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">
                            {car.carName} {car.carModel}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 mb-4">
                            <p>Year: {car.carYear}</p>
                            <p>Price: ₹{car.carPrice?.toLocaleString()}</p>
                            <p>Mileage: {car.carMileage} km/l</p>
                            <p>Fuel: {car.carFuelType}</p>
                          </div>

                          <div className="flex space-x-2">
                            <a
                              href={`/${car._id}`}
                              className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm"
                            >
                              View Details
                            </a>
                            <button
                              onClick={() =>
                                toggleCarStatus(car._id, car.isActive !== false)
                              }
                              disabled={toggling === car._id}
                              className={`py-2 px-4 rounded-md transition-colors text-sm ${
                                car.isActive !== false
                                  ? "bg-yellow-600 text-white hover:bg-yellow-700"
                                  : "bg-green-600 text-white hover:bg-green-700"
                              } disabled:opacity-50`}
                            >
                              {toggling === car._id
                                ? "..."
                                : car.isActive !== false
                                  ? "Deactivate"
                                  : "Activate"}
                            </button>
                            <button
                              onClick={() => handleDeleteClick(car)}
                              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Profile Information
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                        {user.firstName || "Not provided"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                        {user.lastName || "Not provided"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                      {user.emailAddresses[0].emailAddress}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Account Statistics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {userCars.length}
                        </div>
                        <div className="text-sm text-blue-800">Cars Posted</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {
                            userCars.filter((car) => car.isActive !== false)
                              .length
                          }
                        </div>
                        <div className="text-sm text-green-800">
                          Active Listings
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {
                            userCars.filter((car) => car.isActive === false)
                              .length
                          }
                        </div>
                        <div className="text-sm text-purple-800">
                          Inactive Listings
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {/* <CustomPopup isOpen={deletePopup} onClose={() => setDeletePopup(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Delete Car Listing
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "{selectedCar?.carName}{" "}
            {selectedCar?.carModel}"? This action cannot be undone.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setDeletePopup(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              onClick={deleteCar}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </CustomPopup> */}
    </div>
  );
};

export default Dashboard;
