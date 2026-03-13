import { useMemo, useState, useCallback } from "react";
import FlexSearch from "flexsearch";

interface Searchable {
  title: string;
  excerpt: string;
  tags: string[];
}

/**
 * FlexSearch-powered full-text search hook.
 * Builds an in-memory index from post metadata for fast fuzzy matching.
 */
export function useSearch<T extends Searchable>(items: T[]) {
  const [query, setQuery] = useState("");

  const index = useMemo(() => {
    const idx = new FlexSearch.Index({ tokenize: "forward" });
    items.forEach((item, i) => {
      idx.add(i, [item.title, item.excerpt, ...item.tags].join(" "));
    });
    return idx;
  }, [items]);

  const results = useMemo(() => {
    if (!query.trim()) return null;
    return new Set(index.search(query) as number[]);
  }, [index, query]);

  const matches = useCallback(
    (itemIndex: number) => !results || results.has(itemIndex),
    [results],
  );

  return { query, setQuery, matches };
}
