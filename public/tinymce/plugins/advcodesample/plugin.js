const languages = [
  { text: "HTML/XML", value: "html" },
  { text: "CSS", value: "css" },
  { text: "JavaScript", value: "javascript" },
  { text: "TypeScript", value: "typescript" },
  { text: "JSON", value: "json" },
  { text: "PHP", value: "php" },
  { text: "Python", value: "python" },
  { text: "Ruby", value: "ruby" },
  { text: "Rust", value: "rust" },
  { text: "Markdown", value: "markdown" },
  { text: "C#", value: "csharp" },
  { text: "C++", value: "cpp" },
  { text: "C", value: "c" },
  { text: "Java", value: "java" },
  { text: "Go", value: "go" },
  { text: "Swift", value: "swift" },
  { text: "SQL", value: "sql" },
  { text: "Bash", value: "shell" },
  { text: "YAML", value: "yaml" },
  { text: "PowerShell", value: "powershell" },
];
//code for the plugin
tinymce.PluginManager.add("advcodesample", (editor) => {
  const createCustomDialog = () => {
    const dialogHTML = `<dialog id="advcodesample" class="modal" style=" width: 90%; height: 90%; background-color: #fff; border: 1px solid #ccc; border-radius: 8px; padding: 10px; color:#2b2b2b; "> <div style=" display: flex; justify-content: space-between; align-items: center; margin: 0; padding: 0; height: fit-content; "> <p style=" font-size: 1.2rem; font-family: inherit; font-weight: bold; margin: 0; line-height: 1; opacity: 0.8; "> Insert Code Sample </p><button id="closeDialog" style=" padding: 0.25rem; cursor: pointer; font-size: 1.5rem; z-index: 50; background-color: transparent; outline: none; border: none; color: currentColor; " title="Close" onmouseenter="this.style.color='#ef4444';" onmouseleave="this.style.color='currentColor';"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 6 6 18" /> <path d="m6 6 12 12" /> </svg> </button> </div><div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; max-width: 100%; padding: 10px; box-shadow: 0 4px 2px -2px rgba(34,47,62,.1),0 8px 8px -4px rgba(34,47,62,.07);" id="editor-header"><div id="editorBtns" style="display:flex; gap:10px; align-items:center;"> <button id="undoBtn" style="background-color:transparent;border:none;" disabled= true><svg viewBox="0 0 21 21" fill="currentColor" height="24" width="24"><g fill="currentColor"><path d="M9 10h6c1.654 0 3 1.346 3 3s-1.346 3-3 3h-3v2h3c2.757 0 5-2.243 5-5s-2.243-5-5-5H9V5L4 9l5 4v-3z" /></g> </svg></button><button id="redoBtn" style="background-color:transparent;border:none;" disabled= true><svg viewBox="0 0 21 21" fill="currentColor" height="24" width="24"><g fill="currentColor"> <path d="M9 18h3v-2H9c-1.654 0-3-1.346-3-3s1.346-3 3-3h6v3l5-4-5-4v3H9c-2.757 0-5 2.243-5 5s2.243 5 5 5z" /></g></svg></button> </div> <div id="select-input"><label for="language" style="font-weight: 400; ">Language:</label> <select id="language" style=" max-width: 50%; min-width:fit-content; font: 14px; padding:0 4px; border:none; outline:none; border-bottom:1px solid #ccc; background-color:transparent; color:currentColor;" onfocus="this.style.borderBottom='1px solid #006ce7';" onblur="this.style.borderBottom='1px solid #ccc';"> ${languages
      .map((lang) => `<option value="${lang.value}">${lang.text}</option>`)
      .join(
        ""
      )} </select></div> </div> <div id="editorContainer" style="height: 65%; margin: 5px 0; padding: 5px 0;"></div> <div style=" display: flex; flex-wrap: wrap; gap: 10px; align-items: center; max-width: 100%; padding: 10px; justify-content: space-between; box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.2); border-radius:8px; "> <div id="font-size-btns" style=" display: flex; gap: 10px; align-items: center; flex-wrap: wrap; "> <button id="themeBtn" class="dialog-btn" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; background-color: #2e2e2e; color: white; " title="toggle theme"> Dark Theme </button> <button id="fontPlusBtn" class="dialog-btn" title="Increase font size" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; background-color: #e5e7eb; color: #222; "> T+ </button> <button id="fontMinusBtn" class="dialog-btn" title="Decrease font size" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; background-color: #e5e7eb; color: #222; "> T- </button> </div> <div id="format-btns" style=" display: flex; gap: 10px; align-items: center; flex-wrap: wrap;"> <button id="cancelBtn" class="dialog-btn" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 2px; background-color: #e5e7eb; color: #222;" onmouseover="this.style.backgroundColor='#006ce7'; this.style.color='white';" onmouseout="this.style.backgroundColor='#e5e7eb'; this.style.color='#222';" title="close"> Cancel </button> <button id="saveBtn" class="dialog-btn" style=" border-radius: 5px; padding: 8px 10px; border: none; cursor: pointer; background-color: #006ce7; color: white;" title="save code"> Save </button> </div> </div> </dialog>`;
    document.body.insertAdjacentHTML("beforeend", dialogHTML);
    //initialize the monaco editor
    let currentTheme = "vs-light";
    const monacoEditor = monaco.editor.create(
      document.getElementById("editorContainer"),
      {
        value: null,
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
    const languageSelect = document.getElementById("language");
    const themeBtn = document.getElementById("themeBtn");
    const undoBtn = document.getElementById("undoBtn");
    const redoBtn = document.getElementById("redoBtn");
    //function to toggle theme
    const toggleTheme = () => {
      const container = document.getElementById("editorContainer");
      const dialog = document.getElementById("advcodesample");
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
        languageSelect.style.backgroundColor = "#fff";
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
        languageSelect.style.backgroundColor = "#2b2b2b";
        currentTheme = "vs-dark";
      }
    };

    //helper functions
    //change themes
    themeBtn.addEventListener("click", toggleTheme);
    //change languages
    languageSelect.addEventListener("change", (event) => {
      const selectedLanguage = event.target.value;
      monaco.editor.setModelLanguage(monacoEditor.getModel(), selectedLanguage);
      monacoEditor.setValue("");
    });
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

    // Add click event listener for undo button
    // undoBtn.addEventListener("click", () => {
    //   const event = new KeyboardEvent("keydown", {
    //     key: "z",
    //     code: "90",
    //     metaKey: true,
    //     bubbles: true,
    //   });
    //   document.dispatchEvent(event);
    //   console.log(event);
    // });
    // redoBtn.addEventListener("click", () => {
    //   // Simulate Meta+Y key press for redo
    //   const event = new KeyboardEvent("keydown", {
    //     key: "y",
    //     code: "89",
    //     metaKey: true,
    //     bubbles: true,
    //   });
    //   document.dispatchEvent(event);
    //   console.log(event);
    // });
    //save code

    function escapeHTML(html) {
      const text = document.createElement("textarea");
      text.id = "escape-textarea";
      text.textContent = html;
      return text.innerHTML;
    }
    document.getElementById("saveBtn").addEventListener("click", () => {
      const codeContent = monacoEditor.getValue().trim();
      if (!codeContent) {
        closeCodeSampleDialog();
        return;
      }
      const language = languageSelect.value;
      editor.insertContent(
        `<pre class="language-${language}"><code>${escapeHTML(
          codeContent
        )}</code></pre>`
      );
      monacoEditor.setValue("");
      closeCodeSampleDialog();
    });
    //close dialog
    function closeCodeSampleDialog() {
      const dialog = document.getElementById("advcodesample");
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
    document.getElementById("advcodesample").showModal();
  };
  //icons
  editor.ui.registry.addIcon(
    "advcode-sample",
    `<svg viewBox="0 0 1024 1024" fill="currentColor" height="24" width="24"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM513.1 518.1l-192 161c-5.2 4.4-13.1.7-13.1-6.1v-62.7c0-2.3 1.1-4.6 2.9-6.1L420.7 512l-109.8-92.2a7.63 7.63 0 01-2.9-6.1V351c0-6.8 7.9-10.5 13.1-6.1l192 160.9c3.9 3.2 3.9 9.1 0 12.3zM716 673c0 4.4-3.4 8-7.5 8h-185c-4.1 0-7.5-3.6-7.5-8v-48c0-4.4 3.4-8 7.5-8h185c4.1 0 7.5 3.6 7.5 8v48z" />
    </svg>`
  );
  editor.ui.registry.addButton("advcodesample", {
    icon: "advcode-sample",
    tooltip: "Insert/Edit Code Sample",
    shortcut: "meta+Alt+C",
    onAction: showCustomDialog,
  });
  editor.ui.registry.addMenuItem("advcodesample", {
    text: "Insert/Edit Code Sample",
    icon: "code-sample",
    onAction: showCustomDialog,
  });
});
