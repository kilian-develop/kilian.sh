import { cn } from "~/lib/utils";

/* ─── Shared Style Tokens ─── */
const nodeBase =
  "rounded-lg border text-[0.65rem] md:text-xs px-2.5 py-1.5 md:px-3 md:py-2 text-center leading-snug font-mono whitespace-nowrap";

export const nodeDefault = `${nodeBase} bg-white/[0.04] border-white/[0.08] text-white/60`;
export const nodePurple = `${nodeBase} bg-[rgba(139,92,246,0.08)] border-[rgba(139,92,246,0.2)] text-[rgba(167,139,250,0.8)]`;
export const nodeBlue = `${nodeBase} bg-[rgba(96,165,250,0.06)] border-[rgba(96,165,250,0.15)] text-[rgba(96,165,250,0.75)]`;
export const nodeTeal = `${nodeBase} bg-[rgba(94,234,212,0.06)] border-[rgba(94,234,212,0.15)] text-[rgba(94,234,212,0.7)]`;
export const nodeRed = `${nodeBase} bg-[rgba(248,113,113,0.06)] border-[rgba(248,113,113,0.15)] text-[rgba(248,113,113,0.7)]`;
export const nodeGreen = `${nodeBase} bg-[rgba(74,222,128,0.06)] border-[rgba(74,222,128,0.15)] text-[rgba(74,222,128,0.7)]`;
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
            className="rounded-lg border border-[rgba(139,92,246,0.1)] bg-[rgba(139,92,246,0.03)] p-4"
          >
            <p className="font-heading text-lg font-semibold text-[rgba(167,139,250,0.85)] mb-1">
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
export const problemDot = "size-1.5 rounded-full bg-[rgba(248,113,113,0.4)] mt-1.5 flex-shrink-0";
export const analysisDot = "size-1.5 rounded-full bg-[rgba(139,92,246,0.4)] mt-1.5 flex-shrink-0";
export const solutionDot = "size-1.5 rounded-full bg-[rgba(94,234,212,0.4)] mt-1.5 flex-shrink-0";
