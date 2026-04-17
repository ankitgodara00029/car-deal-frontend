"use client";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import CommonInput from "@/components/common/CommonInput";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/common/Loader";
import Link from "next/link";

export default function PostDealerForm() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    address: "",
    phone: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || !user) return;
    const check = async () => {
      try {
        const res = await fetch(
          `/api/get-dealer-info?userId=${user.id}&t=${Date.now()}`,
        );
        if (res.ok) {
          const data = await res.json();
          if (data?._id) setAlreadyExists(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    };
    check();
  }, [isLoaded, user]);

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

      const res = await fetch("/api/post-dealer-info", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Failed to submit");

      toast.success("Dealer info submitted successfully!");
      router.push("/?category=dealers");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit dealer info");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || checking) return <Loader />;

  if (alreadyExists) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-5xl mb-4">🏪</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Business Already Registered
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          You can only add one business profile. You already have a dealer
          profile registered. To make changes, please edit it from your
          dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="bg-[#ff5e00] text-white px-6 py-2.5 rounded-lg text-sm hover:bg-orange-600 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/?category=dealers"
            className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            View My Business
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Post <span className="text-[#ff5e00]">Dealer</span> Info
      </h2>
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
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
