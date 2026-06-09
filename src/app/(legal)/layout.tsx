import React from "react";
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="inline-flex items-center gap-2 text-forest-600 text-sm font-medium mb-10 hover:text-forest-500 transition-colors">
          ← Back to Bowlz-I
        </a>
        <div className="prose prose-gray max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}
