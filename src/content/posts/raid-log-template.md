---
author: Arun Mehta
pubDatetime: 2026-10-27T08:05:00.000+05:30
title: "RAID log template: how to keep a RAID log people actually read"
slug: raid-log-template
featured: false
draft: false
tags:
  - business-analysis
  - requirements
  - documentation
  - craft
description: "A free RAID log template that rates itself: likelihood times impact, a Red, Amber or Green rating, and review dates that flag what is overdue. With an example."
---

Every project has a RAID log. Risks, assumptions, issues and dependencies, usually in a spreadsheet with forty rows, most of them amber, updated the night before the steering meeting. Everyone agrees it is important. Almost nobody reads it.

The log is not ignored because people are careless. It is ignored because it does not tell anyone what to do. Forty amber rows are the same as no rows. A RAID log people actually read has two properties: it ranks itself, so the top of the list is always the thing that matters, and it ages itself, so anything stale announces itself without anyone checking.

## What goes in a RAID log

**Risks** are things that might happen and would hurt the project if they did. "The payment gateway may throttle refunds during sale season."

**Assumptions** are things the plan depends on that nobody has confirmed. "Finance will let small refunds through without manual approval."

**Issues** are risks that have already happened. "Staging only holds 18 months of order history, so older refund cases cannot be tested."

**Dependencies** are things the project needs from someone outside it. "Engineering needs gateway sandbox credentials before end-to-end testing can start."

Some teams use A for actions and D for decisions. It does not matter much. What matters is that every row has a named owner and a next action, not just a description.

## Make it rate itself

Rate every item on two fixed scales instead of a free-text RAG status. Free text drifts. "Amber" means something different to every person who types it.

- **Likelihood:** High (3), Medium (2), Low (1). Leave it blank for issues: they have already happened, so they are scored as certain (3).
- **Impact:** Critical (4), High (3), Medium (2), Low (1).

**Severity = likelihood × impact**, which gives a score from 0 to 12. Then the colour is a rule, not an opinion:

- **9 and above: Red.** Goes in the status update this week, with an owner and a date.
- **4 to 8: Amber.** Reviewed on its review date.
- **Below 4: Green.** Stays in the log, stays out of the meeting.

The point of the rule is not precision. It is consistency. Two people rating the same item will usually land in the same band, and the bands are what drive behaviour.

## Make it age itself

Two date fields do the rest. **Raised on** gives you a Days open count, so the issue that has been open for six weeks stops looking the same as the one raised yesterday. **Review by** gives you an Overdue flag the moment the date passes. Nobody has to remember to check. The overdue list is simply there.

## A worked example: the refund portal

Here is the RAID log for a synthetic project: a retailer building a self-service refund portal.

| Item | Type | Rating |
| --- | --- | --- |
| Finance rejects auto-approval for small refunds | Risk | **Red (12)**, review overdue |
| Payment gateway sandbox access | Dependency | **Red (9)** |
| Order history older than 18 months missing in staging | Issue | **Red (9)** |
| Customers will start most refunds themselves | Assumption | Amber (8) |
| Legal sign-off on refund terms | Dependency | Amber (8) |
| Gateway rate limits during sale season | Risk | Amber (6) |
| Support refund macro is out of date | Issue | Closed |

Three items are red, and one of them is past its review date. That is the entire status update for this week: three reds, who owns them, and what happens next. The four ambers are reviewed on their dates. Nobody in the meeting needs to hear about the closed macro issue.

Notice that the top item is a risk about an assumption. Finance has not agreed to the rule the whole business case depends on. That is common, and it is the main weakness of a RAID log.

## Where RAID logs fall short

The A in RAID is where projects quietly fail. A RAID log treats an assumption as one row among forty, rated the same way as a staging environment problem. But assumptions are different: they are cheap to check early and very expensive to discover late, and the dangerous ones are rarely the ones people argue about.

If your project is early, in discovery or still shaping requirements, give assumptions their own log and rank them on impact, confidence and reach. I wrote up how in the [assumption log template](/posts/assumption-log-template-for-business-analysts/). Keep the RAID log for delivery risks, issues and dependencies, and link the two.

## The weekly routine

1. Add anything new from the week. If someone said "we're blocked on" or "assuming that", it goes in.
2. Re-rate anything with new information. A risk that happened becomes an issue.
3. Work the overdue list: update the next action or close the item.
4. Report the reds and the overdue reviews. Nothing else.

That fourth step changes how the log is read. When the status update only ever contains reds and overdue items, people start paying attention to it, because it is always short and always relevant. If your status updates are turning into [one-page arguments for a decision](/posts/the-one-page-artifact-that-earns-the-right-to-push-back/), the RAID log is the evidence behind them.

## Get the template

I built this as a free Notion template: one RAID Log database with the severity, rating, days-open and review-due formulas built in, a Red items list, a Review overdue list, a board of open items by type, and the refund portal example filled in.

[Get the RAID Log template, free](https://requirementsfirst.gumroad.com/l/ewkav). It is pay what you want, so enter 0 at checkout.

In a spreadsheet, the same logic is two dropdown columns, two lookups that turn labels into numbers, one multiplication, and a conditional format on the result.

---

*If this was useful, the publication covers the rest of the requirements craft the same way: plainly, with a point of view. Subscribe below for new pieces as they publish.*
