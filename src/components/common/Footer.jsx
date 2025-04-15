import Image from "next/image";
import Link from "next/link";
import Icons from "./Icons";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-[#1f2937]">
      <div className="container max-w-[1164px] px-3 mx-auto flex justify-between flex-wrap pb-12 pt-16 gap-y-9">
        <div className="w-full sm:w-9/12 lg:w-5/12">
          <Link
            href="/"
            rel="noopener noreferrer"
            aria-label="ak-logo"
            className="text-white text-xl sm:text-2xl inline-block"
          >
            <Image
              src="/assets/images/svg/logo.svg"
              alt="logo"
              width={90}
              height={50}
              className="w-[70px] md:w-[90px] pointer-events-none"
            />
          </Link>
          <p className="text-white opacity-70 !leading-[150%] mt-3 text-sm max-w-[320px]">
            We are dedicated to connecting buyers and sellers for a seamless car
            trading experience. Whether you’re looking to sell your car or find
            your dream ride, we’re here to help.
          </p>
        </div>
        <div className="w-4/12 lg:w-2/12 text-white">
          <ul className="flex flex-col gap-3 lg:gap-4">
            <li>Links</li>
            <li>
              <Link
                rel="noopener noreferrer"
                aria-label="links"
                href="/"
                className="text-white opacity-70 hover:opacity-100 transition-all ease-in-out duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                aria-label="links"
                href="/about-us"
                className="text-white opacity-70 hover:opacity-100 transition-all ease-in-out duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                aria-label="links"
                href="/our-services"
                className="text-white opacity-70 hover:opacity-100 transition-all ease-in-out duration-300"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                aria-label="links"
                href="/post-your-car"
                className="text-white opacity-70 hover:opacity-100 transition-all ease-in-out duration-300"
              >
                Post Your Car
              </Link>
            </li>
          </ul>
        </div>
        <div className="4/12 lg:w-2/12 text-white">
          <ul className="flex flex-col gap-3 lg:gap-4">
            <li>Legal</li>
            <li>
              <Link
                rel="noopener noreferrer"
                aria-label="links"
                href="/privacy-policy"
                className="text-white opacity-70 hover:opacity-100 transition-all ease-in-out duration-300"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                aria-label="links"
                href="/terms-conditions"
                className="text-white opacity-70 hover:opacity-100 transition-all ease-in-out duration-300"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div className="4/12 lg:w-3/12">
          <p className="text-white text-base">Join our community</p>
          <div className="flex gap-3 mt-3 lg:mt-4">
            <Link
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="links"
              className="hover:scale-[1.07] transition-all duration-300 ease-in-out"
            >
              <Icons icon="instagram-icon" />
            </Link>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="links"
              className="hover:scale-[1.07] transition-all duration-300 ease-in-out"
            >
              <Icons icon="facebook-icon" />
            </Link>
            <Link
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="links"
              className="hover:scale-[1.07] transition-all duration-300 ease-in-out"
            >
              <Icons icon="twitter-icon" />
            </Link>
          </div>
          <ul className="flex flex-col gap-2 mt-4 lg:mt-6">
            <li className="text-white text-base">Contact Us</li>
            <li>
              <Link
                href="tel:9588546573"
                className="text-white opacity-70 hover:opacity-100 transition-all ease-in-out duration-300"
              >
                +919588546573
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                aria-label="links"
                target="_blank"
                href="mailto:ak.technical.co@gmail.com"
                className="text-white opacity-70 hover:opacity-100 transition-all ease-in-out duration-300"
              >
                car-deal0029@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-t-white py-5 border-opacity-40 text-center text-sm md:text-base text-white">
        Copyright {currentYear} car-deal.shop. All Right reserved
      </div>
    </div>
  );
};

export default Footer;
