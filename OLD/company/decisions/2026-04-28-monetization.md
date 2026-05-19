---
name: Monetization model — free wedge, paid Pro and Team
description: Resolves the "who pays, for what, why" question. Free for individuals (Figma path, not Sketch path), paid for Pro and Team tiers. Specific dollar targets pinned for cohort calibration.
type: decision
date: 2026-04-28
dri: Tal
---

# Monetization model — free wedge, paid Pro and Team

## Decision

Duble//Slash adopts a four-tier shape, layered onto the existing "OSS agents + paid platform" frame:

| Tier | Price | What you get | Who it's for |
|---|---|---|---|
| **OSS local** | $0 | Self-host. All agents, methodology, and the desktop app's local Context Cloud. Run it yourself. | Tinkerers, privacy-first users, people who'd never pay for a managed app |
| **Managed solo** | **$0 (free wedge)** | Polished menu-bar app, auto-update, local Context Cloud, all agents. No sync, no team graph. | Every individual designer, PM, knowledge worker — the entire top of funnel |
| **Pro solo** | **$12/mo (target)** | Sync across devices, hosted agent execution, premium agents. Still single-user. | Power users, freelancers, anyone with more than one machine |
| **Team** | **$24/seat/mo (target)** | Multi-person Context Cloud, shared briefs, agent-as-participant in meetings, admin/SSO. | Studios, R&D teams, agencies |

**Locked:**
- Free OSS (self-host) and free managed solo are both available. The managed solo tier is the growth wedge. We do not charge for individual adoption.
- Pro and Team are paid. Team is meaningfully more expensive than Pro because cross-machine, multi-user sync requires real cloud infra.
- "Studio services" (us doing the work for clients) remains rejected as a revenue path.

**Calibrated post-cohort:**
- Pro solo: starting target $12/mo. Calibrated against what designers will actually pay after using the free tier for 4-8 weeks.
- Team: starting target $24/seat/mo. Calibrated against what the 4-studio cohort will commit to once they convert from free pilot.
- Pro vs. Free feature split (which agents are premium, what counts as "hosted execution" quota).

## Why

The product hypothesis (per [STORY.md](../../STORY.md)) is that context continuity for non-technical knowledge workers is a wedge that can grow into a company-level operating layer. That hypothesis only plays out if individuals adopt at scale. Charging anything — even $1 or $3 — at the individual step kills the on-ramp.

**The Figma comparison resolves the question.** Figma launched free-for-individuals from beta and never charged solo. The free tier was the entire growth engine: designers adopted, brought it into teams, admins paid for the team plan. Sketch charged solo ($99) and Figma killed Sketch. Charging solo runs the Sketch playbook, not the Figma playbook.

**Two buyers are real but sequenced.** Individual adoption (phase 1) → team pull-in (phase 2) → admin approval of team plan (phase 3). The "two buyers" question only matters at phase 3. Phase 1 has one buyer — the individual — paying zero.

**Pricing reflects claimed value.** If `//` saves a designer 30 minutes a day, that's roughly 10 hours/month × ~$50/hr design rate ≈ $500/month of value. Pro at $12 and Team at $24 are still steep discounts on the value claim, while sitting at the right shelf next to Figma ($15), Wispr Flow ($15), Cursor ($20), Granola ($20). $3 solo / $12 team would have been 5-7× below that shelf, signaling "hobby tool" rather than infrastructure.

## Alternatives considered

- **$3 solo / $12 team (Tal's initial position).** Rejected. Three reasons:
  1. Charging $3 for solo runs the Sketch playbook, not the Figma playbook. The whole growth thesis depends on individual designers adopting without friction; even a $3 paywall kills the on-ramp.
  2. Direct contradiction with "free OSS local." If the OSS version is genuinely free and self-hostable, then $3 for a managed local app needs a clear justification — but the cost difference between OSS-local and managed-local is near-zero infra. The honest split is *free OSS / free managed solo / paid Pro the moment infra cost shows up (sync, hosted execution)*.
  3. $3/$12 is 5-7× below comparable shelf prices and undersells the value claim.
- **"$1 rising soon" launch framing.** Rejected. Works on consumer apps (Spotify, Duolingo). For a tool a designer depends on 8 hours a day, urgency-pricing signals "hobby app, not infrastructure." Wispr Flow charges $15 from day one without urgency tactics — the urgency comes from value, not from the price tag.
- **Free OSS only, no managed tier.** Rejected. Most designers will not self-host. The managed solo app is the actual wedge; OSS exists for the small minority who want it and as a moat narrative for YC.
- **Studio services as revenue (us doing the work).** Already rejected (see [project_business_model](../../../.claude/projects/-Users-talsolomon-Documents-dubleslash/memory/project_business_model.md)). Reaffirmed here.
- **Enterprise-first / sales-led from day one.** Deferred, not rejected. Plausible later layer once Team tier proves out, but selling enterprise before having product-led adoption signal is a different company.

## What changes

- [STORY.md](../../STORY.md) revenue line updated — `[OPEN]` marker on line 58 removed. Pitch language remains pitch-appropriate (no specific dollars in YC narrative); concrete numbers live here.
- [`company/dris.md`](../dris.md) — "Monetization model" outcome moves from `not started` to `active`, metric updated from "who pays for what written down by 2026-05-12" to cohort-calibration of the pinned targets.
- Memory `project_business_model.md` updated to lift the "specific pricing deferred" note and reflect the four-tier structure.
- Memory `project_story_open_items_2026_04_28.md` — revenue specifics item closed.

## Open within this decision (deliberately deferred)

- **Pro vs. Free feature split.** Which agents are premium? What's the hosted-execution quota? Decide once cohort is using the free tier and we see what they hit limits on.
- **Kanban / payments / "the other stuff" features.** Whether these become paid Pro features, free Managed solo features, or separate add-ons — depends on whether they end up native to `//` or peripheral. Don't decide now.
- **Annual vs. monthly, billing currency, OSS license choice (MIT vs. AGPL vs. dual).** All deferred; none of them gate anything before the cohort lands.
- **Free-trial mechanics for Pro and Team.** Standard 14-day trial assumed; revisit if conversion data says otherwise.

## Outcome to watch

By **2026-06-23** (8 weeks, end of cohort): at least 1 of the 4 cohort studios has converted from free pilot to a paid Team commitment at or near the $24/seat target. If conversion happens at a meaningfully different price (say <$15 or >$40), that's the calibration signal — update this decision rather than treating the targets as locked.

By **2026-05-19**: managed solo (free) is live enough that we can hand it to a designer outside the cohort and watch whether they reach for Pro on their own. If nobody reaches for Pro after using free for 2 weeks, the free→Pro feature split is wrong, not the price.
