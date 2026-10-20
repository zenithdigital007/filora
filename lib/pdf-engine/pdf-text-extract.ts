"use client";

import { getPdfDocument } from "./pdf-render";

export interface TextExtractionResult {
  fullText: string;
  pages: { pageNum: number; text: string; wordCount: number }[];
  totalWords: number;
  totalChars: number;
  totalCharsNoSpaces: number;
  pageCount: number;
  estimatedReadingTimeMin: number;
}

export async function extractTextFromPdf(pdfBuffer: ArrayBuffer | Uint8Array): Promise<TextExtractionResult> {
  const pdf = await getPdfDocument(pdfBuffer);
  const pageCount = pdf.numPages;
  const pages: { pageNum: number; text: string; wordCount: number }[] = [];
  let fullText = "";

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const words = pageText ? pageText.split(/\s+/).filter(Boolean) : [];
    pages.push({
      pageNum: i,
      text: pageText,
      wordCount: words.length,
    });

    fullText += (fullText ? "\n\n" : "") + `--- Page ${i} ---\n` + pageText;
  }

  const allWords = fullText.split(/\s+/).filter(Boolean);
  const totalWords = allWords.length;
  const totalChars = fullText.length;
  const totalCharsNoSpaces = fullText.replace(/\s/g, "").length;
  const estimatedReadingTimeMin = Math.max(1, Math.ceil(totalWords / 200));

  return {
    fullText,
    pages,
    totalWords,
    totalChars,
    totalCharsNoSpaces,
    pageCount,
    estimatedReadingTimeMin,
  };
}
