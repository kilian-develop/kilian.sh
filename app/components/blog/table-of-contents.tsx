import { useState, useEffect, useMemo } from "react";
import { cn } from "~/lib/utils";

export interface TocHeading {
  id: string;
  text: string;
}

/**
 * Extract h2 headings from raw markdown content.
 * Generates IDs matching rehype-slug output.
 */
export function extractHeadings(content: string): TocHeading[] {
  const regex = /^#{2}\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s가-힣-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ id, text });
  }

  return headings;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc-sidebar hidden xl:block">
      <div className="sticky top-32">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-widest text-[rgba(139,92,246,0.5)] mb-4">
          목차
        </p>
        <ul className="space-y-2 border-l border-white/[0.06]">
          {headings.map(({ id, text }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block pl-4 py-0.5 text-[0.8125rem] leading-snug transition-all duration-200 border-l-2 -ml-px",
                  activeId === id
                    ? "border-[rgba(139,92,246,0.8)] text-white/90 font-medium"
                    : "border-transparent text-white/30 hover:text-white/60 hover:border-white/[0.1]"
                )}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
