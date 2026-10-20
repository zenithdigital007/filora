"use client";

import Link from "next/link";
import { 
  Layers, 
  Scissors, 
  Minimize2, 
  Edit3, 
  LayoutGrid, 
  FileSignature, 
  ShieldAlert, 
  Hash, 
  RotateCw, 
  Lock, 
  Unlock, 
  Image, 
  FileImage, 
  ImageDown, 
  ImagePlus, 
  FileText, 
  ScanText, 
  EyeOff, 
  Binary, 
  Crop, 
  Scaling, 
  SunMoon, 
  Grid, 
  FileCode, 
  Layers2, 
  Eraser, 
  SearchCode, 
  BarChart3, 
  Ruler, 
  FileOutput, 
  Trash2, 
  FlipHorizontal, 
  PanelTop, 
  FileEdit, 
  Sheet, 
  CheckSquare, 
  Star,
  ArrowRight,
  ShieldCheck,
  LucideIcon
} from "lucide-react";
import { ToolConfig } from "@/lib/tools-registry";
import { useFavorites } from "@/lib/hooks/useFavorites";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Scissors,
  Minimize2,
  Edit3,
  LayoutGrid,
  FileSignature,
  ShieldAlert,
  Hash,
  RotateCw,
  Lock,
  Unlock,
  Image,
  FileImage,
  ImageDown,
  ImagePlus,
  FileText,
  ScanText,
  EyeOff,
  Binary,
  Crop,
  Scaling,
  SunMoon,
  Grid,
  FileCode,
  Layers2,
  Eraser,
  SearchCode,
  BarChart3,
  Ruler,
  FileOutput,
  Trash2,
  FlipHorizontal,
  PanelTop,
  FileEdit,
  Sheet,
  CheckSquare,
};

interface ToolCardProps {
  tool: ToolConfig;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const IconComponent = ICON_MAP[tool.icon] || FileText;
  const favorite = isLoaded && isFavorite(tool.slug);

  return (
    <div className="group relative bg-white border border-neutral-200 hover:border-filora-300 rounded-2xl p-5 shadow-card hover:shadow-cardHover transition-all duration-200 flex flex-col justify-between">
      {/* Card Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-filora-50 border border-filora-100 flex items-center justify-center text-filora group-hover:bg-filora group-hover:text-white transition-all duration-200 shadow-xs">
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-filora-100 text-filora">
                {tool.badge}
              </span>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(tool.slug);
              }}
              className="p-1 text-neutral-300 hover:text-amber-500 rounded-lg hover:bg-neutral-50 transition-colors"
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                className={`w-4 h-4 ${
                  favorite ? "fill-amber-400 text-amber-500" : "text-neutral-300"
                }`}
              />
            </button>
          </div>
        </div>

        <Link href={tool.route} className="block group-hover:text-filora transition-colors">
          <h3 className="text-base font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
            {tool.name}
          </h3>
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
            {tool.description}
          </p>
        </Link>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
          {tool.processingMode === "browser" ? (
            <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              In-Browser
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
              Secure Cloud
            </span>
          )}
        </div>

        <Link
          href={tool.route}
          className="inline-flex items-center gap-1 text-xs font-semibold text-filora group-hover:translate-x-0.5 transition-transform"
        >
          <span>Open Tool</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
