---
author: Arun Mehta
pubDatetime: 2026-05-25T09:00:00.000+05:30
title: Acceptance criteria that actually prevent bugs (with 12 worked examples)
slug: acceptance-criteria-that-actually-prevent-bugs
featured: false
draft: false
tags:
  - acceptance-criteria
  - requirements
  - business-analysis
  - quality
description: Most acceptance criteria are written to look thorough, not to prevent bugs. Here's what the criteria that actually catch defects look like, with twelve real examples annotated.
---

Open any backlog. Read the acceptance criteria on five stories.

You'll see lists like this:

- User can click the Save button
- Form validates required fields
- Success message displays after save
- Error messages are shown for invalid inputs

This is the acceptance criteria style that 80% of BAs write. It looks thorough. It will not catch a single bug that wouldn't have been caught anyway.

The reason is simple: these criteria describe what the feature *does*, not what could go *wrong*. They are a checklist for the happy path. The bugs that ship to production live in the unhappy path, the boundary conditions, the race conditions, and the assumptions that nobody wrote down because they felt obvious.

Acceptance criteria that actually prevent bugs are different. They name the failures.

## The frame: write criteria as "this won't happen", not "this will happen"

The shift is small but powerful. Instead of:

> User can save the form.

Write:

> Saving the form will not succeed if any required field is blank, and the error will name which field is blank.

The first version describes a behaviour. The second version describes a behaviour *plus* the failure mode it eliminates. The first will pass QA. The second will catch the bug where the form saves silently with a blank field, leaves a corrupted record in the database, and breaks a downstream report three weeks later.

The shift is from "describe what happens" to "describe what won't happen". Every criterion should answer the question: *if this is missing, what bug ships?*

## The twelve examples

Twelve common patterns where standard acceptance criteria miss the bug, and the rewritten version that catches it. These are genericised from real production examples.

### Example 1: The silent save failure

**Standard criteria:**
- User can save the customer record.
- Required fields are validated.

**Criteria that prevent bugs:**
- Saving fails (no record created, error message shown) if any of: name, email, primary contact number is blank.
- Saving fails if the email address does not contain `@` and a domain.
- Saving fails if the phone number is fewer than seven digits.
- If save fails, the form retains the user's input. The user does not have to re-enter data.
- If save succeeds, the user is shown the saved record (not redirected to a blank form).

The standard version passes QA. The detailed version catches: silent failures, lost-input rage-quits, and the bug where validation runs but the record is still partially written.

### Example 2: The optimistic UI lie

**Standard criteria:**
- After clicking Submit, a confirmation message is shown.

**Criteria that prevent bugs:**
- The confirmation message is shown only after the server confirms the record was persisted.
- If the server returns an error, the confirmation is not shown; the error message is shown instead with the specific failure reason.
- If the server does not respond within 10 seconds, the user sees a "still processing" indicator, not a confirmation.
- The submit button is disabled between click and server response (no double-submit).

Standard version passes when QA clicks the button on a happy day. Detailed version catches: optimistic UI lying to the user that their data saved when it didn't, double-submits creating duplicate records, and the silent timeout where users assume success and walk away.

### Example 3: The empty state nobody designed

**Standard criteria:**
- The dashboard shows the user's recent orders.

**Criteria that prevent bugs:**
- If the user has no recent orders, the dashboard shows a clearly worded empty state (not a blank panel, not an error, not a spinner that never stops).
- The empty state explains why no orders are shown (new account, no purchases in date range, filter excludes all orders).
- The empty state offers a next action where possible (e.g., "Browse products" link).

Standard version passes for users with orders. Detailed version catches: blank dashboard panels for new users that look like broken software, infinite spinners that never resolve, and the "is this site working?" support ticket.

### Example 4: The permission edge case

**Standard criteria:**
- Admin users can delete records.

**Criteria that prevent bugs:**
- Admin users can delete records owned by users in their team.
- Admin users cannot delete records owned by users outside their team. Attempting this returns a clear "you do not have permission" message, not a generic error.
- Deleting a record that has dependent child records (e.g., orders attached to a customer) is blocked with a clear message naming the dependency. The user can still see what depends on the record.
- Deleted records are not visible in any list, search, or report — *unless* the user has the "view deleted records" permission, in which case they appear with a clear "deleted" indicator.

Standard version catches the basic positive case. Detailed version catches: privilege escalation bugs (admin of one team deletes another team's data), orphaned records, and the worst-case scenario where a "deleted" record still appears in stale views.

### Example 5: The off-by-one search

**Standard criteria:**
- Search returns matching results.

**Criteria that prevent bugs:**
- Searching for an exact name returns that name as the top result.
- Searching for a partial name returns all names containing that string.
- Search is case-insensitive: "ARUN" and "arun" return the same results.
- Search ignores leading and trailing whitespace.
- Search across name fields treats "Mehta Arun" and "Arun Mehta" the same way (or, if it doesn't, the documentation says so explicitly).
- Empty search returns the full list, not zero results.
- Search with no matches shows a clear "no results found" message, not an empty list that looks like a loading state.

Standard version passes if QA searches one term. Detailed version catches: case-sensitivity bugs that confuse users, whitespace bugs from copy-paste, the bug where empty search returns nothing (so the page looks broken), and the "no results" state that looks like a bug.

### Example 6: The date that crosses time zones

**Standard criteria:**
- User can filter records by date.

**Criteria that prevent bugs:**
- The date filter uses the user's local timezone, not server time.
- A record created at 11:55 PM IST on May 24 appears under May 24, not May 25, regardless of where the user is located.
- The filter UI clearly shows which timezone it is operating in.
- Date range "May 1 to May 31" includes May 1 and May 31 (inclusive on both ends), not exclusive.

Standard version works on the developer's machine. Detailed version catches: the cross-timezone bug that makes Indian customers see "yesterday's" orders as today's, off-by-one date range bugs, and the silent timezone mismatch that breaks finance reports at month-end.

### Example 7: The slow response that pretends to be fast

**Standard criteria:**
- Page loads in under 3 seconds.

**Criteria that prevent bugs:**
- Initial page render happens within 1 second; full data load is acceptable up to 3 seconds.
- If data load exceeds 3 seconds, a clear "loading" indicator is shown (not just a blank page).
- If data load fails after the threshold, an error message is shown with a retry option.
- Once data is loaded, subsequent interactions on the same page do not re-fetch the full dataset.
- The 3-second target is measured from a 4G connection, not the developer's office wifi.

Standard version is a wish. Detailed version is testable, names the network conditions, and catches the bug where the page "loads" in 2 seconds but the data takes 8.

### Example 8: The audit trail that lies

**Standard criteria:**
- All changes are logged.

**Criteria that prevent bugs:**
- Every create, update, and delete action records: the user who performed it, the timestamp in UTC, the entity affected, the field-level before/after values for updates, and the source (UI/API/system).
- System-initiated changes (e.g., automated workflows) are logged with the workflow name as the actor, not "system".
- The audit log cannot be edited or deleted by any user, including admins.
- Audit log entries are retrievable for at least the compliance retention period (specify: e.g., 7 years for financial records).
- Bulk operations log one entry per affected record, not one entry for the whole bulk action.

Standard version satisfies the compliance checkbox. Detailed version catches: the missing-actor bug ("system" did it, but who started the workflow?), the "we logged it but you can't query it" bug, and the bulk delete that destroys 10,000 records but leaves one audit entry.

### Example 9: The notification that gets lost

**Standard criteria:**
- User receives an email when their order ships.

**Criteria that prevent bugs:**
- The email is sent within 60 seconds of the shipment status changing.
- If the email fails to send (bounce, blacklist, mailbox full), the failure is logged and a notification is shown in the user's in-app message centre.
- The email retries up to 3 times with exponential backoff if the initial send fails for a transient reason.
- The email contains: order ID, tracking number, expected delivery date, and a deep link back to the order page that works even if the user is logged out.
- Users who have opted out of shipment notifications do not receive the email.

Standard version passes when the email arrives. Detailed version catches: silent email failures, missing context in the email, broken deep links, and the opt-out that wasn't respected (GDPR/privacy violation territory).

### Example 10: The first-time-user trap

**Standard criteria:**
- New user can log in.

**Criteria that prevent bugs:**
- First-time login for a new user takes them to a clearly-labelled onboarding flow, not the empty main app.
- If the user abandons onboarding partway, they can resume from where they left off on next login.
- If the user completes onboarding, they are not shown it again on subsequent logins.
- All onboarding screens have a "Skip for now" option except the legally required terms acceptance.

Standard version assumes the user knows what to do. Detailed version catches: the dropoff bug where new users land on an empty dashboard and bounce, the onboarding restart loop, and the legal compliance failure where terms acceptance can be skipped.

### Example 11: The integration that silently breaks

**Standard criteria:**
- Records sync to the CRM.

**Criteria that prevent bugs:**
- Sync happens within 5 minutes of a record being created or updated.
- Failed sync attempts are retried 3 times with exponential backoff.
- After 3 failures, a clear error is logged with: record ID, error reason, and timestamp.
- A daily report lists all records that failed to sync in the last 24 hours, sent to the operations team.
- If the CRM is unavailable, records continue to be created locally and queued for sync; they are not lost.
- The sync status of each record is queryable in the application (sync date, sync status, last error if any).

Standard version assumes the integration works. Detailed version catches: silent sync failures that leave data inconsistent between systems, the lost-records bug when the CRM is briefly down, and the operations team finding out about sync failures from angry customers.

### Example 12: The error message that helps no one

**Standard criteria:**
- Errors are shown to the user.

**Criteria that prevent bugs:**
- Every error message names the specific field, action, or step that failed.
- No error message reads "Something went wrong" or "An unexpected error occurred" — every error has a specific, human-readable reason.
- Errors that require user action (e.g., re-entering data) clearly state what action to take.
- Errors that are the system's fault (not the user's) say so, and provide a reference ID the user can quote to support.
- Sensitive technical details (stack traces, SQL errors, internal API names) are never shown to the user, but are logged with a reference ID linked to the user-facing error.

Standard version passes because errors exist. Detailed version catches: useless error messages that drive support tickets, missing reference IDs that make support impossible, and the security bug where stack traces leak system internals to the user.

## How to actually use this

You don't need to write twelve criteria for every story. The point is the *frame*. For each story you write, ask: what could go wrong here that wouldn't be caught by "the feature works"?

The questions to walk through:

- What happens at boundaries (empty, max, just-over-max)?
- What happens when it's slow or fails?
- What happens for first-time users?
- What happens across timezones, locales, languages?
- What happens when the data is in an unexpected state (missing, malformed, duplicated)?
- What happens when the action is repeated, interrupted, or undone?
- Who can do this, and what happens when someone who shouldn't be able to, tries?

You'll find that three or four sharp criteria from this list will replace ten weak ones, and prevent more bugs than the long version did.

## The discipline

The discipline is to stop writing acceptance criteria that describe the happy path. The happy path is what the feature does. The criteria are for the unhappy paths — because the unhappy paths are where the bugs ship.

If your criteria don't make the engineering team uncomfortable, they're not catching enough.

---

*The next piece in this series breaks down the 3-question framework for handling "just do what I said" stakeholders. Subscribe below to get it.*
