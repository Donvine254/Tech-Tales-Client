"use client";
import { EditorSection } from "@/components/create/editor";
import { CoverImageSection } from "@/components/create/image";
import { PreviewDialog } from "@/components/create/preview-modal";
import { TagsSection } from "@/components/create/tags";
import { TitleSection } from "@/components/create/title";
import { EditorNavbar } from "@/components/create/editor-navbar";
import {
  deleteOrArchiveBlog,
  publishBlog,
  SaveDraftBlog,
} from "@/lib/actions/blogs";
import {
  canPublishBlog,
  emptyBlogData,
  hasAllEntries,
  hasEntries,
  SaveDraft,
} from "@/lib/helpers";
import { slugify } from "@/lib/utils";
import { BlogData, FormStatus } from "@/types";
import { BlogStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";

const AUTO_SAVE_INTERVAL = 2000; //Auto-save after every 2 seconds
// eslint-disable-next-line
declare const confetti: (options?: Record<string, any>) => void;

export default function Create({
  initialData,
  uuid,
  status,
}: {
  initialData: BlogData;
  uuid: string;
  status: BlogStatus;
}) {
  const [blogData, setBlogData] = useState<BlogData>(initialData);
  const [formStatus, setFormStatus] = useState<FormStatus>("pending");
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [tagList, setTagList] = useState<string[]>(
    (blogData.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const previousDataRef = useRef<string>("");
  const skipUnloadWarningRef = useRef(false);
  const disableAutoSaveRef = useRef(false);
  const router = useRouter();
  // Restore draft
  useEffect(() => {
    const saved = localStorage.getItem(`Draft-${uuid}`);
    const lastSaved = localStorage.getItem(`updatedAt`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (hasEntries(parsed)) {
          setBlogData({ ...parsed, updatedAt: new Date() });
          const parsedDate = new Date(lastSaved ?? "");
          setUpdatedAt(isNaN(parsedDate.getTime()) ? new Date() : parsedDate);
        }
      } catch (err) {
        console.error("Failed to load saved draft:", err);
      }
    }
  }, [uuid]);

  //auto-save function
  useEffect(() => {
    const interval = setInterval(() => {
      if (disableAutoSaveRef.current) return;
      const dataStr = JSON.stringify(blogData);
      // Check if blog has content
      if (!hasEntries(blogData)) return;
      // Only save if changed
      if (previousDataRef.current !== dataStr) {
        previousDataRef.current = dataStr;
        localStorage.setItem(`Draft-${uuid}`, dataStr);
        setUpdatedAt(new Date());
        localStorage.setItem("updatedAt", JSON.stringify(new Date()));
      }
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [blogData, uuid]);

  //handle before unload function
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      e.preventDefault();
      if (skipUnloadWarningRef.current) return;
      if (hasEntries(blogData) && formStatus !== "success") {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      } else return null;
    },
    [blogData, formStatus]
  );
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

  // Save shortcut (Ctrl+S / Cmd+S)
  useEffect(() => {
    if (disableAutoSaveRef.current) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const isSaveShortcut =
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s";
      if (!hasEntries(blogData)) return;
      if (isSaveShortcut) {
        e.preventDefault();
        e.stopPropagation();
        const dataStr = JSON.stringify(blogData);
        localStorage.setItem(`Draft-${uuid}`, dataStr);
        setUpdatedAt(new Date());
        localStorage.setItem("UpdatedAt", JSON.stringify(new Date()));
        toast.success("Draft saved successfully");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [blogData, uuid]);

  //function to create slug
  const handleTitleChange = (value: string) => {
    setBlogData((prevData) => ({
      ...prevData,
      title: value,
      slug: slugify(value),
    }));
  };
  //function to show preview modal
  const handlePreview = () => {
    if (!hasEntries(blogData)) {
      toast.error("Write something to see a preview");
      return;
    }
    setPreviewOpen(true);
  };
  // submission function to publish blog
  async function handleSubmit() {
    setFormStatus("loading");
    const validation = canPublishBlog(blogData);
    if (!validation.valid) {
      toast.error(validation.message || "Invalid blog data.");
      setFormStatus("error");
      return;
    }
    const toastId = toast.loading("Processing request");
    // call the API
    const res = await publishBlog(blogData, uuid);
    // dismiss the toast when done
    toast.dismiss(toastId);
    if (res.success && res.slug) {
      toast.success(res.message || "Blog published!");
      finalizeSubmission(true);
      //  redirect to the blog
      setTimeout(() => {
        router.push(`/blog/${res.slug}`);
      }, 800);
    } else {
      toast.error(res.message || "Failed to publish blog.");
      setFormStatus("error");
    }
  }

  // update blog data in the database
  async function updateBlog() {
    setFormStatus("loading");
    const toastId = toast.loading("Processing request");
    const res = await SaveDraftBlog(blogData, uuid);
    toast.dismiss(toastId);
    if (res.success) {
      toast.success("Blog updated successfully");
      finalizeSubmission(true);
      setTimeout(() => {
        router.push(`/blog/${blogData.slug}`);
      }, 800);
    } else {
      toast.error(res.message);
      setFormStatus("error");
    }
  }
  // function to delete blog
  async function handleBlogDeletion() {
    try {
      setFormStatus("loading");
      const res = await deleteOrArchiveBlog(uuid);
      if (res.success) {
        toast.success(res.message);
        finalizeSubmission();
        // redirect back
        setTimeout(() => {
          router.back();
        }, 10);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setFormStatus("success");
    }
  }
  // helper function to finalize updating/deleting/publishing blog
  async function finalizeSubmission(showConfetti = false) {
    setFormStatus("success");
    // disable the autosave
    disableAutoSaveRef.current = true;
    // clear the data from state and localstorage
    setBlogData(emptyBlogData());
    window.removeEventListener("beforeunload", handleBeforeUnload);
    skipUnloadWarningRef.current = true;
    localStorage.removeItem(`Draft-${uuid}`);
    localStorage.removeItem("UpdatedAt");
    if (showConfetti) {
      confetti({ particleCount: 5000, spread: 100, origin: { y: 0.3 } });
    }
  }
  return (
    <section>
      <EditorNavbar
        onPreview={handlePreview}
        onPublish={handleSubmit}
        hasEntries={hasEntries(blogData)}
        lastSaved={updatedAt}
        onSync={() => SaveDraft(blogData, uuid)}
        onDelete={handleBlogDeletion}
        disabled={!hasAllEntries(blogData)}
        formStatus={formStatus}
        status={status}
        onUpdate={updateBlog}
        uuid={uuid}
      />
      <form className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
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
                status={formStatus}
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
                tags={tagList}
                title={blogData.title}
                onTagsChange={(newTags) => {
                  setTagList(newTags);
                  setBlogData((prev) => ({
                    ...prev,
                    tags: newTags.join(","),
                  }));
                }}
                status={formStatus}
              />
            </div>
            {/* Editor + Buttons */}
            <EditorSection
              data={blogData}
              onChange={setBlogData}
              formStatus={formStatus}
              uuid={uuid}
            />
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
                status={formStatus}
              />
              {/* Future: Audio input goes here */}
            </div>
          </div>
        </div>
        <PreviewDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          blog={blogData}
        />
      </form>
    </section>
  );
}
