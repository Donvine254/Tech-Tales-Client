import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { categories } from "@/constants";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function CategoryFilters({ className }: { className?: string }) {
  return (
    <ScrollArea className={(cn("w-full"), className)}>
      <div className="flex space-x-2 pb-4">
        {categories.map((category) => {
          return (
            <Button
              key={category.value}
              asChild
              variant={category.value === "all" ? "default" : "outline"}
              className={`flex capitalize items-center gap-2 cursor-pointer whitespace-nowrap ${
                category.value === "all"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-blue-500 hover:text-white"
              }`}>
              <Link href={`/search?q=${category.value}`}>{category.label}</Link>
            </Button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
