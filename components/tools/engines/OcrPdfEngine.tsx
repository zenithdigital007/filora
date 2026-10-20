"use client";

import { useState } from "react";
import { 
  ScanText, 
  Download, 
  FileText, 
  RotateCcw, 
  Copy, 
  Check, 
  Globe 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { performOcrOnPdf, performOcrOnImage } from "@/lib/pdf-engine/pdf-ocr";
import { extractPdfInfo } from "@/lib/pdf-engine/pdf-core";
import { saveAs } from "file-saver";

export function OcrPdfEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("eng");
  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setExtractedText("");
      setStatus("idle");
    }
  };

  const handleOcr = async () => {
    if (!file) return;

    try {
      setStatus("processing");
      setErrorMessage("");

      const isPdf = file.name.toLowerCase().endsWith(".pdf");
      if (isPdf) {
        const buffer = await file.arrayBuffer();
        const info = await extractPdfInfo(buffer);

        const result = await performOcrOnPdf(buffer, info.pageCount, language, (page, tot, msg) => {
          setProgress(Math.round((page / tot) * 100));
          setStatusMessage(msg);
        });

        setExtractedText(result.fullText);
      } else {
        // Image
        setStatusMessage("Recognizing text from image...");
        const text = await performOcrOnImage(file, language, (p, msg) => {
          setProgress(p);
          setStatusMessage(msg);
        });
        setExtractedText(text);
      }

      setStatus("complete");
    } catch (err: any) {
      console.error("OCR error:", err);
      setErrorMessage(err.message || "OCR recognition failed.");
      setStatus("error");
    }
  };

  const copyToClipboard = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadTxt = () => {
    if (extractedText && file) {
      const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `ocr_${file.name.replace(/\.[^/.]+$/, "")}.txt`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setExtractedText("");
    setStatus("idle");
    setProgress(0);
    setErrorMessage("");
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          accept=".pdf,image/png,image/jpeg"
          onFilesSelected={handleFile}
          title="Drop scanned PDF or image for OCR"
          subtitle="Extract searchable, editable text directly in your browser"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-filora-50 flex items-center justify-center text-filora">
                <ScanText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{file.name}</h3>
                <p className="text-xs text-neutral-500">Optical Character Recognition</p>
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

          {/* Language Selector */}
          <div className="space-y-2 max-w-sm">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-filora" />
              <span>Document Language</span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-filora text-xs text-neutral-900 bg-white"
            >
              <option value="eng">English</option>
              <option value="spa">Spanish (Español)</option>
              <option value="fra">French (Français)</option>
              <option value="deu">German (Deutsch)</option>
              <option value="hin">Hindi (हिन्दी)</option>
              <option value="tel">Telugu (తెలుగు)</option>
            </select>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={statusMessage || "OCR completed successfully!"}
            errorMessage={errorMessage}
          />

          {/* Extracted Text Box */}
          {extractedText && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Recognized Text
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1.5 bg-surface-subtle hover:bg-filora-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 hover:text-filora flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Text"}</span>
                  </button>
                  <button
                    onClick={downloadTxt}
                    className="px-3 py-1.5 bg-filora text-white rounded-xl text-xs font-semibold hover:bg-filora-700 flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .TXT</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={extractedText}
                rows={10}
                className="w-full p-4 rounded-2xl bg-surface-subtle border border-neutral-200 text-xs sm:text-sm text-neutral-800 font-mono leading-relaxed outline-none"
              />
            </div>
          )}

          {/* Action Button */}
          {!extractedText && (
            <div className="flex items-center justify-end pt-2">
              <button
                onClick={handleOcr}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <ScanText className="w-4 h-4" />
                <span>Run In-Browser OCR Now</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
