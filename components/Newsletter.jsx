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
      const isInShowPath =
        showPaths.includes(pathname) || pathname.startsWith("/blogs");

      const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          setShowForm(true);
        }
      };

      if (!storedStatus && isInShowPath) {
        const timeout = setTimeout(() => setShowForm(true), 100000);
        window.addEventListener("scroll", handleScroll);
        return () => {
          clearTimeout(timeout);
          window.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (showForm) {
      const modal = document.getElementById("subscription_form");
      if (modal) {
        modal.classList.add("show");
        modal.showModal();
      }
    }
  }, [showForm]);

  return showForm ? <SubscribeModal /> : null;
}
