---
author: Arun Mehta
pubDatetime: 2026-05-24T11:00:00.000+05:30
title: Why "as a user, I want to..." is the worst thing that happened to user stories
slug: as-a-user-i-want-to-worst-thing-user-stories
featured: true
draft: false
tags:
  - user-stories
  - requirements
  - business-analysis
description: The "as a user, I want X so that Y" template was a useful crutch in 2001. Twenty-five years later, it's a substitute for thinking. Here's what to write instead.
---

Every BA learns the template in their first week.

> As a [user type], I want [some functionality] so that [some benefit].

It gets taught in certifications. It's the default ticket template in every Jira and Azure DevOps install. There are LinkedIn posts every week telling junior BAs to "always write your stories this way".

I think it's the single worst thing that happened to requirements work in the last twenty years.

Not because the format is wrong. Because of what writing in that format does to your brain.

## What the template was originally for

The "as a user" template comes from Connextra, a UK company, around 2001. Mike Cohn popularised it through XP Magazine and his books. The original purpose was specific and modest: a *conversation starter* between a customer and a development team that had been previously communicating through 200-page requirements specifications.

The template did three useful things at the time:

1. Forced you to name a user (instead of "the system shall...")
2. Forced you to state intent (instead of just a feature list)
3. Was short enough to fit on an index card

It was never meant to be the requirement. It was the placeholder for a conversation that would produce the requirement.

Twenty-five years later, the conversation got dropped. The placeholder became the artefact. We now have entire backlogs full of stories written in this format that nobody ever discussed.

## What the template does to your thinking

When you sit down to write "as a [blank], I want [blank], so that [blank]", you do not think about the problem. You think about how to fill in three blanks.

This is the cognitive trap. The format is so easy to fill that it stops you noticing whether you have anything to say.

Some real examples I've seen in production backlogs (genericised):

- "As a user, I want to login so that I can access the system." (You're explaining what login is. To developers. Who already know what login is.)
- "As a customer, I want to receive an email so that I am notified." (The user does not "want" to receive an email. They want to know something happened. The email is your solution.)
- "As an admin, I want to manage users so that I can manage users." (This is the template eating itself.)

In each case, the writer had no actual requirement. They had a feature they'd been told to spec, opened the template, and filled it in. The format gave them the dignity of looking like a story. The team built it. Nobody asked whether it should exist.

## The deeper problem: the format hides the question of why

The template's most-praised feature is the "so that" clause. "It forces you to think about the benefit!" Watch what actually happens:

You write "as a customer, I want bulk export". You stare at the "so that" clause. You write "so that I can export in bulk." You know it's tautological. You change it to "so that I can save time". Done. Moving on.

The "so that" clause has become the part of the story that everyone fills in last and nobody reads. It's the literary equivalent of "to make the world a better place" on a startup mission slide.

Meanwhile, the real questions go unasked:
- Who specifically? Which customer? With which workflow?
- Why is this needed now and not six months ago?
- What does the customer do today instead, and why isn't that working?
- If we don't build this, what breaks?
- Is "bulk export" the actual solution, or have we leapt to it?

None of these fit in the template. The template is a three-blank fill. So none of them get asked.

## What better looks like

I'm not saying never write stories in the template. For trivial work — "as an admin, I want to deactivate a user account so that they can no longer log in" — it's fine. The whole requirement fits in the format and there's nothing to interrogate.

For anything non-trivial, the template should be the last thing you write, not the first. Here's the order I use:

**One. Write the problem in prose.** Two or three paragraphs, in normal English. What's happening. Who's affected. What they're doing today. Why that doesn't work. What changes if we don't fix it. No template, no jargon, no bullet points yet. Just write it like you're explaining it to a smart friend who doesn't work at your company.

**Two. Identify the user and the trigger.** Not "a customer" — specifically which customer, in which segment, in which workflow. Not "they want to save time" — what specifically forced this issue to surface this week.

**Three. List what good looks like.** What does the world look like after this is built? What behaviour changes? What metric moves? What complaint stops?

**Four. Now write the story (if you must).** Use the template if your tools require it. But by this point the story is a summary of work you've already done, not a substitute for it.

The story should be the shortest part of the document. The prose problem statement should be the longest.

## A worked example

Original story:
> As a sales rep, I want to assign leads to teammates, so that we can collaborate.

What my notebook looked like before that story was written:

> Sales team is losing ~30% of inbound leads because of timezone misalignment. The US-based rep gets a lead at midnight IST, but the Bangalore rep who could respond in 20 minutes never sees it. They've been working around this by Slack-DMing each other "hey can you take this one" — but it doesn't update Salesforce, ownership stays wrong, and commission disputes follow.
>
> The trigger this week: Anita (Bangalore) and Mike (Boston) had a fight last Friday about a closed deal where Mike got commission credit for a lead Anita actually worked. Sales leadership wants this fixed before quarter-end.
>
> What good looks like: when Mike or Anita re-assigns a lead, ownership in Salesforce updates atomically, commission attribution follows the new owner, and there's an audit trail. Slack DMs about lead ownership stop.

The story is one line. The thinking behind it is fifteen. When the dev team reads the story, they have one question — "what does the audit trail look like?" — instead of twenty. That's the only metric I care about: how many clarifying questions did the team ask after reading the story.

If they ask zero, you over-specified. If they ask twenty, you wrote a template instead of a requirement.

## The discipline

The template isn't evil. The treatment of the template as the work is evil.

Next time you open a new ticket, resist opening with "As a...". Open with prose. Write what's going on. Write what's broken. Write what changes if we ship this. Write what changes if we don't.

Then, if your tools require a template, fill in the blanks at the end. It will take you sixty seconds. The story will be sharper than anything you've written in years. Because it'll be a summary of a real understanding, not a substitute for one.

---

*The next piece in this series breaks down how to interrogate your own requirements with Claude before showing them to engineering. Subscribe below to get it.*
