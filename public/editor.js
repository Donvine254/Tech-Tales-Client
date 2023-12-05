//this script is used by the text editor
//get the editor
const editor=document.getElementById("editor");
editor.contentDocument.designMode = "on";
//elements
const elements = document.querySelectorAll(".editor-button");

//events
elements.forEach((element) => {
  element.addEventListener("click", () => {
    let command = element.dataset["element"];
    document.execCommand(command, false, null);
  });
});
