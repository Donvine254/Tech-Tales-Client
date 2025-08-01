"use client";
import { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { BlogWithUser } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import CarouselHeroCard from "./hero-card";
import { HeroCardDesktop, HeroCardMobile } from "./carousel-card";

interface BlogCarouselProps {
  posts: BlogWithUser[];
}

export function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
      },
      isMobile ? 6000 : 10000
    ); // 4s on mobile, 6s on desktop

    return () => clearInterval(interval);
  }, [posts.length, isMobile]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }, [posts.length]);

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: false,
    trackTouch: true,
  });

  // Get posts for desktop layout (featured + sidebar)
  const getFeaturedPost = () => posts[currentIndex];
  const getSidebarPosts = () => {
    const nextIndex = (currentIndex + 1) % posts.length;
    const afterNextIndex = (currentIndex + 2) % posts.length;
    return [posts[nextIndex], posts[afterNextIndex]];
  };

  return (
    <div className="max-w-7xl mx-auto min-h-max">
      <div className="md:hidden relative" {...(isMounted ? swipeHandlers : {})}>
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform  duration-500 ease-in-out"
            style={
              isMounted
                ? { transform: `translateX(-${currentIndex * 100}%)` }
                : undefined
            }>
            {posts.map((post) => (
              <div key={post.id} className="w-full flex-shrink-0">
                <HeroCardMobile post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LG view */}

      <div className="hidden md:block">
        <div className="md:grid grid-cols-3 gap-0.5">
          {/* Featured Post - Takes up 2 columns */}
          <div className="col-span-2">
            <div className="transition-all duration-700 ease-in-out">
              <CarouselHeroCard post={getFeaturedPost()} />
            </div>
          </div>
          {/* Sidebar Posts */}
          <div className="">
            {getSidebarPosts().map((post, index) => (
              <div
                key={`${post.id}-${currentIndex}`}
                className="transition-all duration-700 ease-in-out"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}>
                <HeroCardDesktop post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
