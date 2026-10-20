import { ToolConfig } from "@/lib/tools-registry";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { DirectToolRunner } from "./DirectToolRunner";
import { RichContentSection } from "@/components/common/RichContentSection";
import { TopContentAd, BottomContentAd } from "@/components/ads/AdBanners";
import { ShieldCheck, Lock, Sparkles } from "lucide-react";

interface ToolLayoutProps {
  tool: ToolConfig;
}

export function ToolLayout({ tool }: ToolLayoutProps) {
  const breadcrumbItems = [
    { label: "Tools", href: "/tools" },
    { label: tool.category, href: `/tools?category=${encodeURIComponent(tool.category)}` },
    { label: tool.name },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-filora-50 border border-filora-100 text-filora text-xs font-bold shadow-xs">
          {tool.processingMode === "browser" ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Processed in your browser • 100% Private</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-filora" />
              <span>Secure Stateless Processing</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
          {tool.name}
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          {tool.intro}
        </p>
      </div>

      {/* Top Compliant Ad */}
      <TopContentAd />

      {/* Interactive Tool Runner */}
      <div className="my-8">
        <DirectToolRunner tool={tool} />
      </div>

      {/* Bottom Educational & SEO Content */}
      <RichContentSection tool={tool} />

      {/* Bottom Ad */}
      <BottomContentAd />
    </div>
  );
}
