tinymce.PluginManager.add("ai", function (editor, url) {
  const openDialog = () => {
    editor.windowManager.open({
      title: "AI Assistant",
      body: {
        type: "panel",
        items: [
          {
            type: "htmlpanel",
            name: "responsePanel",
            html: `<div id="ai-response-container" style="max-height:250px; overflow-y:scroll;"> </div>`,
          },
          {
            type: "htmlpanel",
            name: "responseButtons",
            html: `<div id="response-buttons" style="padding: 10px 0; display:none;"> <button id="insert-btn" style="background-color: #006CE7; color: white; padding: 5px 12px; border: none; border-radius: 4px; cursor: pointer">Insert</button> </div>`,
          },
          {
            type: "input",
            name: "prompt",
            placeholder: "Ask AI to edit or generate",
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
          name: "submitButton",
          text: "Send",
          buttonType: "primary",
        },
      ],
      onSubmit: (api) => {
        const data = api.getData();
        if (!data.prompt) {
          alert("Kindly enter a prompt first!");
          return false;
        }
        const result = document.getElementById("ai-response-container");
        const responseBtns = document.getElementById("response-buttons");
        result.innerHTML = `<div id="loading-indicator" style="width:100%; display:flex; flex-direction:column; gap:0.5rem;">
    <div class="loading-bar" style="height:11px; width:100%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424,#4285f4); animation: gradientAnimation 3s linear infinite;"></div>
    <div class="loading-bar" style="height:11px; width:100%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424,#4285f4); animation: gradientAnimation 3s linear infinite;"></div>
    <div class="loading-bar" style="height:11px; width:100%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424,#4285f4); animation: gradientAnimation 3s linear infinite;"></div>
    <div class="loading-bar" style="height:11px; width:70%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424,#4285f4); animation: gradientAnimation 3s linear infinite;"></div>
  </div>`;
        fetch("https://techtales.vercel.app/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message:
              "This is a rich text editor for a blog. You are being asked to help generate a blog or edit some text. Make sure your response is in html format. No need to indicate the format in the response, just be direct",
            body: data.prompt,
          }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            const aiResponse = `<div style="margin-bottom:5px;padding: 10px;">${responseData.message}
            </div>`;
            result.style.border = "1px solid #f2f3f4";
            result.style.borderRadius = "5px";
            result.innerHTML = aiResponse;
            responseBtns.style.display = "block";
            document
              .getElementById("insert-btn")
              .addEventListener("click", () => {
                insertContent(responseData);
              });
          })
          .catch((error) => {
            console.error("Error fetching AI response:", error);
            result.innerHTML = `<p style="color:red;">Failed to generate response. Try again later or check the error below. ${error}</p>`;
          });
        api.setData({ prompt: "" });
      },
    });
  };
  editor.ui.registry.addButton("ai", {
    icon: "ai",
    tooltip: "Ask AI",
    onAction: function () {
      openDialog();
    },
  });
  editor.ui.registry.addMenuItem("ai", {
    text: "AI Assistant",
    onAction: function () {
      openDialog();
    },
  });

  return {
    getMetadata: function () {
      return {
        name: "AI Assistant",
        url: "http://exampleplugindocsurl.com",
      };
    },
  };
});
const insertContent = (responseData) => {
  console.log(responseData);
  tinymce.activeEditor.insertContent(`<div>${responseData.message}</div>`);
  tinymce.activeEditor.windowManager.close();
};
