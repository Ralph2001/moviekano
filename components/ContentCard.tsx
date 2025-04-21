"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  posterPath: string | null;
  title: string;
}

const fallbackImage = "/default.png";

const ContentCard = ({ posterPath, title }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageSrc =
    posterPath && !hasError
      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${posterPath}`
      : fallbackImage;

  return (
    <div className="relative w-[230px] h-[22rem]">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-2xl" />
      )}

      <Image
        src={imageSrc}
        alt={title}
        width={230}
        height={230}
        quality={50}
        className={`rounded-2xl duration-300 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default ContentCard;
