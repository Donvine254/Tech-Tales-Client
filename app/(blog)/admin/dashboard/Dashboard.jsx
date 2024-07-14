"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";
import { baseUrl } from "@/lib";

export default function Dashboard({ blogs }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/me`);
        const data = await response.json();
        setUser(data);
        console.log(data);
        if (data.role !== "admin") {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="w-full mx-auto m-2 min-h-[320px] px-8 md:w-4/5 md:mt-10 font-poppins flex items-center justify-center content-center">
        <Loader size={60} />
      </div>
    );
  }
  console.log(blogs);

  return (
    <section className="w-full mx-auto m-2 min-h-[320px] px-8 md:w-4/5 md:mt-10 font-poppins">
      <h1 className="text-center text-xl md:text-2xl">Manage Blogs</h1>
      {/* map over the blogs and create a table with blog title, author, status (default published) and actions. In the actions column add two buttons for edit and delete and make sure they fit or else they appear as a popup*/}
    </section>
  );
}
