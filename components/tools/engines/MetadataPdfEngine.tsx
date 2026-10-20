"use client";

import { useState } from "react";
import { 
  FileCode, 
  Download, 
  FileText, 
  RotateCcw, 
  Trash2 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { editPdfMetadata, extractPdfInfo } from "@/lib/pdf-engine/pdf-core";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";

export function MetadataPdfEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [keywords, setKeywords] = useState("");
  const [creator, setCreator] = useState("Filora Document Toolkit");

  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedBlob, setUpdatedBlob] = useState<Uint8Array | null>(null);

  const handleFile = async (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    setStatus("reading");

    try {
      const buffer = await f.arrayBuffer();
      const info = await extractPdfInfo(buffer);
      setTitle(info.title !== "Untitled" ? info.title : "");
      setAuthor(info.author !== "Unknown" ? info.author : "");
      setSubject(info.subject || "");
      setKeywords(Array.isArray(info.keywords) ? info.keywords.join(", ") : "");
      setStatus("idle");
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  const handleSave = async () => {
    if (!file) return;

    try {
      setStatus("processing");
      setProgress(40);
      setErrorMessage("");

      const buffer = await file.arrayBuffer();
      const output = await editPdfMetadata(buffer, {
        title,
        author,
        subject,
        keywords,
        creator,
      });

      setUpdatedBlob(output);
      setProgress(100);
      setStatus("complete");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to update PDF metadata.");
      setStatus("error");
    }
  };

  const handleClearMetadata = async () => {
    if (!file) return;

    try {
      setStatus("processing");
      setProgress(40);

      const buffer = await file.arrayBuffer();
      const output = await editPdfMetadata(buffer, {
        title: "",
        author: "",
        subject: "",
        keywords: "",
        creator: "",
      });

      setTitle("");
      setAuthor("");
      setSubject("");
      setKeywords("");
      setUpdatedBlob(output);
      setProgress(100);
      setStatus("complete");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to scrub metadata.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (updatedBlob && file) {
      downloadBlob(updatedBlob, `metadata_updated_${file.name}`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setUpdatedBlob(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF to edit or scrub metadata"
          subtitle="Update Title, Author, Subject, Keywords, and Creator software"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-filora-50 flex items-center justify-center text-filora">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{file.name}</h3>
                <p className="text-xs text-neutral-500">Edit Internal PDF Properties</p>
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

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Document Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Financial Report"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-sm text-neutral-900 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. John Doe / Organization Name"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-sm text-neutral-900 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Subject / Description
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Q4 Executive Summary"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-sm text-neutral-900 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Keywords (Comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. finance, quarterly, budget"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-sm text-neutral-900 outline-none"
              />
            </div>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            errorMessage={errorMessage}
            message="Metadata updated successfully!"
          />

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleClearMetadata}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Wipe All Hidden Metadata (Privacy Scrub)</span>
            </button>

            {updatedBlob ? (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Updated PDF</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={status === "processing"}
                className="w-full sm:w-auto px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center justify-center gap-2"
              >
                <FileCode className="w-4 h-4" />
                <span>Save Metadata Now</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
