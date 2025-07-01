/*eslint-disable */
import Script from "next/script";
import { useEffect } from "react";

// Declare types for global variables used by Monaco
declare global {
    interface Window {
        monaco: any,
        MonacoEnvironment?: {
            getWorkerUrl: (workerId: string, label: string) => string;
        };
    }
}

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
                    getWorkerUrl: function (workerId: string, label: string) {
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