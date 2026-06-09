"use client";

import React from "react";
import { submitForm } from "@/lib/utils/submitForm";

import { useState } from "react";
import { useInView } from "@/lib/hooks/useScroll";
import { cn } from "@/lib/utils/cn";

type Tab = "business" | "individual";

const SPACE_TYPES = [
  { value: "corporate", label: "Corporate Office", icon: "🏢" },
  { value: "coworking", label: "Coworking Space", icon: "💻" },
  { value: "gym", label: "Gym / Fitness", icon: "🏋️" },
  { value: "hospital", label: "Hospital / Clinic", icon: "🏥" },
  { value: "university", label: "University / Campus", icon: "🎓" },
  { value: "other", label: "Other", icon: "📍" },
];

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
        {label} {required && <span className="text-forest-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-500 focus:bg-white/8 transition-all"
      />
    </div>
  );
}

function BusinessForm() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", spaceType: "", city: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.spaceType) {
      setError("Please fill in your name, email and space type.");
      return;
    }
    setError("");
    setLoading(true);
    const result = await submitForm("installs", {
      name:       form.name,
      company:    form.company,
      email:      form.email,
      phone:      form.phone,
      space_type: form.spaceType,
      city:       form.city,
      message:    form.message,
    });

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🌱</div>
        <h3 className="font-display text-2xl font-bold text-white mb-2">Thank you!</h3>
        <p className="text-gray-400 text-sm">We'll reach out within 24 hours to discuss bringing Bowlz-I to {form.company || "your space"}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Your Name" placeholder="Priya Sharma" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <InputField label="Company / Organisation" placeholder="WeWork India" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Work Email" type="email" placeholder="priya@company.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
        <InputField label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
      </div>

      {/* Space type selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          Type of Space <span className="text-forest-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SPACE_TYPES.map((s) => (
            <button
              key={s.value}
              onClick={() => setForm({ ...form, spaceType: s.value })}
              className={cn(
                "p-3 rounded-xl border text-left transition-all duration-200",
                form.spaceType === s.value
                  ? "bg-forest-600 border-forest-500 text-white"
                  : "bg-white/5 border-white/8 text-gray-400 hover:bg-white/8"
              )}
            >
              <div className="text-lg mb-1">{s.icon}</div>
              <div className="text-[11px] font-medium leading-tight">{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      <InputField label="City" placeholder="Mumbai, Bangalore, Gurgaon..." value={form.city} onChange={(v) => setForm({ ...form, city: v })} />

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
          Anything else you want us to know?
        </label>
        <textarea
          placeholder="Number of employees, floor space, existing food facilities, etc..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-500 focus:bg-white/8 transition-all resize-none"
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 text-center bg-red-400/10 rounded-xl px-4 py-2">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-forest-600 hover:bg-forest-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-forest-600/30"
      >
        {loading ? "Sending..." : "Request a Machine →"}
      </button>

      <p className="text-center text-[11px] text-gray-600">
        Zero cost to you. We handle installation, restocking & maintenance.
      </p>
    </div>
  );
}

function IndividualForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (v: string) => {
    setInterests((prev) => prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v]);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    const result = await submitForm("newsletter", {
      name,
      email,
      interests: interests.join(", "),
    });

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">💌</div>
        <h3 className="font-display text-2xl font-bold text-white mb-2">You&apos;re in!</h3>
        <p className="text-gray-400 text-sm">We&apos;ll send you updates on new locations, seasonal menus, and wellness content. No spam, ever.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Name (optional)" placeholder="Your first name" value={name} onChange={setName} />
        <InputField label="Email Address" type="email" placeholder="you@email.com" value={email} onChange={setEmail} required />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          What interests you?
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { v: "locations", label: "📍 New locations" },
            { v: "product", label: "🥗 New products" },
            { v: "wellness", label: "🌿 Wellness tips" },
            { v: "offers", label: "🎁 Offers & launches" },
          ].map((i) => (
            <button
              key={i.v}
              onClick={() => toggleInterest(i.v)}
              className={cn(
                "px-3.5 py-2 rounded-full border text-xs font-medium transition-all",
                interests.includes(i.v)
                  ? "bg-forest-600 border-forest-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-forest-600/40"
              )}
            >
              {i.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-400 text-center bg-red-400/10 rounded-xl px-4 py-2">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-white text-[#0d0d0d] disabled:opacity-60 disabled:cursor-not-allowed py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all hover:bg-gray-100 hover:shadow-lg"
      >
        {loading ? "Sending..." : "Stay Connected →"}
      </button>

      <p className="text-center text-[11px] text-gray-600">
        Unsubscribe anytime. No spam. Just healthy updates.
      </p>
    </div>
  );
}

export default function ContactSection() {
  const { ref, isInView } = useInView(0.1);
  const [activeTab, setActiveTab] = useState<Tab>("business");

  return (
    <section id="contact-sec" className="bg-[#0a0a0a] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className={cn("text-center mb-14 reveal-up", isInView && "in-view")}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-px bg-forest-400" />
            <span className="text-xs font-semibold tracking-[0.16em] uppercase text-forest-400">Get in Touch</span>
            <span className="w-6 h-px bg-forest-400" />
          </div>
          <h2
            className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Let&apos;s make healthy food
            <br />
            <em className="text-forest-400">accessible to more people.</em>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Whether you&apos;re a business wanting to install a machine or an
            individual wanting to stay in the loop — we&apos;d love to hear from you.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 p-1 bg-white/5 border border-white/8 rounded-2xl mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("business")}
            className={cn(
              "flex-1 py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all",
              activeTab === "business"
                ? "bg-forest-600 text-white shadow-lg"
                : "text-gray-500 hover:text-gray-300"
            )}
          >
            🏢 Install a Machine
          </button>
          <button
            onClick={() => setActiveTab("individual")}
            className={cn(
              "flex-1 py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all",
              activeTab === "individual"
                ? "bg-white/15 text-white shadow-lg"
                : "text-gray-500 hover:text-gray-300"
            )}
          >
            🌿 Stay Connected
          </button>
        </div>

        {/* Form container */}
        <div className="bg-white/4 border border-white/8 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
          {/* Context description */}
          <div className="mb-8 pb-8 border-b border-white/8">
            {activeTab === "business" ? (
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-1">Install a Bowlz-I machine</h3>
                <p className="text-gray-400 text-sm">
                  For corporate offices, coworking spaces, gyms, hospitals, and universities. 
                  Zero upfront cost. We handle everything.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-1">Join the Bowlz-I community</h3>
                <p className="text-gray-400 text-sm">
                  Get updates on new locations, seasonal menus, global wellness products, and early access to launches.
                </p>
              </div>
            )}
          </div>

          {activeTab === "business" ? <BusinessForm /> : <IndividualForm />}
        </div>

        {/* Direct contact */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 text-sm">
            Prefer to email directly?{" "}
            <a href="mailto:sonalishakyaenterprise@gmail.com" className="text-forest-400 hover:text-forest-300 transition-colors font-medium">
              sonalishakyaenterprise@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
