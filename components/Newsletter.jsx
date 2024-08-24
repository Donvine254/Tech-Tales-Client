"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SubscribeModal from "./alerts/subscribeModal";
import { getCookie } from "@/lib/utils";
import { useUserContext } from "@/providers";

export default function Newsletter() {
  const user = useUserContext();
  const pathname = usePathname();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const subscribed = getCookie("subscribed");
    //do not show the modal to logged in users
    if (subscribed === "true" || user) {
      setShowForm(false);
      return;
    }
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
  }, [pathname, user]);

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
