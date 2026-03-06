"use client";
import { useState } from "react";
import { KeyIcon, Loader2 } from "lucide-react";
import { ApiKey } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { deleteUserAPIKey } from "@/data/api-key";

export default function ApiKeyCard({
  apk,
}: {
  apk: Pick<ApiKey, "name" | "expiresAt" | "id" | "start" | "createdAt">;
}) {
  const [isPending, setIsPending] = useState(false);
  const isExpired = apk.expiresAt && new Date(apk.expiresAt) < new Date();
  const handleDelete = async (id: string) => {
    setIsPending(true);
    try {
      // await deleteUserAPIKey(id);
      console.log("deleted")
    } catch (error) {
      const e = error as Error;
      toast.error(e.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="border bg-card md:bg-inherit rounded-2xl shadow p-4 flex flex-col space-y-1.5  w-full">
      {/* Status badges */}

      {/* Name or fallback */}
      <div className="flex items-center justify-between">
        <p className="font-semibold truncate text-sm flex-1">
          {apk.name || "Untitled Key"}
        </p>
      </div>
      {/* Key line */}
      <div
        className={cn(
          "flex items-center gap-2 bg-stone-100 dark:bg-stone-700 p-2 rounded-md",
          isExpired && "opacity-50"
        )}>
        <KeyIcon className="size-4 sm:size-6 opacity-80" />
        <div className="flex flex-col text-sm flex-1">
          <p className="truncate w-full font-mono">{`${apk.start}•••••••••`}</p>
          <p
            className={cn(
              "text-muted-foreground",
              isExpired && "text-red-500"
            )}>
            {isExpired
              ? "Expired"
              : apk.expiresAt
              ? `Expires ${formatDate(apk.expiresAt)}`
              : "Never Expires"}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          type="button"
          title="delete api key"
          disabled={isPending}
          onClick={() => handleDelete(apk.id)}
          className="cursor-pointer self-end hover:!bg-destructive  hover:text-destructive-foreground bg-black text-white dark:bg-white dark:text-black">
          {isPending ? (
            <>
              {" "}
              <Loader2 className="size-4 animate-spin" /> Deleting..
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </div>
  );
}