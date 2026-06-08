import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service | Bowlz-I" };
export default function TermsPage() {
  return (
    <>
      <h1 className="font-display text-4xl font-black text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>
      <p>By accessing the Bowlz-I website or using our vending machines, you agree to these terms.</p>
      <h2>Use of Website</h2>
      <p>This website is for informational purposes. All content is the intellectual property of Bowlz-I and may not be reproduced without permission.</p>
      <h2>Product Information</h2>
      <p>Product availability, pricing, and nutritional information are subject to change. Daily rotating inventory means specific products may not be available at all locations at all times.</p>
      <h2>Partnership Enquiries</h2>
      <p>Submitting a partnership form does not constitute a binding agreement. All partnerships are subject to a separate written agreement.</p>
      <h2>Limitation of Liability</h2>
      <p>Bowlz-I is not liable for any indirect, incidental, or consequential damages arising from use of our services.</p>
      <h2>Contact</h2>
      <p>For legal queries: <a href="mailto:sonalishakyaenterprise@gmail.com">sonalishakyaenterprise@gmail.com</a></p>
    </>
  );
}
