"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { submitForm } from "@/lib/utils/submitForm";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "customer" | "partner";
type CustomerCategory = "freshness" | "product" | "machine" | "suggestion" | "other";
type PartnerIssue = "restock" | "machine_fault" | "billing" | "product_quality" | "other";
type Rating = 1 | 2 | 3 | 4 | 5;

interface FeedbackEntry {
  id: string;
  type: Tab;
  machineId?: string;
  locationName?: string;
  rating?: Rating;
  category?: CustomerCategory;
  message: string;
  productName?: string;
  contactEmail?: string;
  contactName?: string;
  company?: string;
  issueType?: PartnerIssue;
  status: "new";
  source: "web" | "qr_scan";
  createdAt: string;
}

// ─── Form submission via Google Apps Script (see src/lib/utils/submitForm.ts) ───

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ value, onChange }: { value: Rating | 0; onChange: (r: Rating) => void }) {
  const [hover, setHover] = useState(0);
  const labels: Record<number, string> = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Great", 5: "Excellent" };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {([1, 2, 3, 4, 5] as Rating[]).map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="text-3xl leading-none transition-transform hover:scale-110 focus:outline-none"
            aria-label={`Rate ${star} out of 5 — ${labels[star]}`}
          >
            <span className={cn(
              "transition-colors",
              (hover || value) >= star ? "text-amber-400" : "text-gray-200"
            )}>★</span>
          </button>
        ))}
      </div>
      {(hover || value) > 0 && (
        <span className="text-xs font-semibold text-forest-600 tracking-wide">
          {labels[hover || value]}
        </span>
      )}
    </div>
  );
}

// ─── Field helpers ────────────────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-bold tracking-[0.14em] uppercase text-gray-400 mb-1.5">
      {children}{required && <span className="text-forest-500 ml-0.5">*</span>}
    </label>
  );
}

function Input({ id, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { id: string }) {
  return (
    <input
      id={id}
      className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-forest-500 focus:bg-white transition-all placeholder:text-gray-300 font-[inherit]"
      {...props}
    />
  );
}

function Textarea({ id, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string }) {
  return (
    <textarea
      id={id}
      className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-forest-500 focus:bg-white transition-all placeholder:text-gray-300 font-[inherit] resize-none"
      {...props}
    />
  );
}

// ─── Customer Form ────────────────────────────────────────────────────────────
const CUSTOMER_CATEGORIES: { value: CustomerCategory; label: string; icon: string }[] = [
  { value: "freshness",   label: "Freshness issue",    icon: "🥗" },
  { value: "product",     label: "Product feedback",   icon: "⭐" },
  { value: "machine",     label: "Machine problem",    icon: "🤖" },
  { value: "suggestion",  label: "Suggest something",  icon: "💡" },
  { value: "other",       label: "Other",              icon: "📝" },
];

function CustomerForm({
  machineId,
  locationName,
  onSuccess,
}: {
  machineId: string;
  locationName: string;
  onSuccess: () => void;
}) {
  const [rating, setRating] = useState<Rating | 0>(0);
  const [category, setCategory] = useState<CustomerCategory | "">("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) { setError("Please tell us what happened."); return; }
    setError("");
    setLoading(true);

    const result = await submitForm("feedback", {
      feedback_type:  "customer",
      machine_id:     machineId || undefined,
      location:       locationName || undefined,
      rating:         rating ? String(rating) : undefined,
      category:       category || undefined,
      product:        product || undefined,
      message:        message.trim(),
      contact_email:  email || undefined,
      source:         machineId ? "qr_scan" : "web",
    });

    setLoading(false);
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || "Something went wrong — please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Star rating */}
      <div>
        <Label>Overall experience</Label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {/* Category */}
      <div>
        <Label>What's this about?</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CUSTOMER_CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={cn(
                "flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all text-left",
                category === c.value
                  ? "bg-forest-600 border-forest-500 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:border-forest-400 hover:bg-forest-50"
              )}
            >
              <span>{c.icon}</span>
              <span className="text-xs leading-tight">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product name (optional) */}
      <div>
        <Label>Which product?</Label>
        <Input id="product" placeholder="e.g. Green Detox Juice, Protein Bowl..." value={product} onChange={e => setProduct(e.target.value)} />
      </div>

      {/* Message */}
      <div>
        <Label required>Tell us more</Label>
        <Textarea
          id="message"
          rows={4}
          placeholder="What happened? The more detail, the better we can fix it or improve."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
      </div>

      {/* Contact (optional) */}
      <div>
        <Label>Your email (optional — if you want a reply)</Label>
        <Input id="email" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      {/* Machine context */}
      {(machineId || locationName) && (
        <div className="bg-forest-50 border border-forest-200 rounded-xl px-4 py-3 text-xs text-forest-700">
          <span className="font-semibold">Your machine:</span>{" "}
          {locationName || machineId}{machineId && locationName ? ` (${machineId})` : ""}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-forest-600 hover:bg-forest-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-forest-600/25 font-[inherit]"
      >
        {loading ? "Sending..." : "Submit Feedback →"}
      </button>
    </div>
  );
}

// ─── Partner Form ─────────────────────────────────────────────────────────────
const PARTNER_ISSUES: { value: PartnerIssue; label: string; icon: string; urgent: boolean }[] = [
  { value: "restock",        label: "Restock needed",      icon: "📦", urgent: true  },
  { value: "machine_fault",  label: "Machine not working", icon: "🔧", urgent: true  },
  { value: "product_quality","label": "Product quality",   icon: "🥗", urgent: false },
  { value: "billing",        label: "Billing / invoice",   icon: "💰", urgent: false },
  { value: "other",          label: "Other",               icon: "📝", urgent: false },
];

function PartnerForm({ onSuccess }: { onSuccess: () => void }) {
  const [issueType, setIssueType] = useState<PartnerIssue | "">("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedIssue = PARTNER_ISSUES.find(i => i.value === issueType);
  const isUrgent = selectedIssue?.urgent;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!issueType) { setError("Please select an issue type."); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email so we can follow up."); return; }
    if (!message.trim()) { setError("Please describe the issue."); return; }
    setError("");
    setLoading(true);

    const result = await submitForm("feedback", {
      feedback_type:  "partner",
      issue_type:     issueType,
      company:        company || undefined,
      contact_name:   name || undefined,
      contact_email:  email,
      phone:          phone || undefined,
      message:        message.trim(),
    });

    setLoading(false);
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || "Something went wrong — please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Issue type */}
      <div>
        <Label required>What do you need help with?</Label>
        <div className="flex flex-col gap-2">
          {PARTNER_ISSUES.map((issue) => (
            <button
              key={issue.value}
              type="button"
              onClick={() => setIssueType(issue.value)}
              className={cn(
                "flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium transition-all text-left",
                issueType === issue.value
                  ? "bg-forest-600 border-forest-500 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:border-forest-400 hover:bg-forest-50"
              )}
            >
              <span className="text-xl">{issue.icon}</span>
              <div>
                <div className="font-semibold text-sm">{issue.label}</div>
                {issue.urgent && issueType !== issue.value && (
                  <div className="text-[10px] text-amber-500 font-medium">We respond within 2 hours</div>
                )}
                {issue.urgent && issueType === issue.value && (
                  <div className="text-[10px] text-white/70">We respond within 2 hours</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Urgent notice */}
      {isUrgent && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 font-medium">
          ⚡ Urgent issue detected — we aim to respond within 2 hours on business days.
          For emergencies call: <strong>PLACEHOLDER — add ops phone number</strong>
        </div>
      )}

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Your name</Label>
          <Input id="pname" placeholder="Arjun Mehta" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <Label>Company / Space</Label>
          <Input id="pcompany" placeholder="WeWork BKC" value={company} onChange={e => setCompany(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Work email</Label>
          <Input id="pemail" type="email" placeholder="arjun@company.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <Label>Phone (for urgent issues)</Label>
          <Input id="pphone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
      </div>

      {/* Message */}
      <div>
        <Label required>Describe the issue</Label>
        <Textarea
          id="pmessage"
          rows={4}
          placeholder="What's happening? Include the machine location, approximate time, and any error messages you saw."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-forest-600 hover:bg-forest-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-forest-600/25 font-[inherit]"
      >
        {loading ? "Sending..." : "Submit Issue →"}
      </button>
    </div>
  );
}

// ─── Success State ────────────────────────────────────────────────────────────
function SuccessState({ tab }: { tab: Tab }) {
  return (
    <div className="text-center py-12 flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center text-3xl">
        {tab === "customer" ? "🙏" : "✅"}
      </div>
      <h2 className="font-display text-2xl font-bold text-gray-900">
        {tab === "customer" ? "Thank you!" : "Got it — we're on it."}
      </h2>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
        {tab === "customer"
          ? "Your feedback has been sent. We read every single one and use it to improve daily."
          : "Your issue has been flagged. Expect a response within 2 hours for urgent matters, or by next business day otherwise."}
      </p>
      <a
        href="/"
        className="mt-4 inline-block bg-forest-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-forest-500 transition-colors"
      >
        Back to Bowlz-I
      </a>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FeedbackClient() {
  const [tab, setTab] = useState<Tab>("customer");
  const [done, setDone] = useState(false);
  const [machineId, setMachineId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [isQrSource, setIsQrSource] = useState(false);

  // Read QR params from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const machine = params.get("machine");
    const location = params.get("location");
    if (type === "partner") setTab("partner");
    if (machine) { setMachineId(machine); setIsQrSource(true); }
    if (location) setLocationName(decodeURIComponent(location));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-forest-600/10 px-5 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 no-underline">
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <defs>
              <radialGradient id="ffg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#2d8c58"/><stop offset="100%" stopColor="#1a5c3a"/></radialGradient>
              <radialGradient id="ffg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#6b4f2a"/><stop offset="100%" stopColor="#3d2d12"/></radialGradient>
            </defs>
            <circle cx="18" cy="18" r="17.5" fill="url(#ffg2)"/>
            <circle cx="18" cy="18" r="11.5" fill="url(#ffg1)"/>
            <path d="M18 12C18 12 22 14.5 22 18C22 22 18 24 18 24C18 24 14 22 14 18C14 14.5 18 12 18 12Z" fill="white" opacity=".9"/>
          </svg>
          <span className="font-display text-forest-600 font-black text-lg tracking-tight">Bowlz-I</span>
        </a>
        {isQrSource && (
          <span className="text-[10px] font-bold tracking-widest uppercase text-forest-500 bg-forest-50 border border-forest-200 px-2.5 py-1 rounded-full">
            📱 Via QR Scan
          </span>
        )}
      </header>

      {/* QR Machine context banner */}
      {isQrSource && (machineId || locationName) && (
        <div className="bg-forest-600 text-white px-5 py-3 text-center">
          <p className="text-xs font-medium">
            You scanned the machine at{" "}
            <strong>{locationName || machineId}</strong>
            {machineId && locationName && (
              <span className="opacity-60"> · {machineId}</span>
            )}
          </p>
        </div>
      )}

      {/* Main card */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {!done ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Page title */}
              <div className="px-6 pt-7 pb-5 border-b border-gray-100">
                <h1 className="font-display text-2xl font-black text-gray-900 mb-1">
                  Share your feedback
                </h1>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Every submission is read by our team. Your input shapes what
                  goes in the machine tomorrow.
                </p>
              </div>

              {/* Tab switcher */}
              <div className="flex gap-1 p-2 bg-gray-50 mx-6 mt-5 rounded-2xl border border-gray-100">
                <button
                  type="button"
                  onClick={() => { setTab("customer"); setDone(false); }}
                  className={cn(
                    "flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all font-[inherit]",
                    tab === "customer"
                      ? "bg-forest-600 text-white shadow-md"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  🧑 Customer
                </button>
                <button
                  type="button"
                  onClick={() => { setTab("partner"); setDone(false); }}
                  className={cn(
                    "flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all font-[inherit]",
                    tab === "partner"
                      ? "bg-forest-600 text-white shadow-md"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  🏢 Partner / Location
                </button>
              </div>

              {/* Form content */}
              <div className="px-6 py-6">
                {tab === "customer" ? (
                  <CustomerForm
                    machineId={machineId}
                    locationName={locationName}
                    onSuccess={() => setDone(true)}
                  />
                ) : (
                  <PartnerForm onSuccess={() => setDone(true)} />
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-6 py-8">
              <SuccessState tab={tab} />
            </div>
          )}

          {/* Phase 1 data notice */}

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-[11px] text-gray-300 border-t border-gray-100">
        © 2026 Bowlz-I · <a href="/privacy" className="underline hover:text-gray-500">Privacy</a>
      </footer>
    </div>
  );
}
