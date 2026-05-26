---
author: Arun Mehta
pubDatetime: 2026-05-26T09:06:18.000+05:30
title: Most stakeholder conflicts are authority disputes, not requirements disputes
slug: stakeholder-conflicts-authority-not-requirements
featured: true
draft: false
tags:
  - stakeholders
  - business-analysis
  - communication
  - org-design
description: When a stakeholder refuses to discuss a request, the standard advice is "ask better questions". This is almost always wrong. The problem is rarely communication. It's that nobody has agreed who gets to decide what, and the stakeholder is defending territory they're not sure they own.
---

Every BA training course teaches you the same thing. When stakeholders are difficult, ask better questions. Use the 5 Whys. Try active listening. Build rapport. Lead with empathy.

I have used every one of these techniques. Some of them work on some people some of the time. None of them work reliably. After a decade of trying to be a better communicator, I came to a different conclusion: most stakeholder conflicts aren't about communication at all. They're about authority. And no amount of softer questions will resolve a dispute that is fundamentally about who gets to decide.

This piece is about how to recognise authority disputes when they're disguised as requirements disputes, and what to do differently when you do.

## The pattern, in three scenes

**Scene one.** You ask the head of sales why she needs the new dashboard. She gets visibly annoyed. "I've already told you twice. Just build it." You leave the meeting wondering if you said something wrong.

What's actually happening: the head of sales believes the dashboard is hers to specify. You asking why feels, to her, like you're questioning whether she has the authority to make this call. Your "why" sounds like "prove you have the right to ask for this". She doesn't.

**Scene two.** The product manager asks for a feature. You ask the engineering lead if it's feasible. The engineering lead pushes back hard. "We shouldn't even be talking about this. Product should have consulted us before promising it." You're caught between two people who each think they own the decision.

What's actually happening: nobody has explicitly agreed whether product or engineering owns feasibility decisions. Both are defending what they believe is their domain. Your feasibility question landed in the middle of an unresolved boundary, and now you're the visible target.

**Scene three.** A stakeholder approves a requirement. You write it up, ship it, and three weeks later a different stakeholder — someone you didn't know was involved — calls a meeting to complain that this wasn't what they asked for. The first stakeholder, the one who approved it, is suddenly silent.

What's actually happening: the first stakeholder didn't actually have the authority to approve it. They thought they did, or they were trying to act like they did. The real owner only surfaces when something is wrong. You're now the visible target again, even though the failure was upstream.

In all three scenes, the BA gets blamed for a communication problem. In all three, the actual problem is that the organisation hasn't agreed who owns what.

## Why this happens more in some orgs than others

Authority disputes show up most in three contexts:

**Matrix organisations.** Anyone who has worked in IT services or large consultancies knows this one. You report to a delivery manager but work on a client account run by an account director. The client itself has a steering committee, a project sponsor, and an end-user community. Five different people each believe they have meaningful authority over the requirements. They are not wrong, but their authorities overlap. Any BA question that lands in an overlap zone triggers a defensive response from at least one of them.

**Newly merged or restructured teams.** When teams reorganise, the old authority lines are gone and the new ones haven't settled. People who used to make decisions are now unsure. People who didn't use to make decisions are testing whether they now can. You walk into this with a requirements question and you've just stepped into a power negotiation that has nothing to do with you.

**Orgs without explicit ownership of business processes.** "Who owns customer onboarding at this company?" is a question that, in most companies, doesn't have a clean answer. Product owns parts of it. Customer success owns parts. Sales owns parts. Legal owns parts. When you have a requirement that touches onboarding, you don't have one stakeholder. You have a contested space.

If your organisation matches any of these, most of your stakeholder difficulty is authority, not requirements. Recognising this changes what you do.

## How to recognise it in the moment

When a stakeholder pushes back unexpectedly hard on a reasonable question, three things to notice:

**One. Did the pushback come immediately, before they processed the question?** Genuine resistance to a question takes a few seconds — the person considers the question, decides they don't want to answer, then deflects. Authority defense is instant. It happens in the first half-second because it's not a response to what you asked; it's a response to the perceived challenge of being asked.

**Two. Did the pushback escalate disproportionately?** If you ask "what's the use case?" and the stakeholder responds with "I don't have time for this kind of interrogation", the response is two levels harsher than the question. Disproportionate escalation is almost always a tell that you've hit an authority nerve. Reasonable people don't go from zero to interrogation in one question unless something else is going on.

**Three. Did the language shift to make it about you?** When someone moves from "I don't want to discuss this" to "you don't need to know this" — putting *you* in the sentence — they've stopped responding to the question and started defending against you specifically. The pronoun change is the tell. Requirements conversations stay about the requirement. Authority defences shift to be about the person asking.

If two of the three are showing up, you're in an authority dispute, not a requirements conversation. Treating it as a requirements conversation will fail.

## What to do instead

Here is the part most BA training gets wrong. The advice for authority disputes is the opposite of the advice for requirements disputes.

For a requirements dispute, you go deeper. You ask more questions. You probe edge cases. You build understanding.

For an authority dispute, you go shallower. You stop asking questions that feel like challenges. You explicitly affirm the stakeholder's ownership, even if you're not sure they actually have it. You move the conversation to a place where their authority isn't being tested.

In practice this looks like:

**Step back from the why.** Instead of "why do you need this", say "okay, I'll set this up. What outcomes are you hoping to see so I can frame this for engineering?". You're not abandoning the question. You're reframing it so it doesn't feel like a challenge. They have to articulate outcomes anyway because they need engineering to deliver them. You just stopped asking the question that triggered the defence.

**Make them the senior in the room.** Authority-anxious stakeholders need to feel that you're working for them, not auditing them. "I want to make sure I represent your request accurately when I take this to engineering — would you walk me through the parts that matter most to you?" This is the same question as "what are the priorities" but framed as service, not interrogation.

**Document the authority chain in writing.** This is the unsexy but most effective move. After the meeting, send an email: "Confirming the approach we discussed for [requirement]. I'll proceed on this basis unless you flag otherwise by [date]." This does two things. It creates a paper trail that names the stakeholder as the decision-maker, which is what they wanted. And it surfaces other people who actually should have been in the loop — they'll see the email and either confirm the chain or correct it. The stakeholders who didn't have authority will reveal themselves by getting CC'd into the response thread.

**Find the actual decision-maker quietly.** If you suspect the stakeholder you're talking to doesn't have full authority, find the one who does without making it a confrontation. Ask the question one level up. Ask the engineering team who they take direction from on this kind of feature. Ask your own manager who in the organisation owns this domain. You don't have to expose the authority gap publicly. You just have to know where it actually sits.

## The harder case

Sometimes there is no clear owner. The authority is genuinely diffuse, and no amount of investigation will produce a clean answer. In this case, your job is to name the gap to your own manager, not to solve it yourself.

One framing that works: "I don't think we have a clean owner for [decision]. I can proceed with [stakeholder]'s preferences and document the assumption, but if [other person] objects later, we'll need to redo the work. How do you want me to handle this?" Putting the question to your own manager removes you from the authority dispute. You're not adjudicating — you're flagging a structural gap and asking for direction.

This is a more honest move than running a script on a stakeholder who is, fundamentally, defending themselves against an organisational ambiguity they didn't create. Your communication skills are not the solution. The solution is upstream, and your job is to make the upstream problem visible to people who can fix it.

## The reframe

If you take one thing from this, take this. When you next find yourself thinking "this stakeholder is being difficult", replace that thought with "what is this stakeholder defending right now?". Most of the time the answer is not "their requirement". It is their authority over a domain they are not sure they own.

You can spend years trying to be a better communicator. It helps a little. The bigger move is recognising that you are often not in a requirements conversation at all. You are in a power conversation that is wearing a requirements costume.

Once you see this, you stop blaming yourself for the meetings that go badly. You start asking different questions. You document differently. You escalate the structural problems instead of absorbing them as personal communication failures. You also get a lot less tired.

The BAs I know who have figured this out are not better communicators than the rest of us. They are just better at reading what room they are actually in.

---

*The next piece in this series breaks down INVEST vs SPIDR — and why neither framework matters if you can't explain why the story exists. Subscribe below to get it.*
