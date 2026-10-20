"use client";

import { useState } from "react";
import { 
  Binary, 
  Download, 
  FileText, 
  RotateCcw, 
  ShieldCheck 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { addBatesNumberingToPdf } from "@/lib/pdf-engine/pdf-core";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";

export function BatesNumberingEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [prefix, setPrefix] = useState("CONF-EXP-");
  const [suffix, setSuffix] = useState("");
  const [startNumber, setStartNumber] = useState(1);
  const [digitCount, setDigitCount] = useState(6);
  const [position, setPosition] = useState<"bottom-right" | "top-right" | "bottom-center">("bottom-right");
  const [fontSize, setFontSize] = useState(10);

  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [batesBlob, setBatesBlob] = useState<Uint8Array | null>(null);

  const handleFile = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setBatesBlob(null);
      setStatus("idle");
    }
  };

  const handleApply = async () => {
    if (!file) return;

    try {
      setStatus("processing");
      setProgress(40);
      setErrorMessage("");

      const buffer = await file.arrayBuffer();
      const output = await addBatesNumberingToPdf(buffer, {
        prefix,
        suffix,
        startNumber,
        digitCount,
        position,
        fontSize,
      });

      setBatesBlob(output);
      setProgress(100);
      setStatus("complete");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to apply Bates numbering.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (batesBlob && file) {
      downloadBlob(batesBlob, `bates_stamped_${file.name}`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setBatesBlob(null);
    setStatus("idle");
    setErrorMessage("");
  };

  const previewSample = `${prefix}${`${startNumber}`.padStart(digitCount, "0")}${suffix}`;

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF for Bates numbering & legal indexing"
          subtitle="Sequential Bates stamping for legal discovery and litigation bundles"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-filora-50 flex items-center justify-center text-filora">
                <Binary className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{file.name}</h3>
                <p className="text-xs text-neutral-500">Legal Discovery Indexing</p>
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

          {/* Sample Bates Preview */}
          <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-500 font-semibold block">Stamp Format Preview:</span>
              <span className="text-base font-mono font-bold text-filora tracking-wider">
                {previewSample}
              </span>
            </div>
            <div className="text-xs text-neutral-500 font-medium">Page 1 Sample</div>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Prefix
              </label>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="e.g. ABC-"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Starting Number
              </label>
              <input
                type="number"
                min="1"
                value={startNumber}
                onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Digit Padding
              </label>
              <select
                value={digitCount}
                onChange={(e) => setDigitCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 bg-white"
              >
                <option value={4}>4 Digits (0001)</option>
                <option value={6}>6 Digits (000001 - Standard)</option>
                <option value={8}>8 Digits (00000001)</option>
              </select>
            </div>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            errorMessage={errorMessage}
            message="Bates stamping complete!"
          />

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            {batesBlob ? (
              <button
                onClick={handleDownload}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Bates-Numbered PDF</span>
              </button>
            ) : (
              <button
                onClick={handleApply}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <Binary className="w-4 h-4" />
                <span>Apply Bates Stamp Now</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
