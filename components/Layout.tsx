"use client";
// components/Layout.tsx
import { useEffect, useState } from "react";
import { isTvDevice } from "@/app/utils/detectTv";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent;
      // if (isTvDevice(userAgent)) {
      //   setShowSidebar(true);
      // } else {
      //   setShowSidebar(false);
      // }
    }
  }, []);

  return (
    <div>
      {!showSidebar && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
