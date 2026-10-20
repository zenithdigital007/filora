"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  Sparkles, 
  Star, 
  History, 
  Layers, 
  ShieldCheck, 
  ArrowUpDown 
} from "lucide-react";
import { TOOLS_REGISTRY, TOOL_CATEGORIES, ToolConfig } from "@/lib/tools-registry";
import { ToolCard } from "@/components/common/ToolCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useRecentTools } from "@/lib/hooks/useRecentTools";
import { TopContentAd, BottomContentAd } from "@/components/ads/AdBanners";

export default function ToolsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterMode, setFilterMode] = useState<"all" | "browser" | "server">("all");
  const [activeTab, setActiveTab] = useState<"all" | "favorites" | "recent">("all");
  const [sortAlpha, setSortAlpha] = useState(false);

  const { favorites, isLoaded: favsLoaded } = useFavorites();
  const { recentTools, isLoaded: recentLoaded } = useRecentTools();

  const filteredTools = useMemo(() => {
    let list = [...TOOLS_REGISTRY];

    // Tab filter
    if (activeTab === "favorites") {
      list = list.filter((t) => favorites.includes(t.slug));
    } else if (activeTab === "recent") {
      const recentSlugs = recentTools.map((r) => r.slug);
      list = list.filter((t) => recentSlugs.includes(t.slug));
    }

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((t) => t.category === selectedCategory);
    }

    // Processing mode filter
    if (filterMode !== "all") {
      list = list.filter((t) => t.processingMode === filterMode);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.slug.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortAlpha) {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchQuery, selectedCategory, filterMode, activeTab, sortAlpha, favorites, recentTools]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Tools Directory" }]} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Toolkit</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          All Document Tools
        </h1>
        <p className="text-sm sm:text-base text-neutral-600">
          Browse our complete suite of 40+ free PDF and document productivity tools.
        </p>
      </div>

      {/* Search & Main Tabs */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-filora absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search tools by name, action (compress, sign, merge, ocr)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-neutral-300 focus:border-filora focus:ring-2 focus:ring-filora-100 outline-none text-sm text-neutral-900 shadow-subtle bg-white"
          />
        </div>

        {/* Top Control Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1.5 p-1 bg-surface-subtle border border-neutral-200 rounded-2xl">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "all" ? "bg-white text-filora shadow-xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All ({TOOLS_REGISTRY.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "favorites" ? "bg-white text-filora shadow-xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>Favorites ({favsLoaded ? favorites.length : 0})</span>
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "recent" ? "bg-white text-filora shadow-xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <History className="w-3.5 h-3.5 text-filora" />
              <span>Recent</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Browser Mode Filter */}
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value as any)}
              className="px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 outline-none"
            >
              <option value="all">All Processing Modes</option>
              <option value="browser">In-Browser Only (Client-Side)</option>
              <option value="server">Cloud Supported</option>
            </select>

            {/* Sort Alpha */}
            <button
              onClick={() => setSortAlpha(!sortAlpha)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
                sortAlpha ? "bg-filora-50 border-filora text-filora" : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
              title="Sort Alphabetically"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">A-Z</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 select-none">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-filora text-white shadow-xs"
                  : "bg-surface-subtle hover:bg-surface-muted text-neutral-600 border border-neutral-200"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      <TopContentAd />

      {/* Results Count & Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold">
          <span>Showing {filteredTools.length} tools</span>
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-filora hover:underline">
              Clear search
            </button>
          )}
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-20 bg-surface-subtle rounded-3xl border border-neutral-200 space-y-3">
            <p className="text-base font-bold text-neutral-700">No tools found matching your criteria</p>
            <p className="text-xs text-neutral-500">Try adjusting your search query or selected category.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setFilterMode("all");
                setActiveTab("all");
              }}
              className="px-4 py-2 bg-filora text-white text-xs font-semibold rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </div>

      <BottomContentAd />
    </div>
  );
}
