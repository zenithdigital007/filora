import { notFound } from "next/navigation";
import Link from "next/link";
import { RESOURCES_DATA, getResourceBySlug } from "@/lib/resources-data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TopContentAd, InContentAd, BottomContentAd } from "@/components/ads/AdBanners";
import { getBaseUrl, SITE_CONFIG } from "@/lib/site-config";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";
import { 
  Layers, 
  ArrowLeft, 
  ShieldCheck, 
  Info, 
  Lightbulb, 
  AlertTriangle 
} from "lucide-react";

interface ResourcePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return RESOURCES_DATA.map((res) => ({
    slug: res.slug,
  }));
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const { slug } = await params;
  const res = getResourceBySlug(slug);
  const baseUrl = getBaseUrl();

  if (!res) return { title: "Resource Not Found | PDFYARA" };

  const resUrl = `${baseUrl}/resources/${res.slug}`;

  return {
    title: `${res.title} | PDFYARA Technical Reference`,
    description: res.summary,
    alternates: {
      canonical: resUrl,
    },
    openGraph: {
      title: res.title,
      description: res.summary,
      url: resUrl,
      siteName: SITE_CONFIG.brandName,
      type: "article",
      images: ["/icon"],
    },
    twitter: {
      card: "summary_large_image",
      title: res.title,
      description: res.summary,
      images: ["/icon"],
    },
  };
}

export default async function SingleResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  const baseUrl = getBaseUrl();

  if (!resource) notFound();

  const breadcrumbItems = [
    { label: "Resources", href: "/resources" },
    { label: resource.title },
  ];

  const resourceUrl = `${baseUrl}/resources/${resource.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: resource.title,
        description: resource.summary,
        mainEntityOfPage: resourceUrl,
        author: {
          "@type": "Organization",
          name: `${SITE_CONFIG.brandName} Engineering Team`,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_CONFIG.brandName,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/icon`,
          },
        },
      },
      generateBreadcrumbSchema(baseUrl, [
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources" },
        { name: resource.title, path: `/resources/${resource.slug}` },
      ]),
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbItems} />
        <Link
          href="/resources"
          className="text-xs font-semibold text-filora hover:underline flex items-center gap-1 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All References</span>
        </Link>
      </div>

      <header className="space-y-4 border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-filora uppercase tracking-wider bg-filora-50 px-3 py-1 rounded-full border border-filora-100">
            {resource.category}
          </span>
          {resource.lastUpdated && (
            <span className="text-xs text-neutral-400 font-medium">
              Verified {resource.lastUpdated}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {resource.title}
        </h1>
        
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed pt-1">
          {resource.summary}
        </p>
      </header>

      <TopContentAd />

      {/* Sections */}
      <div className="space-y-12 text-neutral-800 leading-relaxed">
        {resource.content.sections.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {sec.heading}
            </h2>

            {/* Paragraphs */}
            {sec.paragraphs && sec.paragraphs.length > 0 ? (
              sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {para}
                </p>
              ))
            ) : sec.body ? (
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">{sec.body}</p>
            ) : null}

            {/* Bullet Points */}
            {sec.bulletPoints && sec.bulletPoints.length > 0 && (
              <ul className="space-y-2.5 pl-2 my-4">
                {sec.bulletPoints.map((bp, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-filora mt-2 shrink-0" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Callouts */}
            {sec.callout && (
              <div
                className={`p-5 rounded-2xl border text-xs sm:text-sm my-6 flex items-start gap-3 ${
                  sec.callout.type === "warning"
                    ? "bg-rose-50/70 border-rose-200 text-rose-950"
                    : sec.callout.type === "tip"
                    ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                    : "bg-filora-50/60 border-filora-200 text-filora-950"
                }`}
              >
                {sec.callout.type === "warning" ? (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                ) : sec.callout.type === "tip" ? (
                  <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-filora shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold text-neutral-900">{sec.callout.title}</div>
                  <div className="leading-relaxed">{sec.callout.text}</div>
                </div>
              </div>
            )}

            {/* Table */}
            {sec.table && (
              <div className="overflow-x-auto my-6 border border-neutral-200 rounded-2xl shadow-subtle">
                <table className="min-w-full divide-y divide-neutral-200 text-xs sm:text-sm">
                  <thead className="bg-surface-subtle">
                    <tr>
                      {sec.table.headers.map((h, hi) => (
                        <th
                          key={hi}
                          className="px-4 py-3 text-left font-bold text-neutral-900 uppercase tracking-wider text-[11px]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 bg-white">
                    {sec.table.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-surface-subtle/50 transition-colors">
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`px-4 py-3 text-neutral-800 ${
                              ci === 0 ? "font-bold text-neutral-900" : ""
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* In-content ad halfway through the resource */}
            {idx === Math.floor(resource.content.sections.length / 2) && <InContentAd />}
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="pt-8 border-t border-neutral-200 space-y-6">
        <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-filora text-white flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-neutral-900">
                PDFYARA Document Architecture Reference
              </div>
              <div className="text-xs text-neutral-500">
                Maintained according to ISO 32000-1 and ISO 32000-2 specifications
              </div>
            </div>
          </div>
          <div className="text-xs text-neutral-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Validated Technical Data</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-500">
          <Link href="/resources" className="text-filora font-semibold hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Technical Resources</span>
          </Link>
          <Link href="/tools" className="text-filora font-semibold hover:underline">
            Explore 40+ Document Tools
          </Link>
        </div>
      </footer>

      <BottomContentAd />
    </article>
  );
}
