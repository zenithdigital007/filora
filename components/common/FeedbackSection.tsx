"use client";

import { useState } from "react";
import { 
  Send, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Lightbulb, 
  HelpCircle, 
  Bug, 
  Wrench,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";

interface FeedbackSectionProps {
  recipientEmail?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function FeedbackSection({
  recipientEmail = "raokamlesh2803@gmail.com",
  className = "",
  title = "Have Advice or Queries for Filora?",
  subtitle = "Your feedback directly shapes our product. Send your questions, suggestions, or ideas for the betterment of the app directly to our developer team.",
}: FeedbackSectionProps) {
  const [category, setCategory] = useState<"advice" | "query" | "tool_request" | "bug">("advice");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: "advice", label: "App Advice & Ideas", icon: Lightbulb, defaultSubject: "Advice for the betterment of Filora" },
    { id: "query", label: "General Query / Question", icon: HelpCircle, defaultSubject: "Query regarding Filora" },
    { id: "tool_request", label: "Request a New Tool", icon: Wrench, defaultSubject: "New Tool Request for Filora" },
    { id: "bug", label: "Report an Issue", icon: Bug, defaultSubject: "Bug Report for Filora" },
  ] as const;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(recipientEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const currentDefaultSubject = categories.find((c) => c.id === category)?.defaultSubject || "Feedback for Filora";
  const finalSubject = subject.trim() || currentDefaultSubject;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // Ignored if canvas-confetti unavailable
    }

    // Build the mailto link with encoded content
    const bodyLines = [
      `Name: ${name || "Anonymous User"}`,
      `Sender Email: ${email || "Not provided"}`,
      `Category: ${categories.find((c) => c.id === category)?.label}`,
      "",
      "--- Message / Advice ---",
      message,
      "",
      "Sent from Filora Web App",
    ];

    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      finalSubject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    // Open user's default email client
    window.location.href = mailtoUrl;

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage("");
    setSubject("");
  };

  return (
    <section className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="bg-gradient-to-br from-filora-50/70 via-white to-surface-subtle border border-filora-100/80 rounded-3xl p-6 sm:p-12 lg:p-16 shadow-subtle overflow-hidden relative">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-filora-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-filora-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-filora-200 text-filora text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-filora" />
                <span>Help Us Improve Filora</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Direct Mail Info Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-filora-50 flex items-center justify-center text-filora">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Direct Developer Email</div>
                    <div className="text-[11px] text-neutral-500">Personal inbox for app advice & queries</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-surface-subtle border border-neutral-200 text-xs">
                <a
                  href={`mailto:${recipientEmail}?subject=Filora%20Feedback`}
                  className="font-mono font-semibold text-filora hover:underline truncate"
                  title="Click to compose email"
                >
                  {recipientEmail}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 text-neutral-500 hover:text-filora hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-neutral-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Replies within 24h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-filora" />
                  <span>Every suggestion is reviewed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Query & Advice Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/90 shadow-card text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                    Thank You for Your Feedback!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Your email client should have opened with your advice ready to send to{" "}
                    <span className="font-mono font-semibold text-filora">{recipientEmail}</span>.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                      finalSubject
                    )}&body=${encodeURIComponent(message)}`}
                    className="w-full sm:w-auto px-6 py-3 bg-filora hover:bg-filora-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Re-open Email App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-card space-y-5"
              >
                {/* Category Pills */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                    What is your message about?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`flex items-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-left ${
                            isSelected
                              ? "bg-filora-50 border-filora text-filora shadow-xs font-bold"
                              : "bg-surface-subtle border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-filora" : "text-neutral-500"}`} />
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 block">
                      Your Name <span className="text-neutral-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-xs sm:text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 block">
                      Your Email <span className="text-neutral-400 font-normal">(for replies)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-xs sm:text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={currentDefaultSubject}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-xs sm:text-sm outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 block">
                    Your Advice or Query <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you'd like to improve, any queries you have, or new features that would make Filora better for you..."
                    className="w-full p-3.5 rounded-xl border border-neutral-300 focus:border-filora text-xs sm:text-sm outline-none transition-colors resize-y leading-relaxed"
                  />
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <span className="text-[11px] text-neutral-400 text-center sm:text-left">
                    Sends directly to <span className="font-mono text-neutral-600 font-medium">{recipientEmail}</span>
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 bg-filora hover:bg-filora-700 active:bg-filora-800 text-white rounded-xl text-xs font-bold shadow-cardHover transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
