"use client";
export const dynamic = "force-dynamic";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import CommonInput from "@/components/common/CommonInput";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
const PostDealerInfo = () => {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    address: "",
    phone: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingDealerId, setExistingDealerId] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);
  const fileInputRef = useRef(null);

  // Fetch existing dealer info on mount
  useEffect(() => {
    const fetchExistingDealer = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(
          `/api/get-dealer-info?userId=${user.id}`,
          {},
          { cache: "no-store" },
        );
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData({
              name: data.name || "",
              businessName: data.businessName || "",
              address: data.address || "",
              phone: data.phone || "",
            });
            setExistingDealerId(data._id);
            if (data.imageUrl) {
              setPreview(data.imageUrl);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching dealer info:", err);
      } finally {
        setFetchingData(false);
      }
    };

    fetchExistingDealer();
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("dealerData", JSON.stringify(formData));
      if (imageFile) fd.append("image", imageFile);
      if (existingDealerId) fd.append("dealerId", existingDealerId);

      const res = await fetch("/api/post-dealer-info", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to submit");

      const result = await res.json();
      toast.success(
        existingDealerId
          ? "Dealer info updated successfully!"
          : "Dealer info submitted successfully!",
      );
      router.refresh();
      if (!existingDealerId) {
        setExistingDealerId(result._id);
      }

      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit dealer info");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {existingDealerId ? "Update" : "Post"}{" "}
          <span className="text-[#ff5e00]">Dealer</span> Info
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CommonInput
            id="name"
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="businessName"
            label="Business Name"
            placeholder="Enter business name"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="address"
            label="Address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="phone"
            label="Phone"
            type="number"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-[#ff5e00] hover:file:bg-orange-100"
            />
            {preview && (
              <div className="relative w-full h-40 mt-2 rounded overflow-hidden border">
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff5e00] text-white py-2.5 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Submitting..." : existingDealerId ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDealerInfo;
