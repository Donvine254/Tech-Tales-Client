export default function Editor({ handleChange, data }) {
  return (
    <div
      className="max-w-[800px] bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
      id="editor">
      <div className="flex space-x-2 p-2 border-b border-gray-200 dark:border-gray-800">
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none  h-10 px-4 py-2 text-gray-600 dark:text-white editor-button"
          type="button"
          title="bold"
          data-element="bold">
          <span className="sr-only">Bold</span>
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
            className="w-4 h-4">
            <path d="M14 12a4 4 0 0 0 0-8H6v8"></path>
            <path d="M15 20a4 4 0 0 0 0-8H6v8Z"></path>
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none  h-10 px-4 py-2 text-gray-600 dark:text-white editor-button"
          type="button"
          title="italic"
          data-element="italic">
          <span className="sr-only">Italic</span>
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
            className="w-4 h-4">
            <line x1="19" x2="10" y1="4" y2="4"></line>
            <line x1="14" x2="5" y1="20" y2="20"></line>
            <line x1="15" x2="9" y1="4" y2="20"></line>
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none  h-10 px-4 py-2 text-gray-600 dark:text-white editor-button"
          type="button"
          title="underline"
          data-element="underline">
          <span className="sr-only">Underline</span>
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
            className="w-4 h-4">
            <path d="M6 4v6a6 6 0 0 0 12 0V4"></path>
            <line x1="4" x2="20" y1="20" y2="20"></line>
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none  h-10 px-4 py-2 text-gray-600 dark:text-white editor-button"
          type="button"
          title="left align"
          data-element="justifyLeft">
          <span className="sr-only">Left Align</span>
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
            className="w-4 h-4">
            <line x1="21" x2="3" y1="6" y2="6"></line>
            <line x1="15" x2="3" y1="12" y2="12"></line>
            <line x1="17" x2="3" y1="18" y2="18"></line>
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none  h-10 px-4 py-2 text-gray-600 dark:text-white editor-button"
          type="button"
          title="center align"
          data-element="justifyCenter">
          <span className="sr-only">Center Align</span>
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
            className="w-4 h-4">
            <line x1="21" x2="3" y1="6" y2="6"></line>
            <line x1="17" x2="7" y1="12" y2="12"></line>
            <line x1="19" x2="5" y1="18" y2="18"></line>
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-600 dark:text-white editor-button"
          title="Right Align"
          type="button"
          data-element="justifyRight">
          <span className="sr-only">Right Align</span>
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
            className="w-4 h-4">
            <line x1="21" x2="3" y1="6" y2="6"></line>
            <line x1="21" x2="9" y1="12" y2="12"></line>
            <line x1="21" x2="7" y1="18" y2="18"></line>
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium disabled:pointer-events-none h-10 px-4 py-2 text-gray-600 dark:text-white editor-button"
          type="button"
          title="bulleted list"
          data-element="insertOrderedList">
          <span className="sr-only">Bulleted List</span>
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
            className="w-4 h-4">
            <line x1="8" x2="21" y1="6" y2="6"></line>
            <line x1="8" x2="21" y1="12" y2="12"></line>
            <line x1="8" x2="21" y1="18" y2="18"></line>
            <line x1="3" x2="3.01" y1="6" y2="6"></line>
            <line x1="3" x2="3.01" y1="12" y2="12"></line>
            <line x1="3" x2="3.01" y1="18" y2="18"></line>
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium disabled:pointer-events-none  h-10 px-4 py-2 text-gray-600 dark:text-white editor-button"
          type="button"
          title="link"
          data-element="createLink">
          <span className="sr-only">Add Link</span>
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
            className="w-4 h-4">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none  h-10 px-4 py-2 text-gray-600 dark:text-white editor-button"
          type="button"
          title="insert image"
          data-element="insertImage">
          <span className="sr-only">Image</span>
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
            className="w-4 h-4">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium disabled:pointer-events-none  h-10 px-4 py-2 text-gray-600 dark:text-white"
          title="emoji"
          data-element="insertEmoji">
          <span className="sr-only">Emoji</span>
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
            className="w-4 h-4">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" x2="9.01" y1="9" y2="9"></line>
            <line x1="15" x2="15.01" y1="9" y2="9"></line>
          </svg>
        </button>
      </div>
      <textarea
        value={data}
        onChange={handleChange}
        rows={8}
        className="w-full h-full p-4 text-black focus:outline-none text-xl border-none font-crimson"
        placeholder="Type your text here..."></textarea>
    </div>
  );
}
