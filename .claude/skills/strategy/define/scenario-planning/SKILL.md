---
name: ds-strategy-scenario-planning
description: Develops future scenarios and stress-tests strategy against each. Use when planning under uncertainty, preparing for major decisions, or asking "what if things go differently". Also triggers on: scenario axis identification, scenario narrative, pre-mortem analysis, early indicator definition, contingency trigger design, strategy stress-test.
tags: [strategy, define, scenario-planning, pre-mortem, uncertainty, contingency]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# Scenario Planning
**Domain**: Strategy | **Phase**: Discover | **Invocation**: `/ds-strategy-scenario-planning`

## What this produces
3–4 named future scenarios with narratives, probability estimates, strategy stress-tests, early indicators to watch, and contingency triggers — so the strategy is robust under uncertainty.

## Methods
Scenario axis identification (2×2 matrix), scenario narrative development, probability and impact assessment, strategy stress-testing, pre-mortem analysis, early indicator definition, contingency trigger design

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | 2 scenarios | Best/worst + implications for current strategy |
| Tuna | 3 scenarios | Named narratives + probability + key strategic implication each |
| Salmon | 4 scenarios | Full 2×2 + stress-test + early indicators per scenario |
| Willy | Full scenario platform | All methods + contingency triggers + pre-mortem + monitoring system |

---

## Execution Prompt

Read the project context: the strategy being tested, the key decisions at stake, the planning horizon, FISH classification.

---

### Step 1 — Identify Key Uncertainties (all FISH levels)

Scenarios are built from the 2 most uncertain AND most impactful variables.

**Process:**
1. List the 10 most impactful factors the organization cannot control
2. Rate each: Impact (H/M/L) × Predictability (H/M/L)
3. High Impact + Low Predictability = scenario axis candidate

```
Factor | Impact | Predictability | Axis candidate?
[Factor 1] | H | L | Yes
[Factor 2] | H | H | No — predictable, not a source of uncertainty
```

**The 2 highest-impact, least predictable factors become the axes of the 2×2 scenario matrix.**

---

### Step 2 — 2×2 Scenario Matrix (Tuna, Salmon, Willy)

```
         [Axis X: Factor A]
         Low ←————————————→ High
    High ┌─────────────┬─────────────┐
         │ Scenario 1  │ Scenario 2  │
Axis Y:  │ [Name]      │ [Name]      │
         ├─────────────┼─────────────┤
    Low  │ Scenario 3  │ Scenario 4  │
         │ [Name]      │ [Name]      │
         └─────────────┴─────────────┘
```

Name each scenario with a memorable title (not "Optimistic" and "Pessimistic" — those create bias). Use descriptive names: "The Consolidation Wave", "The Platform Shift", "Fragmented Futures".

---

### Step 3 — Scenario Narratives (all FISH levels)

For each scenario:
```
Scenario: [Name]
Headline: [One sentence that captures the world]
Probability: [X%] — [rationale for estimate]

The world: [2-3 paragraph story of what has happened by [year]. Written as if it already happened. 
  Include: what macro events occurred, how the industry changed, how customers behave differently, 
  what the competitive landscape looks like.]

Winner profile: [what kind of organization thrives in this scenario?]
Loser profile: [what kind of organization fails in this scenario?]
```

---

### Step 4 — Strategy Stress-Test (Salmon, Willy)

For each scenario, evaluate the current strategy:

| Strategy element | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 |
|---|---|---|---|---|
| [Strategic bet 1] | Works / Fails / Neutral | | | |
| [Strategic bet 2] | | | | |
| [Investment priority] | | | | |
| [Key capability] | | | | |

**Robust strategy:** survives in 3 of 4 scenarios. Flag strategic elements that only work in 1 scenario — these are high-risk bets.

**Pre-mortem** (Willy): for the most likely scenario, assume the strategy has failed 3 years from now. What caused the failure? Work backward. This reveals hidden fragility.

---

### Step 5 — Early Indicators (Salmon, Willy)

How will you know which scenario is unfolding? Define observable signals.

```
Scenario: [Name]
Early indicators:
  - [Indicator 1: specific, observable metric or event]
  - [Indicator 2: ...]
  - [Indicator 3: ...]
  
Monitoring: [how/where to track these — data source, frequency]
Leading time: [how far in advance does this indicator appear before the scenario crystallizes?]
```

---

### Step 6 — Contingency Triggers (Willy)

```
If [early indicator] reaches [threshold], then [specific strategic pivot]:
  - [What decisions get accelerated]
  - [What investments get deprioritized]
  - [What capabilities get built immediately]
  - [Decision owner: who decides when to activate]
```

---

### Final Output

**Key uncertainties** — ranked by impact × unpredictability
**2×2 scenario matrix** — 4 named scenarios (Tuna+)
**Scenario narratives** — with probabilities and world descriptions
**Strategy stress-test** — current strategy rated per scenario (Salmon+)
**Pre-mortem** — failure analysis for most likely scenario (Willy)
**Early indicators** — observable signals per scenario (Salmon+)
**Contingency triggers** — with decision owners (Willy)
**Recommended next skill** — `/ds-strategy-strategic-framework` (build the robust strategy) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
