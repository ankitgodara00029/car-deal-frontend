import ContactUs from "@/components/common/ContactUs";
import Faq from "@/components/common/Faq";
import CarManager from "@/components/home/CarManager";
import Hero from "@/components/home/Hero";
import { client } from "@/utils/sanity";
export const metadata = {
  metadataBase: "https://www.car-deal.shop/",
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
export default async function HomePage() {
  const cars = await client.fetch(`*[_type == "car"] | order(_createdAt desc){
    _id,
    name,
    number,
    car,
    price,
    model,
    owner,
    fuel,
    kilometers,
    original,
    tyre,
    interior,
    engine,
    images
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
      <CarManager initialCars={cars} />
      <ContactUs />
      <Faq />
      {/* <CarDetailsPage /> */}
    </>
  );
}
