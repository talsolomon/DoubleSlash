---
name: ds-pr-communications-pr-campaign-design
description: Designs a PR campaign with news hook formula, asset plan, embargo/exclusive strategy, media tier targeting, owned channel integration, and campaign timeline. Use when planning a product launch, company announcement, or asking "how do we create a campaign that earns coverage". Also triggers on: News hook development, press release design, media kit planning, embargo strategy, influencer outreach design.
tags: [pr-communications, develop]
model: inherit
---

# PR Campaign Design
**Domain**: PR/Communications | **Phase**: Develop | **Invocation**: `/ds-pr-communications-pr-campaign-design`

## What this produces
A PR campaign design: news hook, campaign narrative, full asset plan, embargo and exclusive strategy, media tier targets, owned channel integration, paid amplification options, and a campaign timeline.

## Methods
News hook development, campaign narrative design, asset planning, influencer and media target identification, embargo and exclusive strategy, owned channel integration, paid amplification design, campaign timeline design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | News hook, asset list, media targets, timeline |
| Tuna | Campaign design with embargo strategy, owned channel plan |
| Salmon | Full design with influencer strategy, paid amplification |
| Willy | All methods — full asset plan, exclusive strategy, multi-market adaptation |

## Execution prompt
You are running PR Campaign Design for [project]. Design the campaign that earns attention and drives the narrative.

**Input**: message architecture, media landscape findings, announcement details.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — News Hook Development

```
The hook is everything. A technically correct press release with no hook gets no coverage.

News hook formula: [WHO] did [WHAT] that is [WHY NOW] + [WHY THIS MATTERS]

Hook quality test:
  □ Why would a journalist's audience care about this — specifically?
  □ Does it have a "first," "largest," "only," or "fastest" angle?
  □ Does it connect to a trend already in the news cycle?
  □ Is there a human story that makes data tangible?
  □ Can it be summarized in one sentence under 25 words?

Hook options (generate 3, select 1):
  Hook A — [Data/milestone angle]:
    "[Company] announces [metric] that [impact], making it [position claim]"
    Journalist appeal: [Why this lands for their audience]

  Hook B — [Trend/timing angle]:
    "As [industry trend], [Company] [action] to [outcome]"
    Journalist appeal: [Why this is timely]

  Hook C — [Human/story angle]:
    "[Customer/use case story] — the [outcome] that shows [larger point]"
    Journalist appeal: [Why this is relatable and concrete]

Selected hook: [A / B / C]
One-sentence version: "[Final hook — ≤25 words]"
```

### Step 2 — Campaign Narrative Arc

```
The narrative arc gives journalists the story structure — not just the facts.

Narrative structure (use this framework):
  The world before:  [What the problem / gap / status quo was]
  The change:        [What changed — our announcement, product, data, milestone]
  The world after:   [What's now possible that wasn't before]
  The implication:   [What this means for the industry / customer / future]

Written narrative (150–200 words, journalist-ready):
"[Paragraph 1: The world before — set up the problem]

[Paragraph 2: The change — announce it with the hook]

[Paragraph 3: The proof — evidence, data, customer story]

[Paragraph 4: The implication — why this matters beyond the company]"

Headline variations:
  News wire style:     "[Company] Announces [What] — [Impact Stat]"
  Feature story style: "[What Changed] Is Reshaping [Industry]"
  Analysis angle:      "Why [Trend] Is [Outcome] — And What [Company] Is Doing About It"
```

### Step 3 — Asset Plan

```
Campaign asset list:
────────────────────────────────────────────────────────────────────────
Asset                    Owner    Due date    Status    Reviewed by
────────────────────────────────────────────────────────────────────────
Press release            [Name]   [Date]      Draft     [Legal / Comms lead]
Executive Q&A (FAQs)     [Name]   [Date]      Draft     [Spokesperson]
Media kit / press page   [Name]   [Date]      Draft     [Design]
Key stats one-pager      [Name]   [Date]      Draft     [Data team]
Spokesperson headshots   [Name]   [Date]      Ready     —
Product screenshots/demo [Name]   [Date]      Draft     [Product]
Customer quote / case    [Name]   [Date]      Draft     [Customer approval]
Video b-roll / demo      [Name]   [Date]      Draft     [Video]
Social share assets      [Name]   [Date]      Draft     [Design]
Blog post (owned)        [Name]   [Date]      Draft     [Editorial]
────────────────────────────────────────────────────────────────────────

Press release structure:
  Headline: [Hook — ≤12 words]
  Subhead:  [Supporting detail — 1 sentence]
  Para 1:   [City, Date] — [Who, What, Why it matters — 4-6 sentences]
  Para 2:   [Spokesperson quote — newsworthy, not promotional]
  Para 3:   [Context — market, trend, customer proof]
  Para 4:   [Customer or partner quote if available]
  Para 5:   [Forward look / next steps]
  Boilerplate: [Standard company description — 50 words]
  Contact:  [PR contact name, email, phone]
```

### Step 4 — Embargo and Exclusive Strategy

```
Embargo strategy:
  Use embargo when: story needs setup time / journalists need to write / complex announcement
  Don't use when: information is time-sensitive / leak risk is high / story is simple

  Embargo date/time: [Date at HH:MM timezone]
  Embargo language: "This information is provided under embargo until [date/time timezone].
                     Publication before this time will result in removal from future press lists."

Exclusive strategy:
  Offer an exclusive when: story is strong enough / you want a specific journalist's framing / launch needs a tier-1 anchor

  Exclusive approach:
    Offer to: [Top tier-1 journalist — the one whose byline adds most credibility]
    Offer type: [First to publish / interview access / data first look]
    Decision window: [48-hour response window before opening to others]
    Fallback: [If declined, offer to next journalist on list]

  Exclusive negotiation:
    What we offer: [Access / time / data / interview with spokesperson]
    What we expect: [Publication at / after embargo lift / on specific date]
    What we don't control: [Angle / headline / final story — acknowledge this]

Non-exclusive pitch timing (after exclusive is placed or declined):
  Simultaneous pitch: [All tier-1 contacts at same time — after exclusive declines]
  Tier-2 pitch: [24-48h after tier-1 outreach, or after first story publishes]
  Tier-3 / follow-on: [After tier-1 and tier-2 coverage is in]
```

### Step 5 — Media Target Tier Plan

```
Tier structure for this campaign:
────────────────────────────────────────────────────────────────────────────────────────
Tier   Outlets / contacts          Angle for this tier    Pitch approach   Timeline
────────────────────────────────────────────────────────────────────────────────────────
T1     [List — 3-5 outlets]        [Major announcement]   Exclusive first  D-7 briefing
T2     [List — 5-10 outlets]       [Industry angle]       Simultaneous     D-0 embargo lift
T3     [List — 10-20 outlets]      [Community angle]      Broadcast pitch  D+1
Podcast[List — 3-5 podcasts]       [In-depth interview]   Personalized     D-0 to D+14
Newsletter[List — 3-5 newsletters] [Feature or mention]   Personalized     D+1 to D+7
────────────────────────────────────────────────────────────────────────────────────────
```

### Step 6 — Owned Channel Integration

```
Owned channel plan (coordinate with paid/earned for maximum impact):
────────────────────────────────────────────────────────────────────────
Channel       Content                  Timing vs. embargo   Owner
────────────────────────────────────────────────────────────────────────
Blog          Full launch post         At embargo lift      [Name]
Website       Press page updated       At embargo lift      [Name]
LinkedIn      Launch post (CEO voice)  At embargo lift      [Name]
Twitter/X     Thread + link to post    At embargo lift      [Name]
Email         Customer/subscriber note At embargo lift      [Name]
Internal      All-hands or Slack post  Before embargo lift  [Name]
────────────────────────────────────────────────────────────────────────

Internal communication rule: employees should never learn company news from press coverage.
Brief team [X hours] before embargo lifts.
```

### Step 7 — Campaign Timeline

```
PR Campaign Timeline:
────────────────────────────────────────────────────────────────────────
Date           Milestone                                    Owner
────────────────────────────────────────────────────────────────────────
[D-21]         Message architecture approved                [Comms lead]
[D-14]         All assets drafted                           [Team]
[D-10]         Legal review of press release                [Legal]
[D-7]          Exclusive briefing (if offering one)         [PR lead]
[D-5]          Spokesperson media training                  [PR lead]
[D-3]          All assets final + approved                  [All owners]
[D-2]          Embargo pitches sent to T1 / T2              [PR lead]
[D-1]          Internal team briefed                        [Comms lead]
[D-0, HH:MM]   Embargo lifts — owned channels go live       [All owners]
[D-0, HH:MM+1] Monitor coverage; engage comments           [PR lead]
[D+1]          T3 and podcast/newsletter outreach           [PR lead]
[D+3]          Coverage log reviewed; follow-up on silence  [PR lead]
[D+7]          Mid-campaign performance check               [Comms lead]
[D+14]         Campaign close report                        [PR lead]
────────────────────────────────────────────────────────────────────────
```

---

## Final Output
- News hook (3 options → 1 selected, one-sentence version)
- Campaign narrative arc (150–200 words, journalist-ready)
- Asset plan (all deliverables with owners and due dates)
- Press release structure with guidance
- Embargo and exclusive strategy
- Media tier plan (T1/T2/T3 + podcast + newsletter)
- Owned channel integration plan
- Campaign timeline with milestones

**Recommended next skill**: `/ds-pr-communications-media-outreach-planning` — turn the campaign design into personalized pitches and an outreach execution plan.
