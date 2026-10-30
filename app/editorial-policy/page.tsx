import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  RefreshCw, 
  FileCheck, 
  AlertCircle,
  Mail
} from "lucide-react";

export const metadata = {
  title: "Editorial Policy & Content Guidelines | PDFYARA",
  description: "Learn how PDFYARA researches, authors, peer-reviews, and maintains its technical guides, document whitepapers, and software tutorials.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 text-neutral-800">
      <Breadcrumbs items={[{ label: "Editorial Policy" }]} />

      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Publishing Integrity</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          Editorial & Quality Policy
        </h1>
        <p className="text-xs text-neutral-500 font-semibold">
          Last Updated & Formally Reviewed: March 2026 • PDFYARA Standards Committee
        </p>
      </div>

      <div className="space-y-8 text-sm text-neutral-700 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-subtle">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Core Principle 1</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-900">1. Originality and Rejection of Thin Content</h2>
          <p>
            At PDFYARA, we believe that web users deserve authentic, actionable, and mathematically accurate technical guidance. We explicitly reject automated article generation, scraped regurgitation, and thin SEO filler designed solely to attract clicks without providing substance.
          </p>
          <p>
            Every tutorial, guide, dimension reference, and architectural whitepaper published on our platform is authored by specialists in document systems, computer vision, and information security. Articles must offer clear practical explanations, actionable checklists, and authentic troubleshooting steps that solve real-world document challenges.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            <span>Core Principle 2</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-900">2. Technical Accuracy & Standards Adherence</h2>
          <p>
            Digital document engineering is governed by strict international standards:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-neutral-700">
            <li><strong>ISO 32000-1 & ISO 32000-2:</strong> Foundational specification for Portable Document Format syntax, object streams, and geometry dictionaries.</li>
            <li><strong>ISO 19005 (PDF/A):</strong> Archival conformance levels (1b, 1a, 2b, 2u, 3b, 4) for permanent digital document retention.</li>
            <li><strong>ISO 14289 (PDF/UA):</strong> Universal accessibility guidelines for assistive technology and screen reader compatibility.</li>
            <li><strong>W3C WebAssembly (Wasm) Specifications:</strong> Client-side execution sandboxes and memory buffer safety standards.</li>
          </ul>
          <p>
            Our writers verify statements against primary source standards and RFC specifications rather than relying on secondary blog hearsay. We never make inaccurate marketing claims like &quot;100% loss-free raster image compression&quot; or &quot;instant recovery of corrupted, unreadable byte files&quot;.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Core Principle 3</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-900">3. Honest Disclosure of Limitations & Privacy</h2>
          <p>
            Trust requires total transparency. In all tool documentation and educational tutorials, we explicitly clarify:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
            <li>Whether an operation processes client-side in the browser or utilizes secure stateless server workers.</li>
            <li>The fundamental difference between visual masking (drawing black rectangles) and true permanent byte redaction.</li>
            <li>The mathematical limitations of OCR on low-contrast or cursive handwritten scans.</li>
            <li>Why complex vector CAD graphics cannot seamlessly reflow into standard Word (.docx) paragraphs.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
            <RefreshCw className="w-4 h-4" />
            <span>Core Principle 4</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-900">4. Continuous Maintenance & Review Cycle</h2>
          <p>
            Browser engines (Blink, Gecko, WebKit) and WebAssembly APIs evolve on rapid release schedules. Our editorial board conducts quarterly reviews of all published tutorials and technical whitepapers to verify that instructions remain 100% functional on the latest stable versions of Chrome, Safari, Firefox, and Edge.
          </p>
          <p>
            Whenever an underlying ISO standard is updated (such as updates to ISO 32000-2:2020), our technical references are updated accordingly with version changelogs.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Core Principle 5</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-900">5. Corrections Policy & Reader Submissions</h2>
          <p>
            We welcome scrutiny from document engineers, legal technology specialists, and users. If you identify a factual error, typographical mistake, or outdated instruction in any guide or tool description, please report it immediately:
          </p>
          <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200 text-xs">
            <span className="font-bold text-neutral-900 block mb-1">Direct Editorial Board Email:</span>
            <a href="mailto:raokamlesh2803@gmail.com" className="text-filora font-semibold hover:underline">
              raokamlesh2803@gmail.com
            </a>
            <span className="text-neutral-500 block pt-1">
              All reported discrepancies are investigated by an engineer within 48 hours, and corrections are deployed directly to production.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
