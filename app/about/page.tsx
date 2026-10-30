import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Lock, 
  Zap, 
  Cpu, 
  CheckCircle2, 
  Award, 
  Users, 
  FileText,
  Mail,
  MapPin,
  Clock,
  ExternalLink
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata = {
  title: "About PDFYARA — Engineering Mission, Architecture & Team",
  description: "Learn about PDFYARA's mission to make document workflows fast, private, and 100% free using client-side WebAssembly and modern browser technology.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 text-neutral-800">
      <Breadcrumbs items={[{ label: "About PDFYARA" }]} />

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Engineering Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          Files, made effortless. Privacy, by design.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          PDFYARA was founded on a simple conviction: managing digital documents should not require expensive recurring software subscriptions, mandatory account registrations, or uploading confidential personal records to remote cloud servers.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-filora-50 flex items-center justify-center text-filora">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">100% Client-Side Privacy</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            By compiling high-performance PDF manipulation engines to WebAssembly, your documents execute entirely inside your local device memory sandbox. No remote server ever sees your files.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-filora-50 flex items-center justify-center text-filora">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">Zero Upload Latency</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Because core tasks run on your own CPU, you skip network upload queues. Operations that take minutes on server-based converters finish locally in milliseconds.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-filora-50 flex items-center justify-center text-filora">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">Universal Standard Toolkit</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Over 40+ specialized document utilities engineered to comply strictly with ISO 32000-1 and ISO 32000-2 international PDF standards.
          </p>
        </div>
      </div>

      {/* Origin Story & Why We Built This */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-subtle space-y-6">
        <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>The Origin of PDFYARA</span>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Why Traditional PDF Tools Failed the Modern Web
        </h2>
        <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
          <p>
            For more than two decades, users needing to perform trivial tasks—such as merging two invoices, deleting a blank scanned sheet, or signing a lease agreement—faced a frustrating dilemma: pay hundreds of dollars per year for bulky desktop software, or upload sensitive documents to ad-riddled cloud converters with questionable data retention policies.
          </p>
          <p>
            When modern web browsers gained native support for WebAssembly (Wasm) and multi-threaded Web Workers, the technological status quo changed forever. We realized that modern smartphones, laptops, and tablets possess more than enough computing horsepower to parse complex PDF object streams locally.
          </p>
          <p>
            PDFYARA was engineered from the ground up to eliminate the server upload step. When you merge, split, compress, watermark, rotate, or sign a document on PDFYARA, the math executes directly on your hardware. Your files remain where they belong: in your custody.
          </p>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="bg-surface-subtle p-8 sm:p-10 rounded-3xl border border-neutral-200 space-y-6">
        <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Under the Hood</span>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Our Technical Architecture & Standards Compliance
        </h2>
        <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
          <p>
            PDF is not a simple image format; it is an object-oriented database structured around cross-reference tables, font metric dictionaries, and PostScript vector streams. PDFYARA incorporates industry-proven open document engines:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 space-y-1.5">
              <span className="font-bold text-xs text-neutral-900 block">PDF-Lib & Custom Wasm</span>
              <span className="text-xs text-neutral-600">
                Powers low-level object tree manipulation, incremental updating, and cross-reference table regeneration directly in the browser sandbox.
              </span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 space-y-1.5">
              <span className="font-bold text-xs text-neutral-900 block">PDF.js & HTML5 Canvas</span>
              <span className="text-xs text-neutral-600">
                Delivers pixel-perfect vector rasterization, supporting exact font rendering and high-DPI zoom on Retina and 4K displays.
              </span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 space-y-1.5">
              <span className="font-bold text-xs text-neutral-900 block">Tesseract.js OCR</span>
              <span className="text-xs text-neutral-600">
                Executes neural Optical Character Recognition locally using WebAssembly, converting scanned documents to searchable text with zero data transmission.
              </span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 space-y-1.5">
              <span className="font-bold text-xs text-neutral-900 block">AES-256 Cryptographic Ciphers</span>
              <span className="text-xs text-neutral-600">
                Implements native Web Crypto API for SHA-256 hashing and client-side password protection conforming to ISO 32000-2 security standards.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Standards & Testing Methodology */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-subtle space-y-6">
        <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Quality & Accuracy</span>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Editorial Standards & Quality Assurance
        </h2>
        <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
          <p>
            Unlike automated scraper sites, every technical guide, article, and reference manual published on PDFYARA is authored and reviewed by document engineering professionals. We evaluate every tool and article against:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-filora mt-2 shrink-0" />
              <span><strong>ISO Standards Adherence:</strong> We test output files using the PDF Association’s official test suites to ensure 100% conformance with ISO 32000-1 and ISO 19005 (PDF/A).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-filora mt-2 shrink-0" />
              <span><strong>Cross-Platform Validation:</strong> Output files are verified across Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Adobe Acrobat Reader, and Apple Preview on Mac, Windows, iOS, and Android.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-filora mt-2 shrink-0" />
              <span><strong>Privacy Verification:</strong> Network activity is continually audited using browser developer protocols to guarantee that client-side workflows generate zero outbound data packets.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Sustainable Free Model */}
      <section className="bg-surface-subtle p-8 sm:p-10 rounded-3xl border border-neutral-200 space-y-4">
        <h2 className="text-xl font-bold text-neutral-900">
          How PDFYARA Remains 100% Free
        </h2>
        <p className="text-sm text-neutral-700 leading-relaxed">
          We believe document productivity is a fundamental utility that should be accessible to students, educators, legal aid clinics, and small businesses worldwide. To fund ongoing software engineering, bandwidth, and content curation without charging subscription fees or requiring accounts, PDFYARA displays compliant, unobtrusive advertising through Google AdSense.
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed">
          We strictly reject popups, deceptive download buttons, and intrusive full-screen interstitials. Our advertising layout is designed to respect user focus while supporting free access.
        </p>
      </section>

      {/* Contact & Transparency */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-subtle space-y-6">
        <h2 className="text-xl font-bold text-neutral-900">
          Direct Contact & Support
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-subtle border border-neutral-200">
            <Mail className="w-4 h-4 text-filora shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-neutral-900">Editorial & Technical Inquiries</div>
              <a href="mailto:raokamlesh2803@gmail.com" className="text-filora hover:underline font-semibold block pt-0.5">
                raokamlesh2803@gmail.com
              </a>
              <div className="text-[11px] text-neutral-500 pt-1">Typical response time: under 24 hours</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-subtle border border-neutral-200">
            <Clock className="w-4 h-4 text-filora shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-neutral-900">Continuous Structural Maintenance</div>
              <div className="text-neutral-600 pt-0.5">Updated weekly with new standards revisions and browser engine patches.</div>
              <div className="text-[11px] text-neutral-500 pt-1">Production Domain: pdfyara.com</div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200 flex flex-wrap gap-4 text-xs font-semibold text-filora">
          <Link href="/editorial-policy" className="hover:underline flex items-center gap-1">
            <span>Read our Editorial Policy</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link href="/privacy-policy" className="hover:underline flex items-center gap-1">
            <span>Read our Privacy Policy</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link href="/contact" className="hover:underline flex items-center gap-1">
            <span>Contact Support</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
