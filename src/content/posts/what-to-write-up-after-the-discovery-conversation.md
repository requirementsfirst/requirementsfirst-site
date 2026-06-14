---
author: Arun Mehta
pubDatetime: 2026-06-14T07:49:44.000+05:30
title: "What to write up after the discovery conversation"
slug: what-to-write-up-after-the-discovery-conversation
featured: true
draft: false
tags:
  - business-analysis
  - discovery
  - documentation
  - craft
description: "The discovery write-up is where most of the value from a good conversation leaks away. Too detailed and nobody reads it; too thin and it captures nothing. The format that survives, and the three things you should never write down."
---

The previous piece covered how to run a stakeholder discovery conversation. This one is about the hour after it, which is where most of the value leaks away.

A good discovery conversation produces two things: a set of notes, and a set of impressions. The notes are easy to write up and largely worthless. The impressions are hard to write up and contain almost everything that mattered. Most BAs write up the notes, discard the impressions, and wonder six weeks later why the requirements feel hollow.

This piece is about capturing both, in a format that someone will actually read, and knowing the three things that should never go in writing at all.

## Why the standard write-up fails

The standard discovery write-up is a transcript with structure. The BA opens their notes, organises them under headings, cleans up the grammar, and circulates a document. It is thorough, accurate, and almost useless.

It fails for one reason: it captures what was said and loses what was meant. The stakeholder said the support team is overwhelmed. The transcript records that. What the transcript loses is the BA's impression, formed in the room, that the stakeholder was describing their own overwhelm and projecting it onto the team. That impression is the actual finding. The transcript buried it under a faithful record of the words.

A write-up that captures words and loses meaning produces requirements that are technically traceable to the conversation and substantively disconnected from the problem.

## The format that survives

The discovery write-up that works has four parts, in this order. The order matters because it front-loads judgement and back-loads record.

**Part one: the one-line finding.** Before anything else, one sentence stating what you actually learned. Not what was discussed. What you now believe that you did not believe before the conversation. "The dashboard request is really a request for the Friday meeting to produce decisions it currently doesn't." If you cannot write this sentence, the conversation either failed or you have not finished thinking about it. Do not proceed to the rest of the write-up until you can.

**Part two: the three things I now believe.** Three to five short statements of what you take to be true after the conversation, each with a confidence marker. "High confidence: the data pipeline feeding the proposed health score is unreliable. Medium confidence: the CSMs will not adopt a dashboard that adds work. Low confidence but worth flagging: the real sponsor of this request is the VP's manager, not the VP." These are the load-bearing content of the write-up. Everything else supports them.

**Part three: the open questions.** What you still do not know, framed as questions you will need answered before scoping. Not vague areas of uncertainty. Specific questions. "Does the NPS data refresh daily or weekly. Who decided the Friday call wasn't working. What happens to the CSM spreadsheets if the dashboard ships."

**Part four: the record.** Now, and only now, the notes. The factual record of what was said, organised under headings, for anyone who needs to reconstruct the conversation. This part is reference material. It goes last because almost nobody needs it, and putting it first buries the parts that matter.

Most BAs invert this. They lead with the record and bury the findings, if they capture the findings at all. The inversion is the whole problem.

## How detailed the record should be

The record section tempts BAs toward completeness. Resist it. The test for the record is not "did I capture everything" but "could someone who wasn't there reconstruct the decisions and the reasoning." Decisions and reasoning, not every sentence.

A useful heuristic: the record should be about a third the length of your raw notes. If it is the same length as your notes, you are transcribing, not synthesising. The act of cutting two thirds is the act of deciding what mattered, which is analytical work, not administrative work.

## The three things you never write down

This is the part no BA training covers, and it is the part that separates BAs who get trusted with sensitive work from those who do not.

**One: never write down your read on a person's competence or motives.** If you formed the impression that a stakeholder is out of their depth, or is protecting their territory, or is lying to themselves, that impression is real and useful and must never appear in a document. Documents circulate. Documents get forwarded. Documents get subpoenaed. The moment your private read on a person exists in writing, it is a liability to you and a weapon against them. Hold those reads in your head, act on them, and never type them.

**Two: never write down a conclusion you have not yet earned the right to state.** Early in a discovery cycle you will form strong hypotheses. Writing them as conclusions, before you have the evidence, creates a record that you committed to a position prematurely. When the position turns out wrong, the record shows you jumped. Keep premature conclusions as private hypotheses until the evidence catches up.

**Three: never write down anything that assumes a decision the stakeholder has not made.** If the stakeholder is still deciding whether to fund the project, a write-up that describes scope and acceptance criteria assumes the funding decision. That assumption, in writing, can box the stakeholder into a commitment they had not made, which they will resent. Write what was discussed, not what you are hoping they will decide.

## Why the impressions matter more than the notes

Return to the distinction from the start. Notes are reconstructable. If you lose your notes, you can email the stakeholder and rebuild them. Impressions are not reconstructable. The impression you formed in the room, watching the stakeholder's face when they described the support team, cannot be recovered later. It exists only in the hours after the conversation, and it fades fast.

This is why the write-up has to happen within a day, ideally within hours. Not because the notes will be lost, but because the impressions will. The BA who writes up the notes a week later, when they have time, has a faithful record of words and a blank where the meaning used to be.

The discipline is to write the one-line finding and the three things I now believe while they are still warm, even if the record section waits. The findings are perishable. The record is not.

## What this produces over time

A BA who writes up discovery this way accumulates something valuable: a file of findings, each with a confidence marker, each dated. Six months in, they can look back and see which of their high-confidence reads were right and which were wrong. That is calibration data, and it is the same calibration data the weekly artifact rhythm produces, arriving through a different door.

The BA who writes up only the record accumulates a filing cabinet of transcripts that nobody reads, including them. The two BAs did the same conversations. Only one of them got smarter.

---

*The next piece steps back from individual technique to the question underneath this whole series: what separates the BAs who compound their judgement over years from the ones who plateau, doing competent work that never quite advances. Subscribe below to get it.*
