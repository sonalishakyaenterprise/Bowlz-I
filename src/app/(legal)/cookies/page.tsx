import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Cookie Policy | Bowlz-I" };
export default function CookiesPage() {
  return (
    <>
      <h1 className="font-display text-4xl font-black text-gray-900 mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>
      <p>We use cookies to improve your browsing experience on bowlz-i.com.</p>
      <h2>What Are Cookies</h2>
      <p>Cookies are small text files stored on your device. They help us understand how visitors use our site.</p>
      <h2>Cookies We Use</h2>
      <p>We use anonymous analytics cookies (e.g. Google Analytics) to understand traffic patterns. We do not use advertising or tracking cookies.</p>
      <h2>Managing Cookies</h2>
      <p>You can disable cookies in your browser settings at any time. This will not affect your ability to view our website.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a href="mailto:sonalishakyaenterprise@gmail.com">sonalishakyaenterprise@gmail.com</a></p>
    </>
  );
}
