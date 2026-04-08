"use client";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { client, urlFor } from "@/utils/sanity";
import Image from "next/image";
import { toast } from "react-toastify";
import CustomPopup from "@/components/common/CustomPopup";
import Loader from "../common/Loader";
import CommonInput from "@/components/common/CommonInput";
import CommonSelect from "@/components/common/CommonSelect";
import Link from "next/link";
import Cta from "../common/Cta";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const [userCars, setUserCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeTab, setActiveTab] = useState("cars");

  // Edit modal state
  const [editCar, setEditCar] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [updating, setUpdating] = useState(false);
  const fileInputRef = useRef(null);

  const fetchUserCars = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const query = `*[_type == "car" && userId == $userId] | order(_createdAt desc) {
        _id, _createdAt, car, model, price, kilometers, fuel, name, number,
        owner, original, tyre, interior, engine, images, userId
      }`;
      const cars = await client.fetch(query, { userId: user.id });
      setUserCars(cars);
    } catch (error) {
      console.error("Error fetching user cars:", error);
      toast.error("Failed to fetch your cars");
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async () => {
    if (!selectedCar) return;
    try {
      const response = await fetch(`/api/delete-car?id=${selectedCar._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete car");
      setUserCars((prev) => prev.filter((car) => car._id !== selectedCar._id));
      toast.success("Car deleted successfully!");
      setDeletePopup(false);
      setSelectedCar(null);
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car");
    }
  };

  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setDeletePopup(true);
  };

  const handleEditClick = (car) => {
    setEditCar(car);
    setEditForm({
      name: car.name || "",
      number: car.number || "",
      car: car.car || "",
      price: car.price || "",
      model: car.model || "",
      owner: car.owner || "",
      fuel: car.fuel || "",
      kilometers: car.kilometers || "",
      original: car.original || "",
      tyre: car.tyre || "",
      interior: car.interior || "",
      engine: car.engine || "",
    });
    setNewImages([]);
  };

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("carId", editCar._id);
      formData.append("carData", JSON.stringify(editForm));
      newImages.forEach((file) => formData.append("images", file));

      const response = await fetch("/api/update-car", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update car");

      const updated = await response.json();
      setUserCars((prev) =>
        prev.map((c) =>
          c._id === editCar._id ? { ...c, ...editForm, ...updated } : c,
        ),
      );
      toast.success("Your car details have been updated");
      setEditCar(null);
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) fetchUserCars();
  }, [isLoaded, user]);

  useEffect(() => {
    if (editCar) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [editCar]);

  if (!isLoaded || loading) return <Loader />;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please sign in to access dashboard
          </h2>
          <a
            href="/sign-in"
            className="bg-[#ff5e00]/80 text-white px-6 py-3 rounded-lg bg-[#ff5e00] transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              {/* {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : ( */}
              <span className="text-2xl font-bold text-blue-600">
                {user.firstName?.[0] ||
                  user.emailAddresses[0].emailAddress[0].toUpperCase()}
              </span>
              {/* )} */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/post-your-car"
            className="bg-[#ff5e00]/80 text-white p-4 rounded-lg bg-[#ff5e00] transition-colors text-center"
          >
            <div className="text-2xl mb-2">🚗</div>
            <div className="font-medium">Post New Car</div>
          </Link>
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
                className={`py-4 px-1 duration-300 border-b-2 font-medium text-sm ${activeTab === "cars" ? "border-[#ff5e00] text-[#ff5e00]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-700"}`}
              >
                My Cars ({userCars.length})
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-1 duration-300 border-b-2 font-medium text-sm ${activeTab === "profile" ? "border-[#ff5e00] text-[#ff5e00]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-700"}`}
              >
                Profile
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "cars" && (
              <div>
                {userCars.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No cars posted yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Start by posting your first car to sell
                    </p>
                    <Cta className="max-w-[170px] mx-auto" url="/post-your-car">
                      Post Your Car
                    </Cta>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCars.map((car) => (
                      <div
                        key={car._id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48 bg-gray-200">
                          {car.images && car.images.length > 0 ? (
                            <Image
                              src={urlFor(car.images[0]).url()}
                              alt={car.car}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <span className="text-gray-400">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">
                            {car.car} {car.model}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 mb-4">
                            <p>Price: ₹{car.price?.toLocaleString()}</p>
                            <p>Kilometers: {car.kilometers}</p>
                            <p>Fuel: {car.fuel}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Link
                              href={`/${car._id}`}
                              className="flex-1 bg-gray-600 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-sm"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleEditClick(car)}
                              className="flex-1 bg-[#ff5e00]/80 text-white text-center py-2 px-4 rounded-md bg-[#ff5e00] transition-colors text-sm"
                            >
                              Edit
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Edit Car</h2>
              <button
                onClick={() => setEditCar(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={handleUpdateSubmit}
              className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <CommonInput
                id="name"
                label="Name"
                placeholder="Enter Name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
              <CommonInput
                id="number"
                type="number"
                label="Phone"
                placeholder="Enter Phone Number"
                value={editForm.number}
                onChange={handleEditChange}
                required
              />
              <CommonInput
                id="car"
                label="Car Name"
                placeholder="Enter Car Name"
                value={editForm.car}
                onChange={handleEditChange}
                required
              />
              <CommonInput
                id="price"
                type="number"
                label="Price"
                placeholder="Enter Price"
                value={editForm.price}
                onChange={handleEditChange}
                required
              />
              <CommonInput
                id="model"
                type="number"
                label="Model"
                placeholder="Enter Model Year"
                value={editForm.model}
                onChange={handleEditChange}
                required
              />
              <CommonSelect
                id="owner"
                label="Owner"
                options={["1st", "2nd", "3rd"]}
                value={editForm.owner}
                onChange={handleEditChange}
                required
              />
              <CommonSelect
                id="fuel"
                label="Fuel Type"
                options={[
                  "Petrol",
                  "Diesel",
                  "Electric",
                  "Hybrid",
                  "CNG",
                  "LPG",
                ]}
                value={editForm.fuel}
                onChange={handleEditChange}
                required
              />
              <CommonInput
                id="kilometers"
                type="number"
                label="Kilometers Driven"
                placeholder="Enter Kilometers"
                value={editForm.kilometers}
                onChange={handleEditChange}
                required
              />
              <CommonSelect
                id="original"
                label="Original Condition (%)"
                options={[
                  "10",
                  "20",
                  "30",
                  "40",
                  "50",
                  "60",
                  "70",
                  "80",
                  "90",
                  "100",
                ]}
                value={editForm.original}
                onChange={handleEditChange}
                required
              />
              <CommonSelect
                id="tyre"
                label="Tyre Condition (%)"
                options={[
                  "10",
                  "20",
                  "30",
                  "40",
                  "50",
                  "60",
                  "70",
                  "80",
                  "90",
                  "100",
                ]}
                value={editForm.tyre}
                onChange={handleEditChange}
                required
              />
              <CommonSelect
                id="interior"
                label="Interior Condition (%)"
                options={[
                  "10",
                  "20",
                  "30",
                  "40",
                  "50",
                  "60",
                  "70",
                  "80",
                  "90",
                  "100",
                ]}
                value={editForm.interior}
                onChange={handleEditChange}
                required
              />
              <CommonSelect
                id="engine"
                label="Engine Condition (%)"
                options={[
                  "10",
                  "20",
                  "30",
                  "40",
                  "50",
                  "60",
                  "70",
                  "80",
                  "90",
                  "100",
                ]}
                value={editForm.engine}
                onChange={handleEditChange}
                required
              />

              {/* Image Upload */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="edit-images"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Replace Images (optional)
                </label>
                <input
                  type="file"
                  id="edit-images"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => setNewImages(Array.from(e.target.files))}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {newImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newImages.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-16 h-16 border rounded overflow-hidden"
                      >
                        <Image
                          src={URL.createObjectURL(img)}
                          alt={`preview-${i}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditCar(null)}
                  className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-2 rounded-md bg-[#ff5e00]/80 text-white bg-[#ff5e00] text-sm disabled:opacity-50"
                >
                  {updating ? "Updating..." : "Update Car"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletePopup && (
        <CustomPopup
          handleConfirm={deleteCar}
          setShowPopup={setDeletePopup}
          message={`Are you sure you want to delete "${selectedCar?.car} ${selectedCar?.model}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
};

export default Dashboard;
