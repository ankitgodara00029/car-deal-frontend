import Services from "@/components/pages/Services";
export const metadata = {
  metadataBase: "https://car-sell-alpha.vercel.app/",
  title: "Our Services Your One-Stop Car Marketplace",
  description:
    "We offer a range of services to make buying and selling cars safe, easy, and hassle-free. Whether you’re looking for a new ride or selling your old one, we’ve got you covered!",
  openGraph: {
    title: "Our Services Your One-Stop Car Marketplace",
    description:
      "We offer a range of services to make buying and selling cars safe, easy, and hassle-free. Whether you’re looking for a new ride or selling your old one, we’ve got you covered!",
    images: ["/meta-image-services.webp"],
  },
};
export default function Home() {
  return (
    <>
      <Services />
    </>
  );
}
