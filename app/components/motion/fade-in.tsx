import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "~/lib/utils";

/**
 * Lightweight IntersectionObserver hook.
 * Triggers once when element enters viewport.
 */
function useInView(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, inView };
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered fade-in animation.
 * Zero-dependency replacement for motion's whileInView.
 */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Container for staggered child animations.
 * Children should use <StaggerItem> to participate.
 */
export function StaggerContainer({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn("stagger-container", inView && "is-visible", className)}
      style={style}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("stagger-item", className)}>
      {children}
    </div>
  );
}
