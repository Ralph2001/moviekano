// app/movies/[id]/page.tsx

import { notFound } from "next/navigation";
import { moviesApi, tvApi } from "@/services/tmdbClient";
import { Metadata } from "next";
import { movieSources, tvSources } from "@/app/utils/sources";
import { unSlug } from "@/app/utils";

// Accept either 3 or 5 slug segments
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slug = params.slug;
  if (!slug || (slug.length !== 3 && slug.length !== 5)) notFound();

  return {
    title: "Now Watching",
    description: "This website is created by me",
  };
}

export default async function Watch({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // const [type, sourceIndexRaw, idRaw, seasonId, epId] = slug;
  const type = slug[0];
  const sourceIndexRaw = slug[1];
  const idRaw = slug[2];
  const seasonId = slug[3] ? slug[3] : null;
  const epId = slug[4] ? slug[4] : null;

  if (!slug || slug.length < 3 || slug.length > 5) {
    notFound();
  }

  if (type !== "movie" && type !== "tv") {
    notFound();
  }

  const sourceIndex = parseInt(sourceIndexRaw, 10);
  const id = parseInt(idRaw, 10);
  if (!/^\d+$/.test(idRaw)) {
    notFound();
  }

  const mediaSources = type === "tv" ? tvSources : movieSources;

  if (
    (type !== "movie" && type !== "tv") ||
    isNaN(sourceIndex) ||
    sourceIndex < 0 ||
    sourceIndex >= mediaSources.length ||
    isNaN(id)
  ) {
    notFound();
  }

  let media: any = null;

  if (type === "movie") {
    media = await moviesApi.getById(id).catch(() => null);
  } else if (type === "tv") {
    media = await tvApi.getById(id).catch(() => null);
  }

  if (!media) {
    notFound();
  }

  const source = mediaSources[sourceIndex].url;

  const iframeSrc =
    type === "movie"
      ? `${source}/${id}`
      : seasonId && epId
      ? `${source}/${id}/${seasonId}/${epId}`
      : `${source}/${id}`;

  return (
    <div className="w-full fixed flex-col top-0 bottom-0 right-0 left-0 z-50 min-h-screen h-full bg-white flex">
      <div className="h-full">
        <iframe
          src={iframeSrc}
          className="w-full h-full"
          frameBorder={0}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

{
  // For debugging purposes
  /* <p>Type: {type}</p>
      <br />
      <p>Source: {sourceIndexRaw}</p>
      <br />
      <p>TMDB ID: {idRaw}</p>
      <br />
      <p>Season ID: {seasonId}</p>
      <br />
      <p>Episode ID: {epId}</p>
      <p>{`${source}/${id}/${seasonId}/${epId}`}</p>
      <p>{iframeSrc}</p> */
}
