"use client"
import { EditorSection } from "@/components/create/editor";
import { CoverImageSection } from "@/components/create/image";
import { TitleSection } from "@/components/create/title";
import { slugify } from "@/lib/utils";
import { useSession } from "@/providers/session";
import { BlogData, FormStatus } from "@/types";
import { useState, useRef, useEffect } from "react";

const AUTO_SAVE_INTERVAL = 2000

export default function Create() {
    const { session } = useSession()
    const [blogData, setBlogData] = useState<BlogData>({
        title: "",
        body: "",
        slug: "",
        tags: "",
        authorId: session?.userId || null,
        image: {
            secure_url: "",
            public_id: ""
        },
        audioUrl: "",
    });
    const [formStatus, setFormStatus] = useState<FormStatus>("pending")
    const previousDataRef = useRef<string>("");
    //load-saved draft data
    useEffect(() => {
        const saved = localStorage.getItem("blog-draft");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setBlogData(parsed);
            } catch (err) {
                console.error("Failed to load saved draft:", err);
            }
        }
    }, []);

    //auto-save function
    useEffect(() => {
        const interval = setInterval(() => {
            const dataStr = JSON.stringify(blogData);
            // Check if blog has content
            if (!hasEntries(blogData)) return;
            // Only save if changed
            if (previousDataRef.current !== dataStr) {
                previousDataRef.current = dataStr;
                localStorage.setItem("blog-draft", dataStr);
                console.log("Draft auto-saved");
            }
        }, AUTO_SAVE_INTERVAL);

        return () => clearInterval(interval);
    }, [blogData]);
    //check if the form has entries
    const hasEntries = (data: BlogData) => {
        return (
            data.title.trim() !== "" ||
            data.body.trim() !== "" ||
            data.tags.trim() !== "" ||
            data.image.secure_url.trim() !== ""
        );
    };
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
    return <form className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor Column */}
            <div className="lg:col-span-2 space-y-6"> <TitleSection title={blogData.title} onTitleChange={handleTitleChange} status={formStatus} />
                <EditorSection data={blogData} onChange={setBlogData} />
            </div>
            <div className="max-h-max"><CoverImageSection image={blogData.image} onImageChange={(data) => setBlogData((prev: BlogData) => ({ ...prev, image: data }))} /></div>
        </div>


    </form>
}