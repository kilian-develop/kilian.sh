import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AdjacentPost {
  slug: string;
  title: string;
}

interface PostNavigationProps {
  prev: AdjacentPost | null;
  next: AdjacentPost | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
      {prev ? (
        <Link
          to={`/blog/${prev.slug}`}
          className="group flex flex-col gap-2 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-[10px] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-200"
        >
          <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-white/30 uppercase tracking-wide">
            <ArrowLeft className="size-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
            이전 글
          </span>
          <span className="font-heading text-sm leading-snug text-white/75 group-hover:text-accent/90 transition-colors line-clamp-2">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={`/blog/${next.slug}`}
          className="group flex flex-col items-end gap-2 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-[10px] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-200 text-right"
        >
          <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-white/30 uppercase tracking-wide">
            다음 글
            <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
          <span className="font-heading text-sm leading-snug text-white/75 group-hover:text-accent/90 transition-colors line-clamp-2">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
