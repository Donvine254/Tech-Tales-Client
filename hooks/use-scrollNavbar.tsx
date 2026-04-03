import { useState, useEffect } from "react";
/*
*** This hook manages the visibility of a navbar based on scroll behavior. ***
*** The navbar is shown when: ***
1. The user is at the top of the page (within 100px). ***
2. The user is near the bottom of the page (within 200px of the bottom). ***
3. The user is scrolling up. ***
*/
export const useScrollNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show navbar at top of page
      if (currentScrollY < 100) {
        setIsVisible(true);
      }
      // Show navbar when near bottom (within 200px of bottom)
      else if (currentScrollY + windowHeight >= documentHeight - 200) {
        setIsVisible(true);
      }
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return isVisible;
};
