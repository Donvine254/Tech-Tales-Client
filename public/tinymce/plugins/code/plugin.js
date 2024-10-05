//code for the plugin
tinymce.PluginManager.add("code", (editor) => {
  const createCustomDialog = () => {
    const dialogHTML = `<dialog id="sourceCode" class="modal" style=" width: 90%; height: 90%; background-color: #fff; border: 1px solid #ccc; border-radius: 8px; padding: 10px; color:#2b2b2b; "> <div style=" display: flex; justify-content: space-between; align-items: center; margin: 0; padding: 0; height: fit-content; "> <p style=" font-size: 1.2rem; font-family: inherit; font-weight: bold; margin: 0; line-height: 1; opacity: 0.8; "> Source Code </p><button id="closeDialog" style=" padding: 0.25rem; cursor: pointer; font-size: 1.5rem; z-index: 50; background-color: transparent; outline: none; border: none; color: currentColor; " title="Close" onmouseenter="this.style.color='#ef4444';" onmouseleave="this.style.color='currentColor';"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 6 6 18" /> <path d="m6 6 12 12" /> </svg> </button> </div><div id="monacoEditor" style="height: 75%; margin: 5px 0; padding: 5px 0;"></div> <div style=" display: flex; flex-wrap: wrap; gap: 10px; align-items: center; max-width: 100%; padding: 10px; justify-content: space-between; box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.2); border-radius:8px; "> <div id="font-size-btns" style=" display: flex; gap: 10px; align-items: center; flex-wrap: wrap; "> <button id="themeBtn" class="dialog-btn" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; background-color: #2e2e2e; color: white; " title="toggle theme"> Dark Theme </button> <button id="fontPlusBtn" class="dialog-btn" title="Increase font size" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; background-color: #e5e7eb; color: #222; "> T+ </button> <button id="fontMinusBtn" class="dialog-btn" title="Decrease font size" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; background-color: #e5e7eb; color: #222; "> T- </button> </div> <div id="format-btns" style=" display: flex; gap: 10px; align-items: center; flex-wrap: wrap;"> <button id="cancelBtn" class="dialog-btn" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 2px; background-color: #e5e7eb; color:#222; " onmouseover="this.style.backgroundColor='#006ce7'; this.style.color='white';" onmouseout="this.style.backgroundColor='#e5e7eb'; this.style.color='#222';" title="close dialog"> Cancel </button> <button id="saveBtn" class="dialog-btn" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; background-color: #006ce7; color: white; " title="save & close"> Save </button> </div> </div> </dialog>`;
    document.body.insertAdjacentHTML("beforeend", dialogHTML);
    //initialize the monaco editor
    let currentTheme = "vs-light";
    const monacoEditor = monaco.editor.create(
      document.getElementById("monacoEditor"),
      {
        value: editor.getContent({ source_code: true }),
        language: "html",
        theme: currentTheme,
        automaticLayout: true,
        lineNumbers: "on",
        readOnly: false,
        minimap: {
          enabled: true,
          side: "right",
          size: "proportional",
        },
        showFoldingControls: "always",
        foldGutter: false,
        wrappingIndent: "same",
        wordWrap: "on",
        folding: true,
        foldingStrategy: "auto",
        formatOnType: true,
        formatOnPaste: true,
        scrollBeyondLastLine: false,
      }
    );
    //get all the necessary elements
    const closeBtn = document.getElementById("closeDialog");
    const cancelBtn = document.getElementById("cancelBtn");
    const fontPlusBtn = document.getElementById("fontPlusBtn");
    const fontMinusBtn = document.getElementById("fontMinusBtn");
    const themeBtn = document.getElementById("themeBtn");
    //function to toggle theme
    const toggleTheme = () => {
      const container = document.getElementById("monacoEditor");
      const dialog = document.getElementById("sourceCode");
      if (currentTheme === "vs-dark") {
        monaco.editor.setTheme("vs-light");
        themeBtn.textContent = "Dark Theme";
        themeBtn.style.backgroundColor = "#2E2E2E";
        themeBtn.style.color = "#fff";
        container.querySelector(".margin").style.backgroundColor = "#f5f5f5";
        container.querySelector(".line-numbers").style.color = "#000";
        dialog.style.backgroundColor = "#fff";
        dialog.style.color = "#2b2b2b";
        dialog.style.borderColor = "#ccc";
        currentTheme = "vs-light";
      } else {
        monaco.editor.setTheme("vs-dark");
        themeBtn.textContent = "Light Theme";
        themeBtn.style.backgroundColor = "#e5e7eb";
        themeBtn.style.color = "#000";
        container.querySelector(".margin").style.backgroundColor = "inherit";
        container.querySelector(".line-numbers").style.color = "#fff";
        dialog.style.backgroundColor = "#2b2b2b";
        dialog.style.color = "#fff";
        dialog.style.borderColor = "#1e1e1e";
        currentTheme = "vs-dark";
      }
    };

    //helper functions
    themeBtn.addEventListener("click", toggleTheme);
    //increase and decrease font sizes
    let fontSize = 14;
    // Event listener to increase font size
    fontPlusBtn.addEventListener("click", () => {
      fontSize += 1; // Increase font size
      monacoEditor.updateOptions({ fontSize: fontSize });
    });

    // Event listener to decrease font size
    fontMinusBtn.addEventListener("click", () => {
      if (fontSize > 10) {
        fontSize -= 1;
        monacoEditor.updateOptions({ fontSize: fontSize });
      }
    });
    //save code
    document.getElementById("saveBtn").addEventListener("click", () => {
      editor.setContent(monacoEditor.getValue());
      monacoEditor.setValue("");
      closeCodeSampleDialog();
    });

    //close dialog
    function closeCodeSampleDialog() {
      const dialog = document.getElementById("sourceCode");
      dialog.close();
      dialog.remove();
    }
    closeBtn.addEventListener("click", () => {
      closeCodeSampleDialog();
    });
    cancelBtn.addEventListener("click", () => {
      closeCodeSampleDialog();
    });
  };
  const showCustomDialog = () => {
    createCustomDialog();
    document.getElementById("sourceCode").showModal();
  };
  //icons
  editor.ui.registry.addButton("code", {
    icon: "sourcecode",
    tooltip: "Source code",
    shortcut: "meta+Space",
    onAction: showCustomDialog,
  });
  editor.ui.registry.addMenuItem("code", {
    text: "Source Code",
    icon: "sourcecode",
    onAction: showCustomDialog,
  });
  editor.on("keydown", function (e) {
    if (e.key === " " && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.getElementById("sourceCode").showModal();
    }
  });
});
