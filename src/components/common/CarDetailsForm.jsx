"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import CommonInput from "./CommonInput";
import CommonSelect from "./CommonSelect";
import Cta from "./Cta";
import CustomPopup from "./CustomPopup";

const CarDetailsForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showPopup || isLoading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showPopup, isLoading]);
  const [formData, setFormData] = useState({
    images: [],
    name: "",
    number: "",
    car: "",
    price: "",
    model: "",
    owner: "",
    fuel: "",
    kilometers: "",
    original: "",
    tyre: "",
    interior: "",
    engine: "",
  });

  const fileInputRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files, // Replace previous images with new ones
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  // Handle form submission
  const handleConfirm = async (e) => {
    setShowPopup(false);
    setIsLoading(true); // Show loader
    try {
      const formDataToSend = new FormData();

      // Append all images
      formData.images.forEach((file) => {
        formDataToSend.append("files", file);
      });

      // First, upload images to Strapi
      const uploadResponse = await fetch(
        "https://radiant-fellowship-7fbb005f57.strapiapp.com/api/upload",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(
          `Image upload failed! Status: ${uploadResponse.status}`
        );
      }

      const uploadedImages = await uploadResponse.json();

      // Extract image IDs from the response
      const imageIds = uploadedImages.map((img) => img.id);

      // Now submit the form with image IDs
      const data = {
        data: {
          name: formData.name,
          number: formData.number,
          car: formData.car,
          price: formData.price,
          model: formData.model,
          owner: formData.owner,
          fuel: formData.fuel,
          kilometers: formData.kilometers,
          original: formData.original,
          tyre: formData.tyre,
          interior: formData.interior,
          engine: formData.engine,
          images: imageIds, // Send image IDs to Strapi
        },
      };

      const response = await fetch(
        "https://radiant-fellowship-7fbb005f57.strapiapp.com/api/car-data-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Form submission failed! Status: ${response.status}`);
      }

      await response.json();
      toast.success("Your Data submitted successfully");

      // Reset form state
      setFormData({
        images: [],
        name: "",
        number: "",
        car: "",
        price: "",
        model: "",
        owner: "",
        fuel: "",
        kilometers: "",
        original: "",
        tyre: "",
        interior: "",
        engine: "",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="py-8 md:py-12 px-5 relative">
      <div
        id="car-details-form"
        className="absolute -top-0 sm:-top-14 left-0"
      ></div>
      <ToastContainer position="top-right" transition={Slide} />
      <div className="container mx-auto border shadow-md bg-white max-w-[1180px] px-5 py-6 rounded-lg">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4 md:mb-6">
          Car <span className="text-[#ff5e00]">Details</span> Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <CommonInput
            id="name"
            placeholder="Enter Name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <CommonInput
            type="number"
            id="number"
            placeholder="Enter Phone Number"
            label="Phone"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="car"
            label="Car Name"
            placeholder="Enter Car Name"
            value={formData.car}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="price"
            type="number"
            label="Price"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="model"
            label="Model"
            type="number"
            placeholder="Enter Model"
            value={formData.model}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="owner"
            label="Owner"
            options={["1st", "2nd", "3rd"]}
            value={formData.owner}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="fuel"
            label="Fuel Type"
            options={["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG"]}
            value={formData.fuel}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="kilometers"
            type="number"
            placeholder="Enter Kilometers"
            label="Kilometers Driven"
            value={formData.kilometers}
            onChange={handleChange}
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
            value={formData.original}
            onChange={handleChange}
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
            value={formData.tyre}
            onChange={handleChange}
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
            value={formData.interior}
            onChange={handleChange}
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
            value={formData.engine}
            onChange={handleChange}
            required
          />

          {/* File Upload */}
          <div>
            <label
              htmlFor="upload-file"
              className="text-sm font-medium cursor-pointer border h-full py-2 flex items-center justify-center rounded"
            >
              Upload Images
            </label>
            <input
              type="file"
              id="upload-file"
              multiple
              required
              accept="image/*"
              onChange={handleFileChange}
              onClick={(e) => (e.target.value = null)}
              className="hidden"
              ref={fileInputRef}
            />
          </div>

          <Cta type="submit" className="!text-sm">
            Submit
          </Cta>
        </form>
        {/* Image Preview */}
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-8 gap-2 mt-3">
          {formData.images.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-20 sm:h-24 border rounded"
            >
              <span
                onClick={() => {
                  const updatedImages = formData.images.filter(
                    (_, i) => i !== index
                  );
                  setFormData((prevData) => ({
                    ...prevData,
                    images: updatedImages,
                  }));
                }}
                className="border bg-white rounded-full size-5 flex justify-center items-center absolute top-1 end-1 translate-x-1/2 -translate-y-1/2 z-[1] cursor-pointer text-sm"
              >
                <Image
                  src="/assets/images/svg/close-icon.svg"
                  alt="close"
                  width={10}
                  height={10}
                  className="pointer-events-none"
                />
              </span>
              <Image
                src={URL.createObjectURL(image)} // Create object URL for preview
                alt={`Uploaded ${index + 1}`}
                layout="fill"
                className="rounded w-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <CustomPopup
          handleConfirm={handleConfirm}
          setShowPopup={setShowPopup}
        />
      )}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black z-50 flex justify-center items-center bg-opacity-50">
          <div className="loader mt-4"></div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsForm;
