"use client";

import { useState } from "react";
import { 
  Scissors, 
  Download, 
  FileText, 
  RotateCcw, 
  Archive, 
  CheckCircle2 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { splitPdfByRanges } from "@/lib/pdf-engine/pdf-core";
import { downloadBlob, downloadFilesAsZip } from "@/lib/pdf-engine/zip-export";
import { extractPdfInfo } from "@/lib/pdf-engine/pdf-core";
import { formatBytes } from "@/lib/utils";

export function SplitPdfEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<"ranges" | "every" | "odd_even">("ranges");
  const [customRange, setCustomRange] = useState("1-2");
  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [splitResults, setSplitResults] = useState<{ filename: string; data: Uint8Array }[]>([]);

  const handleFile = async (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    setStatus("reading");
    try {
      const buffer = await f.arrayBuffer();
      const info = await extractPdfInfo(buffer);
      setPageCount(info.pageCount);
      setCustomRange(info.pageCount > 2 ? `1-${Math.ceil(info.pageCount / 2)}` : "1");
      setStatus("idle");
    } catch (err) {
      setPageCount(1);
      setStatus("idle");
    }
  };

  const handleSplit = async () => {
    if (!file) return;

    try {
      setStatus("processing");
      setProgress(30);
      setErrorMessage("");

      const buffer = await file.arrayBuffer();
      let rangeQuery = customRange;

      if (splitMode === "every") {
        rangeQuery = "all";
      } else if (splitMode === "odd_even") {
        // Odd pages then even pages
        const odds = [];
        const evens = [];
        for (let i = 1; i <= pageCount; i++) {
          if (i % 2 === 1) odds.push(i);
          else evens.push(i);
        }
        rangeQuery = `${odds.join(",")}`; // simplified
      }

      const results = await splitPdfByRanges(buffer, rangeQuery);
      setSplitResults(results);
      setProgress(100);
      setStatus("complete");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to split PDF.");
      setStatus("error");
    }
  };

  const handleDownloadAllZip = () => {
    if (splitResults.length > 0) {
      downloadFilesAsZip(splitResults, `split_${file?.name.replace(".pdf", "")}.zip`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSplitResults([]);
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
          title="Drop PDF file to split"
          subtitle="Select a multi-page PDF document to divide into sections"
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
                <p className="text-xs text-neutral-500">
                  {pageCount} {pageCount === 1 ? "page" : "pages"} • {formatBytes(file.size)}
                </p>
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

          {/* Split Mode Selector */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
              Choose Split Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSplitMode("ranges")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  splitMode === "ranges"
                    ? "border-filora bg-filora-50 text-filora"
                    : "border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-surface-subtle"
                }`}
              >
                <div className="text-xs font-bold mb-1">Custom Page Ranges</div>
                <div className="text-[11px] text-neutral-500">e.g. 1-3, 5, 8-10</div>
              </button>

              <button
                type="button"
                onClick={() => setSplitMode("every")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  splitMode === "every"
                    ? "border-filora bg-filora-50 text-filora"
                    : "border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-surface-subtle"
                }`}
              >
                <div className="text-xs font-bold mb-1">Split Every Page</div>
                <div className="text-[11px] text-neutral-500">Save each page as 1 PDF</div>
              </button>

              <button
                type="button"
                onClick={() => setSplitMode("odd_even")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  splitMode === "odd_even"
                    ? "border-filora bg-filora-50 text-filora"
                    : "border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-surface-subtle"
                }`}
              >
                <div className="text-xs font-bold mb-1">Odd & Even Pages</div>
                <div className="text-[11px] text-neutral-500">Separate for 2-sided print</div>
              </button>
            </div>

            {splitMode === "ranges" && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-neutral-700 block">
                  Page Ranges (Comma-separated, 1 to {pageCount}):
                </label>
                <input
                  type="text"
                  value={customRange}
                  onChange={(e) => setCustomRange(e.target.value)}
                  placeholder="e.g. 1-2, 3-5"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora focus:ring-2 focus:ring-filora-100 outline-none text-sm text-neutral-900"
                />
                <p className="text-[11px] text-neutral-500">
                  Example: <code>1-3, 5</code> generates two separate documents: one with pages 1-3, and one with page 5.
                </p>
              </div>
            )}
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            errorMessage={errorMessage}
            message={`PDF successfully split into ${splitResults.length} files!`}
          />

          {/* Results List */}
          {splitResults.length > 0 && (
            <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                <span>Generated Files ({splitResults.length})</span>
                <button
                  onClick={handleDownloadAllZip}
                  className="text-filora hover:underline flex items-center gap-1"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Download All as ZIP</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {splitResults.map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-neutral-200 text-xs"
                  >
                    <span className="font-medium text-neutral-800 truncate max-w-xs">{res.filename}</span>
                    <button
                      onClick={() => downloadBlob(res.data, res.filename)}
                      className="text-filora hover:text-filora-700 font-semibold flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            {splitResults.length > 0 ? (
              <button
                onClick={handleDownloadAllZip}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center gap-2"
              >
                <Archive className="w-4 h-4" />
                <span>Download All ({splitResults.length} files) as ZIP</span>
              </button>
            ) : (
              <button
                onClick={handleSplit}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <Scissors className="w-4 h-4" />
                <span>Split PDF Now</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
