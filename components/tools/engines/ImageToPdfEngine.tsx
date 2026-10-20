"use client";

import { useState } from "react";
import { 
  Image as ImageIcon, 
  Download, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Layers 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { imagesToPdf, ImageToPdfOptions } from "@/lib/pdf-engine/image-to-pdf";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";

interface ImageItem {
  id: string;
  name: string;
  dataUrl: string;
}

export function ImageToPdfEngine() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<ImageToPdfOptions["pageSize"]>("A4");
  const [orientation, setOrientation] = useState<ImageToPdfOptions["orientation"]>("auto");
  const [margin, setMargin] = useState<number>(20);

  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfResult, setPdfResult] = useState<Uint8Array | null>(null);

  const handleFiles = (files: File[]) => {
    const promises = files.map((file) => {
      return new Promise<ImageItem>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            dataUrl: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((loaded) => {
      setImages((prev) => [...prev, ...loaded]);
      setPdfResult(null);
      setStatus("idle");
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setPdfResult(null);
  };

  const handleConvert = async () => {
    if (images.length === 0) return;

    try {
      setStatus("processing");
      setProgress(40);
      setErrorMessage("");

      const output = await imagesToPdf(
        images.map((img) => img.dataUrl),
        {
          pageSize,
          orientation,
          margin,
        }
      );

      setPdfResult(output);
      setProgress(100);
      setStatus("complete");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to convert images to PDF.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (pdfResult) {
      downloadBlob(pdfResult, `filora_document_${Date.now()}.pdf`);
    }
  };

  const handleReset = () => {
    setImages([]);
    setPdfResult(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full space-y-6">
      {images.length === 0 ? (
        <UploadDropzone
          multiple={true}
          accept="image/png,image/jpeg,image/webp"
          onFilesSelected={handleFiles}
          title="Drop JPG / PNG images to convert"
          subtitle="Combine multiple photos into a clean, formatted PDF document"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-filora" />
              <span className="font-bold text-neutral-900 text-sm">
                {images.length} Images Uploaded
              </span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-neutral-500 hover:text-filora flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>

          {/* Image Thumbnail Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 p-3 bg-surface-subtle rounded-2xl border border-neutral-200 max-h-48 overflow-y-auto">
            {images.map((img, i) => (
              <div
                key={img.id}
                className="relative group p-1.5 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col items-center"
              >
                <img src={img.dataUrl} alt={img.name} className="h-20 w-auto object-cover rounded" />
                <span className="text-[10px] text-neutral-500 truncate max-w-[80px] mt-1">
                  #{i + 1}
                </span>
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute -top-1.5 -right-1.5 p-1 bg-rose-600 text-white rounded-full text-[10px] shadow"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Page Setup Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Page Format
              </label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 bg-white"
              >
                <option value="A4">A4 (Standard ISO)</option>
                <option value="Letter">US Letter (8.5 x 11 in)</option>
                <option value="A3">A3 (Large)</option>
                <option value="A5">A5 (Booklet)</option>
                <option value="fit">Fit to Image</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Page Margins
              </label>
              <select
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 bg-white"
              >
                <option value={0}>No Margin (Full Bleed)</option>
                <option value={20}>Small Margin (20pt)</option>
                <option value={36}>Standard Margin (0.5 in)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Orientation
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 bg-white"
              >
                <option value="auto">Auto (Match Photo)</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            errorMessage={errorMessage}
            message="PDF created successfully from your images!"
          />

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            {pdfResult ? (
              <button
                onClick={handleDownload}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Compiled PDF</span>
              </button>
            ) : (
              <button
                onClick={handleConvert}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Convert Images to PDF</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
