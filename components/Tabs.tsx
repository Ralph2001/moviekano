//components/Tabs.tsx
"use client";
import React, { useState, KeyboardEvent } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight") {
      setActiveIndex((prevIndex) => (prevIndex + 1) % tabs.length);
    } else if (e.key === "ArrowLeft") {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? tabs.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col  gap-1 min-h-0">
      <div className="flex flex-row items-center justify-start   w-full border-b border-neutral-800 mb-4 ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`${
              activeIndex === index
                ? "text-blue-500 border-b-2 bg-blue-500/10 "
                : "text-gray-50 border-b-2 border-transparent"
            }   transition-all duration-300 cursor-pointer text-sm font-medium p-2 `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`tabpanel-${activeIndex}`}
        className="w-full flex flex-col  flex-1  min-h-0"
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
