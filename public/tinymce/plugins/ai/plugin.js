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
            html: `<div id="ai-response-container" style="padding: 10px; max-height:250px; overflow-y:scroll;"> 
            </div>`,
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
        fetch("http://localhost:3000/api/gemini", {
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
            const aiResponse = `<div style="margin-bottom:5px;">${responseData.message}
               <button id="insert-btn" style="background-color: #006CE7; color: white; padding: 5px 12px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Insert</button>
            <button style="background-color: #f2f3f4; color: black; padding: 5px 12px; border: none; border-radius: 4px; cursor: not-allowed;" disabled>Stop </button>
            </div>`;
            const result = document.getElementById("ai-response-container");
            result.style.border = "1px solid gray";
            result.style.borderRadius = "5px";
            result.innerHTML = aiResponse;
            document
              .getElementById("insert-btn")
              .addEventListener("click", () => {
                insertContent(responseData);
              });
          })
          .catch((error) => {
            console.error("Error fetching AI response:", error);
            alert("Failed to fetch AI response.");
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
