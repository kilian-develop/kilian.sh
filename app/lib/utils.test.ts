import { describe, it, expect } from "vitest";
import { cn, staggerClass } from "./utils";

describe("cn", () => {
  it("단일 클래스를 반환한다", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("여러 클래스를 병합한다", () => {
    expect(cn("px-2", "py-3")).toBe("px-2 py-3");
  });

  it("충돌하는 Tailwind 클래스를 후자 우선으로 병합한다", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("falsy 값을 무시한다", () => {
    expect(cn("foo", false && "bar", undefined, null, "baz")).toBe("foo baz");
  });
});

describe("staggerClass", () => {
  it("인덱스 0은 stagger-1을 반환한다", () => {
    expect(staggerClass(0)).toBe("stagger-1");
  });

  it("인덱스 4는 stagger-5를 반환한다", () => {
    expect(staggerClass(4)).toBe("stagger-5");
  });

  it("인덱스 7 이상은 stagger-8로 제한된다", () => {
    expect(staggerClass(7)).toBe("stagger-8");
    expect(staggerClass(10)).toBe("stagger-8");
    expect(staggerClass(100)).toBe("stagger-8");
  });
});
