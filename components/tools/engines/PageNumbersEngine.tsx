"use client";

import { useState } from "react";
import { 
  Hash, 
  Download, 
  FileText, 
  RotateCcw, 
  Check 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { addPageNumbersToPdf } from "@/lib/pdf-engine/pdf-core";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";

type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export function PageNumbersEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<Position>("bottom-right");
  const [format, setFormat] = useState<"simple" | "page_of_total" | "custom">("page_of_total");
  const [customFormat, setCustomFormat] = useState("Page {n} of {total}");
  const [startNumber, setStartNumber] = useState(1);
  const [skipFirstPage, setSkipFirstPage] = useState(false);
  const [fontSize, setFontSize] = useState(10);
  const [colorHex, setColorHex] = useState("#171717");

  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [numberedBlob, setNumberedBlob] = useState<Uint8Array | null>(null);

  const handleFile = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setNumberedBlob(null);
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
      const output = await addPageNumbersToPdf(buffer, {
        format,
        customFormat,
        position,
        startNumber,
        skipFirstPage,
        fontSize,
        colorHex,
      });

      setNumberedBlob(output);
      setProgress(100);
      setStatus("complete");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to add page numbers.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (numberedBlob && file) {
      downloadBlob(numberedBlob, `numbered_${file.name}`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setNumberedBlob(null);
    setStatus("idle");
    setErrorMessage("");
  };

  const positions: { id: Position; label: string }[] = [
    { id: "top-left", label: "Top Left" },
    { id: "top-center", label: "Top Center" },
    { id: "top-right", label: "Top Right" },
    { id: "bottom-left", label: "Bottom Left" },
    { id: "bottom-center", label: "Bottom Center" },
    { id: "bottom-right", label: "Bottom Right" },
  ];

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF to add page numbers"
          subtitle="Customize position, format (Page X of Y), and starting indices"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-filora-50 flex items-center justify-center text-filora">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{file.name}</h3>
                <p className="text-xs text-neutral-500">Configure page number placement</p>
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

          {/* Position Matrix */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
              Position on Page
            </label>
            <div className="grid grid-cols-3 gap-2.5 max-w-md">
              {positions.map((pos) => (
                <button
                  key={pos.id}
                  type="button"
                  onClick={() => setPosition(pos.id)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    position === pos.id
                      ? "bg-filora-50 border-filora text-filora shadow-xs"
                      : "bg-surface-subtle border-neutral-200 text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* Format & Starting Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 block">Numbering Format</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    checked={format === "page_of_total"}
                    onChange={() => setFormat("page_of_total")}
                    className="accent-filora"
                  />
                  <span>Page &#123;n&#125; of &#123;total&#125; (e.g. Page 1 of 12)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    checked={format === "simple"}
                    onChange={() => setFormat("simple")}
                    className="accent-filora"
                  />
                  <span>Simple number only (e.g. 1, 2, 3)</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 block">Starting Number</label>
                <input
                  type="number"
                  min="1"
                  value={startNumber}
                  onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                  className="w-24 px-3 py-1.5 rounded-xl border border-neutral-300 focus:border-filora text-xs text-neutral-900"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={skipFirstPage}
                  onChange={(e) => setSkipFirstPage(e.target.checked)}
                  className="accent-filora rounded"
                />
                <span className="font-medium">Skip First Page (Cover sheet)</span>
              </label>
            </div>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            errorMessage={errorMessage}
            message="Page numbers added successfully!"
          />

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            {numberedBlob ? (
              <button
                onClick={handleDownload}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Numbered PDF</span>
              </button>
            ) : (
              <button
                onClick={handleApply}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <Hash className="w-4 h-4" />
                <span>Add Page Numbers Now</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
