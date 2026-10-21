import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Sparkles, ShieldCheck, Heart, Layers, Lock, Zap } from "lucide-react";

export const metadata = {
  title: "About Pdfyara — Free Online Document Productivity Toolkit",
  description: "Learn about Pdfyara's mission to make document workflows simple, fast, and privacy-conscious.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: "About Pdfyara" }]} />

      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          Files, made effortless.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          Pdfyara is built on a single core belief: working with PDFs and digital documents should not require expensive subscription software, invasive registrations, or uploading confidential personal records to mysterious remote cloud servers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-filora-50 flex items-center justify-center text-filora">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">Privacy First</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            We prioritize client-side WebAssembly processing. Your files process directly in your browser and never leave your computer.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-filora-50 flex items-center justify-center text-filora">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">Instant Speed</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Zero upload latency for local tools. Click, process, and download immediately without waiting for server queues.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-filora-50 flex items-center justify-center text-filora">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">Universal Toolkit</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Over 40+ specialized tools designed for students, legal teams, accountants, educators, and everyday users.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm text-neutral-700 leading-relaxed bg-white p-8 rounded-3xl border border-neutral-200 shadow-subtle">
        <h2 className="text-2xl font-bold text-neutral-900">Who We Build For</h2>
        <p>
          From students compiling research papers to legal teams stamping Bates numbers during litigation discovery, Pdfyara empowers millions of document workflows worldwide. We design every tool with a focus on simplicity, visual clarity, and honest limitations.
        </p>
        <p>
          Pdfyara is an independent product. We are not affiliated with Adobe, Microsoft, Apple, Google, or DocuSign. All trademarks mentioned are used purely for descriptive format identification.
        </p>
      </div>
    </div>
  );
}
