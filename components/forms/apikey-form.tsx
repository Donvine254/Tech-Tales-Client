"use client";
import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Loader2 } from "lucide-react";
import { createApiKey, type FormState } from "@/lib/actions/apikey-form";
import { toast } from "sonner";

export default function ApiKeyForm({ refetch }: { refetch: () => void }) {
  const [state, formAction, isPending] = useActionState(
    createApiKey,
    {} as FormState,
  );
  const [open, setOpen] = useState(false);
  const [showCopyDialog, setShowCopyDialog] = useState(false);
  useEffect(() => {
    if (state.success && state.key) {
      setOpen(false);
      setShowCopyDialog(true);
    }
  }, [state.key, state.success]);
  const rtf = new Intl.RelativeTimeFormat("en");
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all animate-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200" />
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent className="dark:bg-gray-950">
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>
              Generate a new API key to access your recipes, create new ones, or
              integrate with external apps.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            action={formAction}
            key={state.success ? "success" : "form"}>
            <div className="space-y-2">
              <Label htmlFor="key-name" className="font-semibold">
                Key Name
              </Label>
              <p className="text-sm text-muted-foreground">
                Enter a unique name for your API key to differentiate it from
                other keys.
              </p>
              <Input
                id="key-name"
                name="name"
                minLength={5}
                maxLength={64}
                required
                placeholder="e.g., Production Key, Mobile Integration"
              />
              {state.errors?.name && (
                <p className="text-sm text-red-600">{state.errors.name[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiration" className="font-semibold">
                Expiration
              </Label>
              <Select name="expiresAt" defaultValue="never">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select expiration period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">No Expiry</SelectItem>
                  {[1, 7, 30, 60, 90, 180, 365].map((days) => (
                    <SelectItem key={days} value={days.toString()}>
                      {days === 365
                        ? rtf.format(1, "year")
                        : rtf.format(days, "day")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.expiresAt && (
                <p className="text-sm text-red-600">
                  {state.errors.expiresAt[0]}
                </p>
              )}
            </div>
            {/* TODO: add permissions entry */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending} title="create key">
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Creating..
                  </>
                ) : (
                  "Create Key"
                )}
              </Button>
            </DialogFooter>
            {state.message && !state.success && (
              <div
                role="alert"
                className="bg-destructive text-destructive-foreground text-center rounded-md text-sm p-1">
                <p>{state.message}</p>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
      {/* copy dialog */}
      {state.success && state.key && (
        <Dialog open={showCopyDialog} onOpenChange={setShowCopyDialog}>
          <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all animate-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200" />
          <DialogContent className="dark:bg-gray-950">
            <DialogHeader>
              <DialogTitle>API Key Created</DialogTitle>
              <DialogDescription>
                Please copy your API key and store it in a safe place. For
                security reasons we cannot show it again.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-2">
              <div className=" bg-stone-100 dark:bg-stone-700 p-2 rounded-md">
                <p className="text-sm break-all font-mono">{state.key}</p>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(state.key as string);
                    toast.success("Key copied to clipboard", {
                      position: "top-center",
                    });
                  }}
                  className="cursor-pointer">
                  <Copy className="size-4" /> Copy to clipboard
                </Button>
                <DialogClose asChild>
                  <Button
                    onClick={refetch}
                    className="bg-card-foreground text-white dark:text-stone-900"
                    size="sm">
                    Done
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
