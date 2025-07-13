"use client";
import { createNewBlog } from "@/lib/actions/blogs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const CreateButton: React.FC<{ className?: string }> = ({ className }) => {
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
      className={cn(
        "bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-pointer",
        className
      )}
      variant="secondary"
      size="sm"
      disabled={isLoading}
      onClick={createBlog}>
      <Plus className="h-4 w-4" />
      New Post
    </Button>
  );
};
export default CreateButton;
