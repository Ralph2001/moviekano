"use client";
import MovieCardLoading from "@/components/loading/MovieCardLoading";
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
    <main className="w-full min-h-screen h-full flex flex-col items-center   pb-14 md:pb-0">
      <div className="max-w-screen-2xl p-4 h-full md:lg:pl-[4rem] w-full flex flex-col justify-center">
        <section className="flex flex-col gap-2 mt-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-2 md:lg:px-10"
          >
            <div className="flex flex-col gap-1 mb-4">
              <h1 className="text-3xl md:text-3xl font-extrabold text-gray-200">
                Search Movies & TV Shows
              </h1>
              <p className="text-sm text-gray-500">
                Browse through titles you love
              </p>
            </div>

            <div className="w-full flex flex-row gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-gray-900 outline-none ring-0 border  border-gray-800 focus:border-gray-600 placeholder:font-normal placeholder:text-xs w-full focus:ring-gray-600 placeholder-gray-500 text-white rounded-xl px-4 py-2 transition-colors"
              />
              <button className="bg-[#4784E8] outline-none ring-0 focus:bg-blue-400 focus:border focus:border-blue-500 focus:ring-2 focus:ring-blue-500 hover:bg-blue-400 rounded-xl cursor-pointer px-2 text-white w-26 h-10 font-medium text-sm">
                Search
              </button>
            </div>
          </form>
        </section>

        <section className="flex gap-2 mb-4 md:lg:px-10 mt-4">
          <button
            onClick={() => setMediaType("movie")}
            className={`px-4 py-2 rounded-2xl cursor-pointer text-sm font-medium ${
              mediaType === "movie"
                ? "bg-[#4784E8] text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setMediaType("tv")}
            className={`px-4 py-1 rounded-2xl cursor-pointer text-sm font-medium ${
              mediaType === "tv"
                ? "bg-[#4784E8] text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Tv
          </button>
        </section>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:lg:px-10 mt-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <MovieCardLoading key={index} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:lg:px-10 mt-4">
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
