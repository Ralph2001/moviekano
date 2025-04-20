// components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-gray-200 group text-sm flex flex-row relative items-center  gap-2 w-24 cursor-pointer rounded-2xl px-2 justify-center py-1.5 transition-all duration-300 hover:bg-[#1D1F23] "
    >
      <FaArrowLeftLong className="group-hover:left-3 absolute left-4 transition-all duration-300" />{" "}
      <span className="font-medium ml-6">Return</span>
    </button>
  );
}
