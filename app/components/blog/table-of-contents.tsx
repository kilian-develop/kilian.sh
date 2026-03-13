import { useState, useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const headingsFound = useRef(false);

  useEffect(() => {
    headingsFound.current = false;

    function readHeadings(): boolean {
      const prose = document.querySelector(".prose-blog");
      if (!prose) return false;

      const els = prose.querySelectorAll("h1[id], h2[id], h3[id]");
      if (els.length === 0) return false;

      const items: TocHeading[] = Array.from(els).map((el) => ({
        id: el.id,
        text: el.textContent?.trim() || "",
        level: parseInt(el.tagName[1]),
      }));

      // Normalize levels: treat the smallest heading level found as "top"
      const minLevel = Math.min(...items.map((h) => h.level));
      const normalized = items.map((h) => ({
        ...h,
        level: h.level - minLevel, // 0 = top, 1 = sub, 2 = sub-sub
      }));

      setHeadings(normalized);
      headingsFound.current = true;

      if (normalized.length > 0 && !activeId) {
        setActiveId(normalized[0].id);
      }
      return true;
    }

    if (readHeadings()) return;

    const observer = new MutationObserver(() => {
      if (headingsFound.current) {
        observer.disconnect();
        return;
      }
      if (readHeadings()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const timer = setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const headingEls = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingEls.length === 0) return;

    function onScroll() {
      const offset = 100;
      let current = headingEls[0]?.id || "";
      for (const el of headingEls) {
        if (el.getBoundingClientRect().top <= offset) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    }

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  const paddingByLevel = ["pl-4", "pl-7", "pl-10"];
  const sizeByLevel = ["text-[0.8125rem]", "text-[0.75rem]", "text-[0.7rem]"];

  return (
    <nav className="toc-sidebar hidden xl:block">
      <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto toc-scroll">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-widest text-[rgba(139,92,246,0.5)] mb-4">
          목차
        </p>
        {headings.length > 0 && (
          <ul className="space-y-2 border-l border-white/[0.06]">
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "toc-link block py-0.5 leading-snug transition-all duration-200 border-l-2 -ml-px",
                    paddingByLevel[level] ?? "pl-10",
                    sizeByLevel[level] ?? "text-[0.7rem]",
                    activeId === id
                      ? "active border-[#a78bfa] font-medium"
                      : "border-transparent"
                  )}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
