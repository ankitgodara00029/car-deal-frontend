import BackToTop from "@/components/common/BackToTop";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Preloader from "@/components/common/Preloader";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  metadataBase: new URL("https://car-deals.vercel.app"),

  title: "Your Trusted Marketplace for Cars!",
  description:
    "Find the perfect car or sell yours at the best price—all in one place.",

  // ✅ Google Search Console verification
  verification: {
    google: "JQdMIaicN5_A0dQCly13rDOWDfVfbFcxmFGO-dCC4zM",
  },

  // ✅ Open Graph (Facebook, LinkedIn sharing)
  openGraph: {
    title: "Your Trusted Marketplace for Cars!",
    description:
      "Find the perfect car or sell yours at the best price—all in one place.",
    url: "https://car-deals.vercel.app",
    siteName: "Car Deal",
    images: [
      {
        url: "/meta-image-home.webp",
        width: 1200,
        height: 630,
        alt: "Car Deal Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ✅ Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "Your Trusted Marketplace for Cars!",
    description:
      "Find the perfect car or sell yours at the best price—all in one place.",
    images: ["/meta-image-home.webp"],
  },

  // ✅ Robots (SEO indexing)
  robots: {
    index: true,
    follow: true,
  },

  // ✅ Icons / favicon
  icons: {
    icon: "/favicon.ico",
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
          {/* <BackToTop /> */}
          <Preloader />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
