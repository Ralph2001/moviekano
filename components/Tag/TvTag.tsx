import React from "react";
import { FiTv } from "react-icons/fi";

const TvTag = () => {
  return (
    <div className="absolute top-2 right-2  z-50 bg-black/80 py-0.5 font-medium rounded-2xl w-12 flex flex-row gap-1 items-center justify-center">
      <FiTv className="text-xs text-blue-500" />
      <p className="text-gray-200 text-xs">TV</p>
    </div>
  );
};

export default TvTag;
