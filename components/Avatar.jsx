import Image from "next/image";
export function UserImage({ url }) {
  return (
    <Image
      className="h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer"
      src={url ?? "https://static.thenounproject.com/png/538846-200.png"}
      width={48}
      height={48}
      alt="user profile avatar"
      referrerPolicy="no-referrer"
    />
  );
}
