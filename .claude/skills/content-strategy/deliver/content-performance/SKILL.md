---
name: ds-content-strategy-content-performance
description: Analyzes content performance with top/bottom performer breakdown, traffic and engagement analysis, SEO movement tracking, content decay detection, and optimization recommendations. Use after publishing, at monthly reviews, or asking "what content is working and what should we do more of". Also triggers on: Traffic analysis, SEO rank tracking, conversion attribution, content decay analysis, format performance comparison.
tags: [content-strategy, deliver]
model: inherit
---

# Content Performance
**Domain**: Content Strategy | **Phase**: Deliver | **Invocation**: `/ds-content-strategy-content-performance`

## What this produces
A content performance report: top and bottom performers with root cause analysis, traffic and engagement trends, SEO rank movement, content decay detection, format effectiveness comparison, and a prioritized optimization plan for the next content cycle.

## Methods
Traffic and engagement analysis, SEO rank tracking, conversion attribution, content decay analysis, format performance comparison, audience segment performance, social engagement analysis, email performance review, content investment vs. return analysis

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 5 / bottom 5 pieces, engagement overview, quick wins |
| Tuna | Traffic, SEO movement, format comparison, recommendations |
| Salmon | Full analysis with attribution, content decay, segment performance |
| Willy | All methods — investment vs. return, full optimization roadmap |

## Execution prompt
You are running Content Performance for [project]. Assess what's working and produce a data-driven content optimization plan.

**Input**: content performance data for the period being reviewed (traffic, rankings, engagement, conversion data).
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Performance Overview

```
Review period: [Start date] → [End date]
Content library size: [N pieces total] | Published this period: [N]

Traffic Summary:
────────────────────────────────────────────────────────────────────────
Metric                 This period   Prior period   Change    vs. Target
────────────────────────────────────────────────────────────────────────
Total organic sessions [N]           [N]            [+/-%]    [+/-]
Avg session duration   [Xs]          [Xs]           [+/-%]    —
Pages per session      [N]           [N]            [+/-%]    —
Bounce rate            [%]           [%]            [+/- pp]  —
Content conversions    [N]           [N]            [+/-%]    [+/-]
Email subscribers gained[N]          [N]            [+/-%]    [+/-]
────────────────────────────────────────────────────────────────────────
```

### Step 2 — Top 5 Performers

```
Top performers (ranked by organic traffic this period):
────────────────────────────────────────────────────────────────────────────────────
Rank  Title                 Sessions  Avg rank  Conv  What made it work
────────────────────────────────────────────────────────────────────────────────────
1.    [Title]               [N]       [#]       [N]   [Reason: topic demand / format / freshness]
2.    [Title]               [N]       [#]       [N]   [Reason]
3.    [Title]               [N]       [#]       [N]   [Reason]
4.    [Title]               [N]       [#]       [N]   [Reason]
5.    [Title]               [N]       [#]       [N]   [Reason]
────────────────────────────────────────────────────────────────────────────────────

Shared patterns among top performers:
  Format: [e.g., "4 of 5 are long-form guides, not listicles"]
  Topic:  [e.g., "All cover the 'problem-aware' funnel stage"]
  Age:    [e.g., "3 of 5 are 6–18 months old and recently refreshed"]
  Length: [e.g., "Average 1,800 words — longer than our average"]

Strategic implication: [What to do more of based on this pattern]
```

### Step 3 — Bottom 5 Performers

```
Bottom performers (lowest traffic, zero conversions, or steep decline):
────────────────────────────────────────────────────────────────────────────────────
Rank  Title                 Sessions  Rank    Issue              Recommendation
────────────────────────────────────────────────────────────────────────────────────
1.    [Title]               [<10/mo]  None    [Keyword/thin/old] [Update / Delete / Archive]
2.    [Title]               [<10/mo]  None    [Off-pillar]       [Archive]
3.    [Title]               [<10/mo]  None    [Cannibalization]  [Merge with [Article]]
4.    [Title]               [<10/mo]  None    [Outdated data]    [Update + republish]
5.    [Title]               [<10/mo]  None    [Wrong intent]     [Rewrite]
────────────────────────────────────────────────────────────────────────────────────

Common failure patterns: [Topic mismatch / thin content / outdated / wrong keyword intent]
```

### Step 4 — SEO Rank Movement

```
Keyword rank tracking:
────────────────────────────────────────────────────────────────────────────────────
Keyword              Current rank   Prior rank   Change   Page          Action
────────────────────────────────────────────────────────────────────────────────────
[Keyword 1]          [#]            [#]          [+/-N]   [Article]     [Hold/Update/Build links]
[Keyword 2]          [#]            [#]          [+/-N]   [Article]     [Refresh content]
[Keyword 3]          [#]            [#]          [+/-N]   [Article]     [Monitor]
────────────────────────────────────────────────────────────────────────────────────

Rank movement thresholds:
  Positions 1–3:    Hold — protect with periodic freshness updates
  Positions 4–10:   Opportunity — optimize to move to top 3
  Positions 11–20:  Gap — significant content or link improvement needed
  Position 21+:     Evaluate — update or accept the piece won't rank

Quick wins (pages ranking 11–20 that need a push):
  [Article] — keyword: [X] — current rank: [#] — recommended: [action]
```

### Step 5 — Content Decay Analysis

```
Content decay: Traffic decline > 20% over 90 days on previously high-performing content.

Decay detection:
────────────────────────────────────────────────────────────────────────
Article          Peak traffic/mo   Current/mo   Decline   Last updated
────────────────────────────────────────────────────────────────────────
[Title]          [N]               [N]          [-%]      [Date]
[Title]          [N]               [N]          [-%]      [Date]
────────────────────────────────────────────────────────────────────────

Decay causes (diagnose each):
  Algorithm update: [Check if ranking dropped — if yes, content quality issue]
  Outdated content: [Check if data/tools mentioned are no longer current]
  SERP feature change: [Featured snippet captured by competitor?]
  Cannibalization: [Did we publish a competing piece?]

Refresh plan for decayed pieces:
  [Title] — action: [Update statistics / expand depth / add new section] — ETA: [Date]
```

### Step 6 — Format Performance Comparison

```
Format Effectiveness:
────────────────────────────────────────────────────────────────────────
Format           Pieces   Avg traffic/mo   Avg engagement   Avg conversions
────────────────────────────────────────────────────────────────────────
Long-form guide  [N]      [N]              [Xs / page]      [N]
How-to / tutorial[N]      [N]              [Xs / page]      [N]
Listicle         [N]      [N]              [Xs / page]      [N]
Case study       [N]      [N]              [Xs / page]      [N]
Video            [N]      [N]              [Watch time]     [N]
Newsletter       [N]      [Open% / CTR%]   —                [N]
────────────────────────────────────────────────────────────────────────

Highest ROI format: [Format] — [why: traffic + conversion combination]
Underperforming format: [Format] — [hypothesis: wrong audience / not enough depth / low search demand]
Format strategy adjustment: [What to produce more of / less of next period]
```

### Step 7 — Email and Social Performance

```
Email Newsletter Performance:
────────────────────────────────────────────────────────────────────────
Issue              Open rate   CTR    Unsub rate   Best performing issue
────────────────────────────────────────────────────────────────────────
[Issue 1]          [%]         [%]    [%]          —
[Issue 2]          [%]         [%]    [%]          [Why it worked]
Avg this period    [%]         [%]    [%]          —
Industry benchmark [%]         [%]    [%]          —
────────────────────────────────────────────────────────────────────────

Social engagement summary:
  LinkedIn best post: [Title/angle] — [N] impressions, [N] comments
  LinkedIn insight: [What worked — question / stat / story format]
  Twitter/X best thread: [Topic] — [N] impressions, [N] link clicks
  Social insight: [Pattern across high-performing social content]
```

### Step 8 — Optimization Recommendations

```
Next cycle recommendations (ranked by expected impact):

1. [Action] — [Why — based on which data point] — effort: [hrs] — expected result: [metric]
   e.g., "Refresh top 3 decaying articles" — peak traffic was [N], current [N] → restore [N] sessions/mo

2. [Action] — [Why] — effort: [hrs] — expected result: [metric]
   e.g., "Produce 2 more long-form guides on [topic cluster]" — top format, search demand confirmed

3. [Action] — [Why] — effort: [hrs] — expected result: [metric]

4. [Action] — [Why] — effort: [hrs] — expected result: [metric]

5. [Action] — [Why] — effort: [hrs] — expected result: [metric]

Deprioritize: [Content types or topics that consistently underperform — stop producing]

Investment vs. return summary:
  Content produced this period:  [N pieces] at estimated [X hrs total]
  Organic sessions generated:    [N] sessions
  Cost per session:              [hrs ÷ sessions] or [$budget ÷ sessions]
  Conversions attributed:        [N] at $[X] cost per content-attributed conversion
```

---

## Final Output
- Performance overview (traffic, engagement, conversions vs. target)
- Top 5 performers with root cause analysis and shared patterns
- Bottom 5 performers with KUDA recommendations
- SEO rank movement table with quick-win opportunities identified
- Content decay analysis with refresh plan
- Format effectiveness comparison
- Email and social performance summary
- 5 optimization recommendations ranked by impact

**Recommended next skill**: `/ds-content-strategy-content-planning` — use findings to plan the next content cycle with better topic selection and format mix.
