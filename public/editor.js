//this script is used by the text editor
// //get the editor
// const editor = document.getElementById("editor");

//elements
const buttons = document.querySelectorAll(".editor-button");
const buttonContainer = document.querySelectorAll("#actions");
const pasteTarget = buttonContainer.getAttribute("data-for");
//events

for (const button of buttons) {
  const elementName = button.getAttribute("data-element");
  button.addEventListener("click", () =>
    insertText(`<${elementName}></${elementName}>`, pasteTarget)
  );
}

function insertText(newText, selector) {
  const textarea = document.querySelector(selector);
  textarea.focus();

  let pasted = true;
  try {
    if (!document.execCommand("insertText", false, newText)) {
      pasted = false;
    }
  } catch (e) {
    console.error("error caught:", e);
    pasted = false;
  }

  if (!pasted) {
    console.error("paste unsuccessful, execCommand not supported");
  }
}

// elements.forEach((element) => {
//   element.addEventListener("click", () => {
//     let command = element.dataset["element"];
//     switch (command) {
//       case "bold":
//         document.execCommand("bold", false, null);
//         break;
//       case "italic":
//         document.execCommand("italic", false, null);
//         break;
//       case "justifyRight":
//         document.execCommand("justifyRight", false, null);
//         break;
//       case "underline":
//         document.execCommand("underline", false, null);
//         break;
//       default:
//         console.error("Invalid command:", command);
//     }
//   });
// });
