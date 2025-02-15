"use client";
import { useEffect, useState } from "react";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import CardsData from "../home/CardsData";
import Hero from "../home/Hero";

const HomePage = () => {
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:1337/api/car-data-form?populate=images", {
          method: "GET",
        });
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
      <Hero />
      <CardsData showData={showData} />
      <ContactUs />
      <Faq />
    </div>
  );
};

export default HomePage;
