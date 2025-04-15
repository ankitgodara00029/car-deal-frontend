import HomePage from "@/components/pages/HomePage";
export const metadata = {
  metadataBase: "https://www.car-deal.shop/",
  title: "Your Trusted Marketplace for Cars!",
  description:
    "Find the perfect car or sell yours at the best price—all in one place.",
  openGraph: {
    title: "Your Trusted Marketplace for Cars!",
    description:
      "Find the perfect car or sell yours at the best price—all in one place.",
    images: ["/meta-image-home.webp"],
  },
};
export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
