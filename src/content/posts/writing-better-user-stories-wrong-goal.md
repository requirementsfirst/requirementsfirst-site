---
title: "Writing better user stories is the wrong goal. Here's what to optimise for instead."
author: Arun Mehta
pubDatetime: 2026-05-23T10:00:00+05:30
description: "There's a quiet epidemic in IT services teams. Business analysts and product owners are getting better at writing user stories. The stories are well-structured. They follow the template. They have crisp acceptance criteria. They pass every review. And the projects are still failing."
featured: true
draft: false
tags:
  - analytical-work
  - user-stories
  - ba-craft
---

There's a quiet epidemic in IT services teams. Business analysts and product owners are getting better at writing user stories. The stories are well-structured. They follow the template. They have crisp acceptance criteria. They pass every review.

And the projects are still failing.

Not failing-failing. Failing in the slow way. Features ship that nobody uses. Stakeholders ask for changes the week after release. Engineering quietly rebuilds half the work in the next sprint. Everyone's busy. Nobody's confused. The retrospective lists "communication gaps" as the cause, again.

I've spent eight years on the receiving end of vague business requirements. I've written probably four thousand user stories. I've also worked next to BAs who write fewer and slower than I do, and whose projects somehow keep landing on time with stakeholders who stay happy. The pattern took me three years to see clearly.

It is not about writing stories. It is about understanding the problem.

That sounds like the kind of thing every BA training deck says. So let me make it concrete.

## What "story-writing optimisation" looks like

Here's a familiar arc. A stakeholder sends a Slack message: "We need to add a way for members to update their billing address." The BA opens Jira. Twenty minutes later there's a user story:

> As a member, I want to update my billing address from my profile page, so that my payments and invoices reflect my current address.

Acceptance criteria are added. Edge cases are listed. The story is groomed in the next refinement. Engineering estimates it. It ships in two sprints. Three weeks later, the same stakeholder is back: "Why does this only update the primary billing address? Members with multiple corporate accounts need to update each one separately. Also, the change isn't reflecting in the historical invoices PDF. Also, we're getting complaints from members in countries where the postal code format is different."

The team did not fail at writing the story. They wrote a perfectly clean story for a problem they did not understand.

This is the trap. The story-writing skill is real and worth having. But it is downstream of the actual work, and treating it as the work is what produces well-formed, well-groomed, well-executed misses.

## What understanding the problem actually means

Understanding a problem is not gathering more requirements. More requirements gathering, by itself, often makes things worse — you end up with a longer document describing the same shallow understanding.

Understanding a problem means being able to answer three questions before you open Jira:

**Why now?** Why is this request landing today and not six months ago, or six months from now? The answer is almost never "the stakeholder just thought of it." There is usually a trigger — a complaint pattern, a regulatory change, a number that went the wrong direction, a board meeting, a competitor announcement. Knowing the trigger tells you what success would look like to the people who asked. Without it, you are aiming at a blurry target.

**Who's the actual user, and what are they trying to get done?** Not the persona in your slide deck. The specific human who runs into this problem on a Tuesday afternoon, who probably has three or four workarounds already, who is going to either use what you build or quietly route around it. If you can't describe one of them by name, role, and current workaround, you do not understand the problem yet.

**What changes if we build this, and what changes if we don't?** Most features live in a fuzzy middle ground where everyone agrees they'd be "nice to have" and nobody can articulate the actual cost of skipping them. If you can't describe what gets measurably better when this ships, and what stays broken when it doesn't, you are not solving a problem. You are decorating a backlog.

Until those three questions have real answers, story-writing is premature optimisation.

## A worked example

Take the billing address story above. Here's what asking the three questions would have surfaced.

**Why now?** The trigger was that one large corporate member had recently moved offices, and their accounts team had emailed support seven times trying to update the address across their fourteen sub-accounts. The trigger isn't "members want this feature." The trigger is "we are losing operational efficiency on a small number of high-value accounts."

That single insight reframes the problem. The user we should be designing for is not "any member" — it's "an accounts administrator at a corporate member, managing multiple sub-accounts at once." A profile-page form for one address at a time was never going to solve their problem. They needed bulk update.

**Who's the actual user?** The accounts administrator, who probably has a spreadsheet of all their sub-accounts on the side, who currently emails support every time anything changes, who would happily use a CSV import or a bulk edit screen if one existed.

**What changes if we build this?** Support tickets from corporate members drop. Account administrators stop hating the platform. We retain a tier of customers we were quietly close to losing. What changes if we don't? Specifically these accounts churn or escalate; the support team continues handling what should be self-service.

Now write the user story. It's a completely different story. And it's a story that ships and works.

## The skill compounds in a direction you don't expect

The BAs who do this well aren't slower than the ones who skip to story-writing. They look slower in the first week. By the third sprint they're shipping fewer stories that produce more outcomes, while the story-writing-optimised BAs are shipping more stories that produce more bugs, more change requests, and more "actually, what we meant was..." Slacks.

The other thing that happens — and this is the part nobody mentions — is that engineering starts treating you differently. When the stories you bring to refinement consistently lead to features that don't get reworked, engineers start trusting your problem framing. They stop asking "why are we building this?" and start asking "how should we build this?" That shift, more than any process change, is what separates a BA who's tolerated from one who's trusted.

## What to actually optimise for

If you take one thing from this: spend less time refining your story-writing technique and more time getting good at the conversation that happens before the story exists. Practice asking the three questions out loud. Practice pushing back, politely, when a stakeholder hands you a solution disguised as a requirement. Practice writing one paragraph that describes the problem in your own words before you ever open Jira.

The story-writing will get easier on its own. The story-writing was never the hard part.
