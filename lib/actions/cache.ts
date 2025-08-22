import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateBlog(blogPath?: string | null) {
  revalidateTag("user-blogs");
  revalidateTag("featured");
  revalidateTag("latest");
  revalidateTag("trending");
  revalidateTag("blogs");
  revalidatePath("/me/posts");
  revalidatePath(`/read/${blogPath}`);
}

import { unstable_cache } from "next/cache";

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
