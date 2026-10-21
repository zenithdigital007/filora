import { notFound } from "next/navigation";
import { RESOURCES_DATA, getResourceBySlug } from "@/lib/resources-data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TopContentAd, BottomContentAd } from "@/components/ads/AdBanners";
import { getBaseUrl, SITE_CONFIG } from "@/lib/site-config";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="space-y-4">
        <span className="text-xs font-bold text-filora uppercase tracking-wider bg-filora-50 px-2.5 py-1 rounded-full border border-filora-100">
          {resource.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {resource.title}
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed pt-2">
          {resource.summary}
        </p>
      </div>

      <TopContentAd />

      {/* Sections */}
      <div className="space-y-10">
        {resource.content.sections.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900">{sec.heading}</h2>
            <p className="text-sm text-neutral-700 leading-relaxed">{sec.body}</p>

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
                      <tr key={ri} className="hover:bg-surface-subtle/60 transition-colors">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-4 py-3 text-neutral-800 ${ci === 0 ? "font-bold text-filora" : ""}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      <BottomContentAd />
    </div>
  );
}
