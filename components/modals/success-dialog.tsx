import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  onClose?: () => void;
};
export default function SuccessDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  onClose,
}: Props) {
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
      <AlertDialogContent>
        <div className="flex justify-end items-start">
          <AlertDialogTrigger
            className="hover:text-red-500"
            onClick={handleClose}>
            <X />
          </AlertDialogTrigger>
        </div>
        <AlertDialogHeader>
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <AlertDialogTitle className="text-center text-2xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-green-500" onClick={handleClose}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
