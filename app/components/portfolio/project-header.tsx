import { Balancer } from "react-wrap-balancer";
import { BackLink } from "~/components/shared/back-link";

interface ProjectHeaderProps {
  number: string;
  title: string;
  tags: string[];
}

export function ProjectHeader({ number, title, tags }: ProjectHeaderProps) {
  return (
    <section className="pt-24 pb-16 md:pt-36 md:pb-24 px-4">
      <div className="max-w-page mx-auto px-4 md:px-8">
        <div className="animate-fade-up mb-8">
          <BackLink to="/portfolio" label="포트폴리오" />
        </div>

        <div className="animate-fade-up stagger-1 mb-8">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-accent/50 block mb-3">
            Project {number}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-semibold text-white/90 mb-4">
            <Balancer>{title}</Balancer>
          </h1>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.6rem] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/35"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
