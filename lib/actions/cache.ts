import { revalidatePath, revalidateTag } from "next/cache";
import { unstable_cache } from "next/cache";
/*
 * Revalidates the blog and user blogs cache tags.
 * This function is used to ensure that the cache is updated when a blog is created, updated, or deleted.
 *
 * @param blogPath - The path of the blog to revalidate.
 * @param userId - The ID of the user whose blogs need to be revalidated.
 */
export async function revalidateBlog(
  blogPath?: string | null,
  userId?: number
) {
  revalidateTag(`user-${userId}-blogs`);
  revalidateTag("featured");
  revalidateTag("latest");
  revalidateTag("trending");
  revalidateTag("blogs");
  revalidatePath(`/read/${blogPath}`);
}

/**
 * A utility function that wraps unstable_cache to cache the result of any callback function
 *
 * @param args - Arguments to pass to the callback function
 * @param cacheKey - Unique cache key for this operation
 * @param callback - The function to execute and cache
 * @param tags - Optional cache tags for revalidation
 * @param revalidate - Optional revalidation time in seconds
 * @returns Promise with the cached result
 */
export async function cachedCall<T extends unknown[], R>(
  args: T,
  cacheKey: string,
  callback: (...args: T) => Promise<R>,
  options?: {
    tags?: string[];
    revalidate?: number | false;
  }
): Promise<R> {
  // Create a wrapper function that calls the callback with the provided args
  const wrappedCallback = async () => {
    return await callback(...args);
  };

  // Use unstable_cache to cache the wrapped function
  const cachedFunction = unstable_cache(wrappedCallback, [cacheKey], {
    tags: options?.tags,
    revalidate: options?.revalidate,
  });

  return await cachedFunction();
}
