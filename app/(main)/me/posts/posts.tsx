"use state";
import { Button } from "@/components/ui/button";
import { createNewBlog } from "@/lib/actions/blogs";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Posts() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Blogs</h1>
          <p className="text-muted-foreground">
            Manage and organize your blog posts
          </p>
        </div>
        <CreateButton />
      </div>
    </div>
  );
}

const CreateButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function createBlog() {
    setIsLoading(true);
    const toastId = toast.loading("processing request");
    const res = await createNewBlog();
    if (res.success && res.data) {
      router.replace(`/posts/new/${res.data.uuid}`);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
    toast.dismiss(toastId);
  }

  return (
    <Button
      className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-pointer"
      variant="secondary"
      size="sm"
      disabled={isLoading}
      onClick={createBlog}>
      <Plus className="h-4 w-4 mr-2" />
      New Post
    </Button>
  );
};
