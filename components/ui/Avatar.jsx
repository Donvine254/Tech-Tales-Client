"use client";
import { useState } from "react";
import Image from "next/image";
export function UserImage({ url, className, size = 48, style }) {
  const [error, setError] = useState(null);
  return (
    <Image
      className={`h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer ${className}`}
      src={
        error
          ? "https://ui-avatars.com/api/?background=random&name=john+doe"
          : url ?? "/logo.png"
      }
      width={size}
      height={size}
      title="User Profile Photo"
      alt="user profile avatar"
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
    />
  );
}
export function ProfileImage({ url, color }) {
  const [error, setError] = useState(null);
  return (
    <Image
      src={
        error
          ? "https://ui-avatars.com/api/?background=random&name=john+doe"
          : url ?? "/logo.png"
      }
      title="User Profile Photo"
      height={120}
      width={120}
      alt="User Profile"
      style={{ border: `0.5rem solid ${color}` }}
      priority
      className="w-[120px] h-[120px] relative -top-20 rounded-full m-auto  italic "
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
    />
  );
}
