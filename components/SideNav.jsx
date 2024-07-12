"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-start xsm:text-sm md:ml-5  md:gap-4 md:text-xl items-center lg:justify-center ">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              href={link.href}
              key={link.name}
              scroll
              className={`navigation ${
                isActive
                  ? "text-blue-500 font-bold underline bg-gray-100 rounded-md transition-transform duration-300 scroll-smooth "
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
  { name: "Relevant", href: "/relevant" },
  { name: "Latest", href: "/latest" },
  { name: "Top", href: "/top" },
];
