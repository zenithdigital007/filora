import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata = {
  title: "Editorial Policy | Pdfyara",
  description: "Learn how Pdfyara researches, writes, reviews, and updates its technical guides, tutorials, and document references.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: "Editorial Policy" }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          Editorial & Quality Policy
        </h1>
        <p className="text-xs text-neutral-500 font-semibold">
          Last Updated: March 20, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-neutral-700 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-subtle">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">1. Original & Genuine Value</h2>
          <p>
            At Pdfyara, we reject thin SEO filler content. Every guide, technical tutorial, and glossary entry published on our platform is researched, structured, and reviewed by document technology specialists to provide genuine, actionable help to users.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">2. Technical Accuracy & Honesty</h2>
          <p>
            We adhere strictly to factual explanations of underlying PDF standards (ISO 32000), cryptographic encryption ciphers (AES-256 vs legacy RC4), and OCR limits. We never make unsubstantiated marketing claims like &quot;100% perfect conversions&quot; or &quot;guaranteed recovery of corrupt files&quot;.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">3. Regular Updates & Maintenance</h2>
          <p>
            Browser capabilities, WebAssembly specifications, and PDF technologies evolve continuously. Our editorial team periodically reviews and updates tutorials to maintain compliance with the latest browser standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">4. Corrections & User Feedback</h2>
          <p>
            If you identify a factual error or outdated reference in any of our guides, please submit a note to <code>raokamlesh2803@gmail.com</code> for review and correction.
          </p>
        </section>
      </div>
    </div>
  );
}
