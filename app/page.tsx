import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Layers, 
  FileSignature, 
  Edit3, 
  Minimize2, 
  Scissors, 
  ScanText, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle,
  FolderOpen
} from "lucide-react";
import { TOOLS_REGISTRY, TOOL_CATEGORIES } from "@/lib/tools-registry";
import { ToolCard } from "@/components/common/ToolCard";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { FeedbackSection } from "@/components/common/FeedbackSection";
import { TopContentAd, InContentAd, BottomContentAd } from "@/components/ads/AdBanners";
import { GUIDES_DATA } from "@/lib/guides-data";

export default function HomePage() {
  const popularSlugs = [
    "edit-pdf",
    "merge-pdf",
    "compress-pdf",
    "split-pdf",
    "pdf-to-word",
    "pdf-to-jpg",
    "fill-sign-pdf",
    "protect-pdf",
    "ocr-pdf",
    "organize-pdf",
    "jpg-to-pdf",
    "pdf-to-excel",
  ];

  const popularTools = popularSlugs
    .map((s) => TOOLS_REGISTRY.find((t) => t.slug === s))
    .filter(Boolean) as typeof TOOLS_REGISTRY;

  const homepageFaqs = [
    {
      question: "Are Filora's document tools free to use?",
      answer: "Yes, Filora provides free access to standard document productivity tools—including merging, splitting, compressing, rotating, watermarking, electronic signing, and OCR—without mandatory accounts or paywalls."
    },
    {
      question: "How does Filora protect my privacy and document data?",
      answer: "For tools running client-side, Filora executes mathematical transformations directly in your browser using WebAssembly. Your documents are never uploaded to remote servers. Where server-side processing is required for complex conversions, files are handled in isolated stateless workers and automatically deleted immediately after processing."
    },
    {
      question: "Do I need to install any software or desktop plugins?",
      answer: "No. Filora operates directly in any modern web browser on Mac, Windows, Linux, iOS, and Android without plugins or installation."
    },
    {
      question: "Can I use Filora on mobile phones and tablets?",
      answer: "Yes! Filora is fully responsive and optimized for touch interactions on smartphones and tablets, allowing you to sign, compress, or merge PDFs on the go."
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-filora-50/60 via-white to-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-filora-200 text-filora text-xs font-bold shadow-xs mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <Sparkles className="w-4 h-4 text-filora" />
            <span>Files, made effortless • Simple tools for every document</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6 font-display">
            Free Online PDF Tools & <span className="text-filora">Free PDF Editor</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
            The 100% free online PDF editor and document toolkit. Edit text directly, merge, split, compress, convert, sign, and organize documents with zero watermarks or signup.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
            <Link
              href="/editor"
              className="w-full sm:w-auto px-8 py-4 bg-filora hover:bg-filora-700 active:bg-filora-800 text-white rounded-2xl text-sm font-bold shadow-cardHover transition-all flex items-center justify-center gap-2 group"
            >
              <Edit3 className="w-4 h-4" />
              <span>Free PDF Editor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/tools"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-filora-50 active:bg-filora-100 text-filora border-2 border-filora rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Explore 40+ Tools</span>
            </Link>
          </div>

          {/* Supporting Trust Statement */}
          <p className="text-xs text-neutral-500 font-medium">
            Simple tools. Clear controls. Privacy-conscious processing.
          </p>
        </div>
      </section>

      {/* Optional Top Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopContentAd />
      </div>

      {/* 2. POPULAR TOOLS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-filora uppercase tracking-wider mb-1">
              Essential Utilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Popular PDF Tools
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-xs sm:text-sm font-bold text-filora hover:underline flex items-center gap-1"
          >
            <span>View all 40+ tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* 3. TOOLS BY CATEGORY */}
      <section className="bg-surface-subtle border-y border-neutral-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold text-filora uppercase tracking-wider">
              Browse Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Tools by Category
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Discover dedicated utilities tailored for every document and workflow requirement.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {TOOL_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <Link
                key={cat.id}
                href={`/tools?category=${encodeURIComponent(cat.name)}`}
                className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-filora hover:shadow-cardHover transition-all flex flex-col justify-between group"
              >
                <div className="text-xs font-bold text-neutral-900 group-hover:text-filora mb-1">
                  {cat.name}
                </div>
                <div className="text-[11px] text-neutral-500">
                  {cat.count} {cat.count === 1 ? "Tool" : "Tools"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-filora uppercase tracking-wider">
            Simple Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            How Filora Works
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Complete your document tasks with as few steps as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Choose a tool", desc: "Select from 40+ specialized tools designed for editing, converting, merging, and signing." },
            { step: "2", title: "Upload your file", desc: "Drag and drop your PDF or image files from your computer or mobile device." },
            { step: "3", title: "Customize options", desc: "Configure presets, page ranges, watermarks, or rotation angles with clear controls." },
            { step: "4", title: "Download result", desc: "Save your processed document directly to your device or download all pages in a ZIP." }
          ].map((s) => (
            <div key={s.step} className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-subtle space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-filora text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                {s.step}
              </div>
              <h3 className="text-base font-bold text-neutral-900">{s.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-surface-subtle border border-neutral-200 text-center text-xs text-neutral-500 max-w-3xl mx-auto leading-relaxed">
          Processing method depends on the tool. Some operations run directly in your browser using client-side WebAssembly, while advanced format conversions may require secure server-side processing.
        </div>
      </section>

      {/* Optional InContent Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InContentAd />
      </div>

      {/* 5. WHY FILORA (4 PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-filora uppercase tracking-wider">
            Product Principles
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Why Choose Filora?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Zap, title: "Free Tools", desc: "No subscriptions or credit cards required for everyday document tasks." },
            { icon: Sparkles, title: "Simple Interface", desc: "Clean controls, zero visual clutter, and no confusing multi-step menus." },
            { icon: ShieldCheck, title: "Privacy-Conscious", desc: "Browser-side processing keeps your confidential files safely on your device." },
            { icon: BookOpen, title: "Useful Resources", desc: "Comprehensive step-by-step guides and technical document references." }
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-subtle space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-filora-50 flex items-center justify-center text-filora">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">{p.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. EDUCATIONAL CONTENT SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            What Can You Do with Filora?
          </h2>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Filora is built to simplify the complete document lifecycle for individuals, businesses, educators, and legal professionals. From standard tasks like combining receipts into a single monthly PDF to complex workflows like applying Bates numbers for legal discovery, Filora eliminates the need for bulky software suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-3">
            <h3 className="text-base font-bold text-neutral-900">Browser-Based vs Server-Based Processing</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Whenever technically possible, Filora processes documents locally using WebAssembly and client-side JavaScript. This ensures that your financial statements, health records, and private contracts never leave your computer or phone.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-3">
            <h3 className="text-base font-bold text-neutral-900">Common Document Problems We Help Solve</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Fix upside-down scanned pages, shrink files exceeding email size limits, redact confidential account numbers permanently, extract tables into spreadsheets, and complete non-interactive application forms online.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <FAQAccordion items={homepageFaqs} title="Frequently Asked Questions" />

        {/* Popular Guides Preview */}
        <div className="pt-6 border-t border-neutral-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-900">Popular PDF Guides & Tutorials</h3>
            <Link href="/guides" className="text-xs font-bold text-filora hover:underline flex items-center gap-1">
              <span>View all 20 guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GUIDES_DATA.slice(0, 3).map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-filora transition-all block group"
              >
                <div className="text-[10px] font-bold text-filora uppercase tracking-wider mb-1">
                  {g.category} • {g.readTime}
                </div>
                <div className="text-xs font-bold text-neutral-900 group-hover:text-filora mb-1.5">
                  {g.title}
                </div>
                <div className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                  {g.summary}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. QUERIES & ADVICE FOR FILORA */}
      <FeedbackSection recipientEmail="raokamlesh2803@gmail.com" />

      {/* 8. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-16 rounded-3xl bg-filora text-white text-center space-y-6 relative overflow-hidden shadow-editor">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-display">
              Ready to Simplify Your Documents?
            </h2>
            <p className="text-sm sm:text-base text-filora-200 leading-relaxed">
              Join thousands of students, freelancers, and businesses who rely on Filora for fast, free, and privacy-conscious document processing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/tools"
              className="px-8 py-3.5 bg-white text-filora hover:bg-filora-50 rounded-2xl text-sm font-bold shadow-lg transition-colors"
            >
              Explore All 40+ Tools
            </Link>
            <Link
              href="/editor"
              className="px-8 py-3.5 bg-filora-700 hover:bg-filora-800 text-white rounded-2xl text-sm font-bold border border-filora-400 transition-colors"
            >
              Launch Free PDF Editor
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BottomContentAd />
      </div>
    </div>
  );
}
