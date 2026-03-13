import { describe, it, expect } from "vitest";
import { buildMeta, getTagColor, siteConfig } from "./site";

describe("buildMeta", () => {
  it("title, description, canonical URL을 포함한 meta 배열을 반환한다", () => {
    const meta = buildMeta("소개", "소개 페이지입니다.", "/about");

    expect(meta).toEqual([
      { title: `소개 | ${siteConfig.title}` },
      { name: "description", content: "소개 페이지입니다." },
      { property: "og:title", content: `소개 | ${siteConfig.title}` },
      { property: "og:description", content: "소개 페이지입니다." },
      { tagName: "link", rel: "canonical", href: `${siteConfig.url}/about` },
    ]);
  });

  it("path가 /blog일 때 올바른 canonical URL을 생성한다", () => {
    const meta = buildMeta("블로그", "블로그", "/blog");
    const canonical = meta.find((m) => "tagName" in m && m.rel === "canonical");
    expect(canonical).toEqual({
      tagName: "link",
      rel: "canonical",
      href: `${siteConfig.url}/blog`,
    });
  });
});

describe("getTagColor", () => {
  it("인덱스 0, 1, 2에서 서로 다른 컬러를 반환한다", () => {
    const colors = [getTagColor(0), getTagColor(1), getTagColor(2)];
    expect(new Set(colors).size).toBe(3);
  });

  it("3개 컬러를 순환한다 (인덱스 3은 인덱스 0과 동일)", () => {
    expect(getTagColor(3)).toBe(getTagColor(0));
    expect(getTagColor(4)).toBe(getTagColor(1));
  });
});
