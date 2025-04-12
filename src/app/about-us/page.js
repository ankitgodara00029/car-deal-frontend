import About from "@/components/pages/About";
export const metadata = {
  metadataBase: "https://car-sell-alpha.vercel.app/",
  title: "Your Trusted Car Buying & Selling Marketplace!",
  description:
    "We are a leading online platform that connects car buyers and sellers in a hassle-free and secure way. Whether you’re looking to buy a dream car or sell your vehicle at the best price, we make the process simple, transparent, and reliable.",
  openGraph: {
    title: "Your Trusted Car Buying & Selling Marketplace!",
    description:
      "We are a leading online platform that connects car buyers and sellers in a hassle-free and secure way. Whether you’re looking to buy a dream car or sell your vehicle at the best price, we make the process simple, transparent, and reliable.",
    images: ["/meta-image-about.webp"],
  },
};
export default function Home() {
  return (
    <>
      <About />
    </>
  );
}
