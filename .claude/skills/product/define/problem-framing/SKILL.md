---
name: ds-product-problem-framing
description: Turns research into a precise, buildable problem statement with HMW, POV, RICE score, and north star metric. Use when the problem feels fuzzy, the team is misaligned, or before writing any requirements. Also triggers on: HMW reframing, POV statement writing, 5 Whys root cause analysis, insight clustering, opportunity scoring (RICE, ICE, WSJF, Kano).
tags: [product, define, hmw, pov, rice, north-star]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# Problem Framing
**Domain**: Product | **Phase**: Define | **Invocation**: `/ds-product-problem-framing`

## What this produces
One sharp problem statement, one north star metric, an opportunity score, three success criteria, and a clear recommendation into the Develop phase.

## Methods
HMW (How Might We) reframing, POV statement writing, 5 Whys root cause analysis, fishbone diagram, insight clustering, opportunity scoring (RICE, ICE, WSJF, Kano), north star metric definition, success criteria definition, assumption mapping, user need hierarchy, problem statement synthesis

## FISH Guide
| Fish | Depth | What runs |
|---|---|---|
| Nemo | Fast frame | HMW → POV statement → ICE score → north star metric |
| Tuna | Full frame | 5 Whys → HMW reframes → POV → RICE score → north star → assumption mapping |
| Salmon | Deep frame | 5 Whys → insight clustering → HMW → POV → full opportunity scoring → success criteria → assumption map |
| Willy | Org-wide frame | All methods + Kano model + user need hierarchy + stakeholder alignment framing |

---

## Execution Prompt

Read the project context: the discovery output (problem list, user segments, insight themes), FISH classification, and any prior framing attempts in memory.

---

### Step 1 — Root Cause (Tuna, Salmon, Willy only; skip for Nemo)

**5 Whys** on the #1 problem from discovery:

Apply 5 Whys iteratively. Start with the surface problem. Ask "why does this happen?" five times. Each answer becomes the next "why." The goal is to arrive at a root cause that is addressable — not a symptom.

Format:
```
Problem: [surface statement from discovery]
Why 1: [first cause]
Why 2: [cause of cause 1]
Why 3: [cause of cause 2]
Why 4: [cause of cause 3]
Why 5 (root): [addressable root cause]
```

**Salmon/Willy only — Fishbone (Ishikawa):**
Map contributing causes across 4–6 categories (People, Process, Technology, Environment, Policy, Measurement). This surfaces structural causes the 5 Whys may miss. One cause per bone. Most important 3 causes identified.

---

### Step 2 — Insight Clustering (Salmon, Willy only; skip for Nemo/Tuna)

Group all discovery themes into a 2×2: Impact (how much it matters to users) × Frequency (how often it occurs). Label each quadrant:
- High Impact, High Frequency → **Primary focus**
- High Impact, Low Frequency → **Edge case worth designing for**
- Low Impact, High Frequency → **Table stakes (must not break)**
- Low Impact, Low Frequency → **Out of scope**

Confirm the #1 problem from discovery lands in the Primary Focus quadrant. If not, flag it.

---

### Step 3 — HMW Reframes

Generate 5 (Nemo: 3) HMW statements from the root cause. Rules for good HMW:
- Not too broad ("How might we improve healthcare?") — not solvable
- Not too narrow ("How might we add a button?") — not inspiring
- Implies a real problem without prescribing a solution
- Starts with the user's need or struggle

Format: "How might we [help user] [achieve goal / overcome obstacle] [without [constraint]]?"

Star the single strongest HMW — the one that opens the most valuable solution space without over-constraining.

---

### Step 4 — POV Statement

Write the Point of View statement using this structure:

> **[User description]** needs **[need]** because **[surprising insight]**.

Rules:
- User description: specific, not generic ("a mid-level product manager at a 50-person startup" not "a user")
- Need: a verb, not a feature ("a way to understand," "the ability to see," not "a dashboard")
- Insight: the non-obvious truth from discovery — the "because" that makes the statement defensible

Write one POV per major user segment (max 3).

---

### Step 5 — Opportunity Score

**Nemo/Tuna — ICE Score:**
Score the top problem on three dimensions (1–10 each):
- **Impact**: how much does solving this improve the user's life or work?
- **Confidence**: how certain are we this is the real problem (based on discovery evidence)?
- **Ease**: how achievable is a solution with available resources?

ICE = (Impact × Confidence × Ease) / 100. Score out of 10.

**Tuna/Salmon — RICE Score:**
- **Reach**: how many users are affected per quarter? (absolute number)
- **Impact**: per-user impact if solved (Massive=3, High=2, Medium=1, Low=0.5, Minimal=0.25)
- **Confidence**: % confidence the estimates are accurate (100%=certain, 80%=high, 50%=medium)
- **Effort**: person-months of work to solve

RICE = (Reach × Impact × Confidence) / Effort

**Willy only — also run Kano Model:**
Classify the top 5 problems as: Basic (must-have), Performance (linear satisfaction), Excitement (delighter), Indifferent, or Reverse. This identifies which problems to solve for retention vs. acquisition.

---

### Step 6 — North Star Metric

Define one north star metric — the single number that goes up when users are getting real value from the solution.

Rules for a good north star:
- Measures user value, not business output ("weekly active jobs completed" not "DAU" or "revenue")
- Moves in response to product decisions
- Is understandable to the whole team without explanation
- Has a current baseline (even estimated) and a target

Format:
```
North Star Metric: [metric name]
Definition: [exactly what gets counted]
Current baseline: [number or "unknown — must measure"]
Target (6 months): [number]
Why this metric: [one sentence connecting it to the core user value]
```

---

### Step 7 — Success Criteria (Salmon, Willy only)

Three testable success criteria — statements that, if true after launch, confirm the problem was solved:

Format: "We'll know this worked when [observable outcome] by [timeframe]."

Each criterion must be:
- Measurable (not "users are happier")
- Time-bound
- Tied to the north star metric or a leading indicator of it

---

### Step 8 — Assumption Mapping (Tuna, Salmon, Willy only)

List the 5 most important assumptions this problem framing rests on. For each:

| Assumption | Why we believe it | Risk if wrong (High/Med/Low) | How to validate |
|---|---|---|---|

Flag the 2 highest-risk assumptions as "must validate before building."

---

### Final Output

**Problem Statement** — one sentence, tightest possible version of the problem
**Starred HMW** — the single HMW that opens the right solution space
**POV Statement(s)** — one per major segment, max 3
**Opportunity Score** — ICE or RICE with numbers shown
**North Star Metric** — defined, baselined, targeted
**Success Criteria** — 3 testable statements (Salmon/Willy)
**Top 2 risky assumptions** — with validation approach (Tuna/Salmon/Willy)
**Recommended next skill** — `/ds-product-solution-ideation` or `/ds-product-requirements-definition` with one-sentence reason
