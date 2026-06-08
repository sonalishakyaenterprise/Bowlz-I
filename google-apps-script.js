/**
 * BOWLZ-I — Google Apps Script Form Handler
 * 
 * Paste this entire file into your Google Apps Script editor.
 * Deploy as a Web App (Execute as: Me, Access: Anyone).
 * 
 * Handles 3 form types:
 *   - installs   → machine installation requests
 *   - newsletter → stay connected signups  
 *   - feedback   → customer and partner feedback
 */

// ── CONFIG ────────────────────────────────────────────────────
var SECRET       = "bowlzi2026";          // Must match NEXT_PUBLIC_GAS_SECRET in .env.local
var NOTIFY_EMAIL = "sonalishakyaenterprise@gmail.com";
var SHEET_NAME   = "Bowlz-I Leads & Feedback"; // Must match your Google Sheet name

// ── ENTRY POINT ───────────────────────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Secret key check — blocks random POSTs to your endpoint
    if (data.secret !== SECRET) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var type  = data.type || "installs";
    var tab   = sheet.getSheetByName(type);

    if (!tab) {
      // Create the tab if it doesn't exist yet
      tab = sheet.insertSheet(type);
    }

    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var row       = buildRow(type, timestamp, data);

    tab.appendRow(row);
    sendNotification(type, data, timestamp);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── ROW BUILDER ───────────────────────────────────────────────
function buildRow(type, timestamp, data) {
  if (type === "installs") {
    return [
      timestamp,
      data.name        || "—",
      data.company     || "—",
      data.email       || "—",
      data.phone       || "—",
      data.space_type  || "—",
      data.city        || "—",
      data.message     || "—",
    ];
  }

  if (type === "newsletter") {
    return [
      timestamp,
      data.name      || "—",
      data.email     || "—",
      data.interests || "—",
    ];
  }

  if (type === "feedback") {
    return [
      timestamp,
      data.feedback_type  || "—",
      data.machine_id     || "—",
      data.location       || "—",
      data.rating         || "—",
      data.category       || "—",
      data.product        || "—",
      data.message        || "—",
      data.contact_email  || "—",
      data.issue_type     || "—",
      data.company        || "—",
    ];
  }

  // Fallback — dump everything
  return [timestamp, JSON.stringify(data)];
}

// ── EMAIL NOTIFICATION ────────────────────────────────────────
function sendNotification(type, data, timestamp) {
  var subjects = {
    installs:   "🏢 New Machine Request — " + (data.company || data.name || "Unknown"),
    newsletter: "💌 New Signup — " + (data.email || "Unknown"),
    feedback:   "💬 New Feedback — " + (data.feedback_type || "Unknown") + " — " + (data.location || "Web"),
  };

  var subject = subjects[type] || "📬 New Bowlz-I Submission";

  var body = "Time: " + timestamp + "\n\n";

  if (type === "installs") {
    body += "Name:       " + (data.name       || "—") + "\n";
    body += "Company:    " + (data.company     || "—") + "\n";
    body += "Email:      " + (data.email       || "—") + "\n";
    body += "Phone:      " + (data.phone       || "—") + "\n";
    body += "Space Type: " + (data.space_type  || "—") + "\n";
    body += "City:       " + (data.city        || "—") + "\n\n";
    body += "Message:\n" + (data.message || "—");
  } else if (type === "newsletter") {
    body += "Name:      " + (data.name      || "—") + "\n";
    body += "Email:     " + (data.email     || "—") + "\n";
    body += "Interests: " + (data.interests || "—") + "\n";
  } else if (type === "feedback") {
    body += "Type:     " + (data.feedback_type || "—") + "\n";
    body += "Machine:  " + (data.machine_id    || "—") + "\n";
    body += "Location: " + (data.location      || "—") + "\n";
    body += "Rating:   " + (data.rating        || "—") + "\n";
    body += "Category: " + (data.category      || "—") + "\n";
    body += "Product:  " + (data.product       || "—") + "\n\n";
    body += "Message:\n" + (data.message || "—") + "\n\n";
    body += "Contact:  " + (data.contact_email || "—") + "\n";
    if (data.issue_type) body += "Issue:    " + data.issue_type + "\n";
    if (data.company)    body += "Company:  " + data.company    + "\n";
  }

  body += "\n\n---\nBowlz-I Form Handler · Google Apps Script";

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

// ── GET HANDLER (health check) ────────────────────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Bowlz-I form handler is live",
      timestamp: new Date().toISOString(),
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
