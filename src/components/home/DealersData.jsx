"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/utils/sanity";
import Cta from "../common/Cta";
import Icons from "../common/Icons";

const DealersData = ({ initialDealers = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);

  const handleSeeMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setLoading(false);
    }, 2000);
  };

  const filteredDealers = initialDealers.filter((dealer) =>
    Object.values(dealer).some(
      (val) =>
        val != null &&
        val.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="max-w-[1180px] mx-auto px-5 py-8 md:py-10">
      <div className="bg-white w-full py-3 px-3 font-semibold text-sm shadow flex items-center">
        <h3 className="text-lg md:font-semibold text-gray-800 leading-tight">
          Latest Car Dealers
        </h3>
      </div>
      <div className="bg-light-grey border border-grey-200 rounded-lg flex overflow-hidden mt-5">
        <input
          className="outline-none text-black text-base !leading-150 bg-transparent py-2 md:py-3 px-4 md:px-6 w-full"
          type="search"
          placeholder="Search dealers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="min-w-10 md:min-w-[53px] bg-[#ff5e00] flex items-center justify-center border-s border-grey-200">
          <Icons icon="search-icon" />
        </button>
      </div>

      {filteredDealers.length === 0 ? (
        <div className="py-16 text-center text-gray-500">No dealers found.</div>
      ) : (
        <>
          <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {filteredDealers.slice(0, visibleCount).map((dealer) => (
              <div
                key={dealer._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-all ease-in-out duration-300 max-sm:max-w-[380px] max-sm:w-full max-sm:mx-auto"
              >
                <div className="h-[220px] lg:h-[210px] xl:h-[250px] flex items-center border-b overflow-hidden">
                  {dealer.image ? (
                    <Image
                      src={urlFor(dealer.image).width(400).height(300).url()}
                      alt={dealer.businessName || "dealer"}
                      width={400}
                      height={300}
                      className="w-full object-cover pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4 space-y-2">
                  <h2 className="font-bold text-xl line-clamp-1">
                    {dealer.businessName}
                  </h2>
                  <p className="text-base">
                    <strong>Dealer:</strong> {dealer.name}
                  </p>
                  <p className="text-base">
                    <strong>Contact:</strong>{" "}
                    <Link
                      href={`tel:${dealer.phone}`}
                      className="text-blue-600"
                    >
                      {dealer.phone}
                    </Link>
                  </p>
                  <p className="text-base pb-3">
                    <strong>Address:</strong> {dealer.address}
                  </p>
                  <Cta url="/">View Dealer Cars</Cta>
                </div>
              </div>
            ))}
          </div>
          {visibleCount < filteredDealers.length && (
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
      )}
    </div>
  );
};

export default DealersData;
