"use client";

import { useState } from "react";
import { 
  ImageDown, 
  Download, 
  FileText, 
  RotateCcw, 
  Archive, 
  CheckCircle2 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { renderAllPagesToImages } from "@/lib/pdf-engine/pdf-render";
import { downloadFilesAsZip, downloadBlob } from "@/lib/pdf-engine/zip-export";

export function PdfToImageEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [dpi, setDpi] = useState<number>(2.0); // 1.5 = 150 DPI, 2.0 = 200 DPI, 3.0 = 300 DPI
  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState<{ pageNum: number; dataUrl: string; blob: Blob }[]>([]);

  const handleFile = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setImages([]);
      setStatus("idle");
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    try {
      setStatus("processing");
      setErrorMessage("");

      const buffer = await file.arrayBuffer();
      const results = await renderAllPagesToImages(buffer, dpi, format, 0.92, (cur, tot) => {
        setProgress(Math.round((cur / tot) * 100));
      });

      setImages(results);
      setStatus("complete");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to convert PDF to images.");
      setStatus("error");
    }
  };

  const handleDownloadAllZip = () => {
    if (images.length > 0 && file) {
      const ext = format === "image/png" ? "png" : "jpg";
      const filesToZip = images.map((img) => ({
        filename: `${file.name.replace(".pdf", "")}_page_${img.pageNum}.${ext}`,
        data: img.blob,
      }));
      downloadFilesAsZip(filesToZip, `${file.name.replace(".pdf", "")}_images.zip`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setImages([]);
    setStatus("idle");
    setProgress(0);
    setErrorMessage("");
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF to convert to images"
          subtitle="Export pages into high-resolution JPG or PNG pictures"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-filora-50 flex items-center justify-center text-filora">
                <ImageDown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{file.name}</h3>
                <p className="text-xs text-neutral-500">Export PDF Pages to Images</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-neutral-500 hover:text-filora flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change File</span>
            </button>
          </div>

          {/* Format & Resolution Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Output Format
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormat("image/jpeg")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    format === "image/jpeg"
                      ? "bg-filora-50 border-filora text-filora"
                      : "bg-surface-subtle border-neutral-200 text-neutral-700"
                  }`}
                >
                  JPG (Photo)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("image/png")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    format === "image/png"
                      ? "bg-filora-50 border-filora text-filora"
                      : "bg-surface-subtle border-neutral-200 text-neutral-700"
                  }`}
                >
                  PNG (Lossless)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Image Resolution
              </label>
              <select
                value={dpi}
                onChange={(e) => setDpi(parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-filora text-xs text-neutral-900 bg-white"
              >
                <option value={1.5}>Standard Quality (150 DPI - Compact)</option>
                <option value={2.0}>High Quality (200 DPI - Recommended)</option>
                <option value={3.0}>Ultra High (300 DPI - Maximum Sharpness)</option>
              </select>
            </div>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={`Rendered ${images.length} pages to ${format === "image/png" ? "PNG" : "JPG"}!`}
            errorMessage={errorMessage}
          />

          {/* Converted Image Grid */}
          {images.length > 0 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Converted Pages ({images.length})
                </span>
                <button
                  onClick={handleDownloadAllZip}
                  className="text-xs text-filora hover:underline font-bold flex items-center gap-1"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Download All as ZIP</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto p-3 bg-surface-subtle rounded-2xl border border-neutral-200">
                {images.map((img) => (
                  <div
                    key={img.pageNum}
                    className="p-2 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col items-center justify-between"
                  >
                    <div className="w-full aspect-[3/4] bg-neutral-50 rounded-lg overflow-hidden flex items-center justify-center mb-1.5">
                      <img src={img.dataUrl} alt={`Page ${img.pageNum}`} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="w-full flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-neutral-700">Page {img.pageNum}</span>
                      <button
                        onClick={() =>
                          downloadBlob(
                            img.blob,
                            `page_${img.pageNum}.${format === "image/png" ? "png" : "jpg"}`
                          )
                        }
                        className="text-filora hover:underline font-bold"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            {images.length > 0 ? (
              <button
                onClick={handleDownloadAllZip}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center gap-2"
              >
                <Archive className="w-4 h-4" />
                <span>Download All ({images.length} pages) as ZIP</span>
              </button>
            ) : (
              <button
                onClick={handleConvert}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <ImageDown className="w-4 h-4" />
                <span>Convert to Images Now</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
