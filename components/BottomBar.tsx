"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFilm, FaHome, FaInfoCircle, FaSearch } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { FaTv } from "react-icons/fa6";
import clsx from "clsx";
import path from "path";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed flex md:lg:hidden right-0 left-0 w-full h-14 py-4 transition-all hover:shadow-2xl duration-200 bg-[#141313]  bottom-0 z-50  items-center p-2 ">
      <div className="mt-4 flex flex-row gap-2 h-full w-full">
        <Link
          href={"/"}
          className={clsx(
            pathname === "/" ? "bg-gray-800 shadow-2xl" : "bg-none",
            "flex items-center text-gray-300 justify-center hover:bg-gray-800  p-2.5 rounded-sm   transition-all duration-200 ease-in-out "
          )}
        >
          <FaHome className="text-2xl" />
        </Link>
        <Link
          href={"/movie"}
          className={clsx(
            pathname === "/movie" ? "bg-gray-800 shadow-2xl" : "bg-none",
            "flex items-center text-gray-300 justify-center hover:bg-gray-800  p-2.5 rounded-sm   transition-all duration-200 ease-in-out "
          )}
        >
          <FaFilm className="text-2xl" />
        </Link>
        <Link
          href={"/tv"}
          className={clsx(
            pathname === "/tv" ? "bg-gray-800 shadow-2xl" : "bg-none",
            "flex items-center text-gray-300 justify-center hover:bg-gray-800  p-2.5 rounded-sm   transition-all duration-200 ease-in-out "
          )}
        >
          <FaTv className="text-2xl" />
        </Link>
        <Link
          href={"/search"}
          className={clsx(
            pathname === "/search" ? "bg-gray-800 shadow-2xl" : "bg-none",
            "flex items-center text-gray-300 justify-center hover:bg-gray-800  p-2.5 rounded-sm   transition-all duration-200 ease-in-out "
          )}
        >
          <FaSearch className="text-2xl" />
        </Link>
        <Link
          href={"/info"}
          className={clsx(
            pathname === "/search" ? "bg-gray-800 shadow-2xl" : "bg-none",
            "flex items-center ml-auto text-gray-300 justify-center hover:bg-gray-800  p-2.5 rounded-sm   transition-all duration-200 ease-in-out "
          )}
        >
          <FaInfoCircle className="text-2xl " />
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
