"use client";
import { CARD_DATA_LIST } from "@/utils/helper";
import { useParams } from "next/navigation";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import ThemeSlider from "./ThemeSlider";
import Cta from "../common/Cta";

const DetailsPages = () => {
  let { id } = useParams();
  const car = CARD_DATA_LIST.find((_, index) => index === parseInt(id));
  if (!car) {
    return <p>Car not found!</p>;
  }
  const downloadImage = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `car_image_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    if (!car.image || car.image.length === 0) return;
    car.image.forEach((imgUrl, index) => {
      downloadImage(imgUrl, index);
    });
  };
  return (
    <>
      <div className="container mx-auto max-w-[1180px] px-5 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ThemeSlider imageData={car.image} />
          </div>
          <div className="shadow-lg rounded-xl py-4 sm:py-6 border">
            <h2 className="text-2xl sm:text-3xl font-semibold px-4 sm:px-6">
              {car.carName}
            </h2>
            <div className="mt-4">
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Price:</span> <span>₹{car.carPrice}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Model:</span> <span>{car.carModel}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Owner:</span> <span>{car.carOwner}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Fuel Type:</span> <span>{car.carFuel}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Kilometers Driven:</span> <span>{car.carKms}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Original:</span> <span>{car.carOriginal}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Tyre Condition:</span> <span>{car.carTyreCondition}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Interior Condition:</span>
                <span>{car.carInteriorCondition}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between border-t border-b py-2 px-4 sm:px-6">
                <span>Engine Condition:</span>
                <span>{car.carEngineCondition}</span>
              </p>
              <p className="text-base md:text-lg leading-[120%] text-black flex justify-between pt-2 px-4 sm:px-6">
                <span>Download Photo:</span>
                <Cta
                  onClick={handleDownloadAll}
                  className="!px-4 !py-1 !w-auto"
                >
                  Download All
                </Cta>
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
