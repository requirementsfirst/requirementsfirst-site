---
author: Arun Mehta
pubDatetime: 2026-11-23T06:50:00.000+05:30
title: "Requirements traceability matrix example: a filled-in RTM (free Excel)"
slug: requirements-traceability-matrix-example
featured: false
draft: false
tags:
  - business-analysis
  - requirements
  - documentation
  - craft
description: "A requirements traceability matrix example from a project in UAT, every status explained row by row, with the filled-in Excel file to download free."
---

Search for a requirements traceability matrix example and you will mostly find the same picture: a neat grid, a dozen requirements, a tick in every cell, and a column that says 100% covered. It looks reassuring. It also teaches you nothing, because no matrix on a live project looks like that, and the matrix that does look like that is usually the one nobody has updated.

A useful example is one caught in the middle of a project, when the matrix is doing its real job: telling you which requirements are done, which are unfinished, which are broken, and which nobody has thought about yet. That is the example below, and the filled-in Excel file is free to download at the end.

## The project

A synthetic one, close enough to real: an online retailer building a self-service refund portal. Today customers email support, a support agent raises a ticket, finance approves it, and the money arrives nine days later. Forty-one percent of support tickets are customers chasing a refund.

We join the project in week two of user acceptance testing. Six business requirements, thirteen functional requirements, eighteen test cases. If you have not seen the three-table structure before, the [requirements traceability matrix template](/posts/requirements-traceability-matrix-template/) explains it. In short: business requirements at the top, functional requirements that each serve one or two of them, and test cases that each prove one functional requirement. Status rolls up from the tests.

## The matrix at a glance

| Business requirement | Trace status | What is behind it |
| --- | --- | --- |
| BR-1 Refund without contacting support | Fully tested | FR-1, FR-2, FR-3 all passing |
| BR-2 Paid out within one business day | Failing | FR-6 volume test failed |
| BR-3 Finance can audit every refund | Gaps | FR-9 export not built, no tests |
| BR-4 Customers know where their refund stands | Gaps | FR-11 email test not run |
| BR-5 Refund abuse caught before payout | Gaps | FR-13 history view has no tests |
| BR-6 Store staff refund through the portal | Not traced | No functional requirements at all |

One green, one red, three amber, one grey. That ratio is normal for week two of UAT. If your matrix shows all green at this stage, be suspicious of the matrix, not proud of the project.

## Reading it row by row

**BR-1 is Fully tested.** Three functional requirements serve it: start a refund from order history, hide the option outside the 30-day window, and pick a reason from a fixed list. Every linked test has passed. Look at TC-4 in the file: the 30-day boundary test failed last week because of a timezone bug, was fixed and passed on retest. The note says so. A matrix that only records the latest result hides that history; one short note keeps it.

**BR-2 is Failing.** Four of its six tests pass and one is blocked. The one that fails is TC-10: two hundred payouts in an hour, where the payment gateway sandbox starts rejecting requests above a hundred and fifty. One red test is enough to turn the whole business requirement red, and that is deliberate. Finance signed BR-2 because they care about one-day payouts on a busy day, not on a quiet Tuesday. This is a conversation for engineering today, with defect DEF-15 attached.

**BR-3 has Gaps.** The audit log works and is tested. The export finance needs at year end (FR-9) has not been started and has no tests. Nothing is broken. It is unfinished, and the difference matters in a status meeting. "Failing" makes sponsors nervous. "Gaps" tells them exactly what work is left.

**BR-4 and BR-5 have Gaps for two different reasons.** BR-4 has a test that cannot run yet, because the payout email depends on the same gateway sandbox fix. BR-5 has a functional requirement, showing the approver an account's refund history, that is still in build and has no test written. The first is blocked work; the second is missing work. Both are amber, and the notes column tells you which kind.

**BR-6 is Not traced.** Store staff refunding in-store purchases through the same portal is a Could. Nobody has written a single functional requirement for it. This is the row most matrices hide, because they start from the functional requirements and work upwards, so a business requirement with nothing beneath it never appears. Starting from the business requirements makes it impossible to miss. Either somebody decides how store refunds will work, or the sponsor agrees in writing that BR-6 is out of this release. Both are fine. Silence is not.

## Many-to-many is the point, not a problem

Three of the functional requirements serve two business requirements each. FR-1, starting a refund from order history, serves both BR-1 (no support contact) and BR-4 (knowing where the refund stands). FR-5, the finance approval queue, serves both payout speed and fraud control.

Spreadsheet matrices that put one business requirement per row and one functional requirement per column cannot show this without duplicating rows, which is where they start to drift. The example handles it with an optional second link. If a functional requirement seems to serve three or more business requirements, it is usually two requirements glued together. Split it, and write [acceptance criteria](/posts/acceptance-criteria-that-actually-prevent-bugs/) for each half.

## What the summary sheet is for

The file has a Summary sheet that counts business requirements by trace status, functional requirements by coverage, and tests by result. For this example: 1 of 6 business requirements fully tested, 7 of 13 functional requirements passing, 14 of 18 tests passed.

Notice how different those three numbers feel. "Fourteen of eighteen tests passed" sounds like 78% done. "One of six business requirements fully tested" sounds like the project is in trouble. Both are true. The business requirement number is the one a sponsor should hear, because it is the only one stated in her terms. If you report only test pass rates, you are reporting the project's activity, not its progress.

## Three mistakes the example avoids

1. **Tracing to design instead of to need.** Every row in the Business Reqs sheet passes the test from [business vs functional requirements](/posts/business-requirements-vs-functional-requirements/): it could be met with no software at all. If your top layer mentions screens, buttons or fields, your matrix is tracing one design decision to another.
2. **Ticking cells by hand.** No status in the file is typed. Coverage and trace status are formulas, so a failed test turns its business requirement red the moment someone records it.
3. **Hiding orphans.** BR-6 is visible because the matrix starts from business requirements. If you start from a backlog, you only ever see what someone already decided to build.

## How the file works

It is the same three linked sheets as the blank template, plus a Summary sheet, with the refund portal filled in.

Cream columns are inputs. Blue-grey columns are formulas: do not type in them. Dropdowns let you pick the business requirement a functional requirement serves, and the functional requirement a test proves, so IDs cannot be mistyped. Coverage and trace status colour themselves red, amber, green or grey. The How to use sheet points you to the rows worth looking at first. There are no macros, and it opens in Excel, Google Sheets and LibreOffice.

When you are ready for your own project, either delete the example rows (cream columns only) or start from the blank [template](/posts/requirements-traceability-matrix-template/). If you are still deciding what belongs in which document before you trace anything, read [BRD vs FRD vs SRS](/posts/brd-vs-frd-vs-srs/) first.

## Get the template

[Download the requirements traceability matrix example for Excel](https://requirementsfirst.gumroad.com/l/pjvkdi). It is free: enter 0 at checkout and the file link arrives straight away.

Want the full set? The [BA Template Kit (Excel + Word)](https://requirementsfirst.gumroad.com/l/lglkd) bundles this file with the blank matrix, the BRD and FRD Word template, and three files that are not free on the site: a RACI matrix, a change request log and a decision log. It costs 19 dollars.

Open it, go to the Business Reqs sheet, and before reading any formula ask yourself which row you would mention first in a status meeting. If your answer is BR-6, you already know what a traceability matrix is for.

---

*If this was useful, the publication covers the rest of the requirements craft the same way: plainly, with a point of view. Subscribe below for new pieces as they publish.*
