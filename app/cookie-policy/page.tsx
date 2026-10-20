import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata = {
  title: "Cookie Policy | Filora",
  description: "Understand how Filora uses cookies and local storage to deliver a seamless user experience.",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs text-neutral-500 font-semibold">
          Last Updated: March 20, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-neutral-700 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-subtle">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device that allow websites to remember your preferences and enhance performance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">How Filora Uses Cookies & Local Storage</h2>
          <p>
            We use <code>localStorage</code> to store your favorited tools and recent tool history directly on your computer so your workspace remains customized between sessions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900">Third-Party Cookies (AdSense & Analytics)</h2>
          <p>
            Third-party providers such as Google may use cookies to serve relevant advertisements. You may disable cookies through your web browser settings at any time without impacting basic document processing.
          </p>
        </section>
      </div>
    </div>
  );
}
