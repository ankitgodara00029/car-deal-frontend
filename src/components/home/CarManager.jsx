"use client";
import { client, generateUniqueKey } from "@/utils/sanity";
import { useState } from "react";
import CarForm from "./CarForm";

export default function CarManager({ initialCars }) {
  const [cars, setCars] = useState(initialCars);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCarSubmit = async (carData) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting car data:", carData);
      console.log("Sanity client config:", {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        hasToken: !!process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
      });

      let processedCarData = { ...carData };

      // Handle image uploads if there are any
      if (carData.images && carData.images.length > 0) {
        console.log("Uploading images to Sanity...");
        const uploadedImages = [];

        for (const imageFile of carData.images) {
          try {
            // Upload each image to Sanity
            const imageAsset = await client.assets.upload("image", imageFile, {
              filename: imageFile.name,
            });

            // Create image reference with required _key
            uploadedImages.push({
              _type: "image",
              _key: generateUniqueKey("image"), // Generate unique key
              asset: {
                _type: "reference",
                _ref: imageAsset._id,
              },
            });
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
            throw new Error(`Failed to upload image: ${imageFile.name}`);
          }
        }

        processedCarData.images = uploadedImages;
        console.log("Images uploaded successfully:", uploadedImages);
      } else {
        // If no images, set empty array
        processedCarData.images = [];
      }

      // Create the car document in Sanity
      const result = await client.create({
        _type: "car",
        ...processedCarData,
      });

      console.log("Car submitted successfully:", result);

      // Add the new car to the local state
      setCars([result, ...cars]);
    } catch (error) {
      console.error("Detailed error:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);

      let errorMessage = "Error submitting car. ";
      if (error.message.includes("Insufficient permissions")) {
        errorMessage += "Check your Sanity write token permissions.";
      } else if (error.message.includes("Request error")) {
        errorMessage += "Check your Sanity project ID and dataset name.";
      } else if (error.message.includes("Failed to upload image")) {
        errorMessage += error.message;
      } else {
        errorMessage += error.message;
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <CarForm onSubmit={handleCarSubmit} />
    </>
  );
}
