import { SERVICES_LIST } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Hero from "../home/Hero";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";

const Services = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto max-w-[1180px] px-5 pt-8 md:pt-10">
        <div className="bg-white w-full py-3 px-3 font-semibold text-sm shadow flex items-center">
          <h3 className="text-lg md:font-semibold text-gray-800 leading-tight">
            Top Services
          </h3>
        </div>
        <div className="grid gap-2 sm:gap-3 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-4">
          {SERVICES_LIST.map((obj, index) => {
            return (
              <Link href="#" key={index}>
                <div className="bg-white border shadow-md hover:shadow-xl duration-300">
                  <Image
                    src={obj.image}
                    alt="services"
                    width={100}
                    height={100}
                    className="w-full object-cover h-[70px] sm:h-[90px] md:h-[100px] lg:h-[110px]"
                  />
                  <div className="py-1 md:py-2 text-center border-t">
                    <p className="text-sm lg:text-base font-semibold">
                      {obj.title}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <ContactUs />
      <Faq />
    </>
  );
};

export default Services;
