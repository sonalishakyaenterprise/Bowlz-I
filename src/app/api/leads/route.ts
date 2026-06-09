/**
 * POST /api/leads
 *
 * Phase 1: This file exists for future use only.
 * API routes are disabled in static export (next.config.ts output: 'export').
 *
 * To activate:
 * 1. Remove `output: "export"` from next.config.ts
 * 2. Deploy to Vercel
 * 3. Connect Supabase and uncomment the DB code below
 */

export const dynamic = "force-static";

export async function GET() {
  return Response.json({ message: "Leads API — activate in Phase 2 on Vercel" });
}
