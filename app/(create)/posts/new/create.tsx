"use client";
// import ActionButtons from "@/components/create/action-buttons";
import { EditorSection } from "@/components/create/editor";
import { CoverImageSection } from "@/components/create/image";
import { TagsSection } from "@/components/create/tags";
import { TitleSection } from "@/components/create/title";
import { EditorNavbar } from "@/components/layout/editor-navbar";
import { slugify } from "@/lib/utils";
import { useSession } from "@/providers/session";
import { BlogData, FormStatus } from "@/types";
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";

const AUTO_SAVE_INTERVAL = 2000; //Auto-save after every 2 seconds

export default function Create() {
  const { session } = useSession();
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    body: "",
    slug: "",
    tags: "",
    authorId: session?.userId || null,
    image: {
      secure_url: "",
      public_id: "",
    },
    audioUrl: null,
    updatedAt: null,
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("pending");
  const previousDataRef = useRef<string>("");
  //load-saved draft data
  useEffect(() => {
    const saved = localStorage.getItem("blog-draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBlogData({ ...parsed, updatedAt: new Date() });
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
  //check if all entries are there
  const hasAllEntries = (data: BlogData): boolean => {
    return (
      data.title.trim() !== "" &&
      data.body.trim() !== "" &&
      data.tags.trim() !== "" &&
      data.image.secure_url.trim() !== ""
    );
  };
  //prevent users from closing page with unsaved changes'
  useEffect(() => {
    if (hasEntries(blogData) && formStatus !== "success") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line
  }, [blogData, formStatus]);
  //handle before unload function
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      e.preventDefault();
      if (hasEntries(blogData) && formStatus !== "success") {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      } else return null;
    },
    [blogData, formStatus]
  );
  //function to save draft
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isSaveShortcut =
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s";
      if (!hasEntries(blogData)) return;
      if (isSaveShortcut) {
        e.preventDefault();
        e.stopPropagation();
        const dataStr = JSON.stringify({ ...blogData, updatedAt: new Date() });
        localStorage.setItem("blog-draft", dataStr);
        toast.success("Draft saved successfully");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [blogData]);

  //function to create slug
  const handleTitleChange = (value: string) => {
    setBlogData((prevData) => ({
      ...prevData,
      title: value,
      slug: slugify(value),
    }));
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("loading");
  }
  return (
    <section>
      <EditorNavbar
        onPreview={() => toast.info("upcoming feature")}
        onPublish={handleSubmit}
        lastSaved={blogData.updatedAt ?? new Date()}
        disabled={!hasAllEntries(blogData) || formStatus === "loading"}
      />
      <form
        className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6"
        onSubmit={handleSubmit}>
        {/* Main responsive wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Main Column */}
          <div className="space-y-4 lg:col-span-2">
            <TitleSection
              title={blogData.title}
              onTitleChange={handleTitleChange}
              status={formStatus}
            />
            <div className="sm:hidden mt-6 md:mt-0">
              <CoverImageSection
                image={blogData.image}
                onImageChange={(data) =>
                  setBlogData((prev) => ({ ...prev, image: data }))
                }
              />
              <TagsSection
                tags={(blogData.tags || "").split(",").filter(Boolean)}
                title={blogData.title}
                onTagsChange={(tags) =>
                  setBlogData({ ...blogData, tags: tags.join(",") })
                }
                disabled={formStatus === "loading"}
              />
            </div>
            {/* Image & Tags in one row for md screens only */}
            <div className="hidden sm:grid grid-cols-2 lg:hidden gap-4">
              <CoverImageSection
                image={blogData.image}
                onImageChange={(data) =>
                  setBlogData((prev) => ({ ...prev, image: data }))
                }
              />

              <TagsSection
                tags={(blogData.tags || "").split(",").filter(Boolean)}
                title={blogData.title}
                onTagsChange={(tags) =>
                  setBlogData({ ...blogData, tags: tags.join(",") })
                }
                disabled={formStatus === "loading"}
              />
            </div>

            {/* Editor + Buttons */}
            <EditorSection
              data={blogData}
              onChange={setBlogData}
              formStatus={formStatus}
            />
            {/* <ActionButtons data={blogData} hasEntries={hasEntries} onPublish={handleSubmit} disabled={formStatus === "loading"} /> */}
          </div>

          {/* Sticky Right Sidebar on large screens only */}
          <div className="hidden lg:block relative">
            <div className="sticky top-16 space-y-5">
              <CoverImageSection
                image={blogData.image}
                onImageChange={(data) =>
                  setBlogData((prev: BlogData) => ({ ...prev, image: data }))
                }
              />
              <TagsSection
                tags={(blogData.tags || "").split(",").filter(Boolean)}
                title={blogData.title}
                onTagsChange={(tags) =>
                  setBlogData({ ...blogData, tags: tags.join(",") })
                }
                disabled={formStatus === "loading"}
              />
              {/* Future: Audio input goes here */}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
