"use client";
import { useEffect, useState } from "react";
import Icons from "./Icons";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`size-10 md:size-12 cursor-pointer rounded-full border-2 border-white bg-[#ff5e00] duration-300 hover:scale-[1.05] shadow-header-btn fixed min-[1921px]:right-[calc((100vw-1880px)/2)] right-3 flex items-center justify-center group z-30 ${
        isVisible ? "scale-100 bottom-4" : "-bottom-16 scale-75"
      }`}
    >
      <Icons icon="backToTop" />
    </button>
  );
};

export default BackToTop;
