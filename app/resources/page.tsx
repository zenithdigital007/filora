import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { RESOURCES_DATA } from "@/lib/resources-data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TopContentAd, BottomContentAd } from "@/components/ads/AdBanners";
import { getBaseUrl, SITE_CONFIG } from "@/lib/site-config";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

const baseUrl = getBaseUrl();

export const metadata = {
  title: "PDF Resources & Technical Specifications | PDFYARA",
  description: "Explore comprehensive PDF dimensions tables, ISO paper standards, security cipher guides, and document terminology glossaries.",
  alternates: {
    canonical: `${baseUrl}/resources`,
  },
  openGraph: {
    title: "PDF Resources & Technical Specifications | PDFYARA",
    description: "Explore comprehensive PDF dimensions tables, ISO paper standards, and security cipher guides.",
    url: `${baseUrl}/resources`,
    siteName: SITE_CONFIG.brandName,
    type: "website",
    images: ["/icon"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Resources & Technical Specifications | PDFYARA",
    description: "Technical document guides and reference tables.",
    images: ["/icon"],
  },
};

export default function ResourcesHubPage() {
  const currentBaseUrl = getBaseUrl();
  const breadcrumbSchema = generateBreadcrumbSchema(currentBaseUrl, [
    { name: "Home", path: "/" },
    { name: "Resources & Reference", path: "/resources" },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={[{ label: "Resources & Reference" }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          <Layers className="w-3.5 h-3.5" />
          <span>Technical References</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          PDF Resources & Documentation
        </h1>
        <p className="text-sm sm:text-base text-neutral-600">
          In-depth technical specifications, dimension reference tables, security protocols, and terminology glossaries.
        </p>
      </div>

      <TopContentAd />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES_DATA.map((res) => (
          <Link
            key={res.slug}
            href={`/resources/${res.slug}`}
            className="group p-6 rounded-3xl bg-white border border-neutral-200 hover:border-filora-300 shadow-subtle hover:shadow-cardHover transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold text-filora uppercase tracking-wider bg-filora-50 px-2.5 py-0.5 rounded-full border border-filora-100">
                {res.category}
              </span>

              <h2 className="text-lg font-bold text-neutral-900 group-hover:text-filora transition-colors leading-snug">
                {res.title}
              </h2>

              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                {res.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-filora">
              <span>View Technical Reference</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <BottomContentAd />
    </div>
  );
}
