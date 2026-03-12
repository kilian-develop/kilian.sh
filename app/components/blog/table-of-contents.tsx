import { useState, useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

interface TocHeading {
  id: string;
  text: string;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const headingsFound = useRef(false);

  // Read headings from rendered DOM — retry with MutationObserver if needed
  useEffect(() => {
    headingsFound.current = false;

    function readHeadings(): boolean {
      const prose = document.querySelector(".prose-blog");
      if (!prose) return false;

      const h2s = prose.querySelectorAll("h2[id]");
      if (h2s.length === 0) return false;

      const items: TocHeading[] = Array.from(h2s).map((el) => ({
        id: el.id,
        text: el.textContent?.trim() || "",
      }));
      setHeadings(items);
      headingsFound.current = true;

      // Set initial active to first heading
      if (items.length > 0 && !activeId) {
        setActiveId(items[0].id);
      }
      return true;
    }

    // Try immediately
    if (readHeadings()) return;

    // If not found yet, use MutationObserver to wait for MDX to render
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

    // Safety timeout: stop observing after 5s
    const timer = setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [content]);

  // Scroll-based active heading tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const headingEls = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingEls.length === 0) return;

    function onScroll() {
      const scrollY = window.scrollY;
      const offset = 100; // header height offset

      // Find the last heading that has scrolled past the offset
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

    // Set initial state
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  return (
    <nav className="toc-sidebar hidden xl:block">
      <div className="sticky top-32">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-widest text-[rgba(139,92,246,0.5)] mb-4">
          목차
        </p>
        {headings.length > 0 && (
          <ul className="space-y-2 border-l border-white/[0.06]">
            {headings.map(({ id, text }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "toc-link block pl-4 py-0.5 text-[0.8125rem] leading-snug transition-all duration-200 border-l-2 -ml-px",
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
