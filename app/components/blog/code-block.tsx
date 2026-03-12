import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  rawText?: string;
  title?: string;
}

export function CodeBlock({
  children,
  language,
  rawText,
  title,
}: CodeBlockProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText((rawText || "").trim());
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-lang">{title || language || ""}</span>
        <button
          type="button"
          className="code-block-copy"
          onClick={handleCopy}
        >
          <Copy size={14} />
          Copy
        </button>
      </div>
      {children}
    </div>
  );
}
