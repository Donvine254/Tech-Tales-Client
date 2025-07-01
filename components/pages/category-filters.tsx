import React from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import Link from 'next/link'
import { categories } from '@/constants'
import { Button } from '../ui/button'

export default function CategoryFilters() {
    return (
        <ScrollArea className="w-full mb-8">
            <div className="flex space-x-2 pb-4">
                {categories.map((category) => {
                    return (
                        <Button
                            key={category.value}
                            asChild
                            variant={category.value === "all" ? "default" : "outline"}
                            className={`flex capitalize items-center gap-2 whitespace-nowrap ${category.value === "all"
                                ? "bg-primary text-primary-foreground"
                                : ""
                                }`}>
                            <Link href={`/search?q=${category.value}`}>{category.label}</Link>
                        </Button>
                    );
                })}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}