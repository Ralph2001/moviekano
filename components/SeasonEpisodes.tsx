// components/SeasonEpisodes.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/app/utils";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  tvId: number;
  seasons: TMDBTypes.TVSeasonDetails[];
  onEpisodeSelect: (
    season: number,
    episode: number,
    episode_name: string
  ) => void;
}

export default function SeasonEpisodes({
  tvId,
  seasons,
  onEpisodeSelect,
}: Props) {
  const router = useRouter();
  const [selectedSeason, setSelectedSeason] = useState(
    seasons[0]?.season_number || 1
  );
  const [episodes, setEpisodes] = useState<TMDBTypes.TVEpisodes[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSeasons, setShowSeasons] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/tv/${tvId}/season/${selectedSeason}`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data.episodes))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tvId, selectedSeason]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSeasons(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSeasonList = () => {
    setShowSeasons((prev) => !prev);
    if (showSeasons) {
      setShowSeasons(false);
    }
  };

  const handleSeasonClick = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
    setShowSeasons(false);
  };
  return (
    <div className="border border-red-400 ">
      <div className="relative w-full " ref={dropdownRef}>
        <button
          onClick={() => handleSeasonList()}
          className="h-14 relative px-3 rounded-lg p-2 outline-none ring-0 bg-[#1D1F23] hover:bg-[#0d0e10] transition-all duration-300 cursor-pointer w-full flex flex-row items-center justify-center  "
        >
          <div className="flex flex-col text-start  min-h-0">
            <p className="text-gray-200 font-medium text-md ">
              Season {selectedSeason}
            </p>
            <p className="text-gray-400  text-xs">{episodes.length} episodes</p>
          </div>
          <FaChevronDown className="text-white text-sm ml-auto" />
        </button>
        {showSeasons && (
          <div className="absolute top-16 shadow-2xl rounded-lg z-50 w-full overflow-y-auto no-scrollbar  max-h-60 bg-[#1D1F23]">
            <div className="grid grid-cols-1 ">
              {seasons.map((s) => (
                <button
                  key={s.season_number}
                  title={s.name}
                  onClick={() => handleSeasonClick(s.season_number)}
                  className={`py-2 px-3 h-14 truncate cursor-pointer text-sm text-start hover:bg-[#0d0e10] text-gray-100  transition`}
                >
                  <p className="text-gray-white font-medium text-md ">
                    {s.name}
                  </p>
                  <p className="text-gray-400  text-xs">
                    {s.episode_count} episodes
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Episodes list */}
      <div className=" overflow-y-auto no-scrollbar grid grid-cols-1 gap-2 ">
        {episodes.map((ep) => (
          <button
            key={ep.id}
            onClick={() =>
              onEpisodeSelect(selectedSeason, ep.episode_number, ep.name)
            }
            className="h-20 w flex group hover:bg-gray-900transition-all duration-300 cursor-pointer rounded  flex-row overflow-hidden"
          >
            <div className="relative h-full w-full flex-1 overflow-hidden">
              <Image
                alt={ep.name}
                fill
                className="object-cover  group-hover:scale-105 transition-all duration-400 "
                src={
                  ep.still_path
                    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${ep.still_path}`
                    : "/default-movie.jpg"
                }
              />
              <p className="absolute bottom-1  left-1 font-bold text-white">
                {ep.episode_number > 9
                  ? `${ep.episode_number}`
                  : `0${ep.episode_number}`}
              </p>
              {/* Dark overlay that hides on hover */}
              <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 group-hover:opacity-0" />
            </div>
            <div className="w-[65%] h-full px-2.5 flex items-start flex-col overflow-hidden py-0.5">
              <p className="text-gray-200 font-semibold text-sm line-clamp-2 text-start">
                {ep.name}
              </p>

              <p className="text-xs text-gray-400 mt-auto mb-auto ">
                {formatDate(ep.air_date, "MMMM dd, yyyy")}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
