---
name: ds-product-opportunity-landscape
description: Maps and sizes the problem space — TAM/SAM/SOM, whitespace, early adopter profile. Use when evaluating which market to enter, asking "is this worth building", sizing an opportunity, or prioritizing between multiple directions. Also triggers on: market sizing, TAM SAM SOM, whitespace analysis, market opportunity, where should we play, early adopters, market research, opportunity assessment.
tags: [product, discover, market-sizing, tam, whitespace, early-adopters]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: discover
---

# Opportunity Landscape
**Domain**: Product | **Phase**: Discover | **Invocation**: `/ds-product-opportunity-landscape`

## What this produces
A ranked opportunity map with market sizing, whitespace analysis, and an early adopter profile. On Salmon/Willy: full competitive landscape, JTBD market segmentation, and unmet needs scoring.

## Methods
TAM/SAM/SOM sizing, whitespace analysis, horizontal/vertical market scan, adjacent market mapping, pain/gain mapping, demand signal aggregation, early adopter profiling, JTBD market segmentation, unmet needs scoring, technology readiness assessment, competitive positioning, beachhead market selection

## FISH Guide
| Fish | Depth | What runs |
|---|---|---|
| Nemo | Quick scan | Pain/gain map → early adopter profile → go/no-go |
| Tuna | Market sizing | TAM/SAM/SOM → whitespace analysis → early adopter profile → opportunity ranking |
| Salmon | Full landscape | Competitive scan + JTBD segmentation + unmet needs scoring + beachhead selection |
| Willy | Portfolio landscape | All methods + adjacency mapping + technology readiness + full opportunity portfolio |

---

## Execution Prompt

Read the project context: what problem space is being explored, any known competitors or adjacent players, any prior research or signal in memory, FISH classification, and any constraints (geography, segment, technology).

---

### Step 1 — Pain / Gain Map (all FISH levels)

Map the problem space on two dimensions:

**Pain intensity**: How much does the current situation hurt? (1 = minor inconvenience, 5 = blocking critical work)
**Current solution quality**: How well do existing solutions address this? (0 = no solution exists, 5 = fully solved)

A good opportunity has: high pain + low current solution quality. This quadrant = underserved market.

Produce a 2×2:
```
High pain, bad solutions → PRIMARY OPPORTUNITY (build here)
High pain, good solutions → COMPETITIVE MARKET (need differentiation)
Low pain, bad solutions → WEAK OPPORTUNITY (even if you build it, will they pay?)
Low pain, good solutions → SATURATED (don't enter)
```

Place the top 3 problems from context (or hypothesized problems) on this map. Name which quadrant each falls in.

---

### Step 2 — TAM / SAM / SOM (Tuna, Salmon, Willy)

Size the opportunity. Use both top-down and bottom-up approaches and triangulate.

**Top-down:**
- Start with a published market size (name the source and date — flag if estimated)
- Apply filters to narrow to your actual serviceable segment
- Apply a realistic capture rate for SOM

**Bottom-up:**
- Count the addressable units (users, companies, transactions)
- Multiply by the price they'd pay (or currently pay for alternatives)
- This is your bottom-up TAM

Format:
```
TAM (Total Addressable Market)
  Top-down: $[X]B — [source, date]
  Bottom-up: [N] units × $[price]/unit = $[Y]B
  Triangulated TAM: $[Z]B — [which estimate is more credible and why]

SAM (Serviceable Addressable Market)
  Filter: [geography/segment/use case constraints applied]
  SAM: $[X]M — [N] potential customers

SOM (Serviceable Obtainable Market — Year 1–3)
  Capture rate assumption: [X]% of SAM (justify this with comparable company benchmarks)
  SOM Year 1: $[X]M
  SOM Year 3: $[X]M
```

**Flag every assumption explicitly.** A market sizing is only useful if you can see what's baked in.

---

### Step 3 — Whitespace Analysis (Tuna, Salmon, Willy)

Map what exists vs. what's missing.

**Step 3a — Competitive Landscape**

Name the top 5–8 players in this space. For each:
| Company | What they do | Who they serve | Price point | Key strength | Key gap |
|---|---|---|---|---|---|

**Step 3b — Positioning Map**

Place competitors on a 2×2 using the two most differentiating axes for this market. Common axes: price (low/high), breadth (niche/broad), user type (individual/enterprise), delivery (self-serve/high-touch).

Identify open positions — combinations that no competitor occupies. These are whitespace.

**Step 3c — Whitespace Statement**

Name the whitespace in one sentence: "No current solution addresses [segment] who need [job] and want [differentiator] without [trade-off]."

---

### Step 4 — JTBD Market Segmentation (Salmon, Willy)

Segment the market by job-to-be-done, not by demographic. Demographics describe who people are — JTBD describes what they're trying to accomplish. Better predictor of switching behavior and willingness to pay.

For each major JTBD identified:

```
Job: When [situation], I want to [motivation], so I can [outcome]
Segment: [who has this job acutely — 3 defining characteristics]
Current hire: [what product or approach they currently use for this job]
Why it's inadequate: [what's missing or broken about the current hire]
Switching trigger: [what event or condition makes them look for an alternative]
Willingness to pay signal: [do they pay for anything in this space today? what?]
```

Rank segments by: (Job urgency × Segment size × Switching likelihood). The highest-ranked segment = beachhead.

---

### Step 5 — Unmet Needs Scoring (Salmon, Willy)

For each major need or job in the space, score it on two dimensions:

**Importance**: How important is this outcome to the user? (1–10)
**Satisfaction**: How satisfied are they with current solutions? (1–10)

Opportunity score = Importance + max(Importance − Satisfaction, 0)

Scores > 15 = highly underserved. Scores > 12 = opportunity. Scores < 10 = table stakes (already solved).

Source: Tony Ulwick's Outcome-Driven Innovation. Use this to prioritize which jobs to address first.

---

### Step 6 — Early Adopter Profile (all FISH levels)

Early adopters are not "average users" — they are the people who have the problem acutely, are already trying to solve it (even badly), and will forgive rough edges for meaningful value. They are the beachhead.

Profile format:
```
Early Adopter Profile — [segment name]

Who they are:
  Role: [specific title or function, not broad category]
  Context: [company size, industry, growth stage]
  Frequency: [how often they encounter this problem]

Why they're early adopters:
  They already feel the pain: [specific evidence or behavior]
  They're currently paying for a workaround: [what they use, what it costs]
  They have permission to try new tools: [why they can adopt without a long procurement cycle]

How to reach them:
  Watering holes: [communities, forums, events, publications they read]
  Trigger event: [what happens right before they start looking for a solution]
  Champion vs. buyer: [who uses it vs. who pays — same person? different?]

What they need to say yes:
  Must have: [the one thing without which they won't switch]
  Nice to have: [what accelerates the decision]
  Dealbreaker: [what will immediately disqualify you]
```

---

### Step 7 — Beachhead Market Selection (Salmon, Willy)

Choose the single best segment to attack first. Not the biggest — the most winnable.

Criteria for beachhead selection:
1. **Most acute pain**: highest unmet needs score
2. **Fastest time to value**: they can adopt without a long process
3. **Word of mouth potential**: if delighted, they'll spread it to similar users
4. **Reference power**: winning here makes winning the next segment easier

Name the beachhead segment. Justify against the 4 criteria. Then name the adjacent segment you'll move to second — and why beachhead success unlocks it.

---

### Step 8 — Technology Readiness Assessment (Willy only)

Is the technology ready for this opportunity? Rate each relevant technology component:

| Technology | Readiness (1–5) | Risk if not ready | Mitigation |
|---|---|---|---|

1 = experimental, 5 = mature and reliable. Components rated 1–2 with high risk = platform risk that must be flagged to leadership before committing.

---

### Final Output

**Pain/Gain Map** — top 3 problems plotted, quadrant analysis
**Market Sizing** — TAM/SAM/SOM with top-down + bottom-up triangulation (Tuna+)
**Competitive Landscape** — top players, positioning map, whitespace statement (Tuna+)
**JTBD Segmentation** — ranked segments by opportunity score (Salmon+)
**Unmet Needs Scores** — top opportunities highlighted (Salmon+)
**Early Adopter Profile** — specific, actionable, one segment
**Beachhead Selection** — one segment, justified, with adjacency path (Salmon+)
**Go / No-Go Recommendation** — with one-sentence rationale
**Recommended next skill** — `/ds-product-customer-discovery` (to validate) or `/ds-product-problem-framing` (if opportunity is confirmed) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
