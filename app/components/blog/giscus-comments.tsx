import { useEffect, useRef } from "react";

interface GiscusCommentsProps {
  slug: string;
}

/**
 * Giscus comment widget.
 * Configure at https://giscus.app — replace repo/repoId/category/categoryId below.
 */
export function GiscusComments({ slug }: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear previous instance on slug change
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "OWNER/REPO"); // TODO: 실제 GitHub 레포로 변경
    script.setAttribute("data-repo-id", ""); // TODO: giscus.app에서 확인
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", ""); // TODO: giscus.app에서 확인
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "transparent_dark");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");
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
