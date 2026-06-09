import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl mb-6">🥗</div>
      <h1 className="font-display text-5xl font-black text-[#0d0d0d] mb-3" style={{ letterSpacing: "-0.03em" }}>
        404
      </h1>
      <p className="text-gray-500 text-lg mb-2">Page not found.</p>
      <p className="text-gray-400 text-sm mb-8">
        Looks like this bowl hasn&apos;t been made yet.
      </p>
      <Link
        href="/"
        className="bg-forest-600 hover:bg-forest-500 text-white px-7 py-3 rounded-full font-semibold text-sm tracking-wide transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
