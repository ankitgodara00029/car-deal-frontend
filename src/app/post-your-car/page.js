import CarDetailsPage from "@/components/pages/CarDetailsPage";
export const metadata = {
  metadataBase: "https://car-sell-alpha.vercel.app/",
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
