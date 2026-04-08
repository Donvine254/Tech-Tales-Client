"use client";
import Image from "next/image";
import { useState } from "react";
import { QrCodeIcon } from "lucide-react";
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
} from "../ui/dialog";

export default function ProfileQRCode() {
  const [qrCode, setQrCode] = useState("");
  const generateQRCode = async () => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      window.location.href,
    )}`;
    setQrCode(qrCodeUrl);
  };

  return (
    <Dialog>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
      <DialogTrigger asChild>
        <div className="flex flex-col items-center absolute right-1 top-[-1]">
          <button
            type="button"
            onClick={generateQRCode}
            className="flex cursor-pointer items-center justify-center rounded-xl w-10 h-10"
            title="generate QR code">
            <QrCodeIcon height="30" width="30" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-76">
        <DialogHeader>
          <DialogTitle className="text-start uppercase">
            Scan QR Code
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="flex items-center justify-center ">
          <Image
            src={qrCode}
            alt="QR Code"
            height="200"
            width="200"
            className="border-none"
          />
        </div>
        <DialogFooter>
          <p className="text-xs opacity-80 text-center">
            To scan this code, you can use a QR scanner app on your phone, or
            some camera apps.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
