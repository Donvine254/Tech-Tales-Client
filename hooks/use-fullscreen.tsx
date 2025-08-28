/*eslint-disable */
import { useEffect } from "react";

export function useFullscreenImages() {
  useEffect(() => {
    if (typeof window === "undefined") return; // ensure browser

    const imgs = document.querySelectorAll<HTMLImageElement>("#blog-body img");

    function enterFullScreen(el: HTMLElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if ((el as any).mozRequestFullScreen)
        (el as any).mozRequestFullScreen();
      else if ((el as any).webkitRequestFullscreen)
        (el as any).webkitRequestFullscreen();
      else if ((el as any).msRequestFullscreen)
        (el as any).msRequestFullscreen();
    }

    function exitFullScreen() {
      if (document.exitFullscreen) document.exitFullscreen();
      else if ((document as any).mozCancelFullScreen)
        (document as any).mozCancelFullScreen();
      else if ((document as any).webkitExitFullscreen)
        (document as any).webkitExitFullscreen();
    }

    function toggleFullScreen(el: HTMLElement) {
      if (!document.fullscreenElement) {
        enterFullScreen(el);
      } else {
        exitFullScreen();
      }
    }

    imgs.forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => toggleFullScreen(img));
    });

    // cleanup
    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("click", () => toggleFullScreen(img));
      });
    };
  }, []);
}
