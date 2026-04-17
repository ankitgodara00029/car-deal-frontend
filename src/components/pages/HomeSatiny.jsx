"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import CardsData from "../home/CardsData";
import Hero from "../home/Hero";
import DealersData from "../home/DealersData";

const TABS = ["Cars", "Dealers"];

const HomeSatiny = ({ initialCars = [], initialDealers = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get tab from URL
  const queryTab = searchParams.get("category");
  const defaultTab = queryTab?.toLowerCase() === "dealers" ? "Dealers" : "Cars";

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [cars, setCars] = useState(initialCars);
  const [dealers, setDealers] = useState(initialDealers);
  const [loading, setLoading] = useState(false);

  // 🔥 Handle tab change + URL update
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`/?category=${tab.toLowerCase()}`, { scroll: false });
  };

  // 🔥 Fetch data on tab change
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Prevent unnecessary API calls
        if (activeTab === "Cars" && cars.length > 0) return;
        if (activeTab === "Dealers" && dealers.length > 0) return;

        setLoading(true);

        if (activeTab === "Cars") {
          const res = await fetch("/api/cars");
          const data = await res.json();
          setCars(data);
        } else {
          const res = await fetch("/api/dealers");
          const data = await res.json();
          setDealers(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <>
      {/* Hero */}
      <Hero
        title={
          <>
            Your Trusted <br />
            <span className="text-[#ff5e00]">Marketplace</span> for Cars!
          </>
        }
        description="Find the perfect car or sell yours at the best price—all in one place."
      />

      {/* Tabs */}
      <div className="max-w-[1180px] mx-auto px-5 mt-8">
        <div className="flex border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-3 text-base font-semibold transition-colors duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-[#ff5e00] text-[#ff5e00]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1180px] mx-auto px-5">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : activeTab === "Cars" ? (
          <Suspense fallback={<div>Loading...</div>}>
            <CardsData initialCars={cars} />
          </Suspense>
        ) : (
          <DealersData initialDealers={dealers} />
        )}
      </div>

      <ContactUs />
      <Faq />
    </>
  );
};

export default HomeSatiny;
