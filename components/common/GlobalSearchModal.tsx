"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredTools = useMemo(() => {
    if (!query.trim()) {
      return TOOLS_REGISTRY.slice(0, 8);
    }
    const q = query.toLowerCase();
    return TOOLS_REGISTRY.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-filora" />
          <input
            type="text"
            placeholder="Search all 40+ PDF tools (e.g. compress, merge, sign, ocr)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-base text-neutral-900 placeholder:text-neutral-500 bg-transparent outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            {query.trim() ? `Search Results (${filteredTools.length})` : "Popular Tools"}
          </div>

          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-sm">
              No tools matching &quot;{query}&quot;. Try searching &quot;compress&quot;, &quot;merge&quot;, or &quot;sign&quot;.
            </div>
          ) : (
            filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.route}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-subtle hover:border-filora-200 border border-transparent transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-filora-100 flex items-center justify-center text-filora font-bold text-sm group-hover:bg-filora group-hover:text-white transition-colors">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
                      {tool.name}
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        {tool.category}
                      </span>
                      {tool.processingMode === "browser" && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                          In-Browser
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-500 line-clamp-1">{tool.description}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-filora group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 bg-surface-subtle border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-filora" />
            <span>Files processed securely on your device</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-neutral-200 rounded text-neutral-600">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
