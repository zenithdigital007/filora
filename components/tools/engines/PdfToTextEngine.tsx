"use client";

import { useState } from "react";
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  Clock, 
  Layers 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { extractTextFromPdf, TextExtractionResult } from "@/lib/pdf-engine/pdf-text-extract";
import { saveAs } from "file-saver";

export function PdfToTextEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<TextExtractionResult | null>(null);
  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = async (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    setStatus("processing");
    setErrorMessage("");

    try {
      const buffer = await f.arrayBuffer();
      const extracted = await extractTextFromPdf(buffer);
      setResult(extracted);
      setStatus("complete");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to extract text from PDF.");
      setStatus("error");
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadTxt = () => {
    if (result && file) {
      const blob = new Blob([result.fullText], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${file.name.replace(".pdf", "")}_extracted.txt`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF to extract text & count words"
          subtitle="Get selectable text, word metrics, and download plain text files"
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
                <p className="text-xs text-neutral-500">Text & Linguistic Extraction</p>
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

          <ProcessingStatus
            status={status}
            message="Text successfully extracted from all pages!"
            errorMessage={errorMessage}
          />

          {result && (
            <div className="space-y-6 animate-in fade-in">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200 text-center">
                  <div className="text-xl font-extrabold text-filora">{result.totalWords.toLocaleString()}</div>
                  <div className="text-[11px] text-neutral-500 font-medium">Total Words</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200 text-center">
                  <div className="text-xl font-extrabold text-neutral-900">{result.totalChars.toLocaleString()}</div>
                  <div className="text-[11px] text-neutral-500 font-medium">Characters (w/ spaces)</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200 text-center">
                  <div className="text-xl font-extrabold text-neutral-900">{result.pageCount}</div>
                  <div className="text-[11px] text-neutral-500 font-medium">Pages</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200 text-center">
                  <div className="text-xl font-extrabold text-emerald-600">~{result.estimatedReadingTimeMin} min</div>
                  <div className="text-[11px] text-neutral-500 font-medium">Est. Reading Time</div>
                </div>
              </div>

              {/* Text Viewer */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Extracted Text Content
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="px-3.5 py-1.5 bg-surface-subtle hover:bg-filora-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 hover:text-filora flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy Text"}</span>
                    </button>
                    <button
                      onClick={downloadTxt}
                      className="px-3.5 py-1.5 bg-filora text-white rounded-xl text-xs font-semibold hover:bg-filora-700 flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .TXT</span>
                    </button>
                  </div>
                </div>

                <textarea
                  readOnly
                  value={result.fullText}
                  rows={10}
                  className="w-full p-4 rounded-2xl bg-surface-subtle border border-neutral-200 text-xs sm:text-sm text-neutral-800 font-mono leading-relaxed outline-none"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
