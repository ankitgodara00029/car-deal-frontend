"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@/utils/sanity";
import { toast } from "react-toastify";
import CustomPopup from "@/components/common/CustomPopup";
import Loader from "../common/Loader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MyCarsTab from "@/components/dashboard/MyCarsTab";
import DealerTab from "@/components/dashboard/DealerTab";
import ProfileTab from "@/components/dashboard/ProfileTab";
import EditCarModal from "@/components/dashboard/EditCarModal";
import EditDealerModal from "@/components/dashboard/EditDealerModal";

const VALID_TABS = ["cars", "dealer", "profile"];

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromQuery = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(tabFromQuery) ? tabFromQuery : "cars";

  const setActiveTab = (tab) => {
    router.push(`/dashboard?tab=${tab}`, { scroll: false });
  };

  const [userCars, setUserCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  // Dealer state
  const [dealerInfo, setDealerInfo] = useState(null);
  const [dealerLoading, setDealerLoading] = useState(false);
  const [dealerDeletePopup, setDealerDeletePopup] = useState(false);
  const [editDealer, setEditDealer] = useState(false);
  const [dealerForm, setDealerForm] = useState({});
  const [dealerImageFile, setDealerImageFile] = useState(null);
  const [dealerImagePreview, setDealerImagePreview] = useState(null);
  const [dealerUpdating, setDealerUpdating] = useState(false);

  // Edit car state
  const [editCar, setEditCar] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [updating, setUpdating] = useState(false);

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

  const fetchDealerInfo = async () => {
    if (!user?.id) return;
    setDealerLoading(true);
    try {
      const res = await fetch(
        `/api/get-dealer-info?userId=${user.id}&t=${Date.now()}`,
      );
      if (res.ok) setDealerInfo(await res.json());
    } catch (err) {
      console.error("Error fetching dealer info:", err);
    } finally {
      setDealerLoading(false);
    }
  };

  const handleDealerEditClick = () => {
    setDealerForm({
      name: dealerInfo.name || "",
      businessName: dealerInfo.businessName || "",
      address: dealerInfo.address || "",
      phone: dealerInfo.phone || "",
    });
    setDealerImagePreview(dealerInfo.imageUrl || null);
    setDealerImageFile(null);
    setEditDealer(true);
  };

  const handleDealerUpdateSubmit = async (e) => {
    e.preventDefault();
    setDealerUpdating(true);
    try {
      const fd = new FormData();
      fd.append("dealerData", JSON.stringify(dealerForm));
      fd.append("dealerId", dealerInfo._id);
      if (dealerImageFile) fd.append("image", dealerImageFile);

      const res = await fetch("/api/post-dealer-info", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to update");
      }
      toast.success("Dealer info updated successfully!");
      setEditDealer(false);
      setDealerInfo((prev) => ({
        ...prev,
        ...dealerForm,
        ...(dealerImageFile && { imageUrl: dealerImagePreview }),
      }));
      fetchDealerInfo();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update dealer info");
    } finally {
      setDealerUpdating(false);
    }
  };

  const handleDealerDelete = async () => {
    try {
      const res = await fetch(`/api/delete-dealer?id=${dealerInfo._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Dealer info deleted successfully!");
      setDealerInfo(null);
      setDealerDeletePopup(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete dealer info");
    }
  };

  useEffect(() => {
    if (isLoaded && user) fetchUserCars();
  }, [isLoaded, user]);

  useEffect(() => {
    if (activeTab === "dealer" && user) fetchDealerInfo();
  }, [activeTab, user]);

  useEffect(() => {
    document.body.classList.toggle(
      "overflow-hidden",
      !!(editCar || editDealer),
    );
    return () => document.body.classList.remove("overflow-hidden");
  }, [editCar, editDealer]);

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

  const tabs = [
    { key: "cars", label: `My Cars (${userCars.length})` },
    { key: "dealer", label: "Dealer Info" },
    { key: "profile", label: "Profile" },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader user={user} totalCars={userCars.length} />

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-4 sm:px-6">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`py-4 px-1 duration-300 border-b-2 font-medium text-sm ${
                    activeTab === key
                      ? "border-[#ff5e00] text-[#ff5e00]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "cars" && (
              <MyCarsTab
                userCars={userCars}
                onEdit={handleEditClick}
                onDelete={(car) => {
                  setSelectedCar(car);
                  setDeletePopup(true);
                }}
              />
            )}
            {activeTab === "dealer" && (
              <DealerTab
                dealerInfo={dealerInfo}
                dealerLoading={dealerLoading}
                onEdit={handleDealerEditClick}
                onDelete={() => setDealerDeletePopup(true)}
              />
            )}
            {activeTab === "profile" && <ProfileTab user={user} />}
          </div>
        </div>
      </div>

      {editCar && (
        <EditCarModal
          editForm={editForm}
          newImages={newImages}
          setNewImages={setNewImages}
          updating={updating}
          onChange={(e) =>
            setEditForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
          onSubmit={handleUpdateSubmit}
          onClose={() => setEditCar(null)}
        />
      )}

      {deletePopup && (
        <CustomPopup
          handleConfirm={deleteCar}
          setShowPopup={setDeletePopup}
          message={`Are you sure you want to delete "${selectedCar?.car} ${selectedCar?.model}"? This action cannot be undone.`}
        />
      )}

      {editDealer && (
        <EditDealerModal
          dealerForm={dealerForm}
          setDealerForm={setDealerForm}
          dealerImagePreview={dealerImagePreview}
          setDealerImageFile={setDealerImageFile}
          setDealerImagePreview={setDealerImagePreview}
          dealerUpdating={dealerUpdating}
          onSubmit={handleDealerUpdateSubmit}
          onClose={() => setEditDealer(false)}
        />
      )}

      {dealerDeletePopup && (
        <CustomPopup
          handleConfirm={handleDealerDelete}
          setShowPopup={setDealerDeletePopup}
          message="Are you sure you want to delete your dealer info? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default Dashboard;
