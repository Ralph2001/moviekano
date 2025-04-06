//@components/MovieCard.tsx
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

interface MovieCardProps {
  movie: TMDB.Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="flex flex-col gap-2 w-full focus:bg-gray-800 overflow-hidden hover:bg-gray-800 rounded-2xl focus:scale-95 hover:scale-95 p-2 transition-all duration-200 h-full md:lg:min-w-[12rem]  outline-none focus:outline-none ring-0 group"
      aria-label={`View details for ${movie.title}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden w-full h-[15rem] transition-all duration-200 ease-in-out">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          quality={50}
          className="object-cover rounded-2xl transition-all duration-100 "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/placeholder-movie.jpg"
        />
      </div>

      {/* Text Content */}
      <div className="h-[3rem] flex flex-col overflow-hidden">
        <p
          title={movie.title}
          className="text-md text-white font-medium truncate"
        >
          {movie.title}
        </p>
        <div className="flex items-center gap-1 flex-row w-full">
          <p className="text-xs text-gray-600 font-medium">
            {movie.release_date
              ? format(new Date(movie.release_date), "yyyy")
              : "Release date unavailable"}
          </p>
          {/* <p className="text-xs ml-auto text-gray-700 font-medium px-1 bg-gray-300 rounded">
            {movie.original_language.toUpperCase()}
          </p> */}
        </div>
      </div>
    </Link>
  );
};
