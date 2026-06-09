import React from "react";
import type { Metadata } from "next";
import FeedbackClient from "./FeedbackClient";

export const metadata: Metadata = {
  title: "Share Feedback | Bowlz-I",
  description:
    "Share your Bowlz-I experience — product feedback, machine issues, or partner support. We read every submission.",
  robots: { index: false, follow: false }, // don't index feedback pages
};

/**
 * /feedback                     — general feedback page (web)
 * /feedback?type=customer       — pre-selects customer tab
 * /feedback?type=partner        — pre-selects partner tab
 * /feedback?machine=BWZ-MUM-001 — pre-fills machine ID (from QR scan)
 * /feedback?machine=BWZ-MUM-001&location=WeWork+BKC — pre-fills location too
 *
 * QR code on each machine should encode:
 *   https://bowlz-i.com/feedback?type=customer&machine=BWZ-XXX-XXX&location=LOCATION+NAME
 */
export default function FeedbackPage() {
  return <FeedbackClient />;
}
