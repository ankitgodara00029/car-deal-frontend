import Cta from "../common/Cta";
const Hero = ({ title, description }) => {
  return (
    <div className="bg-[url('/assets/images/webp/hero-bg-image.webp')] bg-cover bg-center h-[400px] lg:h-[550px]">
      <div className="container mx-auto max-w-[1180px] px-5 flex items-center h-full">
        <div className="max-w-[330px] sm:max-w-[500px] lg:max-w-[600px] max-lg:mx-auto max-lg:text-center">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-[44px] font-semibold !leading-[130%]">
            {title}
          </h1>
          <p className="text-white text-sm sm:text-base lg:text-lg pt-2 sm:pt-3 pb-4 sm:pb-6">
            {description}
          </p>
          <Cta
            url="/post-your-car#car-details-form"
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
