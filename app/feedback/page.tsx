import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FeedbackSection } from "@/components/common/FeedbackSection";
import { TopContentAd, BottomContentAd } from "@/components/ads/AdBanners";
import { MessageSquare, Lightbulb, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Send Advice & Queries | Filora",
  description:
    "Share your queries, feature suggestions, or advice for the betterment of Filora directly with our development team. Help shape the future of privacy-friendly PDF tools.",
};

export default function FeedbackPage() {
  return (
    <div className="space-y-12 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs items={[{ label: "Advice & Queries" }]} />

        {/* Hero header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-filora-50 border border-filora-200 text-filora text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-filora" />
            <span>Community Driven Development</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-display">
            Advice & Queries for Filora
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Filora is built to serve everyday document workflows without friction or subscriptions. Have ideas for how to make our tools faster, more intuitive, or want to suggest an entirely new PDF utility? Send your advice directly to the developer.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopContentAd />
      </div>

      {/* Main Feedback & Query Component */}
      <FeedbackSection 
        recipientEmail="raokamlesh2803@gmail.com" 
        title="Share Your Thoughts With the Creator"
        subtitle="Select a category below to compose your query or advice. Your message will be formatted and opened in your email client addressed directly to raokamlesh2803@gmail.com."
      />

      {/* Why your feedback matters section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Feature Prioritization</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every requested tool and UI suggestion is logged and prioritized directly on our public product roadmap.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-filora-50 text-filora flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Personal Responses</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We respond directly to every query sent to our mail ID with progress updates and helpful troubleshooting steps.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">100% Privacy Respected</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Your email and personal feedback are kept strictly confidential and will never be shared or used for spam.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BottomContentAd />
      </div>
    </div>
  );
}
