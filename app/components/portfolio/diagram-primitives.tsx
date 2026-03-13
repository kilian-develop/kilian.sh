import { cn } from "~/lib/utils";

/* ─── Shared Style Tokens ─── */
const nodeBase =
  "rounded-lg border text-[0.65rem] md:text-xs px-2.5 py-1.5 md:px-3 md:py-2 text-center leading-snug font-mono whitespace-nowrap";

export const nodeDefault = `${nodeBase} bg-white/[0.04] border-white/[0.08] text-white/60`;
export const nodePurple = `${nodeBase} bg-accent/[0.08] border-accent/20 text-accent-light/80`;
export const nodeBlue = `${nodeBase} bg-accent-blue/[0.06] border-accent-blue/15 text-accent-blue/[0.75]`;
export const nodeTeal = `${nodeBase} bg-accent-teal/[0.06] border-accent-teal/15 text-accent-teal/70`;
export const nodeRed = `${nodeBase} bg-accent-red/[0.06] border-accent-red/15 text-accent-red/70`;
export const nodeGreen = `${nodeBase} bg-accent-green/[0.06] border-accent-green/15 text-accent-green/70`;
export const arrowText = "text-[0.6rem] text-white/30 font-mono";
export const sectionLabel =
  "font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/30 mb-3";

/* ─── Arrow ─── */
export function Arrow({ horizontal }: { horizontal?: boolean }) {
  if (horizontal) {
    return (
      <div className="flex items-center text-white/15">
        <div className="w-4 h-px bg-white/15" />
        <svg width="6" height="8" viewBox="0 0 6 8" fill="currentColor" className="flex-shrink-0">
          <path d="M0 0L6 4L0 8Z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center text-white/15">
      <div className="w-px h-4 bg-white/15" />
      <svg width="8" height="6" viewBox="0 0 8 6" fill="currentColor" className="flex-shrink-0">
        <path d="M0 0L4 6L8 0Z" />
      </svg>
    </div>
  );
}

/* ─── Impact Card ─── */
export function ImpactCard({ items }: { items: { metric: string; detail: string }[] }) {
  return (
    <div className="glass-card p-5 md:p-6">
      <p className={sectionLabel}>Impact</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.metric}
            className="rounded-lg border border-accent/10 bg-accent/[0.03] p-4"
          >
            <p className="font-heading text-lg font-semibold text-accent-light/[0.85] mb-1">
              {item.metric}
            </p>
            <p className="text-[0.7rem] text-white/45">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Bullet list helpers ─── */
export const problemDot = "size-1.5 rounded-full bg-accent-red/40 mt-1.5 flex-shrink-0";
export const analysisDot = "size-1.5 rounded-full bg-accent/40 mt-1.5 flex-shrink-0";
export const solutionDot = "size-1.5 rounded-full bg-accent-teal/40 mt-1.5 flex-shrink-0";
