"use client";
import React, { useState, KeyboardEvent, useRef } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const startTouchRef = useRef<number>(0); // Ref to track touch start position

  // Handle keyboard navigation with Arrow keys
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

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStart = e.touches[0].clientX;
    startTouchRef.current = touchStart;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchDifference = startTouchRef.current - touchEnd;

    // Swipe left (to change to next tab)
    if (touchDifference > 50) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % tabs.length);
    }
    // Swipe right (to change to previous tab)
    else if (touchDifference < -50) {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? tabs.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-1 min-h-0">
      {/* Tab buttons */}
      <div className="flex flex-row items-center justify-start w-full border-b border-neutral-800 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`${
              activeIndex === index
                ? "text-blue-500 border-b-2 bg-blue-500/10 rounded-t-lg"
                : "text-gray-50 border-b-2 border-transparent"
            } transition-all w-20 duration-300 cursor-pointer text-sm font-medium outline-none ring-0 p-2`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        id={`tabpanel-${activeIndex}`}
        className="w-full flex flex-col flex-1 min-h-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
