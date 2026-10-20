"use client";

import { 
  RotateCw, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  Layers 
} from "lucide-react";

interface PageThumbnailsProps {
  thumbnails: string[];
  currentPage: number;
  isOpen: boolean;
  onToggle: () => void;
  onSelectPage: (pageIndex: number) => void;
  onRotatePage: (pageIndex: number) => void;
  onDeletePage: (pageIndex: number) => void;
  onDuplicatePage: (pageIndex: number) => void;
}

export function PageThumbnails({
  thumbnails,
  currentPage,
  isOpen,
  onToggle,
  onSelectPage,
  onRotatePage,
  onDeletePage,
  onDuplicatePage,
}: PageThumbnailsProps) {
  if (thumbnails.length === 0) return null;

  return (
    <div className="bg-white border-t border-neutral-200 z-20 shrink-0 transition-all">
      {/* Drawer Toggle Header */}
      <div className="h-7 px-4 flex items-center justify-between bg-surface-subtle border-b border-neutral-100 text-[11px] font-bold text-neutral-600 select-none">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-filora" />
          <span>Page Management ({thumbnails.length} Pages)</span>
        </div>
        <button
          onClick={onToggle}
          className="flex items-center gap-1 text-neutral-500 hover:text-filora"
        >
          <span>{isOpen ? "Hide Thumbnails" : "Show Thumbnails"}</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Thumbnails Row */}
      {isOpen && (
        <div className="h-32 p-2.5 flex items-center gap-3 overflow-x-auto select-none bg-neutral-50/50">
          {thumbnails.map((dataUrl, idx) => {
            const isSelected = currentPage === idx + 1;
            return (
              <div
                key={idx}
                onClick={() => onSelectPage(idx + 1)}
                className={`relative group h-full aspect-[3/4] bg-white rounded-xl border-2 cursor-pointer p-1 transition-all flex flex-col justify-between shrink-0 shadow-xs ${
                  isSelected
                    ? "border-filora ring-2 ring-filora-200"
                    : "border-neutral-200 hover:border-filora-300"
                }`}
              >
                <div className="text-[10px] font-bold text-neutral-500 text-center">
                  Page {idx + 1}
                </div>

                <div className="flex-1 overflow-hidden flex items-center justify-center">
                  <img src={dataUrl} alt={`Thumbnail ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                </div>

                {/* Hover Actions */}
                <div className="hidden group-hover:flex items-center justify-center gap-1 pt-0.5 bg-white/90 backdrop-blur-xs rounded">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRotatePage(idx);
                    }}
                    className="p-1 text-neutral-500 hover:text-filora rounded hover:bg-neutral-100"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicatePage(idx);
                    }}
                    className="p-1 text-neutral-500 hover:text-filora rounded hover:bg-neutral-100"
                    title="Duplicate Page"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {thumbnails.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePage(idx);
                      }}
                      className="p-1 text-neutral-500 hover:text-rose-600 rounded hover:bg-rose-50"
                      title="Delete Page"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
