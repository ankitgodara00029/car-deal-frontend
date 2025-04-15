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
const ThemeSlider = ({ imageData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageClick = (images) => {
    setSelectedImages(
      images.map((img) => ({
        src: `https://radiant-fellowship-7fbb005f57.media.strapiapp.com/${img.url}`,
      }))
    );
    setIsOpen(true);
  };
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
        {imageData?.map((obj, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg overflow-hidden relative h-[270px] sm:h-[400px] md:h-[500px] lg:h-[428px] xl:h-[450px] border border-black border-opacity-10 flex items-center justify-center cursor-pointer">
                <img
                  src={`https://radiant-fellowship-7fbb005f57.media.strapiapp.com/${obj.url}`}
                  alt="theme"
                  className="w-full"
                  width={500}
                  height={500}
                  onClick={() => handleImageClick(imageData)}
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
        {imageData?.map((obj, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-md overflow-hidden border border-black border-opacity-10 flex items-center justify-center cursor-pointer h-[42px] sm:h-[70px] md:h-[93px] lg:h-[60px] xl:h-[90px]">
                <img
                  src={`https://radiant-fellowship-7fbb005f57.media.strapiapp.com/${obj.url}`}
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
