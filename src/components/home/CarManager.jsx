"use client";
import { useState } from "react";
import CarForm from "./CarForm";
import { useUser } from "@clerk/nextjs";

export default function CarManager({ initialCars }) {
  const { user } = useUser();
  const [cars, setCars] = useState(initialCars);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCarSubmit = async (carData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Separate image files from the rest of carData
      const { images, ...rest } = { ...carData, userId: user.id };
      formData.append("carData", JSON.stringify(rest));

      if (images && images.length > 0) {
        for (const file of images) {
          formData.append("images", file);
        }
      }

      const res = await fetch("/api/post-car", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to post car");
      }

      const result = await res.json();
      setCars([result, ...cars]);
    } catch (error) {
      console.error("Error submitting car:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <CarForm onSubmit={handleCarSubmit} isSubmitting={isSubmitting} />;
}
