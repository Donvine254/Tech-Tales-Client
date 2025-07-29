import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  onClose?: () => void;
  onConfirm?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  buttonText?: string;
  variant?: "warning" | "destructive";
};
export default function WarningDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  onClose,
  onConfirm,
  disabled,
  children,
  buttonText = "Confirm",
  variant = "warning",
}: Props) {
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm?.();
      handleClose();
    } finally {
      setLoading(false);
    }
  };
  const isWarning = variant === "warning";

  const iconWrapperClass = isWarning
    ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-500"
    : "bg-red-50 border dark:bg-red-900/20 border-red-500";
  const iconColorClass = isWarning ? "text-amber-600" : "text-red-500";
  const confirmButtonClass = isWarning
    ? "bg-amber-500 text-white hover:bg-amber-600"
    : "bg-destructive text-destructive-foreground hover:bg-red-600";
  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
      <AlertDialogContent className="animate-fade-in-up">
        <div className="flex justify-end items-start animate-scale-in">
          <AlertDialogTrigger
            className="hover:text-red-500"
            onClick={handleClose}>
            <X />
          </AlertDialogTrigger>
        </div>
        <AlertDialogHeader>
          <div className="flex items-center justify-center my-2">
            <div
              className={cn(
                "rounded-full p-4 animate-scale-in",
                iconWrapperClass
              )}>
              <AlertTriangle size={48} className={iconColorClass} />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-2xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-balance text-xs sm:text-sm text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children && <div className="">{children}</div>}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            disabled={disabled || loading}
            className={confirmButtonClass}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Processing..
              </>
            ) : (
              buttonText
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
