"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const first_season = seasons[0];
  const first_season_number = first_season.season_number;
  const first_season_name = first_season.name;

  const storageKey = `tv-${tvId}-lastSeason`;

  // Lazy initialization from localStorage
  const initialSeason = (() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      const num = saved ? parseInt(saved) : first_season_number;
      return (
        seasons.find((s) => s.season_number === num)?.season_number ??
        first_season_number
      );
    }
    return first_season_number;
  })();

  const initialSeasonName = (() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      const num = saved ? parseInt(saved) : first_season_number;
      return (
        seasons.find((s) => s.season_number === num)?.name ?? first_season_name
      );
    }
    return first_season_name;
  })();

  const [selectedSeason, setSelectedSeason] = useState(initialSeason);
  const [selectedSeasonName, setSelectedSeasonName] =
    useState<string>(initialSeasonName);
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
  };

  const handleSeasonClick = (seasonNumber: number, seasonName: string) => {
    setSelectedSeasonName(seasonName);
    setSelectedSeason(seasonNumber);
    localStorage.setItem(storageKey, seasonNumber.toString());
    setShowSeasons(false);
  };

  return (
    <div className="relative w-full h-14" ref={dropdownRef}>
      <button
        onClick={handleSeasonList}
        className="h-14 px-3 rounded-lg p-2 outline-none ring-0 bg-[#1D1F23] hover:bg-[#0d0e10] transition-all duration-300 cursor-pointer w-full flex flex-row items-center justify-center"
      >
        <div className="flex flex-col text-start min-h-0">
          <p className="text-gray-200 font-medium text-md">
            {selectedSeasonName}
          </p>
          <p className="text-gray-400 text-xs">{episodes.length} episodes</p>
        </div>
        <FaChevronDown className="text-white text-sm ml-auto" />
      </button>
      {showSeasons && (
        <div className="absolute top-16 shadow-2xl rounded-lg z-50 w-full overflow-y-auto no-scrollbar max-h-40 bg-[#1D1F23]">
          <div className="grid grid-cols-1">
            {seasons.map((s) => (
              <button
                key={s.season_number}
                title={s.name}
                onClick={() => handleSeasonClick(s.season_number, s.name)}
                className="py-2 px-3 h-14 truncate cursor-pointer text-sm text-start hover:bg-[#0d0e10] text-gray-100 transition"
              >
                <p className="text-gray-white font-medium text-md">{s.name}</p>
                <p className="text-gray-400 text-xs">
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
