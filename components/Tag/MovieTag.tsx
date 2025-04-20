import React from "react";
import { MdLocalMovies } from "react-icons/md";

const MovieTag = () => {
  return (
    <div className="absolute top-10 right-10  z-50 bg-black/80 py-0.5 font-medium rounded-2xl w-20 flex flex-row gap-1 items-center justify-center">
      <MdLocalMovies className="text-md text-blue-500" />
      <p className="text-gray-200 text-md">Movie</p>
    </div>
  );
};

export default MovieTag;
