let currentAbortController = null;
window._abortAI = () => {
  if (currentAbortController) currentAbortController.abort();
};
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
            type: "htmlpanel",
            name: "promptPanel",
            html: `<textarea id="ai-prompt-input" placeholder="Ask AI to edit or brainstorm ideas" style="width: 100%;min-height: 90px max-height: 200px;resize: vertical;padding: 8px 10px;font-size: 14px;font-family: inherit;border: 1px solid #ccc;border-radius: 4px;box-sizing: border-box;outline: none;"></textarea>`,
          },
          {
            type: "htmlpanel",
            name: "attribution",
            html: `<p style="font-style:italic; color:#c2c2c2; margin:auto; font-size: 12px;">Powered by Google <span style="background: linear-gradient(to right, #4a90e2, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600;">Gemini</span> ✨</p>`,
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
        const promptInput = document.getElementById("ai-prompt-input");
        const prompt = promptInput?.value?.trim();

        if (!prompt) {
          tinymce.activeEditor.notificationManager.open({
            text: "Kindly enter a prompt first!",
            type: "info",
          });
          return false;
        }

        // Disable everything while request is in flight
        promptInput.disabled = true;
        api.setEnabled("submitButton", false);
        api.setEnabled("cancelButton", false);
        api.setEnabled("stopButton", true);
        currentAbortController = new AbortController();
        const result = document.getElementById("ai-response-container");
        const responseBtns = document.getElementById("response-buttons");
        displayLoadingIndicator();
        fetch("https://techtales.vercel.app/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: prompt }),
          signal: currentAbortController.signal,
        })
          .then((response) => response.json())
          .then((responseData) => {
            result.style.border = "1px solid #f2f3f4";
            result.style.borderRadius = "5px";
            result.innerHTML = `<div style="margin-bottom:5px; padding:10px;">${responseData.message}</div>`;
            responseBtns.style.display = "flex";
            promptInput.value = "";
            document
              .getElementById("insert-btn")
              .addEventListener("click", () => {
                insertContent(responseData);
              });
            document
              .getElementById("retry-btn")
              .addEventListener("click", () => {
                result.innerHTML = "";
                result.style.border = "none";
                responseBtns.style.display = "none";
              });
          })
          .catch((error) => {
            if (error.name === "AbortError") {
              result.innerHTML = `<p style="color:#888;">Request cancelled.</p>`;
            } else {
              console.error("Error fetching AI response:", error);
              result.innerHTML = `<p style="color:red;">Failed to generate response. ${error}</p>`;
            }
          })
          .finally(() => {
            promptInput.disabled = false;
            api.setEnabled("submitButton", true);
            api.setEnabled("cancelButton", true);
            api.setEnabled("stopButton", false);
            currentAbortController = null;
          });
      },
    });
  };
  editor.ui.registry.addButton("ai", {
    icon: "ai",
    tooltip: "Ask AI",
    shortcut: "meta+J",
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
const insertContent = (data) => {
  tinymce.activeEditor.insertContent(`<div>${data.message}</div>`);
  tinymce.activeEditor.windowManager.close();
};

const displayLoadingIndicator = () => {
  const result = document.getElementById("ai-response-container");
  result.innerHTML = `
    <div id="loading-indicator" style="width:100%; display:flex; flex-direction:column; gap:0.5rem;">
      <div class="loading-bar" style="height:11px; width:100%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424, #4285f4); background-size: 200% 200%; animation: gradientAnimation 3s linear infinite;"></div>
      <div class="loading-bar" style="height:11px; width:100%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424, #4285f4); background-size: 200% 200%; animation: gradientAnimation 3s linear infinite;"></div>
      <div class="loading-bar" style="height:11px; width:100%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424, #4285f4); background-size: 200% 200%; animation: gradientAnimation 3s linear infinite;"></div>
      <div class="loading-bar" style="height:11px; width:70%; border-radius: 0.135rem; background: linear-gradient(to right, #4285f4, #242424, #4285f4); background-size: 200% 200%; animation: gradientAnimation 3s linear infinite;"></div>
      <button
  id="stop-btn"
  onclick="window._abortAI && window._abortAI()"
  style="
    margin-top: 8px;
    align-self: center;
    background: transparent;
    border: 1px solid currentColor;
    border-radius: 4px;
    padding: 5px 14px;
    cursor: pointer;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 6px;
    opacity: 0.85;
  ">
  <span style="color: #e53e3e; font-size: 11px; line-height: 1;">&#9632;</span>
  <span>Stop</span>
</button>
    </div>`;
};
const showStopButton = () => {
  const btn = document.getElementById("stop-btn");
  if (btn) btn.style.display = "inline-block";
};

const hideStopButton = () => {
  const btn = document.getElementById("stop-btn");
  if (btn) btn.style.display = "none";
};
