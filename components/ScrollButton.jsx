// "use client";

// import React, { useState, useEffect, useCallback } from "react";

// import { SortUp } from "@/assets";

// const ScrollToTopButton = () => {
//   const [showButton, setShowButton] = useState(false);

//   const handleScroll = useCallback(() => {
//     if (window.scrollY > window.innerHeight) {
//       setShowButton(true);
//     } else {
//       setShowButton(false);
//     }
//   }, []);

//   const handleButtonClick = useCallback(() => {
//     window.scroll({
//       top: 0,
//       left: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [handleScroll]); // Dependency array to ensure the correct cleanup
//   //show scroll progress as a border fill
//   useEffect(() => {
//     //update this so that there is a border radius filled when we scroll
//     const myFunction = () => {
//       const winScroll = document.documentElement.scrollTop;
//       const height =
//         document.documentElement.scrollHeight -
//         document.documentElement.clientHeight;
//       const scrolled = (winScroll / height) * 100;
//       document.getElementById("scroll-to-top").style.width = scrolled + "%";
//     };

//     window.addEventListener("scroll", myFunction);

//     return () => {
//       window.removeEventListener("scroll", myFunction);
//     };
//   }, []);

//   return (
//     <div id="scroll" className="fixed bottom-5 right-5 ">
//       {showButton && (
//         <button
//           onClick={handleButtonClick}
//           id="scroll-to-top"
//           title="Go to top"
//           className="rounded-full h-8 w-8 shadow-lg shadow-gray-500 hover:-translate-y-1 transition-transform duration-300 p-1 bg-cyan-500 text-white">
//           <SortUp size={30} />
//         </button>
//       )}
//     </div>
//   );
// };

// export default ScrollToTopButton;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SortUp } from "@/assets";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <div id="scroll" className="fixed bottom-5 right-5">
      {showButton && (
        <div
          id="scroll-wrapper"
          className="p-2 h-12 w-12 flex items-center justify-center border border-gray-400 shadow hover:-translate-y-1 transition-transform duration-300"
          style={{
            background: `conic-gradient(#1f2937 ${scrollProgress}%, #9ca3af ${scrollProgress}%)`,
            borderRadius: "50%",
          }}>
          <button
            onClick={handleButtonClick}
            id="scroll-to-top"
            title="Go to top"
            className="rounded-full h-10 w-10 p-1 bg-gray-50 border  text-[#1f2937]">
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

export default ScrollToTopButton;
