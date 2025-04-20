"use client";
import { movieSources } from "@/app/utils/sources";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { FaCircle, FaPlay, FaStar } from "react-icons/fa";
import slugify from "react-slugify";

interface SelectSourceProps {
  id: number;
  type: string;
  title: string;
}

const SelectSource: React.FC<SelectSourceProps> = ({ id, type, title }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePlay = (selected: number) => {
    const encodedSource = encodeURIComponent(selected);
    router.push(`/watch/${type}/${encodedSource}/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const playButton =
    "text-xs px-4 md:lg:px-12 py-2 md:lg:py-3 w-full justify-center font-bold transition-all duration-200 rounded-lg flex items-center gap-2 text-black outline-none ring-0 focus:outline-2 focus:ring-3 focus:ring-blue-500";

  return (
    <div className="flex flex-col gap-4 relative z-50" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(true)}
        className={clsx(
          playButton,
          "w-full bg-amber-400 hover:bg-amber-500 focus:bg-amber-500"
        )}
      >
        <FaPlay className="text-xs" /> Watch
      </div>
      {isOpen && (
        <div className="absolute shadow-2xl flex flex-col overflow-y-auto rounded-lg no-scrollbar w-full min-h-34 max-h-56 top-12  bg-gray-200">
          {movieSources.map((source, index) => (
            <button
              className="w-full items-start cursor-pointer active:bg-gray-300 focus:bg-gray-300 hover:bg-gray-300 px-3 py-1.5 text-sm transition-all duration-200 "
              key={index}
              value={source.url}
              onClick={() => handlePlay(index)}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="w-4">
                  {source.star ? (
                    <span>
                      <FaStar className="text-amber-500 text-sm" />
                    </span>
                  ) : (
                    <span>
                      <FaStar className="text-amber-800 text-sm" />
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="font-bold text-md text-gray-800">
                    {source.name}
                    {/* Source {index + 1} */}
                  </p>
                  <div className="text-xs w-full text-gray-500">
                    {source.withAds ? (
                      <div className="italic flex gap-1 flex-row">
                        May show ads. Turn on AdBlocker.
                      </div>
                    ) : (
                      <div className="font-medium flex items-center gap-1 flex-row">
                        No ads — uninterrupted viewing.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectSource;
