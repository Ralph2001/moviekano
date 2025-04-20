// app/tv/[id]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { tvApi } from "@/services/tmdbClient";
import { unSlug } from "@/app/utils";
import TvPlayerWithSeasons from "@/components/TvPlayerWithSeasons";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const id = unSlug(slug);

  const [tv] = await Promise.all([tvApi.getById(Number(id)).catch(() => null)]);

  return {
    title: tv?.name || "Movie Details",
    description: tv ? `${tv.overview?.slice(0, 150)}...` : "",
    openGraph: {
      images: tv?.poster_path
        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${tv.poster_path}`
        : "/default-movie.jpg",
    },
  };
}

export default async function MovieDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const id = unSlug(slug);

  const [tv, similar] = await Promise.all([
    tvApi.getById(Number(id)).catch(() => null),
    tvApi.getSimilarTvShow(Number(id)).catch(() => []),
  ]);
  if (!tv) notFound();

  return (
    <div className="min-h-screen flex flex-col w-full ">
      <TvPlayerWithSeasons
        tvId={id}
        tv={tv}
        similar={similar}
        seasons={tv.seasons}
        defaultTitle={tv.name}
      />
    </div>
  );
}
