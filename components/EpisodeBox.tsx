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
      tabIndex={0}
      className="group flex flex-row items-center hover:bg-[#16171a] border  justify-center h-80 w-full  rounded-xl overflow-hidden cursor-pointer"
    >
      <div className="relative h-full w-full flex-1 overflow-hidden">
        <Image
          alt={episode.name}
          fill
          className="object-cover border-b group-hover:scale-105 transition-all duration-300 border-neutral-800"
          src={
            episode.still_path
              ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${episode.still_path}`
              : "/default-movie.jpg"
          }
        />
        {/* Dark overlay that hides on hover */}
        <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 group-hover:opacity-0" />
      </div>

      <div className="w-[65%] h-full px-2.5 flex flex-col overflow-ellipsis py-0.5">
        <p className="text-gray-100 font-semibold text-sm">
          Episode {episode.episode_number}
        </p>
        <p className="text-white line-clamp-2 text-sm mt-auto">
          {episode.name}
        </p>
      </div>
    </div>
  );
};

export default EpisodeBox;
