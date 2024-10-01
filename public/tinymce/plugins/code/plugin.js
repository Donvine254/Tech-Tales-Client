tinymce.PluginManager.add("code", (editor) => {
  // Function to create and show the custom dialog
  const createCustomDialog = () => {
    // Create the dialog element
    const customDialog = document.createElement("dialog");
    customDialog.id = "customDialog";
    customDialog.style.width = "100%";
    customDialog.style.height = "80%";
    customDialog.style.backgroundColor = "#fff";
    customDialog.style.border = "1px solid #ccc";
    customDialog.style.zIndex = "10000";
    customDialog.style.borderRadius = "8px";
    customDialog.style.padding = "5px 10px";
    customDialog.style.fontFamily = "Segoe UI";
    //create header
    const headerDiv = document.createElement("div");
    headerDiv.style.display = "flex";
    headerDiv.style.justifyContent = "space-between";
    headerDiv.style.alignItems = "center";
    //create title paragraph
    const titleParagraph = document.createElement("p");
    titleParagraph.style.fontSize = "1.5rem";
    titleParagraph.style.marginBottom = "5px";
    titleParagraph.textContent = "Source Code";
    headerDiv.appendChild(titleParagraph);
    customDialog.appendChild(headerDiv);
    //create close button
    const closeButton = document.createElement("button");
    closeButton.style.padding = "0.25rem";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "1.5rem";
    closeButton.style.zIndex = "50";
    closeButton.style.backgroundColor = "transparent";
    closeButton.style.outline = "none";
    closeButton.style.border = "none";
    closeButton.textContent = "x";
    closeButton.setAttribute("title", "Close");

    closeButton.onmouseover = function () {
      closeButton.style.color = "#ef4444";
    };

    closeButton.onmouseout = function () {
      closeButton.style.fill = "none";
      closeButton.style.backgroundColor = "transparent";
      closeButton.style.color = "currentColor";
    };
    closeButton.onclick = () => {
      closeCustomDialog();
    };
    headerDiv.appendChild(closeButton);
    const editorDiv = document.createElement("div");
    editorDiv.id = "editor";
    editorDiv.style.width = "99%";
    editorDiv.style.height = "400px";
    editorDiv.style.maxHeight = "75%";
    editorDiv.style.padding = "5px";
    editorDiv.style.scrollBehavior = "smooth";
    editorDiv.style.borderRadius = "5px";
    editorDiv.style.border = "2px solid #006ce7";
    editorDiv.style.marginBottom = "10px";
    // Create buttons
    const createButton = (id, text) => {
      const button = document.createElement("button");
      button.id = id;
      button.textContent = text;
      button.className = "dialog-btn";
      button.style.marginLeft = "8px";
      button.style.borderRadius = "5px";
      button.style.padding = "5px 10px";
      button.style.border = "none";
      button.style.marginTop = "5px";
      button.style.cursor = "pointer";
      return button;
    };
    const formatBtn = createButton("format", "Format Code");
    const themeBtn = createButton("theme", "Dark/Light Theme");
    const saveBtn = createButton("saveCode", "Save");
    const closeBtn = createButton("closeDialog", "Close");
    // Add event listeners to buttons
    themeBtn.addEventListener("click", () => {
      const aceEditor = ace.edit("editor");
      const currentTheme = aceEditor.getTheme();
      aceEditor.setTheme(
        currentTheme === "ace/theme/monokai"
          ? "ace/theme/tomorrow"
          : "ace/theme/monokai"
      );
    });
    formatBtn.addEventListener("click", () => {
      ace.config.loadModule("ace/ext/beautify", function (beautify) {
        beautify.beautify(ace.edit("editor").session);
      });
    });
    saveBtn.addEventListener("click", () => {
      const aceEditor = ace.edit("editor");
      editor.setContent(aceEditor.getValue());
      closeCustomDialog();
    });
    closeBtn.addEventListener("click", closeCustomDialog);
    customDialog.appendChild(editorDiv);
    customDialog.appendChild(formatBtn);
    customDialog.appendChild(themeBtn);
    customDialog.appendChild(saveBtn);
    customDialog.appendChild(closeBtn);
    document.body.appendChild(customDialog);
  };
  const showCustomDialog = () => {
    const aceEditor = ace.edit("editor");
    document.body.style.overflow = "hidden";
    aceEditor.session.setMode("ace/mode/html");
    aceEditor.setOptions({
      wrap: true,
      indentedSoftWrap: false,
      selectionStyle: "text",
      enableAutoIndent: true,
      behavioursEnabled: false,
      showLineNumbers: true,
      showPrintMargin: false,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      autoScrollEditorIntoView: true,
      foldStyle: "markbegin",
      showFoldWidgets: true,
      fontSize: "14px",
      theme: "ace/theme/tomorrow",
    });
    aceEditor.setValue(editor.getContent({ source_code: true }));
    document.getElementById("customDialog").showModal();
  };
  const closeCustomDialog = () => {
    document.getElementById("customDialog").close();
    document.body.style.overflow = "";
  };
  createCustomDialog();
  editor.ui.registry.addButton("code", {
    icon: "sourcecode",
    tooltip: "Source code",
    onAction: showCustomDialog,
  });
  editor.ui.registry.addMenuItem("code", {
    text: "Source Code",
    icon: "sourcecode",
    onAction: showCustomDialog,
  });
});
