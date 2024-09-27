import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { handleImageUpload } from "./index";
import toast from "react-hot-toast";
export default function CommentEditor({
  data,
  handleChange,
  length,
  setLength,
  setIsEditing,
  isEditing,
  isInputFocused,
  setIsInputFocused,
  handleUpdate,
  setNewComment,
  handleSubmit,
  undoEditing,
}) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const insertGif = (gifUrl) => {
    editorRef.current.insertContent(`<img src="${gifUrl}" alt="GIF" />`);
    editorRef.current.windowManager.close();
  };

  return (
    <div className="flex-1  flex-grow" id="write-comment">
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={data}
        onChange={() => handleChange(editorRef.current.getContent())}
        onFocus={() => setIsInputFocused(true)}
        onKeyUp={() =>
          setLength(editorRef.current.getContent({ format: "text" }).length)
        }
        name="body"
        isReadOnly={length > 500}
        init={{
          min_height: 100,
          toolbar_location: "bottom",
          toolbar_mode: "sliding",
          menubar: false,
          statusbar: false,
          placeholder: "Start by typing text here....",
          browser_spellcheck: true,
          autocomplete: true,
          plugins: [
            "autolink",
            "lists",
            "link",
            "image",
            "autoresize",
            "emoticons",
            "fullscreen",
            "insertdatetime",
          ],
          toolbar:
            "bold italic underline forecolor|numlist bullist|blockquote link image|gif emoticons",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap'); body { font-family: Poppins; height: 'auto'; overflow: 'hidden';  }",
          image_advtab: true,
          images_upload_handler: handleImageUpload,
          setup: (editor) => {
            editor.ui.registry.addIcon(
              "gif",
              `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7h6v2H3v6h4v-2H5v-2h4v6H1V7h2zm14 0h6v2h-6v2h4v2h-4v4h-2V7h2zm-4 0h-2v10h2V7z" fill="#000000"/>
</svg>`
            );
            editor.ui.registry.addButton("gif", {
              icon: "gif",
              tooltip: "Insert a GIF",
              onAction: function () {
                window.insertGif = insertGif;
                // Open the modal to search for GIFs
                editor.windowManager.open({
                  title: "Insert a GIF",
                  body: {
                    type: "panel",
                    items: [
                      {
                        type: "input",
                        name: "gifSearch",
                        label: "Search GIFs",
                      },
                      {
                        type: "htmlpanel",
                        name: "gifDisplay",
                        html: `<div>
                                <p style="display:flex; justify-items:center; align-items:center; font-size: 14px; color: #888; gap:5px;">Powered By <img src="/giphy-logo.svg" width="50" alt="giphy-attribution" style="width:50px;"/></p>
                              <div id="gifGrid" class="gif-grid-container"></div>
                              </div>`, // Placeholder for GIF grid
                      },
                    ],
                  },
                  buttons: [
                    {
                      type: "submit",
                      text: "Search",
                    },
                    {
                      type: "cancel",
                      text: "Close",
                    },
                  ],

                  onSubmit: function (api) {
                    const data = api.getData();
                    const searchQuery = data.gifSearch;
                    // Helper function to insert the selected GIF

                    if (searchQuery) {
                      const giphyApiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
                      const searchApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
                        searchQuery
                      )}&limit=10`;

                      // Fetch GIFs based on the search query
                      fetch(searchApiUrl)
                        .then((response) => response.json())
                        .then((json) => {
                          let gifGrid = document.getElementById("gifGrid");
                          gifGrid.innerHTML = ""; // Clear any previous GIFs

                          if (json.data.length > 0) {
                            // Display search results
                            json.data.forEach((gif) => {
                              const gifUrl = gif.images.fixed_height.url;
                              const gifElement = `<div style="margin: 5px;">
                <img src="${gifUrl}" style="cursor:pointer; object-fit: cover; width: 150px; height: 150px;"  onclick="window.insertGif('${gifUrl}')" />
              </div>`;
                              gifGrid.innerHTML += gifElement;
                            });
                          } else {
                            gifGrid.innerHTML =
                              "<p>No GIFs found for that search term.</p>";
                          }
                        })
                        .catch((error) => {
                          console.error(
                            "Error fetching search results:",
                            error
                          );
                          toast.error(
                            "Error fetching search results. Please try again."
                          );
                        });
                    } else {
                      toast.error("Please enter a search term.");
                    }
                  },
                });

                const giphyApiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
                const randomTerm = ["funny", "cat", "dance"][
                  Math.floor(Math.random() * 3)
                ];
                const randomApiUrl = `https://api.giphy.com/v1/gifs/search?q=${randomTerm}&api_key=${giphyApiKey}&limit=10&offset=${Math.floor(
                  Math.random() * 100
                )}`;

                fetch(randomApiUrl)
                  .then((response) => response.json())
                  .then((json) => {
                    console.log(json);
                    let gifGrid = document.getElementById("gifGrid");
                    gifGrid.innerHTML = "";
                    json.data.forEach((gif) => {
                      const gifUrl = gif.images.fixed_height.url;
                      const gifElement = `<div style="margin: 5px;">
                <img src="${gifUrl}" style="cursor:pointer; width: 150px; height: 150px; object-fit: cover;" onclick="window.insertGif('${gifUrl}')" />
              </div>`;
                      gifGrid.innerHTML += gifElement;
                    });
                  })
                  .catch((error) => {
                    console.error("Error fetching random GIFs:", error);
                    toast.error("Error loading random GIFs.");
                  });
              },
            });
          },
        }}
      />
      <div
        className={`flex items-center ${
          length > 500 ? "justify-between" : "justify-end"
        }`}>
        {" "}
        {length > 500 && (
          <small className="text-red-500">* Maximum length exceeded!</small>
        )}
        <p className="p-0 text-sm font-medium ">
          <span className={`${length > 500 ? "text-red-500" : ""}`}>
            {length}
          </span>
          / 500
        </p>
      </div>

      <div className="flex items-center justify-end gap-2 md:gap-4 py-1 ">
        {isInputFocused && (
          <>
            {isEditing ? (
              <>
                <button
                  type="submit"
                  disabled={length <= 5 || length > 500}
                  className="bg-blue-500 border-2 border-blue-500 text-white  px-6 py-0.5 lg:mr-4 rounded-md hover:bg-blue-600  disabled:bg-gray-100 disabled:border-gray-600 disabled:text-gray-600"
                  onClick={handleUpdate}>
                  Update
                </button>
                <button
                  type="button"
                  onClick={undoEditing}
                  className="border-2  border-green-500 hover:border-red-500 px-6 py-0.5 rounded-md">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={length <= 10 || length > 500}
                  className="bg-blue-500 text-white border-2 border-blue-500 px-6 py-0.5 lg:mr-3 rounded-md hover:bg-blue-600 disabled:bg-gray-100 disabled:border-gray-600 disabled:text-gray-600 disabled:pointer-events-none"
                  onClick={handleSubmit}
                  title="add comment">
                  Respond
                </button>
                <button
                  type="button"
                  className="border-2  border-green-500 hover:border-red-500 px-6 py-0.5 rounded-md"
                  onClick={() => {
                    setIsInputFocused(false);
                    setNewComment("");
                    setLength(0);
                    setIsEditing(false);
                  }}>
                  Cancel
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
