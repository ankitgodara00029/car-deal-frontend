"use client";
import { usePathname } from "next/navigation";
import Cta from "./Cta";

const ContactUs = () => {
  const pathName = usePathname();
  return (
    <div className="px-5 py-8 md:py-12">
      <div className="container mx-auto bg-[#ff5e00] max-w-[1180px] px-5 py-8 md:py-12 rounded-xl text-center">
        <h3 className="text-3xl sm:text-4xl font-semibold text-white max-sm:max-w-[240px] max-sm:mx-auto">
          {pathName !== "/about-us" ? "Get in Touch with Us" : "Join Us Today!"}
        </h3>
        <p className="text-white text-sm sm:text-base max-w-[500px] mx-auto pt-3 pb-4 sm:pb-6">
          {pathName !== "/about-us"
            ? "Have questions about buying or selling a car? We're here to help! Reach out to us for support, inquiries, or feedback, and we'll get back to you as soon as possible"
            : "Whether you’re a car enthusiast, a first-time buyer, or someone looking to sell their vehicle, we’re here to make the process smooth and stress-free. Start your journey with us today!"}
        </p>
        <Cta
          url="tel:9999999999"
          className="!w-[125px] mx-auto sm:!w-[136px] bg-white !text-[#ff5e00] px-5 !border !border-white hover:!bg-[#ff5e00] hover:!text-white"
        >
          Call Us Now
        </Cta>
      </div>
    </div>
  );
};

export default ContactUs;
