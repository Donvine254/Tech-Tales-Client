import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useSession } from "@/providers/session";
import { Favorite } from "@prisma/client";
import { getFavoriteBlogs, handleBlogLiking } from "@/lib/actions/favorites";

interface AnimatedLikeButtonProps {
  initialLikes?: number;
  blogId: number;
  size?: number;
  onLikeChange?: (liked: boolean, likes: number) => void;
}
const FAVORITES_KEY = "user-favorite-blogs";

function getCachedFavorites(): number[] | null {
  const raw =
    typeof window !== "undefined" && localStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setCachedFavorites(favs: number[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

function addToCache(blogId: number) {
  const current = getCachedFavorites() || [];
  if (!current.includes(blogId)) {
    setCachedFavorites([...current, blogId]);
  }
}

function removeFromCache(blogId: number) {
  const current = getCachedFavorites() || [];
  setCachedFavorites(current.filter((id) => id !== blogId));
}

export default function AnimatedLikeButton({
  initialLikes = 0,
  blogId,
  size = 24,
  onLikeChange,
}: AnimatedLikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isProcessing, setIsProcessing] = useState(false);
  const { session } = useSession();
  //Initialize sound
  const [sound, setSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const sfx = new Audio(
      "https://utfs.io/f/d74018ac-813d-452c-9414-4aa1ee4fb595-ry5vyc.mp3"
    );
    setSound(sfx);
  }, []);
  // Use Effect to check favorite blogs
  useEffect(() => {
    if (!session) return;

    const cached = getCachedFavorites();
    if (cached) {
      setLiked(cached.includes(blogId));
    } else {
      (async () => {
        try {
          const result = await getFavoriteBlogs(session.userId); // should return Favorite[] or blog IDs
          const ids = result.map((f: Favorite) => f.blogId);
          setCachedFavorites(ids);
          setLiked(ids.includes(blogId));
        } catch (err) {
          console.error("Failed to load favorite blogs", err);
        }
      })();
    }
  }, [session, blogId]);
  const handleToggle = async () => {
    if (!session) {
      toast.info("Login to add blog to favorites");
      return;
    }
    if (isProcessing) return; // Prevent double-click spam
    setIsProcessing(true);
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;
    try {
      setLiked(newLiked);
      setLikes(newLikes);
      onLikeChange?.(newLiked, newLikes);
      if (newLiked) {
        toast.success("Blog added to favorites");
        addToCache(blogId);
        sound?.play();
        await handleBlogLiking(blogId, session.userId, "LIKE");
      } else {
        toast.info("Blog removed from favorites");
        removeFromCache(blogId);
        await handleBlogLiking(blogId, session.userId, "DISLIKE");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Something went wrong. Please try again.");
      // Revert state on error
      setLiked(!newLiked);
      setLikes(newLiked ? likes : likes + 1);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="flex items-center text-sm">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="like-button-container">
              <input
                type="checkbox"
                id="checkbox"
                checked={liked}
                disabled={isProcessing}
                onChange={handleToggle}
              />
              <label htmlFor="checkbox">
                <svg
                  id="heart-svg"
                  viewBox="467 392 58 57"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: size, height: size }}>
                  <g
                    id="Group"
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(467 392)">
                    <path
                      d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                      id="heart"
                      fill="#AAB8C2"
                    />
                    <circle
                      id="main-circ"
                      fill="#E2264D"
                      opacity="0"
                      cx="29.5"
                      cy="29.5"
                      r="1.5"
                    />

                    <g id="grp7" opacity="0" transform="translate(7 6)">
                      <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                      <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                    </g>

                    <g id="grp6" opacity="0" transform="translate(0 28)">
                      <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                      <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                    </g>

                    <g id="grp3" opacity="0" transform="translate(52 28)">
                      <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                      <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                    </g>

                    <g id="grp2" opacity="0" transform="translate(44 6)">
                      <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                      <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                    </g>

                    <g id="grp5" opacity="0" transform="translate(14 50)">
                      <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                      <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                    </g>

                    <g id="grp4" opacity="0" transform="translate(35 50)">
                      <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                      <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                    </g>

                    <g id="grp1" opacity="0" transform="translate(24)">
                      <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                      <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                    </g>
                  </g>
                </svg>
              </label>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-72 text-sm" side="bottom">
            <p>{!liked ? "Add" : "Remove"} blog to favorites</p>
          </TooltipContent>
        </Tooltip>
        <span className="">{likes}</span>
      </TooltipProvider>
    </div>
  );
}
