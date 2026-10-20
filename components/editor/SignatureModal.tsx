"use client";

import { useState, useRef } from "react";
import { 
  PenTool, 
  Type, 
  Upload, 
  X, 
  Check 
} from "lucide-react";

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSignature: (dataUrl: string) => void;
}

export function SignatureModal({ isOpen, onClose, onSaveSignature }: SignatureModalProps) {
  const [tab, setTab] = useState<"draw" | "type" | "upload">("draw");
  const [typedText, setTypedText] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#171717";
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleDone = () => {
    if (tab === "draw" && canvasRef.current) {
      onSaveSignature(canvasRef.current.toDataURL("image/png"));
      onClose();
    } else if (tab === "type" && typedText.trim()) {
      const tCanvas = document.createElement("canvas");
      tCanvas.width = 400;
      tCanvas.height = 100;
      const ctx = tCanvas.getContext("2d")!;
      ctx.font = "italic bold 36px 'Brush Script MT', cursive, sans-serif";
      ctx.fillStyle = "#171717";
      ctx.fillText(typedText, 20, 60);
      onSaveSignature(tCanvas.toDataURL("image/png"));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl w-full max-w-lg p-6 space-y-5 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <h3 className="text-base font-bold text-neutral-900">Add Electronic Signature</h3>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-1 p-1 bg-surface-subtle border border-neutral-200 rounded-2xl">
          <button
            type="button"
            onClick={() => setTab("draw")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              tab === "draw" ? "bg-white text-filora shadow-xs" : "text-neutral-600"
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Draw</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("type")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              tab === "type" ? "bg-white text-filora shadow-xs" : "text-neutral-600"
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Type</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              tab === "upload" ? "bg-white text-filora shadow-xs" : "text-neutral-600"
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>

        {tab === "draw" && (
          <div className="space-y-2">
            <div className="border border-neutral-300 rounded-2xl bg-white overflow-hidden">
              <canvas
                ref={canvasRef}
                width={440}
                height={160}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
                className="cursor-crosshair w-full h-[160px] touch-none"
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400">Draw with your mouse or finger</span>
              <button onClick={clearCanvas} className="text-neutral-500 hover:text-rose-600 font-semibold">
                Clear Canvas
              </button>
            </div>
          </div>
        )}

        {tab === "type" && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Type your full name..."
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-filora"
            />
            {typedText && (
              <div className="p-6 bg-surface-subtle rounded-2xl border border-neutral-200 text-center font-serif italic text-3xl text-neutral-900">
                {typedText}
              </div>
            )}
          </div>
        )}

        {tab === "upload" && (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  const r = new FileReader();
                  r.onload = () => {
                    onSaveSignature(r.result as string);
                    onClose();
                  };
                  r.readAsDataURL(f);
                }
              }}
              className="w-full text-xs text-neutral-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-filora-50 file:text-filora"
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleDone}
            className="px-6 py-2.5 bg-filora hover:bg-filora-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Apply Signature</span>
          </button>
        </div>
      </div>
    </div>
  );
}
