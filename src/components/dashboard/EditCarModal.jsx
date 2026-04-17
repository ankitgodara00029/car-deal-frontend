import { useRef } from "react";
import Image from "next/image";
import CommonInput from "@/components/common/CommonInput";
import CommonSelect from "@/components/common/CommonSelect";

const EditCarModal = ({
  editForm,
  newImages,
  setNewImages,
  updating,
  onChange,
  onSubmit,
  onClose,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Edit Car</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <CommonInput
            id="name"
            label="Name"
            placeholder="Enter Name"
            value={editForm.name}
            onChange={onChange}
            required
          />
          <CommonInput
            id="number"
            type="number"
            label="Phone"
            placeholder="Enter Phone Number"
            value={editForm.number}
            onChange={onChange}
            required
          />
          <CommonInput
            id="car"
            label="Car Name"
            placeholder="Enter Car Name"
            value={editForm.car}
            onChange={onChange}
            required
          />
          <CommonInput
            id="price"
            type="number"
            label="Price"
            placeholder="Enter Price"
            value={editForm.price}
            onChange={onChange}
            required
          />
          <CommonInput
            id="model"
            type="number"
            label="Model"
            placeholder="Enter Model Year"
            value={editForm.model}
            onChange={onChange}
            required
          />
          <CommonSelect
            id="owner"
            label="Owner"
            options={["1st", "2nd", "3rd"]}
            value={editForm.owner}
            onChange={onChange}
            required
          />
          <CommonSelect
            id="fuel"
            label="Fuel Type"
            options={["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG"]}
            value={editForm.fuel}
            onChange={onChange}
            required
          />
          <CommonInput
            id="kilometers"
            type="number"
            label="Kilometers Driven"
            placeholder="Enter Kilometers"
            value={editForm.kilometers}
            onChange={onChange}
            required
          />
          <CommonSelect
            id="original"
            label="Original Condition (%)"
            options={[
              "10",
              "20",
              "30",
              "40",
              "50",
              "60",
              "70",
              "80",
              "90",
              "100",
            ]}
            value={editForm.original}
            onChange={onChange}
            required
          />
          <CommonSelect
            id="tyre"
            label="Tyre Condition (%)"
            options={[
              "10",
              "20",
              "30",
              "40",
              "50",
              "60",
              "70",
              "80",
              "90",
              "100",
            ]}
            value={editForm.tyre}
            onChange={onChange}
            required
          />
          <CommonSelect
            id="interior"
            label="Interior Condition (%)"
            options={[
              "10",
              "20",
              "30",
              "40",
              "50",
              "60",
              "70",
              "80",
              "90",
              "100",
            ]}
            value={editForm.interior}
            onChange={onChange}
            required
          />
          <CommonSelect
            id="engine"
            label="Engine Condition (%)"
            options={[
              "10",
              "20",
              "30",
              "40",
              "50",
              "60",
              "70",
              "80",
              "90",
              "100",
            ]}
            value={editForm.engine}
            onChange={onChange}
            required
          />

          <div className="sm:col-span-2">
            <label
              htmlFor="edit-images"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Replace Images (optional)
            </label>
            <input
              type="file"
              id="edit-images"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setNewImages(Array.from(e.target.files))}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {newImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {newImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-16 h-16 border rounded overflow-hidden"
                  >
                    <Image
                      src={URL.createObjectURL(img)}
                      alt={`preview-${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-6 py-2 rounded-md bg-[#ff5e00]/80 text-white bg-[#ff5e00] text-sm disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarModal;
