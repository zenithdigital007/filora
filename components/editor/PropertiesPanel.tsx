"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { 
  Sliders, 
  Trash2, 
  Type, 
  Bold, 
  Italic, 
  Eraser, 
  Square, 
  Stamp, 
  Palette, 
  Layers,
  Search,
  Check,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Plus,
  Minus,
  Move
} from "lucide-react";
import { EditorTool } from "./EditorSidebar";
import { AVAILABLE_FONTS, FontDefinition, FontCategory, ensureFontLoaded, getFontFamilyCss } from "@/lib/pdf-engine/font-manager";

interface PropertiesPanelProps {
  activeTool: EditorTool;
  selectedElement: any | null;
  isExtractedText?: boolean;
  color: string;
  fontSize: number;
  fontFamily?: string;
  cleanFontFamily?: string;
  detectedFontName?: string;
  fontWeight?: string;
  fontStyle?: string;
  strokeWidth: number;
  opacity: number;
  shapeType: "rect" | "circle" | "line";
  stampText: string;
  onChangeColor: (c: string) => void;
  onChangeFontSize: (s: number) => void;
  onChangeFontFamily?: (f: string) => void;
  onToggleBold?: () => void;
  onToggleItalic?: () => void;
  onChangeStrokeWidth: (w: number) => void;
  onChangeOpacity: (o: number) => void;
  onChangeShapeType: (t: "rect" | "circle" | "line") => void;
  onChangeStampText: (st: string) => void;
  onDeleteSelected: () => void;
  onChangeWidth?: (w: number) => void;
  onChangeHeight?: (h: number) => void;
  onChangeX?: (x: number) => void;
  onChangeY?: (y: number) => void;
  onCenterHorizontal?: () => void;
}

export function PropertiesPanel({
  activeTool,
  selectedElement,
  isExtractedText,
  color,
  fontSize,
  fontFamily = "sans-serif",
  cleanFontFamily,
  detectedFontName,
  fontWeight = "normal",
  fontStyle = "normal",
  strokeWidth,
  opacity,
  shapeType,
  stampText,
  onChangeColor,
  onChangeFontSize,
  onChangeFontFamily,
  onToggleBold,
  onToggleItalic,
  onChangeStrokeWidth,
  onChangeOpacity,
  onChangeShapeType,
  onChangeStampText,
  onDeleteSelected,
  onChangeWidth,
  onChangeHeight,
  onChangeX,
  onChangeY,
  onCenterHorizontal,
}: PropertiesPanelProps) {
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [fontSearch, setFontSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | FontCategory>("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFontDropdownOpen(false);
      }
    }
    if (isFontDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFontDropdownOpen]);

  const colorPalette = [
    "#5003C0", // Filora Purple
    "#171717", // Neutral dark
    "#DC2626", // Red
    "#16A34A", // Green
    "#D97706", // Amber
    "#2563EB", // Blue
    "#FFFFFF", // White
  ];

  const stamps = [
    "APPROVED",
    "CONFIDENTIAL",
    "DRAFT",
    "REJECTED",
    "SIGN HERE",
    "FINAL",
  ];

  const isTextContext =
    activeTool === "text" ||
    activeTool === "edit_text" ||
    isExtractedText ||
    selectedElement?.type === "text";

  // Determine current active font name
  const currentFontFamilyName = useMemo(() => {
    if (cleanFontFamily) return cleanFontFamily;
    if (fontFamily === "serif") return "Times New Roman";
    if (fontFamily === "monospace") return "Courier New";
    return "Arial";
  }, [cleanFontFamily, fontFamily]);

  // Filtered fonts for search & category
  const filteredFonts = useMemo(() => {
    return AVAILABLE_FONTS.filter((font) => {
      const matchesCategory = selectedCategory === "all" || font.category === selectedCategory;
      const matchesSearch =
        !fontSearch.trim() ||
        font.name.toLowerCase().includes(fontSearch.toLowerCase()) ||
        font.family.toLowerCase().includes(fontSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, fontSearch]);

  const handleSelectFont = (font: FontDefinition) => {
    ensureFontLoaded(font.family);
    onChangeFontFamily?.(font.family);
    setIsFontDropdownOpen(false);
    setFontSearch("");
  };

  const handleRestoreDetected = () => {
    if (detectedFontName) {
      ensureFontLoaded(detectedFontName);
      onChangeFontFamily?.(detectedFontName);
    }
  };

  return (
    <aside className="w-68 bg-white border-l border-neutral-200 p-4 space-y-6 shrink-0 z-20 overflow-y-auto select-none hidden md:block">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-filora" />
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            {isExtractedText
              ? "Edit Original Text"
              : activeTool === "eraser" || selectedElement?.type === "erase"
              ? "Eraser Tool"
              : "Properties"}
          </h3>
        </div>
        {selectedElement && (
          <button
            onClick={onDeleteSelected}
            className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            title="Delete Selected Item"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        )}
      </div>

      {/* Eraser Quick Help & Sizing */}
      {(activeTool === "eraser" || selectedElement?.type === "erase") && (
        <div className="bg-filora-50/50 p-3 rounded-xl border border-filora-100 space-y-2">
          <div className="flex items-center gap-2 text-filora font-bold text-xs">
            <Eraser className="w-4 h-4" />
            <span>Content Eraser</span>
          </div>
          <p className="text-[11px] text-neutral-600 leading-relaxed">
            Click anywhere on the PDF to place an erase block or drag over text and graphics to
            permanently white out.
          </p>
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs text-neutral-700">
              <span className="font-semibold">Eraser Width</span>
              <span className="font-bold">{strokeWidth * 10}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              step="1"
              value={strokeWidth}
              onChange={(e) => onChangeStrokeWidth(parseInt(e.target.value))}
              className="w-full accent-filora"
            />
          </div>
        </div>
      )}

      {/* Color Palette */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colorPalette.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChangeColor(c)}
              className={`w-6 h-6 rounded-full border-2 transition-transform shadow-xs cursor-pointer ${
                color === c ? "scale-110 border-neutral-900" : "border-neutral-200 hover:scale-105"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Font Family & Typography Controls */}
      {isTextContext && (
        <div className="space-y-3 pt-2 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block">
              Typography & Font
            </label>
            <span className="text-[10px] text-filora font-semibold bg-filora-50 px-1.5 py-0.5 rounded border border-filora-100">
              {AVAILABLE_FONTS.length}+ Fonts
            </span>
          </div>

          {/* Detected PDF Font Card */}
          {detectedFontName && (
            <div className="p-2.5 rounded-xl bg-filora-50/60 border border-filora-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-filora font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Detected Font</span>
                </div>
                {detectedFontName.toLowerCase() !== currentFontFamilyName.toLowerCase() && (
                  <button
                    type="button"
                    onClick={handleRestoreDetected}
                    className="flex items-center gap-1 text-[10px] font-bold text-filora bg-white hover:bg-filora-50 px-1.5 py-0.5 rounded border border-filora-200 shadow-2xs transition-colors cursor-pointer"
                    title="Restore detected original font"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
              <div
                className="text-xs font-bold text-neutral-900 truncate"
                style={{ fontFamily: getFontFamilyCss(detectedFontName) }}
              >
                {detectedFontName}
              </div>
              <p className="text-[10px] text-neutral-500 leading-tight">
                Replaces text with exact matching metrics & style.
              </p>
            </div>
          )}

          {/* Interactive Font Selector Dropdown */}
          {onChangeFontFamily && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                className="w-full flex items-center justify-between p-2 rounded-xl border border-neutral-200 bg-surface-subtle hover:bg-neutral-50 hover:border-filora transition-all text-left cursor-pointer shadow-2xs"
              >
                <div className="truncate mr-2">
                  <div className="text-[10px] uppercase font-bold text-neutral-400">Selected Font</div>
                  <div
                    className="text-xs font-bold text-neutral-900 truncate"
                    style={{ fontFamily: getFontFamilyCss(currentFontFamilyName) }}
                  >
                    {currentFontFamilyName}
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isFontDropdownOpen ? "rotate-180 text-filora" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isFontDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 p-2 space-y-2 max-h-80 flex flex-col">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search fonts..."
                      value={fontSearch}
                      onChange={(e) => setFontSearch(e.target.value)}
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-filora focus:bg-white transition-all"
                      autoFocus
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex gap-1 overflow-x-auto pb-1 text-[10px] font-semibold text-neutral-600 scrollbar-none">
                    {(["all", "sans-serif", "serif", "monospace", "handwriting", "display"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-filora text-white font-bold"
                            : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                        }`}
                      >
                        {cat === "all" ? "All" : cat === "sans-serif" ? "Sans" : cat === "serif" ? "Serif" : cat === "monospace" ? "Mono" : cat === "handwriting" ? "Script" : "Display"}
                      </button>
                    ))}
                  </div>

                  {/* Font List */}
                  <div className="overflow-y-auto space-y-0.5 flex-1 pr-1 max-h-56">
                    {filteredFonts.length === 0 ? (
                      <div className="p-3 text-center text-xs text-neutral-400">
                        No matching fonts found
                      </div>
                    ) : (
                      filteredFonts.map((font) => {
                        const isActive = font.family.toLowerCase() === currentFontFamilyName.toLowerCase();
                        return (
                          <button
                            key={font.id}
                            type="button"
                            onClick={() => handleSelectFont(font)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                              isActive
                                ? "bg-filora-50 text-filora font-bold"
                                : "hover:bg-neutral-100 text-neutral-800"
                            }`}
                          >
                            <div className="truncate mr-2">
                              <span
                                className="text-xs block truncate"
                                style={{ fontFamily: font.cssStack }}
                              >
                                {font.name}
                              </span>
                              <span className="text-[9px] text-neutral-400 uppercase font-semibold">
                                {font.category} {font.popular ? "• Popular" : ""}
                              </span>
                            </div>
                            {isActive && <Check className="w-3.5 h-3.5 text-filora shrink-0" />}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Category Buttons */}
          {onChangeFontFamily && (
            <div className="grid grid-cols-3 gap-1 bg-surface-subtle p-1 rounded-xl border border-neutral-200">
              <button
                type="button"
                onClick={() => {
                  ensureFontLoaded("Arial");
                  onChangeFontFamily("Arial");
                }}
                className={`py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                  fontFamily === "sans-serif" && (!cleanFontFamily || cleanFontFamily.toLowerCase() === "arial")
                    ? "bg-white text-filora shadow-xs font-bold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Sans
              </button>
              <button
                type="button"
                onClick={() => {
                  ensureFontLoaded("Times New Roman");
                  onChangeFontFamily("Times New Roman");
                }}
                className={`py-1 text-[11px] font-semibold rounded-lg font-serif transition-colors cursor-pointer ${
                  fontFamily === "serif"
                    ? "bg-white text-filora shadow-xs font-bold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Serif
              </button>
              <button
                type="button"
                onClick={() => {
                  ensureFontLoaded("Courier New");
                  onChangeFontFamily("Courier New");
                }}
                className={`py-1 text-[11px] font-semibold rounded-lg font-mono transition-colors cursor-pointer ${
                  fontFamily === "monospace"
                    ? "bg-white text-filora shadow-xs font-bold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Mono
              </button>
            </div>
          )}

          {/* Bold / Italic Toggles */}
          {(onToggleBold || onToggleItalic) && (
            <div className="flex items-center gap-1.5">
              {onToggleBold && (
                <button
                  type="button"
                  onClick={onToggleBold}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    fontWeight === "bold"
                      ? "bg-filora-50 border-filora text-filora shadow-xs"
                      : "bg-surface-subtle border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <Bold className="w-3.5 h-3.5" />
                  <span>Bold</span>
                </button>
              )}
              {onToggleItalic && (
                <button
                  type="button"
                  onClick={onToggleItalic}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    fontStyle === "italic"
                      ? "bg-filora-50 border-filora text-filora shadow-xs"
                      : "bg-surface-subtle border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <Italic className="w-3.5 h-3.5" />
                  <span>Italic</span>
                </button>
              )}
            </div>
          )}

          {/* Font Size Slider with +/- Buttons */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs text-neutral-700">
              <span className="font-semibold">Font Size</span>
              <div className="flex items-center gap-1 bg-neutral-100 px-1 py-0.5 rounded-md border border-neutral-200">
                <button
                  type="button"
                  onClick={() => onChangeFontSize(Math.max(6, fontSize - 1))}
                  className="p-0.5 text-neutral-600 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                  title="Decrease size"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold text-neutral-900 px-1 text-[11px] min-w-[24px] text-center">
                  {fontSize}px
                </span>
                <button
                  type="button"
                  onClick={() => onChangeFontSize(Math.min(96, fontSize + 1))}
                  className="p-0.5 text-neutral-600 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                  title="Increase size"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <input
              type="range"
              min="8"
              max="72"
              step="1"
              value={fontSize}
              onChange={(e) => onChangeFontSize(parseInt(e.target.value))}
              className="w-full accent-filora"
            />
          </div>
        </div>
      )}

      {/* Textbox Position & Dimensions (Move & Size) */}
      {selectedElement && (selectedElement.type === "text" || isExtractedText || selectedElement.type === "shape" || selectedElement.type === "erase") && (
        <div className="space-y-3 pt-2 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
              <Move className="w-3.5 h-3.5 text-filora" />
              <span>Position & Size</span>
            </div>
            {onCenterHorizontal && (
              <button
                type="button"
                onClick={onCenterHorizontal}
                className="text-[10px] font-bold text-filora bg-filora-50 hover:bg-filora-100 px-2 py-0.5 rounded border border-filora-200 transition-colors cursor-pointer"
                title="Center box horizontally on page"
              >
                Center
              </button>
            )}
          </div>

          {/* Position (X & Y) */}
          {(onChangeX || onChangeY) && (
            <div className="grid grid-cols-2 gap-2">
              {/* Pos X */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-neutral-500">Position X</span>
                <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => onChangeX?.(Math.max(0, (selectedElement.x || 0) - 10))}
                    className="p-1 text-neutral-500 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                    title="Move left 10px"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="number"
                    value={Math.round(selectedElement.x || 0)}
                    onChange={(e) => onChangeX?.(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-center font-bold text-xs bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => onChangeX?.(Math.min(550, (selectedElement.x || 0) + 10))}
                    className="p-1 text-neutral-500 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                    title="Move right 10px"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Pos Y */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-neutral-500">Position Y</span>
                <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => onChangeY?.(Math.max(0, (selectedElement.y || 0) - 10))}
                    className="p-1 text-neutral-500 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                    title="Move up 10px"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="number"
                    value={Math.round(selectedElement.y || 0)}
                    onChange={(e) => onChangeY?.(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-center font-bold text-xs bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => onChangeY?.(Math.min(750, (selectedElement.y || 0) + 10))}
                    className="p-1 text-neutral-500 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                    title="Move down 10px"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dimensions (Width & Height) */}
          {(onChangeWidth || onChangeHeight) && (
            <div className="grid grid-cols-2 gap-2">
              {/* Width */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-neutral-500">Width</span>
                <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => onChangeWidth?.(Math.max(40, (selectedElement.width || 200) - 20))}
                    className="p-1 text-neutral-500 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                    title="Collapse width"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="number"
                    value={Math.round(selectedElement.width || 200)}
                    onChange={(e) => onChangeWidth?.(Math.max(40, parseInt(e.target.value) || 40))}
                    className="w-full text-center font-bold text-xs bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => onChangeWidth?.((selectedElement.width || 200) + 20)}
                    className="p-1 text-neutral-500 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                    title="Expand width"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Height */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-neutral-500">Height</span>
                <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => onChangeHeight?.(Math.max(24, (selectedElement.height || 52) - 10))}
                    className="p-1 text-neutral-500 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                    title="Collapse height"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="number"
                    value={Math.round(selectedElement.height || 52)}
                    onChange={(e) => onChangeHeight?.(Math.max(24, parseInt(e.target.value) || 24))}
                    className="w-full text-center font-bold text-xs bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => onChangeHeight?.((selectedElement.height || 52) + 10)}
                    className="p-1 text-neutral-500 hover:text-filora hover:bg-white rounded transition-colors cursor-pointer"
                    title="Expand height"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p-2 bg-neutral-50 rounded-lg border border-neutral-150 text-[10px] text-neutral-500 space-y-1">
            <div className="font-semibold text-neutral-700 flex items-center gap-1">
              <span>✨ Moving tips:</span>
            </div>
            <ul className="list-disc pl-3.5 space-y-0.5 leading-tight">
              <li>Drag <strong>any border edge</strong> or the <strong>Move</strong> button</li>
              <li>Use <strong>Arrow keys</strong> (←, ↑, ↓, →) to nudge (hold <strong>Shift</strong> for 10px)</li>
              <li>Press <strong>Esc</strong> to blur text entry and nudge with keys</li>
            </ul>
          </div>
        </div>
      )}

      {/* Stroke Width (if Draw/Shape/Highlight) */}
      {(activeTool === "draw" || activeTool === "highlight" || activeTool === "shape") && (
        <div className="space-y-1.5 pt-2 border-t border-neutral-100">
          <div className="flex justify-between text-xs text-neutral-700">
            <span className="font-semibold">Line Thickness</span>
            <span className="font-bold">{strokeWidth}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="24"
            step="1"
            value={strokeWidth}
            onChange={(e) => onChangeStrokeWidth(parseInt(e.target.value))}
            className="w-full accent-filora"
          />
        </div>
      )}

      {/* Opacity */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-neutral-700">
          <span className="font-semibold">Opacity</span>
          <span className="font-bold">{Math.round(opacity * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => onChangeOpacity(parseFloat(e.target.value))}
          className="w-full accent-filora"
        />
      </div>

      {/* Shape Selector */}
      {activeTool === "shape" && (
        <div className="space-y-2 pt-2 border-t border-neutral-100">
          <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block">
            Shape Style
          </label>
          <div className="grid grid-cols-3 gap-1 bg-surface-subtle p-1 rounded-xl border border-neutral-200">
            <button
              onClick={() => onChangeShapeType("rect")}
              className={`py-1 text-xs font-semibold rounded-lg cursor-pointer ${
                shapeType === "rect" ? "bg-white text-filora shadow-xs font-bold" : "text-neutral-600"
              }`}
            >
              Rect
            </button>
            <button
              onClick={() => onChangeShapeType("circle")}
              className={`py-1 text-xs font-semibold rounded-lg cursor-pointer ${
                shapeType === "circle" ? "bg-white text-filora shadow-xs font-bold" : "text-neutral-600"
              }`}
            >
              Circle
            </button>
            <button
              onClick={() => onChangeShapeType("line")}
              className={`py-1 text-xs font-semibold rounded-lg cursor-pointer ${
                shapeType === "line" ? "bg-white text-filora shadow-xs font-bold" : "text-neutral-600"
              }`}
            >
              Line
            </button>
          </div>
        </div>
      )}

      {/* Stamp Presets */}
      {activeTool === "stamp" && (
        <div className="space-y-2 pt-2 border-t border-neutral-100">
          <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block">
            Stamp Label
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {stamps.map((st) => (
              <button
                key={st}
                onClick={() => onChangeStampText(st)}
                className={`px-2 py-1.5 rounded-lg border text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                  stampText === st
                    ? "bg-filora-50 border-filora text-filora"
                    : "bg-surface-subtle border-neutral-200 text-neutral-700 hover:border-neutral-300"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
