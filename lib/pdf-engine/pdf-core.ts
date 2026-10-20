import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

export async function mergePdfFiles(pdfBuffers: ArrayBuffer[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  for (const buffer of pdfBuffers) {
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return await mergedPdf.save();
}

export async function splitPdfByRanges(
  pdfBuffer: ArrayBuffer,
  ranges: string
): Promise<{ filename: string; data: Uint8Array }[]> {
  const sourcePdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const totalPages = sourcePdf.getPageCount();
  const results: { filename: string; data: Uint8Array }[] = [];

  // Parse ranges like "1-3, 5, 8-10" or "all"
  if (ranges.trim().toLowerCase() === "all") {
    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(sourcePdf, [i]);
      newPdf.addPage(copiedPage);
      results.push({
        filename: `page_${i + 1}.pdf`,
        data: await newPdf.save(),
      });
    }
    return results;
  }

  const rangeParts = ranges.split(",").map((p) => p.trim()).filter(Boolean);
  let index = 1;

  for (const part of rangeParts) {
    const newPdf = await PDFDocument.create();
    const pageIndices: number[] = [];

    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      const start = Math.max(1, parseInt(startStr, 10));
      const end = Math.min(totalPages, parseInt(endStr, 10));
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = start; i <= end; i++) {
          pageIndices.push(i - 1);
        }
      }
    } else {
      const pageNum = parseInt(part, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        pageIndices.push(pageNum - 1);
      }
    }

    if (pageIndices.length > 0) {
      const copied = await newPdf.copyPages(sourcePdf, pageIndices);
      copied.forEach((p) => newPdf.addPage(p));
      results.push({
        filename: `split_part_${index}_(pages_${part.replace(/\s+/g, "")}).pdf`,
        data: await newPdf.save(),
      });
      index++;
    }
  }

  return results;
}

export async function rotatePdfPages(
  pdfBuffer: ArrayBuffer,
  angle: number,
  pageIndices?: number[]
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const pages = pdf.getPages();
  const targets = pageIndices ?? pages.map((_, i) => i);

  for (const idx of targets) {
    if (pages[idx]) {
      const current = pages[idx].getRotation().angle;
      pages[idx].setRotation(degrees((current + angle) % 360));
    }
  }

  return await pdf.save();
}

export async function organizePdfPages(
  pdfBuffer: ArrayBuffer,
  pageActions: { originalIndex: number; rotation: number }[]
): Promise<Uint8Array> {
  const sourcePdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const newPdf = await PDFDocument.create();

  for (const item of pageActions) {
    const [copiedPage] = await newPdf.copyPages(sourcePdf, [item.originalIndex]);
    if (item.rotation) {
      const current = copiedPage.getRotation().angle;
      copiedPage.setRotation(degrees((current + item.rotation) % 360));
    }
    newPdf.addPage(copiedPage);
  }

  return await newPdf.save();
}

export async function addWatermarkToPdf(
  pdfBuffer: ArrayBuffer,
  options: {
    type: "text" | "image";
    text?: string;
    imageBuffer?: ArrayBuffer;
    imageType?: "png" | "jpg";
    opacity: number;
    rotation: number;
    fontSize: number;
    colorHex: string;
  }
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages = pdf.getPages();

  let embeddedImage = null;
  if (options.type === "image" && options.imageBuffer) {
    embeddedImage =
      options.imageType === "png"
        ? await pdf.embedPng(options.imageBuffer)
        : await pdf.embedJpg(options.imageBuffer);
  }

  // Parse color hex
  const r = parseInt(options.colorHex.slice(1, 3) || "80", 16) / 255;
  const g = parseInt(options.colorHex.slice(3, 5) || "03", 16) / 255;
  const b = parseInt(options.colorHex.slice(5, 7) || "C0", 16) / 255;

  for (const page of pages) {
    const { width, height } = page.getSize();

    if (options.type === "text" && options.text) {
      const textWidth = font.widthOfTextAtSize(options.text, options.fontSize);
      const textHeight = font.heightAtSize(options.fontSize);

      page.drawText(options.text, {
        x: width / 2 - textWidth / 2,
        y: height / 2 - textHeight / 2,
        size: options.fontSize,
        font,
        color: rgb(r, g, b),
        opacity: options.opacity,
        rotate: degrees(options.rotation),
      });
    } else if (options.type === "image" && embeddedImage) {
      const imgWidth = embeddedImage.width * 0.5;
      const imgHeight = embeddedImage.height * 0.5;

      page.drawImage(embeddedImage, {
        x: width / 2 - imgWidth / 2,
        y: height / 2 - imgHeight / 2,
        width: imgWidth,
        height: imgHeight,
        opacity: options.opacity,
        rotate: degrees(options.rotation),
      });
    }
  }

  return await pdf.save();
}

export async function addPageNumbersToPdf(
  pdfBuffer: ArrayBuffer,
  options: {
    format: "simple" | "page_of_total" | "custom";
    customFormat?: string;
    position: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    startNumber: number;
    skipFirstPage: boolean;
    fontSize: number;
    colorHex: string;
  }
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();
  const totalPages = pages.length;

  const r = parseInt(options.colorHex.slice(1, 3) || "17", 16) / 255;
  const g = parseInt(options.colorHex.slice(3, 5) || "17", 16) / 255;
  const b = parseInt(options.colorHex.slice(5, 7) || "17", 16) / 255;

  for (let i = 0; i < totalPages; i++) {
    if (i === 0 && options.skipFirstPage) continue;

    const page = pages[i];
    const { width, height } = page.getSize();
    const currentNum = options.startNumber + (options.skipFirstPage ? i - 1 : i);

    let text = `${currentNum}`;
    if (options.format === "page_of_total") {
      text = `Page ${currentNum} of ${totalPages}`;
    } else if (options.format === "custom" && options.customFormat) {
      text = options.customFormat.replace("{n}", `${currentNum}`).replace("{total}", `${totalPages}`);
    }

    const textWidth = font.widthOfTextAtSize(text, options.fontSize);
    const margin = 36; // 0.5 inch

    let x = margin;
    let y = margin;

    if (options.position.includes("center")) {
      x = width / 2 - textWidth / 2;
    } else if (options.position.includes("right")) {
      x = width - margin - textWidth;
    }

    if (options.position.startsWith("top")) {
      y = height - margin;
    }

    page.drawText(text, {
      x,
      y,
      size: options.fontSize,
      font,
      color: rgb(r, g, b),
    });
  }

  return await pdf.save();
}

export async function addBatesNumberingToPdf(
  pdfBuffer: ArrayBuffer,
  options: {
    prefix: string;
    suffix: string;
    startNumber: number;
    digitCount: number;
    position: "top-right" | "bottom-right" | "bottom-center";
    fontSize: number;
  }
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const font = await pdf.embedFont(StandardFonts.CourierBold);
  const pages = pdf.getPages();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    const num = `${options.startNumber + i}`.padStart(options.digitCount, "0");
    const batesText = `${options.prefix}${num}${options.suffix}`;

    const textWidth = font.widthOfTextAtSize(batesText, options.fontSize);
    const margin = 36;
    let x = width - margin - textWidth;
    let y = margin;

    if (options.position === "bottom-center") {
      x = width / 2 - textWidth / 2;
    } else if (options.position === "top-right") {
      y = height - margin;
    }

    page.drawText(batesText, {
      x,
      y,
      size: options.fontSize,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
  }

  return await pdf.save();
}

export async function editPdfMetadata(
  pdfBuffer: ArrayBuffer,
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string;
    creator?: string;
    producer?: string;
  }
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  if (metadata.title !== undefined) pdf.setTitle(metadata.title);
  if (metadata.author !== undefined) pdf.setAuthor(metadata.author);
  if (metadata.subject !== undefined) pdf.setSubject(metadata.subject);
  if (metadata.keywords !== undefined) {
    pdf.setKeywords(metadata.keywords.split(",").map((k) => k.trim()));
  }
  if (metadata.creator !== undefined) pdf.setCreator(metadata.creator);
  if (metadata.producer !== undefined) pdf.setProducer(metadata.producer);

  return await pdf.save();
}

export async function cropPdfPages(
  pdfBuffer: ArrayBuffer,
  margins: { top: number; right: number; bottom: number; left: number }
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const pages = pdf.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const newX = margins.left;
    const newY = margins.bottom;
    const newWidth = Math.max(50, width - margins.left - margins.right);
    const newHeight = Math.max(50, height - margins.top - margins.bottom);

    page.setCropBox(newX, newY, newWidth, newHeight);
  }

  return await pdf.save();
}

export async function extractPdfInfo(pdfBuffer: ArrayBuffer) {
  const pdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const pageCount = pdf.getPageCount();
  const pages = pdf.getPages();
  const firstPageSize = pages[0]?.getSize() || { width: 0, height: 0 };

  return {
    pageCount,
    title: pdf.getTitle() || "Untitled",
    author: pdf.getAuthor() || "Unknown",
    subject: pdf.getSubject() || "",
    keywords: pdf.getKeywords() || [],
    creator: pdf.getCreator() || "",
    producer: pdf.getProducer() || "",
    creationDate: pdf.getCreationDate()?.toISOString() || "",
    modificationDate: pdf.getModificationDate()?.toISOString() || "",
    pageDimensions: {
      widthPt: Math.round(firstPageSize.width),
      heightPt: Math.round(firstPageSize.height),
      widthMm: Math.round(firstPageSize.width * 0.352778),
      heightMm: Math.round(firstPageSize.height * 0.352778),
      widthIn: (firstPageSize.width / 72).toFixed(2),
      heightIn: (firstPageSize.height / 72).toFixed(2),
    },
  };
}
