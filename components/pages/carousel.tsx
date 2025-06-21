"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { BlogWithUser } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import BlogHero from "./blog-hero";
import HeroCard from "./hero-card";

interface BlogCarouselProps {
  posts: BlogWithUser[];
}

export function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();

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

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

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
    <div className="max-w-7xl mx-auto">
      {/* Mobile Carousel */}
      <div className="lg:hidden">
        <div className="relative" {...swipeHandlers}>
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {posts.map((post) => (
                <div key={post.id} className="w-full flex-shrink-0">
                  <BlogHero post={post} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Dots indicator */}
            {/* <div className="flex gap-2">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-8">
          {/* Featured Post - Takes up 2 columns */}
          <div className="col-span-2">
            <div className="transition-all duration-700 ease-in-out">
              <BlogHero post={getFeaturedPost()} />
            </div>
          </div>
          {/* Sidebar Posts */}
          <div className="space-y-6">
            {getSidebarPosts().map((post, index) => (
              <div
                key={`${post.id}-${currentIndex}`}
                className="transition-all duration-700 ease-in-out"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}>
                <HeroCard post={post} />
              </div>
            ))}
          </div>
        </div>

     <div className="flex items-center justify-center mt-8 gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevious}
            className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            className="flex items-center gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Desktop dots indicator */}
          <div className="flex gap-2 ml-4">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
