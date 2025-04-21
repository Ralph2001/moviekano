"use client";

import { useEffect, useState } from "react";
import SeasonEpisodes from "./SeasonEpisodes";
import BackButton from "./BackButton";
import SeasonSelector from "./tv/SeasonSelector";
import Image from "next/image";
import { formatDate } from "@/app/utils";
import { tvSources } from "@/app/utils/sources";
import { IoTimeOutline } from "react-icons/io5";
import clsx from "clsx";
import Tabs from "./Tabs";
import TvOverview from "./tabs/TvOverview";
import { Anton } from "next/font/google";
import { FaCloud } from "react-icons/fa";
import { useSimilarTvShow } from "@/hooks/useTvShows";

interface Props {
  tvId: number;
  seasons: TMDBTypes.TVSeasonDetails[];
  defaultTitle: string;
  tv: TMDBTypes.TV;
  similar?: TMDBTypes.TVSimilar[];
}

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function TvPlayerWithSeasons({
  tvId,
  seasons,
  defaultTitle,
  tv,
  similar,
}: Props) {
  const [iframeSrc, setIframeSrc] = useState<string>("");
  const [currentEpisode, setCurrentEpisode] = useState<string>("");
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState<number>(0);
  const [currentSeasonNumber, setCurrentSeasonNumber] = useState<number>(0);
  const [episodes, setEpisodes] = useState<TMDBTypes.TVEpisodes[]>([]);
  const [currentServer, setCurrentServer] = useState<string>(
    "https://vidlink.pro/tv"
  );

  const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);

  // Retrieve saved episode info
  function getSavedEpisode() {
    try {
      const data = localStorage.getItem(`lastWatched_${tvId}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  // Central function to handle playing an episode
  const playEpisode = (ep: TMDBTypes.TVEpisodes, serverOverride?: string) => {
    const seasonNumber = ep.season_number;
    const episodeNumber = ep.episode_number;

    setCurrentSeasonNumber(seasonNumber);
    setCurrentEpisodeNumber(episodeNumber);
    setCurrentEpisode(ep.name);
    setIsCurrentPlaying(true);

    const server = serverOverride || currentServer;
    const url = `${server}/${tvId}/${seasonNumber}/${episodeNumber}`;
    setIframeSrc(url);

    localStorage.setItem(
      `lastWatched_${tvId}`,
      JSON.stringify({ tvId, season: seasonNumber, episode: episodeNumber })
    );
  };

  // When season is selected, load episodes and restore last played (if exists)
  const addEpisodes = (episodes: TMDBTypes.TVEpisodes[]) => {
    setEpisodes(episodes);

    if (isCurrentPlaying) {
      return;
    }

    if (!episodes || episodes.length === 0) return;

    const currentlyPlaying = episodes.find(
      (e) =>
        e.episode_number === currentEpisodeNumber &&
        e.season_number === currentSeasonNumber
    );

    if (currentlyPlaying) {
      // Do nothing, continue playing
      return;
    }

    // const saved = getSavedEpisode();
    // const savedMatch =
    //   saved?.tvId === tvId
    //     ? episodes.find(
    //         (e) =>
    //           e.episode_number === saved.episode &&
    //           e.season_number === saved.season
    //       )
    //     : null;

    // if (savedMatch) {
    //   playEpisode(savedMatch);
    // } else {
    //   playEpisode(episodes[0]);
    // }
  };

  // When server is changed, replay current episode if one is set
  const handleServerChange = (newServer: string) => {
    setCurrentServer(newServer);

    if (currentEpisodeNumber && currentSeasonNumber) {
      const ep = episodes.find(
        (e) =>
          e.episode_number === currentEpisodeNumber &&
          e.season_number === currentSeasonNumber
      );
      if (ep) {
        // Pass the newServer directly
        playEpisode(ep, newServer);
      }
    }
  };

  const tabData = [
    {
      label: "Episodes",
      content: (
        <div className="flex flex-col gap-4 min-h-0">
          <SeasonSelector
            seasons={seasons}
            tvId={tvId}
            onSelectSeason={addEpisodes}
          />
          <div className="flex-1 overflow-y-auto grid grid-cols-1 gap-2 min-h-0 no-scrollbar">
            {episodes.map((ep) => (
              <button
                key={ep.id}
                onClick={() => playEpisode(ep)}
                className={clsx(
                  ep.episode_number === currentEpisodeNumber
                    ? "bg-gray-900"
                    : "",
                  "h-20 w-full flex group hover:bg-gray-900 transition-all rounded duration-300 cursor-pointer overflow-hidden"
                )}
              >
                <div
                  className={clsx(
                    ep.episode_number === currentEpisodeNumber
                      ? "h-full w-1 bg-blue-400"
                      : "h-full w-1"
                  )}
                />
                <div className="relative h-full w-full flex-1 overflow-hidden">
                  <Image
                    alt={ep.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-400"
                    src={
                      ep.still_path
                        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${ep.still_path}`
                        : "/default.png"
                    }
                  />
                  <p className="absolute bottom-1 left-1 font-bold text-white">
                    {ep.episode_number.toString().padStart(2, "0")}
                  </p>
                  <div
                    className={clsx(
                      ep.episode_number === currentEpisodeNumber
                        ? "hidden"
                        : "absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 group-hover:opacity-0"
                    )}
                  />
                </div>
                <div className="w-[65%] h-full px-2.5 py-0.5 flex flex-col overflow-hidden">
                  <p className="text-gray-200 font-semibold text-sm line-clamp-2 text-start">
                    {ep.name}
                  </p>
                  <p className="text-gray-400 font-semibold flex items-center mt-auto gap-1 text-xs">
                    <IoTimeOutline /> {ep.runtime}m
                  </p>
                  <p className="text-xs text-gray-400 text-start mt-auto">
                    {formatDate(ep.air_date, "MMMM dd, yyyy")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Details",
      content: <TvOverview tv={tv} />,
    },
    {
      label: "Related",
      content: (
        <div className="grid grid-cols-1 gap-2 overflow-y-auto min-h-0 no-scrollbar">
          {similar?.map((related) => (
            <button
              key={related.id}
              onClick={() => {}}
              className={clsx(
                "h-24 w-full flex group hover:bg-gray-900 transition-all rounded duration-300 cursor-pointer overflow-hidden"
              )}
            >
              {/* <div
                className={clsx(
                  related.episode_number === currentEpisodeNumber
                    ? "h-full w-1 bg-blue-400"
                    : "h-full w-1"
                )}
              /> */}
              <div className="relative h-full w-16 overflow-hidden">
                <Image
                  alt={related.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-all duration-400"
                  src={
                    related.poster_path
                      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${related.poster_path}`
                      : "/default-movie.jpg"
                  }
                />
                {/* <p className="absolute bottom-1 left-1 font-bold text-white">
                  {related.episode_number.toString().padStart(2, "0")}
                </p>
                <div
                  className={clsx(
                    related.episode_number === currentEpisodeNumber
                      ? "hidden"
                      : "absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 group-hover:opacity-0"
                  )}
                /> */}
              </div>
              <div className="flex-1 h-full px-2.5  item-start  text-start py-0.5 flex flex-col overflow-hidden">
                <p className="text-gray-200 font-semibold text-sm line-clamp-2 text-start">
                  {related.name}
                </p>
                <p className="text-gray-300 text-xs">
                  <span className="text-gray-400">Released:</span>{" "}
                  {formatDate(related.first_air_date, "MMMM dd, yyyy")}
                </p>
                <p className="text-gray-400 mb-auto mt-auto gap-1 text-xs line-clamp-2 text-justify ">
                  {related.overview}
                </p>
              </div>
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center w-full  h-screen md:pl-[4rem] md:p-4">
      <div className="max-w-screen-2xl w-full h-full max-h-[50rem] grid grid-cols-1 lg:grid-cols-[70%_30%] gap-2">
        {/* Left Column */}
        <div className="flex flex-col flex-1 min-h-0 overflow-auto gap-4 p-2">
          <div className="flex flex-row items-center gap-2">
            <BackButton />
            <p
              className={clsx(
                anton.className,
                "text-2xl font-bold text-gray-50"
              )}
            >
              {tv.name}
            </p>
          </div>

          {/* Now Playing Title */}
          {currentEpisode && (
            <div className="w-full">
              <p className="text-md font-semibold text-start text-gray-300 tracking-wide leading-snug">
                <span className="text-sm text-gray-500 italic mr-2">
                  Now Playing:
                </span>
                Ep.{currentEpisodeNumber}, {currentEpisode}
              </p>
            </div>
          )}

          {/* Player */}
          <div className="flex-1 min-h-0">
            {iframeSrc ? (
              <iframe
                src={iframeSrc}
                className="w-full h-full rounded-2xl shadow-md min-h-40"
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full rounded-2xl min-h-56 shadow-md overflow-hidden bg-black/30">
                <Image
                  src={
                    tv.backdrop_path
                      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${tv.backdrop_path}`
                      : "/default.jpg"
                  }
                  alt="Backdrop"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 z-20 justify-center flex flex-col items-center px-4 text-center">
                  <p className="md:text-2xl font-bold text-gray-50 font-mono">
                    {defaultTitle}
                    <span className="italic">
                      {" "}
                      ({formatDate(tv.first_air_date, "yyyy")})
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Server Selector */}
          <div className="w-fit flex md:flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <select
                className="w-52 outline-none px-3 py-2 font-medium text-sm bg-[#1D1F23] text-gray-200 rounded-lg transition duration-150 ease-in-out hover:bg-[#2A2D33] focus:ring-2 focus:ring-blue-500"
                value={currentServer}
                onChange={(e) => handleServerChange(e.target.value)}
              >
                {tvSources.map((source) => (
                  <option
                    className="font-medium flex items-center flex-col gap-2"
                    key={source.url}
                    value={source.url}
                  >
                    {source.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500 italic">
              Having trouble loading the episode? Try switching the source.
            </p>
          </div>
        </div>

        {/* Right Column (Tabs) */}
        <div className="bg-black/20 p-4 gap-2 rounded-2xl flex flex-col min-h-0 overflow-hidden">
          <Tabs tabs={tabData} />
        </div>
      </div>
    </div>
  );
}
