import type { Config } from "@react-router/dev/config";
import { glob } from "glob";
import path from "path";

async function getBlogSlugs(): Promise<string[]> {
  const files = await glob("content/posts/*.mdx");
  return files.map((f) => path.basename(f, ".mdx"));
}

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const slugs = await getBlogSlugs();
    return [...getStaticPaths(), ...slugs.map((slug) => `/blog/${slug}`)];
  },
} satisfies Config;
