// components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-gray-200 group text-sm flex flex-row relative items-center gap-2  w-10  h-10  rounded-full active:bg-[#1D1F23] focus:bg-[#1D1F23] hover:bg-[#1D1F23] cursor-pointer  px-2 justify-center py-1.5 transition-all duration-300  "
    >
      <FaChevronLeft className="group-hover:left-3 transition-all duration-300" />
    </button>
  );
}
