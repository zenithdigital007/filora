"use client";

import { useState } from "react";
import { 
  ShieldAlert, 
  Download, 
  FileText, 
  RotateCcw, 
  Type, 
  Image as ImageIcon 
} from "lucide-react";
import { UploadDropzone } from "../UploadDropzone";
import { ProcessingStatus } from "../ProcessingStatus";
import { addWatermarkToPdf } from "@/lib/pdf-engine/pdf-core";
import { downloadBlob } from "@/lib/pdf-engine/zip-export";

export function WatermarkPdfEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [wmType, setWmType] = useState<"text" | "image">("text");
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.25);
  const [rotation, setRotation] = useState(45);
  const [fontSize, setFontSize] = useState(48);
  const [colorHex, setColorHex] = useState("#5003C0");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [status, setStatus] = useState<"idle" | "reading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [watermarkedBlob, setWatermarkedBlob] = useState<Uint8Array | null>(null);

  const handleFile = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setWatermarkedBlob(null);
      setStatus("idle");
    }
  };

  const handleApplyWatermark = async () => {
    if (!file) return;

    try {
      setStatus("processing");
      setProgress(40);
      setErrorMessage("");

      const pdfBuffer = await file.arrayBuffer();
      let imageBuffer: ArrayBuffer | undefined = undefined;
      let imageType: "png" | "jpg" = "png";

      if (wmType === "image" && imageFile) {
        imageBuffer = await imageFile.arrayBuffer();
        imageType = imageFile.type.includes("png") ? "png" : "jpg";
      }

      const output = await addWatermarkToPdf(pdfBuffer, {
        type: wmType,
        text,
        imageBuffer,
        imageType,
        opacity,
        rotation,
        fontSize,
        colorHex,
      });

      setWatermarkedBlob(output);
      setProgress(100);
      setStatus("complete");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to apply watermark.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (watermarkedBlob && file) {
      downloadBlob(watermarkedBlob, `watermarked_${file.name}`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setImageFile(null);
    setWatermarkedBlob(null);
    setStatus("idle");
    setErrorMessage("");
  };

  const presets = ["CONFIDENTIAL", "DRAFT", "SAMPLE", "INTERNAL USE", "DO NOT COPY"];

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <UploadDropzone
          multiple={false}
          onFilesSelected={handleFile}
          title="Drop PDF file to watermark"
          subtitle="Apply custom text or logo watermarks across all pages"
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
                <p className="text-xs text-neutral-500">Ready for watermark stamping</p>
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

          {/* Watermark Type Selector */}
          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-surface-subtle border border-neutral-200 rounded-2xl w-fit">
              <button
                type="button"
                onClick={() => setWmType("text")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  wmType === "text" ? "bg-white text-filora shadow-xs" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Type className="w-4 h-4" />
                <span>Text Watermark</span>
              </button>
              <button
                type="button"
                onClick={() => setWmType("image")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  wmType === "image" ? "bg-white text-filora shadow-xs" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Image / Logo</span>
              </button>
            </div>

            {wmType === "text" ? (
              <div className="space-y-4">
                {/* Presets */}
                <div>
                  <label className="text-xs font-semibold text-neutral-600 mb-1.5 block">
                    Quick Presets:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {presets.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setText(p)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          text === p
                            ? "bg-filora-50 border-filora text-filora"
                            : "bg-surface-subtle border-neutral-200 text-neutral-700 hover:border-neutral-300"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Text Input */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 block">Watermark Text</label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora outline-none text-sm text-neutral-900"
                  />
                </div>

                {/* Controls Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-neutral-600">
                      <span>Opacity</span>
                      <span className="font-bold">{Math.round(opacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="1"
                      step="0.05"
                      value={opacity}
                      onChange={(e) => setOpacity(parseFloat(e.target.value))}
                      className="w-full accent-filora"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-neutral-600">
                      <span>Rotation</span>
                      <span className="font-bold">{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-90"
                      max="90"
                      step="15"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="w-full accent-filora"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-neutral-600">
                      <span>Font Size</span>
                      <span className="font-bold">{fontSize}pt</span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="96"
                      step="4"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full accent-filora"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-neutral-700 block">Upload Logo Image (PNG / JPG)</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                  className="w-full text-xs text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-filora-50 file:text-filora hover:file:bg-filora-100"
                />
                {imageFile && (
                  <p className="text-xs text-emerald-600 font-medium">Selected: {imageFile.name}</p>
                )}
              </div>
            )}
          </div>

          <ProcessingStatus
            status={status}
            progress={progress}
            errorMessage={errorMessage}
            message="Watermark successfully applied to all pages!"
          />

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            {watermarkedBlob ? (
              <button
                onClick={handleDownload}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Watermarked PDF</span>
              </button>
            ) : (
              <button
                onClick={handleApplyWatermark}
                disabled={status === "processing"}
                className="px-8 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-sm font-bold shadow-card transition-all flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Apply Watermark Now</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
