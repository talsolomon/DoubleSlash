---
name: ds-product-launch-planning
description: Creates a complete GTM and launch plan — rollout, flags, success metrics, risk assessment. Use when shipping to users, planning a beta, preparing for a product launch, or asking "how do we get this out". Also triggers on: GTM strategy, launch checklist, rollout plan, feature flag strategy, beta program design, stakeholder communication plan.
tags: [product, deliver, gtm, launch, rollout, risk]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Launch Planning
**Domain**: Product | **Phase**: Deliver | **Invocation**: `/ds-product-launch-planning`

## What this produces
A complete, executable launch plan. On Nemo: checklist + 3 metrics + go/no-go. On Tuna: GTM strategy + rollout phases + metrics. On Salmon/Willy: full GTM with beta program, comms cascade, feature flag strategy, and risk-adjusted rollout.

## Methods
GTM strategy, launch checklist, rollout plan, feature flag strategy, beta program design, stakeholder communication plan, success metrics definition, post-launch review framework, soft launch vs. hard launch decision, launch risk assessment

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Lean launch | Soft/hard launch decision + launch checklist + 3 success metrics + top 3 risks |
| Tuna | Full GTM | GTM strategy + phased rollout + success metrics + comms plan + risk assessment |
| Salmon | Beta-first | Beta program design + staged rollout + feature flags + stakeholder comms cascade |
| Willy | Enterprise launch | All above + exec comms + channel partner alignment + post-launch review framework |

---

## Execution Prompt

Read the project context: what is being launched (feature, product, or update), the target user segment, the north star metric and OKRs from the roadmap, any constraints (compliance, phased rollout requirements, external commitments), FISH classification.

---

### Step 1 — Soft Launch vs. Hard Launch Decision (all FISH levels)

Before planning anything, answer: should this be a soft launch (limited rollout, iterate) or hard launch (full availability, announce publicly)?

**Soft launch when:**
- Core assumptions haven't been validated with real users yet
- The feature has significant edge cases not covered in testing
- You need real-world data before committing to a full rollout
- The product is B2B and you want reference customers before going broad

**Hard launch when:**
- Requirements are fully validated, all edge cases handled
- Marketing and GTM are coordinated and ready
- A competitor is shipping or the timing is strategically important
- The feature is additive (no breaking changes, no migration risk)

State the decision and the one-sentence rationale.

---

### Step 2 — GTM Strategy (Tuna, Salmon, Willy)

The GTM strategy answers: who, what, where, when, and how.

```
## GTM Strategy

Who: [exact segment — not "users," but the specific profile who gets value first]
  Primary: [early adopter profile from discovery]
  Secondary: [next segment after traction]

What: [the one promise — what changes for the user because of this launch]
  Before: [what the user's situation is now]
  After: [what their situation is after adopting]
  Proof: [what evidence supports this promise — metric, beta feedback, case study]

Channel: [where and how you reach this user]
  Owned: [email, in-product, blog — and what message in each]
  Earned: [PR, word of mouth, community — how you create conditions for it]
  Paid: [if applicable — channel, budget, targeting]

Timing:
  Soft launch / beta: [date]
  GA / public launch: [date]
  Key milestone that gates the transition: [condition, not just a date]

Pricing:
  Model: [free / paid / freemium / usage-based]
  Rationale: [why this model for this segment]
  If changing: [migration plan for existing users]
```

---

### Step 3 — Rollout Phases (Tuna, Salmon, Willy)

Define explicit rollout gates. Each phase has: who gets access, what you're measuring, and what must be true to advance.

**Phase 1 — Alpha (internal / trusted users)**
- Who: [internal team / specific beta cohort]
- Duration: [X days/weeks]
- What you're measuring: [core flow completion, error rate, support volume]
- Gate to Phase 2: [specific threshold — e.g., "< 2% error rate, 80% completion on core flow"]

**Phase 2 — Beta (Salmon/Willy only)**
- Who: [how many users, selection criteria]
- Duration: [X weeks]
- Beta program: [how users are invited, what's expected of them, feedback mechanism]
- What you're measuring: [retention, NPS, time-to-value, support load]
- Gate to GA: [specific threshold]

**Phase 3 — General Availability**
- Rollout speed: [immediate 100% / gradual % ramp / regional]
- Feature flag strategy (Salmon/Willy): [flag name, % rollout per day, kill switch owner]
- Announcement: [blog, email, in-product, press — with dates]

---

### Step 4 — Feature Flag Strategy (Salmon, Willy)

If using feature flags for rollout control:

```
Flag name: [flag-name-in-code]
Default: [on/off]
Rollout: [0% → 10% → 50% → 100%] over [X days]
Kill switch owner: [person responsible for rollback]
Rollback trigger: [specific metric threshold that triggers rollback]
Sunset date: [when the flag is removed and the feature is permanent]
```

**Rollback decision criteria** — name the exact conditions that trigger an automatic flag-off:
- Error rate exceeds [X]%
- [Critical metric] drops below [threshold]
- [Support volume] exceeds [N] tickets/day

---

### Step 5 — Launch Checklist (all FISH levels)

A launch checklist is only useful if every item has an owner and a done-by date.

**Pre-launch (complete before any users see this):**
- [ ] All acceptance criteria passing — [owner]
- [ ] Definition of Done fully met — [owner]
- [ ] Analytics events firing and verified — [owner]
- [ ] Error monitoring configured — [owner]
- [ ] Support documentation written — [owner]
- [ ] Feature flag configured (if applicable) — [owner]
- [ ] Rollback plan documented and tested — [owner]
- [ ] Legal/compliance review complete (if applicable) — [owner]

**Launch day:**
- [ ] Deployment complete — [owner]
- [ ] Smoke test on production — [owner]
- [ ] Comms sent (email, in-product, blog) — [owner]
- [ ] Support team briefed — [owner]
- [ ] Dashboard live and being monitored — [owner]

**Post-launch (24–72 hours):**
- [ ] Check core metrics vs. baseline — [owner]
- [ ] Read first batch of support tickets — [owner]
- [ ] Check error rates — [owner]
- [ ] Confirm analytics data is clean — [owner]

**Nemo**: use just Pre-launch + Launch Day lists.

---

### Step 6 — Success Metrics (all FISH levels)

Define metrics before launch. A metric you define after launch is a rationalization.

**North Star check**: confirm the north star metric from Define phase is being measured at launch.

**Quantitative metrics (3 for Nemo, 5 for Tuna+):**

| Metric | Baseline | Target (30 days) | Target (90 days) | Measurement method |
|---|---|---|---|---|
| [North star metric] | [current] | [+X%] | [+Y%] | [how it's tracked] |
| [Adoption metric] | — | [X% of eligible users] | [Y% of eligible users] | [analytics event] |
| [Quality metric] | — | [error rate < X%] | [< Y%] | [error monitoring] |

**Qualitative signals (Tuna+):**
- NPS / CSAT: measure at [X] days post-launch, target [score]
- Qualitative feedback channel: [how you collect it — in-product, support tags, user interviews]
- Leading indicator: [the signal that shows up before the north star metric moves]

---

### Step 7 — Stakeholder Comms Plan (Salmon, Willy)

Who needs to know what, when, and through which channel.

| Audience | What they need to know | Channel | Timing | Owner |
|---|---|---|---|---|
| Exec team | Business outcome, risk, metrics | Async update | [X days before] | PM |
| Engineering | Technical rollout, flag config, on-call | Slack / docs | [X days before] | TL |
| Support | Feature overview, FAQ, escalation path | Sync session | [X days before] | PM |
| Sales (Willy) | Customer-facing story, objection handling | Sales brief | [X days before] | PM |
| Customers | What's new and why it matters | Email / in-product | Launch day | Marketing |

**Willy only — cascade:** exec comms → team comms → customer comms. Write the one-paragraph version of each.

---

### Step 8 — Launch Risk Assessment (all FISH levels)

| Risk | Probability (H/M/L) | Impact (H/M/L) | Mitigation | Trigger for rollback |
|---|---|---|---|---|
| [Core flow breaks under load] | M | H | Load test before GA, flag-based rollout | Error rate > X% |
| [Users don't adopt] | M | M | In-product onboarding, email campaign | Activation rate < Y% at 14 days |
| [Data migration fails] | L | H | Dry-run migration, manual fallback documented | Any data loss detected |

Flag all High Impact risks regardless of probability — they need mitigation before launch, not after.

---

### Final Output

**Soft/Hard launch decision** — with rationale
**GTM Strategy** — who, what, channel, timing, pricing (Tuna+)
**Rollout phases** — with gates and measurement criteria (Tuna+)
**Feature flag strategy** — with kill switch and rollback triggers (Salmon+)
**Launch checklist** — with owners (all levels)
**Success metrics** — pre-defined, with baselines and targets
**Comms plan** — per audience with channel and timing (Salmon+)
**Risk assessment** — with mitigation per risk
**Recommended next skill** — `/ds-product-product-retrospective` — with one-sentence reason (run 30 days post-launch)
