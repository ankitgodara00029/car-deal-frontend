"use client";
import { NAV_LIST } from "@/utils/helper";
import Link from "next/link";
import Cta from "./Cta";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathname = usePathname();

  const phoneNumber = "+919992911029";
  const message = "Hello, I would like to know more about your services!";
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#1f2937] py-3 md:py-4 md:sticky top-0 z-10">
      <div className="container mx-auto max-w-[1180px] px-5 flex justify-between items-center">
        <Link href="/" className="text-white text-xl">
          Logo
        </Link>
        <ul
          className={`flex gap-3 sm:gap-6 items-center max-md:justify-between max-md:pe-5 max-md:fixed max-md:bottom-0 z-30 max-md:w-full start-0 max-md:bg-[#1f2937] max-md:items-start max-md:ps-6 max-md:py-3 transition-all duration-300`}
        >
          {NAV_LIST.map((obj, index) => {
            const basePath = obj.url.split("?")[0];
            const isActive = pathname === basePath;
            return (
              <li key={index}>
                <Link
                  href={obj.url}
                  className={`text-white font-medium transition-all text-sm sm:text-base duration-300 ${
                    isActive ? "!text-[#ff5e00]" : "hover:text-[#ff5e00]"
                  }`}
                >
                  {obj.link}
                </Link>
              </li>
            );
          })}
        </ul>
        <Cta
          onClick={handleWhatsAppClick}
          className="bg-transparent !w-auto !text-[#ff5e00] py-2 px-6 hover:!bg-[#ff5e00] hover:!text-white"
        >
          Call Whatsapp
        </Cta>
      </div>
    </div>
  );
};

export default Header;
