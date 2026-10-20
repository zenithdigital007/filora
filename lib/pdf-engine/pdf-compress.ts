"use client";

import { PDFDocument } from "pdf-lib";
import { renderAllPagesToImages } from "./pdf-render";
import { imagesToPdf } from "./image-to-pdf";

export type CompressionPreset = "maximum" | "balanced" | "low";

export async function compressPdf(
  pdfBuffer: ArrayBuffer,
  preset: CompressionPreset = "balanced",
  onProgress?: (percent: number, status: string) => void
): Promise<Uint8Array> {
  if (onProgress) onProgress(10, "Analyzing PDF structure...");

  // Preset parameters: scale (resolution multiplier) & JPEG quality
  let scale = 1.5;
  let quality = 0.75;
  let toGrayscale = false;

  if (preset === "maximum") {
    scale = 1.0;
    quality = 0.5;
  } else if (preset === "low") {
    scale = 2.0;
    quality = 0.88;
  }

  if (onProgress) onProgress(30, "Optimizing internal streams...");

  // Render pages to downsampled images
  const images = await renderAllPagesToImages(
    pdfBuffer,
    scale,
    "image/jpeg",
    quality,
    (current, total) => {
      const pct = 30 + Math.round((current / total) * 50);
      if (onProgress) onProgress(pct, `Compressing page ${current} of ${total}...`);
    }
  );

  if (onProgress) onProgress(85, "Rebuilding optimized PDF catalog...");

  // Convert compressed page images back into a streamlined PDF
  const compressedBuffer = await imagesToPdf(
    images.map((img) => img.dataUrl),
    { pageSize: "fit", margin: 0 }
  );

  if (onProgress) onProgress(100, "Optimization complete!");

  return compressedBuffer;
}
