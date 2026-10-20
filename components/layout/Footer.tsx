import Link from "next/link";
import { ShieldCheck, Lock, Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-subtle border-t border-neutral-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-filora flex items-center justify-center text-white font-extrabold text-lg">
                F
              </div>
              <span className="text-xl font-extrabold tracking-tight text-neutral-900">
                FILORA
              </span>
            </Link>
            <p className="text-sm text-neutral-600 font-medium">
              Files, made effortless. Simple tools for every document.
            </p>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              Filora is a privacy-conscious document productivity platform. Core operations run client-side in your web browser, keeping your sensitive documents secure.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-filora" />
                <span>Client-side security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>No file retention</span>
              </div>
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-4">
              Popular Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools" className="text-neutral-600 hover:text-filora transition-colors">
                  All 40+ Tools
                </Link>
              </li>
              <li>
                <Link href="/editor" className="text-neutral-600 hover:text-filora transition-colors">
                  Free PDF Editor
                </Link>
              </li>
              <li>
                <Link href="/tools/merge-pdf" className="text-neutral-600 hover:text-filora transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/compress-pdf" className="text-neutral-600 hover:text-filora transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/split-pdf" className="text-neutral-600 hover:text-filora transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/fill-sign-pdf" className="text-neutral-600 hover:text-filora transition-colors">
                  Sign PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-to-word" className="text-neutral-600 hover:text-filora transition-colors">
                  PDF to Word
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-4">
              Resources & Guides
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/guides" className="text-neutral-600 hover:text-filora transition-colors">
                  PDF Guides Hub
                </Link>
              </li>
              <li>
                <Link href="/resources/pdf-glossary" className="text-neutral-600 hover:text-filora transition-colors">
                  PDF Glossary
                </Link>
              </li>
              <li>
                <Link href="/resources/pdf-page-size-guide" className="text-neutral-600 hover:text-filora transition-colors">
                  Page Sizes Guide
                </Link>
              </li>
              <li>
                <Link href="/resources/pdf-security-guide" className="text-neutral-600 hover:text-filora transition-colors">
                  Security Architecture
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-600 hover:text-filora transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link href="/resources/pdf-faq" className="text-neutral-600 hover:text-filora transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-4">
              Company & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-filora transition-colors">
                  About Filora
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-600 hover:text-filora transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-filora font-semibold hover:underline transition-colors flex items-center gap-1">
                  <span>Advice & Queries</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-filora-50 text-filora font-bold border border-filora-200">New</span>
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-neutral-600 hover:text-filora transition-colors">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-neutral-600 hover:text-filora transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-neutral-600 hover:text-filora transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-neutral-600 hover:text-filora transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-neutral-600 hover:text-filora transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 Filora. All rights reserved. Files, made effortless.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-filora">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-filora">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-filora">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
