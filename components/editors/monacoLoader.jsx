import Script from "next/script";
import { useEffect } from "react";
const MonacoLoader = () => {
  useEffect(() => {
    // Inject the Monaco loader script dynamically after component mounts
    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = `
          var require = {
            paths: {
              vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs",
            }
          };
        `;
    document.head.appendChild(script);

    // Wait until Monaco is loaded
    script.onload = () => {
      if (window.monaco) {
        window.MonacoEnvironment = {
          getWorkerUrl: function (workerId, label) {
            return (
              `data:text/javascript;charset=utf-8,` +
              encodeURIComponent(`
                  self.MonacoEnvironment = {
                    baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/'
                  };
                  importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/base/worker/workerMain.js');
                `)
            );
          },
        };
        monaco.languages.registerCompletionItemProvider("html", {
          triggerCharacters: [">"],
          provideCompletionItems: (model, position) => {
            const codePre = model.getValueInRange({
              startLineNumber: position.lineNumber,
              startColumn: 1,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            });
            const tag = codePre.match(/.*<(\w+)>$/)?.[1];
             const isSelfClosing = (tag) =>
          [
            "area",
            "base",
            "br",
            "col",
            "command",
            "embed",
            "hr",
            "img",
            "input",
            "keygen",
            "link",
            "meta",
            "param",
            "source",
            "track",
            "wbr",
            "circle",
            "ellipse",
            "line",
            "path",
            "polygon",
            "polyline",
            "rect",
            "stop",
            "use",
          ].includes(tag);
            if (!tag || isSelfClosing(tag)) {
              return;
            }
            const word = model.getWordUntilPosition(position);
            return {
              suggestions: [
                {
                  label: `</${tag}>`,
                  kind: monaco.languages.CompletionItemKind.EnumMember,
                  insertText: `$1</${tag}>`,
                  insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                  range: {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                  },
                },
              ],
            };
          },
        });
      }
    };

    // Cleanup if the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/loader.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/editor/editor.main.nls.js"></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/editor/editor.main.js"
        async></Script>
      <Script
        type="text/javascript"
        src="https://unpkg.com/monaco-themes/dist/monaco-themes.js"
        async></Script>
    </>
  );
};

export default MonacoLoader;
