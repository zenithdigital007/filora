import { PDFDocument } from "pdf-lib";

export interface ImageToPdfOptions {
  pageSize?: "A4" | "Letter" | "A3" | "A5" | "Legal" | "fit";
  orientation?: "portrait" | "landscape" | "auto";
  margin?: number; // points (e.g. 0, 20, 36)
}

const STANDARD_SIZES: Record<string, { width: number; height: number }> = {
  A4: { width: 595.28, height: 841.89 },
  Letter: { width: 612, height: 792 },
  A3: { width: 841.89, height: 1190.55 },
  A5: { width: 419.53, height: 595.28 },
  Legal: { width: 612, height: 1008 },
};

export async function imagesToPdf(
  images: (string | ArrayBuffer)[],
  options: ImageToPdfOptions = {}
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const { pageSize = "A4", orientation = "auto", margin = 20 } = options;

  for (const imgData of images) {
    let embeddedImage;

    if (typeof imgData === "string") {
      // Data URL
      if (imgData.startsWith("data:image/png")) {
        const base64 = imgData.split(",")[1];
        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        embeddedImage = await pdfDoc.embedPng(bytes);
      } else {
        const base64 = imgData.split(",")[1];
        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        embeddedImage = await pdfDoc.embedJpg(bytes);
      }
    } else {
      // ArrayBuffer
      try {
        embeddedImage = await pdfDoc.embedJpg(imgData);
      } catch {
        embeddedImage = await pdfDoc.embedPng(imgData);
      }
    }

    const imgWidth = embeddedImage.width;
    const imgHeight = embeddedImage.height;

    let targetWidth: number;
    let targetHeight: number;

    if (pageSize === "fit") {
      targetWidth = imgWidth + margin * 2;
      targetHeight = imgHeight + margin * 2;
    } else {
      const baseSize = STANDARD_SIZES[pageSize] || STANDARD_SIZES.A4;
      if (orientation === "landscape" || (orientation === "auto" && imgWidth > imgHeight)) {
        targetWidth = Math.max(baseSize.width, baseSize.height);
        targetHeight = Math.min(baseSize.width, baseSize.height);
      } else {
        targetWidth = Math.min(baseSize.width, baseSize.height);
        targetHeight = Math.max(baseSize.width, baseSize.height);
      }
    }

    const page = pdfDoc.addPage([targetWidth, targetHeight]);

    // Calculate scaling to fit within page margins
    const availWidth = targetWidth - margin * 2;
    const availHeight = targetHeight - margin * 2;
    const scaleFactor = Math.min(availWidth / imgWidth, availHeight / imgHeight);

    const drawWidth = imgWidth * scaleFactor;
    const drawHeight = imgHeight * scaleFactor;

    // Center image on the page
    const drawX = margin + (availWidth - drawWidth) / 2;
    const drawY = margin + (availHeight - drawHeight) / 2;

    page.drawImage(embeddedImage, {
      x: drawX,
      y: drawY,
      width: drawWidth,
      height: drawHeight,
    });
  }

  return await pdfDoc.save();
}
