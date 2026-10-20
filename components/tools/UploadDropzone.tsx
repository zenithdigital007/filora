"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud, File, AlertCircle, Sparkles, Plus } from "lucide-react";
import { formatBytes } from "@/lib/utils";

interface UploadDropzoneProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  onFilesSelected: (files: File[]) => void;
  title?: string;
  subtitle?: string;
}

export function UploadDropzone({
  accept = ".pdf,application/pdf",
  multiple = false,
  maxSizeMb = 100,
  onFilesSelected,
  title = "Drop your document here",
  subtitle = "or click to select file from your device",
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateAndProcess = (fileList: FileList | File[]) => {
    setErrorMessage(null);
    const files = Array.from(fileList);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    const maxBytes = maxSizeMb * 1024 * 1024;

    for (const file of files) {
      if (file.size > maxBytes) {
        setErrorMessage(`File "${file.name}" exceeds the ${maxSizeMb}MB maximum limit.`);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(multiple ? validFiles : [validFiles[0]]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcess(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcess(e.target.files);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-filora bg-filora-50/70 scale-[1.01]"
            : "border-neutral-300 hover:border-filora hover:bg-surface-subtle bg-white"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-filora-50 border border-filora-100 flex items-center justify-center text-filora shadow-xs">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
            <p className="text-xs sm:text-sm text-neutral-500">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              className="px-5 py-2.5 bg-filora hover:bg-filora-700 active:bg-filora-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-card hover:shadow-cardHover transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Choose {multiple ? "Files" : "File"}</span>
            </button>
          </div>

          <div className="text-[11px] text-neutral-400">
            {multiple ? "Multiple files supported" : "Single file"} • Max {maxSizeMb}MB • Client-side processing
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
