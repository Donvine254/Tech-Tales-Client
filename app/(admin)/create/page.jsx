export default function page() {
  return (
    <div className="flex flex-col md:flex-row m-5 md:w-4/5 md:ml-auto">
      <form className="bg-gray-200 md:w-2/3 border m-auto p-8 rounded-sm">
        <label
          for="title"
          className="p-4 mt-2 text-xl md:text-2xl text-center font-bold text-black">
          Blog Title
        </label>
        <input
          className="blog-input-field focus:outline-none"
          type="text"
          name="title"
          placeholder="write your blog title here"
        />
        <br></br>
        <label
          for="title"
          className="p-4 mt-2 text-xl md:text-2xl text-center font-bold text-black">
          Cover Image
        </label>
        <input
          className="blog-input-field focus:outline-none"
          type="text"
          name="title"
          placeholder="paste the url for the cover image"
        />
        <br className="mt-8"></br>
        <textarea
          rows="10"
          placeholder="write your blog here"
          className="p-4 w-full border-none shadow-lg text-black focus:outline-none text-xl"
        />
        <div className="flex gap-2 md:gap-8 mt-4">
          <button
            type="submit"
            className="bg-blue-500 font-bold px-4 py-2 rounded-md hover:bg-blue-800">
            Publish
          </button>
          <button
            type="button"
            className="bg-transparent text-black hover:bg-slate-300 border hover:text-blue-500 border-blue-500 px-2 p-2 rounded-md">
            Save Draft
          </button>
        </div>
      </form>
      <div className="md:w-1/3 ml-5 mr-5 hidden md:block">
        <h1 className="tex-xl md:text-2xl font-bold">Writing a Great Post Title </h1>
        <p className="space-y-2 leading-relaxed">
          Think of your post title as a super short
          (but compelling!) description — like an overview of the actual post in
          one short sentence. Use keywords where appropriate to help ensure
          people can find your post by search.
        </p>
      </div>
    </div>
  );
}
