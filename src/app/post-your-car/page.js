import CarDetailsPage from "@/components/pages/CarDetailsPage";
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
export default function Home() {
  return (
    <>
      <CarDetailsPage />
    </>
  );
}
