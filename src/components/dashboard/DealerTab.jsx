import Image from "next/image";
import Link from "next/link";
import Loader from "../common/Loader";

const DealerTab = ({ dealerInfo, dealerLoading, onEdit, onDelete }) => {
  if (dealerLoading) return <Loader />;

  if (!dealerInfo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No dealer info posted yet.</p>
        <Link
          href="/post-your-car?tab=dealer"
          className="inline-block bg-[#ff5e00] text-white px-6 py-2 rounded-lg text-sm"
        >
          Post Dealer Info
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[500px] space-y-4">
      {dealerInfo.imageUrl && (
        <div className="relative w-full h-60 rounded-lg overflow-hidden border">
          <Image
            src={dealerInfo.imageUrl}
            alt="Dealer"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Name", value: dealerInfo.name },
          { label: "Business Name", value: dealerInfo.businessName },
          { label: "Phone", value: dealerInfo.phone },
          { label: "Address", value: dealerInfo.address },
        ].map(({ label, value }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm">
              {value || "—"}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onEdit}
          className="flex-1 bg-[#ff5e00] text-white py-2 px-4 rounded-md text-sm hover:bg-orange-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 text-white py-2 px-4 rounded-md text-sm hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DealerTab;
