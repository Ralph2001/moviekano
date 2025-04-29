// app/movies/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import clsx from "clsx";
import { moviesApi } from "@/services/tmdbClient";
import { formatDate, unSlug } from "@/app/utils";
import BackButton from "@/components/BackButton";
import { Anton } from "next/font/google";
import { movieSources } from "@/app/utils/sources";
import OverviewTab from "@/components/tabs/OverviewTab";
import Tabs from "@/components/Tabs";
import { FaPlay } from "react-icons/fa";
import MoviePlayer from "@/components/MoviePlayer";
import SourceSelector from "@/components/SourceSelector";
import { MdHeartBroken } from "react-icons/md";
import { MovieCard } from "@/components/MovieCard";

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

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

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

  const tabData = [
    {
      label: "Overview",
      content: (
        <div className="overflow-y-auto h-full no-scrollbar">
          <OverviewTab movie={movie} />
        </div>
      ),
    },
    {
      label: "Cast",
      content: (
        <div className="grid grid-cols-2 md:lg:grid-cols-3 gap-12 w-full overflow-y-auto no-scrollbar">
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
                src={
                  credit.profile_path
                    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${credit.profile_path}`
                    : "/default.png"
                }
              />
              <p className="text-md text-gray-100 mt-2 font-medium text-center">
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
        <div className="grid grid-cols-1 overflow-y-auto no-scrollbar gap-2 w-full justify-center">
          {videos
            ?.filter((vid: any) => vid.site === "YouTube")
            .slice(0, 9)
            .map((vid: any, i: number) => (
              <iframe
                key={i}
                frameBorder={0}
                allowFullScreen
                src={`https://www.youtube.com/embed/${vid.key}`}
                className="w-full h-52 border border-neutral-800 rounded-2xl flex items-center justify-center text-center text-gray-50"
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
    {
      label: "Related",
      content: (
        <div className="overflow-y-auto h-full no-scrollbar">
          <div className="grid grid-cols-2 md:lg:grid-cols-2  gap-2">
            {movie_similar?.slice(0, 14).map((m: any, i: number) => (
              <MovieCard movie={m} key={i} />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center w-full h-screen md:pl-[4rem] md:p-4  no-scrollbar">

      <div className="max-w-screen-2xl max-h-[50rem] w-full h-full grid grid-cols-1 lg:grid-cols-[65%_35%] gap-2">
      
      
        {/* Left Column */}
        <div className="flex flex-col flex-1 gap-4 p-2">
          <MoviePlayer movie={movie} />
        </div>

        {/* Right Column (Tabs) */}
        <div className="overflow-auto bg-black/20 p-4 gap-2 rounded-2xl flex flex-col  mt-9 pt-12 md:pt-4  h-[calc(100vh-1rem)] lg:h-auto">
          <Tabs tabs={tabData} />
        </div>
      </div>
    </div>
  );
}
