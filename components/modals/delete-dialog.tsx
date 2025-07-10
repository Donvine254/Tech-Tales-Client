import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ArchiveIcon, Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DeleteProps {
  id?: string;
  item: string;
  onDelete: () => void;
  text?: string; // optional custom button label
  action?: "delete" | "archive"; // default: delete
}

const DeleteButton = ({
  onDelete,
  item,
  text = "Delete",
  action = "delete",
}: DeleteProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await onDelete();
    setLoading(false);
    setOpen(false);
  }
  const isDelete = action === "delete";
  const actionLabel = isDelete ? "Delete" : "Archive";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          title={actionLabel}
          className={`w-full justify-start gap-2 ${
            isDelete
              ? "text-red-600 hover:text-red-700 hover:bg-red-100"
              : "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100"
          }`}>
          {isDelete ? (
            <Trash2 className="h-4 w-4" />
          ) : (
            <ArchiveIcon className="h-4 w-4" />
          )}{" "}
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="py-6">
        <DialogHeader>
          <DialogTitle
            className={isDelete ? "text-red-500" : "text-yellow-600"}>
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently{" "}
            {action === "delete" ? "delete" : "archive"} this {item}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="border-t border-border pt-4">
          <DialogClose asChild>
            <Button size="sm" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            className={cn(
              "w-24",
              isDelete
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            )}
            onClick={handleDelete}
            disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-1" /> Deleting
              </>
            ) : (
              actionLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
