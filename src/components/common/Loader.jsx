import React from "react";

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-black/50 fixed top-0 left-0 w-full z-50">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
