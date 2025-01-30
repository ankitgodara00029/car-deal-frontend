import Cta from "../common/Cta";

const Hero = () => {
  return (
    <div className="bg-[url('/assets/images/webp/hero-bg-image.webp')] bg-cover bg-center h-[300px] md:h-[400px]">
      <div className="container mx-auto max-w-[1180px] px-5 flex items-center h-full">
        <div className="max-w-[330px] sm:max-w-[400px] lg:max-w-[600px]">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold !leading-[130%]">
            Your Trusted <span className="text-[#ff5e00]">Marketplace </span>
            for Cars!
          </h1>
          <p className="text-white text-base lg:text-lg pt-2 sm:pt-3 pb-4 sm:pb-6">
            Find the perfect car or get the right buyers—all in one place.
          </p>
          <Cta
            url="/contact#car-details-form"
            className="!w-auto inline-block px-3 sm:px-5"
          >
            Add New Car
          </Cta>
        </div>
      </div>
    </div>
  );
};

export default Hero;
