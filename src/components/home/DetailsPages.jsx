"use client";
import { client, urlFor } from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cta from "../common/Cta";
import Icons from "../common/Icons";
import NotFoundData from "../common/NotFoundData";
import ThemeSlider from "./ThemeSlider";

const DetailsPages = () => {
  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setIsLoading(true);

        // Fetch the specific car by ID
        const carData = await client.fetch(
          `*[_type == "car" && _id == $id][0]{
            _id,
            name,
            number,
            car,
            price,
            model,
            owner,
            fuel,
            kilometers,
            original,
            tyre,
            interior,
            engine,
            images,
            _createdAt
          }`,
          { id }
        );

        if (carData) {
          setCar(carData);

          // Fetch similar cars (same car name, excluding current car)
          const similarCarsData = await client.fetch(
            `*[_type == "car" && car == $carName && _id != $id] | order(_createdAt desc){
              _id,
              name,
              number,
              car,
              price,
              model,
              owner,
              fuel,
              kilometers,
              original,
              tyre,
              interior,
              engine,
              images
            }`,
            { carName: carData.car, id }
          );

          setSimilarCars(similarCarsData);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCarData();
    }
  }, [id]);
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-[1180px] px-5 py-8 md:py-10">
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (!car) {
    return <NotFoundData />;
  }

  // SHARE DETAILS
  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in your ${car.car} ${car.model} listed for ₹${car.price}. Can you provide more details? ${window.location.href}`;
    const url = `https://wa.me/91${car.number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+91${car.number}`;
  };
  // Function to show more items with a loading effect
  const handleSeeMore = () => {
    setLoading(true); // Start loader
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setLoading(false); // Stop loader after 2s
    }, 2000);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + "/" + car?._id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      <div className="container mx-auto max-w-[1180px] px-5 py-8 md:py-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-black hover:text-[#ff5e00] mb-6"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Cars
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ThemeSlider imageData={car?.images} />
          </div>
          <div className="shadow-lg rounded-xl py-3 border">
            <h2 className="text-2xl sm:text-2xl font-semibold px-4 sm:px-6 flex justify-between items-center">
              {car.car}
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
                <span>Kilometers Driven:</span> <span>{car.kilometers} KM</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Original:</span> <span>{car.original}%</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Tyre Condition:</span> <span>{car.tyre}%</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Interior Condition:</span>
                <span>{car.interior}%</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Engine Condition:</span>
                <span>{car.engine}%</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Upload Date:</span>
                <span>
                  {new Date(car._createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </p>
              <div className="flex gap-4 items-center border-t pt-2 px-4 sm:px-6">
                <span className="cursor-pointer" onClick={handleWhatsAppClick}>
                  <Icons icon="whatsapp-icon" />
                </span>
                <span
                  className="cursor-pointer hover:scale-[1.1] duration-300"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: "Check this out!",
                          text: "Here is the document ID you might need:",
                          url: window.location.origin + "/" + car?.documentId,
                        })
                        .catch((error) =>
                          console.error("Error sharing:", error)
                        );
                    } else {
                      navigator.clipboard.writeText(
                        window.location.origin + "/" + car?.documentId
                      );
                      alert("Link copied to clipboard!");
                    }
                  }}
                >
                  <Image
                    src="/assets/images/svg/share-icon.svg"
                    alt="share"
                    width={24}
                    height={24}
                    className="w-full pointer-events-none"
                  />
                </span>
                <span className="cursor-pointer" onClick={handleCopy}>
                  <Icons icon={copied ? "copied-icon" : "copy-icon"} />
                </span>
              </div>
            </div>
          </div>
        </div>
            <div className="bg-white w-full py-3 px-3 font-semibold text-sm shadow flex items-center mt-12 sm:mt-16">
              <h3 className="text-lg md:font-semibold text-gray-800 leading-tight">
                Latest Cars {car?.car}
              </h3>
            </div>
            <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {similarCars.slice(0, visibleCount).map((obj, index) => (
                <div
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-all ease-in-out duration-300 max-sm:max-w-[380px] max-sm:w-full max-sm:mx-auto"
                  key={index}
                >
                  <div className="h-[220px] lg:h-[210px] xl:h-[250px] flex items-center border-b overflow-hidden">
                    <img
                      src={
                        obj?.images?.[0]?.asset
                          ? urlFor(obj.images[0]).width(400).height(300).url()
                          : "/assets/images/webp/alto.webp"
                      }
                      alt={obj.car || "car"}
                      width={300}
                      height={300}
                      className="w-full object-cover pointer-events-none"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h2 className="pb-2 font-bold text-xl sm:text-2xl line-clamp-1">
                      {obj.car}
                    </h2>
                    <div className="flex justify-between pb-1">
                      <p className="text-base sm:text-lg">₹ {obj.price}</p>
                      <p className="text-base sm:text-lg">Model: {obj.model}</p>
                    </div>
                    <div className="flex justify-between pb-3">
                      <p className="text-base sm:text-lg">Fuel: {obj.fuel}</p>
                    </div>
                    <Cta url={`/${obj._id}`}>View Complete Details</Cta>
                  </div>
                </div>
              ))}
            </div>
        {visibleCount < similarCars.length && (
          <div className="flex justify-center">
            {loading ? (
              <div className="loader mt-4"></div>
            ) : (
              <Cta
                className="!w-auto mx-auto mt-4 px-4"
                onClick={handleSeeMore}
              >
                See More
              </Cta>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsPages;
