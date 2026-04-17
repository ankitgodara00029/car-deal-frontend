import { useRef } from "react";
import Image from "next/image";
import CommonInput from "@/components/common/CommonInput";

const EditDealerModal = ({
  dealerForm,
  setDealerForm,
  dealerImagePreview,
  setDealerImageFile,
  setDealerImagePreview,
  dealerUpdating,
  onSubmit,
  onClose,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Dealer Info
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <CommonInput
            id="dealer-name"
            label="Name"
            placeholder="Enter your name"
            value={dealerForm.name}
            onChange={(e) =>
              setDealerForm((p) => ({ ...p, name: e.target.value }))
            }
            required
          />
          <CommonInput
            id="dealer-businessName"
            label="Business Name"
            placeholder="Enter business name"
            value={dealerForm.businessName}
            onChange={(e) =>
              setDealerForm((p) => ({ ...p, businessName: e.target.value }))
            }
            required
          />
          <CommonInput
            id="dealer-address"
            label="Address"
            placeholder="Enter address"
            value={dealerForm.address}
            onChange={(e) =>
              setDealerForm((p) => ({ ...p, address: e.target.value }))
            }
            required
          />
          <CommonInput
            id="dealer-phone"
            label="Phone"
            type="number"
            placeholder="Enter phone number"
            value={dealerForm.phone}
            onChange={(e) =>
              setDealerForm((p) => ({ ...p, phone: e.target.value }))
            }
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Replace Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setDealerImageFile(file);
                setDealerImagePreview(URL.createObjectURL(file));
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-[#ff5e00] hover:file:bg-orange-100"
            />
            {dealerImagePreview && (
              <div className="relative w-full h-40 mt-2 rounded overflow-hidden border">
                <Image
                  src={dealerImagePreview}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={dealerUpdating}
              className="px-6 py-2 rounded-md bg-[#ff5e00] text-white text-sm disabled:opacity-50"
            >
              {dealerUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDealerModal;
