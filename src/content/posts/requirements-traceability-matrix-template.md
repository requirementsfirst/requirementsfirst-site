---
author: Arun Mehta
pubDatetime: 2026-10-27T08:10:00.000+05:30
title: "Requirements traceability matrix template (free Excel and Notion): three linked tables"
slug: requirements-traceability-matrix-template
featured: false
draft: false
tags:
  - business-analysis
  - requirements
  - documentation
  - craft
description: "A free requirements traceability matrix template for Excel and Notion. Links business requirements, functional requirements and tests, and calculates coverage."
---

A requirements traceability matrix answers one question: for everything the business asked for, can we show that we built it and proved it works? It is a simple question. The usual way of answering it, one enormous spreadsheet, is why most traceability matrices are out of date by the second sprint.

This piece explains what an RTM is actually for, why the spreadsheet version rots, and a structure that keeps itself honest: three linked tables with coverage calculated for you.

## What a traceability matrix is for

Traceability runs in two directions.

**Forward:** every business requirement should have at least one functional requirement that delivers it, and every functional requirement should have at least one test that proves it. A gap means something the business asked for might not get built or might not get checked.

**Backward:** every functional requirement should trace back to a business requirement. If it does not, either a business requirement is missing or the feature should not exist. A functional requirement with no business requirement behind it is a feature nobody validated.

The [difference between business and functional requirements](/posts/business-requirements-vs-functional-requirements/) matters here. A business requirement is an outcome the organisation wants, in stakeholder language, with no mention of screens or systems. A functional requirement is what the system must do to produce that outcome. The matrix is the bridge between them, and then from them to the tests.

## Why the spreadsheet version rots

The classic RTM is a single sheet: one row per requirement, columns for business requirement ID, functional requirement ID, test case IDs, status. It works for twenty rows. It breaks for three reasons.

The relationships are many-to-many. One business requirement spawns several functional requirements, and one functional requirement can serve two business requirements. A spreadsheet handles that with merged cells, repeated rows or comma-separated IDs, and all three break the moment someone sorts or filters.

Coverage is checked by eye. Someone has to look at every row to notice that FR-14 has no tests. On a real project nobody does that until the week before an audit.

Status lives in two places. The test result is in the test tool, the requirement status is in the backlog, and the matrix is a third copy of both that is always slightly wrong.

## The structure: three linked tables

Split it into three tables and link them.

- **Business Requirements:** the outcome, its objective, its priority and the stakeholder who signs it off.
- **Functional Requirements:** each one linked to the business requirement or requirements it serves, with its acceptance criteria and build status.
- **Test Cases:** each one linked to the functional requirement it proves, with a result of Not run, Pass or Fail.

Then calculate coverage instead of checking it.

Each **functional requirement** gets a coverage status from its linked tests:

- **No tests** if nothing is linked
- **Failing** if any linked test failed
- **Not run yet** if some tests have not run
- **Passing** if every linked test passed

Each **business requirement** gets a trace status from its linked functional requirements:

- **Not traced** if nothing is linked
- **Failing** if any functional requirement is failing
- **Gaps** if any has no tests or untested ones
- **Fully tested** if everything beneath it passes

## A worked example: the refund portal

A synthetic project: a retailer building a self-service refund portal. Three business requirements, four functional requirements, four tests.

| Business requirement | Trace status | Why |
| --- | --- | --- |
| BR-1 Customers can get a refund without contacting support | **Fully tested** | FR-1 has two passing tests |
| BR-2 Refunds are paid out within one business day | **Failing** | FR-3's gateway test failed; FR-2's test has not run |
| BR-3 Finance can audit every refund | **Gaps** | FR-4 has no tests yet |

Reading the matrix takes ten seconds and tells you three different things. BR-1 is done. BR-2 has a real problem: a failed test on the gateway integration, which is a conversation for engineering today. BR-3 is not broken, it is unfinished: someone needs to write tests for the audit trail before it can be called done.

Notice what you did not have to do. Nobody cross-checked rows. The gaps announced themselves.

## Three habits that keep it honest

1. **Link before you write.** When a new functional requirement appears, link it to a business requirement first. If you cannot, stop and ask why it exists. That question has saved more scope than any prioritisation framework.
2. **Treat No tests as a status, not a blank.** A requirement without tests is not untested, it is unprovable. Make it visible.
3. **Review the trace status, not the rows.** In a status update, report business requirements that are Failing or have Gaps. Nobody needs the full matrix.

## What traceability cannot tell you

A traceability matrix proves you built what was asked. It cannot tell you whether what was asked was true. In the example, BR-2 assumes finance will let small refunds through automatically. Every test can pass and the portal can still fail if that assumption was wrong.

That is a discovery problem, not a delivery problem, and it is cheaper to catch before anyone writes a test. The [assumption log](/posts/assumption-log-template-for-business-analysts/) is how I catch it, and [the question most BAs forget to ask before opening Jira](/posts/the-question-most-bas-forget-to-ask-before-opening-jira/) is where it starts.

## Get the template

There are two free versions. Both come with the refund portal example filled in.

**Excel.** [Download the Requirements Traceability Matrix for Excel](/requirements-traceability-matrix-template.xlsx). It also opens in Google Sheets and LibreOffice. Three sheets, Business Reqs, Functional Reqs and Test Cases, with dropdowns for the links, so you pick an ID instead of typing one. Coverage and trace status are formulas and colour themselves red, amber or green. No macros.

**Notion.** The three linked databases with automatic IDs (BR, FR, TC), coverage and trace status calculated for you, a trace status view, a coverage gaps list and a failing tests list. [Get the Notion version](https://requirementsfirst.gumroad.com/l/bkgdtg). It is pay what you want, so enter 0 at checkout.

## How the Excel version handles many-to-many links

A spreadsheet cannot hold a real many-to-many link, so the Excel template keeps one link per row and counts instead of looking up.

Each test case names the one functional requirement it proves. Each functional requirement names the business requirement it serves, with an optional second column for the rare one that serves two. Coverage is then a few COUNTIFS: how many tests point at this requirement, how many of them passed, how many failed. Trace status does the same one level up, counting how many of a business requirement's functional requirements are failing or have gaps.

Because nothing is merged and nothing is comma-separated, you can sort and filter any sheet without breaking it. That is the whole trick. If you already have a single-sheet RTM, split it into the three sheets and the formulas do the checking.

---

*If this was useful, the publication covers the rest of the requirements craft the same way: plainly, with a point of view. Subscribe below for new pieces as they publish.*
