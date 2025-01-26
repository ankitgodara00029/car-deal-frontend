import React from "react";
import Hero from "../home/Hero";
import CardsData from "../home/CardsData";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CardsData />
      <ContactUs />
      <Faq />
    </div>
  );
};

export default HomePage;
