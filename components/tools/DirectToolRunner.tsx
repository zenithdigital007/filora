"use client";

import Link from "next/link";
import { Edit3, ArrowRight, Sparkles } from "lucide-react";
import { ToolConfig } from "@/lib/tools-registry";
import { MergePdfEngine } from "./engines/MergePdfEngine";
import { SplitPdfEngine } from "./engines/SplitPdfEngine";
import { CompressPdfEngine } from "./engines/CompressPdfEngine";
import { OrganizePdfEngine } from "./engines/OrganizePdfEngine";
import { WatermarkPdfEngine } from "./engines/WatermarkPdfEngine";
import { PageNumbersEngine } from "./engines/PageNumbersEngine";
import { FillSignEngine } from "./engines/FillSignEngine";
import { ProtectPdfEngine } from "./engines/ProtectPdfEngine";
import { OcrPdfEngine } from "./engines/OcrPdfEngine";
import { PdfToImageEngine } from "./engines/PdfToImageEngine";
import { ImageToPdfEngine } from "./engines/ImageToPdfEngine";
import { PdfToTextEngine } from "./engines/PdfToTextEngine";
import { PdfAnalyzerEngine } from "./engines/PdfAnalyzerEngine";
import { MetadataPdfEngine } from "./engines/MetadataPdfEngine";
import { BatesNumberingEngine } from "./engines/BatesNumberingEngine";
import { UniversalToolEngine } from "./engines/UniversalToolEngine";

interface DirectToolRunnerProps {
  tool: ToolConfig;
}

export function DirectToolRunner({ tool }: DirectToolRunnerProps) {
  switch (tool.slug) {
    case "edit-pdf":
    case "add-text-to-pdf":
      return (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-filora-200 shadow-card text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-filora text-white flex items-center justify-center mx-auto shadow-md">
            <Edit3 className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 text-filora text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Visual PDF Editor</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
              Launch PDFYARA Free PDF Editor
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg mx-auto">
              Access the visual editing canvas with exact font matching, text overlays, digital signatures, freehand pen, shapes, and customizable stamps.
            </p>
          </div>
          <div>
            <Link
              href="/editor"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-filora hover:bg-filora-700 active:bg-filora-800 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all group cursor-pointer"
            >
              <span>Open PDF Editor Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      );
    case "merge-pdf":
      return <MergePdfEngine />;
    case "split-pdf":
      return <SplitPdfEngine />;
    case "compress-pdf":
      return <CompressPdfEngine />;
    case "organize-pdf":
    case "delete-pdf-pages":
    case "extract-pages":
      return <OrganizePdfEngine />;
    case "watermark-pdf":
      return <WatermarkPdfEngine />;
    case "page-numbers":
      return <PageNumbersEngine />;
    case "fill-sign-pdf":
    case "sign-pdf":
      return <FillSignEngine />;
    case "protect-pdf":
      return <ProtectPdfEngine />;
    case "ocr-pdf":
      return <OcrPdfEngine />;
    case "pdf-to-jpg":
    case "pdf-to-png":
      return <PdfToImageEngine />;
    case "jpg-to-pdf":
    case "png-to-pdf":
      return <ImageToPdfEngine />;
    case "pdf-to-text":
    case "pdf-word-counter":
      return <PdfToTextEngine />;
    case "pdf-analyzer":
    case "pdf-page-size":
      return <PdfAnalyzerEngine />;
    case "edit-pdf-metadata":
      return <MetadataPdfEngine />;
    case "bates-numbering":
      return <BatesNumberingEngine />;
    default:
      return <UniversalToolEngine tool={tool} />;
  }
}
