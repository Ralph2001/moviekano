//@components/TrendingCard.tsx
"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import {
  FaFilm,
  FaHotjar,
  FaMedal,
  FaPlay,
  FaStar,
  FaWpexplorer,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import slugify from "react-slugify";
import { formatDate } from "@/app/utils";
import { LuTv } from "react-icons/lu";

interface TrendingCardProps {
  media: TMDBTypes.Trending;
}

export const TrendingCard = ({ media }: TrendingCardProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const router = useRouter();

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

  const truncateToTwoDecimals = useCallback((num: number): number => {
    return Math.floor(num * 100) / 100;
  }, []);

  return (
    <div
      onMouseEnter={() => setIsFocus(true)}
      onPointerLeave={() => setIsFocus(false)}
      tabIndex={0}
      onClick={() => getMovieDetails(media)}
      onFocus={() => {
        setIsFocus(true);
      }}
      onBlur={() => setIsFocus(false)}
      className="flex flex-col gap-1.5 cursor-pointer  rounded-lg group p-0.5 w-full focus:bg-gray-800 overflow-hidden     transition-all duration-200  h-[20rem]   outline-none focus:outline-none ring-0 group"
      aria-label={`View details for ${media.title}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden w-full z-50  rounded-lg h-full transition-all duration-200 ease-in-out">
        {/* Star */}
        {/* <div className="absolute top-2 right-2 z-50 bg-[#D0A007] rounded-full px-1.5 py-0.5 text-gray-900 flex items-center justify-center flex-row gap-0.5">
          <FaStar className="text-xs" />
          <p className="text-xs font-medium">
            {truncateToTwoDecimals(media.vote_average)}
          </p>

        </div> */}

        <div className="absolute top-2 left-2 z-50 w-auto px-1.5 py-0.5 items-center bg-black/50 flex justify-center rounded-2xl">
          <p className="text-xs font-medium text-white">
            {media.media_type === "movie" ? (
              <span className="flex gap-1 items-center">
                <FaFilm className="text-blue-500" /> Movie
              </span>
            ) : media.media_type === "tv" ? (
              <span className="flex gap-1 items-center">
                <LuTv  className="text-blue-500"/> TV
              </span>
            ) : (
              ""
            )}
          </p>
        </div>

        <div className="absolute top-2 right-2 z-50 w-12 items-center bg-black/50 flex justify-center rounded-2xl">
          <p className="text-xs font-medium text-white">
            {media.release_date
              ? formatDate(media.release_date, "yyyy")
              : media.first_air_date
              ? formatDate(media.first_air_date, "yyyy")
              : ""}
          </p>
        </div>

        {/* Image */}
        <Image
          src={
            media.poster_path
              ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${media.poster_path}`
              : "/default.png"
          }
          alt={media.title ? media.title : media.name ? media.name : ""}
          fill
          quality={50}
          className="object-cover shadow-inner rounded-lg group-focus:scale-105  group-hover:scale-105 transition-all duration-500  "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/placeholder-media.jpg"
        />
        {isFocus && (
          <div
            tabIndex={-1}
            className="absolute flex items-center rounded-lg justify-center w-full h-full backdrop-brightness-[40%] duration-400 transition-all"
          >
            <button
              onClick={() => getMovieDetails(media)}
              tabIndex={-1}
              className="rounded-full hover:cursor-pointer bg-black/50 focus:cursor-pointer p-5 flex items-center justify-center"
            >
              <FaPlay className="text-xl text-amber-400 " />
            </button>
          </div>
        )}
      </div>
      {/* Title */}
      <div className="h-auto  p-0.5    flex flex-col overflow-hidden">
        <p
          title={media.title ? media.title : media.name ? media.name : ""}
          className=" text-xs md:text-sm font-semibold  text-gray-400 truncate"
        >
          {media.title ? media.title : media.name ? media.name : ""}
        </p>
      </div>
    </div>
  );
};
