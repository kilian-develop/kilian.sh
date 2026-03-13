import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn, staggerClass } from "~/lib/utils";
import { siteConfig, buildMeta } from "~/data/site";
import { ContactCTA } from "~/components/shared/contact-cta";

export function meta() {
  return buildMeta("포트폴리오", "백엔드 개발자 박명규의 프로젝트 포트폴리오입니다.", "/portfolio");
}

const projects = [
  {
    number: "#01",
    title: "문서 전처리 서비스",
    description:
      "카피킬러 표절검사 서비스의 문서 전처리 파이프라인을 이벤트 기반 아키텍처로 재설계하여, 평균 처리 시간 83% 단축 및 주평균 장애 93% 감소를 달성했습니다.",
    tags: ["Spring Boot", "Kafka", "Spring Batch", "MariaDB", "MongoDB"],
    to: "/portfolio/preprocessing",
    highlights: ["처리 시간 83% 단축", "장애 93% 감소"],
  },
  {
    number: "#02",
    title: "문서 전처리 서비스 마이그레이션",
    description:
      "MariaDB 2억건+ 데이터를 MongoDB로 무중단 마이그레이션. Kafka Connect CDC, Spring Batch, RxJava 병렬 조회, GridFS Skip 전략을 적용했습니다.",
    tags: ["Spring Batch", "Kafka Connect", "RxJava", "MongoDB", "GridFS"],
    to: "/portfolio/migration",
    highlights: ["2억건+ 무중단 이관", "레거시 시스템 제거"],
  },
] as const;

export default function PortfolioIndex() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="animate-fade-up mb-10">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[rgba(139,92,246,0.5)]">
              Portfolio
            </span>
          </div>

          <h1 className="animate-fade-up stagger-1 font-heading text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white/90 mb-4">
            프로젝트
          </h1>

          <p className="animate-fade-up stagger-2 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            확장 가능한 서비스 개발을 통해 기업가치를 창출한 경력을 담았습니다.
            <br />
            구현보다 아키텍처 판단의 근거와 문제 해결 과정을 중심으로 정리했습니다.
          </p>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== PROJECTS ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="space-y-6">
            {projects.map((project, i) => (
              <Link
                key={project.title}
                to={project.to}
                className={cn(
                  "animate-fade-up group relative block",
                  staggerClass(i)
                )}
              >
                {/* Gradient border glow on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[rgba(139,92,246,0.15)] via-[rgba(59,130,246,0.1)] to-[rgba(94,234,212,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-[10px] p-6 md:p-8 transition-all duration-300 group-hover:border-white/[0.1] group-hover:bg-white/[0.04] group-active:scale-[0.99]">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      {/* Number + Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[0.65rem] text-[rgba(139,92,246,0.5)]">
                          {project.number}
                        </span>
                        <h2 className="font-heading text-xl md:text-2xl font-semibold text-white/90">
                          {project.title}
                        </h2>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-white/50 leading-relaxed mb-4 max-w-2xl break-keep">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[0.6rem] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/35"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-3">
                        {project.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-[0.7rem] font-mono text-[rgba(167,139,250,0.7)]"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 flex items-center self-center">
                      <ArrowRight className="size-5 text-white/20 group-hover:text-[rgba(139,92,246,0.6)] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Orb divider */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="section-orb" />
      </div>

      {/* ===== CONTACT CTA ===== */}
      <ContactCTA centered />
    </div>
  );
}
