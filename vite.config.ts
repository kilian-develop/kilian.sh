import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
} from "@shikijs/transformers";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings,
          [
            rehypeShiki,
            {
              themes: {
                light: "github-light",
                dark: "tokyo-night",
              },
              defaultColor: false,
              transformers: [
                transformerMetaHighlight(),
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationFocus(),
              ],
            },
          ],
        ],
      }),
    },
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
