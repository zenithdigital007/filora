"use client";

import { useState } from "react";
import { 
  Minimize2, 
  Download, 
  FileText, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  TrendingDown
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { compressPdf, CompressionPreset } from "@/lib/pdf-engine/pdf-compress";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";
import { formatBytes } from "@/lib/utils";

export function CompressPdfEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<CompressionPreset>("balanced");
  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [compressedResult, setCompressedResult] = useState<Uint8Array | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const handleFile = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setCompressedResult(null);
      setStatus("idle");
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    try {
      setStatus("processing");
      setErrorMessage("");
      const buffer = await file.arrayBuffer();

      const result = await compressPdf(buffer, preset, (pct, msg) => {
        setProgress(pct);
        setStatusMessage(msg);
      });

      setCompressedResult(result);
      setCompressedSize(result.byteLength);
      setStatus("complete");
    } catch (err: any) {
      console.error("Compress error:", err);
      setErrorMessage(err.message || "Failed to compress PDF.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (compressedResult && file) {
      downloadBlob(compressedResult, `compressed_${file.name}`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setCompressedResult(null);
    setStatus("idle");
    setProgress(0);
    setErrorMessage("");
  };

  const savingsPercent = file && compressedSize > 0 
    ? Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100))
    : 0;

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF file to compress"
          subtitle="Reduce file size while preserving high visual quality"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* File Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-filora-50 flex items-center justify-center text-filora">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{file.name}</h3>
                <p className="text-xs text-neutral-500">Original size: {formatBytes(file.size)}</p>
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

          {/* Preset Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
              Compression Presets
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPreset("maximum")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  preset === "maximum"
                    ? "border-filora bg-filora-50 text-filora"
                    : "border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-surface-subtle"
                }`}
              >
                <div className="text-xs font-bold mb-1">Maximum Compression</div>
                <div className="text-[11px] text-neutral-500">Smallest file size. Best for email and strict upload limits.</div>
              </button>

              <button
                type="button"
                onClick={() => setPreset("balanced")}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  preset === "balanced"
                    ? "border-filora bg-filora-50 text-filora"
                    : "border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-surface-subtle"
                }`}
              >
                <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-filora text-white">
                  Recommended
                </span>
                <div className="text-xs font-bold mb-1">Balanced</div>
                <div className="text-[11px] text-neutral-500">Optimal balance between high sharpness and small file size.</div>
              </button>

              <button
                type="button"
                onClick={() => setPreset("low")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  preset === "low"
                    ? "border-filora bg-filora-50 text-filora"
                    : "border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-surface-subtle"
                }`}
              >
                <div className="text-xs font-bold mb-1">Low Compression</div>
                <div className="text-[11px] text-neutral-500">Highest quality. Streamlined optimization for photography.</div>
              </button>
            </div>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={statusMessage || "PDF compressed successfully!"}
            errorMessage={errorMessage}
          />

          {/* Results Comparison Card */}
          {compressedResult && (
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    {savingsPercent}% File Size Reduction
                  </div>
                  <div className="text-sm text-neutral-800 font-semibold flex items-center gap-2">
                    <span className="line-through text-neutral-400">{formatBytes(file.size)}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">{formatBytes(compressedSize)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Compressed PDF</span>
              </button>
            </div>
          )}

          {/* Action Button */}
          {!compressedResult && (
            <div className="flex items-center justify-end pt-2">
              <button
                onClick={handleCompress}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Compress PDF Now</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
