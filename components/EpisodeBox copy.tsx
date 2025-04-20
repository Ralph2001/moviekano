"use client";
import { formatDate } from "@/app/utils";
import Image from "next/image";
import React, { useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";

interface EpisodeBoxProps {
  episode: TMDBTypes.TVEpisodes;
  onClick?: () => void;
}

const EpisodeBox: React.FC<EpisodeBoxProps> = ({ episode, onClick }) => {
  const [isShowingPlay, setIsShowingPlay] = useState(false);

  const handleClick = () => {
    if (onClick) return onClick();
  };

  return (
    <div
      onMouseEnter={() => setIsShowingPlay(true)}
      onMouseLeave={() => setIsShowingPlay(false)}
      tabIndex={0}
      onClick={handleClick}
      onFocus={() => setIsShowingPlay(true)}
      onBlur={() => setIsShowingPlay(false)}
      className="border flex cursor-pointer flex-col h-52 w-full overflow-hidden border-neutral-800 text-gray-300 text-center bg-[#1D1F23] hover:border-blue-500 transition-all duration-300 font-medium text-sm rounded-2xl"
    >
      <div className="flex-1 relative h-full w-full ">
        {/* Play Button */}
        {isShowingPlay && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <FaRegCirclePlay className="text-5xl text-amber-400" />
          </div>
        )}
        <Image
          alt={episode.name}
          fill
          className="rounded-t-2xl border-b border-neutral-800 object-cover w-full h-36"
          src={
            `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${episode.still_path}` ||
            "/default-movie.jpg"
          }
        />
      </div>
      <div className=" bg-[#16171a] p-1 h-24 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-gray-100 overflow-hidden  px-2 flex flex-row font-bold text-md  ">
          <span> {episode.episode_number}. </span>
          <p className="">{episode.name}</p>
        </div>
        <div className="flex items-center justify-center  flex-row gap-2 ">
          <span className="text-gray-400 text-xs">
            <FaCalendar className="inline-block" />{" "}
            {formatDate(episode.air_date, "MMMM dd, yyyy")}
          </span>
          <span className="text-gray-400 text-xs">
            <IoTimeOutline className="inline-block" /> {episode.runtime} min
          </span>
        </div>
      </div>
    </div>
  );
};

export default EpisodeBox;
