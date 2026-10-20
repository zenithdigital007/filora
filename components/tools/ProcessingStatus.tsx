"use client";

import { Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

interface ProcessingStatusProps {
  status: "idle" | "reading" | "processing" | "complete" | "error";
  progress?: number;
  message?: string;
  errorMessage?: string;
}

export function ProcessingStatus({
  status,
  progress = 0,
  message,
  errorMessage,
}: ProcessingStatusProps) {
  if (status === "idle") return null;

  if (status === "error") {
    return (
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 my-4 animate-in fade-in">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-rose-800">
          <div className="font-bold">Filora could not process this file</div>
          <p>{errorMessage || "The document may be encrypted, corrupted, or have unsupported streams."}</p>
        </div>
      </div>
    );
  }

  if (status === "complete") {
    return (
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 my-4 animate-in fade-in">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="text-xs sm:text-sm font-semibold text-emerald-900">
          {message || "Processing finished successfully!"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white border border-filora-200 shadow-card my-4 space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-filora-100 flex items-center justify-center text-filora">
            <Loader2 className="w-4 h-4 animate-spin text-filora" />
          </div>
          <div>
            <div className="text-sm font-bold text-neutral-900">
              {message || (status === "reading" ? "Reading document..." : "Processing...")}
            </div>
            <div className="text-xs text-neutral-500">Executing client-side in your browser</div>
          </div>
        </div>
        {progress > 0 && (
          <span className="text-xs font-bold text-filora bg-filora-50 px-2.5 py-1 rounded-full">
            {progress}%
          </span>
        )}
      </div>

      {progress > 0 && (
        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-filora transition-all duration-300 ease-out rounded-full"
            style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
