---
author: Arun Mehta
pubDatetime: 2026-05-24T15:00:00.000+05:30
title: How I use Claude to interrogate my own requirements before showing them to engineering
slug: how-i-use-claude-to-interrogate-my-own-requirements
featured: true
draft: false
tags:
  - ai-for-analysts
  - claude
  - requirements
  - workflow
description: I write the requirement. Claude tears it apart. I rewrite. The version that goes to engineering is roughly the fifth draft, and they ask half the questions they used to.
---

Most BAs I know use ChatGPT or Claude for the wrong thing.

They use it to *write* the requirement. Paste a vague stakeholder brief, ask for "user stories with acceptance criteria", get back a wall of plausible-looking stories, copy them into Jira, ship.

This is the worst possible use of these tools. You're outsourcing the part of the job that requires judgement (deciding what the requirement should actually be) and keeping the part that doesn't (transcribing it into a template).

The right use is the opposite. *You* write the requirement. Then you make the AI try to break it.

Here's the actual workflow I've been running for the last six months. It has changed how I work more than any framework, certification, or methodology I've adopted in a decade.

## The workflow

I use Claude for this because the long-context handling is better than ChatGPT for documents over 1,000 words, and the "interrogator" persona is easier to instantiate cleanly. ChatGPT works too — pick whichever you already pay for. The workflow is the tool; the model is the engine.

**Step 1: Write the requirement in prose first.**

Not as a user story. Not as acceptance criteria. As a paragraph or two, in normal English, like you're explaining it to a senior colleague over coffee. Who's affected, what's broken, what changes if we ship, what changes if we don't. This forces the thinking that the template hides.

If you can't write the prose version, you don't have a requirement. You have a feature request. Stop and go find the trigger.

**Step 2: Paste it into Claude with this prompt.**

> You are a skeptical senior engineer reviewing a requirement from a business analyst. Your job is to find every weakness, hidden assumption, missing edge case, and ambiguous phrase in what I'm about to share. Be specific. Be ruthless. Don't be polite. Ask me the questions I would dread getting in a real review.
>
> Here is the requirement:
>
> [paste prose]

I have variations of this prompt for different contexts — sometimes "skeptical senior engineer", sometimes "QA lead with a grudge", sometimes "the architect who never thinks anyone considers performance". Different personas surface different gaps. The pattern is the same: ask the AI to play the role of the person who will eventually tear into the requirement, before that person actually does.

**Step 3: Read the questions Claude raises. Most are good. Some are nonsense.**

This is the skill. The AI will surface eight to fifteen questions in response. Maybe four are sharp ("what happens to in-flight transactions when the user is mid-workflow?"). Maybe four are obvious things you'd already thought of ("what if the user has no internet connection?"). Maybe four are misreads where the AI didn't understand your domain ("how does this scale to millions of users?" when the system has eighty users total).

Triage: discard the obvious and the wrong, keep the sharp.

The sharp ones are usually the ones where you read them and feel a small wince. That wince is your signal. It's the question you didn't want to be asked because you didn't have a clean answer.

**Step 4: Answer the sharp ones in writing. Update the requirement.**

Don't argue with the AI in the chat. The chat is a means; the artefact is the requirement document. Open your doc, find the section the question hits, add the answer or the resolved decision. If the question reveals you genuinely don't know, that's a flag — find the person who would know, ask them, then update.

**Step 5: Paste the updated requirement back into Claude. Repeat.**

This is the interrogation cycle. By round three, the AI is running out of sharp questions because you've patched the obvious gaps. By round four or five, the questions are about genuinely contested decisions or low-priority edge cases. That's when you stop.

The requirement you take to engineering is roughly the fifth draft. It looks deceptively short. Most of the work — the thinking — is invisible in the final artefact, but it's why the document holds up under questioning.

## What this actually changes in practice

I tracked this for ten requirements I worked on last year, comparing the pre-Claude version (when I'd write a draft and take it straight to engineering) with the post-Claude version (after five interrogation rounds).

The pre-Claude version triggered an average of fourteen clarifying questions from the engineering team during review. The post-Claude version triggered three.

I did not write better stories. I anticipated more of the questions.

That's the entire value proposition. The AI doesn't help you write — it helps you predict the gaps that someone else will eventually find. You then close those gaps before they cost a sprint.

## A short worked example

Let me show this in compressed form. Original prose requirement I wrote:

> The sales team needs the ability to re-assign leads to other team members. Currently they DM each other on Slack when they hand off a lead, but the CRM doesn't update and commission attribution gets messy. We need a way to reassign a lead so that ownership in Salesforce updates and the audit trail reflects who originally received the lead and who took it over.

What Claude asked (paraphrased, only the sharp questions):

- "When a lead is reassigned mid-conversation, do existing scheduled tasks (calls, follow-up emails) move with the lead, or stay with the original owner?"
- "Is reassignment one-directional only (current owner hands off) or can a manager force-reassign? If managers can force-reassign, do they need to notify both parties?"
- "What's the source of truth for commission split if a lead is reassigned after partial work has been done — does the new owner get full credit or pro-rated?"
- "If the audit trail is for compliance, what's the retention period? Sarbanes-Oxley implications if this is a public company?"
- "Edge case: what happens if the lead has been deleted by the original owner before reassignment, or merged into another lead record?"

Of these five, three were things I hadn't thought about (the scheduled tasks, the partial-work commission split, the deleted-lead edge case). I went back to sales ops with three specific questions, got three specific answers, updated the requirement, ran it through Claude again. Round two surfaced one more gap (what happens to inbound emails to the original owner's email address after handoff). Round three was clean.

The final requirement was about half a page longer than my first draft. But the engineering team asked two clarifying questions in review instead of the twelve to fifteen this type of work usually triggers.

## What this is not

This is not "let AI write your stories". The AI doesn't know your business, your users, your stakeholders, or your political dynamics. It can't tell you which solution to build. It can only ask the questions a smart skeptic would ask if they read what you wrote.

This is also not a replacement for talking to your stakeholders, your engineers, your QA team, or your users. It's something you do *before* those conversations — so when you have them, you're asking sharp questions, not generic ones.

The model is your private rubber duck with reading comprehension and a refusal to be polite. That's it. That's the whole product.

## How to actually start

If you've never done this, don't try the full five-round cycle on a critical requirement first. Pick something low-stakes you're working on this week. A minor feature. A bug fix that needs a spec. A change request from a single user.

Write your prose draft. Use the interrogator prompt. Read the questions. Notice which ones make you wince. Update. Repeat once.

You'll feel the difference in one cycle. The next requirement, you'll do two cycles. By the fourth or fifth requirement, you won't take a doc to engineering without running it through this first. It becomes habit because the cost is twenty minutes and the benefit is half a sprint of avoided rework.

The hardest part isn't using the AI. The hardest part is being willing to read questions about your own work that make you wince, and answering them honestly. Most BAs aren't trained to do this. They're trained to defend their docs in review meetings. This workflow inverts that — you put yourself through the review before the review.

If you do that consistently, your reputation with engineering changes within about three months. They stop bracing for your requirements. They start trusting that what you sent has already been thought through.

That's worth a lot more than any certification.

---

*The next piece in this series breaks down acceptance criteria that actually prevent bugs, with twelve worked examples. Subscribe below to get it.*
