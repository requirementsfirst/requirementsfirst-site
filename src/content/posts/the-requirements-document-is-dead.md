---
author: Arun Mehta
pubDatetime: 2026-06-01T17:44:55.000+05:30
title: The requirements document is dead. Long live the requirements document.
slug: the-requirements-document-is-dead
featured: true
draft: false
tags:
  - requirements
  - documentation
  - business-analysis
  - craft
description: "The death of the BRD has been declared a hundred times. Agile killed it. Jira killed it. AI is about to kill it again. The truth is that documents didn't die. BAs stopped writing good ones, then blamed the format."
---

A senior BA at a fintech told me recently that her team has stopped writing requirements documents. They use Jira tickets and Slack threads. The team velocity is great. The product, she added quietly, has been shipping the wrong things for nine months.

She wasn't sure if the two were connected. They are. They almost always are.

The death of the requirements document has been declared roughly every five years since 2005. Agile killed it. Then Scrum killed it. Then Jira killed it. Then design tools like Figma killed it. Now AI is killing it again — why write a document when Claude can generate one in thirty seconds? Each declaration of death came with the same logic: documents are heavy, nobody reads them, they go out of date, they don't ship code.

The logic isn't wrong. It's incomplete. Heavy unread documents are bad. But the alternative most teams adopted isn't lightweight thinking captured in lightweight artifacts. It's no thinking captured in artifacts that have no context. That's not progress.

## What documents were for, when they worked

Before deciding documents are dead, it's worth being honest about what the good ones actually did.

A real requirements document was never primarily a record. It was a forcing function. The act of writing it forced you to:

- Decide who was actually affected by the problem
- Articulate what they were doing today and why it didn't work
- State the outcome you expected if the change shipped
- Name the assumptions you were making
- Identify the questions you didn't have answers to

The artifact had value, but the writing was the work. You couldn't write a good requirements section without doing the thinking it required. The document was the evidence that the thinking had happened.

The bad documents — the ones the death-of-the-BRD essays always picture — skipped the thinking and went straight to the artifact. Two hundred pages of process flows, glossaries, and stakeholder lists, with no actual decisions inside. Those documents deserved to die. They were thinking-shaped objects with no thinking in them.

What got killed was the writing-as-forcing-function ritual. The artifact was abandoned, but so was the thinking the artifact had structured.

## The artifact is fine. The discipline is what slipped.

Here's the part most "death of the BRD" essays get wrong. The modern formats that replaced BRDs are not the problem. A well-written Jira epic is a requirements document. A feature canvas is a requirements document. A Notion product brief is a requirements document. A one-pager in Google Docs is a requirements document. The container is incidental.

What matters is whether the artifact, in whatever format, contains the actual thinking. The same five things the old BRDs forced — who, what's broken, what changes, what we don't know, what we're committing to — can be captured in a feature canvas, a Jira epic description, a Notion page, or four well-written paragraphs. The form factor doesn't determine quality. The discipline of the writer does.

The problem isn't that teams moved from BRDs to Jira and lost something. The problem is that many teams moved from BRDs to a two-line Jira title with three bullets of acceptance criteria, which is not the same as moving to a properly-written epic. The format got blamed for what was actually a discipline collapse.

The teams that ship the right things consistently still write a real thinking artifact for every non-trivial feature. They just don't call it a BRD. They might call it a feature canvas, a one-pager, an epic, a brief. The container varies. What's in it doesn't.

## What replaced documents — and where the failure modes hide

Here's where the discipline tends to leak across the popular replacements:

**Underwritten Jira tickets and epics.** A two-line title and three bullets of acceptance criteria is not a requirements artifact. It's a delivery handoff. It assumes the thinking happened in the epic description, the linked feature canvas, or the brief somewhere upstream. When teams move to "tickets only" without that upstream artifact, they've not gone lean — they've gone empty. A properly-written epic with a real description containing the five things above is fine; a title-only ticket is not.

**Slack threads as the source of truth.** The conversation is real, but it has no structure and no permanence. By Tuesday next week, the rationale is buried under twenty unrelated messages. The team can no longer reconstruct why they made the choice. They argue about it again, often deciding differently. Slack is a great place for the conversation. It's a terrible place for the decision.

**Figma comments as requirements capture.** Useful for design specifics. Catastrophic as a primary requirements artifact, because design assumes the problem is already defined. You can't comment your way to a problem definition.

**AI-generated documents.** New entrant. The same problem as the underwritten epic, accelerated. AI will produce a beautifully formatted requirements document in thirty seconds. It will not produce the thinking that gives the document value. A BA who hands Claude a vague stakeholder request and ships the formatted output is not doing requirements analysis. They are laundering ambiguity into authority.

The common thread across these failure modes: the artifact looks like a requirement, but the thinking that gives it value was never done. The container changed; the discipline didn't follow it.

## The pattern in teams that still work well

I've worked with three teams in the last eighteen months that ship the right things consistently. None of them write old-style BRDs. All of them still produce a thinking artifact for every non-trivial feature.

The artifact is short. Usually two to four pages or equivalent. One team uses feature canvases in Miro. Another uses structured Jira epics with rich descriptions. The third uses Notion one-pagers linked from epics. The format doesn't matter. What's in it does.

What's in it, every time:

**Who's affected and how we know.** Not "users" — specifically which segment, role, or persona. With evidence: support tickets, sales objections, observed behaviour, NPS comments. If the team can't name the evidence, the requirement isn't validated yet, and the artifact says so explicitly.

**What they're doing today and why it's broken.** The workaround. Every requirement has one. If the team can't describe it, they don't understand the problem yet.

**What changes if we ship.** Not what changes in the product. What changes in the world. If the team can't name a behaviour change, the requirement is decorative.

**What we don't know.** A questions section, listed explicitly. The BAs and PMs I respect most are the ones who put their unknowns on the page where the engineering team can see them. Pretending you have answers you don't have is worse than admitting you don't.

**The decision and its expiry.** What is being committed to, and what conditions would cause us to revisit it. Most decisions are reversible; treating them as permanent creates the bureaucratic instinct that killed old-style BRDs.

That's the artifact. Two to four pages or equivalent. Generally written by the BA or PM, reviewed by engineering and product, kept in one place per feature. Not a 200-page tome. Not a title-only ticket. A real thinking document, in whatever container the team uses.

Teams that produce this artifact, in some form, consistently ship better features than teams that don't. The format is incidental. The discipline is everything.

## Why this matters more now

The reason this question is urgent in 2026 and wasn't urgent in 2016 is AI.

The death of the document used to mean: BAs stopped writing the thinking down, but they often still did the thinking. The artifact was lost; the work mostly survived in their heads. Output quality declined but didn't collapse.

In 2026 a BA who skips the thinking can produce artifacts that look identical to BAs who did the thinking. Claude can generate a requirements document, a feature canvas, or an epic description from a stakeholder transcript in thirty seconds. It will have all the headings. It will read smoothly. It will be impossible to tell from the output whether anyone interrogated the problem before writing.

This is going to bifurcate the field. The BAs who use AI to accelerate the documentation of their actual thinking will get more valuable, because the friction tax of writing was always heavier than the thinking tax. They can think more, write the artifact in one-fifth the time, and ship better requirements.

The BAs who use AI to replace the thinking — handing it the stakeholder request and shipping the generated output — will accelerate their own commoditisation. The features will ship wrong, the metrics won't move, and within two years someone will start asking why this team is so much worse than the team next to them.

The requirements artifact never died. The writing of it as a forcing function for thinking is what's at risk. The teams that preserve the forcing function, in whatever format, are the ones that will be working in five years.

## What to do this week

If you're a BA or PM reading this and your team has drifted into title-only tickets or Slack-only requirements, you don't need to introduce a heavy template. You need to introduce one rule.

Before any non-trivial feature enters the backlog, the person proposing it writes a one-page artifact answering five questions: who's affected, what they're doing today, what changes if we ship, what we don't know, and what we're committing to. The container can be whatever your team uses — a feature canvas, an epic description, a Notion page, a Google Doc. The five questions cannot be skipped.

You will get pushback. People will tell you this slows things down. It does, by a few hours, in exchange for not shipping the wrong feature for nine months.

The teams that adopt this rule notice within a quarter that they're arguing less, reworking less, and shipping features that actually move the metrics they care about. The teams that don't notice nothing, because the cost of bad requirements doesn't have an invoice. It just shows up in retention, support volume, and the slow shrinkage of the team's credibility with whoever pays for the work.

The requirements document is dead. The thinking it was supposed to enforce is what we need to bring back, in whatever artifact serves the team's actual workflow.

---

*This is the tenth piece in the RequirementsFirst series. The next runs through the specific five-question template above, with worked examples from real BA work. Subscribe below to get it.*
