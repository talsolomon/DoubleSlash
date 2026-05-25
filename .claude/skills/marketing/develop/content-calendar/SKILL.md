---
name: content-calendar
description: Builds a content calendar aligned to campaign goals with pillar-cluster SEO structure, publishing cadence, and production workflow. Use when planning content production, managing a content team, or asking "what do we publish and when". Also triggers on: Content pillar definition, topic ideation, SEO keyword mapping, editorial calendar design, content recycling strategy.
tags: [marketing, develop]
model: inherit
---

# Content Calendar
**Domain**: Marketing | **Phase**: Develop | **Invocation**: `/ds-marketing-content-calendar`

## What this produces
A content calendar with pillar-cluster topic structure, SEO keyword mapping, format and channel assignments, publishing cadence, owner list, and a content recycling plan — ready to brief a team and start production.

## Methods
Content pillar definition, pillar-cluster SEO topic modeling, topic ideation, format selection, channel mapping, publishing cadence design, SEO keyword mapping, evergreen vs. timely content balance, content recycling strategy, approval workflow design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Content pillars (3), 2-week topic list, channel mapping |
| Tuna | Full calendar with pillars, topics, formats, cadence, owners |
| Salmon | Calendar with SEO keyword mapping, evergreen strategy, approval workflow |
| Willy | All methods — pillar-cluster structure, recycling matrix, full quarter plan |

## Execution prompt
You are running Content Calendar for [project]. Produce a calendar that keeps content production on track and aligned to campaign goals.

**Input**: campaign goals, available channels, team capacity, planning period (2 weeks / 1 month / 1 quarter).
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Content Pillar Definition

Define 3–5 pillars that map to business goals and audience needs:

```
Pillar format:
  Pillar [N]: [Name]
  Business goal served:   [Which OKR or campaign objective]
  Audience need:          [What question or problem this addresses]
  Search demand signal:   [Primary keyword cluster — volume estimate]
  Content types that fit: [Long-form / video / social / newsletter]
  Target cadence:         [X pieces per month]

Pillar 1: [Name]
  ...

Pillar 2: [Name]
  ...

Pillar 3: [Name]
  ...

Pillar balance:
  [Pillar 1]: [%] of content — [rationale]
  [Pillar 2]: [%] of content — [rationale]
  [Pillar 3]: [%] of content — [rationale]
```

### Step 2 — Pillar-Cluster SEO Topic Model

For each pillar, define one pillar page and 5–8 cluster topics:

```
Pillar: [Name]
  Pillar page (comprehensive guide):
    Title:    "[Definitive guide to X]"
    Keyword:  [Primary — high volume, competitive]
    Format:   Long-form article (2,500+ words)
    Goal:     Rank for head term; internal link target for all clusters

  Cluster topics (supporting articles targeting long-tail):
    1. "[Specific question or sub-topic]" — keyword: [long-tail], intent: [info/commercial]
    2. "[Specific question or sub-topic]" — keyword: [long-tail], intent: [info/commercial]
    3. "[Specific question or sub-topic]" — keyword: [long-tail], intent: [info/commercial]
    4. "[Specific question or sub-topic]" — keyword: [long-tail], intent: [info/commercial]
    5. "[Specific question or sub-topic]" — keyword: [long-tail], intent: [info/commercial]

  Internal linking rule: every cluster article links to the pillar page and to 2–3 sibling clusters.
```

### Step 3 — Content Calendar Table

```
Calendar: [Month / Period]
────────────────────────────────────────────────────────────────────────────────────────────────
Date       Channel      Format        Title / Angle                    Pillar  SEO keyword  Owner
────────────────────────────────────────────────────────────────────────────────────────────────
[Date]     Blog         Long-form     [Title]                          P1      [keyword]    [Name]
[Date]     Newsletter   Email         [Subject line concept]           P2      —            [Name]
[Date]     LinkedIn     Post          [Hook / angle]                   P1      —            [Name]
[Date]     YouTube      Video         [Title]                          P3      [keyword]    [Name]
[Date]     Twitter/X    Thread        [Thread topic]                   P2      —            [Name]
────────────────────────────────────────────────────────────────────────────────────────────────

Publishing cadence:
  Blog:       [X/week or X/month]
  Newsletter: [Weekly / bi-weekly]
  LinkedIn:   [X/week]
  Twitter/X:  [X/day]
  YouTube:    [X/month]
```

### Step 4 — Evergreen vs. Timely Balance

```
Content mix target:
  Evergreen (long shelf-life, compounds over time):  [%]
    Examples: guides, comparisons, how-tos, templates
    Rule: evergreen content must be reviewed for accuracy [quarterly / annually]

  Timely (news-driven, trending topics, seasonal):   [%]
    Examples: trend commentary, product news, event coverage
    Rule: only produce if turnaround is < [N] days; otherwise skip

  Campaign-specific (tied to a launch or push):      [%]
    Examples: product launch content, promotional posts
    Rule: produced to brief, retired after campaign ends
```

### Step 5 — Content Recycling Plan

Extract maximum value from every produced piece:

```
Recycling Matrix:
────────────────────────────────────────────────────────────────────────────────────
Original content     → Repurpose as                              Channel   Timeline
────────────────────────────────────────────────────────────────────────────────────
Long-form article    → Newsletter summary (300 words)            Email     +1 day
                     → LinkedIn post (key stat or insight)       LinkedIn  +2 days
                     → Twitter/X thread (5–7 tweets)             Twitter   +3 days
                     → Short video script (key points)           YouTube   +1 week

Video                → Transcript → edited blog post             Blog      +3 days
                     → Key quote graphics                        Social    +1 day
                     → Podcast audio (if standalone)             Podcast   +1 week

Research / data      → Infographic                               Visual    +3 days
                     → Press release hook                        PR        +1 day
                     → Sales enablement one-pager                Internal  +1 week
────────────────────────────────────────────────────────────────────────────────────
```

### Step 6 — Production and Approval Workflow

```
Production stages per piece:
  Brief issued:          [Who issues / template used]
  First draft due:       [X business days from brief]
  Internal review:       [Who reviews / turnaround: X days]
  SEO review:            [Who checks / turnaround: X days]
  Revisions due:         [X days from review]
  Final approval:        [Who signs off]
  Assets ready:          [Images, graphics, links — X days before publish]
  Scheduled to publish:  [Platform + time]
  Distribution:          [Email, social posts triggered]
  Performance check:     [30-day review scheduled]

Lead times by format:
  Long-form article:    [X] days from brief to publish
  Newsletter:           [X] days
  Social post:          [X] days
  Video:                [X] days
  Infographic:          [X] days
```

---

## Final Output
- 3–5 content pillars (mapped to business goals and search demand)
- Pillar-cluster SEO topic model per pillar
- Calendar table (date × channel × format × title × pillar × keyword × owner)
- Evergreen / timely / campaign content mix targets
- Content recycling matrix (primary formats → derivative formats)
- Production and approval workflow with lead times

**Recommended next skill**: `/ds-marketing-campaign-launch` — turns the calendar into a live campaign with go/no-go checklist, tracking setup, and monitoring plan.
