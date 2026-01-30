import BackToTop from "@/components/common/BackToTop";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Preloader from "@/components/common/Preloader";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
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

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="pb-11 md:pb-0">
          <Header />
          {children}
          <Footer />
          <BackToTop />
          <Preloader />
        </body>
      </html>
    </ClerkProvider>
  );
}
