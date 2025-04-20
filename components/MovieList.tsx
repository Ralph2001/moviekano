// components/MovieList.tsx
"use client";

import { MovieCard } from "@/components/MovieCard";
import { LoadingSpinner } from "./state/LoadingSpinner";
import { ErrorMessage } from "./state/ErrorMessage";
import { MovieCardLoading } from "./loading/MovieCardLoading";
import { IoMdTrendingUp } from "react-icons/io";
// import { TMDB } from "@/types/tmdb";
// import { LoadingSpinner } from "./LoadingSpinner";
// import { ErrorMessage } from "./ErrorMessage";

interface MovieListProps {
  movies?: TMDB.Movie[];
  isLoading: boolean;
  isError: boolean;
  title: string;
}

export const MovieList = ({
  movies,
  isLoading,
  isError,
  title,
}: MovieListProps) => {
  if (isError) return <ErrorMessage message={`Failed to load ${title}`} />;

  return (
    <div className="container mx-auto md:lg:px-4 py-4">
      <h1 className="text-xl flex items-center  flex-row gap-2 cursor-default font-semibold text-white mx-auto mb-4 text-balance">
        <IoMdTrendingUp className="text-blue-500" /> {title}
      </h1>
      <div className="relative w-full h-full md:lg:px-4">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto no-scrollbar w-full">
            {Array.from({ length: 12 }).map((_, index) => (
              <MovieCardLoading key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto no-scrollbar w-full">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
