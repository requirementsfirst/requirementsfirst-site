# Lessons

Strategy lessons learned operating RequirementsFirst. Terse, declarative. Append as new lessons surface; merge by topic, don't duplicate.

## Reddit: engagement velocity beats topic fit

Comments on fresh threads with an active OP outperform perfectly on-topic comments on stale threads. A reply within the first hour to an OP still in the conversation gets far more eyeballs than a thoughtful comment on a week-old post. **Rule:** only comment on fresh threads with an engaged OP. Some days zero qualifying threads exist — that is fine, don't force it.

## LinkedIn posts are de-indexed from search engines

LinkedIn content is invisible to Google and Bing, so it drives zero organic SEO regardless of how good the post is. **Rule:** treat LinkedIn purely as a credibility and distribution play, never as an SEO channel. Never try to automate LinkedIn discovery — it is manual only.

## LinkedIn Page admin is an identity risk

A personal account that lists a real employer being sole admin of an anonymous brand Page creates a discoverable identity link via LinkedIn's "Pages you manage" surface. **Rule:** a generic account should be primary Page admin. Keep synthetic case studies obviously generic so the persona stays defensible.

## Don't apply to affiliate programs before you have traffic

Applying with zero traffic gets the application rejected and can flag future reapplications from the same domain. **Rule:** affiliates paused until Month 2 or meaningful traffic, whichever comes first. Passive-wait on pending applications — no follow-up emails, no reapplying.

## Infrastructure rabbit holes don't ship

Any infrastructure task exceeding ~30 minutes that doesn't ship an article or drive traffic is a trap. Time spent tuning the build, chasing a cosmetic font bug, or perfecting tooling is time not spent on content, which is the only thing that moves the metric. **Rule:** stop at the 30-minute mark, accept the manual workaround, or defer to a documented trigger (see [KNOWN_ISSUES.md](KNOWN_ISSUES.md)).

## Verify on real mobile, not just headless

A newsletter embed bug once passed verify.mjs (headless Chromium) but broke on iOS Safari. Headless checks confirm markup and basic layout; they do not catch real-device rendering, touch behaviour, or vendor-specific quirks. **Rule:** confirm critical UI on a real mobile device before declaring a change done, not just automated checks.
