import { CARD_DATA_LIST } from "@/utils/helper";
import Image from "next/image";
import Cta from "../common/Cta";

const CardsData = () => {
  return (
    <div className="container mx-auto max-w-[1180px] px-5 py-8 md:py-10">
      <div className="bg-white w-full py-3 px-3 font-semibold text-sm shadow flex items-center">
        <h3 className="text-lg md:font-semibold text-gray-800 leading-tight">
          Latest Cars
        </h3>
      </div>
      <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
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

export default CardsData;
