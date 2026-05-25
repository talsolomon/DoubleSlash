---
name: ds-marketing-performance-analysis
description: Analyzes campaign performance with attribution modeling, CPA/ROAS calculations, funnel analysis, and a prioritized optimization plan. Use after a campaign runs, at mid-campaign checkpoints, or asking "is this working and what should we change". Also triggers on: KPI tracking review, channel performance comparison, attribution modeling, conversion funnel analysis, budget reallocation.
tags: [marketing, deliver]
model: inherit
---

# Performance Analysis
**Domain**: Marketing | **Phase**: Deliver | **Invocation**: `/ds-marketing-performance-analysis`

## What this produces
A campaign performance report: channel-by-channel results vs. targets, attribution analysis, funnel breakdown, what's working and why, what's not and why, and a prioritized optimization plan with budget reallocation recommendations.

## Methods
KPI tracking review, channel performance comparison, attribution modeling, conversion funnel analysis, CPA/ROAS calculation, audience segment performance, creative performance analysis, A/B test results synthesis, budget reallocation recommendations, forecasting

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | KPI review vs. targets, top 3 findings, quick wins |
| Tuna | Channel comparison, funnel analysis, CPA/ROAS, optimization priorities |
| Salmon | Full analysis with attribution, segment performance, creative review |
| Willy | All methods — A/B synthesis, budget reallocation model, next-period forecast |

## Execution prompt
You are running Performance Analysis for [project]. Assess campaign results and produce an actionable optimization plan.

**Input**: campaign KPIs and actuals, channel-level data, original campaign brief (objectives and targets).
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Performance Summary vs. Targets

```
Campaign: [Name] | Period: [Start] → [End] | Status: [Complete / Mid-campaign]

KPI Scorecard:
────────────────────────────────────────────────────────────────────────────────────
KPI                  Target      Actual     vs. Target   vs. Prior period
────────────────────────────────────────────────────────────────────────────────────
Impressions          [X]         [X]        [+/-%]       [+/-%]
Clicks               [X]         [X]        [+/-%]       [+/-%]
CTR                  [X%]        [X%]       [+/- pp]     [+/- pp]
Conversions          [X]         [X]        [+/-%]       [+/-%]
Conversion rate      [X%]        [X%]       [+/- pp]     [+/- pp]
CPA                  $[X]        $[X]       [+/-%]       [+/-%]
ROAS                 [X]x        [X]x       [+/-%]       [+/-%]
Revenue / pipeline   $[X]        $[X]       [+/-%]       [+/-%]
Total spend          $[X]        $[X]       [+/-%]       —
────────────────────────────────────────────────────────────────────────────────────
ROAS formula:        Revenue ÷ Ad Spend
CPA formula:         Total Spend ÷ Total Conversions
Overall: [On track / Behind target / Exceeded / Mixed]
```

### Step 2 — Channel Performance Comparison

```
Channel Breakdown:
────────────────────────────────────────────────────────────────────────────────────────────
Channel      Spend $   Impressions  Clicks  CTR    Conv  CVR    CPA $   ROAS   Verdict
────────────────────────────────────────────────────────────────────────────────────────────
[Google]
[LinkedIn]
[Meta]
[Email]
[Organic]
────────────────────────────────────────────────────────────────────────────────────────────
Total

Channel ranking (by CPA efficiency):
  Best:   [Channel] — CPA $[X], [X]x better than average
  Worst:  [Channel] — CPA $[X], [X]x worse than average
  Signal: [What this tells us about where audience actually converts]
```

### Step 3 — Attribution Analysis

```
Attribution models compared:
────────────────────────────────────────────────────────────────────────
Channel          First-touch   Last-touch   Linear    Data-driven
────────────────────────────────────────────────────────────────────────
[Google Search]
[LinkedIn]
[Meta]
[Email]
[Organic]
────────────────────────────────────────────────────────────────────────

Attribution model used for decisions: [Which model and why]

Key insight:
  [Channel X] appears weak in last-touch but is a strong first-touch driver → keep it for awareness, don't cut
  [Channel Y] looks good in last-touch but rarely introduces new customers → retargeting play, needs top-funnel feed
  Assisted conversions: [Channel] assisted [X%] of all conversions without getting direct credit

Attribution recommendation:
  [Model to use going forward and why — based on sales cycle length and channel mix]
```

### Step 4 — Conversion Funnel Analysis

```
Funnel Breakdown:
────────────────────────────────────────────────────────────────────────
Stage              Volume    Drop-off rate   vs. Benchmark   Flag?
────────────────────────────────────────────────────────────────────────
Impressions        [N]       —               —
Clicks             [N]       [%] drop        [benchmark%]    [Y/N]
Landing page view  [N]       [%] drop        [benchmark%]    [Y/N]
Engaged (scroll)   [N]       [%] drop        [benchmark%]    [Y/N]
CTA clicked        [N]       [%] drop        [benchmark%]    [Y/N]
Form started       [N]       [%] drop        [benchmark%]    [Y/N]
Form completed     [N]       [%] drop        [benchmark%]    [Y/N]
Converted          [N]       —               —
────────────────────────────────────────────────────────────────────────

Biggest leak: [Stage where drop-off is greatest relative to benchmark]
Root cause hypothesis: [Why — messaging mismatch / friction / load speed / wrong audience]
Fix: [Specific action — test new landing page / simplify form / refine targeting]
```

### Step 5 — Creative Performance Analysis

```
Creative Scorecard:
────────────────────────────────────────────────────────────────────────────────
Creative variant    Impressions  CTR    Conv  CPA $   Engagement   Verdict
────────────────────────────────────────────────────────────────────────────────
[Headline A / Image 1]
[Headline A / Image 2]
[Headline B / Image 1]
[Headline B / Image 2]
────────────────────────────────────────────────────────────────────────────────

Top performer:   [Creative] — [Why it worked: message / visual / format]
Bottom performer:[Creative] — [Why it didn't: hypothesis]

Creative insights:
  1. [Pattern observed — e.g., "Questions outperformed statements by 2×"]
  2. [Pattern observed — e.g., "Lifestyle imagery beat product screenshots on LinkedIn"]
  3. [Pattern observed — e.g., "Shorter CTAs (3 words) outperformed longer ones"]
```

### Step 6 — Audience Segment Performance

```
Segment Breakdown:
────────────────────────────────────────────────────────────────────────
Segment          Reach    CTR    CVR    CPA $   vs. Average   Invest?
────────────────────────────────────────────────────────────────────────
[ICP segment A]
[ICP segment B]
[Retargeting]
[Lookalike]
[Prospecting]
────────────────────────────────────────────────────────────────────────

Segment insight:
  Over-index on: [Segment] — [X]x better CPA → increase budget allocation
  Under-index on: [Segment] — [X]x worse CPA → reduce or cut
  Surprise finding: [Unexpected segment that performed well/poorly]
```

### Step 7 — Optimization Plan and Budget Reallocation

```
What's working (keep and scale):
  1. [Specific — channel / creative / audience / message] — evidence: [metric]
  2. [Specific] — evidence: [metric]
  3. [Specific] — evidence: [metric]

What's not working (fix or cut):
  1. [Specific] — hypothesis: [why] — action: [fix / cut / test alternative]
  2. [Specific] — hypothesis: [why] — action: [fix / cut / test alternative]
  3. [Specific] — hypothesis: [why] — action: [fix / cut / test alternative]

Budget reallocation recommendation:
────────────────────────────────────────────────────────────────────────
Channel / Tactic     Current $   Recommended $   Change     Rationale
────────────────────────────────────────────────────────────────────────
[Channel A]          $[X]        $[X]            +[X]%      Top ROAS
[Channel B]          $[X]        $[X]            -[X]%      CPA > 2× target
[Channel C]          $[X]        $[X]            —          Holding; data thin
────────────────────────────────────────────────────────────────────────
Total:               $[X]        $[X]            0 (same budget)

Next-period forecast (if optimizations applied):
  Projected CPA:         $[X] (vs. current $[X])
  Projected conversions: [N] (vs. current [N])
  Projected ROAS:        [X]x (vs. current [X]x)
  Confidence:            [High / Medium / Low] — based on [data volume]
```

---

## Final Output
- KPI scorecard (all metrics vs. targets and prior period)
- Channel performance table with CPA, ROAS, and verdict per channel
- Attribution analysis with model comparison and recommendation
- Funnel breakdown with biggest leak identified
- Creative performance analysis with 3 creative insights
- Audience segment performance with over/under-index findings
- Optimization plan: what's working, what's not, budget reallocation table, next-period forecast

**Recommended next skill**: `/ds-marketing-campaign-brief` — use findings to brief the next campaign with better targeting, creative direction, and channel allocation.
