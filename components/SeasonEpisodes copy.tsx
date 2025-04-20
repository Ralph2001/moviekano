// components/SeasonEpisodes.tsx
"use client";
import { useState, useEffect } from "react";
import EpisodeBox from "./EpisodeBox";
import { useRouter } from "next/navigation";

interface Season {
  season_number: number;
  name: string;
}

interface Props {
  tvId: number;
  seasons: Season[];
}

export default function SeasonEpisodes({ tvId, seasons }: Props) {
  const router = useRouter();
  const [selectedSeason, setSelectedSeason] = useState(
    seasons[0]?.season_number || 1
  );
  const [episodes, setEpisodes] = useState<TMDBTypes.TVEpisodes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/tv/${tvId}/season/${selectedSeason}`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data.episodes))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tvId, selectedSeason]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 md:grid-cols-8 gap-2 mb-4">
        {seasons.map((s) => (
          <button
            key={s.season_number}
            title={s.name}
            onClick={() => setSelectedSeason(s.season_number)}
            className={`py-2 px-3 rounded-full truncate cursor-pointer text-sm font-medium transition 
              ${
                s.season_number === selectedSeason
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {s.name}
          </button>
        ))}
      </div>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {episodes.map((ep) => (
            <EpisodeBox
              episode={ep}
              key={ep.id}
              onClick={() =>
                router.push(
                  `/watch/tv/0/${tvId}/${selectedSeason}/${ep.episode_number}`
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
