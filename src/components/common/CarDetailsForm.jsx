"use client";
import { CARD_DATA_LIST } from "@/utils/helper";
import Image from "next/image";
import { useRef, useState } from "react";
import CommonInput from "./CommonInput";
import CommonSelect from "./CommonSelect";
import Cta from "./Cta";
const CarDetailsForm = () => {
  const [formData, setFormData] = useState({
    image: [],
    name: "",
    phone: "",
    carName: "",
    carPrice: "",
    carModel: "",
    carOwner: "",
    carFuel: "",
    carKms: "",
    carOriginal: "",
    carTyreCondition: "",
    carInteriorCondition: "",
    carEngineCondition: "",
  });

  const fileInputRef = useRef(null);
  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      image: [...imageUrls],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    CARD_DATA_LIST.push(formData);
    alert("Form submitted successfully!");
    // Clear the form data
    setFormData({
      image: [],
      name: "",
      phone: "",
      carName: "",
      carPrice: "",
      carModel: "",
      carOwner: "",
      carFuel: "",
      carKms: "",
      carOriginal: "",
      carTyreCondition: "",
      carInteriorCondition: "",
      carEngineCondition: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="py-8 md:py-12 px-5 relative">
      <div
        className="absolute -top-6 md:-top-12 -z-[20]"
        id="car-details-form"
      ></div>
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
            id="phone"
            label="Phone"
            placeholder="Enter your Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="carName"
            label="Car Name"
            placeholder="Enter car name"
            value={formData.carName}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="carPrice"
            type="number"
            label="Price"
            placeholder="Enter car price"
            value={formData.carPrice}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="carModel"
            label="Model"
            type="number"
            placeholder="Enter car model"
            value={formData.carModel}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="carOwner"
            label="Owner"
            options={["1st", "2nd", "3rd"]}
            value={formData.carOwner}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="carFuel"
            label="Fuel Type"
            options={["Petrol", "Diesel", "Electric", "Hybrid"]}
            value={formData.carFuel}
            onChange={handleChange}
            required
          />
          <CommonInput
            id="carKms"
            type="number"
            label="Kilometers Driven"
            placeholder="Enter kilometers driven"
            value={formData.carKms}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="carOriginal"
            label="Original Condition (%)"
            options={["40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
            value={formData.carOriginal}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="carTyreCondition"
            label="Tyre Condition (%)"
            options={["40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
            value={formData.carTyreCondition}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="carInteriorCondition"
            label="Interior Condition"
            options={["40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
            value={formData.carInteriorCondition}
            onChange={handleChange}
            required
          />
          <CommonSelect
            id="carEngineCondition"
            label="Engine Condition"
            options={["40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
            value={formData.carEngineCondition}
            onChange={handleChange}
            required
          />
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
              required
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef} // Attach the ref to the input
            />
          </div>
          <Cta type="submit" className="!text-sm">
            Submit
          </Cta>
        </form>
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-8 gap-2 mt-3">
          {formData.image.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-20 sm:h-24 border rounded"
            >
              <Image
                src={image}
                alt={`Uploaded ${index + 1}`}
                layout="fill"
                className="rounded w-full"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 max-w-[1180px] mx-auto">
        {CARD_DATA_LIST.map((obj, index) => {
          return (
            <div
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-all ease-in-out duration-300 max-sm:max-w-[380px] max-sm:w-full max-sm:mx-auto"
              key={index}
            >
              <div className="h-[240px] lg:h-[210px] xl:h-[250px] flex items-center border-b overflow-hidden">
                <Image
                  src={obj.image[0]}
                  alt="scorpio"
                  width={300}
                  height={300}
                  className="w-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h2 className="pb-2 font-bold text-xl sm:text-2xl line-clamp-1">
                  {obj.carName} {index + 1}
                </h2>
                <div className="flex justify-between pb-1">
                  <p className="text-base sm:text-lg">₹ {obj.carPrice}</p>
                  <p className="text-base sm:text-lg">Model {obj.carModel}</p>
                </div>
                <p className="text-base sm:text-lg pb-3">Fuel {obj.carFuel}</p>
                <Cta url={`/${index}`}>View Complete Details</Cta>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarDetailsForm;
