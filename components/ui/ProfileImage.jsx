"use client";
import { useState } from "react";
import Image from "next/image";
export default function ProfileImage({ url, color }) {
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
