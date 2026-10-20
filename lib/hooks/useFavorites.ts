"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "filora_favorite_tools";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (slug: string) => {
    try {
      let updated: string[];
      if (favorites.includes(slug)) {
        updated = favorites.filter((s) => s !== slug);
      } else {
        updated = [...favorites, slug];
      }
      setFavorites(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const isFavorite = (slug: string) => favorites.includes(slug);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
