"use client";

import { useEffect, useRef, useState } from "react";
import { Download, X, ChevronLeft, ChevronRight, Loader2, Eye } from "lucide-react";
import { AnnotationItem } from "./EditorCanvas";
import { ExtractedTextItem } from "@/lib/pdf-engine/pdf-render";
import { getFontFamilyCss } from "@/lib/pdf-engine/font-manager";

interface ExportPreviewModalProps {
  isOpen: boolean;
  pageThumbnails: string[];
  annotations: AnnotationItem[];
  extractedTextMap: Record<number, ExtractedTextItem[]>;
  fileName: string;
  onClose: () => void;
  onConfirmDownload: () => void;
}

export function ExportPreviewModal({
  isOpen,
  pageThumbnails,
  annotations,
  extractedTextMap,
  fileName,
  onClose,
  onConfirmDownload,
}: ExportPreviewModalProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isRendering, setIsRendering] = useState(false);
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0);

  // Render all pages to preview data-URLs using the same canvas pipeline as real export
  useEffect(() => {
    if (!isOpen || pageThumbnails.length === 0) return;

    const render = async () => {
      setIsRendering(true);
      setPreviewUrls([]);
      setCurrentPreviewPage(0);

      try {
        if (typeof document !== "undefined" && document.fonts?.ready) {
          await document.fonts.ready;
        }

        const urls: string[] = [];

        for (let i = 0; i < pageThumbnails.length; i++) {
          const bgUrl = pageThumbnails[i];
          const pageAnnots = annotations.filter((a) => a.pageIndex === i);
          const pageTexts = extractedTextMap[i] || [];

          const img = new Image();
          img.src = bgUrl;
          await new Promise((res) => (img.onload = res));

          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);

          const scale = img.width / 612;

          // 1. In-page text edits with sampled background and font matching
          for (const item of pageTexts) {
            const bgFill = item.bgColor || "#FFFFFF";
            const textColor = item.color || "#171717";
            const fontFam = getFontFamilyCss(item.cleanFontFamily, item.fontFamily);

            if (item.isDeleted) {
              ctx.fillStyle = bgFill;
              ctx.fillRect(
                ((item.origX ?? item.x) - 2) * scale,
                ((item.origY ?? item.y) - 2) * scale,
                ((item.origWidth ?? item.width) + 4) * scale,
                ((item.origHeight ?? item.height) + 4) * scale
              );
            } else if (item.isEdited) {
              // Mask original text with matching sampled background color
              ctx.fillStyle = bgFill;
              ctx.fillRect(
                ((item.origX ?? item.x) - 2) * scale,
                ((item.origY ?? item.y) - 2) * scale,
                ((item.origWidth ?? item.width) + 4) * scale,
                ((item.origHeight ?? item.height) + 4) * scale
              );

              if (item.x !== (item.origX ?? item.x) || item.y !== (item.origY ?? item.y)) {
                ctx.fillStyle = bgFill;
                ctx.fillRect(
                  (item.x - 2) * scale,
                  (item.y - 2) * scale,
                  (item.width + 4) * scale,
                  (item.height + 4) * scale
                );
              }

              ctx.save();
              let fontStylePrefix = "";
              if (item.fontStyle === "italic") fontStylePrefix += "italic ";
              if (item.fontWeight === "bold") fontStylePrefix += "bold ";

              ctx.font = `${fontStylePrefix}${Math.round(item.fontSize * scale)}px ${fontFam}`;
              ctx.fillStyle = textColor;
              ctx.textBaseline = "top";
              ctx.fillText(item.text, item.x * scale, item.y * scale);
              ctx.restore();
            }
          }

          // 2. Annotations, shapes, stamps, signatures
          for (const item of pageAnnots) {
            ctx.save();
            ctx.globalAlpha = item.opacity ?? 1.0;

            if (item.type === "erase") {
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(
                item.x * scale, item.y * scale,
                (item.width || 40) * scale, (item.height || 24) * scale
              );
            } else if (item.type === "draw" || item.type === "highlight") {
              if (item.points && item.points.length > 1) {
                ctx.beginPath();
                ctx.strokeStyle = item.color;
                ctx.lineWidth = (item.strokeWidth || 3) * scale;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                item.points.forEach((pt, idx) => {
                  if (idx === 0) ctx.moveTo(pt.x * scale, pt.y * scale);
                  else ctx.lineTo(pt.x * scale, pt.y * scale);
                });
                ctx.stroke();
              }
            } else if (item.type === "text" && item.text) {
              const annotFontFam = getFontFamilyCss(item.cleanFontFamily, item.fontFamily || "sans-serif");
              const annotWeight = item.fontWeight === "bold" ? "bold " : "600 ";
              const annotStyle = item.fontStyle === "italic" ? "italic " : "";
              const fSize = (item.fontSize || 16) * scale;
              ctx.font = `${annotStyle}${annotWeight}${fSize}px ${annotFontFam}`;
              ctx.fillStyle = item.color;
              ctx.textBaseline = "top";

              const maxWidth = item.width ? item.width * scale : undefined;
              const lineHeight = fSize * 1.35;
              const paragraphs = item.text.split("\n");
              let currentY = item.y * scale;

              for (const para of paragraphs) {
                if (!maxWidth) {
                  ctx.fillText(para, item.x * scale, currentY);
                  currentY += lineHeight;
                } else {
                  const words = para.split(" ");
                  let currentLine = "";
                  for (let n = 0; n < words.length; n++) {
                    const testLine = currentLine ? `${currentLine} ${words[n]}` : words[n];
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > maxWidth && currentLine) {
                      ctx.fillText(currentLine, item.x * scale, currentY);
                      currentLine = words[n];
                      currentY += lineHeight;
                    } else {
                      currentLine = testLine;
                    }
                  }
                  if (currentLine) {
                    ctx.fillText(currentLine, item.x * scale, currentY);
                    currentY += lineHeight;
                  }
                }
              }
            } else if (item.type === "stamp" && item.text) {
              ctx.translate((item.x + 60) * scale, (item.y + 20) * scale);
              ctx.rotate((-6 * Math.PI) / 180);
              ctx.font = `900 ${(item.fontSize || 18) * scale}px sans-serif`;
              ctx.fillStyle = item.color;
              ctx.strokeStyle = item.color;
              ctx.lineWidth = 2 * scale;
              ctx.strokeRect(-60 * scale, -20 * scale, 120 * scale, 40 * scale);
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(item.text, 0, 0);
            } else if (item.type === "shape") {
              ctx.strokeStyle = item.color;
              ctx.lineWidth = (item.strokeWidth || 3) * scale;
              if (item.shapeType === "circle") {
                ctx.beginPath();
                ctx.ellipse(
                  (item.x + (item.width || 120) / 2) * scale,
                  (item.y + (item.height || 70) / 2) * scale,
                  ((item.width || 120) / 2) * scale,
                  ((item.height || 70) / 2) * scale,
                  0, 0, 2 * Math.PI
                );
                ctx.stroke();
              } else {
                ctx.strokeRect(
                  item.x * scale, item.y * scale,
                  (item.width || 120) * scale, (item.height || 70) * scale
                );
              }
            } else if (item.type === "signature" && item.dataUrl) {
              const sig = new Image();
              sig.src = item.dataUrl;
              await new Promise((res) => (sig.onload = res));
              ctx.drawImage(sig, item.x * scale, item.y * scale, 160 * scale, 60 * scale);
            }

            ctx.restore();
          }

          urls.push(canvas.toDataURL("image/jpeg", 0.92));
        }

        setPreviewUrls(urls);
      } catch (err) {
        console.error("Preview render error:", err);
      } finally {
        setIsRendering(false);
      }
    };

    render();
  }, [isOpen]);

  if (!isOpen) return null;

  const totalPages = pageThumbnails.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backdropFilter: "blur(6px)", background: "rgba(10,10,20,0.72)" }}>
      {/* Modal card */}
      <div className="relative flex flex-col bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden" style={{ maxHeight: "92vh" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-black text-neutral-900 leading-tight">Export Preview</h2>
              <p className="text-[11px] text-neutral-400 leading-tight">
                {isRendering ? "Rendering final pages…" : `${totalPages} page${totalPages !== 1 ? "s" : ""} · ${fileName}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            title="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preview area */}
        <div className="flex-1 overflow-hidden flex flex-col items-center justify-center bg-neutral-50 relative" style={{ minHeight: 0 }}>
          {isRendering ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-neutral-100 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-violet-600 animate-spin" />
              </div>
              <p className="text-sm font-semibold text-neutral-500">Rendering your PDF…</p>
              <p className="text-xs text-neutral-400">This is exactly how your exported PDF will look</p>
            </div>
          ) : previewUrls.length > 0 ? (
            <div className="w-full h-full flex flex-col items-center overflow-auto py-6 px-4 gap-4">
              {previewUrls.map((url, idx) => (
                <div
                  key={idx}
                  className={`relative bg-white shadow-lg rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    idx === currentPreviewPage ? "border-violet-500 shadow-violet-200" : "border-transparent"
                  }`}
                  onClick={() => setCurrentPreviewPage(idx)}
                  style={{ width: "min(560px, 100%)", cursor: "pointer" }}
                >
                  {/* Page badge */}
                  <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Page {idx + 1}
                  </div>
                  <img
                    src={url}
                    alt={`Page ${idx + 1} preview`}
                    className="w-full block"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-neutral-400 text-sm">No preview available</div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100 bg-white shrink-0">
          <div className="text-xs text-neutral-400">
            {!isRendering && previewUrls.length > 0 && (
              <span>✓ What you see is exactly what will be exported</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onConfirmDownload();
              }}
              disabled={isRendering || previewUrls.length === 0}
              className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
