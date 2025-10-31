"use client";
import { Suspense } from "react";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import CardsData from "../home/CardsData";
import Hero from "../home/Hero";

const HomeSatiny = ({ initialCars }) => {
  return (
    <>
      <Hero
        title={
          <>
            Your Trusted <br />
            <span className="text-[#ff5e00]">Marketplace</span> for Cars!
          </>
        }
        description="Find the perfect car or sell yours at the best price—all in one place."
      />
      <Suspense fallback={<div>Loading...</div>}>
        <CardsData initialCars={initialCars} />
      </Suspense>
      <ContactUs />
      <Faq />
    </>
  );
};

export default HomeSatiny;
