"use client";
import { MovieList } from "@/components/MovieList";
import Sidebar from "@/components/Sidebar";
import TopIntro from "@/app/TopIntro";
import { TrendingList } from "@/app/TrendingList";
import {
  useDayTrendingTitles,
  useWeekTrendingTitles,
} from "@/hooks/useEssentials";

import {
  usePlayingNow,
  usePopularMovies,
  useTopRatedMovies,
} from "@/hooks/useMovies";

export default function Home() {
  const popularMovies = usePopularMovies();
  const topRatedMovies = useTopRatedMovies();
  const trendingweekMovies = useWeekTrendingTitles();
  const trendingDayMovies = useDayTrendingTitles();
  const nowPlayingMovies = usePlayingNow();

  return (
    // md:lg:pl-[3.5rem]
    <main className="w-full min-h-screen pb-10  h-full  flex flex-col items-center ">
      <div className="max-w-screen-2xl  w-full flex  justify-center">
        <TopIntro {...trendingDayMovies} />
      </div>
      <div className="p-4 w-full h-full md:lg:pl-[4rem] mt-4">
        <TrendingList title="Trending" {...trendingweekMovies} />
      </div>
    </main>
  );
}
