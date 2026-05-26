---
name: ds-content-strategy-content-planning
description: Plans a content production program with topic briefs, format assignments, editorial calendar, capacity model, and repurposing plan. Use when building a quarter's content plan, managing a content team, or asking "what do we produce and when". Also triggers on: Topic ideation, content brief writing, format assignment, capacity planning, editorial calendar design, SEO topic clustering.
tags: [content-strategy, develop]
model: inherit
---

# Content Planning
**Domain**: Content Strategy | **Phase**: Develop | **Invocation**: `/ds-content-strategy-content-planning`

## What this produces
A content production plan: topic list with briefs, format assignments, editorial calendar, capacity model, publishing cadence, owner assignments, distribution schedule, and repurposing matrix — ready to hand to a team and execute.

## Methods
Topic ideation, content brief writing, format assignment, capacity planning, editorial calendar design, SEO topic clustering, content series design, repurposing plan, distribution sequencing

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Topic list (2 weeks), format assignments, cadence |
| Tuna | Full calendar, topic briefs, owners, distribution plan |
| Salmon | Calendar with SEO clustering, content series, repurposing plan |
| Willy | All methods — full quarter plan, capacity model, repurposing matrix |

## Execution prompt
You are running Content Planning for [project]. Produce an executable content plan for the planning period.

**Input**: content strategy (pillars, formats, channels), team capacity, upcoming business priorities, planning period.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Topic Ideation and Prioritization

Generate and rank topics by opportunity:

```
Topic Scoring Criteria (score 1-5 each):
  Search demand:    Does this topic have meaningful search volume?
  Audience fit:     Does it serve a clear ICP need or trigger?
  Pillar fit:       Does it belong to a defined content pillar?
  Business value:   Does it serve a conversion or retention goal?
  Production ease:  Can we produce this with available resources?

Topic shortlist:
────────────────────────────────────────────────────────────────────────────────────
Topic                       Pillar  Keyword         Format  Score  Priority
────────────────────────────────────────────────────────────────────────────────────
[Topic 1]                   [P1]    [keyword/mo]    Blog    [/25]  [H/M/L]
[Topic 2]                   [P2]    [keyword/mo]    Video   [/25]  [H/M/L]
[Topic 3]                   [P3]    [keyword/mo]    Email   [/25]  [H/M/L]
...
────────────────────────────────────────────────────────────────────────────────────
Top [N] selected for this planning period.
```

### Step 2 — Content Brief Template

Write a brief for each piece in the plan:

```
CONTENT BRIEF
──────────────────────────────────────────────────────
Title (working):      [Draft title]
Final title:          [To be confirmed at completion]
Format:               [Blog / Video / Newsletter / Social]
Pillar:               [Which content pillar]
Funnel stage:         [Awareness / Consideration / Decision / Retention]

SEO:
  Primary keyword:    [Keyword] — [volume/mo] — [current rank]
  Secondary keywords: [keyword 1], [keyword 2], [keyword 3]
  Search intent:      [Informational / Commercial / Transactional]
  Target SERP feature:[Featured snippet / listicle / how-to]

Audience:
  Who reads this:     [ICP name and situation]
  What they want:     [What they're trying to learn or accomplish]
  What they'll do after: [Action we want them to take]

Angle / POV:
  Our take:           [What makes this piece different from the top 10 results]
  Key insight:        [The one thing that should stick after reading]

Structure (suggested outline):
  H1: [Title]
  H2: [Section 1 — ~300 words]
  H2: [Section 2 — ~400 words]
  H2: [Section 3 — ~300 words]
  H2: [Key takeaways — bullet list]
  CTA: [Specific action]

Sources / research needed:
  - [Stat or example to find]
  - [Expert to quote or interview]
  - [Competing article to beat]

Internal links to include:
  - [Pillar page URL]
  - [Related cluster article URL]

Word count target: [800 / 1,200 / 2,000 / 2,500+]
Assigned to: [Name]
Brief issued: [Date]
Draft due: [Date]
Publish date: [Date]
──────────────────────────────────────────────────────
```

### Step 3 — Editorial Calendar

```
Editorial Calendar — [Period: Month / Quarter]
────────────────────────────────────────────────────────────────────────────────────────────
Week  Date      Channel    Format       Title / Topic                 Pillar  Owner  Status
────────────────────────────────────────────────────────────────────────────────────────────
W1    [Date]    Blog       Long-form    [Title]                       P1      [Name] Briefed
W1    [Date]    LinkedIn   Post         [Angle]                       P1      [Name] Briefed
W1    [Date]    Newsletter Email        [Subject concept]             P2      [Name] Briefed
W2    [Date]    Blog       Long-form    [Title]                       P2      [Name] Briefed
W2    [Date]    YouTube    Video        [Title]                       P3      [Name] Briefed
W2    [Date]    Twitter/X  Thread       [Topic]                       P1      [Name] Briefed
...
────────────────────────────────────────────────────────────────────────────────────────────

Publishing cadence:
  Blog:         [X/week]   Publish day: [Day of week]   Time: [HH:MM]
  Newsletter:   [X/week]   Send day:    [Day of week]   Time: [HH:MM]
  LinkedIn:     [X/week]   Post days:   [Days]          Time: [HH:MM]
  YouTube:      [X/month]  Publish day: [Day of week]   Time: [HH:MM]
  Twitter/X:    [X/day]    Scheduled:   [HH:MM per day]
```

### Step 4 — Capacity Model

```
Team Capacity:
────────────────────────────────────────────────────────────────────────
Role               Team member   Hrs/week available   Rate (if freelance)
────────────────────────────────────────────────────────────────────────
Content strategist  [Name]        [X hrs]             —
Writer              [Name]        [X hrs]             $[X/hr]
SEO                 [Name]        [X hrs]             —
Editor              [Name]        [X hrs]             —
Designer            [Name]        [X hrs]             $[X/hr]
Video producer      [Name]        [X hrs]             $[X/hr]
────────────────────────────────────────────────────────────────────────

Time required per format:
  Long-form article (1,500 words): research [X]h + writing [X]h + edit [X]h = [X]h total
  Short social post:               [X]h
  Newsletter:                      [X]h
  Video (scripted):                [X]h
  Case study:                      [X]h

Capacity vs. demand:
  Total hrs needed this period:    [X hrs]
  Total hrs available:             [X hrs]
  Gap:                             [X hrs over / under]
  Adjustment:                      [Which pieces to defer or simplify]
```

### Step 5 — Content Series Design

Group related pieces into series for compounding authority:

```
Series format:
  Series name:     [Name]
  Pillar:          [Which pillar]
  Theme:           [Connecting idea across all pieces]
  Episode count:   [N pieces]
  Cadence:         [Weekly / bi-weekly / monthly]
  Goal:            [Build authority on X topic / drive recurring traffic]

  Episode 1: [Title] — [Date]
  Episode 2: [Title] — [Date]
  Episode 3: [Title] — [Date]
  ...

  Cross-linking: each episode links to all others in the series
  Promotion: series landing page at [/series-name] links all episodes
```

### Step 6 — Repurposing Matrix

```
Repurposing Plan:
────────────────────────────────────────────────────────────────────────────────────────
Original         → Derivative 1          → Derivative 2         → Derivative 3
────────────────────────────────────────────────────────────────────────────────────────
Long-form blog   → Newsletter summary    → LinkedIn post         → Twitter thread
                   (300 words, +1 day)    (key insight, +2 days)  (thread, +3 days)
Video            → Blog (transcript+)    → Short clip (reel)     → Newsletter feature
                   (+3 days)              (+1 day)                (+1 week)
Original research→ Infographic           → Press hook            → Sales one-pager
                   (+3 days)              (+1 day)                (+1 week)
Case study       → Social proof post     → Sales email           → Webinar segment
                   (+1 day)              (+2 days)               (+2 weeks)
────────────────────────────────────────────────────────────────────────────────────────
Repurposing priority: Focus on pieces that earn traffic in first 30 days.
```

### Step 7 — Distribution Sequencing

```
Distribution plan per content piece:
  [Day 0]   Publish on [primary channel]
  [Day 0]   Share in [internal Slack / team channel] for internal amplification
  [Day 1]   Feature in newsletter (if edition within 48 hours)
  [Day 2]   Publish LinkedIn post (hook: [stat or insight from piece])
  [Day 3]   Publish Twitter/X thread or share clip
  [Day 5]   Share in relevant community (if genuinely useful, not promotional)
  [Day 14]  Check initial traffic — boost with paid if performing
  [Day 30]  Review: update if significant traffic opportunity, archive if not

Owner: [Name] responsible for distribution checklist per piece
Tool:  [Scheduling tool — Buffer / Hootsuite / native]
```

---

## Final Output
- Topic shortlist with scoring (ranked by opportunity)
- Content briefs for each piece in the plan
- Editorial calendar (date × channel × format × title × owner × status)
- Capacity model (team hrs vs. content demand)
- Content series design (if applicable)
- Repurposing matrix (original → derivative formats)
- Distribution sequencing plan per piece

**Recommended next skill**: `/ds-content-strategy-content-creation` — execute against the plan; write the first pieces from the briefs.


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
