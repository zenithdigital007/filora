import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata = {
  title: "Terms of Service | Pdfyara",
  description: "Terms and conditions for using Pdfyara's online document tools and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-neutral-500 font-semibold">
          Effective Date: March 20, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-neutral-700 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-subtle">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Pdfyara, you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the platform immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">2. Acceptable Use</h2>
          <p>
            You agree to use Pdfyara only for lawful purposes. You must not use our tools to process, transmit, or distribute illegal content, malware, infringing intellectual property, or unauthorized materials.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">3. User Responsibility & Content Ownership</h2>
          <p>
            You retain 100% intellectual property ownership of all documents you process on Pdfyara. Because Pdfyara does not store or monitor client-side processed files, you are solely responsible for maintaining your own file backups.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">4. Disclaimer of Warranty</h2>
          <p>
            Pdfyara is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. While we strive for high conversion accuracy, we do not guarantee that output files will be 100% error-free.
          </p>
        </section>
      </div>
    </div>
  );
}
