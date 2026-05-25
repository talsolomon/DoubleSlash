---
name: ds-analytics-dashboard-design
description: Designs analytics dashboards that drive decisions — audience mapping, metric selection, chart type guide, alert thresholds, drill-down paths. Use when building a new reporting surface, or asking "what should leadership actually see". Also triggers on: decision-first dashboard design, chart type selection, alert configuration, drill-down hierarchy.
tags: [analytics, develop, dashboard-design, decision-first, chart-types, alerts, drill-down]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Dashboard Design
**Domain**: Analytics | **Phase**: Develop | **Invocation**: `/ds-analytics-dashboard-design`

## What this produces
A dashboard specification with audience-decision mapping, metric selection rationale, chart type guidance, layout hierarchy, alert configuration, and drill-down paths — ready to hand to a BI engineer.

## Methods
Audience and decision mapping, metric selection and prioritization, layout and hierarchy design, chart type selection guide, alert and threshold definition, drill-down path design, refresh cadence planning, access and permission design

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Dashboard sketch | Audience + 5 key metrics + layout sketch |
| Tuna | Full spec | Metric selection + chart types + cadence + layout |
| Salmon | Production spec | All above + drill-down paths + alert configuration |
| Willy | BI platform spec | All methods + access model + full layout + test plan |

---

## Execution Prompt

Read the project context: the dashboard's intended audience, decisions it must support, available metrics, tool (Metabase/Looker/Grafana/Tableau), FISH classification.

---

### Step 1 — Audience and Decision Mapping (all FISH levels)

**Design backward from the decision, not forward from available data.**

```
Audience: [specific role — not "everyone"]
Questions they must be able to answer from this dashboard:
  1. [Is the north star metric trending in the right direction?]
  2. [Where in the funnel are we losing users this week?]
  3. [Did last week's change improve or hurt [metric]?]
  
Decisions this enables:
  - [Weekly: where to focus the team this week]
  - [Monthly: whether to double down or change direction on [initiative]]
  
Time horizon they care about:
  - [Current: real-time or daily]
  - [Trend: last 30 days vs. prior 30 days]
  - [Historical: quarterly for planning]
```

---

### Step 2 — Metric Selection (all FISH levels)

**The maximum metric rule:** a dashboard with > 12 metrics isn't useful — it's a data dump.

For each section of the dashboard:
```
Section: [name]
Primary metric: [the single most important number for this section]
  Why: [what decision it drives]
Supporting metrics (max 3): [contextualizes the primary metric]
  Why: [what each adds]
Excluded metrics (from requested but not included):
  [Metric X] — excluded because [reason: low impact / covered in drill-down / own dashboard]
```

---

### Step 3 — Chart Type Selection Guide (Tuna, Salmon, Willy)

| What you're showing | Chart type | When NOT to use this |
|---|---|---|
| Single number vs. target | Big number + sparkline | When trend is more important than the number |
| Trend over time | Line chart | > 5 lines → use small multiples or filters |
| Comparison across categories | Bar chart (vertical) | > 10 categories → table instead |
| Part-to-whole | Stacked bar or pie (max 4 slices) | Pie charts with > 4 slices = unreadable |
| Distribution | Histogram or box plot | Never pie chart for distribution |
| Correlation | Scatter plot | Not for showing trends |
| Funnel | Funnel chart or waterfall | Not for non-sequential processes |
| Table | Data table | When precision matters more than pattern |

**Rules for every chart:**
- Titles are insights, not descriptions: "Retention dropped 8% this month" not "Retention Rate"
- Y-axis starts at 0 (unless log scale is used and labeled)
- No 3D charts — they distort perception
- Color for meaning, not decoration (use color to distinguish, not to decorate)
- % change vs. prior period on every time-series metric

---

### Step 4 — Layout Hierarchy (Tuna, Salmon, Willy)

```
Above the fold (visible without scrolling):
  - [Executive summary: north star metric + trend arrow + % change]
  - [Status tiles: 3-4 key metrics with color coding (green/yellow/red vs. target)]
  - [Most urgent action item if any metric is in red]

Below the fold:
  Section 1: [Acquisition / top of funnel]
    [Chart 1: ...] [Chart 2: ...]
    
  Section 2: [Activation / product metrics]
    [Chart 3: ...] [Chart 4: ...]
    
  Section 3: [Retention / engagement]
    [Chart 5: ...]

Footer:
  - Data freshness: "Last updated: [timestamp]"
  - Data source: "[source name]"
  - Questions: "[link to data team Slack / email]"
```

**Layout principle:** arrange metrics in the order that tells a story. Acquisition → Activation → Retention mirrors the customer journey and creates a natural narrative.

---

### Step 5 — Alerts and Thresholds (Salmon, Willy)

| Metric | Alert condition | Threshold | Who is notified | Cadence |
|---|---|---|---|---|
| [North star] | Drops below | [target × 0.9] | [PM + data team] | Daily |
| [Error rate] | Exceeds | [2%] | [Eng on-call + PM] | Hourly |
| [Conversion rate] | Drops > 10% vs. prior period | — | [PM + marketing] | Weekly |

**Alert quality rule:** alerts that fire too often get ignored. Start conservative (only fire on 20%+ drops), then tune down as the team demonstrates it responds.

---

### Final Output

**Audience-decision map** — specific audience, questions answered, decisions enabled
**Metric selection** — primary + supporting per section, excluded with reason
**Chart types** — per metric with rationale
**Layout spec** — above/below fold, section order, titles as insights (Tuna+)
**Alert configuration** — thresholds, recipients, cadence (Salmon+)
**Drill-down paths** — where each metric links to deeper analysis (Salmon+)
**Recommended next skill** — `/ds-analytics-reporting` (produce regular reports from this dashboard) with one-sentence reason
