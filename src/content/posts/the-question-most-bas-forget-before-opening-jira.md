---
title: "The question most BAs forget to ask before opening Jira"
author: Arun Mehta
pubDatetime: 2026-05-23T11:30:00+05:30
description: "There's one question that separates BAs whose features land from BAs whose features get rebuilt three sprints later. It is not a question about acceptance criteria, edge cases, or NFRs. It is two words long. Most BAs skip it entirely."
featured: false
draft: false
tags:
  - analytical-work
  - requirements
  - ba-craft
---

There's one question that separates BAs whose features land from BAs whose features get rebuilt three sprints later. It is not a question about acceptance criteria, edge cases, or NFRs. It is two words long. Most BAs skip it entirely.

The question is: why now?

Two words. Genuinely. And almost nobody asks it.

Watch what happens in a typical refinement session. A stakeholder says something like, "We need a dashboard for the operations team to see daily order volumes." The BA nods, writes it down, and moves into clarification mode. Which metrics? What time ranges? Do we need filters? What about exports? Who else needs access? Twenty minutes later there is a half-page of requirements, the engineering lead is mentally sizing it, and everyone feels productive.

Nobody has asked why this request landed today and not six months ago.

That feels like a small omission. It is not. It is the omission that decides whether the feature you build is the feature that solves the problem.

## What "Why now?" actually surfaces

Requests do not appear from nowhere. They have a trigger. A request that lands on your desk on a Tuesday morning was caused by something that happened on Monday, or last week, or in the last board meeting. Find the trigger and you have found the actual problem. Skip the trigger and you are guessing.

The trigger is usually one of a small number of things:

A **complaint pattern**. Three customers in two weeks asked the same question and support is tired of typing the same answer. The trigger is operational load, not "users want this feature."

A **metric moved the wrong way**. Conversion dropped two percentage points last quarter, or activation is down, or churn ticked up among a segment that used to be sticky. The trigger is a number on a slide somewhere, and the request you got is somebody's hypothesis about what fixes that number. Sometimes the hypothesis is right. Often it isn't.

A **regulatory or compliance change**. A new rule is coming into force, an auditor flagged something, legal asked a question nobody had a good answer to. The trigger is external and the deadline is real, but the framing is often distorted by whoever wrote the internal summary.

A **competitor move**. Someone in the leadership team saw a launch announcement and the request is "we should have this too." The trigger is anxiety, not user need. The feature may or may not actually be worth building.

A **board meeting or leadership review**. A senior person got asked a question they could not answer well, and the request is the artefact of that uncomfortable moment. This is one of the most common triggers and one of the least discussed.

Each of these triggers reframes the problem in a different direction. A complaint-pattern trigger usually wants efficiency, not features. A metric-moved trigger wants a hypothesis tested cheaply before a big build. A regulatory trigger has hard constraints and soft ones, and the difference matters. A competitor trigger may not be worth building at all. A board-meeting trigger often does not need software.

If you do not know which trigger you are dealing with, you cannot tell whether the requested feature is the right response.

## A worked example

A few years ago I sat in a refinement session where a product lead asked for a "real-time dashboard" showing order processing status. The team scoped it out. Backend would build an event pipeline. Frontend would build a live-updating view with filters and drilldowns. Initial sizing was something like six sprints across two squads. Material work.

In the middle of the discussion someone — to be fair, not me — asked: "What prompted this? Why are we doing this now?"

The product lead paused, then said: the head of operations had been asked in last week's leadership review why a particular order had been delayed, and she had not had the answer. She had spent the next forty minutes pulling the answer together from three different tools. The CEO had been annoyed. She did not want that to happen again.

The "real-time dashboard" was not a real-time dashboard. It was a defensive mechanism. The problem was not "the operations team cannot see order status." The problem was "one specific senior person needs to be able to answer one specific kind of question, quickly, when it gets asked." The user was a single named human. The use case was an upward escalation. The frequency was rare but high-stakes.

What that team ended up building was a weekly email to the head of operations with the top ten flagged orders by status, plus a simple search page she could pull up in a meeting. Two weeks of work, not six sprints. The CEO never asked the question again, partly because she could now answer it without effort, partly because the existence of the email signalled that someone was watching the metric. The "real-time dashboard" never got built. Nobody missed it.

This is what asking "Why now?" does. It does not slow down the work. It changes which work you do.

## How to ask it without sounding insubordinate

Here is the part that trips people up. "Why now?" can sound like you are pushing back on the request, questioning the stakeholder's judgement, or stalling. None of those readings help you.

The phrasing matters. Three lines that work:

"I want to make sure I scope this right — what prompted the request?" This is the safe default. It signals that you are trying to do better work, not less work, and the answer almost always comes freely.

"Is there something specific that just happened that we should make sure to cover?" Useful when you suspect the trigger is recent and specific (a complaint, an incident, a meeting). Invites the stakeholder to name the thing.

"Before I open this up — what does success look like in three months for the person who asked for this?" A slightly bigger question, and slower, but very useful for requests that came down through a layer of management. Three months out, success is not "the feature exists." Success is "the original problem stopped costing us something."

Notice what is not in those lines. No "do we really need this?" No "have we considered alternatives?" No "I'm not sure this is the right approach." Save those for after you understand the trigger. They are correct questions; they are not the first question. The first question is the cheap one — what prompted this — and it almost always changes everything that follows.

## The compounding effect

BAs who ask "Why now?" routinely look, in the short run, the same as BAs who do not. The conversations take a few extra minutes. The story comes out at the same time.

In the medium run, two things diverge. The features that ship from triggers-first work get reworked less. And the stakeholders start trusting you in a different way. Once a senior person has seen you reframe two of their requests in a way that ended up cheaper and better, they start telling you the trigger before you have to ask. The conversation gets shorter, not longer. The work gets sharper.

It costs you two words and one minute. Use them.
