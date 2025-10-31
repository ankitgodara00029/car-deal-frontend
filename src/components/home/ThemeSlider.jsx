"use client";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { EffectFade, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import LIGHTBOX
import { SlideshowLightbox } from "lightbox.js-react";
import { urlFor } from "@/utils/sanity";
const ThemeSlider = ({ imageData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageClick = (images) => {
    setSelectedImages(
      images
        .filter((obj) => obj && obj._type === "image") // Filter out invalid objects
        .map((obj) => ({
          src: urlFor(obj).width(800).url(),
        }))
    );
    setIsOpen(true);
  };

  console.log(imageData, "imageDataimageData");

  // Filter valid images
  const validImages =
    imageData?.filter((obj) => obj && obj._type === "image") || [];

  // If no valid images, show placeholder
  if (validImages.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg h-[270px] sm:h-[400px] md:h-[500px] lg:h-[428px] xl:h-[450px] border border-black border-opacity-10 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        effect={"fade"}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, EffectFade, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {validImages.map((obj, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg overflow-hidden relative h-[270px] sm:h-[400px] md:h-[500px] lg:h-[428px] xl:h-[450px] border border-black border-opacity-10 flex items-center justify-center cursor-pointer">
                <img
                  src={urlFor(obj).width(800).url()}
                  alt="theme"
                  className="w-full"
                  width={500}
                  height={500}
                  onClick={() => handleImageClick(validImages)}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-2"
      >
        {validImages.map((obj, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-md overflow-hidden border border-black border-opacity-10 flex items-center justify-center cursor-pointer h-[42px] sm:h-[70px] md:h-[93px] lg:h-[60px] xl:h-[90px]">
                <img
                  src={urlFor(obj).width(800).url()}
                  alt="theme"
                  className="w-full"
                  width={90}
                  height={90}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <SlideshowLightbox
        images={selectedImages}
        showThumbnails={true}
        open={isOpen}
        lightboxIdentifier="lbox1"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default ThemeSlider;
