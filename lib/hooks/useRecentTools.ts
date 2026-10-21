"use client";

import { useState, useEffect } from "react";

export interface RecentToolEntry {
  slug: string;
  name: string;
  route: string;
  category: string;
  icon: string;
  timestamp: number;
}

const STORAGE_KEY = "pdfyara_recent_tools";
const MAX_RECENT = 8;

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<RecentToolEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("filora_recent_tools");
      if (stored) {
        setRecentTools(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage read errors
    }
    setIsLoaded(true);
  }, []);

  const addRecentTool = (tool: { slug: string; name: string; route: string; category: string; icon: string }) => {
    try {
      const entry: RecentToolEntry = { ...tool, timestamp: Date.now() };
      const updated = [entry, ...recentTools.filter((t) => t.slug !== tool.slug)].slice(0, MAX_RECENT);
      setRecentTools(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore write errors
    }
  };

  const clearRecentTools = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentTools([]);
    } catch {
      // Ignore
    }
  };

  return { recentTools, addRecentTool, clearRecentTools, isLoaded };
}
