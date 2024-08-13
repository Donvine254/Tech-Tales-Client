"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SubscribeModal from "./alerts/subscribeModal";

export default function Newsletter() {
  const pathname = usePathname();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStatus = sessionStorage.getItem("subscription_form_status");
      const showPaths = [
        "/",
        "/blogs",
        "/relevant",
        "/latest",
        "/me/blogs",
        "/top",
      ];
      const isInShowPath = showPaths.includes(pathname);
      if (!storedStatus && isInShowPath) {
        setTimeout(() => setShowForm(true), 100000);
      }

      if (showForm) {
        const modal = document.getElementById("subscription_form");
        if (modal) {
          modal.classList.add("show");
          modal.showModal();
        }
      }
    }
  }, [pathname, showForm]);

  return showForm ? <SubscribeModal /> : null;
}
