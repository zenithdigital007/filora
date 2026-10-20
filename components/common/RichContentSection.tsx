import Link from "next/link";
import { 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  ArrowRight,
  Info,
  Lightbulb,
  XCircle
} from "lucide-react";
import { ToolConfig, getToolBySlug } from "@/lib/tools-registry";
import { getGuideBySlug } from "@/lib/guides-data";
import { FAQAccordion } from "./FAQAccordion";
import { InContentAd } from "@/components/ads/AdBanners";

interface RichContentSectionProps {
  tool: ToolConfig;
}

export function RichContentSection({ tool }: RichContentSectionProps) {
  return (
    <div className="mt-16 space-y-16 max-w-4xl mx-auto">
      {/* 1. HOW TO USE */}
      <section>
        <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider mb-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Step-by-Step Guide</span>
        </div>
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-6">
          How to Use {tool.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tool.howToUse.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-subtle flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-xl bg-filora text-white font-black text-sm flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-neutral-900">{step.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Optional InContent Ad */}
      <InContentAd />

      {/* 2. HOW IT WORKS & TECHNOLOGY */}
      <section className="bg-surface-subtle border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>Technical Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-neutral-900">
          How {tool.name} Works Under the Hood
        </h2>
        <p className="text-sm text-neutral-700 leading-relaxed">{tool.howItWorks}</p>

        {tool.optionsExplained && tool.optionsExplained.length > 0 && (
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Options & Configurations Explained
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.optionsExplained.map((opt, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-neutral-200 text-xs">
                  <span className="font-bold text-neutral-900 block mb-0.5">{opt.name}</span>
                  <span className="text-neutral-600">{opt.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 3. PRACTICAL USE CASES */}
      <section>
        <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider mb-2">
          <Lightbulb className="w-4 h-4" />
          <span>Applications</span>
        </div>
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-6">
          Common Use Cases for {tool.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tool.useCases.map((uc, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-1.5 shadow-subtle">
              <h3 className="text-sm font-bold text-neutral-900">{uc.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEST PRACTICES & COMMON MISTAKES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Best Practices */}
        <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Best Practices</span>
          </div>
          <h3 className="text-lg font-bold text-emerald-950">Recommended Approaches</h3>
          <ul className="space-y-2.5">
            {tool.bestPractices.map((bp, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-emerald-900 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Mistakes */}
        <div className="p-6 rounded-3xl bg-rose-50/40 border border-rose-100 space-y-4">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Mistakes to Avoid</span>
          </div>
          <h3 className="text-lg font-bold text-rose-950">Common Pitfalls</h3>
          <ul className="space-y-2.5">
            {tool.commonMistakes.map((cm, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-rose-900 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>{cm}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. LIMITATIONS & HONEST DISCLOSURES */}
      <section className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Technical Limitations & Standards</span>
        </div>
        <h3 className="text-base font-bold text-amber-950">
          What to Keep in Mind
        </h3>
        <ul className="space-y-2">
          {tool.limitations.map((lim, i) => (
            <li key={i} className="text-xs text-amber-900 leading-relaxed flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>{lim}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. PRIVACY INFORMATION */}
      <section className="p-6 rounded-3xl bg-filora-50 border border-filora-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-filora font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Guarantee</span>
          </div>
          <h3 className="text-base font-bold text-neutral-900">
            {tool.processingMode === "browser"
              ? "100% Client-Side Processing"
              : "Secure Temporary Cloud Processing"}
          </h3>
          <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
            {tool.processingMode === "browser"
              ? "This tool runs completely inside your web browser using WebAssembly. Your documents are never uploaded, stored, or viewed by anyone."
              : "This advanced conversion runs on isolated stateless workers and files are automatically purged immediately after download."}
          </p>
        </div>
        <Link
          href="/privacy-policy"
          className="shrink-0 px-4 py-2 text-xs font-semibold text-filora bg-white hover:bg-filora-100 border border-filora-200 rounded-xl transition-colors"
        >
          Privacy Policy &rarr;
        </Link>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      {tool.faq && tool.faq.length > 0 && (
        <FAQAccordion items={tool.faq} title={`${tool.name} FAQ`} />
      )}

      {/* 8. RELATED TOOLS & GUIDES */}
      <section className="pt-8 border-t border-neutral-200 space-y-6">
        <h3 className="text-xl font-bold text-neutral-900">Related Tools & Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tool.relatedTools.map((relSlug) => {
            const relTool = getToolBySlug(relSlug);
            if (!relTool) return null;
            return (
              <Link
                key={relSlug}
                href={relTool.route}
                className="p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-filora hover:bg-filora-50 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-filora">
                    {relTool.name}
                  </div>
                  <div className="text-[11px] text-neutral-500 line-clamp-1">{relTool.shortDesc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-filora group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>

        {tool.relatedGuides && tool.relatedGuides.length > 0 && (
          <div className="pt-4 space-y-3">
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-filora" />
              <span>Step-by-Step Tutorials</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.relatedGuides.map((guideSlug) => {
                const guide = getGuideBySlug(guideSlug);
                if (!guide) return null;
                return (
                  <Link
                    key={guideSlug}
                    href={`/guides/${guide.slug}`}
                    className="p-3.5 rounded-xl bg-surface-subtle hover:bg-filora-50 border border-neutral-200 transition-all block group"
                  >
                    <div className="text-xs font-bold text-neutral-900 group-hover:text-filora mb-1">
                      {guide.title}
                    </div>
                    <div className="text-[11px] text-neutral-500 line-clamp-1">{guide.summary}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
