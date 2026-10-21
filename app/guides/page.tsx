import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { GUIDES_DATA } from "@/lib/guides-data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TopContentAd, BottomContentAd } from "@/components/ads/AdBanners";
import { getBaseUrl, SITE_CONFIG } from "@/lib/site-config";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

const baseUrl = getBaseUrl();

export const metadata = {
  title: "PDF Guides & Document Tutorials | PDFYARA",
  description: "Comprehensive step-by-step guides on how to merge, compress, split, sign, redact, and edit PDF documents.",
  alternates: {
    canonical: `${baseUrl}/guides`,
  },
  openGraph: {
    title: "PDF Guides & Document Tutorials | PDFYARA",
    description: "Learn expert tips and best practices to master your documents and streamline workflows.",
    url: `${baseUrl}/guides`,
    siteName: SITE_CONFIG.brandName,
    type: "website",
    images: ["/icon"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Guides & Document Tutorials | PDFYARA",
    description: "Expert tutorials and how-to guides for everyday document tasks.",
    images: ["/icon"],
  },
};

export default function GuidesHubPage() {
  const currentBaseUrl = getBaseUrl();
  const breadcrumbSchema = generateBreadcrumbSchema(currentBaseUrl, [
    { name: "Home", path: "/" },
    { name: "Guides & Tutorials", path: "/guides" },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={[{ label: "Guides & Tutorials" }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Educational Resources</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          PDF Guides & Tutorials
        </h1>
        <p className="text-sm sm:text-base text-neutral-600">
          Learn expert tips and best practices to master your documents and streamline your daily workflows.
        </p>
      </div>

      <TopContentAd />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES_DATA.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group p-6 rounded-3xl bg-white border border-neutral-200 hover:border-filora-300 shadow-subtle hover:shadow-cardHover transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold">
                <span className="text-filora font-bold uppercase tracking-wider bg-filora-50 px-2.5 py-0.5 rounded-full border border-filora-100">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {guide.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-neutral-900 group-hover:text-filora transition-colors leading-snug">
                {guide.title}
              </h2>

              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-filora">
              <span>Read Step-by-Step Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <BottomContentAd />
    </div>
  );
}
