// src/hooks/useFavorites.ts
import { useState } from "react";

export function useFavorites() {
  // Seed with some mock favorites so the UI is populated
  const [favorites, setFavorites] = useState<string[]>([
    "101",
    "102",
    "201",
    "202",
    "301",
    "302",
    "401",
    "402",
  ]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
