"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosInformationCircle } from "react-icons/io";
import { SidebarPaths } from "@/app/lib/SidebarPaths";
import clsx from "clsx";

const Sidebar = () => {
  const pathname = usePathname();

  const linkStyle = `
  flex 
  items-center 
  justify-center
  text-slate-400
  font-medium 
  text-2xl

  rounded-3xl
  flex-row 
  gap-3  
  transition-all 
  font-sans
  tracking-wide
  duration-300 
  h-10
  w-10
  ease-in-out
  
  outline-none
  ring-0

  `;

  const paths = SidebarPaths;
  return (
    <div className="fixed hidden md:lg:flex bg-[#080e15]/20   w-[4rem] py-4 transition-all duration-200   top-0 left-0 bottom-0 z-50   flex-col items-center p-2 ">
      <div className=" flex flex-col space-y-2 h-full w-full">
        <p
          className={clsx(
            "text-lg text-slate-200 font-sans font-medium text-center mb-4"
          )}
        ></p>

        <br />

        {paths && (
          <div className="flex flex-col gap-2">
            {paths.map(({ name, path, icon: Icon }, index) => (
              <Link
                href={path}
                key={index}
                title={name}
                className={clsx(
                  linkStyle,
                  pathname === path
                    ? "text-white  bg-[#1c2430]/60 shadow-2xl"
                    : "bg-none"
                )}
              >
                <Icon />
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/info"
          title="Info"
          className={clsx(
            linkStyle,
            pathname === "/info"
              ? "text-white bg-blue-400  shadow-2xl"
              : "bg-none",
            "mt-auto"
          )}
        >
          <IoIosInformationCircle className="font-bold" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
