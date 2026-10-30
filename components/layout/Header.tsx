"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Edit3, 
  Layers, 
  Minimize2, 
  FileSignature, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  FolderOpen,
  FileText
} from "lucide-react";
import { GlobalSearchModal } from "@/components/common/GlobalSearchModal";

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isEditor = pathname === "/editor";

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-filora flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                  P
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-neutral-900 leading-none group-hover:text-filora transition-colors">
                    PDFYARA
                  </span>
                  <span className="text-[10px] font-medium text-neutral-500 tracking-wider">
                    PDF TOOLKIT
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                {/* Tools Mega dropdown trigger */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown("tools")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href="/tools"
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-filora hover:bg-filora-50 rounded-lg transition-colors"
                  >
                    <span>Tools</span>
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  </Link>

                  {/* Dropdown Menu */}
                  {activeDropdown === "tools" && (
                    <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-cardHover border border-neutral-200 p-2 grid gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                      <Link
                        href="/tools/merge-pdf"
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-filora-50 transition-colors group"
                      >
                        <Layers className="w-5 h-5 text-filora" />
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 group-hover:text-filora">Merge PDF</div>
                          <div className="text-xs text-neutral-500">Combine multiple files into one</div>
                        </div>
                      </Link>
                      <Link
                        href="/tools/compress-pdf"
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-filora-50 transition-colors group"
                      >
                        <Minimize2 className="w-5 h-5 text-filora" />
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 group-hover:text-filora">Compress PDF</div>
                          <div className="text-xs text-neutral-500">Reduce file size without quality loss</div>
                        </div>
                      </Link>
                      <Link
                        href="/tools/fill-sign-pdf"
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-filora-50 transition-colors group"
                      >
                        <FileSignature className="w-5 h-5 text-filora" />
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 group-hover:text-filora">Fill & Sign</div>
                          <div className="text-xs text-neutral-500">Add electronic signature & text</div>
                        </div>
                      </Link>
                      <Link
                        href="/tools/protect-pdf"
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-filora-50 transition-colors group"
                      >
                        <ShieldCheck className="w-5 h-5 text-filora" />
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 group-hover:text-filora">Protect PDF</div>
                          <div className="text-xs text-neutral-500">Encrypt with password security</div>
                        </div>
                      </Link>
                      <div className="pt-1 mt-1 border-t border-neutral-100">
                        <Link
                          href="/tools"
                          className="flex items-center justify-center p-2 text-xs font-semibold text-filora hover:underline"
                        >
                          View all 40+ Document Tools &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/editor"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-filora bg-filora-50 hover:bg-filora-100 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-filora" />
                  <span>Free PDF Editor</span>
                </Link>

                <Link
                  href="/tools/compress-pdf"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-filora hover:bg-filora-50 rounded-lg transition-colors"
                >
                  Compress
                </Link>

                <Link
                  href="/tools/merge-pdf"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-filora hover:bg-filora-50 rounded-lg transition-colors"
                >
                  Merge
                </Link>

                <Link
                  href="/tools/fill-sign-pdf"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-filora hover:bg-filora-50 rounded-lg transition-colors"
                >
                  Sign
                </Link>

                <Link
                  href="/guides"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-filora hover:bg-filora-50 rounded-lg transition-colors"
                >
                  Guides
                </Link>

                <Link
                  href="/resources"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-filora hover:bg-filora-50 rounded-lg transition-colors"
                >
                  Resources
                </Link>

                <Link
                  href="/blog"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-filora hover:bg-filora-50 rounded-lg transition-colors"
                >
                  Blog
                </Link>
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 bg-surface-subtle hover:bg-surface-muted border border-neutral-200 rounded-xl transition-all"
              >
                <Search className="w-4 h-4 text-neutral-400" />
                <span className="hidden sm:inline">Search tools...</span>
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white border border-neutral-200 rounded text-neutral-400 shadow-xs">
                  ⌘K
                </kbd>
              </button>

              <Link
                href="/tools"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-filora hover:bg-filora-700 active:bg-filora-800 rounded-xl shadow-xs transition-colors"
              >
                All Tools
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            <Link
              href="/editor"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl bg-filora-50 text-filora font-semibold text-sm"
            >
              <Edit3 className="w-5 h-5 text-filora" />
              <span>Free PDF Editor</span>
            </Link>

            <Link
              href="/tools"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-neutral-800 hover:bg-surface-subtle font-medium text-sm"
            >
              <FolderOpen className="w-5 h-5 text-neutral-400" />
              <span>All 40+ Document Tools</span>
            </Link>

            <Link
              href="/tools/merge-pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-neutral-800 hover:bg-surface-subtle font-medium text-sm"
            >
              <Layers className="w-5 h-5 text-neutral-400" />
              <span>Merge PDF</span>
            </Link>

            <Link
              href="/tools/compress-pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-neutral-800 hover:bg-surface-subtle font-medium text-sm"
            >
              <Minimize2 className="w-5 h-5 text-neutral-400" />
              <span>Compress PDF</span>
            </Link>

            <Link
              href="/tools/fill-sign-pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-neutral-800 hover:bg-surface-subtle font-medium text-sm"
            >
              <FileSignature className="w-5 h-5 text-neutral-400" />
              <span>Fill & Sign PDF</span>
            </Link>

            <Link
              href="/guides"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-neutral-800 hover:bg-surface-subtle font-medium text-sm"
            >
              <BookOpen className="w-5 h-5 text-neutral-400" />
              <span>PDF Guides & Tutorials</span>
            </Link>

            <Link
              href="/resources"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-neutral-800 hover:bg-surface-subtle font-medium text-sm"
            >
              <Sparkles className="w-5 h-5 text-neutral-400" />
              <span>Resources & Glossary</span>
            </Link>

            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-neutral-800 hover:bg-surface-subtle font-medium text-sm"
            >
              <FileText className="w-5 h-5 text-neutral-400" />
              <span>Engineering Blog</span>
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
