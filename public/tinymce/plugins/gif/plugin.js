const giphyApiKey = "kyOZdQ3OjsRHw1o8kp34h6FRvzyP3Div";
const randomApiUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=60&offset=${Math.floor(
  Math.random() * 100
)}&rating=g&fields=id,url,images.original`;

let handleSubmit;

tinymce.PluginManager.add("gif", (editor, url) => {
  const openDialog = () =>
    editor.windowManager.open({
      title: "Insert GIF",
      body: {
        type: "panel",
        items: [
          {
            type: "htmlpanel",
            name: "gifDisplay",
            html: `<div>
           <form onsubmit="handleSubmit(event)"><div style="display:flex; align-items:center; gap: 0;">
        <input type="search" placeholder="Search GIFs..." name="gifSearch" id="gifSearch" style="width:100%; border-radius:5px 0 0 5px; padding: 8px 5px; border: 1px solid #006ce7" onmouseover="this.style.borderColor='#00308F';" onmouseout="this.style.borderColor='#006ce7';" class="bg-input"/><button style="background-color: #006ce7; color:white; padding: 8px 10px; outline:none; border:1px solid #006ce7; border-radius:0 5px 5px 0; cursor:pointer;" id="searchBtn" onclick="handleSubmit(event)" title="search" type="submit">Search</button></div><p style="display:flex; justify-content:flex-end; align-items:center; font-size: 14px; color: #888; gap:5px;">
        Powered By <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg" width="50" alt="giphy-attribution" style="width:50px;"/></p></form><div id="loader" style="display:flex; align-items-center;justify-content:center; flex-direction:column;gap:10px;"> <svg xmlns="http://www.w3.org/2000/svg" style="margin: auto; background: none; display: block;" width="30px" height="30px" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" stroke-width="8" stroke="#888" stroke-dasharray="164 56" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50"/> </circle></svg> <p style="color: #888;text-align:center;">Loading GIFs...</p></div><div id="gifGrid" class="gif-grid-container" style="display: grid; grid-template-columns: repeat(3,1fr); justify-content: center; align-items: center; max-width: 100%; max-height: 100vh; gap: 10px; overflow-x:clip;"></div> </div>`,
          },
        ],
      },
      buttons: [
        {
          type: "cancel",
          text: "Close",
        },
      ],
    });

  handleSubmit = (event) => {
    event.preventDefault();
    const searchQuery = document.getElementById("gifSearch").value;
    if (searchQuery) {
      const searchApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
        searchQuery
      )}&limit=30&rating=g&&fields=id,url,images.original`;
      // Fetch GIFs based on the search query
      fetch(searchApiUrl)
        .then((response) => response.json())
        .then((json) => {
          let gifGrid = document.getElementById("gifGrid");
          gifGrid.innerHTML = "";
          if (json.data.length > 0) {
            // Display search results
            json.data.forEach((gif, index) => {
              const gifUrl = gif.images.original.url;
              const width = gif.images.original.width;
              const height = gif.images.original.height;
              const gifElement = `<div style="position: relative; width: 100%; padding-top: 100%; border:1px solid #ccc; background-image: url('https://res.cloudinary.com/dipkbpinx/image/upload/v1727994385/illustrations/simx3zvhnukfaaix2isp.gif'); background-position:center; background-repeat:no-repeat; background-size: contain;" onclick="insertGif('${gifUrl}', ${width}, ${height})">><img src="${gifUrl}" key="${index}" id="${index}" style="cursor:pointer; object-fit: cover; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" height="${height} " width="${width}" /></div>`;
              gifGrid.innerHTML += gifElement;
            });
          } else {
            gifGrid.innerHTML = `<p style='width:100%; text-align:center;'>No GIFs found 😢.</p>`;
          }
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          alert("Error fetching search results. Please try again.");
        });
    } else {
      alert("Please enter a search term.");
    }
  };
  /* Insert content when the window form is submitted */
  insertGif = (gifUrl, width, height) => {
    editor.setProgressState(true);
    editor.insertContent(
      `<img src="${gifUrl}" alt="GIF" role="presentation" loading="lazy" height="${height} " width="${width}" />`
    );
    editor.windowManager.close();
    setTimeout(() => {
      editor.setProgressState(false);
    }, 1000);
  };
  editor.ui.registry.addIcon(
    "gif",
    `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h6v2H3v6h4v-2H5v-2h4v6H1V7h2zm14 0h6v2h-6v2h4v2h-4v4h-2V7h2zm-4 0h-2v10h2V7z" fill="currentColor"/>
</svg>`
  );
  /* Add a button that opens a window */
  editor.ui.registry.addButton("gif", {
    icon: "gif",
    tooltip: "Insert a GIF",
    onAction: () => {
      /* Open window */
      openDialog();
      const searchInput = document.getElementById("gifSearch");
      setTimeout(() => {
        searchInput.focus();
      }, 100);
      fetch(randomApiUrl)
        .then((response) => response.json())
        .then((json) => {
          let gifGrid = document.getElementById("gifGrid");
          gifGrid.innerHTML = "";
          json.data.forEach((gif, index) => {
            const gifUrl = gif.images.original.url;
            const width = gif.images.original.width;
            const height = gif.images.original.height;
            const gifElement = `<div style="position: relative; width: 100%; padding-top: 100%; border:1px solid #ccc; background-image: url('https://res.cloudinary.com/dipkbpinx/image/upload/v1727994385/illustrations/simx3zvhnukfaaix2isp.gif'); background-position:center; background-repeat:no-repeat; background-size: contain;" onclick="insertGif('${gifUrl}', ${width}, ${height})"><img src="${gifUrl}" key="${index}" id="${index}" style="cursor:pointer; object-fit: cover; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" height="${height} " width="${width}" /></div>`;
            gifGrid.innerHTML += gifElement;
            document.getElementById("loader").innerHTML = "";
          });
        })
        .catch((error) => {
          console.error("Error fetching random GIFs:", error);
          alert("Error loading random GIFs.");
        });
    },
  });
  editor.ui.registry.addMenuItem("gif", {
    text: "GIF plugin",
    icon: "gif",
    onAction: () => {
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
