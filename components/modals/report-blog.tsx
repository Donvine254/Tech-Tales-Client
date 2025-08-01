"use client";
import type React from "react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "../ui/input";

interface BlogReportDialogProps {
  blogTitle?: string;
  authorName?: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function BlogReportDialog({
  blogTitle = "this blog",
  authorName = "this author",
  open,
  onOpenChange,
}: BlogReportDialogProps) {
  const [selectedReason, setSelectedReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) {
      toast.error("Please select a reason for reporting");
      return;
    }

    console.log("Report submitted:", {
      reason: selectedReason,
      blogTitle,
      authorName,
    });

    toast.success(
      "Report submitted successfully. Thank you for helping keep our community safe."
    );
    onOpenChange(false);
    setSelectedReason("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    setSelectedReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="md:text-xl font-semibold text-center font-sans">
            Report Blog
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Reasons */}
          <div className="space-y-4">
            {[
              { value: "harassment", label: "Harassment" },
              { value: "rules-violation", label: "Rules Violation" },
              { value: "spam", label: "Spam" },
              { value: "ai-generated", label: "AI-generated" },
            ].map((reason) => (
              <label
                key={reason.value}
                className="flex items-center gap-3 cursor-pointer">
                <Input
                  type="radio"
                  name="reportReason"
                  value={reason.value}
                  checked={selectedReason === reason.value}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-5 h-5 outline-none"
                />
                <span className="">{reason.label}</span>
              </label>
            ))}
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              Report
            </Button>
          </div>

          {/* Copyright Notice */}
          <div className="border-t border-border pt-4">
            <p className="text-gray-500 dark:text-gray-100 text-sm text-center">
              To report copyright infringement and trademark violation, email us
              at{" "}
              <a
                href="mailto:support@techtales.com"
                className="text-blue-600 hover:text-blue-800 underline">
                support@techtales.vercel.app
              </a>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
