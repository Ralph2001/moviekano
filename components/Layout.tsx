"use client";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const showBar =
    pathname === "/" ||
    pathname === "/movie" ||
    pathname === "/search" ||
    pathname === "/tv" ||
    pathname === "/info";

  return (
    <div>
      {showBar && (
        <>
          <NavBar />
          <Sidebar />
        </>
      )}

      {children}
    </div>
  );
};

export default Layout;
