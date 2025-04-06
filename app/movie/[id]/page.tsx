// app/movies/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { moviesApi } from "@/services/tmdbClient";
import { format } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";
import { IoTimeOutline } from "react-icons/io5";
import { FaCircle, FaPlay } from "react-icons/fa";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await moviesApi.getById(id).catch(() => null);

  return {
    title: movie?.title || "Movie Details",
    description: movie?.overview?.slice(0, 150) + "...",
    openGraph: {
      images: movie?.poster_path
        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
        : "/default-movie.jpg",
    },
  };
}

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const movie = await moviesApi.getById(id).catch(() => null);

  if (!movie) notFound();

  return (
    <div className="w-full min-h-screen h-full md:lg:pl-[3.5rem] bg-[#0F0F0F] flex flex-col">
      {/* Hero Section */}

      <div className="relative  h-72 md:lg:h-96 flex  flex-row items-center justify-center w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover opacity-50 "
          priority
          quality={50}
        />
        <div className=" relative    z-10 flex h-full w-full items-end justify-center  bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent  p-4">
          <div className="container mx-auto flex justify-center md:lg:px-12 items-center">
            <div className="hidden md:block flex-shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                width={180}
                height={180}
                quality={50}
                className="  ItemShadow"
              />
            </div>
            <div className="block md:lg:hidden flex-shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                width={90}
                height={90}
                quality={50}
                className="  ItemShadow"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2  p-4">
              <h1 className="text-xl md:lg:text-4xl flex text-white items-center font-bold drop-shadow-2xl">
                {movie.title}
              </h1>
              <div className="flex flex-row items-center gap-2 text-gray-200">
                <div className="flex flex-row gap-2 items-center">
                  <IoTimeOutline />
                  <span className="sm:text-xs md:text-md lg:text-md gap-2 ">
                    {movie.runtime} minutes
                  </span>
                </div>
                ●
                <span className="sm:text-xs md:lg:text-md gap-2 ">
                  {format(new Date(movie.release_date), "yyyy")}
                </span>
              </div>

              <div className="hidden md:lg:block flex-shrink-0">
                <p className="max-w-3xl text-sm text-gray-400 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
              <Link
                href={`/watch/${id}`}
                className="px-12 py-2.5 w-fit text-sm font-bold mt-10 transition-all duration-200 rounded-xl flex flex-row gap-2 items-center bg-amber-400 hover:bg-amber-500  text-black   "
              >
                Watch <FaPlay className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4   md:lg:py-8 flex-1 gap-2 md:lg:gap-2 text-white items-center justify-center grid md:lg:grid-cols-2">
        <div className="block md:lg:hidden">
          <p className="font-semibold text-sm">Overview</p>
          <span className="text-sm text-gray-400">{movie.overview}</span>
        </div>

        <div>
          <p className="font-semibold text-sm">Genre</p>
          <span className="text-sm text-gray-400">
            {movie.genres.map((g) => g.name).join(", ")}
          </span>
        </div>
        <div>
          <p className="font-semibold text-sm">Language</p>
          <span className="text-sm text-gray-400 uppercase">
            {movie.original_language}
          </span>
        </div>
        <div>
          <p className="font-semibold text-sm">Production</p>
          <span className="text-sm text-gray-400">
            {movie.production_companies.map((g) => g.name).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
}
