import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import PrismLoader from "../ui/prismLoader";
export default function PreviewModal({ blog }) {
  const handleClose = () => {
    const modal = document.getElementById("preview-modal");
    if (modal) {
      modal.close();
    }
  };

  if (!blog) {
    return null;
  }
  return (
    <dialog
      id="preview-modal"
      className="rounded-md w-[90%] h-[90%] border px-4 py-2 backdrop-blur-sm backdrop-blue-500">
      <div className="relative h-full w-full flex flex-col">
        <div className="flex justify-between items-center py-2">
          <p className="text-lg md:text-xl font-bold text-gray-500">Preview</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hover:fill-red-500 hover:bg-gray-100 p-1 rounded-md hover:text-red-500 cursor-pointer z-50"
            onClick={handleClose}>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
            <title>Close</title>
          </svg>
        </div>
        {/* section for blog */}
        <section className="overflow-auto flex-1 px-5">
          {blog.image && (
            <Image
              src={blog.image.secure_url}
              alt={blog.image.original_filename}
              height={720}
              width={1280}
              className="italic w-full h-auto object-contain"
            />
          )}
          <h1 className="font-bold xsm:text-xl text-2xl lg:text-3xl from-pink-600  via-purple-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
            {blog?.title}
          </h1>
          <div className="py-1">
            {blog.tags ? (
              <div className="flex gap-2 flex-wrap">
                {blog.tags.split(",").map((tag, index) => (
                  <Link
                    key={index}
                    href={`/search?search=${tag.trim()}`}
                    className="md:px-2 md:py-0.5 text-blue-600 md:bg-transparent md:hover:bg-blue-600 md:hover:text-white cursor-pointer md:border md:border-blue-600 md:rounded-xl">
                    #{tag.trim()}
                  </Link>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <article
            className="text-sm md:text-base leading-4 mt-3 subpixel-antialiased blog-body"
            id="blog-body">
            <PrismLoader />
            {blog.body ? parse(blog?.body) : blog.body}
          </article>
        </section>
        <div className="flex justify-end p-2">
          <button
            className="bg-[#0060CE] hover:bg-blue-600  py-0.5 px-2 rounded-md text-white"
            title="close"
            onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
