# Google Sheets Form Setup — Bowlz-I
## One-time setup, ~15 minutes, free forever

---

## Step 1 — Create the Google Sheet

1. Go to sheets.google.com → create a **New Spreadsheet**
2. Rename it: **"Bowlz-I Leads & Feedback"**
3. Create **3 tabs** (sheets) by clicking + at the bottom:
   - `installs` — machine installation requests
   - `newsletter` — stay connected signups
   - `feedback` — customer and partner feedback

4. In the `installs` tab, add these headers in Row 1:
   ```
   Timestamp | Name | Company | Email | Phone | Space Type | City | Message
   ```

5. In the `newsletter` tab:
   ```
   Timestamp | Name | Email | Interests
   ```

6. In the `feedback` tab:
   ```
   Timestamp | Type | Machine ID | Location | Rating | Category | Product | Message | Contact Email | Issue Type | Company
   ```

---

## Step 2 — Create the Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete all existing code in the editor
3. Paste the entire script from `google-apps-script.js` (in this project root)
4. Click **Save** (💾 icon)

---

## Step 3 — Deploy the Script

1. Click **Deploy → New deployment**
2. Click the gear ⚙️ next to "Type" → select **Web app**
3. Set:
   - Description: `Bowlz-I Form Handler`
   - Execute as: **Me** (your Google account)
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → Allow
6. **Copy the Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

---

## Step 4 — Add the URL to your project

Open `.env.local` and set:
```
NEXT_PUBLIC_GAS_ENDPOINT=https://script.google.com/macros/s/YOUR_ID/exec
NEXT_PUBLIC_GAS_SECRET=bowlzi2026
```

For GitHub Pages, add these as **Repository Secrets**:
- Go to your repo → Settings → Secrets and variables → Actions → New repository secret
- Add `NEXT_PUBLIC_GAS_ENDPOINT` and `NEXT_PUBLIC_GAS_SECRET`

---

## Step 5 — Test it

Run `npm run dev`, fill in a form and submit.
Check your Google Sheet — the row should appear within 2–3 seconds.
You'll also get an email notification at sonalishakyaenterprise@gmail.com.

---

## What you get

- ✅ Every lead in a Google Sheet you own
- ✅ Email notification on every submission  
- ✅ Filter by city, space type, date — like a mini CRM
- ✅ Export to CSV anytime
- ✅ Zero cost, zero limits at your scale
- ✅ No third-party dependency

## Re-deploying after changes

If you ever edit the script, you must **Deploy → New deployment** again
(or Manage deployments → Edit → New version) to publish your changes.
