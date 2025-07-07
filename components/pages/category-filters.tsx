import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { categories } from "@/constants";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function CategoryFilters({
  className,
  query,
}: {
  className?: string;
  query?: string;
}) {
  return (
    <ScrollArea className={(cn("w-full"), className)}>
      <TooltipProvider>
        <div className="flex space-x-2 pb-4">
          {categories.map((category) => {
            const isActive =
              query === category.value || (!query && category.value === "all");
            return (
              <Tooltip key={category.value}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "flex capitalize items-center gap-2 cursor-pointer whitespace-nowrap",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-blue-500 hover:text-white"
                    )}>
                    <Link href={`/search?q=${category.value}`}>
                      {category.label}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-max text-sm" side="bottom">
                  <p>Search for blogs about {category.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
