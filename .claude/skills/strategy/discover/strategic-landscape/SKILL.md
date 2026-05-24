---
name: ds-strategy-strategic-landscape
description: Maps the strategic environment — PESTLE, Porter's Five Forces, 3-horizon megatrends, and weak signals. Use when setting direction, preparing for a planning cycle, or asking "what's happening in the world that we need to account for". Also triggers on: PESTLE analysis, megatrend mapping, weak signal detection, industry lifecycle, regulatory scan, tech disruption mapping.
tags: [strategy, discover, strategic-landscape, pestle, porter, megatrends, weak-signals]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: discover
---

# Strategic Landscape
**Domain**: Strategy | **Phase**: Discover | **Invocation**: `/ds-strategy-strategic-landscape`

## What this produces
A strategic landscape map with PESTLE analysis, competitive forces, megatrends across 3 horizons, and weak signals that should shape the strategy.

## Methods
PESTLE analysis, Porter's Five Forces, megatrend mapping (3 horizons), weak signal detection, industry lifecycle assessment, regulatory environment scan, technology disruption mapping, adjacent threat identification

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick scan | Top 5 PESTLE factors + 3 competitive forces + strategic implications |
| Tuna | Full landscape | PESTLE + Five Forces + megatrends |
| Salmon | Deep scan | All above + weak signals + regulatory + tech disruption |
| Willy | Strategic intelligence | All methods + adjacent threats + industry lifecycle + full signal map |

---

## Execution Prompt

Read the project context: the company/organization, the market or sector, the strategic decision this analysis informs, FISH classification.

---

### Step 1 — PESTLE Analysis (all FISH levels)

PESTLE maps the external macro environment. Focus on factors that have a real strategic implication — don't list everything.

| Factor | Trend or Event | Direction | Strategic Implication |
|---|---|---|---|
| **Political** | [regulatory change, government policy] | ↑/↓/→ | [how this affects strategy] |
| **Economic** | [interest rates, inflation, GDP growth] | ↑/↓/→ | [cost, demand, investment impact] |
| **Social** | [demographic shift, behavioral change] | ↑/↓/→ | [customer need or behavior impact] |
| **Technological** | [technology shift, adoption curve] | ↑/↓/→ | [disruption or opportunity] |
| **Legal** | [law changes, compliance requirements] | ↑/↓/→ | [constraint or competitive barrier] |
| **Environmental** | [climate, sustainability, ESG] | ↑/↓/→ | [risk or opportunity] |

**Rule:** list only factors with high impact on the business. A factor with "minimal strategic implication" belongs in an appendix, not the analysis.

---

### Step 2 — Megatrend Mapping (Tuna, Salmon, Willy)

Megatrends are large-scale forces that play out over years or decades. Use the 3-horizon model to show when they become material.

| Megatrend | H1 (Now–2 years) | H2 (2–5 years) | H3 (5+ years) | Strategic bet |
|---|---|---|---|---|
| [AI commoditization] | [current impact] | [expected impact] | [transformative impact] | [how to position] |
| [Workforce automation] | | | | |
| [Climate regulation] | | | | |

**Horizon definitions:**
- **Horizon 1**: managing current business, optimizing what exists
- **Horizon 2**: emerging businesses that need investment now to capture future
- **Horizon 3**: options, experiments, and bets on future disruption

**Strategic question per megatrend:** "Is this a tailwind (exploit it), headwind (mitigate it), or inflection point (pivot toward it)?"

---

### Step 3 — Weak Signal Detection (Salmon, Willy)

Weak signals are early indicators of change not yet mainstream. They're the trends that become megatrends.

**Sources to mine:**
- Academic papers and patent filings (3-5 year lead on commercial adoption)
- Startup funding patterns (where is venture capital going?)
- Fringe customer behavior (what are early adopters doing?)
- Policy discussions (what are regulators starting to talk about?)
- Adjacent industries (what disrupted travel now hitting hospitality?)

**Signal format:**
```
Signal: [description]
Source: [where observed]
Strength: Weak / Moderate / Strong (based on multiple independent sources)
Timeframe: [when this might become mainstream]
If true: [what changes for our strategy]
Monitoring: [how to track this signal — metric, news source, network]
```

---

### Step 4 — Industry Lifecycle Assessment (Willy)

Where is the industry on the S-curve?

| Stage | Characteristics | Strategic implication |
|---|---|---|
| **Emerging** | Rapid innovation, unclear winners, fragmented | Move fast, establish standards |
| **Growth** | Rapid adoption, consolidation beginning | Scale, build moat, acquire |
| **Maturity** | Slowing growth, price competition, consolidation | Efficiency, defend, adjacent expansion |
| **Decline** | Shrinking market, restructuring | Harvest or exit |

State the current stage and whether disruption could reset the clock.

---

### Final Output

**PESTLE analysis** — factors with strategic implication only
**Megatrend map** — across 3 horizons (Tuna+)
**Weak signals** — with monitoring plan (Salmon+)
**Industry lifecycle** — stage + strategic implication (Willy)
**Top 5 strategic implications** — action-oriented conclusions from the landscape
**Recommended next skill** — `/ds-strategy-competitive-analysis` (go deeper on competitors) or `/ds-strategy-strategic-framework` (build the strategy) with one-sentence reason
