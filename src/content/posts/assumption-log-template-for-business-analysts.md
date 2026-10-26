---
author: Arun Mehta
pubDatetime: 2026-10-26T10:00:00.000+05:30
title: "Assumption log template for business analysts: rank the ones that can sink you"
slug: assumption-log-template-for-business-analysts
featured: true
draft: false
tags:
  - business-analysis
  - discovery
  - requirements
  - craft
description: "An assumption log template that ranks risk instead of listing it: three questions per assumption, one score from 0 to 100, and a worked example."
---

Every project template has an assumptions section. The RAID log has a tab for it. The BRD has a heading for it. And on almost every project I have seen, that section is a list of fifteen sentences that nobody reads after week two.

The problem is not that BAs forget to write assumptions down. It is that a flat list treats them all as equal. "Users will have a modern browser" sits next to "Finance will approve the new refund rules" with the same font, the same bullet, and the same amount of attention, which is none. One of those can sink the project. The other cannot. A list that does not tell you which is which is not an assumption log. It is a disclaimer.

This piece gives you an assumption log that ranks instead of lists, with a worked example you can copy into a spreadsheet today.

## What an assumption log is actually for

An assumption is something the plan depends on that nobody has confirmed. The log exists to answer one question every week: which unconfirmed thing, if it turns out to be false, costs us the most?

That question has two parts that a flat list ignores. How bad is it if this is wrong? And how sure are we that it is right? A wrong assumption you are already certain about is not a risk. A shaky assumption that only touches a minor screen is not urgent. The ones that deserve your time are the ones that are both shaky and expensive.

So the log needs a way to combine those two things into an order. That is all the template below does.

## Three questions per assumption

For each assumption, answer three questions with a fixed set of options. Fixed options matter. Free-text risk ratings drift, and "medium-high" means something different to every person who types it.

**1. Impact if wrong.** If this turns out to be false, what happens?

- Critical (4): the project's core outcome fails or needs a redesign
- High (3): a major feature needs rework
- Medium (2): noticeable rework, but contained
- Low (1): a small fix

**2. Confidence.** How do we know this?

- Guess (3): someone said it, or we assumed it, and nobody has checked
- Unsure (2): there is some evidence, but it is partial or second-hand
- Likely (1): solid evidence, not yet formally confirmed
- Verified (0): confirmed by the person who actually owns the answer

**3. Reach.** How much of the solution depends on it?

- Whole project (3)
- Several features (2)
- One feature (1)

Notice that confidence is scored as uncertainty. A guess scores high, a verified fact scores zero. That is deliberate, and it is the part that makes the log work.

## One score from 0 to 100

Multiply the three numbers, then scale to 100:

**Score = Impact × Uncertainty × Reach ÷ 36 × 100**

36 is the maximum possible product (4 × 3 × 3), so a critical, whole-project guess scores 100 and everything else falls below it. Then sort the scores into three bands:

- **60 and above: Load-bearing.** Validate this week. Name an owner and a date.
- **30 to 59: Watch.** Put a question on the list, check it before the design touches it.
- **Below 30: Low.** Leave it in the log and move on.

Why multiply instead of add? Because multiplication lets any single factor pull an assumption down. The moment someone verifies an assumption, its uncertainty becomes zero and its score becomes zero, however critical it was. It drops out of your attention automatically, which is exactly what should happen. Adding the numbers would leave a verified critical assumption sitting near the top of the list forever.

## A worked example: the refund portal

Here is a synthetic example. A retailer wants a self-service refund portal so customers stop emailing support for refunds. After the [first two discovery sessions](/posts/how-to-actually-run-a-stakeholder-discovery-conversation/), the BA has five assumptions in the log.

| Assumption | Impact / Confidence / Reach | Score |
| --- | --- | --- |
| Finance will let refunds under 50 dollars go through without manual approval | Critical / Guess / Whole project | **100** Load-bearing |
| Customers, not support agents, will start most refunds | Critical / Unsure / Whole project | **67** Load-bearing |
| Order data older than 18 months is still in the main database | High / Guess / Several features | **50** Watch |
| The payment gateway supports partial refunds through its API | High / Unsure / Several features | **33** Watch |
| Customers will upload a photo of a damaged item | Medium / Guess / One feature | **17** Low |

Read the top row. The entire business case for the portal is speed: refund in minutes, not days. If finance insists on approving every refund by hand, the portal becomes a nicer-looking email inbox and the business case collapses. Nobody in the room was from finance. The product owner said "I am sure they will be fine with it." That is a guess, and the log says so.

Now look at the bottom row. Photo upload sounds like a big decision, and it would probably get the most debate in a workshop. But if it is wrong, you remove one field from one form. The log keeps the team from spending its energy where the noise is instead of where the risk is.

The BA's job this week is now obvious: get thirty minutes with someone in finance who can actually say yes or no to the approval threshold, and confirm with support how refunds are started today. Two conversations, and the two assumptions that could sink the project are either verified or exposed.

## Turn the top of the log into questions with owners

A load-bearing assumption with no owner is just a worry. For every assumption scoring 60 or above, write one question and attach three things to it:

- **Who owns the answer.** A named person, not a team.
- **When you asked.** The date, so you can count.
- **Days waiting.** Today minus the date asked, until it is answered.

Days waiting is the number that gets questions answered. "We are still waiting on finance" is easy to ignore in a status meeting. "This question has been open for nine days and it decides whether the portal is worth building" is not.

## The ten-minute weekly review

The log only works if it moves. Once a week, before your status update:

1. Add any new assumptions from the week's conversations. Anything someone said as if it were a fact, that nobody checked, goes in.
2. Re-rate confidence on anything that got new evidence. A guess that got partly confirmed becomes Unsure. A confirmed one becomes Verified and drops to zero.
3. Look at the load-bearing band. Each one should have an open question with an owner. Chase the ones with the highest days waiting.
4. Put the top three in your status update, in plain language: what we are assuming, what happens if it is wrong, who we are waiting on.

That last step is the one that changes how stakeholders see the BA. You stop being the person who writes up what was said and start being the person who tells the project what it does not know yet.

## Building it yourself

You can build all of this in a spreadsheet in about twenty minutes. Three dropdown columns, three lookup columns that turn the labels into numbers, one formula for the score, and one for the band. Conditional formatting on the band column does the rest.

If you would rather not build it, I put together a version in Notion that does the whole thing out of the box: an Assumption Ledger with the three dropdowns and the score built in, linked to stakeholders, discovery inputs and an open questions list that counts days waiting, plus a dashboard that puts the load-bearing assumptions and the questions still waiting on answers at the top. It comes with the refund portal example filled in so you can see how it works before you clear it and use it on your own project.

It is a one-time purchase: [the Requirements Discovery and Assumption Tracker, on Gumroad](https://requirementsfirst.gumroad.com/l/lrvkcv). The spreadsheet version above is genuinely enough if you are happy to build it.

## The short version

A flat list of assumptions tells you nothing about where to look. Rate each one on impact if wrong, confidence and reach. Multiply them into a score so the shaky, expensive ones rise to the top and the verified ones fall to zero. Turn every load-bearing assumption into a question with an owner and a clock. Review it for ten minutes a week.

The projects that fail on requirements rarely fail on the requirements somebody wrote down. They fail on the ones everybody assumed.

---

*If this was useful, the publication covers the rest of the requirements craft the same way: plainly, with a point of view. Subscribe below for new pieces as they publish.*
