"use client";
import TopIntro from "@/app/TopIntro";
import { TrendingList } from "@/app/TrendingList";
import {
  useDayTrendingTitles,
  useWeekTrendingTitles,
} from "@/hooks/useEssentials";

export default function Home() {
  const trendingTitlesThisWeek = useWeekTrendingTitles();
  const trendingTitlesThisDay = useDayTrendingTitles();

  return (
    // md:lg:pl-[3.5rem]
    <main className="w-full min-h-screen pb-14 md:pb-0 overflow-y-auto  h-full  flex flex-col items-center ">
      <div className="max-w-screen-2xl  w-full flex  justify-center">
        <TopIntro {...trendingTitlesThisDay} />
      </div>
      <div className="p-4 w-full h-full md:lg:pl-[4rem] mt-4">
        <TrendingList title="Trending" {...trendingTitlesThisWeek} />
      </div>
    </main>
  );
}
