"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { EditorTool } from "./EditorSidebar";
import { ExtractedTextItem } from "@/lib/pdf-engine/pdf-render";
import { getFontFamilyCss } from "@/lib/pdf-engine/font-manager";
import { Trash2, GripVertical, Minimize2, Move, Sparkles, Download, ArrowRight } from "lucide-react";
import { ResizeHandles, ResizeDirection } from "./ResizeHandles";

/**
 * PageBackgroundPatch
 * Covers the original text on the PDF raster bitmap using its exact sampled background color.
 * Eliminates any visible white box.
 */
function PageBackgroundPatch({
  item,
}: {
  item: ExtractedTextItem;
}) {
  const bg = item.bgColor || "#ffffff";
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${(item.origX ?? item.x) - 2}px`,
        top: `${(item.origY ?? item.y) - 2}px`,
        width: `${(item.origWidth ?? item.width) + 4}px`,
        height: `${(item.origHeight ?? item.height) + 4}px`,
        backgroundColor: bg,
        zIndex: 12,
      }}
    />
  );
}

export interface AnnotationItem {
  id: string;
  pageIndex: number;
  type: "text" | "draw" | "highlight" | "shape" | "stamp" | "signature" | "note" | "erase";
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  color: string;
  fontSize?: number;
  fontFamily?: string;
  cleanFontFamily?: string;
  cssFontStack?: string;
  fontWeight?: string;
  fontStyle?: string;
  strokeWidth?: number;
  opacity?: number;
  shapeType?: "rect" | "circle" | "line";
  points?: { x: number; y: number }[];
  dataUrl?: string;
}

interface EditorCanvasProps {
  pageDataUrl: string | null;
  currentPage: number;
  zoom: number;
  activeTool: EditorTool;
  color: string;
  fontSize: number;
  strokeWidth: number;
  opacity: number;
  shapeType: "rect" | "circle" | "line";
  stampText: string;
  annotations: AnnotationItem[];
  extractedTextItems: ExtractedTextItem[];
  selectedId: string | null;
  onSelectElement: (id: string | null) => void;
  onAddAnnotation: (item: AnnotationItem) => void;
  onUpdateAnnotation: (id: string, updates: Partial<AnnotationItem>, addToHistory?: boolean) => void;
  onDeleteAnnotation: (id: string) => void;
  onUpdateExtractedText: (id: string, updates: Partial<ExtractedTextItem>, addToHistory?: boolean) => void;
  onDeleteExtractedText: (id: string) => void;
  onOpenSignatureModal: () => void;
  onExportPdf?: () => void;
}

export function EditorCanvas({
  pageDataUrl,
  currentPage,
  zoom,
  activeTool,
  color,
  fontSize,
  strokeWidth,
  opacity,
  shapeType,
  stampText,
  annotations,
  extractedTextItems,
  selectedId,
  onSelectElement,
  onAddAnnotation,
  onUpdateAnnotation,
  onDeleteAnnotation,
  onUpdateExtractedText,
  onDeleteExtractedText,
  onOpenSignatureModal,
  onExportPdf,
}: EditorCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [draggingType, setDraggingType] = useState<"annotation" | "extracted" | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredTextId, setHoveredTextId] = useState<string | null>(null);

  interface ActiveResize {
    id: string;
    type: "annotation" | "extracted";
    handle: ResizeDirection;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
  }
  const [resizing, setResizing] = useState<ActiveResize | null>(null);

  const pageAnnotations = annotations.filter((a) => a.pageIndex === currentPage - 1);
  const pageExtractedTexts = extractedTextItems.filter((t) => t.pageIndex === currentPage - 1);

  const getCanvasCoords = useCallback(
    (e: React.MouseEvent<any> | MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: (e.clientX - rect.left) / zoom,
        y: (e.clientY - rect.top) / zoom,
      };
    },
    [zoom]
  );

  // Global window listeners for silky-smooth drag & resize without losing focus when mouse leaves canvas
  useEffect(() => {
    if (!resizing && !draggingId) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const coords = getCanvasCoords(e);

      if (resizing) {
        const dx = coords.x - resizing.startX;
        const dy = coords.y - resizing.startY;

        let newX = resizing.initialX;
        let newY = resizing.initialY;
        let newWidth = resizing.initialWidth;
        let newHeight = resizing.initialHeight;

        const minW = 40;
        const minH = 24;

        if (resizing.handle.includes("e")) {
          newWidth = Math.max(minW, Math.round(resizing.initialWidth + dx));
        }
        if (resizing.handle.includes("w")) {
          const rawW = resizing.initialWidth - dx;
          newWidth = Math.max(minW, Math.round(rawW));
          newX = Math.round(resizing.initialX + (resizing.initialWidth - newWidth));
        }
        if (resizing.handle.includes("s")) {
          newHeight = Math.max(minH, Math.round(resizing.initialHeight + dy));
        }
        if (resizing.handle.includes("n")) {
          const rawH = resizing.initialHeight - dy;
          newHeight = Math.max(minH, Math.round(rawH));
          newY = Math.round(resizing.initialY + (resizing.initialHeight - newHeight));
        }

        if (resizing.type === "extracted") {
          onUpdateExtractedText(
            resizing.id,
            { x: newX, y: newY, width: newWidth, height: newHeight, isEdited: true },
            false
          );
        } else {
          onUpdateAnnotation(
            resizing.id,
            { x: newX, y: newY, width: newWidth, height: newHeight },
            false
          );
        }
      } else if (draggingId) {
        const newX = Math.round(coords.x - dragOffset.x);
        const newY = Math.round(coords.y - dragOffset.y);
        if (draggingType === "extracted") {
          onUpdateExtractedText(draggingId, { x: newX, y: newY, isEdited: true }, false);
        } else {
          onUpdateAnnotation(draggingId, { x: newX, y: newY }, false);
        }
      }
    };

    const handleWindowMouseUp = () => {
      if (resizing) {
        if (resizing.type === "extracted") {
          onUpdateExtractedText(resizing.id, { isEdited: true }, true);
        } else {
          onUpdateAnnotation(resizing.id, {}, true);
        }
        setResizing(null);
      }
      if (draggingId) {
        if (draggingType === "extracted") {
          onUpdateExtractedText(draggingId, { isEdited: true }, true);
        } else {
          onUpdateAnnotation(draggingId, {}, true);
        }
        setDraggingId(null);
        setDraggingType(null);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [
    resizing,
    draggingId,
    dragOffset,
    draggingType,
    getCanvasCoords,
    onUpdateAnnotation,
    onUpdateExtractedText,
  ]);

  // Keyboard navigation & fine-tuned movement (Arrow keys to move, Escape to blur text)
  useEffect(() => {
    if (!selectedId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") {
        if (e.key === "Escape") {
          (document.activeElement as HTMLElement)?.blur();
        }
        return;
      }

      if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown"
      ) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
        const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;

        const annot = annotations.find((a) => a.id === selectedId);
        if (annot) {
          onUpdateAnnotation(annot.id, { x: Math.max(0, annot.x + dx), y: Math.max(0, annot.y + dy) }, true);
          return;
        }

        const ext = extractedTextItems.find((t) => t.id === selectedId);
        if (ext) {
          onUpdateExtractedText(ext.id, { x: Math.max(0, ext.x + dx), y: Math.max(0, ext.y + dy), isEdited: true }, true);
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, annotations, extractedTextItems, onUpdateAnnotation, onUpdateExtractedText]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const coords = getCanvasCoords(e);

    if (activeTool === "draw" || activeTool === "highlight") {
      setIsDrawing(true);
      setCurrentPath([coords]);
    } else if (activeTool === "eraser") {
      const eraseItem: AnnotationItem = {
        id: Math.random().toString(36).substring(2, 9),
        pageIndex: currentPage - 1,
        type: "erase",
        x: coords.x - 20,
        y: coords.y - 12,
        width: Math.max(40, strokeWidth * 5),
        height: Math.max(24, strokeWidth * 3),
        color: "#FFFFFF",
        opacity: 1.0,
      };
      onAddAnnotation(eraseItem);
      onSelectElement(eraseItem.id);
    } else if (activeTool === "text") {
      const textItem: AnnotationItem = {
        id: Math.random().toString(36).substring(2, 9),
        pageIndex: currentPage - 1,
        type: "text",
        x: coords.x,
        y: coords.y,
        width: 200,
        height: 52,
        text: "Type text here...",
        color,
        fontSize,
        opacity,
      };
      onAddAnnotation(textItem);
      onSelectElement(textItem.id);
    } else if (activeTool === "stamp") {
      const stampItem: AnnotationItem = {
        id: Math.random().toString(36).substring(2, 9),
        pageIndex: currentPage - 1,
        type: "stamp",
        x: coords.x - 60,
        y: coords.y - 20,
        text: stampText,
        color,
        fontSize: Math.max(16, fontSize),
        opacity: Math.max(0.7, opacity),
      };
      onAddAnnotation(stampItem);
      onSelectElement(stampItem.id);
    } else if (activeTool === "shape") {
      const shapeItem: AnnotationItem = {
        id: Math.random().toString(36).substring(2, 9),
        pageIndex: currentPage - 1,
        type: "shape",
        x: coords.x,
        y: coords.y,
        width: 120,
        height: 70,
        shapeType,
        color,
        strokeWidth,
        opacity,
      };
      onAddAnnotation(shapeItem);
      onSelectElement(shapeItem.id);
    } else if (activeTool === "signature") {
      onOpenSignatureModal();
    } else if (activeTool === "select" || activeTool === "edit_text") {
      if (e.target === containerRef.current || (e.target as HTMLElement).tagName === "IMG") {
        onSelectElement(null);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing && (activeTool === "draw" || activeTool === "highlight")) {
      const coords = getCanvasCoords(e);
      setCurrentPath((prev) => [...prev, coords]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentPath.length > 1) {
      const pathItem: AnnotationItem = {
        id: Math.random().toString(36).substring(2, 9),
        pageIndex: currentPage - 1,
        type: activeTool === "highlight" ? "highlight" : "draw",
        x: 0,
        y: 0,
        points: currentPath,
        color: activeTool === "highlight" ? "#FBBF24" : color,
        strokeWidth: activeTool === "highlight" ? 18 : strokeWidth,
        opacity: activeTool === "highlight" ? 0.35 : opacity,
      };
      onAddAnnotation(pathItem);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const startResize = (
    e: React.MouseEvent,
    id: string,
    type: "annotation" | "extracted",
    handle: ResizeDirection,
    currentX: number,
    currentY: number,
    currentWidth: number,
    currentHeight: number
  ) => {
    e.stopPropagation();
    e.preventDefault();
    onSelectElement(id);
    const coords = getCanvasCoords(e);
    setResizing({
      id,
      type,
      handle,
      startX: coords.x,
      startY: coords.y,
      initialX: currentX,
      initialY: currentY,
      initialWidth: currentWidth,
      initialHeight: currentHeight,
    });
  };

  const startDragElement = (e: React.MouseEvent, item: AnnotationItem) => {
    e.stopPropagation();
    onSelectElement(item.id);
    const coords = getCanvasCoords(e);
    setDraggingId(item.id);
    setDraggingType("annotation");
    setDragOffset({
      x: coords.x - item.x,
      y: coords.y - item.y,
    });
  };

  const startDragExtracted = (e: React.MouseEvent, item: ExtractedTextItem) => {
    e.stopPropagation();
    onSelectElement(item.id);
    const coords = getCanvasCoords(e);
    setDraggingId(item.id);
    setDraggingType("extracted");
    setDragOffset({
      x: coords.x - item.x,
      y: coords.y - item.y,
    });
  };

  return (
    <div
      className="flex-1 bg-surface-subtle overflow-auto p-6 sm:p-10 flex flex-col items-center select-none"
      style={{ minHeight: 0 }}
    >
      {/* Highlighted Notice Above Current Editing Page */}
      <div
        className="mb-4 shrink-0 transition-all select-none"
        style={{
          width: `${612 * zoom}px`,
          maxWidth: "100%",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2.5 bg-gradient-to-r from-amber-50 via-filora-50/60 to-amber-50/80 border border-amber-200/90 rounded-2xl shadow-xs text-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-xs leading-relaxed text-neutral-800">
              <span className="font-bold text-amber-900">Notice: </span>
              <span>For the final preview, press the </span>
              <span className="inline-flex items-center gap-1 font-bold text-filora bg-white px-2 py-0.5 rounded-lg border border-filora-200 shadow-2xs mx-0.5">
                <Download className="w-3 h-3 text-filora" />
                Export PDF
              </span>
              <span> button for final result.</span>
            </div>
          </div>

          {onExportPdf && (
            <button
              type="button"
              onClick={onExportPdf}
              className="shrink-0 px-3.5 py-1.5 bg-filora hover:bg-filora-700 active:bg-filora-800 text-white rounded-xl text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer group"
              title="Open final preview and export PDF"
            >
              <span>Export PDF</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Sizing wrapper keeps the full document bounds scrollable and anchored without top cropping */}
      <div
        style={{
          width: `${612 * zoom}px`,
          minHeight: `${792 * zoom}px`,
          position: "relative",
          margin: "0 auto",
          flexShrink: 0,
        }}
      >
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative bg-white shadow-editor rounded-lg overflow-hidden border border-neutral-200"
          style={{
            width: "612px",
            minHeight: "792px",
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            cursor:
              activeTool === "draw" || activeTool === "highlight"
                ? "crosshair"
                : activeTool === "eraser"
                ? "cell"
                : activeTool === "text"
                ? "text"
                : activeTool === "edit_text"
                ? "text"
                : activeTool === "shape"
                ? "crosshair"
                : "default",
          }}
        >
          {/* BASE DOCUMENT PAGE RASTER BITMAP */}
          {pageDataUrl ? (
            <img
              src={pageDataUrl}
              alt={`Page ${currentPage}`}
              draggable={false}
              className="block pointer-events-none select-none"
              style={{ width: "612px", minHeight: "792px" }}
            />
          ) : (
            <div className="w-[612px] h-[792px] bg-white flex items-center justify-center text-neutral-300 text-sm">
              Loading document page...
            </div>
          )}

          {/* 1. ORIGINAL TEXT MASKS — matching background color so there is no white box */}
          {pageExtractedTexts
            .filter((item) => item.isEdited || item.isDeleted)
            .map((item) => (
              <PageBackgroundPatch
                key={`orig_mask_${item.id}`}
                item={item}
              />
            ))}

          {/* 2. IN-PAGE ORIGINAL TEXT EDITING LAYER */}
          {pageExtractedTexts
            .filter((item) => !item.isDeleted)
            .map((item) => {
              const isSelected = selectedId === item.id;
              const isHovered = hoveredTextId === item.id;
              const isEditTextMode = activeTool === "edit_text" || activeTool === "select";

              const fontFam =
                item.cssFontStack ||
                getFontFamilyCss(item.cleanFontFamily, item.fontFamily);

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredTextId(item.id)}
                  onMouseLeave={() => setHoveredTextId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isEditTextMode) {
                      onSelectElement(item.id);
                    }
                  }}
                  className={`absolute rounded-xs ${
                    resizing?.id === item.id || draggingId === item.id ? "transition-none" : "transition-all"
                  } ${
                    isSelected && isEditTextMode
                      ? "z-25 ring-2 ring-filora shadow-xs"
                      : isEditTextMode && isHovered
                      ? "border border-dashed border-filora-500 bg-filora-500/10 z-20 cursor-text"
                      : "z-13"
                  }`}
                  style={{
                    left: `${item.x - 2}px`,
                    top: `${item.y - 2}px`,
                    width: `${item.width + 4}px`,
                    height: `${item.height + 4}px`,
                    backgroundColor: isSelected && isEditTextMode ? (item.bgColor || "#ffffff") : "transparent",
                  }}
                >
                  {/* Background backing matching PDF while actively editing */}
                  {isSelected && isEditTextMode && (
                    <div
                      className="absolute inset-0 -z-10 rounded-xs pointer-events-none"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: item.bgColor || "#ffffff",
                      }}
                    />
                  )}

                  {isSelected && isEditTextMode ? (
                    /* EDITING: live textarea with matching background and font */
                    <textarea
                      autoFocus
                      value={item.text}
                      onChange={(e) => {
                        onUpdateExtractedText(
                          item.id,
                          { text: e.target.value, isEdited: true },
                          false
                        );
                      }}
                      onBlur={(e) => {
                        onUpdateExtractedText(
                          item.id,
                          { text: e.target.value, isEdited: true },
                          true
                        );
                        setTimeout(() => onSelectElement(null), 80);
                      }}
                      className="px-1 py-0.5 outline-none leading-normal select-text resize-none border-0 w-full h-full block overflow-auto break-words relative z-10"
                      style={{
                        backgroundColor: item.bgColor || "#ffffff",
                        color: item.color || "#171717",
                        fontSize: `${item.fontSize}px`,
                        fontFamily: fontFam,
                        fontWeight: item.fontWeight === "bold" ? "bold" : "normal",
                        fontStyle: item.fontStyle === "italic" ? "italic" : "normal",
                      }}
                    />
                  ) : item.isEdited ? (
                    /* EDITED & DESELECTED: crisp typography matching original font, size, and sampled color */
                    <div
                      className="px-1 py-0.5 leading-normal select-text whitespace-pre-wrap w-full h-full break-words"
                      style={{
                        color: item.color || "#171717",
                        fontSize: `${item.fontSize}px`,
                        fontFamily: fontFam,
                        fontWeight: item.fontWeight === "bold" ? "bold" : "normal",
                        fontStyle: item.fontStyle === "italic" ? "italic" : "normal",
                      }}
                    >
                      {item.text}
                    </div>
                  ) : (
                    /* UNEDITED & NOT SELECTED: transparent spacer — native PDF raster shows through */
                    <div
                      className="px-1 py-0.5 leading-normal select-none whitespace-pre-wrap w-full h-full"
                      style={{
                        color: "transparent",
                        fontSize: `${item.fontSize}px`,
                        fontFamily: fontFam,
                      }}
                    >
                      {item.text}
                    </div>
                  )}

                  {/* 8-Directional Expand / Collapse Handles for Extracted Text in Edit Mode */}
                  {isSelected && isEditTextMode && (
                    <ResizeHandles
                      onStartResize={(e, dir) =>
                        startResize(e, item.id, "extracted", dir, item.x, item.y, item.width, item.height)
                      }
                      onStartDrag={(e) => startDragExtracted(e, item)}
                      width={item.width}
                      height={item.height}
                      isResizing={resizing?.id === item.id}
                    />
                  )}

                {/* Drag Handle & Delete Controls */}
                {isEditTextMode && (isSelected || isHovered) && (
                  <div className="absolute -top-7 left-0 flex items-center gap-1 bg-white border border-neutral-200 rounded-md shadow-md px-1.5 py-0.5 z-40">
                    <div
                      onMouseDown={(e) => startDragExtracted(e, item)}
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-filora-50 hover:bg-filora-100 text-filora cursor-grab active:cursor-grabbing font-bold text-[10px] select-none border border-filora-200/80 transition-colors"
                      title="Click and drag to move text anywhere"
                    >
                      <Move className="w-3 h-3 text-filora" />
                      <span>Move</span>
                    </div>

                    {item.cleanFontFamily && (
                      <span
                        className="text-[10px] font-semibold text-filora bg-filora-50 px-1.5 py-0.5 rounded border border-filora-100 max-w-[130px] truncate select-none"
                        title={`Font: ${item.cleanFontFamily} (${item.fontWeight === "bold" ? "Bold" : "Normal"})`}
                      >
                        {item.cleanFontFamily}
                      </span>
                    )}

                    <div className="h-3 w-px bg-neutral-200" />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteExtractedText(item.id);
                      }}
                      className="p-0.5 text-neutral-500 hover:text-rose-600 rounded flex items-center gap-1 text-[10px] font-bold"
                      title="Delete this text from PDF"
                    >
                      <Trash2 className="w-3 h-3 text-rose-500" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        {/* 3. VECTOR SVG LAYER FOR FREEHAND PEN AND HIGHLIGHTS */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: "100%", height: "100%", zIndex: 15 }}
        >
          {pageAnnotations
            .filter((a) => a.type === "draw" || a.type === "highlight")
            .map((item) => {
              if (!item.points || item.points.length === 0) return null;
              const d = item.points.reduce(
                (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
                ""
              );
              return (
                <path
                  key={item.id}
                  d={d}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={item.strokeWidth || 3}
                  strokeOpacity={item.opacity || 1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}

          {/* Current In-progress Path */}
          {currentPath.length > 1 && (
            <path
              d={currentPath.reduce(
                (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
                ""
              )}
              fill="none"
              stroke={activeTool === "highlight" ? "#FBBF24" : color}
              strokeWidth={activeTool === "highlight" ? 18 : strokeWidth}
              strokeOpacity={activeTool === "highlight" ? 0.35 : opacity}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>

        {/* 4. INTERACTIVE ANNOTATION OVERLAYS, TEXTBOXES & ERASERS */}
        {pageAnnotations
          .filter((a) => a.type !== "draw" && a.type !== "highlight")
          .map((item) => {
            const isSelected = selectedId === item.id;
            const isText = item.type === "text";
            const isShape = item.type === "shape";
            const isErase = item.type === "erase";

            const boxWidth = item.width || (isText ? 200 : isShape ? 120 : 60);
            const boxHeight = item.height || (isText ? 52 : isShape ? 70 : 36);

            const isCurrentResizing = resizing?.id === item.id;
            const isCurrentDragging = draggingId === item.id;

            const fontFam =
              item.cssFontStack ||
              getFontFamilyCss(item.cleanFontFamily || item.fontFamily, item.fontFamily);

            return (
              <div
                key={item.id}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  onSelectElement(item.id);
                  if (!isSelected || activeTool === "select" || isShape || isErase) {
                    startDragElement(e, item);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement(item.id);
                }}
                className={`absolute ${
                  isCurrentResizing || isCurrentDragging ? "transition-none" : "transition-shadow"
                } ${
                  item.type === "erase"
                    ? "bg-white border border-dashed border-neutral-300 hover:border-filora z-20 shadow-xs cursor-move"
                    : item.type === "text"
                    ? isSelected
                      ? "ring-2 ring-filora ring-offset-1 z-30 bg-white/95 rounded-lg shadow-md"
                      : "z-20 hover:ring-1 hover:ring-filora-300 rounded-lg cursor-grab active:cursor-grabbing"
                    : isSelected
                    ? "ring-2 ring-filora ring-offset-1 z-30 cursor-move"
                    : "z-20 hover:ring-1 hover:ring-filora-300 cursor-move"
                }`}
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  width: isText || isShape || isErase ? `${boxWidth}px` : item.width ? `${item.width}px` : undefined,
                  height: isText || isShape || isErase ? `${boxHeight}px` : item.height ? `${item.height}px` : undefined,
                  opacity: item.opacity ?? 1,
                }}
              >
                {/* Textbox Floating Header: Move Button, Dimensions, Auto-Fit & Delete */}
                {item.type === "text" && (
                  <div
                    onMouseDown={(e) => {
                      if ((e.target as HTMLElement).tagName !== "BUTTON" && !(e.target as HTMLElement).closest("button")) {
                        startDragElement(e, item);
                      }
                    }}
                    className={`absolute -top-8 left-0 flex items-center gap-1.5 bg-white border border-neutral-200 rounded-md shadow-md px-2 py-0.5 z-40 cursor-grab active:cursor-grabbing transition-opacity ${
                      isSelected ? "opacity-100" : "opacity-0 hover:opacity-100"
                    }`}
                  >
                    <div
                      onMouseDown={(e) => startDragElement(e, item)}
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-filora-50 hover:bg-filora-100 text-filora cursor-grab active:cursor-grabbing font-bold text-[10px] select-none border border-filora-200/80 transition-colors"
                      title="Click and drag to move textbox anywhere on page"
                    >
                      <Move className="w-3 h-3 text-filora" />
                      <span>Move</span>
                    </div>

                    <span className="text-[10px] text-neutral-400 font-mono select-none px-0.5">
                      {Math.round(boxWidth)}×{Math.round(boxHeight)}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const lines = (item.text || "").split("\n");
                        const maxLineLen = Math.max(...lines.map((l) => l.length), 6);
                        const approxCharWidth = (item.fontSize || 16) * 0.6;
                        const fitWidth = Math.max(80, Math.min(550, Math.round(maxLineLen * approxCharWidth + 24)));
                        const fitHeight = Math.max(36, Math.round(lines.length * (item.fontSize || 16) * 1.35 + 20));
                        onUpdateAnnotation(item.id, { width: fitWidth, height: fitHeight }, true);
                      }}
                      className="p-0.5 text-neutral-500 hover:text-filora rounded flex items-center gap-1 text-[10px] font-medium"
                      title="Auto-collapse/fit textbox to text"
                    >
                      <Minimize2 className="w-3 h-3 text-filora" />
                      <span>Auto-fit</span>
                    </button>

                    <div className="h-3 w-px bg-neutral-200" />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteAnnotation(item.id);
                      }}
                      className="p-0.5 text-neutral-500 hover:text-rose-600 rounded flex items-center gap-1 text-[10px] font-bold"
                      title="Delete textbox"
                    >
                      <Trash2 className="w-3 h-3 text-rose-500" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}

                {/* Erase Mask */}
                {item.type === "erase" && (
                  <div
                    onMouseDown={(e) => startDragElement(e, item)}
                    className="w-full h-full bg-white relative group"
                  >
                    <span className="text-[9px] text-neutral-300 absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                      Erase
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteAnnotation(item.id);
                      }}
                      className="hidden group-hover:block absolute -top-2 -right-2 p-0.5 bg-rose-600 text-white rounded-full text-[9px]"
                      title="Delete erase box"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Text Block Content (Stable Caret & Responsive Word Wrap) */}
                {item.type === "text" && (
                  <div className="w-full h-full relative">
                    {isSelected ? (
                      <textarea
                        autoFocus
                        value={item.text || ""}
                        onChange={(e) =>
                          onUpdateAnnotation(item.id, { text: e.target.value })
                        }
                        className="w-full h-full p-2 rounded-lg bg-transparent outline-none resize-none border-0 block overflow-auto leading-normal break-words select-text"
                        style={{
                          color: item.color,
                          fontSize: `${item.fontSize || 16}px`,
                          fontFamily: fontFam,
                          fontWeight: item.fontWeight === "bold" ? "bold" : 600,
                          fontStyle: item.fontStyle === "italic" ? "italic" : "normal",
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full p-2 rounded-lg bg-transparent outline-none whitespace-pre-wrap leading-normal overflow-hidden break-words select-none"
                        style={{
                          color: item.color,
                          fontSize: `${item.fontSize || 16}px`,
                          fontFamily: fontFam,
                          fontWeight: item.fontWeight === "bold" ? "bold" : 600,
                          fontStyle: item.fontStyle === "italic" ? "italic" : "normal",
                        }}
                      >
                        {item.text || "Type text here..."}
                      </div>
                    )}
                  </div>
                )}

                {/* Stamp */}
                {item.type === "stamp" && (
                  <div
                    onMouseDown={(e) => startDragElement(e, item)}
                    className="px-3 py-1.5 rounded-lg border-2 font-black tracking-widest uppercase text-center transform -rotate-6 shadow-xs select-none"
                    style={{
                      borderColor: item.color,
                      color: item.color,
                      fontSize: `${item.fontSize || 18}px`,
                    }}
                  >
                    {item.text}
                  </div>
                )}

                {/* Shape */}
                {item.type === "shape" && (
                  <div
                    onMouseDown={(e) => startDragElement(e, item)}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderColor: item.color,
                      borderWidth: `${item.strokeWidth || 3}px`,
                      borderRadius: item.shapeType === "circle" ? "9999px" : "8px",
                      backgroundColor: "transparent",
                    }}
                  />
                )}

                {/* Signature Image */}
                {item.type === "signature" && item.dataUrl && (
                  <img
                    onMouseDown={(e) => startDragElement(e, item)}
                    src={item.dataUrl}
                    alt="Signature"
                    className="h-12 w-auto pointer-events-none"
                  />
                )}

                {/* 8-Directional Expand / Collapse Handles from All Sides & Move Borders */}
                {isSelected && (isText || isShape || isErase) && (
                  <ResizeHandles
                    onStartResize={(e, dir) =>
                      startResize(e, item.id, "annotation", dir, item.x, item.y, boxWidth, boxHeight)
                    }
                    onStartDrag={(e) => startDragElement(e, item)}
                    width={boxWidth}
                    height={boxHeight}
                    isResizing={isCurrentResizing}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
