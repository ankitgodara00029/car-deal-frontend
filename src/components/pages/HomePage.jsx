"use client";
import { Suspense, useEffect, useState } from "react";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import CardsData from "../home/CardsData";
import Hero from "../home/Hero";

const HomePage = () => {
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://radiant-fellowship-7fbb005f57.strapiapp.com/api/car-data-form?populate=images",
          {
            method: "GET",
          }
        );
        const result = await data.json();
        setShowData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // const interval = setInterval(fetchData, 1000);
    // return () => clearInterval(interval);
  }, []);
  return (
    <div>
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
        <CardsData showData={showData} />
      </Suspense>
      <ContactUs />
      <Faq />
    </div>
  );
};

export default HomePage;
