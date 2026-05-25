---
name: ds-pr-communications-communications-retrospective
description: Reviews communications performance with coverage quality scoring, message pull-through analysis, share-of-voice movement, relationship health assessment, and strategy refinements. Use after a campaign, at annual reviews, or asking "did our communications achieve what we wanted". Also triggers on: Coverage volume review, message pull-through analysis, sentiment trends, share of voice, campaign ROI.
tags: [pr-communications, deliver]
model: inherit
---

# Communications Retrospective
**Domain**: PR/Communications | **Phase**: Deliver | **Invocation**: `/ds-pr-communications-communications-retrospective`

## What this produces
A communications retrospective: coverage performance by tier, message pull-through scores, sentiment trend, share-of-voice movement, relationship health assessment, campaign ROI analysis, and top 3 strategy adjustments for the next period.

## Methods
Coverage volume and quality review, message pull-through analysis, sentiment trend review, relationship health assessment, share of voice analysis, campaign ROI review, crisis and issue management review, strategy refinement recommendations

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Coverage summary, message pull-through, top 3 adjustments |
| Tuna | Retro with sentiment trends, relationship health |
| Salmon | Full retro with share of voice, campaign ROI |
| Willy | All methods — crisis review, full strategy refinement, next-period plan |

## Execution prompt
You are running Communications Retrospective for [project]. Assess whether communications moved the needle and define what changes next.

**Input**: coverage data from campaign, message architecture, reputation audit baseline, relationship log.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Coverage Performance Review

```
Campaign: [Name] | Period: [Start] → [End]

Coverage Volume:
────────────────────────────────────────────────────────────────────────
Tier     Target pieces   Actual pieces   Hit rate   vs. Prior campaign
────────────────────────────────────────────────────────────────────────
Tier 1   [N]             [N]             [%]        [+/-%]
Tier 2   [N]             [N]             [%]        [+/-%]
Tier 3   [N]             [N]             [%]        [+/-%]
Podcast  [N]             [N]             [%]        [+/-%]
Newsletter[N]            [N]             [%]        [+/-%]
Total    [N]             [N]             [%]        [+/-%]
────────────────────────────────────────────────────────────────────────

Coverage Quality Scoring (1-5 per piece):
  Scoring dimensions:
    Outlet authority (1-5):       Tier 1 = 5, Tier 2 = 3, Tier 3 = 1
    Message inclusion (1-5):      All 3 core messages = 5, 2 = 3, 1 = 2, none = 0
    Prominence (1-5):             Front page / lead story = 5, buried = 1
    Sentiment (1-5):              Positive = 5, Neutral = 3, Mixed = 2, Negative = 0
    Reach (1-5):                  Audience size estimate

  Top 5 pieces by quality score:
    1. [Outlet / Title / URL] — score: [/25] — why: [What made it strong]
    2. [...]
    3. [...]
    4. [...]
    5. [...]

  Average quality score: [X/25]
  Quality vs. prior campaign: [+/- X points]
```

### Step 2 — Message Pull-Through Analysis

```
Message pull-through: % of coverage articles that include each core message

────────────────────────────────────────────────────────────────────────
Core message           Appearances   Coverage %   vs. Target   Assessment
────────────────────────────────────────────────────────────────────────
Message 1: [Name]      [N articles]  [%]          [target: %]  [On track / Under / Over]
Message 2: [Name]      [N articles]  [%]          [target: %]  [Assessment]
Message 3: [Name]      [N articles]  [%]          [target: %]  [Assessment]
SOCO                   [N articles]  [%]          [target: %]  [Assessment]
────────────────────────────────────────────────────────────────────────

Pull-through interpretation:
  > 60% pull-through: Message is landing well — maintain
  40–60%: Needs stronger emphasis in pitches and spokesperson training
  < 40%: Message is not resonating — evaluate if it's the message or the proof points

Highest pull-through message: [Message] — [Why it landed — angle / proof point / journalist appetite]
Lowest pull-through: [Message] — root cause: [Message unclear / not news / buried in pitch]

Adjustments for next campaign:
  [Specific change to messaging approach, proof points, or pitch framing]
```

### Step 3 — Sentiment Trend

```
Sentiment over the campaign period:
────────────────────────────────────────────────────────────────────────
Week         Positive   Neutral   Negative   Net sentiment   Key driver
────────────────────────────────────────────────────────────────────────
Pre-launch   [%]        [%]       [%]        [net]           [baseline]
Launch week  [%]        [%]       [%]        [net]           [what drove it]
Week 2       [%]        [%]       [%]        [net]           [what drove it]
Week 3       [%]        [%]       [%]        [net]           [what drove it]
────────────────────────────────────────────────────────────────────────
Net sentiment change: [Baseline → End] = [+/- X points]

Negative coverage analysis:
  Piece: [Outlet / Title]
  Root cause: [Message gap / inaccuracy / hostile journalist / legitimate criticism]
  Response taken: [Correction / No response / Clarification]
  Lingering risk: [Y/N — what stays in the news cycle]
```

### Step 4 — Share of Voice Movement

```
Share of Voice — Before vs. After:
────────────────────────────────────────────────────────────────────────
Company          Pre-campaign SOV   Post-campaign SOV   Change
────────────────────────────────────────────────────────────────────────
[Us]             [%]                [%]                 [+/-%]
[Competitor A]   [%]                [%]                 [+/-%]
[Competitor B]   [%]                [%]                 [+/-%]
[Competitor C]   [%]                [%]                 [+/-%]
────────────────────────────────────────────────────────────────────────

SOV interpretation:
  Gained share from: [Competitor] — likely reason: [Their silence / our stronger story]
  Lost share to: [Competitor] — likely reason: [Their counter-announcement / our message gaps]

SOV target for next period: [%] — requires: [X additional T1 placements / month]
```

### Step 5 — Relationship Health Assessment

```
Journalist relationship audit:
────────────────────────────────────────────────────────────────────────
Journalist    Outlet    Relationship before   After   Action
────────────────────────────────────────────────────────────────────────
[Name]        T1        Cold                  Warm    Follow on social; nurture
[Name]        T1        Warm                  Strong  Invite to exclusive next campaign
[Name]        T2        Strong                Strong  Maintain — regular updates
[Name]        T1        Cold                  Cold    Research different angle for next pitch
[Name]        T2        Warm                  Cold    Understand what went wrong
────────────────────────────────────────────────────────────────────────

Relationship-building actions for next quarter:
  □ Share useful (non-promotional) information with top 5 contacts monthly
  □ Congratulate journalists on good coverage (even if not about us)
  □ Offer exclusive data points without asking for coverage in return
  □ Invite top contacts to product briefings and beta programs early

New relationships built this campaign: [N contacts moved from Cold → Warm or Warm → Strong]
Relationships damaged (if any): [Name] — [What happened] — [Recovery plan]
```

### Step 6 — Campaign ROI Assessment

```
Communications ROI:
────────────────────────────────────────────────────────────────────────
Input                     Value
────────────────────────────────────────────────────────────────────────
Campaign investment:      [Hours × rate + external spend] = $[X]
Coverage pieces:          [N total]
Estimated media value:    [N pieces × avg. equivalent ad value] = $[X]
                          (Note: earned media value is a directional metric, not gospel)
Share of voice gain:      [+X%]
Message pull-through:     [avg %]
────────────────────────────────────────────────────────────────────────

Pipeline impact (if measurable):
  Web traffic spike during launch: [+X% sessions on D0-D3]
  MQL increase during campaign:    [+X% vs. prior period]
  Sales attribution (ask sales):   [N deals mention press coverage in sourcing]

ROI verdict: [Strong / Adequate / Insufficient — and why]
```

### Step 7 — Strategy Adjustments for Next Period

```
Top 3 adjustments:

1. [Specific change]:
   Why: [What data from this campaign drives this]
   How: [Specific action to implement next campaign]
   Owner: [Name]

2. [Specific change]:
   Why: [Data driver]
   How: [Specific action]
   Owner: [Name]

3. [Specific change]:
   Why: [Data driver]
   How: [Specific action]
   Owner: [Name]

Keep doing:
  [What worked well — don't change in service of variety]

Stop doing:
  [What consistently underperforms — make the call to cut it]

Next campaign priority focus: [Topic / angle / channel that this retro points toward]
```

---

## Final Output
- Coverage performance (volume × quality score × tier)
- Message pull-through analysis (per message, with interpretation)
- Sentiment trend (pre-launch through end of campaign)
- Share of voice movement (before vs. after vs. competitors)
- Relationship health assessment with follow-up actions
- Campaign ROI analysis (investment vs. output vs. pipeline impact)
- Top 3 strategy adjustments for next period

**Recommended next skill**: `/ds-pr-communications-reputation-audit` — run an updated audit to confirm reputation movement and reset the baseline for the next campaign cycle.
