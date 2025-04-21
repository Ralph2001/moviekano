// components/tabs/TbOverview.tsx
"use client";

import { GrOverview } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { RiBuilding2Line } from "react-icons/ri";
import Image from "next/image";
import { formatDate } from "@/app/utils";

export default function TvOverview({ tv }: { tv: TMDBTypes.TV }) {
  if (!tv) return null;

  return (
    <div className="flex flex-col text-gray-300 h-full no-scrollbar overflow-y-auto">
      {/* Overview */}
      <section className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-xl mb-4 font-bold flex items-center gap-2 text-gray-300">
            <GrOverview className="text-blue-400" /> Overview
          </p>
          <div className="">
            <div className="p-4 bg-[#1D1F23] border border-neutral-800 rounded-2xl ">
              <p className="text-justify text-sm font-semibold text-gray-50">
                {tv.overview}
              </p>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="p-5 rounded-2xl grid grid-cols-2  justify-center items-center gap-2">
          {[
            {
              label: "Release Date",
              value: formatDate(tv.first_air_date, "MMMM dd, yyyy"),
            },
            { label: "Original Title", value: tv.original_name },
            {
              label: "Language",
              value: tv.original_language?.toUpperCase(),
            },
            { label: "Status", value: tv.status },
          ].map((item, i) => (
            <div className="space-y-1" key={i}>
              <p className="text-gray-500 text-sm font-medium">{item.label}</p>
              <p className="text-sm text-gray-100 font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Genres */}
      <section>
        <p className="text-xl mb-4 font-bold flex items-center gap-2 text-gray-300">
          <BiCategory className="text-blue-400" /> Genres
        </p>
        <div className="flex flex-wrap gap-2 px-5">
          {tv.genres.map((genre: any, i: number) => (
            <div
              key={i}
              className="px-2.5 py-1.5 border border-neutral-800 rounded-2xl font-medium text-sm bg-[#1D1F23]"
            >
              {genre.name}
            </div>
          ))}
        </div>
      </section>

      {/* Production Companies */}
      <section>
        <p className="text-xl mb-4 font-bold flex items-center gap-2 text-gray-300">
          <RiBuilding2Line className="text-md text-blue-400" /> Production
          Companies
        </p>
        <div className="grid grid-cols-1  gap-2 px-5">
          {tv.production_companies.map((prod: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border border-neutral-800 rounded-2xl bg-[#1D1F23] hover:border-blue-500 transition-all duration-300 h-16"
            >
              <div className="w-12 flex items-center justify-center">
                {prod.logo_path ? (
                  <Image
                    alt="logo"
                    width={50}
                    height={50}
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${prod.logo_path}`}
                    className="p-2"
                  />
                ) : (
                  <RiBuilding2Line className="text-md text-blue-500" />
                )}
              </div>
              <p className="font-semibold text-sm text-gray-300">{prod.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
