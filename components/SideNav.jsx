"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex justify-center items-center">
      <div className="flex justify-center md:justify-start md:ml-5  md:gap-4 md:text-2xl items-center font-crimson">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              href={link.href}
              key={link.name}
              className={`navigation ${
                isActive
                  ? "text-blue-500 font-bold underline bg-slate-300 rounded-lg"
                  : ""
              }`}>
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const navLinks = [
  { name: "Featured", href: "/featured" },
  { name: "Latest", href: "/latest" },
  { name: "For You", href: "/my-blogs" },
];
