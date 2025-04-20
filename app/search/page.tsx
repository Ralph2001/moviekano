import React from "react";

const page = () => {
  return (
    <main className="w-full min-h-screen  h-full  flex flex-col items-center ">
      <div className="max-w-screen-xl flex-col  p-4 h-full md:lg:pl-[4rem]   w-full flex  justify-center">
        <section className="flex flex-col gap-2 md:lg:px-10 mt-4">
          <div className="mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-300 mb-1">
              Search Movies and TV Shows
            </h1>
            <p className="text-gray-400 text-sm">
              Browse titles, genres, or your favorite stars
            </p>
          </div>

          <div className="w-full flex  flex-row gap-4">
            <input
              type="text"
              placeholder="Search for movies, TV shows"
              className="bg-gray-900 outline-none ring-0 border font-medium border-gray-800 focus:border-gray-600 placeholder:font-normal placeholder:text-xs w-full focus:ring-gray-600 placeholder-gray-500 text-white rounded-lg px-4 py-2 transition-colors "
            />
            <button className="bg-blue-500 outline-none ring-0 focus:bg-blue-400 focus:border focus:border-blue-500 focus:ring-2 focus:ring-blue-500 hover:bg-blue-400 rounded-xl px-2 text-white w-26 h-10 font-medium text-sm">
              Search
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
