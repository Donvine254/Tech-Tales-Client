"use client";

import React, { useState, useEffect, useCallback } from "react";

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    setScrollProgress(scrolled);

    if (winScroll > window.innerHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (!hasMounted) return null;
  return (
    <div id="scroll" className="fixed bottom-8 md:bottom-20 right-2">
      {showButton && (
        <div
          id="scroll-wrapper"
          className="p-2 h-12 w-12 flex items-center  justify-center border border-blue-500  hover:-translate-y-1 transition-transform duration-300"
          style={{
            background: `conic-gradient(#2B7FFF ${scrollProgress}%, #9ca3af ${scrollProgress}%)`,
            borderRadius: "50%",
          }}>
          <button
            onClick={handleButtonClick}
            id="scroll-to-top"
            title="Go to top"
            className="rounded-full h-10 w-10 p-1 bg-gray-100  text-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-xl ">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollButton;
