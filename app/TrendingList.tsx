"use client";

import { ErrorMessage } from "../components/state/ErrorMessage";
import { MovieCardLoading } from "../components/loading/MovieCardLoading";
import { IoMdTrendingUp } from "react-icons/io";
import { TrendingCard } from "../components/TrendingCard";

interface TrendingListProps {
  titles?: TMDBTypes.Trending[];
  isLoading: boolean;
  isError: boolean;
  title: string;
}

export const TrendingList = ({
  titles,
  isLoading,
  isError,
  title,
}: TrendingListProps) => {
  if (isError) return <ErrorMessage message={`Failed to load ${title}`} />;

  return (
    <div className="container mx-auto md:lg:px-4 py-4">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-white flex flex-row gap-2 items-center">
          Trending Now <IoMdTrendingUp className="text-blue-500" />{" "}
        </h2>
        <p className="text-gray-400 text-sm">Most watched titles this week</p>
      </div>

      <div className="relative w-full h-full md:lg:px-4">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-6 overflow-x-auto no-scrollbar w-full">
            {Array.from({ length: 12 }).map((_, index) => (
              <MovieCardLoading key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-6  w-full">
            {titles?.slice(0, 18).map((content) => (
              <TrendingCard key={content.id} media={content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
