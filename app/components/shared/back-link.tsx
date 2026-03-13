import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  to: string;
  label: string;
}

export function BackLink({ to, label }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
    >
      <ArrowLeft className="size-4" />
      {label}
    </Link>
  );
}
