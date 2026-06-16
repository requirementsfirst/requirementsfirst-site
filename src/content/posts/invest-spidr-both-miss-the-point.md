---
author: Arun Mehta
pubDatetime: 2026-05-27T08:47:37.000+05:30
title: INVEST and SPIDR both miss the point
slug: invest-spidr-both-miss-the-point
featured: true
draft: false
tags:
  - user-stories
  - frameworks
  - business-analysis
  - requirements
description: "INVEST vs SPIDR for user stories, and why both miss the point. They tell you whether a story is well-formed, not whether it is worth building. The structural flaw both share."
---

Every BA has been in the conversation. Someone asks how to write better user stories. Someone else mentions INVEST. A more recently-trained colleague says SPIDR is better. The conversation becomes a debate about which acronym wins, which gets quoted in more certification courses, which fits Agile better.

The debate is a waste of time. Not because the frameworks are bad — they're both fine for what they do. The debate is a waste because both frameworks share a structural blind spot, and arguing about which one is sharper doesn't fix the blind spot.

This piece is about what the blind spot is and what to do about it.

## What each framework actually does

Briefly, since most readers will know these already.

**INVEST** comes from Bill Wake, around 2003. A user story should be:
- Independent (no dependencies on other stories)
- Negotiable (the details can be discussed, not fixed)
- Valuable (delivers value to someone)
- Estimable (the team can size it)
- Small (fits in a sprint)
- Testable (you can verify it works)

**SPIDR** is more recent, popularised by Mike Cohn as a way to split stories that are too big. Split by:
- Spike (do a research story first)
- Path (split by user journey)
- Interface (split by UI vs API vs admin)
- Data (split by data types or volumes)
- Rules (split by business rules)

Different scopes. INVEST evaluates whether a story is well-formed. SPIDR helps you decompose a story that's too large. They're not really competitors. They're complementary tools that get pitted against each other in training courses because both are about stories and both have memorable acronyms.

But here's the thing. Both frameworks operate on the assumption that the story should exist in the first place.

## The blind spot

INVEST tells you whether a story is Independent, Negotiable, Valuable, Estimable, Small, and Testable. It does not tell you whether the *thing the story is asking the team to build* is the right thing.

Consider the worst kind of backlog you've worked on. The stories are technically excellent — INVEST-compliant, well-decomposed via SPIDR. Each one is testable. Each one is small. Each one names a clear user and a clear benefit. The team executes them efficiently. Six months later the feature shipped doesn't solve the actual problem and the metric the product manager cared about hasn't moved.

The framework didn't fail. The framework did exactly what it was designed to do. It validated that the stories were well-formed. It had no way to tell you that the stories were aimed at the wrong target.

INVEST's "V" — Valuable — gestures at this but doesn't enforce it. "As a user, I want to export reports as PDFs, so that I can share them" is INVEST-compliant. It has a user, an action, a benefit. It splits well via SPIDR (split by report type, split by user role, split by delivery channel). What it doesn't have is any way to ask: does anyone actually need this? Is this the right solution to a real problem? If we don't build it, what breaks?

The framework can't ask those questions because it operates one layer too low. It evaluates story craft, not requirement validity.

## Why this matters more than the choice between the two

Here's a real situation I've watched play out. A team adopted SPIDR specifically to fix their large-story problem. They got better at decomposing. Their stories shrank from two-week monsters to two-day chunks. Velocity went up. The team felt great about itself.

The product they were shipping was still wrong. Customer complaints didn't drop. The metric they were trying to move stayed flat. The team had become very good at building the wrong things efficiently. SPIDR didn't cause this — SPIDR did its job — but SPIDR also didn't surface it.

A second team I worked with used INVEST religiously. Every story passed the six checks. Reviews of their backlog were textbook. The engineering team rarely had clarifying questions because the stories were so well-formed. After two quarters, the product roadmap stalled because the features being shipped weren't producing user behaviour changes the leadership had expected. Eventually the team disbanded.

In both cases the frameworks worked perfectly. The teams executed against well-formed stories. The stories were aimed at the wrong problems, and no story-quality framework can tell you that.

## What you actually need before reaching for either framework

Before you ask "is this story INVEST-compliant" or "should I split this with SPIDR", you need to be able to answer four questions about the requirement the story represents:

**One. Who specifically is affected by this not existing today, and how do you know?** Not "users". Specifically which user, segment, or role, and what evidence (support tickets, sales objections, NPS comments, observed behaviour) tells you they're affected.

**Two. What are they doing today instead, and why doesn't that work?** Every requirement has a workaround that exists right now. If you can't name what the workaround is, you don't understand the problem yet.

**Three. What changes in their behaviour if we ship this?** Not what changes in the product. What changes in the world. If a successful ship looks identical to today, the requirement is decorative.

**Four. What happens if we don't ship this in this sprint or quarter?** The honest answer here is usually "nothing immediate". Which means the urgency is confected and you can scope it properly. The rare answer is "a real consequence", which tells you the actual deadline.

If you can answer all four, INVEST and SPIDR become genuinely useful tools. You can craft a well-formed story aimed at a validated requirement. The frameworks then do exactly what they're good at.

If you can't answer the four, no amount of INVEST or SPIDR will save the work. You'll just write well-formed stories about things that don't matter.

## The reframe

INVEST and SPIDR are framework for story craft. Story craft is the last 10% of the BA job. The first 90% is figuring out what to write a story about and whether it's worth writing.

Most BA training spends nearly all its time on the last 10% because it's easier to teach. Acronyms are teachable. Memorisable. Testable on a multiple-choice exam. The first 90% — interrogating requirements, understanding triggers, validating who actually cares — is harder to teach because it's judgement, not a checklist.

The result is BAs who can write beautiful stories that ship the wrong thing. They check every box in their training. The product still misses.

If you're going to argue about INVEST and SPIDR, argue about something more useful. Argue about how to decide which requirements deserve stories in the first place. Argue about how to push back when a stakeholder hands you a feature request without context. Argue about what to do when the engineering team builds exactly what you asked for and it still fails.

INVEST and SPIDR will be there when you need them. They'll do their job well. They are not the work.

---

*The next piece in this series breaks down the difference between BA, PO, and PM that nobody writes about honestly. Subscribe below to get it.*
