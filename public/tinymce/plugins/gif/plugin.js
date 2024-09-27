const giphyApiKey = "kyOZdQ3OjsRHw1o8kp34h6FRvzyP3Div";
const randomApiUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=50&offset=${Math.floor(
  Math.random() * 100
)}&rating=g`;

tinymce.PluginManager.add("gif", (editor, url) => {
  const openDialog = () =>
    editor.windowManager.open({
      title: "Insert GIF",
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
            html: `<div><p style="display:flex; justify-content:flex-end; align-items:center; font-size: 14px; color: #888; gap:5px;">Powered By <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg" width="50" alt="giphy-attribution" style="width:50px;"/></p><div id="gifGrid" class="gif-grid-container" style="display: grid; grid-template-columns: repeat(2, 1fr); justify-content: center; align-items: center; width: 100%; gap: 10px;">
 <p style="color: #888;">Loading...</p>
 </div> </div>`, // Placeholder for GIF grid
          },
        ],
      },
      buttons: [
        {
          type: "cancel",
          text: "Close",
        },
        {
          type: "submit",
          text: "Search",
          buttonType: "primary",
        },
      ],
      onSubmit: (api) => {
        const data = api.getData();
        const searchQuery = data.gifSearch;
        if (searchQuery) {
          const searchApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
            searchQuery
          )}&limit=20&rating=g`;
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
                  const gifElement = `<div style="margin: 5px;"><img src="${gifUrl}" style="cursor:pointer; object-fit: cover; width: 150px; height: 150px;" onclick="insertGif('${gifUrl}')"/></div>`;
                  gifGrid.innerHTML += gifElement;
                });
              } else {
                gifGrid.innerHTML =
                  "<p>No GIFs found for that search term.</p>";
              }
            })
            .catch((error) => {
              console.error("Error fetching search results:", error);
              alert("Error fetching search results. Please try again.");
            });
        } else {
          alert("Please enter a search term.");
        }
        /* Insert content when the window form is submitted */
      },
    });
  editor.ui.registry.addIcon(
    "gif",
    `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h6v2H3v6h4v-2H5v-2h4v6H1V7h2zm14 0h6v2h-6v2h4v2h-4v4h-2V7h2zm-4 0h-2v10h2V7z" fill="#000000"/>
</svg>`
  );
  /* Add a button that opens a window */
  editor.ui.registry.addButton("gif", {
    icon: "gif",
    tooltip: "Insert a GIF",
    onAction: () => {
      /* Open window */
      openDialog();
      fetch(randomApiUrl)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          let gifGrid = document.getElementById("gifGrid");
          gifGrid.innerHTML = "";
          json.data.forEach((gif) => {
            const gifUrl = gif.images.fixed_height.url;
            const gifElement = `<div style="margin: 5px;"><img src="${gifUrl}" style="cursor:pointer; width: 150px; height: 150px; object-fit: cover;" onclick="insertGif('${gifUrl}')" /></div>`;
            gifGrid.innerHTML += gifElement;
          });
        })
        .catch((error) => {
          console.error("Error fetching random GIFs:", error);
          alert("Error loading random GIFs.");
        });
    },
  });
  /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
  editor.ui.registry.addMenuItem("gif", {
    text: "GIF plugin",
    onAction: () => {
      /* Open window */
      openDialog();
    },
  });
  /* Return the metadata for the help plugin */
  return {
    getMetadata: () => ({
      name: "GIF plugin",
      url: "http://exampleplugindocsurl.com",
    }),
  };
});
insertGif = (gifUrl) => {
  tinymce.activeEditor.insertContent(`<img src="${gifUrl}" alt="GIF" />`);
  tinymce.activeEditor.windowManager.close();
};
