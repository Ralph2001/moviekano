// app/movies/[id]/page.tsx
import { notFound } from "next/navigation";
import { moviesApi } from "@/services/tmdbClient";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await moviesApi.getById(id).catch(() => null);

  return {
    title: movie?.title || "Movie Details",
    description: movie?.overview?.slice(0, 150) + "...",
    openGraph: {
      images: movie?.poster_path
        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
        : "/default-movie.jpg",
    },
  };
}

export default async function Watch({ params }: { params: { id: string } }) {
  const { id } = await params;
  const movie = await moviesApi.getById(id).catch(() => null);

  const embedUrl = `https://embed.su/embed/movie/${id}`;
  if (!movie) notFound();

  return (
    <div className="w-full fixed top-0 bottom-0 right-0 left-0 z-50  min-h-screen h-full bg-[#0F0F0F] flex flex-col">
      {/* Hero Section */}
      <div className="h-screen">
        <iframe
          // src={`https://vidlink.pro/movie/${id}?player=default&autoplay=1&volume=100&mute=0`}
          src={`https://embed.su/embed/movie/${id}`}
          // src={`/api/proxy?url=${encodeURIComponent(embedUrl)}`}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          frameBorder={0}
          scrolling="no"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
