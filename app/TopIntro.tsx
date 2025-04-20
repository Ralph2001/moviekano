import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaAward, FaBookmark, FaPlay, FaStar } from "react-icons/fa";
import clsx from "clsx";
import { format } from "date-fns";
import { IoMdAlert } from "react-icons/io";
import { useRouter } from "next/navigation";
import slugify from "react-slugify";

interface MovieListProps {
  titles?: TMDBTypes.Trending[];
  isLoading?: boolean;
  isError?: boolean;
}

const TopIntro: React.FC<MovieListProps> = ({ titles, isLoading, isError }) => {
  const router = useRouter();
  const [randomMovie, setRandomMovie] = useState<TMDBTypes.Trending | null>(
    null
  );
  const [currentPick, setCurrentPick] = useState<number>(0);
  const playButton =
    "text-xs  px-4  md:lg:px-10 py-2   md:lg:py-3  w-fit  font-bold  transition-all  duration-200  rounded-full   flex  flex-row  gap-2  items-center text-black outline-none ring-0 focus:outline-2 focus:ring-3 focus:ring-blue-500";

  useEffect(() => {
    if (titles && titles.length > 0) {
      const pickRandom = () => {
        const index = Math.floor(Math.random() * titles.length);
        setRandomMovie(titles[index]);
        setCurrentPick(index);
      };

      pickRandom();
      const interval = setInterval(pickRandom, 15000);
      return () => clearInterval(interval);
    }
  }, [titles]);

  function truncateToTwoDecimals(num: number): number {
    return Math.floor(num * 100) / 100;
  }

  const getMediaType = (media: TMDBTypes.Trending): "movie" | "tv" | null => {
    if (media.media_type === "movie" || media.media_type === "tv") {
      return media.media_type;
    }
    return null;
  };

  const getMovieDetails = useCallback(
    (media: TMDBTypes.Trending) => {
      const mediaType = getMediaType(media);
      if (!mediaType) {
        console.warn("Unsupported media type:", media.media_type);
        return;
      }

      const title = media.title || media.name || "unknown";
      const slugifiedTitle = slugify(title);
      const fullSlug = `${slugifiedTitle}-${media.id}`;

      router.push(`/${mediaType}/details/${fullSlug}`);
    },
    [router]
  );

  return (
    <div className="relative h-[calc(100vh-200px)] md:lg:h-[calc(100vh-250px)] max-h-[50rem] flex flex-row items-center justify-center w-full">
      {randomMovie && (
        <>
          {/* {randomMovie.media_type === "movie" ? <MovieTag /> : <TvTag />} */}
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${randomMovie.backdrop_path}`}
            alt={""}
            fill
            className="object-cover opacity-50 "
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#080e15] via-[#080e15]/40 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-r w-[30%] from-[#080e15] via-[#080e15]/40 to-transparent" />

          <div className="relative z-10 flex h-full w-full items-end justify-center p-4 ">
            <div className="container mx-auto flex justify-center md:lg:px-12 items-center">
              <div className="flex flex-1 flex-col justify-center gap-2 p-4 overflow-hidden">
                <div className="w-fit">
                  <div className="rounded-full flex items-center  justify-center bg-[#FFFFFF]/30 px-4 py-1.5 bg-opacity-20 ">
                    <p className="text-white font-medium text-xs  justify-center flex items-center flex-row gap-1">
                      <FaAward className="text-[#ECC761] text-md" /> Featured
                    </p>
                  </div>
                </div>
                <h1 className="text-2xl md:lg:text-4xl text-white font-bold drop-shadow-2xl truncate">
                  {randomMovie.title
                    ? randomMovie.title
                    : randomMovie.name
                    ? randomMovie.name
                    : ""}
                </h1>

                <div className="flex flex-row items-center gap-2  text-xs text-gray-200">
                  <span className="text-xs">
                    {randomMovie.release_date
                      ? format(new Date(randomMovie.release_date), "yyyy")
                      : randomMovie.first_air_date
                      ? format(new Date(randomMovie.first_air_date), "yyyy")
                      : ""}
                  </span>
                  <div className="flex flex-row items-center gap-2">
                    <p className=" flex flex-row gap-1 items-center  px-1 text-white rounded  text-xs font-medium">
                      <FaStar className="text-[#ECC761]" />
                      {truncateToTwoDecimals(randomMovie.vote_average)} / 10
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <p className="max-w-5xl text-justify sm:text-sm md:text-md text-slate-300 leading-relaxed">
                    {randomMovie.overview.length > 200
                      ? `${randomMovie.overview.slice(0, 200)}...`
                      : randomMovie.overview}
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center mt-auto">
                  <button
                    onClick={() => getMovieDetails(randomMovie)}
                    className="w-30 rounded-lg py-1.5 border-2 flex flex-row items-center cursor-pointer justify-center gap-2 bg-white/10 hover:bg-white/20 border-white"
                  >
                    <IoMdAlert className="text-white" />{" "}
                    <p className="text-white font-medium text-sm">Details</p>
                  </button>

                  {/* <Link
                    href={`/watch/${randomMovie.id}`}
                    // style={{
                    //   boxShadow: "rgba(251, 191, 36, 0.4) 0px 4px 16px",
                    // }}
                    className={clsx(
                      playButton,
                      " bg-amber-400 focus:bg-amber-500 hover:bg-amber-500 "
                    )}
                  >
                    <FaPlay className="text-xs" /> Watch
                  </Link> */}
                  {/* <Link
                    href={`/watch/${randomMovie.id}`}
                    className={clsx(
                      playButton,
                      " border border-white  text-white bg-white/10 backdrop-blur-md  hover:bg-gray-100 group hover:text-gray-800"
                    )}
                  >
                    <FaBookmark className="text-xs text-white group-hover:text-gray-800" />{" "}
                    Save
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TopIntro;
