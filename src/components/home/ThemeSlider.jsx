"use client";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { EffectFade, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const ThemeSlider = ({ imageData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div>
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
        {imageData.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg overflow-hidden relative h-[270px] sm:h-[400px] md:h-[500px] lg:h-[400px] border border-black border-opacity-10 flex items-center justify-center">
                <Image
                  src={image}
                  alt="theme"
                  className="w-full"
                  width={500}
                  height={500}
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
        {imageData.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-md h-full overflow-hidden border border-black border-opacity-10 flex items-center justify-center">
                <Image
                  src={image}
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
    </div>
  );
};

export default ThemeSlider;
