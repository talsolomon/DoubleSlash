---
name: ds-strategy-strategy-execution
description: Designs the execution system for strategy — RACI, DACI decision rights, governance cadence, OKR tracking, blocker escalation, and communication plan. Use when moving from strategy approval to implementation, or asking "how do we make sure this actually happens". Also triggers on: RACI, owner assignment, governance design, decision rights framework, progress reporting.
tags: [strategy, deliver, strategy-execution, raci, daci, governance, okr-tracking]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Strategy Execution
**Domain**: Strategy | **Phase**: Deliver | **Invocation**: `/ds-strategy-strategy-execution`

## What this produces
A strategy execution system: owner map, RACI/DACI assignments, governance cadence, OKR tracking format, blocker escalation process, and communication plan — everything needed to prevent strategy from dying in implementation.

## Methods
Owner and RACI assignment, DACI decision rights framework, governance cadence design, OKR tracking system, progress reporting design, blocker escalation process, alignment mechanism design, communication plan

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Ownership map | Owner per initiative + monthly review cadence + top 3 risks |
| Tuna | Execution plan | RACI + governance cadence + reporting template |
| Salmon | Execution system | All above + DACI decision rights + escalation process |
| Willy | Operating system | All methods + communication plan + full governance framework |

---

## Execution Prompt

Read the project context: strategic roadmap, organizational structure, key stakeholders, decision authority map, FISH classification.

---

### Step 1 — Ownership Map (all FISH levels)

Every initiative needs one owner. Not a team — a person.

| Initiative | Owner (DRI) | Supporting team | Exec sponsor | Status |
|---|---|---|---|---|
| [Initiative] | [Name] | [Team] | [Exec] | On track / At risk / Blocked |

**DRI (Directly Responsible Individual) rules:**
- One person per initiative — accountability cannot be shared
- DRI has the authority to make decisions within their initiative scope
- DRI is the escalation point before the exec sponsor
- If the DRI changes, formally transfer ownership with a documented handoff

---

### Step 2 — RACI Matrix (Tuna, Salmon, Willy)

RACI clarifies who does what on key activities.

| Activity | [Team A] | [Team B] | [Team C] | [Exec] |
|---|---|---|---|---|
| [Key decision 1] | R | C | I | A |
| [Key decision 2] | A | R | C | I |
| [Milestone delivery] | R | I | — | A |

**RACI definitions:**
- **R** — Responsible: does the work
- **A** — Accountable: owns the outcome (one person per row)
- **C** — Consulted: input needed before decision
- **I** — Informed: notified after decision

**RACI red flags:** more than one A per row (no clear ownership), rows where nobody is R (work with no executor), too many C's (decision-by-committee).

---

### Step 3 — DACI Decision Rights (Salmon, Willy)

DACI clarifies who makes decisions — not who does work (that's RACI).

| Decision | Driver | Approver | Contributors | Informed |
|---|---|---|---|---|
| [Strategic bet pivot] | [DRI] | [Exec sponsor] | [Peer leads] | [Board] |
| [Budget reallocation > $X] | [CFO] | [CEO] | [DRI] | [Leadership] |
| [Hire within initiative] | [DRI] | [Exec sponsor] | [HR] | [Team] |
| [Technical architecture] | [Tech lead] | [CTO] | [Engineering] | [DRI] |

**DACI definitions:**
- **D** — Driver: runs the decision process, gathers input, documents decision
- **A** — Approver: final authority (one person, can veto)
- **C** — Contributors: provide input (no veto)
- **I** — Informed: notified after decision

**Rule:** if a decision doesn't have a clear A, it won't get made. If the A is too senior for the decision, it creates a bottleneck. Calibrate authority to decision frequency and stakes.

---

### Step 4 — Governance Cadence (all FISH levels)

```
Meeting | Purpose | Frequency | Owner | Participants | Length
[DRI Weekly] | Initiative status, unblock blockers | Weekly | DRI | Initiative team | 30 min
[Strategy Ops] | Cross-initiative coordination, resource conflicts | Bi-weekly | COO/PM | All DRIs + exec | 60 min
[Exec Review] | OKR grades, go/no-go, strategic pivots | Monthly | CEO | DRIs + exec team | 90 min
[Board Update] | Strategic progress, key bets, adjustments | Quarterly | CEO | Board | 60 min
```

**Meeting hygiene rules:**
- Every meeting has a pre-read (async) — meeting time is for decisions, not information delivery
- Decisions are documented within 24 hours
- Action items have owners and due dates — not just "the team"
- Cancellation protocol: if the key decision-maker can't attend, reschedule or async

---

### Step 5 — OKR Tracking Format (Tuna, Salmon, Willy)

```
OKR Status Report — [Quarter] [Week/Month]
Owner: [DRI]

Objective: [text]
Overall grade: [0.0–1.0] — [On track / At risk / Off track]

  KR 1: [text]
  Progress: [current value] / [target] = [grade]
  Trend: ↑ On track / → Flat / ↓ Declining
  Commentary: [1 sentence — what's driving progress or why it's stuck]

  KR 2: ...

Blockers: [specific obstacles with owner and due date]
Asks: [what's needed from leadership to unblock]
```

**Grading rule:** grade honestly. A culture of inflated OKR grades destroys the system within 2 cycles. 0.7 is a good result — don't adjust targets retroactively.

---

### Step 6 — Escalation Process (Salmon, Willy)

Define how blockers move up — and when.

```
Tier 1 — DRI resolves (< 1 week): [tactical issues within initiative scope]
Tier 2 — Strategy Ops resolves (< 2 weeks): [cross-team dependencies, resource conflicts]
Tier 3 — Exec escalation (< 48 hours for critical): [budget, headcount, strategic pivot]
Tier 4 — Board / external (as needed): [legal, partnership, market-changing event]

Escalation format:
  Blocker: [what is blocked and why]
  Impact: [what happens if not resolved by [date]]
  Options: [what has been tried / what alternatives exist]
  Ask: [specific decision or resource needed]
```

---

### Final Output

**Ownership map** — DRI per initiative + exec sponsor
**RACI matrix** — for key activities (Tuna+)
**DACI decision rights** — for strategic decisions (Salmon+)
**Governance cadence** — meeting structure with purpose, frequency, participants
**OKR tracking format** — weekly/monthly reporting template (Tuna+)
**Escalation process** — tiers with response SLAs (Salmon+)
**Communication plan** — who hears what, when, through what channel (Willy)
**Recommended next skill** — `/ds-strategy-strategic-review` (quarterly assessment) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
