"use client";

import Link from "next/link";
import { 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  FileText,
  Save
} from "lucide-react";

interface EditorTopBarProps {
  fileName: string;
  currentPage: number;
  totalPages: number;
  zoom: number;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onSave: () => void;
  onDownload: () => void;
}

export function EditorTopBar({
  fileName,
  currentPage,
  totalPages,
  zoom,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onPrevPage,
  onNextPage,
  onSave,
  onDownload,
}: EditorTopBarProps) {
  return (
    <div className="h-14 bg-white border-b border-neutral-200 px-4 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left: Brand & File Info */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-filora text-white flex items-center justify-center font-extrabold text-sm">
            F
          </div>
          <span className="font-extrabold text-sm text-neutral-900 hidden sm:inline group-hover:text-filora transition-colors">
            FILORA
          </span>
        </Link>

        <div className="h-4 w-px bg-neutral-200" />

        <div className="flex items-center gap-1.5 text-xs text-neutral-700 max-w-[140px] sm:max-w-xs truncate">
          <FileText className="w-3.5 h-3.5 text-filora shrink-0" />
          <span className="font-semibold truncate">{fileName || "Untitled Document.pdf"}</span>
        </div>
      </div>

      {/* Center: Undo/Redo & Zoom & Page navigation */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 bg-surface-subtle p-0.5 rounded-lg border border-neutral-200">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 text-neutral-600 hover:text-filora disabled:text-neutral-300 disabled:hover:text-neutral-300 rounded hover:bg-white transition-colors"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 text-neutral-600 hover:text-filora disabled:text-neutral-300 disabled:hover:text-neutral-300 rounded hover:bg-white transition-colors"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom */}
        <div className="hidden sm:flex items-center gap-1 bg-surface-subtle p-0.5 rounded-lg border border-neutral-200 text-xs text-neutral-700">
          <button
            onClick={onZoomOut}
            className="p-1.5 text-neutral-600 hover:text-filora rounded hover:bg-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 font-semibold text-[11px] min-w-[40px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            className="p-1.5 text-neutral-600 hover:text-filora rounded hover:bg-white"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Page Nav */}
        {totalPages > 0 && (
          <div className="flex items-center gap-1 bg-surface-subtle p-0.5 rounded-lg border border-neutral-200 text-xs text-neutral-700">
            <button
              onClick={onPrevPage}
              disabled={currentPage <= 1}
              className="p-1.5 text-neutral-600 hover:text-filora disabled:text-neutral-300 rounded hover:bg-white"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-semibold text-[11px]">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={onNextPage}
              disabled={currentPage >= totalPages}
              className="p-1.5 text-neutral-600 hover:text-filora disabled:text-neutral-300 rounded hover:bg-white"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onDownload}
          className="px-3.5 py-1.5 bg-filora hover:bg-filora-700 active:bg-filora-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export PDF</span>
        </button>
      </div>
    </div>
  );
}
