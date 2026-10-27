---
author: Arun Mehta
pubDatetime: 2026-10-27T08:00:00.000+05:30
title: "Stakeholder register template: build one that tells you who to talk to next"
slug: stakeholder-register-template
featured: false
draft: false
tags:
  - business-analysis
  - stakeholder-management
  - discovery
  - craft
description: "A free stakeholder register template for business analysts that picks an engagement strategy and flags who you have not spoken to recently enough."
---

Most stakeholder registers are a phone directory. Name, role, email, maybe a power and interest grid that someone filled in during week one and nobody opened again. It is complete, it is tidy, and it answers no question the BA actually has on a Tuesday afternoon.

A register earns its place when it answers two questions every week: who can change the outcome of this project, and which of those people have I not spoken to recently enough. Everything in the template below exists to answer one of those two questions. Everything that does not, I have dropped.

## The fields that matter

**Name, role and team.** Obvious, and the least useful columns in the register.

**Can decide.** What this person can actually approve or veto. This is the most important column and the one most registers leave out. A product owner who talks to you every day may not be able to decide anything about refund limits. A finance controller you have met once may be the only person who can. When the column is honest, it tells you whose answer counts and whose answer is an opinion.

**Influence and interest.** Two dropdowns, High, Medium or Low. Influence is how much power this person has over the outcome. Interest is how much the outcome affects them.

**Attitude.** Champion, Supporter, Neutral, Sceptic or Blocker. This is separate from influence on purpose. A champion with no influence is a nice conversation. A sceptic with high influence is your next meeting.

**Preferred channel.** Some people answer a written brief in a day and ignore a meeting invite for a week. Writing this down saves you guessing.

**Last contact and next touchpoint.** The two dates that make the register move.

Drop email addresses and phone numbers. They live in your address book already. Drop elaborate stakeholder category taxonomies. Nobody has ever made a better decision because a stakeholder was tagged "secondary external".

## Turn the grid into a rule

The power and interest grid is a good idea that usually stays a picture. Make it a rule instead, so every person gets a strategy and a contact rhythm the moment you rate them.

| Influence and interest | Strategy | Talk to them at least every |
| --- | --- | --- |
| High influence, high interest | Manage closely | 7 days |
| High influence, lower interest | Keep satisfied | 14 days |
| Lower influence, high interest | Keep informed | 14 days |
| Everyone else | Monitor | 30 days |

Then add one computed column: days since last contact, compared against that rhythm. Anyone past it is Overdue. That single flag turns the register from a record into a to-do list.

## A worked example: the refund portal

Here is a synthetic project. A retailer is building a self-service refund portal so customers stop emailing support for refunds. Six weeks in, the register looks like this.

| Stakeholder | Strategy | Contact status |
| --- | --- | --- |
| Priya, Head of Customer Support | Manage closely | On track |
| Meera, Product Owner | Manage closely | On track |
| David, Finance Controller | Keep satisfied | **Overdue (19 days)** |
| Tom, Payments Engineering Lead | Keep informed | On track |
| Aisha, Customer Experience Analyst | Keep informed | **Overdue (15 days)** |
| Rahul, Compliance Manager | Keep satisfied | No contact yet |

Look at David. The whole business case for the portal assumes refunds under 50 dollars are approved automatically, and David's Can decide column says "approval thresholds and refund limits". He is the only person who can confirm the assumption the project rests on, and nobody has spoken to him in nineteen days.

Now look at Meera. She talks to the BA every day and is happy to answer finance questions. Her Can decide column says "scope and sprint priorities". The register is telling you that her answer on refund limits is an opinion, not a decision. On a project without that column, her "I am sure finance will be fine with it" goes into the requirements as a fact.

Rahul has not been contacted at all. Low interest today, high influence, and a hard gate at launch. The register makes sure you meet him in week six, not in the week before go-live.

None of this needs a clever analyst. It needs four dropdowns, two dates, and a rule.

## The five-minute weekly routine

Every Monday, before anything else:

1. Open the overdue list. For each name, decide whether you need a conversation or just a short written update, and send it.
2. Update Last contact for every real conversation from the previous week.
3. Re-rate anyone whose attitude shifted. A supporter who went quiet after a steering meeting is worth a call.
4. Check the Can decide column against your open questions. Every question should be with someone who can actually answer it.

That last step is where most stakeholder problems are caught early. If you keep asking the wrong person, you will keep getting confident answers that do not hold. The [stakeholder discovery conversation](/posts/how-to-actually-run-a-stakeholder-discovery-conversation/) gets you better answers, and [handling resistance to your questions](/posts/handling-stakeholder-resistance-to-questions/) covers what to do when the right person will not engage. When the real problem is that nobody has agreed who decides, that is [an authority dispute, not a requirements dispute](/posts/stakeholder-conflicts-authority-not-requirements/).

## Get the template

I built this as a free Notion template: the Stakeholders database with the strategy and contact-status formulas built in, an overdue list, an engagement plan sorted by influence, a board by attitude, and the refund portal example filled in so you can see it working before you add your own people.

[Get the Stakeholder Register template, free](https://requirementsfirst.gumroad.com/l/etgzbz). It is pay what you want, so enter 0 at checkout.

If you prefer a spreadsheet, the rule table above is all the logic you need: two dropdown columns, one lookup for strategy, and one formula comparing today's date with Last contact.

A register tells you who to talk to. What they tell you is a different problem. Stakeholders hand you assumptions dressed as facts, and the dangerous ones are rarely the ones anyone argues about. The [assumption log](/posts/assumption-log-template-for-business-analysts/) is how I rank those.

---

*If this was useful, the publication covers the rest of the requirements craft the same way: plainly, with a point of view. Subscribe below for new pieces as they publish.*
