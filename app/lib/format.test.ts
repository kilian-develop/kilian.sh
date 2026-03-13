import { describe, it, expect } from "vitest";
import { formatDateFull, formatDateShort, formatDateMono } from "./format";

describe("formatDateMono", () => {
  it("YYYY.MM.DD 형식으로 반환한다", () => {
    expect(formatDateMono("2026-03-05")).toBe("2026.03.05");
  });

  it("월과 일이 한 자리일 때 0을 패딩한다", () => {
    expect(formatDateMono("2026-01-09")).toBe("2026.01.09");
  });
});

describe("formatDateFull", () => {
  it("한국어 전체 날짜 형식을 반환한다", () => {
    const result = formatDateFull("2026-03-12");
    expect(result).toContain("2026");
    expect(result).toContain("3");
    expect(result).toContain("12");
  });
});

describe("formatDateShort", () => {
  it("월과 일만 포함한 짧은 형식을 반환한다", () => {
    const result = formatDateShort("2026-03-12");
    expect(result).toContain("3");
    expect(result).toContain("12");
    expect(result).not.toContain("2026");
  });
});
