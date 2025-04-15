"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cta from "../common/Cta";
import Icons from "../common/Icons";
import NotFoundData from "../common/NotFoundData";

const CardsData = ({ showData }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const serviceValue = searchParams.get("service")?.toLowerCase() || ""; // Get service from query
  const [searchTerm, setSearchTerm] = useState(serviceValue);
  useEffect(() => {
    setSearchTerm(serviceValue);
  }, [serviceValue]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);

    // Create a new URLSearchParams instance to modify
    const params = new URLSearchParams(searchParams);

    if (newValue) {
      params.set("service", newValue);
    } else {
      params.delete("service");
    }

    // Push new URL with updated query
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredCards = showData?.data?.filter((obj) => {
    const matchesSearch = Object.values(obj).some(
      (value) =>
        value != null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    // If service query param exists, ensure obj has a matching service property
    const matchesService =
      serviceValue == null ||
      Object.values(obj).some(
        (value) =>
          value != null && value.toString().toLowerCase().includes(serviceValue)
      );

    return matchesSearch && matchesService;
  });
  // Function to show more items with a loading effect
  const handleSeeMore = () => {
    setLoading(true); // Start loader
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setLoading(false); // Stop loader after 2s
    }, 2000);
  };
  return (
    <div className="container mx-auto max-w-[1180px] px-5 py-8 md:py-10">
      <div className="bg-white w-full py-3 px-3 font-semibold text-sm shadow flex items-center">
        <h3 className="text-lg md:font-semibold text-gray-800 leading-tight">
          Latest Cars
        </h3>
      </div>
      <div className="bg-light-grey border border-grey-200 rounded-lg flex overflow-hidden mt-5">
        <input
          className="outline-none text-black text-base !leading-150 bg-transparent py-2 md:py-3 px-4 md:px-6 w-full"
          type="search"
          placeholder="What are you looking for..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="min-w-10 md:min-w-[53px] bg-[#ff5e00] flex items-center justify-center border-s border-grey-200">
          <Icons icon="search-icon" />
        </button>
      </div>
      {filteredCards?.length > 0 ? (
        <>
          <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {[...filteredCards]
              .sort(() => Math.random() - 0.5)
              .slice(0, visibleCount)
              .map((obj, index) => (
                <div
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-all ease-in-out duration-300 max-sm:max-w-[380px] max-sm:w-full max-sm:mx-auto"
                  key={index}
                >
                  <div className="h-[220px] lg:h-[210px] xl:h-[250px] flex items-center border-b overflow-hidden">
                    <img
                      src={
                        obj?.images?.[0]?.url
                          ? `https://radiant-fellowship-7fbb005f57.media.strapiapp.com/${obj.images[0].url}`
                          : "/assets/images/webp/alto.webp"
                      }
                      alt="scorpio"
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
                      <span
                        className="size-6 cursor-pointer"
                        onClick={() => {
                          if (navigator.share) {
                            navigator
                              .share({
                                title: "Check this out!",
                                text: "Here is the document ID you might need:",
                                url:
                                  window.location.origin + "/" + obj.documentId, // Adjust URL structure as needed
                              })
                              .catch((error) =>
                                console.error("Error sharing:", error)
                              );
                          } else {
                            navigator.clipboard.writeText(
                              window.location.origin + "/" + obj.documentId
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
                    </div>
                    <Cta url={`/${obj.documentId}`}>View Complete Details</Cta>
                  </div>
                </div>
              ))}
          </div>
          {visibleCount < filteredCards.length && (
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
        </>
      ) : (
        <NotFoundData />
      )}
    </div>
  );
};

export default CardsData;
