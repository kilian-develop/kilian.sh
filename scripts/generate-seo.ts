/**
 * Build-time script: generates sitemap.xml and rss.xml
 * Run after vite build via: npx tsx scripts/generate-seo.ts
 */
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://kilian.sh";
const POSTS_DIR = path.join(process.cwd(), "content/posts");
const OUT_DIR = path.join(process.cwd(), "build/client");

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

async function getPosts(): Promise<Post[]> {
  const files = await fs.readdir(POSTS_DIR);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf-8");
        const { data } = matter(raw);
        return {
          slug: file.replace(/\.mdx$/, ""),
          title: data.title ?? file.replace(/\.mdx$/, ""),
          date: data.date ?? new Date().toISOString(),
          excerpt: data.excerpt ?? "",
          tags: data.tags ?? [],
        };
      })
  );
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function generateSitemap(posts: Post[]) {
  const staticPages = ["", "/blog", "/about", "/portfolio"];
  const today = new Date().toISOString().split("T")[0];

  const urls = [
    ...staticPages.map(
      (page) => `  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
    ),
    ...posts.map(
      (post) => `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  await fs.writeFile(path.join(OUT_DIR, "sitemap.xml"), xml, "utf-8");
  console.log(`✓ sitemap.xml (${staticPages.length + posts.length} URLs)`);
}

async function generateRss(posts: Post[]) {
  const items = posts
    .slice(0, 20)
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml("kilian.sh")}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml("kilian의 기술 블로그 — Java, Spring, 클린 아키텍처 그리고 개발 이야기")}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  await fs.writeFile(path.join(OUT_DIR, "rss.xml"), xml, "utf-8");
  console.log(`✓ rss.xml (${Math.min(posts.length, 20)} items)`);
}

async function main() {
  const posts = await getPosts();
  await generateSitemap(posts);
  await generateRss(posts);
}

main().catch((err) => {
  console.error("SEO generation failed:", err);
  process.exit(1);
});
