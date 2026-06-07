# Cloudflare Email Routing — Setup Guide

Set up `hello@requirementsfirst.com` (and any other `@requirementsfirst.com` address) to forward to your real Gmail inbox. One-time setup, ~10 minutes. No technical background needed.

**Destination inbox we are setting up:** `analystfirst7@gmail.com`

You'll need: a laptop/desktop browser logged into Cloudflare (Google SSO), and access to `analystfirst7@gmail.com` in another tab.

---

## Step 1 — Open Cloudflare and select the domain

1. Go to **https://dash.cloudflare.com** in your browser.
2. Log in if needed (Google SSO button → pick the Google account).
3. You should land on a list of websites. Click **`requirementsfirst.com`** in the list. (If you only have one domain it may select it automatically.)
4. You're now on the domain dashboard. The left sidebar shows a list of categories like Overview, Analytics & Logs, DNS, SSL/TLS, Email, etc.

---

## Step 2 — Open Email Routing

1. In the **left sidebar**, find **"Email"** (it has a small envelope-shaped icon next to it).
2. Click it. A sub-menu expands.
3. Click **"Email Routing"**.

You'll see one of two screens:

- **If this is the first time:** a big "Get Started" / "Enable Email Routing" button is shown. → go to Step 3.
- **If routing is already enabled:** you'll see tabs labelled "Routes", "Destination addresses", "Settings". → skip to Step 4.

---

## Step 3 — Enable Email Routing (first-time only)

1. Click the big **"Get Started"** or **"Enable Email Routing"** button.
2. Cloudflare will show a screen titled something like "Add DNS records for Email Routing" with a list of MX / SPF / TXT records.
3. **Don't change anything.** Just click **"Add records and enable"** (or "Confirm" / "Enable Email Routing" — whatever the green button says).
4. Wait ~10 seconds. You should see a success message: "Email Routing enabled."

What just happened: Cloudflare added 3-4 invisible "DNS records" to your domain that tell the internet "send mail for this domain to Cloudflare." This is automatic — you don't need to copy or paste anything.

---

## Step 4 — Add the destination Gmail address

Before you can forward mail anywhere, Cloudflare needs to verify you own the destination inbox.

1. On the Email Routing page, click the tab **"Destination addresses"** (near the top).
2. Click the button **"Add destination address"** (usually top-right of the table).
3. A small form appears. Type into the email field: **`analystfirst7@gmail.com`**
4. Click **"Send verification email"** / **"Add"**.
5. The address now appears in the list with status **"Pending"** or "Unverified".

### Verify it

6. Open a new tab → go to **https://mail.google.com** → log in to **analystfirst7@gmail.com**.
7. Look for a new email from **Cloudflare** with subject like "Verify your email address" or "Cloudflare Email Routing - Verify…". Check Spam if you don't see it within 30 seconds.
8. Open the email. Click the big **"Verify email address"** button (or copy the verification link).
9. A browser tab opens confirming "Email verified." Close it.
10. Go back to the Cloudflare tab and refresh. The destination address status should now read **"Verified"** (green checkmark).

**If verification email never arrives:** check spam folder; if still nothing after 10 minutes, click "Resend verification" next to the address in Cloudflare.

---

## Step 5 — Create the `hello@` forwarding rule

1. Click the **"Routes"** tab at the top of the Email Routing page.
2. Find the section labelled **"Custom addresses"** and click **"Create address"** (or "Add custom address").
3. A form appears with three fields:
   - **Custom address:** type **`hello`** (Cloudflare auto-fills the `@requirementsfirst.com` part — leave that alone).
   - **Action:** from the dropdown, pick **"Send to an email"**.
   - **Destination:** from the second dropdown, pick **`analystfirst7@gmail.com`** (only verified addresses show up here).
4. Click **"Save"**.
5. You should now see a row in the Custom addresses table: `hello@requirementsfirst.com → analystfirst7@gmail.com`, status **"Active"** (green).

---

## Step 6 — Turn on Catch-all (recommended)

This step is optional but takes 30 seconds and saves you from losing mail when someone mistypes `helo@` or sends to `contact@`.

1. Still on the **"Routes"** tab, scroll down to the **"Catch-all address"** section.
2. There's a toggle switch on the right. Click it to turn it **ON** (it goes blue/green).
3. Below the toggle a form appears:
   - **Action:** pick **"Send to an email"**.
   - **Destination:** pick **`analystfirst7@gmail.com`**.
4. Click **"Save"**.
5. The catch-all row should now show as **"Active"**.

Now ANY email to `something@requirementsfirst.com` will forward to your Gmail.

---

## Step 7 — Test it end-to-end

1. Open another inbox you control (a different Gmail, your phone's mail app, anything — just NOT analystfirst7@gmail.com itself; some providers swallow self-sends).
2. Compose a new email:
   - **To:** `hello@requirementsfirst.com`
   - **Subject:** `routing test`
   - **Body:** anything (e.g. "testing forward, please ignore")
3. Send it.
4. Within ~2 minutes, the test email should appear in **analystfirst7@gmail.com**'s inbox.

### Troubleshooting if it doesn't arrive

- **Wait 5 minutes** — first-time DNS propagation can be slow.
- **Check the Spam folder** in analystfirst7@gmail.com.
- **Check Cloudflare → Email → Email Routing → "Overview" tab.** It shows recent forwarding activity. If you see the test email listed there as "Delivered", the issue is on the Gmail side (likely Spam). If you don't see it at all, it never reached Cloudflare — re-check the destination verification in Step 4.
- **Check DNS status:** Cloudflare → Email → Email Routing → "Settings". The DNS records section should show all rows with green checkmarks. If any are red/orange, click the "Fix automatically" button next to the bad row.
- **Bonus test:** also try sending to a typo like `helo@requirementsfirst.com` — if catch-all is on (Step 6), it should also arrive in the Gmail inbox.

---

## Step 8 — Update ASSETS.md after success

Once the test email arrives:

1. Open **ASSETS.md** in the project (root folder of `requirementsfirst-site`).
2. Find the row for `hello@requirementsfirst.com forwarding`.
3. Replace `TODO_FILL_IN` with **`analystfirst7@gmail.com`**.
4. In the "Notes" column, change the existing note to: **`Active. Forwards via Cloudflare Email Routing. Catch-all also enabled.`**
5. Save the file.
6. Open Claude Code and paste this prompt:

```
You are in ~/code/requirementsfirst-site. ASSETS.md has been updated to mark hello@ forwarding as active. Commit only ASSETS.md with message "docs: hello@ forwarding active" and push to origin/main.
```

---

## What you've done (recap)

- Enabled Cloudflare Email Routing on requirementsfirst.com.
- Verified `analystfirst7@gmail.com` as a destination.
- Forwarding rule: `hello@requirementsfirst.com → analystfirst7@gmail.com` (active).
- Catch-all: any `*@requirementsfirst.com → analystfirst7@gmail.com` (active).
- Tested end-to-end and confirmed delivery.
- Recorded the change in ASSETS.md.

You don't need to touch this again unless you ever want to add a second forwarding rule (e.g. `arun@requirementsfirst.com`) or change the destination inbox. Both are 2-minute changes on the same Routes page.
