---
author: Arun Mehta
pubDatetime: 2026-05-25T09:00:00.000+05:30
title: The question most BAs forget to ask before opening Jira
slug: the-question-most-bas-forget-to-ask-before-opening-jira
featured: true
draft: false
tags:
  - requirements
  - business-analysis
  - product-discovery
description: Most requirements work starts with "what do they want?" That's the wrong first question. Here's the one that saves projects.
---

A product manager pings you. "We need to add bulk export to the reporting module. Can you write the stories by Thursday?"

What do most BAs do next? Open Jira. Start drafting. Maybe ping the PM with a clarifying question about file formats.

This is the moment the project quietly goes wrong.

The question you should ask first — before Jira, before stories, before acceptance criteria — is this:

**Why now?**

Not "what do they want." Not "who's the user." Those come later. The first question is why this request exists at this moment, and what changes if it doesn't ship.

## Why "why now" matters more than "what"

Every requirement arrives with a stated need and an unstated trigger. The stated need is usually clear: bulk export, SSO, dark mode, an extra filter. The trigger is what's actually driving the request — and it's almost never written in the ticket.

A few examples from the wild:

- "Add bulk export" — trigger was one large customer threatening to churn because their ops team was copy-pasting 200 rows a day. The real problem wasn't export. It was that the reporting UI didn't support their workflow at all.
- "We need SSO" — trigger was a procurement checkbox on a deal that was 80% closed. Six months of engineering work would have been replaced by a one-page security questionnaire.
- "Build a notification centre" — trigger was that the CEO got annoyed by a single missed email. The fix was a settings change, not a new module.

In every case, the stated requirement was buildable. In every case, building it would have been the wrong answer.

## The trigger tells you three things

When you understand why a request is happening now, you learn:

**One. The actual problem.** The trigger reveals the constraint or pain that's pushing this request forward. The stated requirement is one solution to that problem. There are usually others, and some are cheaper.

**Two. The deadline that's real.** Most "by end of quarter" deadlines are aspirational. Some are tied to a contract, a board meeting, a regulator, or a competitor launch. Those are real. Knowing the difference changes how you scope.

**Three. Who actually decides.** The person filing the request is rarely the person whose pain is driving it. Find the latter. They will give you better information in ten minutes than the requester will in three meetings.

## What asking "why now" looks like in practice

You don't actually walk up and say "why now." It sounds interrogative. Instead, ask the surrounding questions:

- "What's the situation that made this come up this week?"
- "What happens if we don't ship this in this cycle?"
- "Who's going to be unhappy if this slips, and what will they do?"
- "Has anyone tried to solve this before? What happened?"

The last one is underrated. Most non-trivial requests have a history. Someone has tried something. It either failed, got deprioritised, or worked partially. That history is your most useful artefact and nobody writes it down.

## A small case study

A PM asked me to spec a feature: "users should be able to assign tasks to multiple people." The story was easy to write. Acceptance criteria was easy. I could have closed the ticket in an afternoon.

Instead I asked who'd raised it. Turned out one large customer's ops manager had complained. I asked what she'd actually said. The PM forwarded the email. The email said: "we keep losing track of who's responsible when a task gets handed off."

That's not multi-assign. That's a handoff problem. Multi-assign would have made it worse — now nobody is responsible because everyone is.

What she actually needed was a clear single owner with a visible handoff history. We shipped that in a third of the time and the customer renewed.

If I'd opened Jira first, we'd have built the wrong thing on time.

## The discipline

The discipline is this: between the request arriving and you writing the first story, there is a gap. Most BAs close that gap as fast as possible because closing it feels productive. Resist that.

Spend twenty minutes — sometimes two hours — finding the trigger. Talk to the person whose pain is driving the request, not just the person who filed it. Write down what changes if this doesn't ship.

Then open Jira.

The stories you write afterwards will be shorter, sharper, and more likely to solve the actual problem. You'll also occasionally conclude that the request shouldn't be built at all. That conclusion is worth more than any story you could have written.

---

*If this resonated, the next piece in this series breaks down why "as a user, I want to..." is the worst thing that happened to user stories. Subscribe below to get it.*
