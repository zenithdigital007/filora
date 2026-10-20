import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata = {
  title: "Disclaimer & Document Limitations | Filora",
  description: "Technical limitations and disclosures regarding PDF conversions, OCR recognition, electronic signatures, and document accuracy.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: "Disclaimer" }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          Disclaimer & Limitations
        </h1>
        <p className="text-xs text-neutral-500 font-semibold">
          Last Updated: March 20, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-neutral-700 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-subtle">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">1. Document Conversion Accuracy</h2>
          <p>
            PDF is a fixed-layout visual format. Converting complex PDFs into editable word processor formats (.docx, .xlsx, .html) involves heuristic layout reconstruction. While Filora strives for high fidelity, formatting discrepancies may occur with non-standard fonts, overlapping layers, or complex multi-column grids.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">2. OCR Recognition Disclosures</h2>
          <p>
            Optical Character Recognition (OCR) neural models depend heavily on input scan resolution, lighting contrast, font styling, and language dictionaries. Filora does not guarantee 100% character recognition accuracy on degraded photocopies or handwritten notes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">3. Electronic Signatures Legal Notice</h2>
          <p>
            Filora&apos;s electronic signing tools provide electronic overlays and signature stamps. Electronic signing functionality does not determine whether a signature satisfies the specific legal, statutory, or regulatory requirements of a particular document, court, or jurisdiction. Users must consult legal counsel for sensitive matters.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">4. Independent Platform</h2>
          <p>
            Filora is an independent productivity platform. We have no affiliation, endorsement, or sponsorship with Adobe Inc., Microsoft Corp., Apple Inc., Google LLC, or DocuSign Inc.
          </p>
        </section>
      </div>
    </div>
  );
}
