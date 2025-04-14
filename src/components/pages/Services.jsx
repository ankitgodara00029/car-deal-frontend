import { SERVICES_LIST } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import Hero from "../home/Hero";

const Services = () => {
  return (
    <>
      <Hero
        title={
          <>
            Our Services Your
            <span className="text-[#ff5e00]"> One-Stop</span> Car Marketplace
          </>
        }
        description="We offer a range of services to make buying and selling cars safe, easy, and hassle-free. Whether you’re looking for a new ride or selling your old one, we’ve got you covered!"
      />
      <div className="container mx-auto max-w-[1180px] px-5 pt-8 md:pt-10">
        <div className="bg-white w-full py-3 px-3 font-semibold text-sm shadow flex items-center">
          <h3 className="text-lg md:font-semibold text-gray-800 leading-tight">
            Top Services
          </h3>
        </div>
        <div className="grid gap-2 sm:gap-3 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-4">
          {SERVICES_LIST.map((obj, index) => {
            return ( 
              <Link
                // href={`/?service=${obj.title
                //   .toLowerCase()
                //   .replace(/\s+/g, "-")}`}
                href="/"
                key={index}
              >
                <div className="bg-white border shadow-md hover:shadow-xl duration-300 h-full">
                  <Image
                    src={obj.image}
                    alt={obj.title}
                    width={100}
                    height={100}
                    sizes="100vw"
                    className="w-full object-cover h-[70px] sm:h-[90px] md:h-[100px] lg:h-[110px]"
                  />
                  <div className="py-1 md:py-2 text-center border-t">
                    <p className="text-xs sm:text-sm lg:text-base font-semibold">
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
