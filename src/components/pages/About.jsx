import React from "react";
import Hero from "../home/Hero";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import CarDetailsForm from "../common/CarDetailsForm";

const About = () => {
  return (
    <div>
      <Hero />
      <CarDetailsForm />
      <ContactUs />
      <Faq />
    </div>
  );
};

export default About;
