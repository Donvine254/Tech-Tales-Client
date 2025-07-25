tinymce.PluginManager.add("ai", function (editor, url) {
  const openDialog = () => {
    editor.windowManager.open({
      title: "AI Assistant ✨",
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
            html: `<div id="response-buttons" style="display:none; margin:10px 0; flex-wrap:wrap;justify-content:space-between;align-items:center"><div><button id="insert-btn" style="background-color: #006CE7; color: white; padding: 5px 12px; border: none; border-radius: 4px; cursor: pointer;"> Insert</button> <button id="retry-btn" style="background-color: #f4f5f6; padding: 5px 12px; border: none; border-radius: 4px; cursor: pointer; margin-left:10px;">Try Again</button></div><p style="font-size:12px;">AI responses can be inaccurate</p></div`,
          },
          {
            type: "input",
            name: "prompt",
            placeholder: "Ask AI to edit or brainstorm ideas",
          },
          {
            type: "htmlpanel",
            name: "attribution",
            html: `<p style="font-style:italic; color:#c2c2c2; margin:auto; font-size: 12px;">Powered by <span style="background: linear-gradient(to right, blue, purple); -webkit-background-clip: text; color: transparent;">Gemini</span>✨</p>`,
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
        const input = document.querySelector(".tox-textfield");
        input.disabled = true;
        const result = document.getElementById("ai-response-container");
        const responseBtns = document.getElementById("response-buttons");
        displayLoadingIndicator();
        fetch("https://techtales.vercel.app/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: data.prompt,
          }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            const aiResponse = `<div style="margin-bottom:5px;padding: 10px;">${responseData.message}
            </div>`;
            result.style.border = "1px solid #f2f3f4";
            result.style.borderRadius = "5px";
            result.innerHTML = aiResponse;
            responseBtns.style.display = "flex";
            document
              .getElementById("insert-btn")
              .addEventListener("click", () => {
                insertContent(responseData);
              });
            document
              .getElementById("retry-btn")
              .addEventListener("click", () => {
                input.disabled = false;
                result.innerHTML = "";
                responseBtns.style.display = "none";
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
    shortcut:"meta+J",
    onAction: function () {
      openDialog();
    },
  });
  editor.ui.registry.addMenuItem("ai", {
    text: "AI Assistant",
    icon: "ai",
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

const displayLoadingIndicator = () => {
  const result = document.getElementById("ai-response-container");
  result.innerHTML = `<div id="loading-indicator" style="width:100%; display:flex; flex-direction:column; gap:0.5rem;">
 <div class="loading-bar" style="height:11px; width:100%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424,#4285f4); animation: gradientAnimation 3s linear infinite;"></div>
<div class="loading-bar" style="height:11px; width:100%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424,#4285f4); animation: gradientAnimation 3s linear infinite;"></div>
<div class="loading-bar" style="height:11px; width:100%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424,#4285f4); animation: gradientAnimation 3s linear infinite;"></div>
<div class="loading-bar" style="height:11px; width:70%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424,#4285f4); animation: gradientAnimation 3s linear infinite;"></div>
</div>`;
};
