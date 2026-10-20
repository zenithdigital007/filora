"use client";

import { useState } from "react";
import { 
  SearchCode, 
  FileText, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  FileCode, 
  Info 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { extractPdfInfo } from "@/lib/pdf-engine/pdf-core";
import { formatBytes } from "@/lib/utils";

export function PdfAnalyzerEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<any | null>(null);
  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFile = async (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    setStatus("processing");
    setErrorMessage("");

    try {
      const buffer = await f.arrayBuffer();
      const extracted = await extractPdfInfo(buffer);
      setInfo(extracted);
      setStatus("complete");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to inspect PDF structure.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFile(null);
    setInfo(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF to inspect structure & diagnostics"
          subtitle="Analyze page counts, exact millimeter dimensions, metadata, and security"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-filora-50 flex items-center justify-center text-filora">
                <SearchCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{file.name}</h3>
                <p className="text-xs text-neutral-500">Document Diagnostic Report</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-neutral-500 hover:text-filora flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Analyze Another File</span>
            </button>
          </div>

          <ProcessingStatus
            status={status}
            message="Structural analysis complete!"
            errorMessage={errorMessage}
          />

          {info && (
            <div className="space-y-6 animate-in fade-in">
              {/* Summary Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200">
                  <span className="text-[11px] text-neutral-500 font-medium block mb-1">Page Count</span>
                  <span className="text-xl font-extrabold text-neutral-900">{info.pageCount} Pages</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200">
                  <span className="text-[11px] text-neutral-500 font-medium block mb-1">File Size</span>
                  <span className="text-xl font-extrabold text-neutral-900">{formatBytes(file.size)}</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200">
                  <span className="text-[11px] text-neutral-500 font-medium block mb-1">Dimensions</span>
                  <span className="text-sm font-bold text-filora block mt-1">
                    {info.pageDimensions.widthMm} × {info.pageDimensions.heightMm} mm
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200">
                  <span className="text-[11px] text-neutral-500 font-medium block mb-1">Points</span>
                  <span className="text-sm font-bold text-neutral-900 block mt-1">
                    {info.pageDimensions.widthPt} × {info.pageDimensions.heightPt} pt
                  </span>
                </div>
              </div>

              {/* Metadata Details */}
              <div className="bg-surface-subtle rounded-2xl border border-neutral-200 p-5 space-y-3">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-filora" />
                  <span>Embedded Metadata Dictionary</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-neutral-500 block">Title:</span>
                    <span className="text-neutral-900 font-medium">{info.title || "Not defined"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-500 block">Author:</span>
                    <span className="text-neutral-900 font-medium">{info.author || "Not defined"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-500 block">Creator Software:</span>
                    <span className="text-neutral-900 font-medium">{info.creator || "Not defined"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-500 block">PDF Producer:</span>
                    <span className="text-neutral-900 font-medium">{info.producer || "Not defined"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
