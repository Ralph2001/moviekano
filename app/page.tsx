"use client";
import { MovieList } from "@/components/MovieList";
import { usePopularMovies, useTopRatedMovies } from "@/hooks/useMovies";

export default function Home() {
  const popularMovies = usePopularMovies();
  const topRatedMovies = useTopRatedMovies();

  return (
    <main className="w-full min-h-screen h-full md:lg:pl-[3.5rem] flex flex-col p-4">
      <div className="md:lg:p-2 w-full h-full ">
        <MovieList title="Most Popular Movies" {...popularMovies} />
        <MovieList title="Top Rated Movies" {...topRatedMovies} />
      </div>
    </main>
  );
}
