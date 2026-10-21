import Link from "next/link";
import { Sparkles, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TopContentAd, BottomContentAd } from "@/components/ads/AdBanners";

export const metadata = {
  title: "Document Engineering Blog | Pdfyara",
  description: "Technical deep dives into PDF standards, WebAssembly, cryptographic encryption, and document productivity engineering.",
};

export default function BlogHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: "Engineering Blog" }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Document Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          Pdfyara Engineering Blog
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
            className="p-8 rounded-3xl bg-white border border-neutral-200 hover:border-filora hover:shadow-cardHover transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-neutral-500 font-semibold">
                <span className="text-filora font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-neutral-900 group-hover:text-filora transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-filora" />
                {post.author}
              </span>
              <span className="text-filora group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Article &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      <BottomContentAd />
    </div>
  );
}
