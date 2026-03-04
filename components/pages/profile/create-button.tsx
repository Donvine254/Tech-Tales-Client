"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const CreateButton: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  async function createBlog() {
    const uuid = crypto.randomUUID();
      router.replace(`/posts/new/${uuid}`);
  }

  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-pointer",
        className
      )}
      variant="secondary"
      size="sm"
      onClick={createBlog}>
      <Plus className="h-4 w-4" />
      New Post
    </Button>
  );
};
export default CreateButton;
