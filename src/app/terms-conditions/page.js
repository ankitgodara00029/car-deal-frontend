import Hero from "@/components/home/Hero";
import PolicyConditions from "@/components/pages/PolicyConditions";
import { TERMS_CONDITIONS_LIST } from "@/utils/helper";
export const metadata = {
  metadataBase: "https://car-sell-alpha.vercel.app/",
  title: "Terms & Conditions Car Deal",
  description:
    "Welcome to Car Deal! By accessing and using our platform, you agree to comply with the following Terms & Conditions. Please read them carefully before buying or selling a car through our website.",
  openGraph: {
    title: "Terms & Conditions Car Deal",
    description:
      "Welcome to Car Deal! By accessing and using our platform, you agree to comply with the following Terms & Conditions. Please read them carefully before buying or selling a car through our website.",
    images: ["/meta-image-terms-conditions.webp"],
  },
};
export default function PrivacyPolicy() {
  return (
    <>
      <Hero
        title={
          <>
            <span className="text-[#ff5e00]">Terms & Conditions </span> <br />
            Car Deal 🚗
          </>
        }
        description="Welcome to Car Deal! By accessing and using our platform, you agree to comply with the following Terms & Conditions. Please read them carefully before buying or selling a car through our website."
      />
      <PolicyConditions
        title="Terms & Conditions – Car Deal 🚗"
        mapList={TERMS_CONDITIONS_LIST}
      />
    </>
  );
}
