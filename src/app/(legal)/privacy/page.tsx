import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy | Bowlz-I" };
export default function PrivacyPage() {
  return (
    <>
      <h1 className="font-display text-4xl font-black text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>
      <p>Bowlz-I (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly — such as name, email, and phone number when you submit a contact or partnership enquiry. We also collect anonymous usage analytics to improve our website.</p>
      <h2>How We Use Your Information</h2>
      <p>We use your information to respond to enquiries, send requested updates, and improve our services. We do not sell your data to third parties.</p>
      <h2>Data Retention</h2>
      <p>We retain your data for as long as necessary to fulfil the purposes described above, or as required by law.</p>
      <h2>Your Rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data at any time by emailing sonalishakyaenterprise@gmail.com.</p>
      <h2>Contact</h2>
      <p>For privacy-related queries: <a href="mailto:sonalishakyaenterprise@gmail.com">sonalishakyaenterprise@gmail.com</a></p>
    </>
  );
}
