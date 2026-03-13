import { Link } from "react-router";
import { Balancer } from "react-wrap-balancer";
import { ArrowLeft } from "lucide-react";
import { MDXProvider } from "@mdx-js/react";
import type { Route } from "./+types/blog.$slug";
import { getPostBySlug, getAdjacentPosts } from "~/lib/posts.server";
import { formatDateMono } from "~/lib/format";
import { getTagColor, siteConfig } from "~/data/site";
import { mdxComponents } from "~/components/blog/mdx-components";
import { ReadingProgress } from "~/components/blog/reading-progress";
import { BackToTop } from "~/components/blog/back-to-top";
import { TableOfContents } from "~/components/blog/table-of-contents";
import { PostNavigation } from "~/components/blog/post-navigation";
import { GiscusComments } from "~/components/blog/giscus-comments";
import { cn } from "~/lib/utils";

// Import all MDX files at build time via Vite glob
const mdxModules = import.meta.glob("../../content/posts/*.mdx", {
  eager: true,
}) as Record<
  string,
  { default: React.ComponentType; frontmatter?: Record<string, unknown> }
>;

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const adjacent = await getAdjacentPosts(params.slug);

  return { post, adjacent };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "글을 찾을 수 없습니다 | kilian.sh" }];
  }
  const postUrl = `${siteConfig.url}/blog/${data.post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.post.title,
    description: data.post.excerpt,
    url: postUrl,
    datePublished: data.post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    keywords: data.post.tags,
  };

  return [
    { title: `${data.post.title} | kilian.sh` },
    { name: "description", content: data.post.excerpt },
    { property: "og:title", content: data.post.title },
    { property: "og:description", content: data.post.excerpt },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: data.post.date },
    { property: "article:author", content: siteConfig.name },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: data.post.title },
    { name: "twitter:description", content: data.post.excerpt },
    { tagName: "link", rel: "canonical", href: postUrl },
    {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  ];
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post, adjacent } = loaderData;

  const mdxKey = Object.keys(mdxModules).find((key) =>
    key.endsWith(`/${post.slug}.mdx`)
  );
  const MdxContent = mdxKey ? mdxModules[mdxKey].default : null;

  const readingMinutes = post.readingTime.match(/(\d+)/)?.[1] || "1";

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <article className="min-h-screen">
        {/* Back Navigation */}
        <div className="pt-24 md:pt-32 px-8">
          <div className="max-w-page mx-auto">
            <Link
              to="/blog"
              className="animate-fade-in inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-accent/80 transition-colors duration-200 group"
            >
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              블로그로 돌아가기
            </Link>
          </div>
        </div>

        {/* Post Header */}
        <header className="pt-8 pb-10 px-8">
          <div className="max-w-page mx-auto">
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[0.7rem] font-medium uppercase tracking-widest text-accent/50">
                  {formatDateMono(post.date)}
                </span>
                <span className="text-white/[0.08]">|</span>
                <span className="font-mono text-[0.7rem] tracking-wide text-white/30">
                  약 {readingMinutes}분
                </span>
              </div>

              <h1 className="font-heading text-3xl md:text-[2.75rem] md:leading-[1.2] font-semibold leading-tight tracking-tight text-white/95 mb-6">
                <Balancer>{post.title}</Balancer>
              </h1>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, i: number) => (
                    <span
                      key={tag}
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-wide bg-white/[0.03] border backdrop-blur-sm transition-colors",
                        getTagColor(i)
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Decorative divider */}
        <div className="max-w-page mx-auto px-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <div className="size-1.5 rounded-full bg-accent/40" />
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
        </div>

        {/* Post Content with TOC sidebar */}
        <div className="py-10 px-8">
          <div className="max-w-page mx-auto xl:grid xl:grid-cols-[1fr_200px] xl:gap-12">
            <div className="animate-fade-up stagger-2 prose-blog min-w-0">
              {MdxContent ? (
                <MDXProvider components={mdxComponents}>
                  <MdxContent components={mdxComponents} />
                </MDXProvider>
              ) : (
                <p className="text-white/45">
                  콘텐츠를 불러올 수 없습니다.
                </p>
              )}
            </div>

            <TableOfContents content={post.content} />
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="max-w-page mx-auto px-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <div className="size-1.5 rounded-full bg-accent/40" />
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
        </div>

        {/* Comments */}
        <div className="px-8">
          <div className="max-w-page mx-auto">
            <GiscusComments slug={post.slug} />
          </div>
        </div>

        {/* Post Footer */}
        <footer className="py-12 pb-24 px-8">
          <div className="max-w-page mx-auto space-y-10">
            <PostNavigation prev={adjacent.prev} next={adjacent.next} />

            <div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-accent/80 transition-colors duration-200 group"
              >
                <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                다른 글 보기
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
