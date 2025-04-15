import Hero from "@/components/home/Hero";
import PolicyConditions from "@/components/pages/PolicyConditions";
import { PRIVACY_POLICY_LIST } from "@/utils/helper";
export const metadata = {
  metadataBase: "https://www.car-deal.shop/",
  title: "Privacy Policy Car Deal",
  description:
    "At Car Deal, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and protect your data.",
  openGraph: {
    title: "Privacy Policy Car Deal",
    description:
      "At Car Deal, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and protect your data.",
    images: ["/meta-image-privacy-policy.webp"],
  },
};
export default function PrivacyPolicy() {
  return (
    <>
      <Hero
        title={
          <>
            <span className="text-[#ff5e00]">Privacy Policy </span> <br />
            Car Deal 🚗
          </>
        }
        description="At Car Deal, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and protect your data."
      />
      <PolicyConditions mapList={PRIVACY_POLICY_LIST} />
    </>
  );
}
