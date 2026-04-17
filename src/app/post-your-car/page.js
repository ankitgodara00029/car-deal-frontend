export const dynamic = "force-dynamic";
import { Suspense } from "react";
import ContactUs from "@/components/common/ContactUs";
import Faq from "@/components/common/Faq";
import Hero from "@/components/home/Hero";
import PostTabs from "@/components/common/PostTabs";
import Loader from "@/components/common/Loader";
import { client } from "@/utils/sanity";

export const metadata = {
  metadataBase: "https://car-deals.vercel.app/",
  title: "Post Your Car Sell in Minutes!",
  description:
    "Selling your car has never been easier! List your vehicle in just a few simple steps and connect with genuine buyers.",
  openGraph: {
    title: "Post Your Car Sell in Minutes!",
    description:
      "Selling your car has never been easier! List your vehicle in just a few simple steps and connect with genuine buyers.",
    images: ["/meta-image-post-car.webp"],
  },
};

export default async function PostYourCarPage() {
  const cars = await client.fetch(`*[_type == "car"] | order(_createdAt desc){
    _id, name, number, car, price, model, owner, fuel,
    kilometers, original, tyre, interior, engine, images
  }`);

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
      <Suspense fallback={<Loader />}>
        <PostTabs initialCars={cars} />
      </Suspense>
      <ContactUs />
      <Faq />
    </>
  );
}
