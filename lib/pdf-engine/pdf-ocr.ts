"use client";

import { createWorker } from "tesseract.js";
import { renderPdfPageToDataUrl } from "./pdf-render";

export async function performOcrOnImage(
  imageSource: string | File,
  language = "eng",
  onProgress?: (progress: number, status: string) => void
): Promise<string> {
  const worker = await createWorker(language, 1, {
    logger: (m) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100), "Recognizing characters...");
      } else if (onProgress) {
        onProgress(20, m.status);
      }
    },
  });

  const ret = await worker.recognize(imageSource);
  await worker.terminate();
  return ret.data.text;
}

export async function performOcrOnPdf(
  pdfBuffer: ArrayBuffer,
  pageCount: number,
  language = "eng",
  onProgress?: (page: number, total: number, status: string) => void
): Promise<{ fullText: string; pageResults: { pageNum: number; text: string }[] }> {
  const worker = await createWorker(language, 1, {
    logger: (m) => {
      // logger callback
    },
  });

  const pageResults: { pageNum: number; text: string }[] = [];
  let fullText = "";

  for (let i = 1; i <= Math.min(pageCount, 20); i++) {
    if (onProgress) onProgress(i, pageCount, `Rendering and recognizing page ${i}...`);
    const pageDataUrl = await renderPdfPageToDataUrl(pdfBuffer, i, 2.0, "image/jpeg", 0.95);
    const ret = await worker.recognize(pageDataUrl);
    const text = ret.data.text.trim();

    pageResults.push({ pageNum: i, text });
    fullText += (fullText ? "\n\n" : "") + `--- Page ${i} (OCR) ---\n` + text;
  }

  await worker.terminate();
  return { fullText, pageResults };
}
