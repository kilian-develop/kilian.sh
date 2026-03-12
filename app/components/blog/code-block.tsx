import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  rawText?: string;
  title?: string;
}

const LANG_LABELS: Record<string, string> = {
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  java: "Java",
  kt: "Kotlin",
  py: "Python",
  rb: "Ruby",
  go: "Go",
  rs: "Rust",
  sql: "SQL",
  sh: "Shell",
  bash: "Bash",
  zsh: "Zsh",
  yml: "YAML",
  yaml: "YAML",
  json: "JSON",
  xml: "XML",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  md: "Markdown",
  mdx: "MDX",
  gradle: "Gradle",
  groovy: "Groovy",
  dockerfile: "Dockerfile",
  toml: "TOML",
  graphql: "GraphQL",
};

function getLangLabel(lang: string): string {
  if (!lang) return "";
  const lower = lang.toLowerCase();
  return LANG_LABELS[lower] || lang.toUpperCase();
}

export function CodeBlock({
  children,
  language,
  rawText,
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const label = title || getLangLabel(language || "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText((rawText || "").trim());
      setCopied(true);
      toast.success("클립보드에 복사되었습니다");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("복사에 실패했습니다");
    }
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        {label ? (
          <span className="code-block-lang">
            <span className="code-block-lang-dot" />
            {label}
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          className="code-block-copy"
          onClick={handleCopy}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {children}
    </div>
  );
}
