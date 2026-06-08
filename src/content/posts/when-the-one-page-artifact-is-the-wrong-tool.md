---
author: Arun Mehta
pubDatetime: 2026-06-08T14:55:06.000+05:30
title: "When the one-page artifact is the wrong tool"
slug: when-the-one-page-artifact-is-the-wrong-tool
featured: true
draft: false
tags:
  - business-analysis
  - stakeholder-management
  - craft
  - judgement
description: "The one-page push-back artifact is a tool. Like every tool, it has cases where it makes things worse. Three situations where reaching for it signals you have misread the room, and what to do instead."
---

The previous piece argued for a one-page artifact as the format that earns a BA the right to push back on senior stakeholders. The format works in most situations. It does not work in all of them.

This piece is about the situations where reaching for the one-pager is itself the mistake. Three cases, each with a different fix.

I am writing this because I have seen BAs become so attached to their artifact that they bring it to every conversation, and watched the artifact actively damage decisions it was supposed to support. The tool is good. The instinct that the tool is always the right tool is bad. Knowing the difference is the craft.

## Case 1: when the decision is fully reversible and cheap

Some decisions do not deserve an artifact because they do not deserve the consideration the artifact implies. A senior stakeholder says "let's add an export-to-CSV button on this report." If the cost is small, the value is plausible, and removing it later is easy, writing a one-pager is overengineering.

The one-pager carries an implicit signal: "this decision needs analysis." Bringing it to a trivial decision tells the stakeholder two unhelpful things — that you have free time to analyse small things, and that you cannot tell the difference between consequential and inconsequential calls. Both are credibility leaks.

What to do instead: ship the small thing. If it turns out to matter more than it looked, write the artifact then, retroactively, when the decision is going to be revised. Most of the time, you'll find the decision was indeed small and never needed the artifact at all.

The test: if reversing the decision would take less than a day of work, the artifact is probably the wrong tool. Just build it and move on.

## Case 2: when the stakeholder is asking for emotional alignment, not analysis

This case is harder. A senior stakeholder is under pressure — a board meeting in a week, a quarterly review, an investor call. They walk in and say "we need this feature shipped by Friday." On the surface this is a requirement; underneath it's often a request for visible action that will reduce their own anxiety.

If you bring a one-pager that says "Section 4: what changes if we ship the proposal — likely we will hit the deadline but introduce three known defects we cannot mitigate in time," you are correct on the analysis and wrong on the read. The stakeholder is not asking whether shipping by Friday is wise. They are asking you to help them feel like they have a plan to bring to the board.

What to do instead: a different kind of artifact. Not the analytical one. A status-and-confidence artifact. Something that says, in plain language, "Here is what we will deliver by Friday. Here is what is at risk. Here is what we will do about the risks. The team is on it." This is not push-back. It is acknowledgement of what the stakeholder actually needs from you in that moment.

Push-back can come later, in a calmer conversation, about why we keep hitting these deadlines and what would change the pattern. Bringing it in the moment of pressure makes you look like you're missing the point. Which, in fact, you are.

The signal you are in case 2: the stakeholder's tone is more urgent than the proposal warrants. Their language has more emotional weight than analytical content. They are looking for "yes, we are on it," not "here are five questions to interrogate the brief."

## Case 3: when the relationship is not yet built

The one-page artifact assumes a working professional relationship. It assumes the senior stakeholder has agreed, implicitly or explicitly, that your input is something they want. When that assumption holds, the artifact is a gift. When it doesn't, the same artifact reads as presumptuous.

If you have been at a company three weeks and your CTO walks in with a directive, handing them a one-pager arguing against their approach is not pushing back with rigour. It is announcing that you have opinions before anyone asked. The CTO does not yet know whether your opinions are calibrated, biased, or noise. The artifact lands as evidence of overconfidence, regardless of the quality of analysis inside it.

What to do instead: ask one question. Not the five questions. One. "Before I scope this, can I ask one thing — what's the trigger that's making this important now?" This is the smallest possible version of the analysis, deployed verbally, in real time, as a question rather than a document. It signals that you think before you build, without signalling that you think you should be deciding.

Over the next few weeks and months, the answers to these single questions become the foundation for trust. Then, six months in, when you finally bring a one-pager to a real disagreement, the senior person reads it differently — not as a new analyst trying to assert themselves, but as someone they have come to expect calibrated thinking from.

The signal you are in case 3: you do not yet know the senior stakeholder's name without checking, or they don't know yours. The org chart distance between you matters less than the relationship distance.

## What these cases have in common

In all three, the artifact is a structurally good tool that has been deployed in the wrong context. The diagnostic question is not "is this an important decision" — most decisions look important from the inside. The diagnostic question is: what is the senior stakeholder actually asking me for in this moment?

There are at least four answers, and only one of them calls for the one-pager:

If they are asking for execution on a small reversible decision: just execute.

If they are asking for emotional alignment under pressure: give them confidence and a plan, not analysis.

If they are asking to test whether you are calibrated yet: ask one clarifying question and watch what happens.

If they are asking for a real decision on something consequential, and they have indicated they want your input: bring the one-pager.

The mistake most BAs make is conflating these. Every situation looks, from inside the BA's head, like the fourth one. The craft is being able to tell, from the outside, which case you're actually in.

## The wider point

Templates are useful because they encode lessons learned. They become dangerous when the BA stops checking whether the lessons still apply. A one-page artifact that worked beautifully in your last role might be the exactly wrong tool with a different stakeholder in a different culture in a different week.

The most senior BAs I respect carry their templates lightly. They have the artifact in their head, ready to deploy when the situation calls for it. They also have, in their head, the three cases above, and the ability to recognise the moment when reaching for the template would be a mistake.

You earn that judgement the same way you earn everything else worth earning in this job: by deploying the tool, watching how it landed, paying attention to the feedback even when it was uncomfortable, and adjusting the tool's deployment over years.

The artifact is a tool. The judgement of when to use it is the craft. Don't mistake one for the other.

---

*The next piece in this series moves from the individual artifact to the rhythm: how the BAs who advance build a system of weekly written artifacts that compound credibility over a quarter, not a single meeting. Subscribe below to get it.*
