// components/MovieList.tsx
"use client";

import { MovieCard } from "@/components/MovieCard";
import { LoadingSpinner } from "./state/LoadingSpinner";
import { ErrorMessage } from "./state/ErrorMessage";
import { MovieCardLoading } from "./loading/MovieCardLoading";
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
      <h1 className="text-2xl cursor-default font-bold text-white md:text-2xl mx-auto mb-4 text-balance">
        {title}
      </h1>
      <div className="relative w-full h-full md:lg:px-4">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:flex lg:flex-row overflow-x-auto no-scrollbar gap-4 w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <MovieCardLoading key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:flex lg:flex-row overflow-x-auto no-scrollbar gap-2 w-full">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
