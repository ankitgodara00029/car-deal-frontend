"use client";
import { useEffect, useState } from "react";
import Icons from "../common/Icons";
const AdminList = ({ initialCars }) => {
  const [showData, setShowData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (initialCars) {
      setShowData(initialCars);
    }
  }, [initialCars]);

  // Handle both array and object with data property
  const carsArray = Array.isArray(showData) ? showData : showData?.data || [];
  const car = carsArray.filter((obj) =>
    Object.values(obj).some(
      (value) =>
        value != null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <div className="max-w-[1180px] mx-auto px-5 py-12">
      <div className="bg-light-grey border border-grey-200 rounded-lg flex overflow-hidden mt-5">
        <input
          className="outline-none text-black text-base !leading-150 bg-transparent py-2 md:py-3 px-4 md:px-6 w-full"
          type="search"
          placeholder="What are you looking for..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="min-w-10 md:min-w-[53px] bg-[#ff5e00] flex items-center justify-center border-s border-grey-200">
          <Icons icon="search-icon" />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {car?.map((obj, index) => {
          return (
            <div className="border rounded-lg" key={index}>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Name:</span> <span>{obj.name}</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Phone:</span> <span>{obj.number}</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Upload Date:</span>
                <span>
                  {new Date(obj.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p className="text-base leading-[120%] text-black flex flex-col justify-between border-t py-2 px-4 sm:px-6">
                <span>Document Id:</span> <span>{obj._id}</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Price:</span> <span>₹{obj.price}</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Model:</span> <span>{obj.model}</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Owner:</span> <span>{obj.owner}</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Fuel Type:</span> <span>{obj.fuel}</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Kilometers Driven:</span> <span>{obj.kilometers}</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Original:</span> <span>{obj.original}%</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Tyre Condition:</span> <span>{obj.tyre}%</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Interior Condition:</span>
                <span>{obj.interior}%</span>
              </p>
              <p className="text-base leading-[120%] text-black flex justify-between border-t py-2 px-4 sm:px-6">
                <span>Engine Condition:</span>
                <span>{obj.engine}%</span>
              </p>
              {/* {obj?.images?.map((subObj, subIndex) => {
                return (
                  <p
                    key={subIndex}
                    className="text-base leading-[120%] text-black flex flex-col justify-between border-t py-2 px-4 sm:px-6"
                  >
                    <span>{subIndex + 1}</span>
                    <span>Image Document Id:</span>
                    <span>{subObj.documentId}</span>
                  </p>
                );
              })} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminList;
