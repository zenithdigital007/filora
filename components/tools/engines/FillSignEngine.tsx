"use client";

import { useState, useRef, useEffect } from "react";
import { 
  FileSignature, 
  PenTool, 
  Type, 
  Upload, 
  Download, 
  RotateCcw, 
  CheckSquare, 
  Calendar, 
  FileText,
  Trash2
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { renderPdfPageToDataUrl } from "@/lib/pdf-engine/pdf-render";
import { imagesToPdf } from "@/lib/pdf-engine/image-to-pdf";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";

interface OverlayItem {
  id: string;
  type: "signature" | "text" | "check" | "date";
  content: string; // text string or dataUrl for signature
  x: number;
  y: number;
  scale?: number;
}

export function FillSignEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [pageDataUrl, setPageDataUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"draw" | "type" | "upload">("draw");
  const [typedName, setTypedName] = useState("");
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [overlays, setOverlays] = useState<OverlayItem[]>([]);
  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [finalBlob, setFinalBlob] = useState<Uint8Array | null>(null);

  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleFile = async (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    setStatus("reading");

    try {
      const buffer = await f.arrayBuffer();
      const url = await renderPdfPageToDataUrl(buffer, 1, 1.5, "image/jpeg", 0.9);
      setPageDataUrl(url);
      setStatus("idle");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = sigCanvasRef.current;
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
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = sigCanvasRef.current;
    if (canvas) {
      setSignatureDataUrl(canvas.toDataURL("image/png"));
    }
  };

  const clearSignatureCanvas = () => {
    const canvas = sigCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setSignatureDataUrl(null);
    }
  };

  const addSignatureToDocument = () => {
    let sigUrl = signatureDataUrl;

    if (activeTab === "type" && typedName.trim()) {
      const textCanvas = document.createElement("canvas");
      textCanvas.width = 400;
      textCanvas.height = 100;
      const ctx = textCanvas.getContext("2d")!;
      ctx.font = "italic bold 38px 'Brush Script MT', cursive, sans-serif";
      ctx.fillStyle = "#171717";
      ctx.fillText(typedName, 20, 60);
      sigUrl = textCanvas.toDataURL("image/png");
    }

    if (sigUrl) {
      setOverlays((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          type: "signature",
          content: sigUrl!,
          x: 200,
          y: 350,
        },
      ]);
    }
  };

  const addTextElement = (type: "text" | "date" | "check") => {
    let content = "Your Text Here";
    if (type === "date") content = new Date().toLocaleDateString();
    if (type === "check") content = "✓";

    setOverlays((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        type,
        content,
        x: 150,
        y: 200 + prev.length * 30,
      },
    ]);
  };

  const removeOverlay = (id: string) => {
    setOverlays((prev) => prev.filter((o) => o.id !== id));
  };

  const handleFinalize = async () => {
    if (!pageDataUrl) return;

    try {
      setStatus("processing");

      // Bake overlays onto an export canvas
      const baseImg = new Image();
      baseImg.src = pageDataUrl;
      await new Promise((res) => (baseImg.onload = res));

      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = baseImg.width;
      exportCanvas.height = baseImg.height;
      const ctx = exportCanvas.getContext("2d")!;

      ctx.drawImage(baseImg, 0, 0);

      // Draw all overlays
      for (const item of overlays) {
        if (item.type === "signature") {
          const sigImg = new Image();
          sigImg.src = item.content;
          await new Promise((res) => (sigImg.onload = res));
          ctx.drawImage(sigImg, item.x, item.y, 160, 60);
        } else if (item.type === "check") {
          ctx.font = "bold 24px sans-serif";
          ctx.fillStyle = "#171717";
          ctx.fillText("✓", item.x, item.y);
        } else {
          ctx.font = "14px sans-serif";
          ctx.fillStyle = "#171717";
          ctx.fillText(item.content, item.x, item.y);
        }
      }

      const finalDataUrl = exportCanvas.toDataURL("image/jpeg", 0.95);
      const pdfBytes = await imagesToPdf([finalDataUrl], { pageSize: "fit", margin: 0 });

      setFinalBlob(pdfBytes);
      setStatus("complete");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (finalBlob && file) {
      downloadBlob(finalBlob, `signed_${file.name}`);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF to fill & sign"
          subtitle="Add electronic signature, text boxes, dates, and checkmarks"
        />
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-filora-50 flex items-center justify-center text-filora">
                <FileSignature className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{file.name}</h3>
                <p className="text-xs text-neutral-500">Fill & Sign Electronic Document</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setPageDataUrl(null);
                setFinalBlob(null);
                setOverlays([]);
              }}
              className="text-xs text-neutral-500 hover:text-filora flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change File</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls & Signature Creator */}
            <div className="space-y-5 bg-surface-subtle p-5 rounded-2xl border border-neutral-200">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Create Signature
              </h4>

              <div className="flex gap-1 p-1 bg-white border border-neutral-200 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab("draw")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                    activeTab === "draw" ? "bg-filora text-white" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Draw</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("type")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                    activeTab === "type" ? "bg-filora text-white" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Type</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                    activeTab === "upload" ? "bg-filora text-white" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              </div>

              {activeTab === "draw" && (
                <div className="space-y-2">
                  <div className="border border-neutral-300 rounded-xl bg-white overflow-hidden">
                    <canvas
                      ref={sigCanvasRef}
                      width={280}
                      height={120}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="cursor-crosshair w-full h-[120px] touch-none"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-500">Sign with mouse or touch</span>
                    <button
                      type="button"
                      onClick={clearSignatureCanvas}
                      className="text-neutral-500 hover:text-rose-600 font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "type" && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Type your full name..."
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 outline-none focus:border-filora"
                  />
                  {typedName && (
                    <div className="p-3 bg-white rounded-xl border border-neutral-200 text-center font-serif italic text-xl text-neutral-900">
                      {typedName}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "upload" && (
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setSignatureDataUrl(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-xs text-neutral-600"
                />
              )}

              <button
                type="button"
                onClick={addSignatureToDocument}
                className="w-full py-2 bg-filora text-white rounded-xl text-xs font-bold hover:bg-filora-700 transition-colors"
              >
                Place Signature on Page
              </button>

              {/* Form elements helper */}
              <div className="pt-4 border-t border-neutral-200 space-y-2">
                <span className="text-xs font-bold text-neutral-900 block">Quick Form Fields:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => addTextElement("text")}
                    className="p-2 rounded-lg bg-white border border-neutral-200 hover:border-filora text-xs font-semibold flex flex-col items-center gap-1"
                  >
                    <Type className="w-4 h-4 text-filora" />
                    <span>Text</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addTextElement("date")}
                    className="p-2 rounded-lg bg-white border border-neutral-200 hover:border-filora text-xs font-semibold flex flex-col items-center gap-1"
                  >
                    <Calendar className="w-4 h-4 text-filora" />
                    <span>Date</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addTextElement("check")}
                    className="p-2 rounded-lg bg-white border border-neutral-200 hover:border-filora text-xs font-semibold flex flex-col items-center gap-1"
                  >
                    <CheckSquare className="w-4 h-4 text-filora" />
                    <span>Check</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Document Canvas Preview */}
            <div className="lg:col-span-2 space-y-3">
              <div className="relative border border-neutral-300 rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center p-4 min-h-[450px]">
                {pageDataUrl && (
                  <div className="relative shadow-lg bg-white max-w-full">
                    <img src={pageDataUrl} alt="PDF Page" className="max-w-full h-auto block" />

                    {/* Draggable/Placeable Overlays */}
                    {overlays.map((item) => (
                      <div
                        key={item.id}
                        className="absolute cursor-move group border border-dashed border-filora hover:bg-filora-50/40 p-1 rounded transition-all"
                        style={{ left: `${item.x}px`, top: `${item.y}px` }}
                      >
                        {item.type === "signature" ? (
                          <img src={item.content} alt="Signature" className="h-10 w-auto" />
                        ) : (
                          <span className="text-xs font-medium text-neutral-900 bg-white/80 px-1 rounded">
                            {item.content}
                          </span>
                        )}
                        <button
                          onClick={() => removeOverlay(item.id)}
                          className="hidden group-hover:block absolute -top-2 -right-2 p-0.5 bg-rose-600 text-white rounded-full text-[10px]"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Legal Disclaimer */}
              <p className="text-[11px] text-neutral-500 italic">
                Disclaimer: Electronic signing functionality does not determine whether a signature satisfies the specific legal requirements of a particular document or jurisdiction.
              </p>
            </div>
          </div>

          <ProcessingStatus
            status={status}
            message="Document signed and ready for download!"
          />

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            {finalBlob ? (
              <button
                onClick={handleDownload}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Signed PDF</span>
              </button>
            ) : (
              <button
                onClick={handleFinalize}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <FileSignature className="w-4 h-4" />
                <span>Finalize & Sign Document</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
