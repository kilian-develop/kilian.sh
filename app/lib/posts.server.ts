import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: string;
  thumbnail?: string;
}

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await fs.readdir(POSTS_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(POSTS_DIR, file);
      const raw = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? new Date().toISOString(),
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? "",
        readingTime: stats.text,
        thumbnail: data.thumbnail,
      } satisfies PostMeta;
    })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      tags: data.tags ?? [],
      excerpt: data.excerpt ?? "",
      readingTime: stats.text,
      thumbnail: data.thumbnail,
      content,
    };
  } catch {
    return null;
  }
}

export async function getAdjacentPosts(slug: string) {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  };
}
