import React from "react";
import { Link } from "react-router";
import { CodeBlock } from "./code-block";

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractTextContent).join("");
  if (React.isValidElement(node) && node.props) {
    return extractTextContent(
      (node.props as { children?: React.ReactNode }).children
    );
  }
  return "";
}

export const mdxComponents: Record<string, React.ComponentType<any>> = {
  pre: (props: any) => {
    const { children, className, ...rest } = props;
    const isShiki = className?.includes("shiki");

    if (isShiki) {
      // Shiki output: <pre class="shiki ..."><code>...</code></pre>
      // Extract language from the code element's data-language attribute
      const codeEl = React.isValidElement(children) ? children : null;
      const lang =
        (codeEl?.props as any)?.["data-language"] ||
        (codeEl?.props as any)?.className?.match(/language-(\w+)/)?.[1] ||
        "";
      const rawText = extractTextContent(children);

      return (
        <CodeBlock language={lang} rawText={rawText}>
          <pre className={className} {...rest}>
            {children}
          </pre>
        </CodeBlock>
      );
    }

    // Non-Shiki: legacy fallback for code blocks with language-* class on <code>
    if (
      React.isValidElement(children) &&
      (children.type === "code" || (children.props as any)?.className)
    ) {
      const codeProps = children.props as {
        className?: string;
        children?: React.ReactNode;
      };
      if (codeProps.className?.startsWith("language-")) {
        const lang = codeProps.className.replace(/language-/, "");
        const rawText = extractTextContent(codeProps.children);
        return (
          <CodeBlock language={lang} rawText={rawText}>
            <pre className={className} {...rest}>
              {children}
            </pre>
          </CodeBlock>
        );
      }
    }

    return (
      <pre className={className} {...rest}>
        {children}
      </pre>
    );
  },

  a: ({
    href,
    children,
    ...props
  }: {
    href?: string;
    children: React.ReactNode;
  }) => {
    if (href?.startsWith("/")) {
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};
