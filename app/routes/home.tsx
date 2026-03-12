import { Link } from "react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Route } from "./+types/home";
import { getAllPosts, type PostMeta } from "~/lib/posts.server";
import { formatDateFull, formatDateShort } from "~/lib/format";
import { siteConfig, getTagColor, techTags } from "~/data/site";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "~/components/motion/fade-in";

export async function loader(_: Route.LoaderArgs) {
  const allPosts = await getAllPosts();
  return { recentPosts: allPosts.slice(0, 5) };
}

export function meta(_: Route.MetaArgs) {
  return [
    { title: `${siteConfig.title} — 개발자의 기록` },
    { name: "description", content: siteConfig.description },
    { property: "og:title", content: `${siteConfig.title} — 개발자의 기록` },
    { property: "og:description", content: siteConfig.description },
    { property: "og:type", content: "website" },
    { tagName: "link", rel: "canonical", href: siteConfig.url },
  ];
}

/* ─── Section Header ─── */

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <FadeIn className="mb-12">
      <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[rgba(139,92,246,0.5)] block mb-2">
        {label}
      </span>
      <h2 className="font-heading font-semibold text-2xl text-white/90">
        {title}
      </h2>
    </FadeIn>
  );
}

/* ─── Featured Post Card ─── */

function FeaturedPostCard({ post }: { post: PostMeta }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="glass-card p-6 md:p-10">
        <div className="flex items-center gap-2 mb-5">
          <span className="inline-block size-2 rounded-full bg-[#8b5cf6] animate-cursor" />
          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[rgba(139,92,246,0.5)]">
            Latest
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-6 md:gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-white/25">
                {formatDateFull(post.date)}
              </span>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center px-2 py-0.5 text-[0.65rem] font-mono rounded-full border ${getTagColor(i)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h3 className="font-heading font-semibold text-xl md:text-2xl leading-snug text-white/[0.88] group-hover:text-white/[0.98] transition-colors duration-200 mb-3">
              {post.title}
            </h3>

            <p className="text-sm text-white/35 leading-relaxed line-clamp-3 max-w-lg">
              {post.excerpt}
            </p>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center h-full">
            <div className="relative w-full aspect-square max-w-[200px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(139,92,246,0.08)] via-[rgba(96,165,250,0.06)] to-[rgba(94,234,212,0.04)] border border-white/[0.04]" />
              <div className="absolute inset-4 rounded-xl border border-white/[0.03] flex items-center justify-center">
                <BookOpen className="size-8 text-white/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[0.65rem] text-white/20">
            {post.readingTime}
          </span>
          <div className="flex items-center gap-1.5 text-sm font-medium text-[rgba(167,139,250,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            읽어보기
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Post Card ─── */

function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="glass-card h-full p-5 md:p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-white/25">
            {formatDateShort(post.date)}
          </span>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2 py-0.5 text-[0.6rem] font-mono rounded-full border ${getTagColor(i)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <h3 className="font-heading font-semibold text-[0.95rem] leading-snug text-white/[0.88] group-hover:text-white/[0.98] transition-colors duration-200 mb-2">
          {post.title}
        </h3>

        <p className="text-sm text-white/35 leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-mono text-[0.6rem] text-white/15">
            {post.readingTime}
          </span>
          <ArrowRight className="size-3.5 text-white/15 group-hover:text-[rgba(167,139,250,0.6)] group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Component ─── */

export default function Home({ loaderData }: Route.ComponentProps) {
  const { recentPosts } = loaderData;
  const featuredPost = recentPosts[0];
  const otherPosts = recentPosts.slice(1);

  return (
    <div className="min-h-screen">
      {/* ===== HERO — CSS animation (above fold, immediate) ===== */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-8 overflow-hidden">
        <div className="max-w-[1100px] w-full mx-auto text-center">
          <div className="animate-fade-up stagger-1">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[rgba(139,92,246,0.5)]">
              {siteConfig.role} Blog
            </span>
          </div>

          <h1
            className="animate-fade-up stagger-2 aurora-text font-heading font-semibold leading-[1.1] mt-6 mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            개발자의 기록
          </h1>

          <p className="animate-fade-up stagger-3 text-white/45 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            코드 너머의 고민과 성장을 기록합니다.
            <br className="hidden sm:block" />
            매일의 작은 발견이 모여 깊은 이해가 됩니다.
          </p>

          <div className="animate-fade-up stagger-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/75 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:border-[rgba(139,92,246,0.3)] hover:bg-white/[0.05] hover:text-white/90 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] group"
            >
              기록 살펴보기
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up stagger-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      <div className="section-orb" />

      {/* ===== RECENT POSTS — scroll-triggered ===== */}
      <section className="py-20 md:py-28 px-8">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader label="Recent Posts" title="최근 기록" />

          {recentPosts.length > 0 ? (
            <div className="space-y-6">
              {featuredPost && (
                <FadeIn>
                  <FeaturedPostCard post={featuredPost} />
                </FadeIn>
              )}

              {otherPosts.length > 0 && (
                <StaggerContainer
                  className="grid gap-5"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
                  stagger={0.08}
                >
                  {otherPosts.map((post) => (
                    <StaggerItem
                      key={post.slug}
                      className="min-w-[320px]"
                    >
                      <PostCard post={post} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}

              <FadeIn delay={0.3} className="flex justify-center pt-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[rgba(167,139,250,0.8)] transition-colors duration-200 group"
                >
                  모든 글 보기
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </FadeIn>
            </div>
          ) : (
            <FadeIn className="flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="size-10 text-white/15 mb-4" />
              <p className="text-white/40">아직 작성된 글이 없습니다.</p>
              <p className="text-sm text-white/20 mt-1">
                곧 첫 번째 글로 찾아올게요.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      <div className="section-orb" />

      {/* ===== ABOUT PREVIEW — scroll-triggered ===== */}
      <section className="py-20 md:py-28 px-8">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="glass-card p-8 md:p-12 overflow-hidden">
              <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="relative size-20 rounded-full bg-gradient-to-br from-[rgba(139,92,246,0.2)] via-[rgba(96,165,250,0.15)] to-[rgba(94,234,212,0.1)] border border-white/[0.08] flex items-center justify-center">
                    <span className="font-heading font-semibold text-xl text-white/50">
                      K
                    </span>
                  </div>

                  <div className="text-center md:text-left">
                    <p className="font-heading font-semibold text-lg text-white/90">
                      {siteConfig.name}
                    </p>
                    <p className="font-mono text-xs text-[rgba(139,92,246,0.5)] mt-0.5">
                      {siteConfig.role}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-white/55 leading-relaxed mb-3">
                    백엔드 개발자로 일하면서 "왜 이렇게 설계해야 하는가"를 꾸준히
                    고민합니다.
                  </p>
                  <p className="text-white/55 leading-relaxed mb-6">
                    클린 아키텍처, DDD, 테스트 가능한 코드에 관심이 많고, 그
                    과정에서 겪은 시행착오를 이 블로그에 담습니다.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {techTags.map((tag, i) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2.5 py-1 text-[0.65rem] font-mono rounded-full border ${getTagColor(i)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[rgba(167,139,250,0.8)] transition-colors duration-200 group"
                  >
                    더 알아보기
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
