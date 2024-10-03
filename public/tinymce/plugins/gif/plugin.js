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
            inputMode:"search",
            label: "Search GIFs"
          },
          {
            type: "htmlpanel",
            name: "gifDisplay",
            html: `<div><p style="display:flex; justify-content:flex-end; align-items:center; font-size: 14px; color: #888; gap:5px;">Powered By <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg" width="50" alt="giphy-attribution" style="width:50px;"/></p><div id="loader" style="display:flex; align-items-center;justify-content:center; flex-direction:column;gap:10px;"> <svg xmlns="http://www.w3.org/2000/svg" style="margin: auto; background: none; display: block;" width="30px" height="30px" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" stroke-width="8" stroke="#888" stroke-dasharray="164 56" fill="none" stroke-linecap="round">
 <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50"/> </circle>
</svg> <p style="color: #888;text-align:center;">Loading GIFs...</p></div>
<div id="gifGrid" class="gif-grid-container" style="display: grid; grid-template-columns: repeat(3,1fr); justify-content: center; align-items: center; max-width: 100%; max-height: 100vh; gap: 10px; overflow-x:clip;">
</div> </div>`
          }
        ]
      },
      buttons: [
        {
          type: "cancel",
          text: "Close"
        },
        {
          type: "submit",
          text: "Search",
          buttonType: "primary"
        }
      ],
      onSubmit: (api) => {
        const data = api.getData();
        const searchQuery = data.gifSearch;
        if (searchQuery) {
          const searchApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
            searchQuery
          )}&limit=30&rating=g`;
          // Fetch GIFs based on the search query
          fetch(searchApiUrl)
            .then((response) => response.json())
            .then((json) => {
              let gifGrid = document.getElementById("gifGrid");
              gifGrid.innerHTML = ""; 
              if (json.data.length > 0) {
                // Display search results
                json.data.forEach((gif, index) => {
                  const gifUrl = gif.images.fixed_height.url;
                  const gifElement = `<div style="position: relative; width: 100%; padding-top: 100%; border:1px solid #222; background-image: url('https://res.cloudinary.com/dipkbpinx/image/upload/v1727994385/illustrations/simx3zvhnukfaaix2isp.gif'); background-position:center; background-repeat:no-repeat; background-size: contain;" onclick="insertGif(event, '${gifUrl}')"> 
    <img src="${gifUrl}" key="${index}" id="${index}" style="cursor:pointer; object-fit: cover; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" />
</div>`;
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
      }
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
          let gifGrid = document.getElementById("gifGrid");
          gifGrid.innerHTML = "";
          json.data.forEach((gif, index) => {
            const gifUrl = gif.images.fixed_height.url;
            const gifElement = `<div style="position: relative; width: 100%; padding-top: 100%; border:1px solid #222; background-image: url('https://res.cloudinary.com/dipkbpinx/image/upload/v1727994385/illustrations/simx3zvhnukfaaix2isp.gif'); background-position:center; background-repeat:no-repeat; background-size: contain;" onclick="insertGif(event, '${gifUrl}')"> 
    <img src="${gifUrl}" key="${index}" id="${index}" style="cursor:pointer; object-fit: cover; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" />
</div>`;
            gifGrid.innerHTML += gifElement;
      document.getElementById("loader").innerHTML="";
          });
        })
        .catch((error) => {
          console.error("Error fetching random GIFs:", error);
          alert("Error loading random GIFs.");
        });
    }
  });
  editor.ui.registry.addMenuItem("gif", {
    text: "GIF plugin",
    icon: "gif",
    onAction: () => {
      openDialog();
    }
  });
  /* Return the metadata for the help plugin */
  return {
    getMetadata: () => ({
      name: "GIF plugin",
      url: "http://exampleplugindocsurl.com"
    })
  };
});
insertGif = (event, gifUrl) => {
  event.preventDefault();
  tinymce.activeEditor.insertContent(
    `<img src="${gifUrl}" alt="GIF" role="presentation" loading="lazy" />`
  );
  tinymce.activeEditor.windowManager.close();
};
