import Link from "next/link";
import { Sparkles, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TopContentAd, BottomContentAd } from "@/components/ads/AdBanners";
import { getBaseUrl, SITE_CONFIG } from "@/lib/site-config";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

const baseUrl = getBaseUrl();

export const metadata = {
  title: "Document Engineering Blog | PDFYARA",
  description: "Technical deep dives into PDF standards, WebAssembly, cryptographic encryption, and document productivity engineering.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "Document Engineering Blog | PDFYARA",
    description: "Technical deep dives into PDF standards, WebAssembly, and browser document architecture.",
    url: `${baseUrl}/blog`,
    siteName: SITE_CONFIG.brandName,
    type: "website",
    images: ["/icon"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Document Engineering Blog | PDFYARA",
    description: "Insights into PDF standards, client security, and browser architecture.",
    images: ["/icon"],
  },
};

export default function BlogHubPage() {
  const currentBaseUrl = getBaseUrl();
  const breadcrumbSchema = generateBreadcrumbSchema(currentBaseUrl, [
    { name: "Home", path: "/" },
    { name: "Engineering Blog", path: "/blog" },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={[{ label: "Engineering Blog" }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Document Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          PDFYARA Engineering Blog
        </h1>
        <p className="text-sm sm:text-base text-neutral-600">
          Insights into digital document standards, privacy architecture, and high-performance browser computing.
        </p>
      </div>

      <TopContentAd />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 hover:border-filora-300 shadow-subtle hover:shadow-cardHover transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-neutral-500 font-semibold">
                <span className="text-filora font-bold uppercase tracking-wider bg-filora-50 px-2.5 py-0.5 rounded-full border border-filora-100">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.publishedAt}
                </span>
              </div>

              <h2 className="text-xl font-bold text-neutral-900 group-hover:text-filora transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                <User className="w-3.5 h-3.5 text-filora" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-filora">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <BottomContentAd />
    </div>
  );
}
