---
name: ds-product-solution-ideation
description: Generates and ranks solution concepts with trade-off analysis. Use when the problem is clear but the right solution isn't, or when you need to evaluate multiple directions before committing. Also triggers on: Crazy 8s, SCAMPER, analogical thinking, worst possible idea, Rose/Bud/Thorn, co-design session, build/buy/partner analysis.
tags: [product, develop, ideation, concepts, trade-offs]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Solution Ideation
**Domain**: Product | **Phase**: Develop | **Invocation**: `/ds-product-solution-ideation`

## What this produces
3–5 distinct solution concepts with trade-off analysis, a 2×2 evaluation, and a single recommended direction with explicit rationale. On Salmon/Willy: co-design facilitation guide, assumption poker results, and build/buy/partner analysis.

## Methods
Crazy 8s, design studio facilitation, analogical thinking, SCAMPER, worst possible idea (reverse brainstorming), Rose/Bud/Thorn, co-design session, concept sketching, assumption poker, impact/effort matrix, 2×2 prioritization, concept sprint, solution narrative, build/buy/partner analysis

## FISH Guide
| Fish | Depth | What runs |
|---|---|---|
| Nemo | Fast ideation | Crazy 8s → impact/effort 2×2 → one recommendation |
| Tuna | Structured ideation | SCAMPER + Crazy 8s → 2×2 evaluation → solution narratives → recommendation |
| Salmon | Deep ideation | Analogical thinking + Rose/Bud/Thorn + assumption poker → concept sprint → recommendation |
| Willy | Org-wide ideation | All methods + co-design facilitation guide + build/buy/partner analysis |

---

## Execution Prompt

Read the project context: the problem statement, HMW statement, POV, and north star metric from Define phase. FISH classification. Any constraints already established (timeline, team size, technology stack, budget).

---

### Step 1 — Crazy 8s (all FISH levels)

Generate 8 distinct solution concepts in rapid sequence. Rules:
- Each concept must be meaningfully different — not a variation of the same idea
- Each concept is described in 2–3 sentences: what it is, the core mechanism, the key assumption it rests on
- Range: from obvious to radical. Include at least one concept that feels too simple and one that feels too ambitious.

Number them 1–8. No evaluation yet — just generate.

**Constraint to enforce diversity** — each concept must come from a different angle:
1. The minimal version — what's the smallest thing that could solve this?
2. The platform play — solve the problem by becoming the infrastructure others build on
3. The community play — solve it through network effects or peer-to-peer
4. The automation play — solve it by eliminating the step entirely
5. The analog play — solve it with no technology at all
6. The adjacent steal — what company in a different industry solved a similar problem? Steal their model.
7. The inverse — what if you solved the opposite problem?
8. The 10× version — if resources were unlimited, what would you build?

---

### Step 2 — SCAMPER (Tuna, Salmon, Willy)

Apply SCAMPER to the #1 concept from Crazy 8s to generate variants:

- **S — Substitute**: What component could be replaced with something better or cheaper?
- **C — Combine**: What could be merged with another product, process, or concept?
- **A — Adapt**: What from another industry or context could be adapted here?
- **M — Modify/Magnify**: What happens if you double the most important attribute? What if you make one step 10× easier?
- **P — Put to other use**: Could this solution solve a different but adjacent problem simultaneously?
- **E — Eliminate**: What could be completely removed without breaking the core value?
- **R — Reverse/Rearrange**: What if the sequence were reversed? What if the user and the system switched roles?

Each SCAMPER prompt produces one new concept or a meaningful variant. Capture the top 3 variants worth considering.

---

### Step 3 — Analogical Thinking (Salmon, Willy)

Find solutions that already work in adjacent domains, then transplant the mechanism.

**Process:**
1. Name the core mechanism of the problem (e.g., "users need to coordinate without a shared context")
2. Find 3 domains where a similar mechanism exists (e.g., air traffic control, surgical handoffs, relay racing)
3. For each analog: what's the solution mechanism? What makes it work? What's the key insight?
4. Transplant the insight: "If we applied [analog's mechanism] to [our problem], we'd get [concept]"

---

### Step 4 — Worst Possible Idea (optional, Tuna+)

Name the 3 worst possible solutions to this problem — ideas designed to fail, frustrate users, or miss the point entirely.

Then invert each one: what's the opposite of this bad idea? Inversions often surface the actual insight.

Example:
- Worst idea: "Make users manually re-enter their data every session"
- Inversion: "Never ask users to re-enter data they've given before" → persistent context layer

---

### Step 5 — 2×2 Evaluation (all FISH levels)

Score all concepts from Crazy 8s + SCAMPER on two axes:

**User Value** (1–5): How completely does this solve the core problem for the primary user?
**Feasibility** (1–5): How achievable is this with current resources and constraints?

Plot on a 2×2:
- High Value, High Feasibility → **Do it** (primary candidates)
- High Value, Low Feasibility → **Worth exploring** (research/validate first)
- Low Value, High Feasibility → **Easy but weak** (fast win, but won't move north star)
- Low Value, Low Feasibility → **Drop** (not now)

---

### Step 6 — Rose / Bud / Thorn (Salmon, Willy)

For the top 3 concepts from the 2×2:

| Concept | Rose (what's working) | Bud (what has potential if X were true) | Thorn (what's risky or problematic) |
|---|---|---|---|

The Bud column is the most useful — it surfaces the key assumption or condition that must be true for the concept to work. These become the inputs to Assumption Poker.

---

### Step 7 — Assumption Poker (Salmon, Willy)

For the top 2 concepts, surface and rank assumptions:

| Assumption | How critical (1–5) | How uncertain (1–5) | Risk score (C × U) | How to validate |
|---|---|---|---|---|

Risk score = Criticality × Uncertainty. Highest score = test first.

Assumptions with Risk Score > 16: must be validated before committing to this concept.

---

### Step 8 — Build / Buy / Partner Analysis (Willy only)

For the recommended concept:

| Component | Build | Buy/License | Partner |
|---|---|---|---|
| [Core capability] | Full control, high cost, slow | [Vendor options] | [Partner options] |

Recommendation: which components to build, which to acquire, which to partner on — with rationale.

---

### Step 9 — Solution Narratives (Tuna, Salmon, Willy)

Write a solution narrative for the top 3 concepts — a 3-sentence story that makes the concept concrete:

> **[Persona]** is trying to **[job/goal]**. They encounter **[current pain point]**. With **[this solution]**, they can now **[outcome]** — which means **[north star metric impact]**.

This is the test: can someone who didn't attend the ideation session understand what the concept is and why it matters?

---

### Step 10 — Recommendation (all FISH levels)

Name one concept. Make the case explicitly.

Format:
```
## Recommendation: [Concept name]

What it is: [1 sentence]
Why this one: [connects to problem statement, north star, and top user need]
What it trades away: [explicit trade-offs — what this approach gives up]
Key assumption to validate: [the single most important thing that must be true]
First test: [smallest possible experiment to validate the core assumption]
```

---

### Co-Design Facilitation Guide (Willy only)

If stakeholder alignment is needed before committing to a direction, produce a facilitation guide for a co-design workshop:

**Session structure (90 min):**
- 0:00 — Context framing: problem statement + north star (10 min)
- 0:10 — Individual Crazy 8s (8 min timed sketch)
- 0:18 — Gallery walk: present concepts, dot-vote favorites
- 0:30 — Team Crazy 8s: merge and extend top concepts (15 min)
- 0:45 — Solution narrative writing (each team writes theirs)
- 1:00 — Structured critique: Rose/Bud/Thorn per concept
- 1:20 — Weighted voting: each person allocates 10 points across concepts
- 1:30 — Decision and next steps

---

### Final Output

**8 concepts** (Crazy 8s output)
**SCAMPER variants** — top 3 (Tuna+)
**2×2 evaluation** — all concepts scored and plotted
**Rose/Bud/Thorn** — top 3 concepts (Salmon+)
**Assumption Poker results** — top risks with validation approach (Salmon+)
**Solution narratives** — top 3 concepts (Tuna+)
**Build/Buy/Partner analysis** (Willy)
**Recommendation** — one concept, with rationale, trade-offs, and first test
**Recommended next skill** — `/ds-product-requirements-definition` with one-sentence reason
