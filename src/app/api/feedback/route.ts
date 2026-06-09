/**
 * POST /api/feedback
 *
 * Phase 1: Disabled in static export. Feedback goes via mailto: fallback.
 * Phase 2: Uncomment Supabase block below, remove output: 'export' from next.config.ts,
 *           deploy to Vercel, add SUPABASE_URL + SUPABASE_KEY env vars.
 * Phase 3: Forward to ops webhook (Slack / Notion / internal dashboard).
 *
 * Table schema (run in Supabase SQL editor):
 *
 * CREATE TABLE feedback (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   type VARCHAR(20) NOT NULL,          -- 'customer' | 'partner'
 *   machine_id VARCHAR(100),            -- scanned from QR e.g. 'BWZ-MUM-001'
 *   location_name VARCHAR(255),
 *   rating INTEGER,                     -- 1-5 stars
 *   category VARCHAR(100),              -- 'freshness' | 'product' | 'machine' | 'suggestion' etc.
 *   message TEXT NOT NULL,
 *   product_name VARCHAR(255),
 *   contact_email VARCHAR(255),
 *   contact_name VARCHAR(255),
 *   company VARCHAR(255),               -- for partner feedback
 *   issue_type VARCHAR(100),            -- for partner: 'restock' | 'machine' | 'billing' | 'other'
 *   status VARCHAR(50) DEFAULT 'new',   -- 'new' | 'reviewed' | 'resolved'
 *   source VARCHAR(50) DEFAULT 'web',   -- 'web' | 'qr_scan' | 'email'
 *   created_at TIMESTAMP DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_feedback_type ON feedback(type);
 * CREATE INDEX idx_feedback_machine_id ON feedback(machine_id);
 * CREATE INDEX idx_feedback_status ON feedback(status);
 * CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
 */

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    message: "Feedback API — activate in Phase 2 on Vercel",
    phase: 1,
    dataStrategy: "localStorage + mailto fallback in Phase 1",
  });
}

// Phase 2: uncomment this block and remove the force-static export above
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { createClient } = await import("@supabase/supabase-js");
//     const supabase = createClient(
//       process.env.SUPABASE_URL!,
//       process.env.SUPABASE_SERVICE_KEY!
//     );
//     const { error } = await supabase.from("feedback").insert({
//       ...body,
//       status: "new",
//       source: body.source || "web",
//       created_at: new Date().toISOString(),
//     });
//     if (error) throw error;
//     return Response.json({ success: true }, { status: 201 });
//   } catch (err) {
//     console.error("[Feedback API]", err);
//     return Response.json({ success: false }, { status: 500 });
//   }
// }
