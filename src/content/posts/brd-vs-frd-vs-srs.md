---
author: Arun Mehta
pubDatetime: 2026-11-09T06:40:00.000+05:30
title: "BRD vs FRD vs SRS: the real difference, plus a free Word template"
slug: brd-vs-frd-vs-srs
featured: false
draft: false
tags:
  - business-analysis
  - requirements
  - documentation
  - craft
description: "BRD vs FRD vs SRS explained by who signs each one and what it decides, with a refund portal example and a free Word BRD and FRD template."
---

Most explanations of BRD vs FRD vs SRS give you three definitions and a comparison chart, and leave you believing a serious project needs three documents. It rarely does. Most projects need two levels of thinking, and whether those levels sit in one file or three is a question of who has to sign what.

So the useful way to separate these documents is not by what they contain. It is by the decision each one exists to get.

## The short answer

| Document | Decision it gets | Who signs it |
| --- | --- | --- |
| BRD | Is this outcome worth pursuing, and what counts as success? | Business owner or sponsor |
| FRD | Is this the behaviour we want the system to have? | Business owner and delivery lead |
| SRS | Is this a complete, buildable and verifiable specification? | Engineering, QA, sometimes the client under contract |

BRD is the business requirements document. FRD is the functional requirements document. SRS is the software requirements specification. Those labels are less standard than the charts suggest. One organisation's FRD is another's SRS, and I have seen a 90-page "BRD" that was a functional specification from page six onwards. Before you argue about the template, ask what the people signing it believe they are agreeing to.

## What a BRD is really for

A BRD records the outcomes the organisation wants, in language the sponsor would use, with a number attached. On a refund portal for an online retailer, it says refunds take nine days on average and should take two. It says 41 percent of support tickets are customers chasing refund status, and that number should fall to 15.

Then it states [business requirements, not functional ones](/posts/business-requirements-vs-functional-requirements/). "Customers can find out where their refund stands without contacting support" belongs here. Notice it does not mention an order page or an email. A status page might be the answer. So might a clear refund promise at the point of purchase.

The test I use: could this be met with no software at all? If yes, it belongs in the BRD. If no, a solution has already crept in, and you should find out who chose it and whether anyone validated the problem first.

A BRD fails when it becomes a wish list. If every line is a Must and no line has a number, the sponsor has signed nothing that can ever be checked.

## What an FRD is really for

An FRD says what the system must do to produce those outcomes. "The system must show the customer the current status of each refund on the order page" is functional. So is "approve refunds automatically at or below the approval limit when the order passes the eligibility rules."

Two things make an FRD worth having. Every functional requirement points to the business requirement it serves. And every functional requirement can be proven by a tester, which means it needs [acceptance criteria that would actually catch a bug](/posts/acceptance-criteria-that-actually-prevent-bugs/). At Rs 4,999 the refund is approved automatically. At Rs 5,001 it goes to a human queue. That sentence settles an argument that would otherwise surface in UAT.

An FRD fails when it drifts into design. Field lengths and table names are not usually what the business owner is signing, and including them means she either rubber-stamps what she cannot evaluate or spends a week on what does not matter to her.

## What an SRS is really for

The SRS is the one with a formal lineage. It comes from software engineering standards: IEEE 830 originally, now ISO/IEC/IEEE 29148. It tends to cover functional behaviour plus external interfaces, quality attributes, design constraints and verification, written for the people building and testing the system.

You need a true SRS when the cost of ambiguity is contractual or physical: a fixed-price vendor build, a regulated system, an embedded product, an integration where two organisations must agree on a boundary. Then the rigour pays for itself.

You do not need one for an internal product team that sits together and ships every fortnight. Writing a formal SRS there produces a document nobody opens after the first sprint, which is one reason [the big requirements document got its bad name](/posts/the-requirements-document-is-dead/).

## The contrarian part: separate documents are often a cost

The usual advice treats BRD, FRD and SRS as a staircase you must climb. In practice, splitting them creates a specific failure. The BRD gets signed and filed. The FRD gets written by someone else, weeks later. The link between them survives only in one person's head. Six months on, nobody can say why FR-37 exists, and nobody dares remove it.

For most projects I would write one document in two parts. Part one is business requirements, agreed and signed before anything else. Part two is functional requirements, each carrying the ID of the business requirement it serves. It is one file, so the trace cannot silently break, and two parts, so the sponsor knows exactly what she is approving.

Split them only when the audiences or the approval chains really differ: a separate vendor, a separate procurement stage, an audit requirement that names a specific document. Splitting because the template library has three templates is not a reason.

## How to pick, in one pass

| Your situation | Write | Why |
| --- | --- | --- |
| Internal team, agile delivery | One BRD and FRD document, thin | Keeps the trace, skips ceremony |
| Business case needs funding first | BRD now, FRD after approval | No point specifying an unfunded idea |
| Vendor or fixed-price build | BRD, FRD, and an SRS or contract spec | Ambiguity becomes a change request |
| Regulated or safety-relevant system | All three, per your standard | The audit trail is the deliverable |

If you are on the first row and your organisation still demands a document called an FRD, give them part two with that heading. Names cost nothing.

## How the file works

The template is a single Word document, set up exactly as argued above.

Part 1 is the BRD: document control, problem and evidence, measurable objectives, scope, stakeholders, business requirements, assumptions and constraints, and sign-off. Part 2 is the FRD: actors, functional requirements with a Serves BR column and acceptance criteria, non-functional requirements with a measure, business rules, a trace check, and open questions.

Cream rows hold a complete refund portal example, so you can see what a finished entry looks like. Overwrite them. White rows are blank. The trace check at the end forces the two questions that matter before you circulate: does every functional requirement serve a business requirement, and does every business requirement have something serving it? On larger projects, move that check into a [requirements traceability matrix](/posts/requirements-traceability-matrix-template/).

## Get the template

[Download the BRD and FRD template for Word](https://requirementsfirst.gumroad.com/l/mbmqht). It is free: enter 0 at checkout and the file link arrives straight away. It also opens in Google Docs and LibreOffice.

Do not fill in every section because it is there. If the sponsor will not put a number on an objective, that blank cell is the most useful thing in the document. Take it to her before you write a single functional requirement.

---

*If this was useful, the publication covers the rest of the requirements craft the same way: plainly, with a point of view. Subscribe below for new pieces as they publish.*
