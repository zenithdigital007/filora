import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  GUIDES_DATA, 
  getGuideBySlug 
} from "@/lib/guides-data";
import { getToolBySlug } from "@/lib/tools-registry";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { TopContentAd, InContentAd, BottomContentAd } from "@/components/ads/AdBanners";
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Lightbulb, 
  AlertTriangle, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return GUIDES_DATA.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found | Pdfyara" };

  return {
    title: `${guide.title} | Pdfyara Guide`,
    description: guide.summary,
    openGraph: {
      title: guide.title,
      description: guide.summary,
      url: `https://filora.app/guides/${guide.slug}`,
    },
  };
}

export default async function SingleGuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  const breadcrumbItems = [
    { label: "Guides", href: "/guides" },
    { label: guide.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    dateModified: guide.lastUpdated,
    author: {
      "@type": "Organization",
      name: "Pdfyara Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Pdfyara",
      logo: {
        "@type": "ImageObject",
        url: "https://filora.app/icon.png",
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Guide Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-neutral-500 font-semibold">
          <span className="text-filora font-bold uppercase tracking-wider bg-filora-50 px-2.5 py-1 rounded-full border border-filora-100">
            {guide.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {guide.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Updated {guide.lastUpdated}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed pt-2">
          {guide.content.intro}
        </p>
      </div>

      <TopContentAd />

      {/* Steps List */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900">Step-by-Step Instructions</h2>
        <div className="space-y-4">
          {guide.content.steps.map((s) => (
            <div
              key={s.stepNumber}
              className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-subtle space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-filora text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  {s.stepNumber}
                </div>
                <h3 className="text-base font-bold text-neutral-900">{s.title}</h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed pl-11">{s.description}</p>
              {s.tip && (
                <div className="ml-11 p-3 rounded-xl bg-filora-50 border border-filora-100 text-xs text-filora font-medium flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0" />
                  <span>{s.tip}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <InContentAd />

      {/* Pro Tips & Common Mistakes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Expert Tips</span>
          </div>
          <ul className="space-y-2">
            {guide.content.proTips.map((tip, i) => (
              <li key={i} className="text-xs text-emerald-950 leading-relaxed flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-rose-50/40 border border-rose-100 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Common Mistakes</span>
          </div>
          <ul className="space-y-2">
            {guide.content.commonMistakes.map((mistake, i) => (
              <li key={i} className="text-xs text-rose-950 leading-relaxed flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      {guide.content.faq && guide.content.faq.length > 0 && (
        <FAQAccordion
          items={guide.content.faq.map((f) => ({ question: f.q, answer: f.a }))}
          title="Questions About This Guide"
        />
      )}

      {/* Related Tools Callout */}
      <section className="p-8 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-4">
        <h3 className="text-base font-bold text-neutral-900">Try the Tools Mentioned in this Guide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {guide.relatedTools.map((slug) => {
            const tool = getToolBySlug(slug);
            if (!tool) return null;
            return (
              <Link
                key={slug}
                href={tool.route}
                className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-filora flex items-center justify-between group shadow-xs transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-filora">
                    {tool.name}
                  </div>
                  <div className="text-[11px] text-neutral-500 line-clamp-1">{tool.shortDesc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-filora group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </section>

      <BottomContentAd />
    </div>
  );
}
