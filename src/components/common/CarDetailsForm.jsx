"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import CommonInput from "./CommonInput";
import CommonSelect from "./CommonSelect";
import Cta from "./Cta";

const CarDetailsForm = () => {
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
    setFormData({ ...formData, [id]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...imageUrls],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    // Add async keyword
    e.preventDefault();

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
      },
    };

    try {
      const response = await fetch("http://localhost:1337/api/car-data-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();

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
        fileInputRef.current.value = ""; // Reset file input
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="py-8 md:py-12 px-5 relative">
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
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="number"
            label="Phone"
            placeholder="Enter your Number"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="car"
            label="Car Name"
            placeholder="Enter car name"
            value={formData.car}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="price"
            type="number"
            label="Price"
            placeholder="Enter car price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="model"
            label="Model"
            type="number"
            placeholder="Enter car model"
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
            options={["Petrol", "Diesel", "Electric", "Hybrid"]}
            value={formData.fuel}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="kilometers"
            type="number"
            label="Kilometers Driven"
            placeholder="Enter kilometers driven"
            value={formData.kilometers}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="original"
            label="Original Condition (%)"
            options={["40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
            value={formData.original}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="tyre"
            label="Tyre Condition (%)"
            options={["40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
            value={formData.tyre}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="interior"
            label="Interior Condition"
            options={["40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
            value={formData.interior}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="engine"
            label="Engine Condition"
            options={["40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
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
              accept="image/*"
              onChange={handleFileChange}
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
              <Image
                src={image}
                alt={`Uploaded ${index + 1}`}
                layout="fill"
                className="rounded w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDetailsForm;
