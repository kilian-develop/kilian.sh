import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
} from "@shikijs/transformers";
import type { ShikiTransformer } from "shiki";
import { defineConfig } from "vite";

/** Shiki transformer: inject data-language on <code> element */
function transformerLanguageAttr(): ShikiTransformer {
  return {
    name: "add-language-attr",
    code(node) {
      node.properties.dataLanguage = this.options.lang;
    },
  };
}
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
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
                transformerLanguageAttr(),
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
