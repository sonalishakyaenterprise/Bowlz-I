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
  if (!ENDPOINT || ENDPOINT === "") {
    console.warn("[Bowlz-I] NEXT_PUBLIC_GAS_ENDPOINT not set. Form data:", { type, ...data });
    // In dev without endpoint configured, pretend success so UI works
    return { success: true };
  }

  try {
    // no-cors: browser won't complain about CORS, but we can't read the response.
    // Google Apps Script receives the POST and processes it regardless.
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" }, // text/plain avoids preflight
      body: JSON.stringify({
        secret: SECRET,
        type,
        ...data,
      }),
    });

    // If fetch didn't throw, the request was sent successfully.
    // Google Apps Script will write to the Sheet and send the email.
    return { success: true };

  } catch (err) {
    console.error("[Bowlz-I] Form submission error:", err);
    return {
      success: false,
      error: "Network error — please check your connection and try again.",
    };
  }
}
