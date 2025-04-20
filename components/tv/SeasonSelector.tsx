"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  tvId: number;
  seasons: TMDBTypes.TVSeasonDetails[];
  onSelectSeason: (episodes: TMDBTypes.TVEpisodes[]) => void;
}

export default function SeasonSelector({
  tvId,
  seasons,
  onSelectSeason,
}: Props) {
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
      .then((data) => {
        setEpisodes(data.episodes);
        onSelectSeason(data.episodes);
      })
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
    <div className="relative w-full h-14" ref={dropdownRef}>
      <button
        onClick={() => handleSeasonList()}
        className="h-14  px-3 rounded-lg p-2 outline-none ring-0 bg-[#1D1F23] hover:bg-[#0d0e10] transition-all duration-300 cursor-pointer w-full flex flex-row items-center justify-center  "
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
        <div className="absolute  top-16 shadow-2xl rounded-lg z-50 w-full overflow-y-auto no-scrollbar  max-h-40 bg-[#1D1F23]">
          <div className="grid grid-cols-1 ">
            {seasons.map((s) => (
              <button
                key={s.season_number}
                title={s.name}
                onClick={() => handleSeasonClick(s.season_number)}
                className={`py-2 px-3 h-14 truncate cursor-pointer text-sm text-start hover:bg-[#0d0e10] text-gray-100  transition`}
              >
                <p className="text-gray-white font-medium text-md ">{s.name}</p>
                <p className="text-gray-400  text-xs">
                  {s.episode_count} episodes
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
