import { useState } from "react";

const CustomPopup = ({
  handleConfirm,
  setShowPopup,
  message = "Are you sure you want to submit? Please verify all the details before submitting.",
}) => {
  const [loading, setLoading] = useState(false);

  const handleYesClick = async () => {
    setLoading(true);
    try {
      await handleConfirm();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 px-5">
      <div className="bg-white p-4 rounded shadow-lg max-w-[500px] w-full">
        <p className="text-lg font-semibold">{message}</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => setShowPopup(false)}
            disabled={loading}
            className="bg-gray-300 py-2 px-3 rounded-lg disabled:opacity-50"
          >
            No
          </button>
          <button
            onClick={handleYesClick}
            disabled={loading}
            className="bg-[#ff5e00] text-white py-2 px-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Loading..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
