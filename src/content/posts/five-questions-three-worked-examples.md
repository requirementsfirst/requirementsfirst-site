---
author: Arun Mehta
pubDatetime: 2026-06-03T18:11:41.000+05:30
title: "The five questions, applied: three worked examples"
slug: five-questions-three-worked-examples
featured: true
draft: false
tags:
  - requirements
  - business-analysis
  - frameworks
  - examples
description: "The five-question template only earns its keep when you watch it work on real requests. Here it is applied to three requests every BA has seen: a customer health score dashboard, a loyalty program, and an AI chatbot for the support site."
---

The previous piece argued that the requirements artifact survives in any format — feature canvas, epic, brief — as long as it answers five questions: who's affected and how we know, what they're doing today, what changes if we ship, what we don't know, and what we're committing to.

That argument is easy to nod at and hard to apply. So this piece walks through three real-feeling requests, the kind every BA gets, and shows what the five questions surface that the original request hid. The scenarios are synthetic but the failure modes are not.

## Scenario one: Sales VP wants a customer health score dashboard

The request, as it lands: "We need a customer health score dashboard. The team needs to see which accounts are at risk so we can intervene before they churn."

This sounds like a clean, well-formed requirement. It names the user (the sales team), the action (see at-risk accounts), and the benefit (reduce churn). It would pass INVEST. It would split well via SPIDR. A BA who skipped the five questions would scope it, write the stories, and ship it.

Now the questions.

**Who's affected and how do we know?** The Sales VP says "the team", but the team has account executives, customer success managers, sales engineers, and the VP herself. Each of them looks at customer accounts for different reasons. Which of them is the actual user? Asking this surfaces that the VP wants the dashboard for her own weekly review, but believed asking on the team's behalf would land better. The team itself has not requested this. Two of the four CSMs already have spreadsheets they use; they would prefer the company invest in fixing the data their spreadsheets pull from rather than build a new dashboard on the same broken data.

**What are they doing today?** The VP gets her account health view from a Friday call where each CSM tells her about their accounts. It takes ninety minutes. She wants something faster. The CSMs already have rough mental models of which accounts are at risk; they update these continuously. The current "system" is human pattern-matching, not a process gap.

**What changes if we ship?** The VP's Friday call gets shorter or stops happening. The CSMs do roughly what they were doing, but now also keep the dashboard's underlying data clean. Whether at-risk accounts get intervened on faster depends entirely on whether the VP escalates differently based on the dashboard than she does from the Friday call. There is no evidence that she would.

**What don't we know?** Whether the underlying data — product usage, support ticket volume, NPS scores — is accurate enough to generate a useful health score in the first place. Whether the CSMs would actually consult the dashboard or just maintain their own spreadsheets in parallel. Whether the algorithm we'd use to weight inputs reflects how an experienced CSM actually thinks about risk.

**Decision and expiry.** What we'd commit to, if we proceeded honestly, is a four-week investigation: shadow one CSM through a churn save, see what signals they actually use, audit the data quality of those signals, and only then decide whether a dashboard is the right artifact. The decision expires if the data audit finds the inputs are too unreliable to build on, in which case we'd recommend fixing the data first.

What changed by running the questions? The original request would have produced a dashboard nobody used, on data nobody trusted, replacing a Friday call that was working acceptably. The questions surface that the actual problem is either (a) the VP wants less time on the Friday call, or (b) the CSMs want better data. Both are solvable. Neither is solved by a dashboard.

## Scenario two: Marketing wants a customer loyalty program

The request: "Our competitor launched a loyalty program last quarter and is seeing strong engagement metrics. We need to launch ours within the next two quarters or we'll fall behind."

This is the most common shape of bad requirement in mid-sized companies. Competitor did a thing. We must do the thing. Urgency is named, problem is not.

**Who's affected and how do we know?** The request names no customer. It names a competitor. When pressed on which customer segment would benefit, marketing says "high-value repeat buyers." Which segment is that, in our data? The answer takes two days to produce because nobody has actually pulled it. When it comes back, it shows that the top decile of customers are not repeat buyers — they're enterprise accounts buying once a year at large volume. Loyalty programs are designed for high-frequency low-ticket purchases. Our top customers are low-frequency high-ticket. The program model doesn't fit our customer shape.

**What are they doing today?** The "doing today" question has to be asked of the actual customer, not of marketing. When we look at NPS comments and recent support transcripts for high-frequency customers, the recurring complaint is delivery time on reorders, not lack of loyalty rewards. The customers most likely to repeat-purchase already do; they're not waiting for points.

**What changes if we ship?** If we ship a points-based loyalty program, our top customers don't engage with it (wrong cohort), our high-frequency customers don't change behaviour (already loyal), and we acquire a small cohort of price-sensitive new customers who optimize for the rewards and churn when the rewards stop. We've seen this pattern in three other companies that adopted programs without segment fit; the loyalty signups were strong, the actual revenue impact was negative once program costs were netted out.

**What don't we know?** Whether the competitor's "strong engagement metrics" reflect revenue impact or vanity metrics. (Almost always the latter for new programs in the first two quarters.) Whether the underlying premise — that customers will switch to us if we offer rewards — is true given that price has not been the loss-reason in any of our last twenty churn interviews.

**Decision and expiry.** We commit to a two-week diagnostic: pull the last six months of churn reasons, identify what segment is actually leaving and why, and report back. If churn is in fact driven by anything a loyalty program would address, we revisit. If churn is driven by delivery, product, or pricing — which the early data suggests — we recommend fixing those instead. The marketing team gets a written response, in writing, on why a loyalty program isn't being scoped. The decision expires if customer segment composition or churn drivers change materially.

What changed? The original request would have produced a loyalty program that didn't fit our customers, cost real money to build and run, and produced engagement metrics that looked good on a slide while failing to move revenue. The five questions don't kill the idea outright; they reroute the work toward the actual churn problem, which is solvable.

## Scenario three: CEO wants an AI chatbot for the support site

The request: "AI is moving fast and our support costs are too high. Let's add an AI chatbot to the support site to deflect tickets. Aim for production in this quarter."

The CEO has named a solution (AI chatbot), a metric (deflection), and a deadline (this quarter). The temptation is to start scoping vendors. The five questions go a different way.

**Who's affected and how do we know?** The CEO says "support costs are too high" — high relative to what? Pulling support cost per resolved ticket against industry benchmarks shows we're middle of the pack. Cost is not unusually high. What is unusually high is ticket volume per active user, which is twice the benchmark. The problem is volume, not cost-per-ticket. Affected parties are: the customers generating the volume (annoyed enough to write in), the support team (burned out), and the CFO (looking at headcount budget).

**What are they doing today?** Looking at the ticket data, 62% of volume comes from four issue categories. Two are documented in the help center but the documentation is stale. One is a known bug that engineering deprioritised because it doesn't crash anything. One is a workflow that the product team designed three years ago and never revisited; new users get confused at the same step every time. The customers writing in are not asking generic questions — they are reporting specific known problems with specific known causes.

**What changes if we ship?** If we ship an AI chatbot that answers FAQ-style questions, it will deflect maybe 10-15% of tickets — the genuinely ambiguous ones that route to FAQ-style answers. The other 85% are the four real issues, which the chatbot will misanswer (because the help docs are stale and the bug is real). Misanswers either anger the customer further (they re-open the ticket angrier) or they accept the wrong answer and the underlying problem stays unfixed. Deflection metric goes up. Underlying ticket-generating problems get worse.

**What don't we know?** Whether the CEO's actual concern is support cost (the named problem) or something else: investor optics around "AI strategy," nervousness about being seen as behind on AI, or a vague sense that headcount needs to come down. If it's any of the latter, an AI chatbot may satisfy the perception need without addressing the operational problem. Worth surfacing this honestly before scoping.

**Decision and expiry.** We commit to a two-track approach: a one-week analysis showing which 4 issues drive 62% of volume and what fixing each would cost (engineering + docs + product work), in parallel with a one-week chatbot vendor evaluation for the residual FAQ traffic. After two weeks the CEO gets both numbers and chooses. If the underlying-fix path costs less than the chatbot subscription and reduces volume more, we recommend it. If the chatbot is genuinely cheaper for the FAQ portion only and the underlying issues get separate workstreams, we adopt it as a supplementary tool, not the primary solution. The decision expires if ticket category mix shifts significantly.

What changed? The original request would have shipped a chatbot, hit some deflection metric, and left the underlying ticket-generating problems intact — possibly worse, because angry mis-answered customers churn faster than confused ones. The five questions don't refuse the AI chatbot; they place it correctly. AI is the tool for some of this. It is not the tool for most of this. Pretending otherwise is the most expensive form of theatre a company can run in 2026.

## The pattern across the three

The five questions surface different things in each scenario, but the pattern is consistent. The original request always names a solution, names urgency, and names a beneficiary in vague terms. The questions force specificity. Specificity reveals that the beneficiary is sometimes different from who the requestor named, that the problem they're trying to solve is sometimes different from the one they stated, and that the solution they proposed is sometimes not the right one for the actual problem.

This doesn't make every original request wrong. Sometimes the questions confirm the request and the team builds exactly what was asked for. But the percentage of times that happens, in my experience, is around one in three. The other two times, the questions either reroute the work to a different solution or kill the request entirely. Either outcome is more valuable than the dashboard that nobody used, the loyalty program that didn't fit, or the chatbot that hid the real problem.

The questions take an hour to ask seriously. Building the wrong thing takes a quarter to ship and another quarter to admit. The math favours the questions.

---

*The next piece in this series looks at one of the hardest parts of this practice: pushing back on stakeholders who've already mentally committed to their proposed solution. The five questions don't help if you can't get them asked. Subscribe below to get it.*
