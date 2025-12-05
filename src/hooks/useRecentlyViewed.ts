// useRecentlyViewed.ts
import { useState } from "react";
import { mockDocuments } from "../data/mockData";

export function useRecentlyViewed() {
  const [recentDocuments] = useState(
    mockDocuments
      .filter((d) =>
        ["101", "102", "201", "202", "301", "302"].includes(d.id)
      )
      .map((d, i) => ({
        ...d,
        viewedAt: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
      }))
  );

  const isRecent = (id: string) =>
    recentDocuments.some((doc) => doc.id === id);

  return { recentDocuments, isRecent };
}
