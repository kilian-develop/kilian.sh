import { Link } from "react-router";
import { Github, Mail, Linkedin, ArrowRight } from "lucide-react";
import { siteConfig } from "~/data/site";

const linkClass =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] text-sm text-white/55 hover:text-white/85 hover:border-accent/30 hover:bg-accent/[0.06] transition-all";

interface ContactCTAProps {
  title?: string;
  description?: string;
  centered?: boolean;
  showLinkedin?: boolean;
  showBlogLink?: boolean;
}

export function ContactCTA({
  title = "함께 작업하고 싶다면",
  description = "프로젝트에 대한 이야기나, 기술적인 고민을 나누고 싶다면 편하게 연락해주세요.",
  centered = false,
  showLinkedin = false,
  showBlogLink = false,
}: ContactCTAProps) {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className={`max-w-page mx-auto px-4 md:px-8 ${centered ? "text-center" : ""}`}>
        <div className="animate-fade-up mb-10">
          {!centered && (
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-accent/50 block mb-3">
              Contact
            </span>
          )}
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white/90 mb-4">
            {title}
          </h2>
          <p className={`text-white/45 leading-relaxed ${centered ? "max-w-md mx-auto" : "max-w-lg"} mb-8`}>
            {description}
          </p>
        </div>

        <div className={`animate-fade-up stagger-2 flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Github className="size-4" />
            GitHub
          </a>
          <a href={`mailto:${siteConfig.email}`} className={linkClass}>
            <Mail className="size-4" />
            Email
          </a>
          {showLinkedin && (
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Linkedin className="size-4" />
              LinkedIn
            </a>
          )}
        </div>

        {showBlogLink && (
          <div className="animate-fade-up stagger-3 mt-12 pt-8 border-t border-white/[0.06]">
            <p className="text-sm text-white/25 mb-4">블로그 글도 함께 읽어보세요</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/85 transition-colors"
            >
              모든 글 보기
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
