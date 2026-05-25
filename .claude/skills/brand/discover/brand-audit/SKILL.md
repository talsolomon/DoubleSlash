---
name: ds-brand-brand-audit
description: Audits brand consistency across all touchpoints with consistency scoring, asset inventory, brand equity assessment, and a prioritized fix list. Use when refreshing a brand, diagnosing inconsistency, or asking "how is our brand showing up and where is it broken". Also triggers on: Visual consistency audit, voice and tone audit, brand touchpoint mapping, asset inventory, perception gap analysis.
tags: [brand, discover]
model: inherit
---

# Brand Audit
**Domain**: Brand | **Phase**: Discover | **Invocation**: `/ds-brand-brand-audit`

## What this produces
A brand audit report: full touchpoint map with consistency scores, asset inventory gaps, brand equity dimension assessment, perception gap analysis, and a prioritized fix list with severity ratings.

## Methods
Visual consistency audit, voice and tone audit, brand touchpoint mapping, asset inventory, competitor perception comparison, customer perception research, internal brand alignment assessment, digital presence audit, employer brand assessment

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Visual consistency check, top 3 inconsistencies, asset gaps |
| Tuna | Full consistency audit, touchpoint map, digital presence review |
| Salmon | Audit with perception gap analysis, competitor comparison |
| Willy | All methods — customer perception research, employer brand, full asset inventory |

## Execution prompt
You are running a Brand Audit for [project]. Assess where the brand is consistent, where it's broken, and what matters most to fix.

**Input**: brand assets available (logo files, guidelines, website, social profiles, marketing materials), any known perception concerns.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Touchpoint Map

```
Brand touchpoint inventory:
────────────────────────────────────────────────────────────────────────
Category     Touchpoint                    Exists?   Last updated   Priority
────────────────────────────────────────────────────────────────────────
Digital      Website                       [Y/N]     [Date]         High
             Social profiles (each)        [Y/N]     [Date]         High
             Email templates               [Y/N]     [Date]         High
             Email signature               [Y/N]     [Date]         Medium
             Digital ads                   [Y/N]     [Date]         Medium
             App / product UI              [Y/N]     [Date]         High
             Presentation templates        [Y/N]     [Date]         Medium
Print        Business cards                [Y/N]     [Date]         Low
             Brochures / one-pagers        [Y/N]     [Date]         Medium
             Signage                       [Y/N]     [Date]         Low
People       Sales pitch and demo          [Y/N]     [Date]         High
             Customer support language     [Y/N]     [Date]         High
             Job postings                  [Y/N]     [Date]         Medium
             Onboarding materials          [Y/N]     [Date]         Medium
Partner      Co-marketing assets           [Y/N]     [Date]         Medium
             Partner portal / assets       [Y/N]     [Date]         Low
────────────────────────────────────────────────────────────────────────
```

### Step 2 — Consistency Scoring

Score each touchpoint (1–5) across 4 dimensions:

```
Scoring rubric:
  Visual consistency (1-5): Does it use the correct logo, colors, and typography?
  Voice consistency (1-5):  Does it match brand tone and language standards?
  Message consistency (1-5): Is the positioning and value prop on-brand?
  Quality (1-5):             Is the execution professional and polished?

Touchpoint Scoring:
────────────────────────────────────────────────────────────────────────
Touchpoint          Visual  Voice  Message  Quality  Total /20  Grade
────────────────────────────────────────────────────────────────────────
Website             [1-5]   [1-5]  [1-5]    [1-5]    [/20]      [A-F]
LinkedIn profile    [1-5]   [1-5]  [1-5]    [1-5]    [/20]      [A-F]
Email templates     [1-5]   [1-5]  [1-5]    [1-5]    [/20]      [A-F]
Sales deck          [1-5]   [1-5]  [1-5]    [1-5]    [/20]      [A-F]
...
────────────────────────────────────────────────────────────────────────
Grade: 18-20=A / 14-17=B / 10-13=C / 6-9=D / 1-5=F

Average brand consistency score: [X/20]
Highest scoring touchpoint: [Name] ([X/20]) — what's working well there
Lowest scoring touchpoint:  [Name] ([X/20]) — priority fix
```

### Step 3 — Asset Inventory

```
Asset inventory gaps:
────────────────────────────────────────────────────────────────────────
Asset category      Status                Gap / issue
────────────────────────────────────────────────────────────────────────
Logo files          [All formats / partial] [Missing: SVG / dark mode / favicon]
Color palette       [Documented / not]      [No hex codes documented]
Typography          [Licensed / unclear]    [Font licensing unclear]
Photography         [Library exists / not]  [No approved image library]
Illustration style  [Defined / not]         [No style direction]
Icon set            [Consistent / mixed]    [Multiple icon styles in use]
Templates           [Created / missing]     [No email or deck templates]
Brand guidelines    [Exists / partial / none] [Outdated or missing]
────────────────────────────────────────────────────────────────────────
Critical gaps (block new assets from being created consistently):
  [Gap 1] — impact: [what breaks without it]
  [Gap 2]
```

### Step 4 — Brand Equity Assessment

```
Brand equity dimensions (assess via available data — surveys, reviews, coverage):
────────────────────────────────────────────────────────────────────────
Dimension         Score (1-5)  Evidence                     vs. Competitors
────────────────────────────────────────────────────────────────────────
Awareness         [1-5]        [Unaided awareness % / search volume]  [High/Med/Low]
Association       [1-5]        [What people associate us with — surveys/reviews] [Strong/Weak]
Perceived quality [1-5]        [Review scores / NPS / analyst rating] [Above/At/Below]
Loyalty           [1-5]        [Retention rate / NPS promoters]       [High/Med/Low]
────────────────────────────────────────────────────────────────────────
Overall brand equity score: [X/20]
Strongest equity dimension: [Dimension] — protect this in any brand change
Weakest equity dimension:   [Dimension] — address with communications investment
```

### Step 5 — Perception Gap Analysis

```
Desired vs. actual brand perception:
────────────────────────────────────────────────────────────────────────
Attribute           Desired perception   Actual perception    Gap severity
────────────────────────────────────────────────────────────────────────
[Innovation]        Leading-edge         Solid but dated      High
[Trustworthy]       Industry standard    Mixed                Medium
[Premium]           Premium quality      Mid-market           High
[Friendly/human]    Approachable         Corporate/cold       Medium
────────────────────────────────────────────────────────────────────────
Perception data source: [Customer interviews / reviews / surveys / media coverage]
```

### Step 6 — Priority Fix List

```
Priority issues (ranked by impact × effort to fix):
────────────────────────────────────────────────────────────────────────
Priority  Issue                      Severity  Effort  Impact  Recommended action
────────────────────────────────────────────────────────────────────────
P1        [Inconsistent logo usage]  [5/5]     [Low]   [High]  Update asset library + guidelines
P2        [Off-brand sales deck]     [4/5]     [Med]   [High]  Redesign template
P3        [Website voice off-brand]  [3/5]     [High]  [Med]   Rewrite with editorial guidelines
P4        [No email template]        [3/5]     [Low]   [Med]   Create template
P5        [Typography inconsistency] [2/5]     [Med]   [Low]   Document standard in guidelines
────────────────────────────────────────────────────────────────────────
```

---

## Final Output
- Full touchpoint map (all brand expressions inventoried)
- Consistency scores per touchpoint (4-dimension, 1-20 scale, grade)
- Asset inventory with gap identification
- Brand equity assessment (4 dimensions with evidence)
- Perception gap analysis (desired vs. actual)
- Priority fix list (P1-P5 with severity, effort, and recommended action)

**Recommended next skill**: `/ds-brand-competitive-brand-analysis` — benchmark audit findings against the competitive brand landscape before defining positioning.
