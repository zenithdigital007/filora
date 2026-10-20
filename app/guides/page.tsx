import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { GUIDES_DATA } from "@/lib/guides-data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TopContentAd, BottomContentAd } from "@/components/ads/AdBanners";

export const metadata = {
  title: "PDF Guides & Document Tutorials | Filora",
  description: "Comprehensive step-by-step guides on how to merge, compress, split, sign, redact, and edit PDF documents.",
};

export default function GuidesHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
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

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES_DATA.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="p-6 rounded-3xl bg-white border border-neutral-200 hover:border-filora hover:shadow-cardHover transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-neutral-500 font-semibold">
                <span className="text-filora font-bold uppercase tracking-wider">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {guide.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-neutral-900 group-hover:text-filora transition-colors">
                {guide.title}
              </h2>

              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                {guide.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-filora">
              <span>Read Full Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <BottomContentAd />
    </div>
  );
}
