import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/utils/sanity";
import Cta from "../common/Cta";

const MyCarsTab = ({ userCars, onEdit, onDelete }) => {
  if (userCars.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No cars posted yet
        </h3>
        <p className="text-gray-500 mb-6">
          Start by posting your first car to sell
        </p>
        <Cta className="max-w-[170px] mx-auto" url="/post-your-car">
          Post Your Car
        </Cta>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userCars.map((car) => (
        <div
          key={car._id}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48 bg-gray-200">
            {car.images && car.images.length > 0 ? (
              <Image
                src={urlFor(car.images[0]).url()}
                alt={car.car}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {car.car} {car.model}
            </h3>
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <p>Price: ₹{car.price?.toLocaleString()}</p>
              <p>Kilometers: {car.kilometers}</p>
              <p>Fuel: {car.fuel}</p>
            </div>
            <div className="flex space-x-2">
              <Link
                href={`/${car._id}`}
                className="flex-1 bg-gray-600 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-sm"
              >
                View
              </Link>
              <button
                onClick={() => onEdit(car)}
                className="flex-1 bg-[#ff5e00]/80 text-white text-center py-2 px-4 rounded-md bg-[#ff5e00] transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(car)}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCarsTab;
