import { visit } from "unist-util-visit";
import type { Root, Element, Text } from "hast";

/**
 * Rehype plugin: ==text== → <mark>text</mark>
 * Obsidian/GitHub-style highlight syntax support for MDX.
 */
export function rehypeMark() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index: number | undefined, parent: Element | null) => {
      if (index === undefined || !parent) return;

      const value = node.value;
      const regex = /==(.*?)==/g;
      let match;
      const children: (Element | Text)[] = [];
      let lastIndex = 0;

      while ((match = regex.exec(value)) !== null) {
        if (match.index > lastIndex) {
          children.push({ type: "text", value: value.slice(lastIndex, match.index) });
        }
        children.push({
          type: "element",
          tagName: "mark",
          properties: {},
          children: [{ type: "text", value: match[1] }],
        });
        lastIndex = regex.lastIndex;
      }

      if (children.length === 0) return;

      if (lastIndex < value.length) {
        children.push({ type: "text", value: value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}
