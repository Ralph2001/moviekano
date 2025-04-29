"use client";
//@components/TrendingCard.tsx
import Image from "next/image";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

import slugify from "react-slugify";

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
      className="flex flex-col gap-2 cursor-pointer  rounded-lg group p-2 w-full focus:bg-gray-800 overflow-hidden     transition-all duration-200  h-[20rem]   outline-none focus:outline-none ring-0 group"
      aria-label={`View details for ${media.title}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden w-full z-50  rounded-lg h-full transition-all duration-200 ease-in-out">
        <div className="absolute top-2 right-2 z-50 bg-[#D0A007] rounded-full px-1.5 py-0.5 text-gray-900 flex items-center justify-center flex-row gap-0.5">
          <FaStar className="text-xs" />
          <p className="text-xs font-medium">
            {truncateToTwoDecimals(media.vote_average)}
          </p>
        </div>
        <Image
          src={
            media.poster_path
              ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${media.poster_path}`
              : "/default.png"
          }
          alt={media.title ? media.title : media.name ? media.name : ""}
          fill
          quality={50}
          className="object-cover shadow rounded-lg group-focus:scale-105  group-hover:scale-105 transition-all duration-500  "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/placeholder-media.jpg"
        />
        {isFocus && (
          <div
            tabIndex={-1}
            className="absolute flex items-center rounded-lg justify-center w-full h-full backdrop-brightness-50 duration-400 transition-all"
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
      <div className="h-auto  p-0.5    flex flex-col overflow-hidden">
        {/* Title */}
        <p
          title={media.title ? media.title : media.name ? media.name : ""}
          className=" text-xs md:text-sm  text-gray-400 truncate"
        >
          {media.title ? media.title : media.name ? media.name : ""}
        </p>
        {/* Info */}
        {/* <div className="flex items-center mt-auto text-slate-500 font-medium gap-1 flex-row w-full">
          {media.media_type && (
            <div className="rounded text-xs bg-[#060B11] text-white px-1.5 border border-neutral-800">
              {media.media_type === "movie"
                ? "Movie"
                : media.media_type === "tv"
                ? "TV"
                : ""}
            </div>
          )}

          <p className="text-sm ml-auto">
            {media.release_date
              ? format(new Date(media.release_date), "yyyy")
              : media.first_air_date
              ? format(new Date(media.first_air_date), "yyyy")
              : ""}
          </p>
        </div> */}
      </div>
    </div>
  );
};
