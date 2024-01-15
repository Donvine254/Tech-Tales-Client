import Image from "next/image";
export function UserImage({ url, className }) {
  return (
    <Image
      className={`h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer ${className}`}
      src={
        url ??
        "https://res.cloudinary.com/dipkbpinx/image/upload/v1705280157/gztaho1v2leujxr8w3c8.png"
      }
      width={48}
      height={48}
      title="No user found"
      alt="user profile avatar"
      referrerPolicy="no-referrer"
    />
  );
}
