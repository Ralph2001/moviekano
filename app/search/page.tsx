"use client";
import { SearchCard } from "@/components/SearchCard";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

type MediaType = "movie" | "tv";

const Page = () => {
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  const [results, setResults] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchResults = async (page = 1, isNewSearch = false) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/search`, {
        params: {
          query,
          mediaType,
          page,
        },
      });

      const data = Array.isArray(res.data.results) ? res.data.results : [];

      if (isNewSearch) {
        setResults(data);
      } else {
        setResults((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetAndFetch = (q = query, page = 1) => {
    setPageNum(page);
    setResults([]);
    fetchResults(page, true);
  };

  useEffect(() => {
    if (query) {
      resetAndFetch(query, 1);
    }
  }, [mediaType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      resetAndFetch(query, 1);
    }
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 300 >=
        document.documentElement.scrollHeight &&
      !loading &&
      hasMore
    ) {
      const nextPage = pageNum + 1;
      setPageNum(nextPage);
      fetchResults(nextPage);
    }
  }, [loading, hasMore, pageNum, fetchResults]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <main className="w-full min-h-screen h-full flex flex-col items-center">
      <div className="max-w-screen-xl p-4 h-full md:lg:pl-[4rem] w-full flex flex-col justify-center">
        <section className="flex flex-col gap-2 mt-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-2 md:lg:px-10"
          >
            <div className="mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-300 mb-1">
                Search Movies and TV Shows
              </h1>
              <p className="text-gray-400 text-sm">
                Browse titles, genres, or your favorite stars
              </p>
            </div>

            <div className="w-full flex flex-row gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-gray-900 outline-none ring-0 border font-medium border-gray-800 focus:border-gray-600 placeholder:font-normal placeholder:text-xs w-full focus:ring-gray-600 placeholder-gray-500 text-white rounded-lg px-4 py-2 transition-colors"
              />
              <button className="bg-blue-500 outline-none ring-0 focus:bg-blue-400 focus:border focus:border-blue-500 focus:ring-2 focus:ring-blue-500 hover:bg-blue-400 rounded-xl px-2 text-white w-26 h-10 font-medium text-sm">
                Search
              </button>
            </div>
          </form>
        </section>

        <section className="flex gap-2 mb-4 md:lg:px-10 mt-4">
          <button
            onClick={() => setMediaType("movie")}
            className={`px-4 py-1 rounded ${
              mediaType === "movie"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setMediaType("tv")}
            className={`px-4 py-1 rounded ${
              mediaType === "tv"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            TV Shows
          </button>
        </section>

        {loading && <p className="text-white">Loading...</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:lg:px-10 mt-4">
          {results.map((item, index) => (
            <SearchCard
              media={item}
              key={`${item.id}-${index}`}
              media_type={mediaType}
            />
          ))}
        </div>

        {!hasMore && results.length > 0 && (
          <p className="text-gray-400 mt-4 text-center">No more results</p>
        )}
      </div>
    </main>
  );
};

export default Page;
