"use client";

import { useState } from "react";
import { 
  FileText, 
  GripVertical, 
  Trash2, 
  ArrowDown, 
  Download, 
  RotateCcw, 
  Plus, 
  CheckCircle2, 
  Layers
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { mergePdfFiles } from "@/lib/pdf-engine/pdf-core";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";
import { formatBytes } from "@/lib/utils";

interface UploadedFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
}

export function MergePdfEngine() {
  const [fileList, setFileList] = useState<UploadedFileItem[]>([]);
  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [mergedBlob, setMergedBlob] = useState<Uint8Array | null>(null);

  const handleFiles = (files: File[]) => {
    const items: UploadedFileItem[] = files.map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: f,
      name: f.name,
      size: f.size,
    }));
    setFileList((prev) => [...prev, ...items]);
    setMergedBlob(null);
    setStatus("idle");
  };

  const removeFile = (id: string) => {
    setFileList((prev) => prev.filter((item) => item.id !== id));
    setMergedBlob(null);
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= fileList.length) return;
    const updated = [...fileList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setFileList(updated);
  };

  const handleMerge = async () => {
    if (fileList.length < 2) {
      setErrorMessage("Please upload at least 2 PDF files to merge.");
      setStatus("error");
      return;
    }

    try {
      setStatus("processing");
      setProgress(25);
      setErrorMessage("");

      const buffers: ArrayBuffer[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const buffer = await fileList[i].file.arrayBuffer();
        buffers.push(buffer);
        setProgress(25 + Math.round(((i + 1) / fileList.length) * 40));
      }

      setProgress(75);
      const output = await mergePdfFiles(buffers);
      setProgress(100);
      setMergedBlob(output);
      setStatus("complete");
    } catch (err: any) {
      console.error("Merge error:", err);
      setErrorMessage(err.message || "Failed to merge PDF files.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (mergedBlob) {
      downloadBlob(mergedBlob, `merged_document_${Date.now()}.pdf`);
    }
  };

  const handleReset = () => {
    setFileList([]);
    setMergedBlob(null);
    setStatus("idle");
    setProgress(0);
    setErrorMessage("");
  };

  return (
    <div className="w-full space-y-6">
      {fileList.length === 0 ? (
        <UploadDropzone
          multiple={true}
          onFilesSelected={handleFiles}
          title="Drop PDF files to merge"
          subtitle="Select 2 or more PDF documents to combine into one"
        />
      ) : (
        <div className="space-y-6">
          {/* File management list */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-filora" />
                <span className="font-bold text-neutral-900 text-sm">
                  {fileList.length} Files Selected (Arrange in order)
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-neutral-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="space-y-2">
              {fileList.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-subtle border border-neutral-200 hover:border-filora-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white border border-neutral-200 text-neutral-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <FileText className="w-5 h-5 text-filora shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-neutral-900 max-w-xs sm:max-w-md truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-neutral-400">{formatBytes(item.size)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {index > 0 && (
                      <button
                        onClick={() => moveFile(index, "up")}
                        className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-white transition-colors"
                        title="Move Up"
                      >
                        ↑
                      </button>
                    )}
                    {index < fileList.length - 1 && (
                      <button
                        onClick={() => moveFile(index, "down")}
                        className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-white transition-colors"
                        title="Move Down"
                      >
                        ↓
                      </button>
                    )}
                    <button
                      onClick={() => removeFile(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add more files drop area */}
            <div className="pt-2">
              <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-filora-300 rounded-2xl hover:bg-filora-50 text-filora text-xs font-semibold cursor-pointer transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add More PDF Files</span>
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            errorMessage={errorMessage}
            message="Merged PDF document is ready!"
          />

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            {mergedBlob ? (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-8 py-3.5 bg-filora hover:bg-filora-700 active:bg-filora-800 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Merged PDF</span>
              </button>
            ) : (
              <button
                onClick={handleMerge}
                disabled={fileList.length < 2 || status === "processing"}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold shadow-card transition-all flex items-center justify-center gap-2 ${
                  fileList.length >= 2 && status !== "processing"
                    ? "bg-filora hover:bg-filora-700 text-white cursor-pointer"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Merge {fileList.length} PDFs Now</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
