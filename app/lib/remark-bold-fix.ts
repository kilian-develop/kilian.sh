import { visit } from "unist-util-visit";
import type { Root, Text, PhrasingContent } from "mdast";

/**
 * Remark plugin: CommonMark bold 파싱 실패 복구.
 *
 * CommonMark 규칙에서 **"텍스트"** 뒤에 한글(CJK)이 바로 오면
 * 닫는 **가 right-flanking delimiter로 인식되지 않아 볼드가 깨진다.
 * 파싱 실패로 텍스트 노드에 literal **가 남은 경우를 잡아 strong 노드로 변환한다.
 */
export function remarkBoldFix() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index: number | undefined, parent: any) => {
      if (index === undefined || !parent) return;

      const value = node.value;
      const regex = /\*\*(.+?)\*\*/g;
      let match;
      const children: PhrasingContent[] = [];
      let lastIndex = 0;

      while ((match = regex.exec(value)) !== null) {
        if (match.index > lastIndex) {
          children.push({ type: "text", value: value.slice(lastIndex, match.index) });
        }
        children.push({
          type: "strong",
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
