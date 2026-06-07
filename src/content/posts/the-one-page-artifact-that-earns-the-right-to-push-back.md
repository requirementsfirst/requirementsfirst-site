---
author: Arun Mehta
pubDatetime: 2026-06-07T10:18:43.000+05:30
title: "The one-page artifact that earns the right to push back"
slug: the-one-page-artifact-that-earns-the-right-to-push-back
featured: true
draft: false
tags:
  - business-analysis
  - stakeholder-management
  - craft
  - templates
description: "Most BA templates organise content. The one-pager that lets you push back on a senior stakeholder organises judgement. Here is the exact format, the order of sections, and the moves that make it land instead of feel adversarial."
---

The previous piece argued that pushing back on senior stakeholders only works when you bring a written artifact to the conversation, not a list of questions. This piece is about how to write that artifact.

This is not a template piece in the boring sense. Most BA templates fail because they organise information. The right artifact organises judgement — yours, the stakeholder's, and the team's — into a form that makes the disagreement legible without making it personal.

The format below is what I use. It is one page, five sections, written before the meeting, in language a senior person can read in two minutes.

## What the artifact is for

Three readers, in order of priority:

The senior stakeholder, who needs to see that you've taken their proposal seriously, identified one specific concern, and given them an exit if they want to override you.

The team that will execute the work, who needs to see the actual decision, the reasoning, and the constraints in one place rather than reconstructing it from three meetings.

Your future self, six months later, when the project either succeeded or didn't, and you need to remember what you knew at the time.

Every section in the artifact serves one of these three readers. If a section doesn't, cut it.

## The five sections

### Section 1: The proposal, in their words

One short paragraph stating what the stakeholder proposed, as faithfully as possible. Not your interpretation. Their actual ask. If they said "we need a customer health score dashboard," you write that, not "the stakeholder requested a tool to identify at-risk accounts."

Why: the stakeholder reads this first and recognises themselves. If they don't recognise their proposal in your phrasing, you've already lost them. Getting this section right is the cost of admission to the rest of the document.

A failure mode I see often: BAs sneak their interpretation into Section 1 by adding qualifiers or implications. "The stakeholder proposed a dashboard, presumably to address declining engagement" reads as helpful but signals that you've already framed the problem in your terms. Don't.

### Section 2: Who is affected and how we know

Two to four lines. Specific roles, specific evidence.

"Sales VP and 12 CSMs. VP wants weekly account-health view (mentioned in 28 May 1:1). CSMs already use individual spreadsheets pulling from same data sources. No customer-facing component."

Why: this is where the analysis actually starts. Naming specific people forces specific thinking. "Users" never gets analysed. "Sales VP and 12 CSMs" gets analysed.

The evidence half ("how we know") is what separates this from a guess. Without evidence, the section is just rephrasing assumptions. With evidence, it becomes the foundation for everything below.

### Section 3: What they are doing today and why it's broken

This is the section most BAs skip. They jump from "here's what they want" to "here's what we'll build." The middle question is the most important one.

Three to five lines. What is the current workflow? What does it produce? Where does it break? If you can't answer this in three to five lines, you don't understand the problem yet, and you should stop drafting and go ask.

"VP currently gets account health from Friday call with CSMs (~90 minutes/week). CSMs maintain individual spreadsheets and rough mental models. Friday call surfaces ~80% of at-risk accounts but lags by up to a week. Data quality varies by CSM."

This section quietly does the work of the entire artifact. Once you've described the current state honestly, the senior stakeholder often sees the proposal differently themselves.

### Section 4: What changes if we ship the proposal

The forecast. Two to four lines. What changes in the world if the team builds what's proposed?

"Friday call becomes shorter or stops. CSMs maintain dashboard data quality on top of existing work. At-risk identification lag drops from up to a week to near-real-time, IF dashboard data is accurate. VP's escalation behaviour does not automatically change."

The careful part is "IF." Most proposals depend on a load-bearing assumption. Identifying it makes the proposal evaluable. Hiding it makes the proposal sound stronger than it is.

This section is where your push-back lives, but it lives implicitly. You don't say "I disagree." You describe what will happen. If what will happen is bad, the senior stakeholder sees it themselves.

### Section 5: What we don't know and what we'd commit to

Two parts.

The first is the questions section. Three to five things we don't currently have answers to. List them by name, not in long form. "Whether the underlying NPS data is accurate enough to drive a health score. Whether CSMs will actually consult the dashboard or maintain spreadsheets in parallel. Whether the algorithm will reflect how an experienced CSM weights risk."

The second is the recommendation, including the exit. "Recommend a two-week investigation: shadow one CSM through a churn save, audit data quality, then decide. If audit fails, recommend fixing data first; if audit passes, proceed with scoping. Open to overriding if there is information I don't have."

That last sentence is the move. "Open to overriding if there is information I don't have" tells the senior stakeholder you have an opinion AND that you respect their authority. It is the difference between a one-pager that lands and one that gets ignored or escalates.

## What gets left out

Most templates have sections for things this one doesn't. Worth being explicit about what's missing and why.

No goals section. The proposal already implies the goal; restating it adds nothing.

No success criteria section. Success criteria belong in the eventual scope document, not in the decision artifact. Including them too early implies the decision is already made.

No risks section. Risks are scattered across sections 2-5 in context. Pulling them into a separate section makes them feel manageable, which is exactly the wrong feeling. They should sit inside the analysis where they belong.

No timeline section. Timelines are negotiated after the decision, not encoded into the analysis.

No appendix. If something doesn't fit on one page, it isn't ready to share. Documents grow appendices when the author is hedging.

## The rhetorical moves that make it land

Beyond the structure, three small writing moves change how the artifact reads.

**Match the stakeholder's vocabulary.** If they used "engagement," use engagement. If they used "stickiness," use stickiness. Don't translate their language into yours. Translation reads as superiority.

**Quantify the uncertainty.** "Likely" beats "might." "Two-week investigation" beats "some analysis." Vague language reads as hedging; specific language reads as having done the work.

**Show one concession.** Somewhere in the artifact, name a part of the stakeholder's proposal that is right or that you hadn't considered. "The instinct to systematise this is correct" or "the timing pressure is real." One concession signals that you've actually evaluated their idea, not dismissed it.

The artifact should read like the work of someone who has taken the stakeholder seriously, identified one specific weak point with evidence, and offered a reasonable way to learn whether that weak point matters. If it reads like a list of objections, it will not land. If it reads like a status update, it will not land either.

## What success looks like

The senior stakeholder reads the one-pager in two minutes, agrees with the recommendation about sixty percent of the time, asks one clarifying question about thirty percent of the time, and overrides about ten percent of the time. The override percentage matters less than the other two. What you are buying with the artifact is the right to be heard before the decision, not the guarantee of being agreed with.

Over time, the artifacts accumulate. The senior stakeholder remembers you as the BA who shows up with one-pagers that contain real analysis, not the BA who asks questions in meetings or quietly builds whatever was asked. Six months in, they start asking you for your read before they propose anything.

That is the actual goal. Not winning the one decision. Becoming the person whose read gets asked for.

---

*The next piece in this series looks at when the one-page artifact is the wrong tool — the cases where a longer-form analysis, a meeting, or just silence is the right move instead. Subscribe below to get it.*
