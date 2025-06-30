"use client"
import { TitleSection } from "@/components/create/title";
import { slugify } from "@/lib/utils";
import { FormStatus } from "@/types";
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
    const [formStatus, setFormStatus] = useState<FormStatus>("pending")
    //function to create slug
    const handleTitleChange = (value: string) => {
        setBlogData(prevData => ({
            ...prevData,
            title: value,
            slug: slugify(value),
        }));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormStatus("loading")

    }
    return <form className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" onSubmit={handleSubmit}>

        <TitleSection title={blogData.title} onTitleChange={handleTitleChange} status={formStatus} />
    </form>
}