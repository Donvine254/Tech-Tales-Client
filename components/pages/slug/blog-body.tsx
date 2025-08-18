import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import CodeBlock from "./code-block";
import Prism from "prismjs";

export function BlogBody({ body }: { body: string }) {
  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (
        node.type === "tag" &&
        node.name === "pre" &&
        node.attribs?.class?.includes("language-")
      ) {
        const language =
          node.attribs.class
            .split(" ")
            .find((cls) => cls.startsWith("language-"))
            ?.replace("language-", "") || "text";

        const codeEl = (node.children as Element[]).find(
          (child) => child.type === "tag" && child.name === "code"
        ) as Element | undefined;

        if (codeEl) {
          // Grab raw HTML (with spans if Prism already ran)
          const codeHtml = codeEl.children //eslint-disable-next-line
            .map((child: any) => child.data || "")
            .join("");
          const grammar = Prism.languages[language] || Prism.languages.text;
          const highlighted = Prism.highlight(codeHtml, grammar, language);
          // Important: keep as innerHTML so JSX doesn’t execute
          return <CodeBlock code={highlighted} language={language} />;
        }
      }
    },
  };

  return (
    <article
      className="leading-8 prose lg:prose-lg prose-headings:mt-8 prose-p:mt-4 md:leading-10 subpixel-antialiased  max-w-none mt-4 prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-50 
      prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:underline-offset-4 prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-gray-200 
      dark:prose-img:border-gray-700 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 
      blog prose-pre:rounded-lg prose-pre:p-4 blog blog-body"
      id="blog-body">
      {body ? parse(body, options) : "Loading..."}
    </article>
  );
}
