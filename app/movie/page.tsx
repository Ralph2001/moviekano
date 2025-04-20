"use client";
import { MovieList } from "@/components/MovieList";
import { usePopularMovies, useTopRatedMovies } from "@/hooks/useMovies";
import React from "react";
import { FaFilm } from "react-icons/fa";

const page = () => {
  const popularMovies = usePopularMovies();
  const topRatedMovies = useTopRatedMovies();
  return (
    <main className="w-full min-h-screen  h-full  flex flex-col items-center ">
      <div className="max-w-screen-xl flex-col  p-4 h-full md:lg:pl-[4rem]   w-full flex  justify-center">
        <section className="flex flex-col gap-2 md:lg:px-10 mt-4">
          <div className="mb-2">
            <h1 className="text-2xl md:text-3xl flex flex-row gap-2 items-center font-bold text-gray-300 mb-1">
              <FaFilm /> Movies
            </h1>
            <p className="text-gray-400 text-sm">
              Explore top-rated films and iconic cinema classics.
            </p>
          </div>
        </section>
        <section className="flex flex-col ">
          <div>
            <MovieList title="Popular" {...popularMovies} />
          </div>
        </section>
        <section className="flex flex-col ">
          <div>
            <MovieList title="Top Rated" {...topRatedMovies} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
