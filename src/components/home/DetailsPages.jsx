"use client";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import NotFoundData from "../common/NotFoundData";
import ThemeSlider from "./ThemeSlider";

const DetailsPages = () => {
  const pathname = usePathname();
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "http://localhost:1337/api/car-data-form?populate=images",
          {
            method: "GET",
          }
        );
        const result = await data.json();
        setShowData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // const interval = setInterval(fetchData, 1000);
    // return () => clearInterval(interval);
  }, []);
  let { id } = useParams();
  const car = showData?.data?.find((_, index) => index === parseInt(id));
  if (!car) {
    return <NotFoundData />;
  }

  //
  const phoneNumber = "+919992911029";
  const message = `https://car-sell-alpha.vercel.app${pathname}`;
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <div className="container mx-auto max-w-[1180px] px-5 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ThemeSlider imageData={car?.images} />
          </div>
          <div className="shadow-lg rounded-xl py-4 sm:py-5 border">
            <h2 className="text-2xl sm:text-2xl font-semibold px-4 sm:px-6 flex justify-between items-center">
              {car.car} <button onClick={handleWhatsAppClick} className="text-sm">{"Copy"}</button>
            </h2>
            <div className="mt-3">
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Price:</span> <span>₹{car.price}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Model:</span> <span>{car.model}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Owner:</span> <span>{car.owner}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Fuel Type:</span> <span>{car.fuel}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Kilometers Driven:</span> <span>{car.kilometers}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Original:</span> <span>{car.original}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Tyre Condition:</span> <span>{car.tyre}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Interior Condition:</span>
                <span>{car.interior}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Engine Condition:</span>
                <span>{car.engine}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContactUs />
      <Faq />
    </>
  );
};

export default DetailsPages;
