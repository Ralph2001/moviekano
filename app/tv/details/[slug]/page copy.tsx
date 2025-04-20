// app/tv/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import clsx from "clsx";
import { moviesApi, tvApi } from "@/services/tmdbClient";
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
import SeasonEpisodes from "@/components/SeasonEpisodes";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const id = unSlug(slug);

  const [tv] = await Promise.all([tvApi.getById(Number(id)).catch(() => null)]);

  return {
    title: tv?.name || "Movie Details",
    description: tv ? `${tv.overview?.slice(0, 150)}...` : "",
    openGraph: {
      images: tv?.poster_path
        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${tv.poster_path}`
        : "/default-movie.jpg",
    },
  };
}

export default async function MovieDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const id = unSlug(slug);

  const [tv] = await Promise.all([tvApi.getById(Number(id)).catch(() => null)]);
  if (!tv) notFound();

  const tabData = [
    {
      label: "Episodes",
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-bold text-2xl text-gray-100">Seasons</p>
          <SeasonEpisodes tvId={id} seasons={tv.seasons} />
        </div>
      ),
    },
    {
      label: "Details",
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-bold text-2xl text-gray-100">Seasons</p>
          <SeasonEpisodes tvId={id} seasons={tv.seasons} />
        </div>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen   flex flex-col justify-center w-full bg-cover bg-center">
      <div className="p-6 relative z-10  max-w-screen-xl   mx-auto h-full  min-w-screen-xl w-full">
        <BackButton />
        <div className="mt-8 flex flex-col md:lg:flex-row  items-start  gap-6">
          <aside className="w-full md:lg:w-60 flex flex-col items-center gap-6">
            <ContentCard title={tv.name} posterPath={tv.poster_path} />
            <div className="grid grid-cols-1 gap-2 w-full">
              {/* <SelectSource id={tv.id} type="tv" title={tv.name} />
              <Link
                href="/"
                className={clsx(
                  playButton,
                  "border border-neutral-800 text-white hover:bg-gray-100 group hover:text-gray-800"
                )}
              >
                <FaBookmark className="text-xs text-white group-hover:text-gray-800" />{" "}
                Save
              </Link> */}
            </div>
          </aside>
          <main className="flex-1  flex flex-col gap-2 max-w-4xl ">
            <header className="flex flex-col gap-2">
              <h1 className="flex items-center text-4xl font-bold text-white drop-shadow-2xl">
                {tv.name}
                {tv.first_air_date && (
                  <span>({formatDate(tv.first_air_date, "yyyy")})</span>
                )}
              </h1>
              <div className="flex gap-5">
                <p className="flex items-center gap-1 font-medium text-sm text-gray-200">
                  {tv.status}
                </p>
                <p className="flex items-center gap-1 font-medium text-sm text-gray-200">
                  <MdCalendarToday />{" "}
                  {tv.first_air_date && (
                    <span>
                      {formatDate(tv.first_air_date, "MMMM dd, yyyy")} -{" "}
                      {formatDate(tv.last_air_date, "MMMM dd, yyyy")}
                    </span>
                  )}
                </p>
                <p className="flex items-center gap-1 font-medium text-sm text-gray-200">
                  <FaStar className="text-amber-400" />{" "}
                  {truncateToTwoDecimals(tv.vote_average)}/10
                </p>
              </div>
            </header>
            <Tabs tabs={tabData} />
          </main>
        </div>
      </div>
    </div>
  );
}
