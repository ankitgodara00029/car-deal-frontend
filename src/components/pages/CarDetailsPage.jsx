import CarDetailsForm from "../common/CarDetailsForm";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import Hero from "../home/Hero";

const CarDetailsPage = () => {
  return (
    <>
      <Hero
        title={
          <>
            Post Your Car <br />
            <span className="text-[#ff5e00]">Sell in Minutes!</span>
          </>
        }
        description="Selling your car has never been easier! List your vehicle in just a few simple steps and connect with genuine buyers."
      />
      <CarDetailsForm />
      <ContactUs />
      <Faq />
    </>
  );
};

export default CarDetailsPage;
