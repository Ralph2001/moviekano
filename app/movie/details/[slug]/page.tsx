// app/movies/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import clsx from "clsx";
import { moviesApi } from "@/services/tmdbClient";
import BackButton from "@/components/BackButton";
import Tabs from "@/components/Tabs";
import { MovieCard } from "@/components/MovieCard";
import { FaBookmark, FaPlay, FaStar } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdCalendarToday, MdHeartBroken } from "react-icons/md";

import { WiStars } from "react-icons/wi";
import { formatDate, truncateToTwoDecimals, unSlug } from "@/app/utils";
import ContentCard from "@/components/ContentCard";
import OverviewTab from "@/components/tabs/OverviewTab";
import SelectSource from "@/components/SelectSource";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = unSlug(slug);
  const movie = await moviesApi.getById(Number(id)).catch(() => null);

  return {
    title: movie?.title || "Movie Details",
    description: movie ? `${movie.overview?.slice(0, 150)}...` : "",
    openGraph: {
      images: movie?.poster_path
        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
        : "/default-movie.jpg",
    },
  };
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function MovieDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const id = unSlug(slug);

  const [movie, videos, movie_similar, movie_credits] = await Promise.all([
    moviesApi.getById(Number(id)).catch(() => null),
    moviesApi.getMovieVideos(Number(id)).catch(() => null),
    moviesApi.getMovieSimilar(Number(id)).catch(() => null),
    moviesApi.getMovieCredits(Number(id)).catch(() => null),
  ]);

  if (!movie) notFound();

  // Play button styles
  const playButton =
    "text-xs px-4 md:lg:px-12 py-2 md:lg:py-3 w-full justify-center font-bold transition-all duration-200 rounded-lg flex items-center gap-2 text-black outline-none ring-0 focus:outline-2 focus:ring-3 focus:ring-blue-500";

  // Tab configuration
  const tabData = [
    {
      label: "Details",
      content: <OverviewTab movie={movie} />,
    },
    {
      label: "Casts",
      content: (
        <div className="grid grid-cols-4 md:lg:grid-cols-5 gap-12 w-full">
          {movie_credits?.cast.map((credit: any, index: number) => (
            <div
              className="text-white flex flex-col items-center justify-center"
              key={index}
            >
              <Image
                alt={credit.name}
                width={80}
                height={80}
                className="rounded-full border border-neutral-600 shadow object-cover w-20 h-20"
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${credit.profile_path}`}
              />
              <p className="text-md text-gray-100 mt-2 font-medium">
                {credit.name}
              </p>
              <p className="text-sm text-gray-400 text-center">
                {credit.character}
              </p>
            </div>
          ))}
        </div>
      ),
    },

    {
      label: "Videos",
      content: (
        <div className="grid grid-cols-1 md:lg:grid-cols-3 gap-2 w-full justify-center">
          {videos
            ?.filter((vid: any) => vid.site === "YouTube")
            .slice(0, 9)
            .map((vid: any, i: number) => (
              <iframe
                key={i}
                frameBorder={0}
                allowFullScreen
                src={`https://www.youtube.com/embed/${vid.key}`}
                className="w-full h-42 border border-neutral-800 rounded-2xl flex items-center justify-center text-center text-gray-50"
              >
                {vid.name}
              </iframe>
            ))}
          {(!videos || videos.length === 0) && (
            <div className="text-gray-400 flex flex-row gap-2 items-center">
              No Available Content <MdHeartBroken className="text-red-400" />
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen md:lg:pl-[3.5rem]  flex flex-col justify-center w-full bg-cover bg-center">
      <div className="p-6 relative z-10  max-w-screen-xl mx-auto h-full  min-w-screen-xl w-full">
        <BackButton />
        <div className="mt-8 flex flex-col md:lg:flex-row  items-start  gap-6">
          <aside className="w-full md:lg:w-60 flex flex-col items-center gap-6">
            <ContentCard title={movie.title} posterPath={movie.poster_path} />
            <div className="grid grid-cols-1 gap-2 w-full">
              {/* <Link
                href={`/watch/${movie.id}`}
                className={clsx(
                  playButton,
                  "bg-amber-400 hover:bg-amber-500 focus:bg-amber-500"
                )}
              >
                <FaPlay className="text-xs" /> Watch
              </Link> */}
              <SelectSource id={movie.id} type="movie" title={movie.title} />
              <Link
                href="/"
                className={clsx(
                  playButton,
                  "border border-neutral-800 text-white hover:bg-gray-100 group hover:text-gray-800"
                )}
              >
                <FaBookmark className="text-xs text-white group-hover:text-gray-800" />{" "}
                Save
              </Link>
            </div>
          </aside>
          <main className="flex-1  flex flex-col gap-2">
            <header className="flex flex-col gap-2">
              <h1 className="flex items-center text-4xl font-bold text-white drop-shadow-2xl">
                {movie.title}
                {movie.release_date && (
                  <span>({formatDate(movie.release_date, "yyyy")})</span>
                )}
              </h1>
              <div className="flex gap-5">
                <p className="flex items-center gap-1 font-medium text-sm text-gray-200">
                  <IoTimeOutline /> {movie.runtime}m
                </p>
                <p className="flex items-center gap-1 font-medium text-sm text-gray-200">
                  <MdCalendarToday />{" "}
                  {movie.release_date && (
                    <span>
                      {formatDate(movie.release_date, "MMMM dd, yyyy")}
                    </span>
                  )}
                </p>
                <p className="flex items-center gap-1 font-medium text-sm text-gray-200">
                  <FaStar className="text-amber-400" />{" "}
                  {truncateToTwoDecimals(movie.vote_average)}/10
                </p>
              </div>
            </header>
            <Tabs tabs={tabData} />
          </main>
        </div>
      </div>
      <div className="max-w-screen-xl p-6 mx-auto mt-14">
        <p className="text-2xl text-gray-100 mb-6 font-bold flex flex-row gap-2 items-center">
          <WiStars className="text-amber-400 text-4xl" /> You May Also Enjoy
        </p>
        <div className="grid grid-cols-2 md:lg:grid-cols-7  gap-2">
          {movie_similar?.slice(0, 14).map((m: any, i: number) => (
            <MovieCard movie={m} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
