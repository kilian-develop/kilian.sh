import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  BookOpen,
  Clock,
  X,
  ChevronRight,
  Search,
} from "lucide-react";
import type { Route } from "./+types/blog._index";
import { getAllPosts } from "~/lib/posts.server";
import { formatDateMono } from "~/lib/format";
import { cn } from "~/lib/utils";
import { buildMeta } from "~/data/site";
import { useSearch } from "~/lib/use-search";

export async function loader(_: Route.LoaderArgs) {
  const posts = await getAllPosts();
  return { posts };
}

export function meta(_: Route.MetaArgs) {
  return buildMeta(
    "블로그",
    "클린 아키텍처, 도메인 주도 설계, Spring/Java 개발에 관한 기술 블로그",
    "/blog",
  );
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  const { query: searchQuery, setQuery: setSearchQuery, matches } = useSearch(posts);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const tagScrollRef = useRef<HTMLDivElement>(null);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const filteredPosts = posts.filter((post, i) => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesTag && matches(i);
  });

  return (
    <div className="min-h-screen">
      {/* ===== HEADER ===== */}
      <section className="pt-24 pb-8 md:pt-36 md:pb-12 px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="animate-fade-in flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-[rgba(139,92,246,0.4)]" />
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[rgba(139,92,246,0.5)]">
              Blog
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="animate-fade-up font-heading text-4xl md:text-6xl font-semibold tracking-tight text-balance text-white/90 mb-3">
                블로그
                <span className="inline-block ml-2 font-heading text-white/15 text-2xl md:text-4xl select-none">
                  /archive
                </span>
              </h1>

              <p className="animate-fade-up stagger-2 text-white/45 text-lg">
                총{" "}
                <span className="font-mono text-white/75">
                  {filteredPosts.length}
                </span>
                개의 글
                {selectedTag && (
                  <span className="text-white/30">
                    {" "}
                    in{" "}
                    <span className="text-[rgba(139,92,246,0.7)]">
                      #{selectedTag}
                    </span>
                  </span>
                )}
                {searchQuery && (
                  <span className="text-white/30">
                    {" "}
                    &middot; &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* ===== SEARCH INPUT ===== */}
          <div className="animate-fade-up stagger-2 mt-8">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/25" />
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/75 placeholder:text-white/25 focus:outline-none focus:border-white/15 focus:bg-white/[0.04] backdrop-blur-sm transition-all duration-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/25 hover:text-white/50 transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TAG FILTER ===== */}
      {allTags.length > 0 && (
        <section className="pt-2 pb-2 px-8">
          <div className="max-w-[1100px] mx-auto relative">
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none md:hidden" />
            <div
              ref={tagScrollRef}
              className="animate-fade-up stagger-3 flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 -mb-2"
              style={{ scrollBehavior: "smooth" }}
            >
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className={cn(
                  "shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                  selectedTag === null
                    ? "bg-[rgba(139,92,246,0.15)] border-[rgba(139,92,246,0.3)] text-[rgba(139,92,246,0.9)]"
                    : "bg-white/[0.03] border-white/[0.06] text-white/45 hover:border-white/10 hover:text-white/60"
                )}
              >
                전체
              </button>

              <div className="w-px h-4 bg-white/[0.06] shrink-0" />

              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={cn(
                    "shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                    selectedTag === tag
                      ? "bg-[rgba(139,92,246,0.15)] border-[rgba(139,92,246,0.3)] text-[rgba(139,92,246,0.9)]"
                      : "bg-white/[0.03] border-white/[0.06] text-white/45 hover:border-white/10 hover:text-white/60"
                  )}
                >
                  {tag}
                  {selectedTag === tag && <X className="size-3" />}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="max-w-[1100px] mx-auto px-8 pt-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ===== POST LIST ===== */}
      <section className="py-4 pb-24 px-8">
        <div className="max-w-[1100px] mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="divide-y divide-white/[0.04]">
              {filteredPosts.map((post, i) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className={cn(
                    "group block",
                    "animate-fade-up",
                    `stagger-${Math.min(i + 1, 8)}`
                  )}
                >
                  <article className="relative py-6 md:py-7 transition-all duration-200">
                    {/* Left accent border on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-[rgba(139,92,246,0.8)] to-[rgba(96,165,250,0.6)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-2 md:gap-8 items-start pl-0 group-hover:pl-4 transition-all duration-200">
                      {/* Date column */}
                      <div className="flex md:block items-center gap-3">
                        <time className="font-mono text-sm text-white/30 whitespace-nowrap">
                          {formatDateMono(post.date)}
                        </time>
                        <span className="flex items-center gap-1 text-xs text-white/20 md:mt-1">
                          <Clock className="size-3" />
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Title + excerpt column */}
                      <div className="min-w-0">
                        <h2 className="font-heading text-lg md:text-xl font-medium leading-snug text-balance text-white/90 group-hover:text-[rgba(139,92,246,0.9)] transition-colors duration-200 mb-1.5">
                          {post.title}
                        </h2>
                        <p className="text-sm text-white/40 leading-relaxed line-clamp-2 break-keep">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Tags + arrow column */}
                      <div className="flex items-center gap-3 shrink-0">
                        {post.tags.length > 0 && (
                          <div className="hidden lg:flex flex-wrap gap-1.5 justify-end">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-white/35"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <ChevronRight className="size-4 text-white/15 group-hover:text-[rgba(139,92,246,0.7)] group-hover:translate-x-0.5 transition-all duration-200 hidden md:block" />
                      </div>
                    </div>

                    {/* Mobile tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pl-0 group-hover:pl-4 transition-all duration-200 lg:hidden">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-white/35"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in flex flex-col items-center justify-center py-24 text-center">
              <div className="relative mb-6">
                <div className="size-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="size-8 text-white/15" />
                </div>
                <div className="absolute -top-1 -right-1 size-4 rounded-full bg-[rgba(139,92,246,0.2)]" />
              </div>
              <p className="text-lg text-white/60 font-heading">
                {selectedTag && !searchQuery
                  ? `"${selectedTag}" 태그에 해당하는 글이 없습니다.`
                  : searchQuery && !selectedTag
                    ? `"${searchQuery}" 검색 결과가 없습니다.`
                    : searchQuery && selectedTag
                      ? `"${selectedTag}" 태그에서 "${searchQuery}" 검색 결과가 없습니다.`
                      : "아직 작성된 글이 없습니다."}
              </p>
              <p className="text-sm text-white/30 mt-2">
                {selectedTag || searchQuery
                  ? "다른 검색어나 태그를 시도해보세요."
                  : "곧 첫 번째 글로 찾아올게요."}
              </p>
              {(selectedTag || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTag(null);
                    setSearchQuery("");
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-[rgba(139,92,246,0.7)] hover:text-[rgba(139,92,246,0.9)] transition-colors"
                >
                  전체 글 보기
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
