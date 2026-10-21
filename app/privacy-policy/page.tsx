import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ShieldCheck, Lock, CheckCircle2, EyeOff } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Pdfyara",
  description: "Learn how Pdfyara protects your confidential files with client-side WebAssembly processing and zero data retention.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Privacy-First Commitment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 font-semibold">
          Last Updated: March 20, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm text-neutral-700 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-subtle">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-900">1. Client-Side Browser Processing (Default)</h2>
          <p>
            The majority of Pdfyara&apos;s tools (including Merge PDF, Split PDF, Compress PDF, Organize PDF, Rotate PDF, Watermark PDF, Page Numbers, Fill & Sign, Protect PDF, Bates Numbering, and OCR) execute <strong>locally in your web browser</strong> using WebAssembly and client-side JavaScript.
          </p>
          <p>
            When using these tools, your files are processed entirely in your computer or phone&apos;s memory sandbox. Your document content is never transmitted across the internet or uploaded to any external server.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-900">2. Server-Supported Conversions</h2>
          <p>
            Certain advanced format conversions (e.g. converting complex layout PDFs to editable Word .docx files) may utilize secure stateless processing workers. When this is required:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
            <li>Files are transmitted over encrypted TLS 1.3 connections.</li>
            <li>Files are processed in isolated stateless sandbox environments.</li>
            <li>Temporary files are automatically and permanently purged immediately upon download.</li>
            <li>No human access to uploaded documents is permitted.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-900">3. Local Storage Usage</h2>
          <p>
            Pdfyara uses your browser&apos;s <code>localStorage</code> solely to save your UI preferences (e.g. your favorited tools and recent tool history). We never store document contents, signatures, or personal data in localStorage.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-900">4. Advertising & Analytics</h2>
          <p>
            Pdfyara may display compliant advertising units through Google AdSense to support the free availability of our tools. Third-party advertising vendors, including Google, may use cookies to serve ads based on prior visits to this or other websites. You may manage your cookie preferences at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-900">5. Contact Information</h2>
          <p>
            For questions regarding our privacy practices, please contact us at <code>raokamlesh2803@gmail.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
