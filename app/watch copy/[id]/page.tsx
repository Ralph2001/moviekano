// app/movies/[id]/page.tsx
import { notFound } from "next/navigation";
import { moviesApi } from "@/services/tmdbClient";
import { Metadata } from "next";
import { movieSources } from "@/app/utils/sources";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
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

export default async function Watch({
  params,
}: {
  params: { id: number; src: number };
}) {
  const { id, src } = await params;
  const movie = await moviesApi.getById(id).catch(() => null);
  const source = movieSources[src].url;
  if (!movie) notFound();
  const videoUrl = `${process.env.MOVIE_SOURCE}/${id}`;
  return (
    <div className="w-full fixed  flex-col top-0 bottom-0 right-0 left-0 z-50  min-h-screen h-full bg-[#000000] flex">
      {src}
      <div className="h-full">
        <iframe
          src={`${source}/${id}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
