"use client";
import { useEffect } from "react";
import Prism from "prismjs";
// import "prismjs/themes/prism.css";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-php";
import "prismjs/components/prism-haml";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-go";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";

export default function PrismLoader() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <div className="hidden"></div>;
}
