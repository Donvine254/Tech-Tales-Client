import Image from "next/image";
export function UserImage({ url, className, size = 48 }) {
  return (
    <Image
      className={`h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer ${className}`}
      src={
        url ??
        "https://res.cloudinary.com/dipkbpinx/image/upload/v1705280157/gztaho1v2leujxr8w3c8.png"
      }
      width={size}
      height={size}
      title="User Profile Photo"
      alt="user profile avatar"
      referrerPolicy="no-referrer"
    />
  );
}
