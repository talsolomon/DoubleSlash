---
name: ds-marketing-campaign-brief
description: Writes a campaign brief with SMART objectives, audience targeting spec, message hierarchy, channel plan, timeline, budget envelope, and KPIs. Use when starting a campaign, aligning stakeholders on scope, or asking "what is this campaign for and how will we know it worked". Also triggers on: Objective definition, audience targeting, message selection, channel strategy, measurement plan design.
tags: [marketing, define]
model: inherit
---

# Campaign Brief
**Domain**: Marketing | **Phase**: Define | **Invocation**: `/ds-marketing-campaign-brief`

## What this produces
A campaign brief that aligns team and stakeholders on objective, audience, core message, channels, timeline, budget envelope, and success metrics — everything needed to execute without re-asking scope questions.

## Methods
SMART objective definition, audience targeting spec, message hierarchy, channel strategy, timeline and milestone planning, budget allocation framework, KPI definition with baselines and targets, creative requirements, measurement plan, approval workflow design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Objective, audience, core message, primary channel, 2 KPIs |
| Tuna | Full brief: objective, audience, message, channels, timeline, KPIs |
| Salmon | Brief with budget framework, creative requirements, measurement plan |
| Willy | All methods — approval workflow, full measurement plan, stakeholder alignment doc |

## Execution prompt
You are running Campaign Brief for [project]. Write a brief that enables a team to execute without needing to re-ask scope questions.

**Input**: marketing goal, available channels, target audience (ICP name or description), budget envelope, timeline.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Section 1 — Campaign Objective

Apply SMART criteria:

```
Campaign name:       [Descriptive name — not just "Q3 campaign"]
Campaign type:       [Awareness / Consideration / Conversion / Retention / Re-engagement]

Objective:           [One sentence — what changes because of this campaign]
  Specific:          [What exactly is changing]
  Measurable:        [The number we're moving]
  Achievable:        [Why this target is realistic — comparable benchmarks]
  Relevant:          [Which business goal this serves]
  Time-bound:        [Deadline]

Business goal linked: [OKR or strategic initiative this campaign supports]
```

### Section 2 — Audience Targeting Spec

```
Primary audience: [ICP name from audience analysis]
  Firmographic/demographic filter:  [Specific parameters for targeting]
  Behavioral filter:                [Intent signals, job triggers, recent actions]
  Channel targeting setup:
    LinkedIn:   [Targeting parameters if applicable]
    Google:     [Keywords / audience lists if applicable]
    Meta:       [Lookalike / interest targeting if applicable]
    Email list: [Segment name and size]

Secondary audience (if any): [ICP name]
  Filter: [Parameters]
  Channel: [Where we reach them]

Exclusions: [Who to suppress — existing customers / recent converters / competitors]
```

### Section 3 — Message Hierarchy

```
Campaign theme:    [One phrase — the campaign's big idea]
Core message:      [One sentence — what we want the audience to believe after seeing this]

Message ladder:
  Headline:        [What stops them scrolling — 6–10 words]
  Sub-headline:    [What makes them read on — 1–2 sentences]
  Body:            [Why now, why us — 3 key proof points]
  CTA:             [One action, specific — not "Learn more"]

Proof points:      [3 specifics that make the core message credible]
  1. [Stat / case study / social proof]
  2. [Stat / case study / social proof]
  3. [Stat / case study / social proof]

Tone:             [How we sound — 3 adjectives]
What to avoid:    [Phrases, claims, or tones that undermine the message]
```

### Section 4 — Channel Plan

```
Channel Plan:
────────────────────────────────────────────────────────────────────
Channel       Role          Format(s)          Budget %   Owner
────────────────────────────────────────────────────────────────────
[Channel 1]  [Awareness /  [Ad / post /       [%]        [Name]
              Conv / Retain] email / video]
[Channel 2]
[Channel 3]
────────────────────────────────────────────────────────────────────
Total:                                         100%

Channel sequencing:
  Week 1–2:   [Warm-up / awareness phase — which channels lead]
  Week 3–4:   [Conversion push — which channels activate]
  Week 5+:    [Retargeting / nurture — which channels close]
```

### Section 5 — Timeline and Milestones

```
Campaign dates: [Start] → [End]

Milestone schedule:
  [Date]   Brief approved (this document)
  [Date]   Creative brief issued to creative team
  [Date]   First creative assets delivered
  [Date]   Creative review and feedback
  [Date]   Final assets approved
  [Date]   Tracking and UTM parameters set up
  [Date]   Go/no-go check
  [Date]   Campaign launches
  [Date]   Mid-campaign performance review
  [Date]   Campaign ends / assets turned off
  [Date]   Performance analysis complete
```

### Section 6 — Budget Allocation

```
Total budget envelope: $[X]

Allocation:
  Paid media (all channels combined):  [%] = $[X]
    [Channel breakdown if known]
  Creative production:                 [%] = $[X]
  Tools / tracking:                    [%] = $[X]
  Agency / freelancer fees:            [%] = $[X]
  Reserve / optimization budget:       [%] = $[X]

Budget pacing: [Even / front-loaded / back-loaded]
Reason:        [Why this pacing fits the objective]
```

### Section 7 — KPIs and Measurement Plan

```
KPI Table:
────────────────────────────────────────────────────────────────────
KPI              Formula             Baseline  Target    Measurement
────────────────────────────────────────────────────────────────────
[Primary KPI]   [How calculated]    [Current] [Goal]    [Tool/report]
[Secondary KPI] [How calculated]    [Current] [Goal]    [Tool/report]
[Efficiency KPI][How calculated]    [Current] [Goal]    [Tool/report]
────────────────────────────────────────────────────────────────────

UTM parameter standard:
  utm_source=   [channel name]
  utm_medium=   [cpc / email / social / organic]
  utm_campaign= [campaign-name-YYYYMM]
  utm_content=  [creative-variant]
  utm_term=     [keyword — paid search only]

Reporting cadence: [Daily during launch week / weekly thereafter]
Report owner:      [Name]
Review meeting:    [When and who attends]
```

### Section 8 — Creative Requirements

```
Deliverables:
  [Format]   [Size / spec]   [Quantity]   [Due date]   [Owner]
  Static ad: [dimensions]    [N variants] [date]        [name]
  Video:     [length/ratio]  [N variants] [date]        [name]
  Email:     [subject lines] [N versions] [date]        [name]
  Landing page: [URL / brief][N variants] [date]        [name]

Brand requirements: [Color palette, fonts, logo usage, tone]
Legal/compliance:   [Disclaimers, claims restrictions, required disclosures]
```

---

## Final Output
- Campaign objective (SMART format) with linked business goal
- Audience targeting spec (primary + secondary with channel parameters)
- Message hierarchy (theme → headline → sub-headline → CTA → proof points)
- Channel plan with roles, formats, budget %, and sequencing
- Timeline with milestone dates
- Budget allocation table
- KPI table with baselines, targets, UTM standards
- Creative deliverables list

**Recommended next skill**: `/ds-marketing-campaign-planning` — translates this brief into a full multi-channel execution plan with content matrix and owner assignments.


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
