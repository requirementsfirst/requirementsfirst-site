---
author: Arun Mehta
pubDatetime: 2026-06-11T11:21:40.000+05:30
title: "The AI-assisted requirements workflow that actually works"
slug: the-ai-assisted-requirements-workflow-that-actually-works
featured: true
draft: false
tags:
  - business-analysis
  - ai
  - workflow
  - craft
description: "Using AI for requirements gathering: the workflow that works. Most AI requirements work just generates acceptance criteria faster, producing faster bad requirements. Three stages."
---

I've watched BAs adopt AI tools over the last two years and noticed a pattern. The ones who use AI as a faster acceptance-criteria generator produce faster bad requirements. The ones who use AI as a thinking partner before they touch the AC produce something interesting. Same tools, opposite outcomes.

This piece is the workflow that produces the second outcome. It is not theoretical. It is what the BAs I respect actually do when they sit down with a new stakeholder request and an open Claude or ChatGPT window.

Three stages, in order. Each stage has a clear thing AI is good at and a clear thing it is not.

## Stage 1: Stakeholder interrogation, with AI as opposition

The first hour after a stakeholder request lands is the highest-leverage time in the entire requirements process. It is also the time most BAs skip, because the request "feels clear" and the temptation is to start scoping.

The AI's job in this stage is to be opposition. You paste the request verbatim and ask: "Read this request as a hostile reviewer. What is unstated. What contradiction is hiding. What assumption is the stakeholder making that they have not named."

The model will produce a list. Most items on the list will be wrong or trivial. But two or three items will be real. Those are the questions you bring to the stakeholder before scoping.

This is high-leverage because the alternative — the BA generating the same questions by themselves — depends on the BA being well-rested, focused, and not pattern-matching to a similar request from last month. The AI has no such limitations. It interrogates the same way every time, which is exactly what you want from opposition.

What AI is bad at in this stage: it cannot tell you which of the two or three real questions actually matters in this organisation, with this stakeholder, this quarter. That judgement is yours.

The artifact from stage 1 is a short list of three to five questions to take to the stakeholder. Not the requirements document. The questions.

## Stage 2: Stakeholder conversation, with AI removed entirely

This is the stage where AI causes the most damage in the workflows I have seen.

The temptation is to bring the AI into the stakeholder conversation. Record the meeting, paste the transcript into the model, ask for a summary. Or worse, have the model draft requirements in real time as the stakeholder talks.

This destroys the conversation. The stakeholder feels surveilled, even when they have consented. The BA stops listening because they are reading model output. The questions that emerge from the conversation become AI-shaped rather than human-shaped, which means they pattern-match to what the model has seen before, which means they miss the parts of the situation that are unique to this organisation.

The fix is brutal. AI does not come into the room. The BA takes notes, asks the questions from stage 1, listens to the answers, asks follow-up questions based on what they hear, ends the meeting with a clear set of notes and an unclear set of impressions.

The impressions are the valuable part. The notes can be reconstructed from any meeting. The impressions can only be captured by a present human.

What you have after stage 2: handwritten or typed notes, a list of decisions the stakeholder made or deferred, and your own impressions about what the stakeholder is not yet ready to say.

## Stage 3: Synthesis, with AI as fast first draft

This is where most BAs start using AI. It is the stage where AI is most useful and least dangerous, because the thinking has already happened.

Paste your notes into the model. Ask it to produce a structured draft: problem statement, scope, acceptance criteria, open questions. The model will produce something usable in two minutes that would have taken you forty.

Then comes the actual work of the synthesis stage. You read the draft and ask yourself, for every line: do I believe this. Where the draft is correct, you leave it. Where the draft is wrong, you change it. Where the draft is missing something important, you add it.

The draft is not the requirements document. The draft is the scaffold against which you do the requirements work.

Most BAs stop at the draft. They polish the language, fix the formatting, and ship. That is the failure mode that produces faster bad requirements. The discipline is to treat the draft as an opinionated proposal you are evaluating, not a finished artifact you are editing.

What AI is bad at in stage 3: it cannot tell you which of the acceptance criteria will fail when production traffic hits the feature. It cannot tell you which stakeholder will object to the language and why. It cannot tell you whether the timeline implied in the doc is realistic for this team. Those are your judgement calls.

## The three things to never delegate

Across all three stages, there are three things AI should never be asked to do. Each comes from a real failure mode I have watched repeatedly.

**Never delegate the decision about whether the requirement should exist at all.** AI cannot reach this question because it does not have access to the organisational politics, the prior attempts that failed, or the strategic tradeoffs. It will always produce a draft that assumes the requirement is valid. Your job is to question whether it is.

**Never delegate the read on the stakeholder.** When the stakeholder said "we need this by Friday," they were communicating something underneath the words. Maybe pressure from above. Maybe political signalling. Maybe genuine urgency. AI cannot read that signal. You must, or the requirement you produce will be technically correct and politically wrong.

**Never delegate the language of pushback.** When a requirement looks wrong and you need to push back to the stakeholder, the words matter at a level of specificity AI cannot match. The wrong phrasing in a pushback creates an enemy. The right phrasing creates an ally. AI-drafted pushback language tends toward generic professional politeness, which lands as either condescending or evasive. Write your own.

## What this workflow costs

This workflow is slower than the "paste request into AI, get AC, ship" version by about an hour per requirement. It is faster than the no-AI version by about three hours per requirement. The net is two hours saved, plus a requirement that is roughly twice as likely to survive production contact with reality.

The two hours are not the point. The point is that the BA who runs this workflow develops calibrated taste over the course of a year. They start to see, in stage 1, which questions the model will surface and which it will miss. They start to develop a feel for when stage 2 is going well and when the stakeholder is performing for the room. They start to recognise, in stage 3, which kinds of acceptance criteria the model gets right and which it consistently gets wrong.

The calibration is the asset. The faster requirements are a side effect.

## The framing that matters

AI is a power tool. Power tools make skilled craftspeople more productive and unskilled craftspeople more dangerous. The same drill that lets a carpenter assemble a cabinet in an hour lets an unskilled user split the wood and drive screws at the wrong angle in the same hour.

Requirements work has the same dynamic. The BAs who already had strong instincts before AI now have those instincts compounded by tools that handle the mechanical work. The BAs who never developed the instincts now produce more bad requirements faster, which their organisations interpret as productivity until the project fails.

The workflow above is the difference. Use AI where it has leverage. Stay out of where it doesn't. Build the calibration that lets you tell the difference, because in five years that calibration will be the only thing in the job that is still scarce.

---

*The next piece returns to the artifact-rhythm series, looking at why team-level writing cultures collapse even when individual writing habits work. Subscribe below to get it.*
