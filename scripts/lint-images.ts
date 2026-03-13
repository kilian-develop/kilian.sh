/**
 * MDX 포스트의 이미지 경로에 공백이 포함되어 있는지 검사합니다.
 * MDX 파서는 ![alt](url) 에서 URL에 공백이 있으면 <img>로 변환하지 못합니다.
 *
 * 사용: npx tsx scripts/lint-images.ts
 */
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const postsDir = join(import.meta.dirname, "../content/posts");
const files = readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

let hasError = false;

for (const file of files) {
  const content = readFileSync(join(postsDir, file), "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/!\[[^\]]*\]\(([^)]+)\)/g);
    if (!match) continue;

    for (const m of match) {
      const url = m.match(/\]\(([^)]+)\)/)?.[1] ?? "";
      if (url.includes(" ")) {
        console.error(
          `\x1b[31mERROR\x1b[0m ${file}:${i + 1} — 이미지 경로에 공백 포함: ${url}`,
        );
        console.error(
          `  → 공백을 %20으로 변경하거나 파일명에서 공백을 제거하세요.\n`,
        );
        hasError = true;
      }
    }
  }
}

if (hasError) {
  console.error("\n이미지 경로 검사 실패. 위 항목을 수정해주세요.");
  process.exit(1);
} else {
  console.log("✓ 모든 이미지 경로 정상");
}
