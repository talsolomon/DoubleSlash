---
name: ds-engineering-incident-retrospective
description: Runs a blameless post-incident review — SEV classification, timeline reconstruction, 5 Whys root cause analysis, SLO error budget impact, and action items with owners. Use after an outage, production issue, or data incident, or when asking "what happened and how do we prevent it". Also triggers on: blameless post-mortem, 5 Whys, SLO error budget, MTTR analysis, detection gap analysis.
tags: [engineering, deliver, incident-retrospective, postmortem, 5-whys, slo, sev, blameless]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Incident Retrospective
**Domain**: Engineering | **Phase**: Deliver | **Invocation**: `/ds-engineering-incident-retrospective`

## What this produces
A blameless post-incident report: SEV classification, impact quantification, timeline with contributing factors, 5 Whys root cause analysis, SLO error budget impact, detection and response gaps, and concrete action items with owners and due dates.

## Methods
SEV classification, incident summary, blameless timeline reconstruction, contributing factor analysis, 5 Whys root cause analysis, SLO error budget calculation, detection gap analysis, response effectiveness review, action item generation, monitoring improvement plan, runbook update

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick retro | Timeline + 5 Whys + top 3 action items |
| Tuna | Full post-mortem | SEV + summary + timeline + root cause + action items |
| Salmon | Deep analysis | All above + SLO impact + detection gaps + response review |
| Willy | Systematic review | All methods + contributing factors + monitoring improvements + runbook update |

---

## Execution Prompt

Read the project context: incident description, timeline of events, customer impact, what was done to detect and resolve, FISH classification. Maintain blameless framing throughout — systems and processes fail, not people.

---

### Step 1 — SEV Classification (all FISH levels)

Classify the incident immediately. The SEV determines urgency of the retrospective and depth of the RCA.

| SEV | Definition | Examples | Retrospective timeline |
|---|---|---|---|
| **SEV 1** | Total service outage — all users impacted, no workaround | Site is down, payments failing for all users, data loss | Within 24 hours |
| **SEV 2** | Major degradation — significant user impact, partial outage | Core feature unavailable for > 20% of users, SLA breach | Within 48 hours |
| **SEV 3** | Minor degradation — some users impacted, workaround exists | Slow performance, non-critical feature failing, elevated error rate | Within 1 week |
| **SEV 4** | Low impact — edge case, single user, no SLA impact | One user's data stuck, UI glitch in edge case | Within 2 weeks |

**Classification criteria:**
- User impact (% affected × severity of their experience)
- Duration of impact
- Revenue or SLA impact
- Data integrity risk (even 1 user's data loss = SEV 1)

---

### Step 2 — Incident Summary (all FISH levels)

One-page summary. Every stakeholder reads this — write for a non-engineer.

```
## Incident Summary

Date: [YYYY-MM-DD]
Duration: [HH:MM] — from first user impact to full resolution
SEV: [1/2/3/4]
Status: Resolved / Monitoring / Ongoing

What happened (one paragraph):
[What failed, what the user experience was, how it was detected, how it was resolved.
Write for a non-engineer. No jargon.]

Impact:
  Users affected: [N users or X% of active users]
  Duration: [HH:MM of user-visible impact]
  Revenue impact: [$X] [or "unknown — estimating"]
  SLA impact: [Yes/No — [X] minutes over SLA window]
  Data integrity: [No data loss / N records affected / Unknown]

Detection:
  How discovered: [Monitoring alert / User report / Support ticket / Internal notice]
  Time to detect: [minutes from start to detection]

Resolution:
  How resolved: [what action ended the incident]
  Time to resolve (MTTR): [minutes from detection to resolution]
```

---

### Step 3 — Blameless Timeline (all FISH levels)

Reconstruct the full sequence of events. Format: timestamp, event, who was involved.

**Blameless framing rules:**
- Record what happened, not who caused it
- Replace "X made a mistake" → "change X was deployed"
- Replace "Y didn't notice" → "no alert fired for Y condition"
- If a person's action is relevant, describe the system state that led to the action

```
Timeline:

[HH:MM] [Action / Event]
[HH:MM] [Monitoring alarm / log spike / user report]
[HH:MM] [On-call paged]
[HH:MM] [On-call begins investigation]
[HH:MM] [Hypothesis formed: [description]]
[HH:MM] [Hypothesis tested: [result]]
[HH:MM] [Root cause identified: [description]]
[HH:MM] [Mitigation applied: [action]]
[HH:MM] [Impact reduced: [from X% to Y% error rate]]
[HH:MM] [Full resolution: [action]]
[HH:MM] [All-clear declared]

Notable gaps:
  [HH:MM – HH:MM]: [X minutes with no progress — why? what was the blocker?]
```

The gaps are as important as the events — they reveal where the team was stuck, which reveals where to invest in tooling, runbooks, or observability.

---

### Step 4 — 5 Whys Root Cause Analysis (all FISH levels)

The 5 Whys drills through symptoms to the systemic root cause. Stop when you reach a process, tooling, or design decision that a person could change.

**Rules:**
- Don't stop at the first "why" that sounds like a cause — keep asking
- The answer to each "why" is the problem statement for the next "why"
- Multiple branches are valid — an incident often has multiple contributing root causes
- The root cause must be actionable — if you can't do anything about it, keep going

**Format:**
```
Symptom: [what users experienced]

Why 1: Why did users experience [symptom]?
→ [Cause 1 — the technical failure]

Why 2: Why did [Cause 1] happen?
→ [Cause 2 — one level deeper]

Why 3: Why did [Cause 2] happen?
→ [Cause 3 — design or process level]

Why 4: Why did [Cause 3] happen?
→ [Cause 4 — organizational level]

Why 5: Why did [Cause 4] happen?
→ Root cause: [systemic issue — process, tooling, design decision]

Action: [what changes to address the root cause — not the symptom]
```

**Example:**
```
Symptom: Payments failing for 23 minutes

Why 1: Why did payments fail?
→ The payment service returned 500 errors

Why 2: Why did the payment service return 500 errors?
→ It couldn't connect to the database connection pool (pool exhausted)

Why 3: Why was the connection pool exhausted?
→ A slow query was holding connections, preventing new requests from connecting

Why 4: Why was a slow query running?
→ A missing index on payments.user_id caused a full table scan under load

Why 5: Why was the index missing?
→ The index was dropped during the schema migration 3 days prior — the migration was not tested at production data volume

Root cause: Migrations are not load-tested against production data volume before deployment
Action: Add mandatory load test step to migration runbook, gated by CI check
```

For complex incidents: run 5 Whys on each contributing cause separately. Multiple root causes are the norm, not the exception.

---

### Step 5 — SLO Error Budget Impact (Salmon, Willy)

Incidents consume error budget. If error budget is exhausted, all feature work stops until reliability is restored.

**SLO calculation:**
```
SLO target: [X]% availability (e.g., 99.9%)
Error budget: 100% - 99.9% = 0.1% = [N minutes/month downtime allowed]

This incident:
  Duration of user-impacting downtime: [X minutes]
  % of users impacted: [Y%]
  Weighted impact: [X minutes × Y%] = [Z error-budget-minutes]

Error budget consumed this incident: [Z / total budget] = [A]%
Error budget consumed this month: [B]% (before this incident)
Remaining error budget: [100 - B - A]%

Status:
  [ ] Budget healthy — can continue feature work
  [ ] Budget < 25% remaining — slow down, prioritize reliability work
  [ ] Budget exhausted — feature freeze until next SLO window
```

**If budget is exhausted:**
- Engineering leadership must be notified
- All non-reliability work pauses
- The team commits to one reliability sprint before the next feature cycle
- The SLO may need to be renegotiated (are the targets realistic given current architecture?)

---

### Step 6 — Detection and Response Gap Analysis (Salmon, Willy)

Every incident reveals gaps in detection and response. Name them explicitly.

**Detection gaps:**
| Gap | What should have happened | What actually happened | Fix |
|---|---|---|---|
| [e.g., Alert not fired] | Alert on connection pool > 80% | No alert configured for pool usage | Add alert: pool_utilization > 80% for 2 min |
| [e.g., Alert too noisy] | Engineer responds to alert | Alert was suppressed after 47 false positives | Tune alert threshold, add jitter filter |
| [e.g., User reported before team knew] | Team detects before users do | User filed support ticket first | Synthetic monitoring on core payment flow |

**Response gaps:**
| Gap | What slowed resolution | Fix |
|---|---|---|
| [e.g., No runbook] | 15 min debugging what to check first | Write runbook for connection pool exhaustion |
| [e.g., No access] | On-call couldn't access production DB | Add read-only prod DB access to on-call toolbox |
| [e.g., Wrong escalation] | Wrong team paged | Update PagerDuty routing rules |

**Time stolen by tooling gaps** (quantify the waste):
```
Time from detection to root cause: [X minutes]
  Investigation tooling friction: [Y minutes] — [what was slow]
  Access/permission delays: [Z minutes] — [what required manual steps]
  Time saved if tooling improved: [X - Y - Z minutes] → target for next incident
```

---

### Step 7 — Action Items (all FISH levels)

Every root cause gets at least one action item. Action items without owners are not action items.

| # | Action | Category | Owner | Due | Done when |
|---|---|---|---|---|---|
| 1 | [e.g., Add alert on connection pool utilization > 80%] | Observability | [name] | [date] | Alert fires in staging |
| 2 | [e.g., Write runbook for DB connection pool exhaustion] | Runbook | [name] | [date] | Runbook merged to docs repo |
| 3 | [e.g., Add connection pool metrics to on-call dashboard] | Observability | [name] | [date] | Dashboard live |
| 4 | [e.g., Add load test for migrations to CI pipeline] | Testing | [name] | [date] | CI blocks merge without passing load test |

**Action item quality bar:**
- "Done when" must be testable — not "investigate" or "improve"
- Owner is a person, not a team
- Due date is within 30 days — if it'll take longer, break it down
- At least one action per root cause
- At least one action to improve detection speed
- At least one action to improve MTTR

**Follow-up in sprint planning:**
- Action items enter the backlog immediately after the retrospective
- All SEV1/SEV2 action items are prioritized in the next sprint
- Status is reviewed at the next retrospective

---

### Final Output

**SEV classification** — with impact criteria
**Incident summary** — one-page, non-engineer readable, impact quantified
**Blameless timeline** — with annotated gaps
**5 Whys RCA** — root cause(s) identified, actionable
**SLO error budget impact** — consumed vs. remaining budget (Salmon+)
**Detection gap analysis** — what should have fired, didn't, and why (Salmon+)
**Response gap analysis** — what slowed MTTR and how to fix it (Salmon+)
**Action items** — with owner, due date, and "done when" criteria
**Monitoring/alerting improvements** — specific new alerts and dashboards (Willy)
**Runbook update** — updated runbook committed (Willy)
**Recommended next skill** — `/ds-engineering-deployment-planning` (if fix requires a deploy) or `/ds-engineering-system-audit` (if this incident revealed systemic gaps) with one-sentence reason
