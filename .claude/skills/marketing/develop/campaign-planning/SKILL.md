---
name: ds-marketing-campaign-planning
description: Plans a multi-channel marketing campaign with channel mix, content matrix, A/B test design, budget model, and risk flags. Use when executing a campaign brief, coordinating across channels, or asking "how do we run this campaign". Also triggers on: Multi-channel campaign design, channel sequencing, paid media planning, email sequence design, A/B test planning, budget allocation.
tags: [marketing, develop]
model: inherit
---

# Campaign Planning
**Domain**: Marketing | **Phase**: Develop | **Invocation**: `/ds-marketing-campaign-planning`

## What this produces
A campaign execution plan with channel breakdown, content matrix, email nurture sequence, A/B test design, budget allocation model, owner assignments, timeline, and risk flags — everything needed to brief a team and start executing.

## Methods
Multi-channel campaign design, channel sequencing, content matrix, paid media planning, organic channel planning, email sequence design, A/B test planning, budget allocation modeling, influencer/partner outreach planning, risk identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 2 channels, content matrix, timeline, budget outline |
| Tuna | Multi-channel plan, content matrix, email sequence, budget model |
| Salmon | Full plan with A/B tests, paid/organic split, risk flags |
| Willy | All methods — influencer plan, full budget model, optimization framework |

## Execution prompt
You are running Campaign Planning for [project]. Translate the campaign brief into an executable plan.

**Input**: campaign brief (objective, audience, message, channels, timeline, budget), team capacity.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Channel Mix Strategy

Define the role and KPI for each channel:

```
Channel Mix Table:
────────────────────────────────────────────────────────────────────────
Channel        Role            Primary KPI      Budget %  Weekly effort
────────────────────────────────────────────────────────────────────────
[Channel 1]   Awareness        Reach / CPM      [%]       [hrs or $]
[Channel 2]   Consideration    CTR / CPC        [%]       [hrs or $]
[Channel 3]   Conversion       CVR / CPA        [%]       [hrs or $]
[Channel 4]   Retention/Nurture Open rate / LTV [%]       [hrs or $]
────────────────────────────────────────────────────────────────────────
Total:                                          100%

Channel sequencing logic:
  Phase 1 — Seed (Week 1–2):    [Organic / content / community — build awareness]
  Phase 2 — Amplify (Week 3–4): [Paid media activates against warmed audience]
  Phase 3 — Convert (Week 5–6): [Retargeting + email — close engaged visitors]
  Phase 4 — Nurture (ongoing):  [Email + community — retain and expand]
```

### Step 2 — Content Matrix

Map every content piece across channel, format, timing, and message:

```
Content Matrix:
────────────────────────────────────────────────────────────────────────────────────
Week  Channel      Format           Topic / Angle              Message pillar  Owner
────────────────────────────────────────────────────────────────────────────────────
W1    [Channel]    [Blog/Ad/Post]   [Title or angle]           [VP 1/2/3]      [Name]
W1    [Channel]    [Email]          [Subject line concept]     [VP 1/2/3]      [Name]
W2    ...
────────────────────────────────────────────────────────────────────────────────────

Content pillar balance target:
  Awareness (educate/entertain):  [%] of content
  Consideration (compare/prove):  [%] of content
  Conversion (offer/close):       [%] of content
```

### Step 3 — Email Nurture Sequence

```
Sequence trigger:  [What action enrolls someone — form fill / download / trial sign-up]
Sequence goal:     [What a "successful" sequence completion looks like]

Email 1 — [Day 0 / trigger day]
  Subject:    [Subject line — high open priority]
  Goal:       Deliver the promised value, establish expectation
  CTA:        [One action]
  Success metric: Open rate target: [%]

Email 2 — [Day 2–3]
  Subject:    [Subject line — teach/inform angle]
  Goal:       Demonstrate value / build trust
  CTA:        [One action — lower friction than Email 1]
  Success metric: Click rate target: [%]

Email 3 — [Day 5–7]
  Subject:    [Subject line — social proof / case study angle]
  Goal:       Reduce risk perception
  CTA:        [Demo / trial / case study]
  Success metric: Reply rate or click rate: [%]

Email 4 — [Day 10–14]
  Subject:    [Subject line — urgency or value recapitulation]
  Goal:       Convert or surface objection
  CTA:        [Direct conversion CTA]
  Success metric: CVR target: [%]

Unsubscribe threshold: If open rate < [%] by Email 2, trigger re-engagement or remove
```

### Step 4 — Paid Media Plan

```
Paid Media Breakdown:
────────────────────────────────────────────────────────────────
Platform      Campaign type   Daily budget   Target CPC/CPM   Goal
────────────────────────────────────────────────────────────────
[Google]      Search          $[X]/day       CPC < $[X]        [N conversions]
[LinkedIn]    Sponsored       $[X]/day       CPM < $[X]        [N leads]
[Meta]        Traffic/Conv    $[X]/day       CPA < $[X]        [N sign-ups]
────────────────────────────────────────────────────────────────

Creative variants per platform:
  [Platform]: [N] ad variants to test — [what varies: headline / image / CTA]

Audience targeting spec:
  Cold:       [New audience — interests / firmographic / keywords]
  Warm:       [Retargeting — site visitors / video viewers / email list]
  Lookalike:  [Based on — existing customers / high-value converters]

Budget pacing rule:
  Spend at [%] of daily budget in first 3 days (learning phase)
  Optimize to top performer after [N] days or [N] conversions
  Kill underperformer rule: < [benchmark] after [N] days → pause
```

### Step 5 — A/B Test Plan

```
Test 1:
  Hypothesis:    "Changing [X] will increase [metric] because [reason]"
  Variable:      [What changes — headline / CTA / image / audience]
  Control:       [Current / default version]
  Variant:       [The change being tested]
  Platform:      [Where the test runs]
  Sample needed: [N impressions or visitors for 90% confidence]
  Duration:      [Minimum days before reading results]
  Decision rule: [Winner needs [%] lift at [confidence %] significance]

Test 2: [Same format]
Test 3: [Same format — maximum 3 concurrent tests to avoid interaction effects]

Testing anti-patterns to avoid:
  □ Don't change two variables at once in the same test
  □ Don't call a winner before statistical significance
  □ Don't run tests over major calendar events that change audience behavior
```

### Step 6 — Budget Model

```
Budget Allocation Model:
────────────────────────────────────────────────────────────────
Category              Budget $    % of total   Owner
────────────────────────────────────────────────────────────────
Paid search            $[X]        [%]          [Name]
Paid social            $[X]        [%]          [Name]
Content production     $[X]        [%]          [Name]
Email tools            $[X]        [%]          [Name]
Design / creative      $[X]        [%]          [Name]
Analytics / tracking   $[X]        [%]          [Name]
Reserve (10%)          $[X]        10%          [Name]
────────────────────────────────────────────────────────────────
Total:                 $[X]        100%

Return model (target):
  Impressions:   [N] at $[CPM] CPM
  Clicks:        [N] at $[CPC] CPC
  Leads:         [N] at $[CPL] CPL
  Conversions:   [N] at $[CPA] CPA
  Revenue:       $[X] at [X]x ROAS
```

### Step 7 — Risk Flags

```
Risk                           Likelihood   Impact   Mitigation
─────────────────────────────────────────────────────────────────────────────
Creative delayed past deadline    [H/M/L]     [H/M/L] [Contingency — simpler format]
Paid channel underperforms        [H/M/L]     [H/M/L] [Reserve budget; shift to organic]
Email deliverability issue        [H/M/L]     [H/M/L] [Pre-warm domain; test send]
Audience too small for targeting  [H/M/L]     [H/M/L] [Broaden filters; use lookalike]
Message misses resonance          [H/M/L]     [H/M/L] [A/B from day 1; pivot in week 2]
```

---

## Final Output
- Channel mix table with roles, KPIs, and budget allocation
- Full content matrix (all pieces × channels × weeks)
- Email nurture sequence (4-email flow with goals and triggers)
- Paid media plan with audience targeting and creative variants
- A/B test plan (3 tests with hypotheses and decision rules)
- Budget model with return projections
- Risk register with mitigations

**Recommended next skill**: `/ds-marketing-content-calendar` — expands the content matrix into a day-by-day production and publishing calendar with owner assignments.
