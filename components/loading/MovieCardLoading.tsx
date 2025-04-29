// components/MovieCardSkeleton.tsx
"use client";
import React, { FC } from "react";

export const MovieCardLoading: FC = () => (
  <div className="flex flex-col gap-2 rounded-2xl overflow-hidden shadow p-2 animate-pulse h-full">
    {/* Image Placeholder */}
    <div className="w-full rounded-2xl bg-gray-700 h-[15rem]" />

    {/* Title + Year Placeholder */}
    <div className="mt-2 flex flex-col space-y-2 h-[3rem]">
      <div className="w-3/4 h-4 bg-gray-600 rounded" />
      <div className="w-1/4 h-3 bg-gray-600 rounded" />
    </div>
  </div>
);

export default MovieCardLoading;
