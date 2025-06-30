"use client"
import { TitleSection } from "@/components/create/title";
import { slugify } from "@/lib/utils";
import Script from "next/script";
import { useState } from "react";

interface BlogData {
    title: string;
    body: string;
    slug: string;
    tags: string;
    image: string;
    audioUrl?: string | null;
}
export default function Create() {
    const [blogData, setBlogData] = useState<BlogData>({
        title: "",
        body: "",
        slug: "",
        tags: "",
        image: "",
        audioUrl: "",
    });
    //function to create slug
    const handleTitleChange = (value: string) => {
        setBlogData(prevData => ({
            ...prevData,
            title: value,
            slug: slugify(value),
        }));
    };
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
        <TitleSection title={blogData.title} onTitleChange={handleTitleChange} />
    </div>
}