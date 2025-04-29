// components/NavBar.tsx
import React, { FC, useState, useCallback } from "react";
import Link from "next/link";
import { SidebarPaths } from "@/app/lib/SidebarPaths";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { IoIosInformationCircle } from "react-icons/io";

const NavBar: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed md:hidden w-full bottom-0 bg-[#1D1F23] z-[90] overflow-hidden shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between h-12 ">
          {/* <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-white font-bold text-md tracking-wide"
            >
              MovieKano
            </Link>
          </div> */}
          <div className="flex flex-row justify-between w-full items-center ">
            {SidebarPaths.map(({ name, path, icon: Icon }, index) => (
              <Link
                href={path}
                key={index}
                className={clsx(
                  pathname === path
                    ? "border-b-2 border-blue-400"
                    : "border-b-2 border-transparent",
                  "flex gap-1 flex-col items-center transition-all duration-300 "
                )}
              >
                <Icon
                  className={clsx(
                    pathname === path ? "text-blue-400" : "text-gray-300",
                    "text-lg"
                  )}
                />
                <span
                  className={clsx(
                    pathname === path ? "text-blue-400" : "text-gray-400",
                    " text-xs mb-1"
                  )}
                >
                  {name}
                </span>
              </Link>
            ))}
            <Link
              href={"/info"}
              className={clsx(
                pathname === "/info"
                  ? "border-b-2 border-blue-400"
                  : "border-b-2 border-transparent",
                "flex gap-1 flex-col items-center transition-all duration-300 "
              )}
            >
              <IoIosInformationCircle
                className={clsx(
                  pathname === "/info" ? "text-blue-400" : "text-gray-300",
                  "text-lg"
                )}
              />
              <span
                className={clsx(
                  pathname === "/info" ? "text-blue-400" : "text-gray-400",
                  " text-xs mb-1"
                )}
              >
                About
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
