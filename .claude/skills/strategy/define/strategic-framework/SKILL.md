---
name: ds-strategy-strategic-framework
description: Builds a strategic framework — vision, mission, Roger Martin's where-to-play/how-to-win cascade, OKR framework, and theory of change. Use when setting direction for a year or more, aligning leadership, or asking "what are we trying to achieve and how". Also triggers on: strategic choice cascade, theory of change, balanced scorecard, OKR design.
tags: [strategy, define, strategic-framework, where-to-play, how-to-win, okr, theory-of-change]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# Strategic Framework
**Domain**: Strategy | **Phase**: Define | **Invocation**: `/ds-strategy-strategic-framework`

## What this produces
A strategic framework with vision, mission, where-to-play/how-to-win choices, strategic priorities with bets, OKR cascade, and theory of change — the architecture for all decisions over the planning horizon.

## Methods
Vision and mission articulation, Roger Martin's strategic choice cascade (where-to-play / how-to-win), OKR framework design, theory of change, balanced scorecard, strategic priority setting, strategic bet definition

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Direction statement | Vision + mission + 3 priorities |
| Tuna | Strategic framework | Where-to-play/how-to-win + priorities + OKRs |
| Salmon | Full framework | All above + theory of change + strategic bets |
| Willy | Board-ready strategy | All methods + balanced scorecard + full OKR cascade |

---

## Execution Prompt

Read the project context: competitive analysis, strategic landscape, scenario planning results, organizational context, FISH classification.

---

### Step 1 — Vision and Mission (all FISH levels)

**Vision:** the future state the organization is trying to create. 10-year ambition. Emotionally resonant.
- Not: "To be the leading provider of X"
- Yes: "A world where [people can X / X is no longer a problem / everyone has access to X]"

**Mission:** what the organization does, for whom, and to what end. Operating statement.
- Format: "We [action] for [audience] so that [outcome]."
- This should be achievable and renewable, not a destination

**Test:**
- Does the vision make people want to work toward it? (Motivating)
- Does the mission rule things out? (Clear enough to decline opportunities that don't fit)

---

### Step 2 — Strategic Choice Cascade (Roger Martin) (Tuna, Salmon, Willy)

Strategy is a set of integrated choices that cascade from vision to activity.

```
1. Winning aspiration: [what does winning look like in 3–5 years?]
   Metric: [how you'll know you've won — specific and measurable]

2. Where to play: [which arenas will you compete in?]
   Geography: [which markets / regions]
   Customer segment: [who specifically]
   Product/service category: [what specifically]
   Stage of value chain: [which activities]
   NOT playing: [explicit exclusions — as important as inclusions]

3. How to win: [what gives you the right to win in those arenas?]
   Competitive advantage: [cost leadership / differentiation / focus]
   Core capability: [the 1-2 things you must be world-class at]
   Moat: [what makes this advantage durable and hard to copy]

4. Required capabilities: [what must exist for the strategy to work?]
   Have: [existing capabilities that enable the strategy]
   Need: [gaps that must be built or acquired]

5. Management systems: [what processes and metrics must change to support the strategy?]
```

**Cascade test:** can you explain how activity at level 5 connects to the winning aspiration at level 1? If the chain breaks anywhere, the strategy isn't integrated.

---

### Step 3 — Strategic Priorities and Bets (all FISH levels)

From the strategic choice cascade, derive 3–5 priorities for the planning horizon.

**Priority format:**
```
Priority: [Active verb + outcome — e.g., "Win the enterprise segment in EMEA"]
Rationale: [Why this priority and why now — which market trend or competitive insight drives it]
Bet: [The specific directional bet embedded in this priority — what we believe that others don't]
What it means we'll do more of: [...]
What it means we'll do less of: [...]
Owner: [who is accountable for this priority]
OKRs: [see Step 4]
```

Strategic bets are beliefs the organization is willing to act on and invest in before the evidence is conclusive. Making bets explicit prevents strategy from becoming a list of safe, obvious things.

---

### Step 4 — OKR Framework (Tuna, Salmon, Willy)

OKRs cascade from strategic priorities. Each priority gets 1–3 Objectives. Each Objective gets 2–4 Key Results.

**OKR quality bar:**
- Objective: ambitious, qualitative, direction-setting. Not a task.
- Key Result: measurable, time-bound, tells you if the Objective was achieved. Not an activity.
- "Will we grade this 0.7+ at the end of the period if we execute well?" → yes = right target

```
Priority: [Strategic priority name]

Objective 1: [Qualitative — inspiring direction]
  KR 1: [Metric]: from [baseline] to [target] by [date]
  KR 2: [Metric]: from [baseline] to [target] by [date]
  KR 3: [Metric]: from [baseline] to [target] by [date]
  
Objective 2: ...
```

---

### Step 5 — Theory of Change (Salmon, Willy)

Theory of change explains the causal chain between what the organization does and the outcome it seeks.

```
If we [inputs / activities]
→ Then [outputs / immediate results]
→ Which leads to [outcomes / changes for users or market]
→ Which ultimately creates [impact / the vision state]

Assumptions this chain requires:
- [Assumption 1: what must be true for this causal chain to hold]
- [Assumption 2: ...]

Key risks to the chain:
- [Where the chain could break and why]
```

---

### Final Output

**Vision and mission** — tested against motivating and boundary-setting criteria
**Strategic choice cascade** — 5 levels, integrated and consistent (Tuna+)
**Strategic priorities** — 3–5, with bets, owners, and what you'll stop doing
**OKR framework** — cascaded from priorities (Tuna+)
**Theory of change** — causal chain with assumptions (Salmon+)
**Balanced scorecard** — 4 perspectives (Willy)
**Recommended next skill** — `/ds-strategy-strategic-roadmap` (translate to execution plan) with one-sentence reason
