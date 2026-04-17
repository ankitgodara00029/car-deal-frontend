"use client";
import { useRouter, useSearchParams } from "next/navigation";
import CarManager from "@/components/home/CarManager";
import PostDealerForm from "@/components/common/PostDealerForm";

const TABS = [
  { key: "car", label: "Post Your Car" },
  { key: "dealer", label: "Add Business" },
];

export default function PostTabs({ initialCars }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "car";

  const handleTab = (key) => {
    router.push(`/post-your-car?tab=${key}`, { scroll: false });
  };

  return (
    <div className="bg-gray-50 py-10 px-4">
      {/* Tab Buttons */}
      <div className="max-w-xl mx-auto flex rounded-lg overflow-hidden border border-gray-200 mb-4 md:mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTab(tab.key)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-[#ff5e00] text-white"
                : "bg-white text-gray-600 hover:bg-orange-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "car" ? (
        <CarManager initialCars={initialCars} />
      ) : (
        <PostDealerForm />
      )}
    </div>
  );
}
