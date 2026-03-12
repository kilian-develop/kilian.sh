import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && barRef.current) {
        const progress = Math.min(scrollTop / docHeight, 1);
        barRef.current.style.transform = `scaleX(${progress})`;
        barRef.current.style.opacity = progress > 0 ? "1" : "0";
      }
    }

    function handleScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div ref={barRef} className="reading-progress" />,
    document.body
  );
}
