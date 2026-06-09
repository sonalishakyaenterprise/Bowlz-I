/**
 * Bowlz-I Form Submission Utility
 * Posts to Google Apps Script endpoint — free, no third-party dependency.
 * 
 * Uses no-cors mode because Google Apps Script doesn't return CORS headers.
 * We can't read the response body in no-cors, so we assume success if no
 * network error is thrown. This is reliable in practice.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_GAS_ENDPOINT || "";
const SECRET   = process.env.NEXT_PUBLIC_GAS_SECRET   || "bowlzi2026";

export type FormType = "installs" | "newsletter" | "feedback";

export async function submitForm(
  type: FormType,
  data: Record<string, string | number | undefined>
): Promise<{ success: boolean; error?: string }> {
  if (!ENDPOINT) {
    console.warn("[Bowlz-I] No endpoint set");
    return { success: true };
  }
  try {
    const payload = JSON.stringify({ secret: SECRET, type, ...data });
    const url = `${ENDPOINT}?payload=${encodeURIComponent(payload)}`;
    await fetch(url, { method: "GET", mode: "no-cors" });
    return { success: true };
  } catch (err) {
    console.error("[Bowlz-I] Error:", err);
    return { success: false, error: "Network error — please try again." };
  }
}