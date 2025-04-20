"use client";
//@components/MovieCard.tsx
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: TMDB.Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const router = useRouter();

  const getMovieDetails = (movie: TMDB.Movie) => {
    const slugifiedTitle = movie.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const fullSlug = `${slugifiedTitle}-${movie.id}`;
    router.push(`/movie/details/${fullSlug}`);
  };

  return (
    <div
      onMouseEnter={() => setIsFocus(true)}
      onPointerLeave={() => setIsFocus(false)}
      onFocus={() => {
        setIsFocus(true);
      }}
      onClick={() => getMovieDetails(movie)}
      onBlur={() => setIsFocus(false)}
      className="flex flex-col gap-2  rounded-2xl group w-full focus:bg-gray-800 overflow-hidden shadow p-2  transition-all duration-200 h-full   outline-none focus:outline-none ring-0 group"
      aria-label={`View details for ${movie.title}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden w-full  rounded-2xl h-[15rem] transition-all duration-200 ease-in-out">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          quality={50}
          className="object-cover shadow rounded-2xl  group-hover:scale-105 transition-all duration-500  "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/placeholder-movie.jpg"
        />
        {isFocus && (
          <div
            tabIndex={-1}
            className="absolute flex items-center rounded-2xl justify-center w-full h-full backdrop-brightness-50 duration-400 transition-all"
          >
            <button
              onClick={() => getMovieDetails(movie)}
              tabIndex={-1}
              className="rounded-full hover:bg-amber-400 hover:cursor-pointer focus:cursor-pointer p-5 bg-white flex items-center justify-center"
            >
              <FaPlay className="text-xl" />
            </button>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="h-[3rem]   flex flex-col overflow-hidden">
        <p
          title={movie.title}
          className="text-md text-slate-100 font-medium truncate"
        >
          {movie.title}
        </p>
        <div className="flex items-center gap-1 flex-row w-full">
          <p className="text-xs text-slate-400 font-medium">
            {movie.release_date
              ? format(new Date(movie.release_date), "yyyy")
              : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};
