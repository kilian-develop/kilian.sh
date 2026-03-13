import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronUp } from "lucide-react";
import { cn } from "~/lib/utils";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function handleScroll() {
      setShow(window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!mounted) return null;

  return createPortal(
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 flex items-center justify-center size-10 rounded-full",
        "bg-white/[0.03] border border-white/[0.06] backdrop-blur-[10px]",
        "text-white/45 hover:text-accent/80 hover:border-accent/30",
        "transition-all duration-300 ease-out",
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="맨 위로 이동"
    >
      <ChevronUp className="size-4" />
    </button>,
    document.body
  );
}
