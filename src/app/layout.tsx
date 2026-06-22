import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://bowlz-i.com"),
  title: {
    default: "Bowlz-I | Healthy Meals. Available in Seconds.",
    template: "%s | Bowlz-I",
  },
  description:
    "India's healthy food infrastructure network. Fresh bowls, cold-pressed juices, immunity shots and functional snacks — daily restocked, nutritionist-curated, available via smart vending machines.",
  keywords: [
    "healthy food", "vending machine", "fresh meals", "cold-pressed juice",
    "immunity shots", "wellness", "India", "corporate wellness", "healthy snacks",
  ],
  authors: [{ name: "Sonali Shakya", url: "https://bowlz-i.com" }],
  creator: "Bowlz-I",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bowlz-i.com",
    title: "Bowlz-I | Healthy Meals. Available in Seconds.",
    description:
      "India's healthy food infrastructure. Smart vending machines stocked daily with fresh nutritionist-curated meals.",
    siteName: "Bowlz-I",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bowlz-I | Healthy Meals. Available in Seconds.",
    description: "Fresh healthy food, available wherever you work.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZLZX0XTS6B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZLZX0XTS6B');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}