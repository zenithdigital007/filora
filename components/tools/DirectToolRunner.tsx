"use client";

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
    case "merge-pdf":
      return <MergePdfEngine />;
    case "split-pdf":
      return <SplitPdfEngine />;
    case "compress-pdf":
      return <CompressPdfEngine />;
    case "organize-pdf":
      return <OrganizePdfEngine />;
    case "watermark-pdf":
      return <WatermarkPdfEngine />;
    case "page-numbers":
      return <PageNumbersEngine />;
    case "fill-sign-pdf":
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
