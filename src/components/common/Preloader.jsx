"use client";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsPreloaderVisible(false);
    }, 3500);
    if (isPreloaderVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  });

  return (
    <>
      {isPreloaderVisible && (
        <div
          className={`w-full min-h-screen flex items-center justify-center fixed start-0 top-0 z-[999] bg-[#1f2937]`}
        >
          <p className="text-white text-[32px] sm:text-5xl font-bold preloader"></p>
        </div>
      )}
    </>
  );
};

export default Preloader;
