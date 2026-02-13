import Dashboard from "@/components/pages/Dashboard";

export const metadata = {
  title: "Dashboard - Car Deal",
  description: "Manage your posted cars and profile on Car Deal platform",
  openGraph: {
    title: "Dashboard - Car Deal",
    description: "Manage your posted cars and profile on Car Deal platform",
    images: ["/meta-image-home.webp"],
  },
};

export default function DashboardPage() {
  return <Dashboard />;
}
