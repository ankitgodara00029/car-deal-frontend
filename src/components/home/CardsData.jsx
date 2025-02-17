"use client";
import { CARD_DATA_LIST } from "@/utils/helper";
import Image from "next/image";
import Cta from "../common/Cta";
import Icons from "../common/Icons";
import { useState } from "react";
import NotFoundData from "../common/NotFoundData";

const CardsData = ({ showData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // const filteredCards = CARD_DATA_LIST.filter(
  //   (obj) =>
  //     obj.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     obj.carModel.toString().toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredCards = showData?.data?.filter((obj) =>
    Object.values(obj).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="min-w-10 md:min-w-[53px] bg-[#ff5e00] flex items-center justify-center border-s border-grey-200">
          <Icons icon="search-icon" />
        </button>
      </div>
      {filteredCards?.length > 0 ? (
        <>
          <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {filteredCards?.map((obj, index) => {
              return (
                <div
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-all ease-in-out duration-300 max-sm:max-w-[380px] max-sm:w-full max-sm:mx-auto"
                  key={index}
                >
                  <div className="h-[240px] lg:h-[210px] xl:h-[250px] flex items-center border-b overflow-hidden">
                    <img
                      // src={`http://localhost:1337${obj?.images[0].url}`}
                      src="/assets/images/webp/alto.webp"
                      alt="scorpio"
                      width={300}
                      height={300}
                      className="w-full object-cover"
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
                    <Cta url={`${index}`}>View Complete Details</Cta>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <NotFoundData />
      )}
    </div>
  );
};

export default CardsData;
