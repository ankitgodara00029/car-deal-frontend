import React from "react";
import CarDetailsForm from "../common/CarDetailsForm";
import Faq from "../common/Faq";
import ContactUs from "../common/ContactUs";
import Hero from "../home/Hero";

const CarDetailsPage = () => {
  return (
    <>
      <Hero />
      <CarDetailsForm />
      <ContactUs />
      <Faq />
    </>
  );
};

export default CarDetailsPage;
