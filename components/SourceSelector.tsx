"use client";
import { movieSources } from "@/app/utils/sources";
import React, { useState } from "react";

interface SourceSelectorProps {
  currentServer: string;
  setServer: (newServer: string) => void;
}

const SourceSelector: React.FC<SourceSelectorProps> = ({
  currentServer,
  setServer,
}) => {
  // const [currentServer, setCurrentServer] = useState<string>(
  //   "https://vidlink.pro/movie"
  // );

  const handleServerChange = (server: string) => {
    setServer(server);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <select
        className="w-52 outline-none px-3 py-2 font-medium text-sm bg-[#1D1F23] text-gray-200 rounded-lg transition duration-150 ease-in-out hover:bg-[#2A2D33] focus:ring-2 focus:ring-blue-500"
        value={currentServer}
        onChange={(e) => handleServerChange(e.target.value)}
      >
        {movieSources.map((source) => (
          <option
            className="font-medium flex items-center flex-col gap-2"
            key={source.url}
            value={source.url}
          >
            {source.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SourceSelector;
