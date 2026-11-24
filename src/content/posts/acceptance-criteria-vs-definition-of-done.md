---
author: Arun Mehta
pubDatetime: 2026-11-24T04:19:39.000+05:30
title: "Acceptance criteria vs definition of done: the difference, with a worked example (free Excel)"
slug: acceptance-criteria-vs-definition-of-done
featured: false
draft: false
tags:
  - acceptance-criteria
  - user-stories
  - requirements
  - business-analysis
description: "Acceptance criteria vs definition of done: one belongs to a story, the other to the team. A worked example of where they differ, with a free Excel tracker."
---

Acceptance criteria are the conditions one specific story must meet to be accepted. The definition of done is the team's single checklist that every story must meet before anyone calls it finished. Acceptance criteria change with every story and the business analyst or product owner usually writes them. The definition of done barely changes from sprint to sprint and the whole team owns it.

A story is done only when both are satisfied. Every Scrum explainer says so, and it is the least useful part of the answer. The useful part is what happens when a story passes one and fails the other, which is where teams argue and ship things they regret. Below is a sprint where exactly that happens, and the Excel tracker used for it is free at the end.

## The short version

| | Acceptance criteria | Definition of done |
| --- | --- | --- |
| Belongs to | One story | The team, all stories |
| Answers | Does this feature do the right thing? | Is this work finished to our standard? |
| Written by | BA or product owner, with the team | The team, revised at retrospectives |
| Changes | With every story | Rarely, and never mid-sprint |
| Example | A 50 dollar refund is not auto-approved | Code reviewed by a second developer |

If you can only remember one test: if a statement would be true of every story the team builds, it belongs in the definition of done. If it only makes sense for this story, it is an acceptance criterion.

## Where the textbook answer breaks down

Most teams get the definitions right and the boundary wrong. Three mistakes come up again and again.

**"All acceptance criteria met" is an item on the definition of done.** Nearly every definition of done I have reviewed has it, and it should not be there. It turns the definition of done into a container for the acceptance criteria, so the moment criteria pass, the story feels 80% done and the remaining items start to look like paperwork. Keep them as two separate checks. A story can pass every criterion and still not be done, and you want that state to be visible, not buried inside a checklist.

**Story-specific rules sneak into the definition of done.** "Page loads in under three seconds" on the team checklist sounds rigorous. It is meaningless for a nightly batch job or a database migration, so people start ticking it without thinking, and the other items follow. Performance targets belong in the acceptance criteria of the stories where speed matters, written the way [acceptance criteria that actually prevent bugs](/posts/acceptance-criteria-that-actually-prevent-bugs/) describes: with the number, the conditions and the failure you are guarding against.

**Business obligations get left to the acceptance criteria of whoever remembers.** This is the reverse mistake, and the one that hurts a business analyst most. If finance signed off a requirement that every refund must be auditable, that obligation applies to every story that touches refund data. Writing "audit log entry created" into each story's criteria works until the one story where nobody remembers. That kind of rule belongs in the definition of done, and the BA is the person who should put it there, because the BA is the one who knows which [business requirements](/posts/business-requirements-vs-functional-requirements/) cut across every story.

## A worked example: sprint 7 of a refund portal

The project is synthetic but realistic: an online retailer building a self-service refund portal. Seven stories are in play at the sprint 7 review. The team's definition of done has seven items:

1. Code reviewed by a second developer
2. Automated tests written and passing in the build
3. Deployed to the staging environment
4. No open severity 1 or 2 defects on the story
5. Every change to refund data writes an audit log entry
6. Help text and support macros updated
7. Product owner has seen it working on staging

Here is where each story stands:

| Story | Status | What is holding it |
| --- | --- | --- |
| ST-1 Start a refund from order history | Done | Nothing |
| ST-2 Hide refund on ineligible orders | Done | Nothing (audit item is N/A, no data changes) |
| ST-3 Auto-approve refunds under 50 dollars | Works, not done | No audit entry on auto-approval |
| ST-4 Large refunds go to the finance queue | Criteria failing | Two approvers can approve the same refund |
| ST-5 Email at each status change | In test | Opt-out criterion not yet tested |
| ST-6 Show refund history on flagged accounts | Works, not done | Help text not updated |
| ST-7 Export the refund log | No criteria | Nobody has written them |

The interesting rows are ST-3 and ST-6. Every acceptance criterion passes, and a product owner watching the demo would accept both. And yet ST-3 approves money with no audit record, which is precisely the thing finance signed off against, and ST-6 gives approvers a new screen that support cannot explain.

Most trackers cannot show this state, because they have one status column. ST-3 gets dragged to Done because "it works", the audit item becomes a tech debt ticket, and three sprints later someone finds a month of auto-approved refunds with no audit trail. I call this state "works, not done" and I think every team should have a name for it. Naming it turns an argument about whether the story is finished into a short list of what is left.

ST-4 is the opposite lesson. One acceptance criterion fails: two approvers can approve the same large refund, and in test the payout went out twice. No checklist rescues a story that does the wrong thing.

## Who owns what

The BA or product owner owns the acceptance criteria, but should never write them alone: testers find the boundaries you missed.

The team owns the definition of done, including the BA. If you are the person who knows that compliance, audit, data retention or support readiness matter for this product, it is your job to propose them as definition of done items at a retrospective, not to repeat them in every story. That is one of the places where the [BA role differs from the product owner's](/posts/ba-vs-po-vs-pm-the-honest-difference/): the PO decides what gets built, and the BA makes sure the obligations behind the requirements do not quietly fall off.

What nobody owns is the right to waive a definition of done item for one story because the sprint is ending. If an item is wrong, change the definition at the retrospective. If it is right, the story is not done.

## How the file works

The Excel tracker has five sheets. Stories lists each story and calculates, for each one, how many criteria are written, passed and failing, how many definition of done items are met and open, and the status: No criteria, Criteria failing, In test, Works not done, or Done. Acceptance Criteria holds one row per criterion, linked to its story with a dropdown, marked Pass, Fail or Not tested. Definition of Done holds the team list, up to ten items, and shows which item is open on the most stories. In the example it is help text, open on four of seven stories, which tells the team where the real bottleneck is. DoD Check is where you mark each item Yes, No or N/A per story.

Cream cells are inputs, blue-grey cells are formulas, and there are no macros. If you already keep a [requirements traceability matrix](/posts/requirements-traceability-matrix-example/), the Acceptance Criteria sheet maps neatly onto its functional requirements layer.

## Get the template

[Download the acceptance criteria and definition of done tracker (Excel)](/download/acceptance-criteria-definition-of-done-checklist.xlsx/). It is free, with the refund portal example filled in. Delete the example rows and replace the definition of done with your team's own.

If you also need a RACI matrix, a change request log and a decision log, they come with the [BA Template Kit (Excel + Word)](https://requirementsfirst.gumroad.com/l/lglkd) for 19 dollars.

Before your next sprint review, open the Definition of Done sheet and ask one question: which of these items would we have waived last sprint if nobody was looking? That item is either wrong, or the most important one on the list.

---

*If this was useful, the publication covers the rest of the requirements craft the same way: plainly, with a point of view. Subscribe below for new pieces as they publish.*
