"use client";

import { useState, useEffect } from "react";
import { 
  RotateCw, 
  Trash2, 
  Copy, 
  Download, 
  RotateCcw, 
  LayoutGrid, 
  FileText,
  CheckCircle2,
  Move
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { renderAllPagesToImages } from "@/lib/pdf-engine/pdf-render";
import { organizePdfPages } from "@/lib/pdf-engine/pdf-core";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";

interface ThumbnailItem {
  id: string;
  originalIndex: number;
  dataUrl: string;
  rotation: number;
}

export function OrganizePdfEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<ThumbnailItem[]>([]);
  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [organizedBlob, setOrganizedBlob] = useState<Uint8Array | null>(null);

  const handleFile = async (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    setStatus("reading");
    setProgress(20);

    try {
      const buffer = await f.arrayBuffer();
      const rendered = await renderAllPagesToImages(buffer, 1.0, "image/jpeg", 0.85, (cur, tot) => {
        setProgress(Math.round((cur / tot) * 100));
      });

      const items: ThumbnailItem[] = rendered.map((r, i) => ({
        id: Math.random().toString(36).substring(2, 9),
        originalIndex: i,
        dataUrl: r.dataUrl,
        rotation: 0,
      }));

      setPages(items);
      setStatus("idle");
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Failed to render PDF thumbnails.");
      setStatus("error");
    }
  };

  const rotatePage = (id: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
    setOrganizedBlob(null);
  };

  const deletePage = (id: string) => {
    if (pages.length <= 1) {
      setErrorMessage("You must keep at least one page.");
      return;
    }
    setPages((prev) => prev.filter((p) => p.id !== id));
    setOrganizedBlob(null);
  };

  const duplicatePage = (index: number) => {
    const target = pages[index];
    const copy: ThumbnailItem = {
      ...target,
      id: Math.random().toString(36).substring(2, 9),
    };
    const updated = [...pages];
    updated.splice(index + 1, 0, copy);
    setPages(updated);
    setOrganizedBlob(null);
  };

  const movePage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pages.length) return;
    const updated = [...pages];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setPages(updated);
    setOrganizedBlob(null);
  };

  const handleSave = async () => {
    if (!file || pages.length === 0) return;

    try {
      setStatus("processing");
      setProgress(50);
      const buffer = await file.arrayBuffer();

      const output = await organizePdfPages(
        buffer,
        pages.map((p) => ({
          originalIndex: p.originalIndex,
          rotation: p.rotation,
        }))
      );

      setOrganizedBlob(output);
      setProgress(100);
      setStatus("complete");
    } catch (err: any) {
      console.error("Organize error:", err);
      setErrorMessage(err.message || "Failed to save organized PDF.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (organizedBlob && file) {
      downloadBlob(organizedBlob, `organized_${file.name}`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPages([]);
    setOrganizedBlob(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF file to organize"
          subtitle="Visually reorder, rotate, delete, and duplicate pages"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-filora" />
              <span className="font-bold text-neutral-900 text-sm">
                Organize Pages ({pages.length} Pages)
              </span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-neutral-500 hover:text-filora flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change File</span>
            </button>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={status === "reading" ? "Rendering thumbnails..." : "Organized document is ready!"}
            errorMessage={errorMessage}
          />

          {/* Thumbnail Grid */}
          {pages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-surface-subtle rounded-3xl border border-neutral-200 max-h-[500px] overflow-y-auto">
              {pages.map((p, index) => (
                <div
                  key={p.id}
                  className="group relative bg-white border border-neutral-200 hover:border-filora rounded-2xl p-2.5 shadow-subtle flex flex-col items-center justify-between transition-all"
                >
                  <div className="w-full flex items-center justify-between text-[11px] font-bold text-neutral-500 px-1 mb-1.5">
                    <span>Page {index + 1}</span>
                    <div className="flex items-center gap-0.5">
                      {index > 0 && (
                        <button
                          onClick={() => movePage(index, "left")}
                          className="p-1 text-neutral-400 hover:text-filora rounded hover:bg-neutral-100"
                          title="Move Left"
                        >
                          ←
                        </button>
                      )}
                      {index < pages.length - 1 && (
                        <button
                          onClick={() => movePage(index, "right")}
                          className="p-1 text-neutral-400 hover:text-filora rounded hover:bg-neutral-100"
                          title="Move Right"
                        >
                          →
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative w-full aspect-[3/4] bg-neutral-50 rounded-xl overflow-hidden flex items-center justify-center border border-neutral-100 mb-2">
                    <img
                      src={p.dataUrl}
                      alt={`Page ${index + 1}`}
                      className="max-h-full max-w-full object-contain transition-transform duration-200"
                      style={{ transform: `rotate(${p.rotation}deg)` }}
                    />
                  </div>

                  {/* Action Toolbar */}
                  <div className="flex items-center justify-center gap-1 w-full pt-1 border-t border-neutral-100">
                    <button
                      onClick={() => rotatePage(p.id)}
                      className="p-1.5 text-neutral-500 hover:text-filora rounded-lg hover:bg-filora-50 transition-colors"
                      title="Rotate 90°"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => duplicatePage(index)}
                      className="p-1.5 text-neutral-500 hover:text-filora rounded-lg hover:bg-filora-50 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deletePage(p.id)}
                      className="p-1.5 text-neutral-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-end pt-2">
            {organizedBlob ? (
              <button
                onClick={handleDownload}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Organized PDF</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={status === "processing" || pages.length === 0}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Save & Generate PDF</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
