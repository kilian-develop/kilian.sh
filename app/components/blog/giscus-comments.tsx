import { useEffect, useRef } from "react";
import { giscusConfig } from "~/data/site";

interface GiscusCommentsProps {
  slug: string;
}

/**
 * Giscus comment widget.
 * Configuration is centralized in data/site.ts.
 */
export function GiscusComments({ slug }: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", giscusConfig.repo);
    script.setAttribute("data-repo-id", giscusConfig.repoId);
    script.setAttribute("data-category", giscusConfig.category);
    script.setAttribute("data-category-id", giscusConfig.categoryId);
    script.setAttribute("data-mapping", giscusConfig.mapping);
    script.setAttribute("data-strict", giscusConfig.strict);
    script.setAttribute("data-reactions-enabled", giscusConfig.reactionsEnabled);
    script.setAttribute("data-emit-metadata", giscusConfig.emitMetadata);
    script.setAttribute("data-input-position", giscusConfig.inputPosition);
    script.setAttribute("data-theme", giscusConfig.theme);
    script.setAttribute("data-lang", giscusConfig.lang);
    script.setAttribute("data-loading", giscusConfig.loading);
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current.appendChild(script);
  }, [slug]);

  return (
    <section className="mt-12 pt-10 border-t border-white/[0.06]">
      <h2 className="font-heading text-lg font-semibold text-white/80 mb-6">
        댓글
      </h2>
      <div ref={ref} />
    </section>
  );
}
