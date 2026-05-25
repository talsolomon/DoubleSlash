---
name: ds-analytics-dashboard-design
description: Designs analytics dashboards that drive decisions — audience mapping, metric selection, chart type guide, layout hierarchy, alert thresholds, and drill-down paths. Use when building a reporting surface or asking "what should leadership actually see".
tags: [analytics, develop]
model: inherit
---

# Dashboard Design
**Domain**: Analytics | **Phase**: Develop | **Invocation**: `/ds-analytics-dashboard-design`

## What this produces
A dashboard specification with audience-decision mapping, metric selection rationale, chart type guidance, layout hierarchy, alert configuration, and drill-down paths — ready to hand to a BI engineer.

## FISH Guide
| Fish | Depth |
|---|---|
| Nemo | Audience + 5 key metrics + layout sketch |
| Tuna | Metric selection + chart types + cadence + layout |
| Salmon | All above + drill-down paths + alert configuration |
| Willy | All methods + access model + full layout spec + test plan |

---

## Execution Prompt

You are designing a Dashboard for [project]. Work backward from decisions — not forward from available data.

**Input**: intended audience, decisions the dashboard must support, available metrics, BI tool (Metabase/Looker/Grafana/Tableau).

---

### 1. Audience and Decision Mapping

```
Audience: [specific role — not "everyone"]
Questions they must answer from this dashboard:
  1. [Is the north star metric trending in the right direction?]
  2. [Where in the funnel are we losing users this week?]
  3. [Did last week's change improve or hurt [metric]?]

Decisions this enables:
  - [Weekly: where to focus the team]
  - [Monthly: double down or change direction on [initiative]]

Time horizon:
  - Current: real-time or daily
  - Trend: last 30 days vs. prior 30 days
  - Historical: quarterly for planning
```

---

### 2. Metric Selection

**Maximum metric rule**: a dashboard with > 12 metrics is a data dump, not a decision tool.

```
Section: [name]
Primary metric: [the single most important number]
  Why: [what decision it drives]
Supporting metrics (max 3): [contextualizes the primary]
Excluded (with reason):
  [Metric X] — excluded because [low impact / own dashboard / covered in drill-down]
```

---

### 3. Chart Type Selection

| What you're showing | Chart type | When NOT to use |
|---|---|---|
| Single number vs. target | Big number + sparkline | When trend > number |
| Trend over time | Line chart | > 5 lines → small multiples |
| Comparison across categories | Bar chart (vertical) | > 10 categories → table |
| Part-to-whole | Stacked bar or pie (max 4 slices) | Pie with > 4 slices = unreadable |
| Distribution | Histogram or box plot | Never pie for distribution |
| Funnel | Funnel chart or waterfall | Not for non-sequential |
| Correlation | Scatter plot | Not for trends |

**Rules for every chart:**
- Titles are insights, not descriptions: "Retention dropped 8% this month" not "Retention Rate"
- Y-axis starts at 0 (unless log scale is used and labeled)
- No 3D charts — they distort perception
- Color for meaning, not decoration
- % change vs. prior period on every time-series metric

---

### 4. Layout Hierarchy

```
Above the fold (visible without scrolling):
  - Executive summary: north star metric + trend arrow + % change
  - Status tiles: 3-4 key metrics with color coding (green/yellow/red vs. target)
  - Most urgent action if any metric is red

Below the fold:
  Section 1: [Acquisition / top of funnel]
    [Chart 1] [Chart 2]

  Section 2: [Activation / product metrics]
    [Chart 3] [Chart 4]

  Section 3: [Retention / engagement]
    [Chart 5]

Footer:
  - Data freshness: "Last updated: [timestamp]"
  - Data source: "[source name]"
  - Questions: "[data team contact]"
```

**Layout principle**: arrange metrics in the order that tells a story. Acquisition → Activation → Retention mirrors the customer journey.

---

### 5. Alerts and Thresholds

| Metric | Alert condition | Threshold | Who notified | Cadence |
|---|---|---|---|---|
| [North star] | Drops below | [target × 0.9] | [PM + data team] | Daily |
| [Error rate] | Exceeds | [2%] | [Eng on-call + PM] | Hourly |
| [Conversion rate] | Drops > 10% vs. prior period | — | [PM + marketing] | Weekly |

**Alert quality rule**: alerts that fire too often get ignored. Start conservative (only fire on 20%+ drops), then tune as the team demonstrates it responds.
