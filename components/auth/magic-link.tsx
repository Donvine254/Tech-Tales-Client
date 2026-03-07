import { Mail } from "lucide-react";
import Link from "next/link";

export default function MagicLinkButton() {
  return (
    <Link href="/magic-link" passHref className="w-full">
      <button
        type="button"
        className="inline-flex items-center justify-center w-full gap-2 whitespace-nowrap rounded-md text-sm transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-9 px-4 py-2 has-[>svg]:px-3 bg-blue-200/40 dark:bg-blue-950/50 ">
        <Mail /> Sign in with Magic Link
      </button>
    </Link>
  );
}
