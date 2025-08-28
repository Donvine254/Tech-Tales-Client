import { useEffect, useState } from "react";

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { codeSampleLanguages } from "@/constants";
function getLanguageDisplayName(language: string) {
  const found = codeSampleLanguages.find((lang) => lang.value === language);
  return found ? found.text : language;
}
export default function CodeBlock({
  code,
  language,
  highlightedCode,
}: {
  code: string;
  language: string;
  highlightedCode: string;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setHasMounted(true);

    return () => {
      setHasMounted(false);
    };
  }, []);
  if (!hasMounted) {
    return null;
  }
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      className={cn(
        "relative rounded-lg p-0 border bg-[#272822] dark:bg-gray-900 overflow-hidden"
      )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/85 dark:bg-muted/50">
        <span className="text-sm font-medium text-muted-foreground">
          {getLanguageDisplayName(language)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          title="copy code"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 hover:bg-muted">
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Code */}
      <pre className={`language-${language} max-h-[450px] overflow-y-auto  `}>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}
