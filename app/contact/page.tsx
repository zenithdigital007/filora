"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: "Contact & Support" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          Contact & Feedback
        </h1>
        <p className="text-sm sm:text-base text-neutral-600">
          Have a question, feature suggestion, or feedback on a PDF tool? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-2">
            <Mail className="w-5 h-5 text-filora" />
            <h3 className="text-sm font-bold text-neutral-900">Support Email</h3>
            <p className="text-xs text-neutral-500">For general inquiries and bug reports:</p>
            <span className="text-xs font-semibold text-filora block pt-1">support@filora.app</span>
          </div>

          <div className="p-6 rounded-3xl bg-surface-subtle border border-neutral-200 space-y-2">
            <MessageSquare className="w-5 h-5 text-filora" />
            <h3 className="text-sm font-bold text-neutral-900">Business Inquiries</h3>
            <p className="text-xs text-neutral-500">For partnership & enterprise questions:</p>
            <span className="text-xs font-semibold text-filora block pt-1">partnerships@filora.app</span>
          </div>
        </div>

        <div className="md:col-span-2">
          {submitted ? (
            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">Thank you for your message!</h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                Your feedback has been received. Our team will review your message and reply if necessary.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-subtle space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-filora text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                  Message / Feedback
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help improve Filora?"
                  className="w-full p-4 rounded-xl border border-neutral-300 focus:border-filora text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-filora hover:bg-filora-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
