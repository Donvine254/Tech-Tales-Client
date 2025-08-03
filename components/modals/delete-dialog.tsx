import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogOverlay,
} from "@/components/ui/dialog";
import { ArchiveIcon, Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DeleteProps {
  id?: number;
  item: string;
  onDelete: () => void;
  text?: string; // optional custom button label
  action?: "delete" | "archive"; // default: delete
  trigger?: React.ReactNode;
}

const DeleteButton = ({
  onDelete,
  item,
  text = "Delete",
  action = "delete",
  trigger,
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
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            type="button"
            title={actionLabel}
            className={cn(
              "w-full justify-start gap-2 capitalize",
              isDelete
                ? "text-red-600 hover:text-red-700 hover:bg-red-100"
                : "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100"
            )}>
            {isDelete ? (
              <Trash2 className="h-4 w-4" />
            ) : (
              <ArchiveIcon className="h-4 w-4" />
            )}
            {text}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="py-6 space-y-4">
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
        <DialogFooter className="border-t border-border pt-4 flex-row justify-end">
          <DialogClose asChild>
            <Button size="sm" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            className={cn(
              isDelete
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            )}
            onClick={handleDelete}
            disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-1" /> Processing..
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

interface DeleteConfirmDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => void;
  item: string;
  action?: "delete" | "archive";
  loading?: boolean;
}

export function DeleteConfirmDialog({
  open,
  setOpen,
  onDelete,
  item,
  action = "delete",
}: DeleteConfirmDialogProps) {
  const isDelete = action === "delete";
  const actionLabel = isDelete ? "Delete" : "Archive";
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await onDelete();
    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
}
