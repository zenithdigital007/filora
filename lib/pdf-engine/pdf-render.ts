"use client";

import {
  detectFontFromPdf,
  ensureFontLoaded,
  getFontFamilyCss,
} from "./font-manager";

// Dynamic import or setup for PDF.js in the browser
let pdfjsLib: any = null;

async function getPdfjs() {
  if (typeof window === "undefined") return null;
  if (!pdfjsLib) {
    pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
  }
  return pdfjsLib;
}

export async function getPdfDocument(pdfSource: ArrayBuffer | Uint8Array | any) {
  // If already a loaded PDFDocumentProxy, return it directly
  if (pdfSource && typeof pdfSource.getPage === "function" && typeof pdfSource.numPages === "number") {
    return pdfSource;
  }

  const lib = await getPdfjs();
  if (!lib) throw new Error("PDF.js unavailable");

  // Create an isolated byte copy to completely prevent PDF.js worker from detaching the input buffer
  let dataCopy: Uint8Array;
  if (pdfSource instanceof Uint8Array) {
    dataCopy = new Uint8Array(pdfSource.byteLength);
    dataCopy.set(pdfSource);
  } else if (pdfSource instanceof ArrayBuffer) {
    dataCopy = new Uint8Array(pdfSource.byteLength);
    dataCopy.set(new Uint8Array(pdfSource));
  } else {
    dataCopy = new Uint8Array(pdfSource);
  }

  const loadingTask = lib.getDocument({ data: dataCopy });
  return await loadingTask.promise;
}

export async function renderPdfPageToCanvas(
  pdfBuffer: ArrayBuffer | Uint8Array,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  scale = 1.5
): Promise<void> {
  const pdf = await getPdfDocument(pdfBuffer);
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create 2D canvas context");

  const renderContext = {
    canvasContext: ctx,
    viewport,
  };

  await page.render(renderContext).promise;
}

export async function renderPdfPageToDataUrl(
  pdfBuffer: ArrayBuffer | Uint8Array,
  pageNumber: number,
  scale = 2.0,
  format: "image/jpeg" | "image/png" = "image/jpeg",
  quality = 0.92
): Promise<string> {
  const canvas = document.createElement("canvas");
  await renderPdfPageToCanvas(pdfBuffer, pageNumber, canvas, scale);
  return canvas.toDataURL(format, quality);
}

export interface ExtractedTextItem {
  id: string;
  pageIndex: number;
  text: string;
  originalText: string;
  x: number;
  y: number;
  width: number;
  height: number;
  origX: number;
  origY: number;
  origWidth: number;
  origHeight: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  color: string;
  bgColor?: string;
  rawFontName?: string;
  cleanFontFamily?: string;
  detectedFontName?: string;
  cssFontStack?: string;
  baselineY?: number;
  origBaselineY?: number;
  isEdited: boolean;
  isDeleted: boolean;
}

export async function extractAllPageTextItems(
  pdfBuffer: ArrayBuffer | Uint8Array,
  canvasWidth = 612
): Promise<Record<number, ExtractedTextItem[]>> {
  const pdf = await getPdfDocument(pdfBuffer);
  const numPages = pdf.numPages;
  const result: Record<number, ExtractedTextItem[]> = {};

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const unscaledViewport = page.getViewport({ scale: 1.0 });
    const scale = canvasWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });

    const textContent = await page.getTextContent();
    const rawItems: ExtractedTextItem[] = [];

    for (let i = 0; i < textContent.items.length; i++) {
      const item: any = textContent.items[i];
      if (!item.str || !item.str.trim()) continue;

      // item.transform: [scaleX, skewY, skewX, scaleY, tx, ty]
      const tx = item.transform[4];
      const ty = item.transform[5];

      // Convert PDF coordinates (origin bottom-left) to Viewport coordinates (origin top-left)
      const [vx, vy] = viewport.convertToViewportPoint(tx, ty);

      // Font size extraction
      const rawFontSize = Math.sqrt(
        item.transform[0] * item.transform[0] + item.transform[1] * item.transform[1]
      );
      const computedFontSize = Math.max(9, Math.round(rawFontSize * scale));

      // Retrieve font object if available in page common objects
      let fontObj: any = null;
      try {
        if ((page as any).commonObjs?.has?.(item.fontName)) {
          fontObj = (page as any).commonObjs.get(item.fontName);
        }
      } catch {
        // safe fallback
      }

      const styleFont = (textContent.styles?.[item.fontName]?.fontFamily || "").toLowerCase();
      const rawFontName = (item.fontName || "").toLowerCase();

      // Intelligent font detection using font manager catalog and PostScript normalizer
      const detected = detectFontFromPdf(rawFontName, styleFont, {
        name: fontObj?.name,
        bold: fontObj?.bold,
        italic: fontObj?.italic,
        fallbackName: fontObj?.fallbackName || textContent.styles?.[item.fontName]?.fontFamily,
      });

      // Background ensure the detected font family is fully loaded in browser
      ensureFontLoaded(detected.cleanFamily);

      const itemWidth = Math.max(8, (item.width || (item.str.length * computedFontSize * 0.6)) * scale);
      const itemHeight = Math.max(computedFontSize * 1.25, (item.height || computedFontSize * 1.2) * scale);

      // Top position adjustment (vy is baseline in viewport coordinates)
      const adjustedY = Math.max(0, vy - computedFontSize * 1.05);

      rawItems.push({
        id: `orig_txt_${pageNum}_${i}_${Math.random().toString(36).substring(2, 6)}`,
        pageIndex: pageNum - 1,
        text: item.str,
        originalText: item.str,
        x: Math.round(vx),
        y: Math.round(adjustedY),
        width: Math.round(itemWidth),
        height: Math.round(itemHeight),
        origX: Math.round(vx),
        origY: Math.round(adjustedY),
        origWidth: Math.round(itemWidth),
        origHeight: Math.round(itemHeight),
        fontSize: computedFontSize,
        fontFamily: detected.category,
        cleanFontFamily: detected.cleanFamily,
        detectedFontName: detected.cleanFamily,
        cssFontStack: detected.cssStack,
        rawFontName: fontObj?.name || item.fontName,
        fontWeight: detected.fontWeight,
        fontStyle: detected.fontStyle,
        color: "#171717",
        bgColor: "#FFFFFF",
        baselineY: Math.round(vy),
        origBaselineY: Math.round(vy),
        isEdited: false,
        isDeleted: false,
      });
    }

    // Sort items top-to-bottom, left-to-right
    rawItems.sort((a, b) => {
      const yDiff = a.y - b.y;
      if (Math.abs(yDiff) > 5) return yDiff;
      return a.x - b.x;
    });

    // 2. Merge adjacent text tokens on the same horizontal line into unified phrases
    const mergedItems: ExtractedTextItem[] = [];
    let current: ExtractedTextItem | null = null;

    for (const item of rawItems) {
      if (!current) {
        current = { ...item };
        continue;
      }

      const sameLine = Math.abs(current.y - item.y) <= 4;
      const horizontalGap = item.x - (current.x + current.width);
      const sameFont =
        (current.cleanFontFamily === item.cleanFontFamily || current.fontFamily === item.fontFamily) &&
        current.fontWeight === item.fontWeight &&
        Math.abs(current.fontSize - item.fontSize) <= 2;

      if (sameLine && sameFont && horizontalGap >= -4 && horizontalGap <= 18) {
        // Merge into current
        const spacer = horizontalGap > 1 ? " " : "";
        current.text = current.text + spacer + item.text;
        current.originalText = current.originalText + spacer + item.originalText;
        current.width = Math.round((item.x + item.width) - current.x);
        current.height = Math.max(current.height, item.height);
        current.origWidth = current.width;
        current.origHeight = current.height;
      } else {
        mergedItems.push(current);
        current = { ...item };
      }
    }
    if (current) {
      mergedItems.push(current);
    }

    result[pageNum - 1] = mergedItems;
  }

  return result;
}

/**
 * Accurately sample the background color and text color for each extracted text item
 * by inspecting the actual rasterized page image.
 * Uses color frequency clustering:
 * - The dominant color (>65% of region) is the background color.
 * - The secondary high-contrast color is the text color.
 */
export async function enrichTextItemsWithColors(
  pageDataUrl: string,
  items: ExtractedTextItem[],
  canvasWidth = 612
): Promise<ExtractedTextItem[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const imgScale = img.naturalWidth / canvasWidth;
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          resolve(items);
          return;
        }
        ctx.drawImage(img, 0, 0);

        const enriched = items.map((item) => {
          try {
            const sx = Math.max(0, Math.floor((item.origX ?? item.x) * imgScale));
            const sy = Math.max(0, Math.floor((item.origY ?? item.y) * imgScale));
            const sw = Math.min(img.naturalWidth - sx, Math.ceil((item.origWidth ?? item.width) * imgScale));
            const sh = Math.min(img.naturalHeight - sy, Math.ceil((item.origHeight ?? item.height) * imgScale));

            if (sw <= 0 || sh <= 0) return item;

            // Sample bounding box with a 4px padding
            const padX = Math.min(sx, Math.round(4 * imgScale));
            const padY = Math.min(sy, Math.round(4 * imgScale));
            const sampleX = sx - padX;
            const sampleY = sy - padY;
            const sampleW = Math.min(img.naturalWidth - sampleX, sw + padX * 2);
            const sampleH = Math.min(img.naturalHeight - sampleY, sh + padY * 2);

            const imgData = ctx.getImageData(sampleX, sampleY, sampleW, sampleH).data;
            const buckets: Record<string, { count: number; r: number; g: number; b: number }> = {};

            // Quantize colors by 8 to group compression artifacts / anti-aliasing
            for (let i = 0; i < imgData.length; i += 4) {
              const r = imgData[i];
              const g = imgData[i + 1];
              const b = imgData[i + 2];
              const a = imgData[i + 3];
              if (a < 128) continue;

              const qr = (r >> 3) << 3;
              const qg = (g >> 3) << 3;
              const qb = (b >> 3) << 3;
              const key = `${qr},${qg},${qb}`;

              if (!buckets[key]) {
                buckets[key] = { count: 0, r: 0, g: 0, b: 0 };
              }
              buckets[key].count++;
              buckets[key].r += r;
              buckets[key].g += g;
              buckets[key].b += b;
            }

            const bucketList = Object.values(buckets);
            if (bucketList.length === 0) return item;

            // Background is the dominant color (most frequent bucket)
            bucketList.sort((a, b) => b.count - a.count);
            const dominant = bucketList[0];
            const bgR = Math.round(dominant.r / dominant.count);
            const bgG = Math.round(dominant.g / dominant.count);
            const bgB = Math.round(dominant.b / dominant.count);
            const bgHex = `#${((1 << 24) + (bgR << 16) + (bgG << 8) + bgB).toString(16).slice(1)}`;

            // Find text color: bucket with significant count (>1.2% pixels) that is furthest from bg color
            const totalPixels = imgData.length / 4;
            let bestTextBucket: typeof dominant | null = null;
            let maxDist = 0;

            for (let i = 1; i < bucketList.length; i++) {
              const b = bucketList[i];
              if (b.count >= totalPixels * 0.012) {
                const curR = b.r / b.count;
                const curG = b.g / b.count;
                const curB = b.b / b.count;
                const dist = (curR - bgR) ** 2 + (curG - bgG) ** 2 + (curB - bgB) ** 2;
                if (dist > maxDist) {
                  maxDist = dist;
                  bestTextBucket = b;
                }
              }
            }

            let textHex = item.color || "#171717";
            if (bestTextBucket && maxDist > 800) {
              const tr = Math.round(bestTextBucket.r / bestTextBucket.count);
              const tg = Math.round(bestTextBucket.g / bestTextBucket.count);
              const tb = Math.round(bestTextBucket.b / bestTextBucket.count);
              textHex = `#${((1 << 24) + (tr << 16) + (tg << 8) + tb).toString(16).slice(1)}`;
            }

            return {
              ...item,
              bgColor: bgHex,
              color: textHex,
            };
          } catch {
            return item;
          }
        });

        resolve(enriched);
      } catch {
        resolve(items);
      }
    };
    img.onerror = () => resolve(items);
    img.src = pageDataUrl;
  });
}

export async function renderAllPagesToImages(
  pdfBuffer: ArrayBuffer | Uint8Array,
  scale = 2.0,
  format: "image/jpeg" | "image/png" = "image/png",
  quality = 0.95,
  onProgress?: (current: number, total: number) => void
): Promise<{ pageNum: number; dataUrl: string; blob: Blob }[]> {
  const pdf = await getPdfDocument(pdfBuffer);
  const numPages = pdf.numPages;
  const results: { pageNum: number; dataUrl: string; blob: Blob }[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const dataUrl = canvas.toDataURL(format, quality);
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b || new Blob()), format, quality);
    });

    results.push({ pageNum: i, dataUrl, blob });
    if (onProgress) onProgress(i, numPages);
  }

  return results;
}
