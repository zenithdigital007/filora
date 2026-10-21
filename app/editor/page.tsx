"use client";

import { useState, useEffect } from "react";
import { EditorTopBar } from "@/components/editor/EditorTopBar";
import { EditorSidebar, EditorTool } from "@/components/editor/EditorSidebar";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { PageThumbnails } from "@/components/editor/PageThumbnails";
import { SignatureModal } from "@/components/editor/SignatureModal";
import { EditorCanvas, AnnotationItem } from "@/components/editor/EditorCanvas";
import { ExportPreviewModal } from "@/components/editor/ExportPreviewModal";
import {
  renderAllPagesToImages,
  extractAllPageTextItems,
  enrichTextItemsWithColors,
  getPdfDocument,
  ExtractedTextItem,
} from "@/lib/pdf-engine/pdf-render";
import { imagesToPdf } from "@/lib/pdf-engine/image-to-pdf";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";
import { UploadDropzone } from "@/components/tools/UploadDropzone";
import {
  AVAILABLE_FONTS,
  ensureFontLoaded,
  getFontFamilyCss,
} from "@/lib/pdf-engine/font-manager";

export default function EditorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("document.pdf");
  const [pageThumbnails, setPageThumbnails] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1.0);

  const [activeTool, setActiveTool] = useState<EditorTool>("select");
  const [color, setColor] = useState("#5003C0");
  const [fontSize, setFontSize] = useState(18);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [opacity, setOpacity] = useState(1.0);
  const [shapeType, setShapeType] = useState<"rect" | "circle" | "line">("rect");
  const [stampText, setStampText] = useState("APPROVED");

  const [annotations, setAnnotations] = useState<AnnotationItem[]>([]);
  const [extractedTextMap, setExtractedTextMap] = useState<Record<number, ExtractedTextItem[]>>({});
  const [history, setHistory] = useState<{
    annotations: AnnotationItem[];
    extractedMap: Record<number, ExtractedTextItem[]>;
  }[]>([]);
  const [historyStep, setHistoryStep] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [isThumbnailsOpen, setIsThumbnailsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileLoaded = async (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    setFileName(f.name);
    setIsLoading(true);

    try {
      const buffer = await f.arrayBuffer();
      const pdfDoc = await getPdfDocument(buffer);
      const images = await renderAllPagesToImages(pdfDoc, 1.5, "image/png", 0.95);
      const textMap = await extractAllPageTextItems(pdfDoc, 612);

      // Enrich extracted text items with the exact background color and font color sampled from each page image
      const enrichedMap: Record<number, ExtractedTextItem[]> = {};
      for (let i = 0; i < images.length; i++) {
        const pageItems = textMap[i] || [];
        enrichedMap[i] = await enrichTextItemsWithColors(images[i].dataUrl, pageItems, 612);
      }

      setPageThumbnails(images.map((img) => img.dataUrl));
      setExtractedTextMap(enrichedMap);
      setCurrentPage(1);
      setAnnotations([]);
      setHistory([{ annotations: [], extractedMap: enrichedMap }]);
      setHistoryStep(0);
      setActiveTool("edit_text");
    } catch (err) {
      console.error("Error loading PDF for studio:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const recordState = (
    newAnnots: AnnotationItem[],
    newTextMap: Record<number, ExtractedTextItem[]>
  ) => {
    const updatedHistory = history.slice(0, historyStep + 1);
    updatedHistory.push({ annotations: newAnnots, extractedMap: newTextMap });
    setHistory(updatedHistory);
    setHistoryStep(updatedHistory.length - 1);
    setAnnotations(newAnnots);
    setExtractedTextMap(newTextMap);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const prev = history[historyStep - 1];
      setHistoryStep(historyStep - 1);
      setAnnotations(prev.annotations);
      setExtractedTextMap(prev.extractedMap);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const next = history[historyStep + 1];
      setHistoryStep(historyStep + 1);
      setAnnotations(next.annotations);
      setExtractedTextMap(next.extractedMap);
    }
  };

  const handleAddAnnotation = (item: AnnotationItem) => {
    recordState([...annotations, item], extractedTextMap);
  };

  const handleUpdateAnnotation = (
    id: string,
    updates: Partial<AnnotationItem>,
    addToHistory = true
  ) => {
    const updated = annotations.map((a) => (a.id === id ? { ...a, ...updates } : a));
    if (addToHistory) {
      recordState(updated, extractedTextMap);
    } else {
      setAnnotations(updated);
    }
  };

  const handleUpdateExtractedText = (
    id: string,
    updates: Partial<ExtractedTextItem>,
    addToHistory = true
  ) => {
    const currentList = extractedTextMap[currentPage - 1] || [];
    const updatedList = currentList.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    const updatedMap = {
      ...extractedTextMap,
      [currentPage - 1]: updatedList,
    };
    if (addToHistory) {
      recordState(annotations, updatedMap);
    } else {
      setExtractedTextMap(updatedMap);
    }
  };

  const handleDeleteExtractedText = (id: string) => {
    const currentList = extractedTextMap[currentPage - 1] || [];
    const updatedList = currentList.map((item) =>
      item.id === id ? { ...item, isDeleted: true } : item
    );
    const updatedMap = {
      ...extractedTextMap,
      [currentPage - 1]: updatedList,
    };
    recordState(annotations, updatedMap);
    if (selectedId === id) setSelectedId(null);
  };

  const handleDeleteAnnotation = (id: string) => {
    recordState(
      annotations.filter((a) => a.id !== id),
      extractedTextMap
    );
    if (selectedId === id) setSelectedId(null);
  };

  const handleDeleteSelected = () => {
    if (!selectedId) return;

    // Check if it's an annotation
    const isAnnot = annotations.some((a) => a.id === selectedId);
    if (isAnnot) {
      handleDeleteAnnotation(selectedId);
      return;
    }

    // Check if it's an extracted text item
    const currentList = extractedTextMap[currentPage - 1] || [];
    const isExtracted = currentList.some((t) => t.id === selectedId);
    if (isExtracted) {
      handleDeleteExtractedText(selectedId);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        const isEditing = document.activeElement?.getAttribute("contenteditable") === "true";
        if (activeTag !== "input" && activeTag !== "textarea" && !isEditing) {
          e.preventDefault();
          handleDeleteSelected();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, annotations, extractedTextMap, currentPage]);

  const handleSaveSignature = (dataUrl: string) => {
    const sigItem: AnnotationItem = {
      id: Math.random().toString(36).substring(2, 9),
      pageIndex: currentPage - 1,
      type: "signature",
      x: 200,
      y: 350,
      dataUrl,
      color: "#171717",
      opacity: 1.0,
    };
    handleAddAnnotation(sigItem);
    setSelectedId(sigItem.id);
  };

  const handleRotateThumbnail = (_pageIdx: number) => {
    // In-memory page rotation for active preview
  };

  const handleDeleteThumbnail = (pageIdx: number) => {
    if (pageThumbnails.length <= 1) return;
    const updated = pageThumbnails.filter((_, i) => i !== pageIdx);
    setPageThumbnails(updated);
    if (currentPage > updated.length) setCurrentPage(updated.length);
  };

  const handleDuplicateThumbnail = (pageIdx: number) => {
    const target = pageThumbnails[pageIdx];
    const updated = [...pageThumbnails];
    updated.splice(pageIdx + 1, 0, target);
    setPageThumbnails(updated);
  };

  const handleExportPdf = async () => {
    if (pageThumbnails.length === 0) return;

    try {
      setIsLoading(true);

      if (typeof document !== "undefined" && document.fonts?.ready) {
        await document.fonts.ready;
      }

      const exportedPagesDataUrls: string[] = [];

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

        // Scale factor between editor canvas width (612px) and actual raster bitmap width
        const scale = img.width / 612;

        // 1. APPLY IN-PAGE TEXT EDITS & DELETIONS WITH EXACT FONT RENDERING & SAMPLED COLOR MASKS
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

            // If text was moved, also mask destination background
            if (item.x !== (item.origX ?? item.x) || item.y !== (item.origY ?? item.y)) {
              ctx.fillStyle = bgFill;
              ctx.fillRect(
                (item.x - 2) * scale,
                (item.y - 2) * scale,
                (item.width + 4) * scale,
                (item.height + 4) * scale
              );
            }

            // Render replacement text matching the original font and color
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

        // 2. APPLY ANNOTATIONS, ERASERS, DRAWINGS, SHAPES & STAMPS
        for (const item of pageAnnots) {
          ctx.save();
          ctx.globalAlpha = item.opacity ?? 1.0;

          if (item.type === "erase") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(
              item.x * scale,
              item.y * scale,
              (item.width || 40) * scale,
              (item.height || 24) * scale
            );
          } else if (item.type === "draw" || item.type === "highlight") {
            if (item.points && item.points.length > 1) {
              ctx.beginPath();
              ctx.strokeStyle = item.color;
              ctx.lineWidth = (item.strokeWidth || 3) * scale;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";
              item.points.forEach((pt, idx) => {
                const px = pt.x * scale;
                const py = pt.y * scale;
                if (idx === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
              });
              ctx.stroke();
            }
          } else if (item.type === "text" && item.text) {
            const annotFontFam = getFontFamilyCss(item.cleanFontFamily, item.fontFamily || "sans-serif");
            const annotWeight = item.fontWeight === "bold" ? "bold " : "600 ";
            const annotStyle = item.fontStyle === "italic" ? "italic " : "";
            ctx.font = `${annotStyle}${annotWeight}${(item.fontSize || 16) * scale}px ${annotFontFam}`;
            ctx.fillStyle = item.color;
            ctx.textBaseline = "top";
            ctx.fillText(item.text, item.x * scale, item.y * scale);
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
                0,
                0,
                2 * Math.PI
              );
              ctx.stroke();
            } else {
              ctx.strokeRect(
                item.x * scale,
                item.y * scale,
                (item.width || 120) * scale,
                (item.height || 70) * scale
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

        exportedPagesDataUrls.push(canvas.toDataURL("image/jpeg", 0.95));
      }

      const finalPdf = await imagesToPdf(exportedPagesDataUrls, { pageSize: "fit", margin: 0 });
      downloadBlob(finalPdf, `edited_${fileName}`);
    } catch (err) {
      console.error("Export PDF error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const currentPageExtractedTexts = extractedTextMap[currentPage - 1] || [];
  const selectedExtractedText = currentPageExtractedTexts.find((t) => t.id === selectedId) || null;
  const selectedAnnotation = annotations.find((a) => a.id === selectedId) || null;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-100">
      {pageThumbnails.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-surface-subtle">
          <div className="w-full max-w-xl bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-filora text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
                P
              </div>
              <h1 className="text-2xl font-black text-neutral-900">Pdfyara PDF Studio</h1>
              <p className="text-xs sm:text-sm text-neutral-500">
                Edit original PDF text with matching fonts, erase content, add signatures, shapes,
                and stamps right in your browser.
              </p>
            </div>

            <UploadDropzone
              multiple={false}
              onFilesSelected={handleFileLoaded}
              title="Open a PDF to begin editing"
              subtitle="Drop your document here or click to browse"
            />
          </div>
        </div>
      ) : (
        <>
          {/* Top Bar */}
          <EditorTopBar
            fileName={fileName}
            currentPage={currentPage}
            totalPages={pageThumbnails.length}
            zoom={zoom}
            canUndo={historyStep > 0}
            canRedo={historyStep < history.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onZoomIn={() => setZoom((z) => Math.min(2.0, z + 0.15))}
            onZoomOut={() => setZoom((z) => Math.max(0.5, z - 0.15))}
            onPrevPage={() => setCurrentPage((p) => Math.max(1, p - 1))}
            onNextPage={() => setCurrentPage((p) => Math.min(pageThumbnails.length, p + 1))}
            onSave={() => setIsPreviewOpen(true)}
            onDownload={() => setIsPreviewOpen(true)}
          />

          {/* Main Studio Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Toolbar */}
            <EditorSidebar activeTool={activeTool} onSelectTool={setActiveTool} />

            {/* Center Canvas */}
            <EditorCanvas
              pageDataUrl={pageThumbnails[currentPage - 1] || null}
              currentPage={currentPage}
              zoom={zoom}
              activeTool={activeTool}
              color={color}
              fontSize={fontSize}
              strokeWidth={strokeWidth}
              opacity={opacity}
              shapeType={shapeType}
              stampText={stampText}
              annotations={annotations}
              extractedTextItems={currentPageExtractedTexts}
              selectedId={selectedId}
              onSelectElement={setSelectedId}
              onAddAnnotation={handleAddAnnotation}
              onUpdateAnnotation={handleUpdateAnnotation}
              onDeleteAnnotation={handleDeleteAnnotation}
              onUpdateExtractedText={handleUpdateExtractedText}
              onDeleteExtractedText={handleDeleteExtractedText}
              onOpenSignatureModal={() => setIsSignatureModalOpen(true)}
              onExportPdf={() => setIsPreviewOpen(true)}
            />

            {/* Right Properties Inspector */}
            <PropertiesPanel
              activeTool={activeTool}
              selectedElement={selectedAnnotation || selectedExtractedText}
              isExtractedText={!!selectedExtractedText}
              color={selectedExtractedText?.color || color}
              fontSize={selectedExtractedText?.fontSize || fontSize}
              fontFamily={selectedExtractedText?.fontFamily || "sans-serif"}
              cleanFontFamily={selectedExtractedText?.cleanFontFamily || selectedAnnotation?.cleanFontFamily}
              detectedFontName={selectedExtractedText?.detectedFontName || selectedExtractedText?.cleanFontFamily}
              fontWeight={selectedExtractedText?.fontWeight || "normal"}
              fontStyle={selectedExtractedText?.fontStyle || "normal"}
              strokeWidth={strokeWidth}
              opacity={opacity}
              shapeType={shapeType}
              stampText={stampText}
              onChangeColor={(c) => {
                setColor(c);
                if (selectedExtractedText) handleUpdateExtractedText(selectedExtractedText.id, { color: c });
                else if (selectedAnnotation) handleUpdateAnnotation(selectedAnnotation.id, { color: c });
              }}
              onChangeFontSize={(s) => {
                setFontSize(s);
                if (selectedExtractedText) handleUpdateExtractedText(selectedExtractedText.id, { fontSize: s, isEdited: true });
                else if (selectedAnnotation) handleUpdateAnnotation(selectedAnnotation.id, { fontSize: s });
              }}
              onChangeFontFamily={(f) => {
                ensureFontLoaded(f);
                const found = AVAILABLE_FONTS.find(
                  (font) =>
                    font.family.toLowerCase() === f.toLowerCase() ||
                    font.name.toLowerCase() === f.toLowerCase()
                );
                const cat =
                  found?.category ||
                  (f === "serif" ? "serif" : f === "monospace" ? "monospace" : "sans-serif");
                const familyName = found?.family || f;
                const cssStack = found?.cssStack || getFontFamilyCss(familyName, cat);

                if (selectedExtractedText) {
                  handleUpdateExtractedText(selectedExtractedText.id, {
                    fontFamily: cat,
                    cleanFontFamily: familyName,
                    cssFontStack: cssStack,
                    isEdited: true,
                  });
                } else if (selectedAnnotation) {
                  handleUpdateAnnotation(selectedAnnotation.id, {
                    fontFamily: cat,
                    cleanFontFamily: familyName,
                    cssFontStack: cssStack,
                  });
                }
              }}
              onToggleBold={() => {
                if (selectedExtractedText) {
                  const newWeight = selectedExtractedText.fontWeight === "bold" ? "normal" : "bold";
                  handleUpdateExtractedText(selectedExtractedText.id, { fontWeight: newWeight, isEdited: true });
                }
              }}
              onToggleItalic={() => {
                if (selectedExtractedText) {
                  const newStyle = selectedExtractedText.fontStyle === "italic" ? "normal" : "italic";
                  handleUpdateExtractedText(selectedExtractedText.id, { fontStyle: newStyle, isEdited: true });
                }
              }}
              onChangeStrokeWidth={setStrokeWidth}
              onChangeOpacity={setOpacity}
              onChangeShapeType={setShapeType}
              onChangeStampText={setStampText}
              onDeleteSelected={handleDeleteSelected}
              onChangeWidth={(w) => {
                if (selectedExtractedText) {
                  handleUpdateExtractedText(selectedExtractedText.id, { width: w, isEdited: true });
                } else if (selectedAnnotation) {
                  handleUpdateAnnotation(selectedAnnotation.id, { width: w });
                }
              }}
              onChangeHeight={(h) => {
                if (selectedExtractedText) {
                  handleUpdateExtractedText(selectedExtractedText.id, { height: h, isEdited: true });
                } else if (selectedAnnotation) {
                  handleUpdateAnnotation(selectedAnnotation.id, { height: h });
                }
              }}
              onChangeX={(x) => {
                if (selectedExtractedText) {
                  handleUpdateExtractedText(selectedExtractedText.id, { x, isEdited: true });
                } else if (selectedAnnotation) {
                  handleUpdateAnnotation(selectedAnnotation.id, { x });
                }
              }}
              onChangeY={(y) => {
                if (selectedExtractedText) {
                  handleUpdateExtractedText(selectedExtractedText.id, { y, isEdited: true });
                } else if (selectedAnnotation) {
                  handleUpdateAnnotation(selectedAnnotation.id, { y });
                }
              }}
              onCenterHorizontal={() => {
                if (selectedExtractedText) {
                  const w = selectedExtractedText.width || 120;
                  const centerX = Math.max(0, Math.round((612 - w) / 2));
                  handleUpdateExtractedText(selectedExtractedText.id, { x: centerX, isEdited: true });
                } else if (selectedAnnotation) {
                  const w = selectedAnnotation.width || 200;
                  const centerX = Math.max(0, Math.round((612 - w) / 2));
                  handleUpdateAnnotation(selectedAnnotation.id, { x: centerX });
                }
              }}
            />
          </div>

          {/* Bottom Thumbnails Drawer */}
          <PageThumbnails
            thumbnails={pageThumbnails}
            currentPage={currentPage}
            isOpen={isThumbnailsOpen}
            onToggle={() => setIsThumbnailsOpen(!isThumbnailsOpen)}
            onSelectPage={setCurrentPage}
            onRotatePage={handleRotateThumbnail}
            onDeletePage={handleDeleteThumbnail}
            onDuplicatePage={handleDuplicateThumbnail}
          />

          {/* Export Preview Modal */}
          <ExportPreviewModal
            isOpen={isPreviewOpen}
            pageThumbnails={pageThumbnails}
            annotations={annotations}
            extractedTextMap={extractedTextMap}
            fileName={fileName}
            onClose={() => setIsPreviewOpen(false)}
            onConfirmDownload={handleExportPdf}
          />

          {/* Signature Modal */}
          <SignatureModal
            isOpen={isSignatureModalOpen}
            onClose={() => setIsSignatureModalOpen(false)}
            onSaveSignature={handleSaveSignature}
          />
        </>
      )}
    </div>
  );
}
