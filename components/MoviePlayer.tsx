"use client";
import { formatDate } from "@/app/utils";
import Image from "next/image";
import React, { useState } from "react";
import SourceSelector from "./SourceSelector";
import BackButton from "./BackButton";
import { Anton } from "next/font/google";
import clsx from "clsx";

interface MoviePlayerProps {
  movie: TMDBTypes.Movie;
}

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const MoviePlayer: React.FC<MoviePlayerProps> = ({ movie }) => {
  const [server, setServer] = useState("https://vidlink.pro/movie");
  const [iframeSrc, setiframeSrc] = useState(""); // Don't autoplay
  const [readyToPlay, setReadyToPlay] = useState(false);

  const handleServerChange = (newServer: string) => {
    setServer(newServer);
    if (readyToPlay) {
      setiframeSrc(`${newServer}/${movie.id}`);
    }
  };

  const handleWatchClick = () => {
    setiframeSrc(`${server}/${movie.id}`);
    setReadyToPlay(true);
  };

  return (
    <div className="h-full flex flex-col  relative">
      <div className="flex  top-0 h-12   fixed  md:static    bg-[#080E15] right-0 left-0 flex-row z-50 items-center gap-2 outline-none">
        <BackButton />
        <p
          className={clsx(
            anton.className,
            "text-base truncate md:text-2xl font-bold text-gray-50"
          )}
        >
          {movie.title} ({formatDate(movie.release_date, "yyyy")})
        </p>
      </div>

      <div className="flex-1 outline-none mt-12 md:mt-0  ">
        {readyToPlay ? (
          <iframe
            src={iframeSrc}
            className="w-full h-full rounded-2xl shadow-md min-h-60 outline-none"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full rounded-2xl min-h-56 shadow-md overflow-hidden bg-black/30">
            <Image
              src={
                movie.backdrop_path
                  ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${movie.backdrop_path}`
                  : "/default.jpg"
              }
              alt="Backdrop"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70 z-10" />
            <div className="absolute inset-0 z-20 justify-center flex flex-col items-center px-4 text-center">
              <p className="md:text-2xl font-bold text-gray-50 font-mono">
                {movie.title}
                {movie.release_date && (
                  <span className="italic">
                    ({formatDate(movie.release_date, "yyyy")})
                  </span>
                )}
              </p>
              <button
                onClick={handleWatchClick}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                ▶ Watch
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full p-2  grid md:grid-cols-2 gap-1">
        <div className="flex flex-col gap-2 ">
          <SourceSelector
            currentServer={server}
            setServer={(newServer) => handleServerChange(newServer)}
          />
          <p className="text-xs text-gray-500 italic ">
            Having trouble? Try a different source.
          </p>
        </div>
        <div>
          {/* <p className="font-medium text-gray-50">Next Movie</p> */}
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;
