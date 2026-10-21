import Link from "next/link";
import { Edit3, Layers, Minimize2, Scissors, ArrowRight, Home, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Page Not Found (404) | PDFYARA",
  description: "The page you are looking for might have been moved or does not exist. Explore our free PDF editor and document tools.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const popularTools = [
    { name: "Free PDF Editor", href: "/editor", desc: "Edit text, annotate, and sign documents", icon: Edit3 },
    { name: "Merge PDF", href: "/tools/merge-pdf", desc: "Combine multiple PDF files into one", icon: Layers },
    { name: "Compress PDF", href: "/tools/compress-pdf", desc: "Reduce file size without quality loss", icon: Minimize2 },
    { name: "Split PDF", href: "/tools/split-pdf", desc: "Extract specific pages or page ranges", icon: Scissors },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-filora-50 border border-filora-200 text-filora text-xs font-bold shadow-xs mb-6">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Error 404</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto mb-10 leading-relaxed">
        The page you are looking for does not exist, has been moved, or the URL may have been typed incorrectly.
      </p>

      {/* Main Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-16">
        <Link
          href="/editor"
          className="w-full sm:w-auto px-7 py-3.5 bg-filora hover:bg-filora-700 text-white rounded-xl text-sm font-bold shadow-cardHover transition-all flex items-center justify-center gap-2"
        >
          <Edit3 className="w-4 h-4" />
          <span>Launch PDF Editor</span>
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto px-7 py-3.5 bg-surface-subtle hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Popular Tools to Explore */}
      <div className="text-left border-t border-neutral-200 pt-12">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-6 text-center">
          Popular PDF Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {popularTools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-filora-300 hover:shadow-cardHover transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-filora-50 flex items-center justify-center text-filora group-hover:bg-filora group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-neutral-900 group-hover:text-filora transition-colors">
                    {t.name}
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {t.desc}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-filora group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
