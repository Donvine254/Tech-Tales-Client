import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export function FeaturedSkeleton() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row  shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border  overflow-hidden">
        {/* image skeleton */}
        <div className="relative aspect-video w-full sm:w-1/2">
          <Image
            src="/placeholder.svg"
            alt="Loading..."
            fill
            className="object-cover bg-gray-300 dark:bg-gray-600 transition-transform duration-500"
          />
        </div>
        <div className="w-full sm:w-1/2 h-full  p-6 md:p-8 space-y-4">
          {/* Tag placeholder */}
          <Skeleton className="hidden sm:block w-32 h-5 sm:h-8 mb-4" />
          {/* Title placeholder */}
          <Skeleton className="w-full h-4 sm:h-5" />
          <Skeleton className="w-1/4 h-4 sm:h-5" />
          <Skeleton className="w-full h-2 sm:h-4" />
          <Skeleton className="w-full h-2 sm:h-4" />
          <Skeleton className="w-full h-2 sm:h-4" />
          <Skeleton className="w-1/2 h-2 sm:h-4" />
          {/* Author info placeholder */}
          <div className="flex items-center mt-auto">
            {/* Avatar placeholder */}
            <Skeleton className="w-10 h-10 rounded-full animate-pulse"></Skeleton>

            <div className="ml-3">
              {/* Author name placeholder */}
              <Skeleton className="h-4 w-24 mb-2"></Skeleton>
              {/* Date and read time placeholder */}
              <Skeleton className="h-2 sm:h-3 w-36"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="w-full">
      <div className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border overflow-hidden">
        {/* image skeleton */}
        <div className="relative aspect-video w-full">
          <Image
            src="/placeholder.svg"
            alt="Loading..."
            fill
            className="object-cover bg-gray-300 dark:bg-gray-600 transition-transform duration-500"
          />
        </div>
        <div className="w-full h-full p-6 md:p-8 space-y-4">
          {/* Title placeholder */}
          <Skeleton className="w-full h-4 sm:h-5" />
          <Skeleton className="w-1/4 h-4 sm:h-5" />
          <Skeleton className="w-full h-2 sm:h-4" />
          <Skeleton className="w-full h-2 sm:h-4" />
          <Skeleton className="w-full h-2 sm:h-4" />
          <Skeleton className="w-1/2 h-2 sm:h-4" />
          {/* Author info placeholder */}
          <div className="flex items-center mt-auto">
            {/* Avatar placeholder */}
            <Skeleton className="w-10 h-10 rounded-full animate-pulse"></Skeleton>
            <div className="ml-3">
              {/* Author name placeholder */}
              <Skeleton className="h-4 w-24 mb-2"></Skeleton>
              {/* Date and read time placeholder */}
              <Skeleton className="h-2 sm:h-3 w-36"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const FallBackBlogs = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <FeaturedSkeleton />
        {/* <FeaturedCard blog={trendingBlogs[0]} variant="trending" /> */}
      </section>
      <section className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative">
              {i < 4 && (
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="bg-gradient-to-r from-pink-600 to-blue-600 via-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #{i + 2}
                  </div>
                </div>
              )}
              <BlogCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export const MinimalBlogCardSkeleton = () => {
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 bg-card border border-border hover:border-primary/20 animate-fade-in-up">
      <CardContent className="space-y-4 p-6">
        {/* top Image and content */}
        <div className="flex items-center md:items-start gap-4 md:gap-6">
          {/* content */}
          <div className="flex-1 min-w-0 space-y-3 order-2 md:order-1 flex flex-col">
            <div className="flex items-center w-full space-x-3">
              {/* author */}
              <Skeleton className="w-8 h-8 rounded-full" />
              {/* date and author name */}
              <div className="flex flex-col space-y-2">
                <Skeleton className="w-24 h-2 rounded-md" />
                <Skeleton className="w-24 h-2 rounded-md" />
              </div>
            </div>
            {/* Title */}
            <Skeleton className="w-full h-6 rounded-md" />
            {/* Body Preview */}
            <Skeleton className="w-[75%] h-2 rounded-md" />
            <Skeleton className="w-[75%] h-2 rounded-md" />
            <Skeleton className="w-[75%] h-2 rounded-md" />
            <Skeleton className="w-[40%] h-2 rounded-md" />
          </div>
          {/* Image*/}
          <div className="relative hidden sm:flex sm:w-24 aspect-[3/2] md:w-42 lg:w-60 flex-shrink-0 rounded-lg overflow-hidden bg-muted order-2">
            <Image
              src="/placeholder.svg"
              alt="Loading..."
              fill
              className="object-cover bg-gray-300 dark:bg-gray-600 transition-transform duration-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
