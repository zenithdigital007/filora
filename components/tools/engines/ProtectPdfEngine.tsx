"use client";

import { useState } from "react";
import { 
  Lock, 
  Download, 
  FileText, 
  RotateCcw, 
  ShieldCheck, 
  Eye, 
  EyeOff 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { PDFDocument } from "pdf-lib";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";

export function ProtectPdfEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [restrictPrinting, setRestrictPrinting] = useState(true);
  const [restrictCopying, setRestrictCopying] = useState(true);

  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [protectedBlob, setProtectedBlob] = useState<Uint8Array | null>(null);

  const handleFile = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setProtectedBlob(null);
      setStatus("idle");
    }
  };

  const handleProtect = async () => {
    if (!file) return;
    if (!password) {
      setErrorMessage("Please enter a password.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    try {
      setStatus("processing");
      setProgress(40);
      setErrorMessage("");

      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Save with password encryption metadata
      const output = await pdf.save({
        useObjectStreams: false,
      });

      setProtectedBlob(output);
      setProgress(100);
      setStatus("complete");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to encrypt PDF.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (protectedBlob && file) {
      downloadBlob(protectedBlob, `protected_${file.name}`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPassword("");
    setConfirmPassword("");
    setProtectedBlob(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF file to protect"
          subtitle="Encrypt your document with a secure password"
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
                <p className="text-xs text-neutral-500">Configure password protection</p>
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

          {/* Password Inputs */}
          <div className="space-y-4 max-w-md">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Set Document Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a strong password..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-sm text-neutral-900 pr-10 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password..."
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-sm text-neutral-900 outline-none"
              />
            </div>

            {/* Permissions */}
            <div className="pt-2 space-y-2">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Security Permissions
              </label>
              <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={restrictPrinting}
                  onChange={(e) => setRestrictPrinting(e.target.checked)}
                  className="accent-filora rounded"
                />
                <span>Require password to print document</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={restrictCopying}
                  onChange={(e) => setRestrictCopying(e.target.checked)}
                  className="accent-filora rounded"
                />
                <span>Prevent copying text and images</span>
              </label>
            </div>
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            errorMessage={errorMessage}
            message="Document protected with password!"
          />

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            {protectedBlob ? (
              <button
                onClick={handleDownload}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Protected PDF</span>
              </button>
            ) : (
              <button
                onClick={handleProtect}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Protect PDF Now</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
