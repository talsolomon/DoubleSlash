---
name: ds-pr-communications-media-landscape
description: Maps the media landscape with outlet tier ranking, journalist beat analysis, editorial calendars, and a relationship opportunity map. Use when planning a launch, building a media list, or asking "who covers our space and what do they care about". Also triggers on: Outlet identification, journalist beat mapping, competitor coverage research, podcast and newsletter landscape mapping.
tags: [pr-communications, discover]
model: inherit
---

# Media Landscape
**Domain**: PR/Communications | **Phase**: Discover | **Invocation**: `/ds-pr-communications-media-landscape`

## What this produces
A media landscape brief: tiered outlet inventory, journalist profiles with beat analysis, competitor coverage patterns, editorial calendar opportunities, podcast/newsletter layer, and a 20-contact priority outreach list.

## Methods
Outlet identification and tier ranking, journalist beat mapping, recent coverage analysis, competitor coverage research, editorial calendar research, podcast and newsletter landscape, social media influence mapping, relationship gap identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 20 outlets, key journalists per beat, coverage trends |
| Tuna | Landscape with beat mapping, competitor coverage, editorial calendars |
| Salmon | Full landscape with podcast/newsletter layer, influence map |
| Willy | All methods — full media database, relationship strategy, outreach sequencing |

## Execution prompt
You are running Media Landscape for [project]. Map the media ecosystem to inform who to pitch, how to reach them, and what angles will land.

**Input**: industry, company/product type, announcement or campaign context.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Outlet Tier Classification

```
Tier definition:
  Tier 1: National/global media — high authority, broad reach, competitive to land
           Examples: NYT, WSJ, TechCrunch, Bloomberg, Forbes, Wired, The Economist
  Tier 2: Industry verticals — targeted reach, strong credibility with ICP
           Examples: [Domain-specific trade publications, industry newsletters]
  Tier 3: Niche, regional, community — smaller but highly targeted
           Examples: [Niche blogs, regional business press, community podcasts]

Outlet Inventory:
────────────────────────────────────────────────────────────────────────────────────
Tier  Outlet name       Audience size  Domain focus    Pitch difficulty  Priority
────────────────────────────────────────────────────────────────────────────────────
T1    [Outlet]          [N readers]    [Focus area]    [High/Med/Low]    [H/M/L]
T1    [Outlet]
T2    [Outlet]
T2    [Outlet]
T3    [Outlet]
────────────────────────────────────────────────────────────────────────────────────
```

### Step 2 — Journalist Beat Mapping

Profile key journalists per beat:

```
Journalist Profile Template:
────────────────────────────────────────────────────────────────────────
Name:              [Full name]
Outlet:            [Publication]
Beat:              [Specific coverage area — e.g., "enterprise SaaS, AI tools, startup funding"]
Contact:           [Twitter/X handle — most journalists prefer Twitter DM or email]
Recent articles:   [Last 3 headlines — what they actually cover]
Story preferences: [Long-form analysis / breaking news / data-driven / founder profiles]
Relationship status: [Cold / Warm / Active relationship]
Angle that fits:   [How our story connects to their beat — specific]
Pitch risk:        [Anything that makes us a bad fit — e.g., "covered competitor favorably"]
────────────────────────────────────────────────────────────────────────

Priority journalists by beat:
  [Beat 1 — e.g., AI/enterprise software]:
    Top contact: [Name] — [Outlet] — why: [Specific recent coverage that fits]
    Second: [Name] — [Outlet]

  [Beat 2]:
    Top contact: [Name] — [Outlet]
    Second: [Name] — [Outlet]
```

### Step 3 — Competitor Coverage Analysis

```
How competitors are covered:
────────────────────────────────────────────────────────────────────────
Competitor    Coverage volume   Outlets covering   Angles used      Journalists
────────────────────────────────────────────────────────────────────────
[Comp A]      [N/90 days]       [List]             [Funding / PR story / Product] [Names]
[Comp B]      [N/90 days]       [List]             [Angles]         [Names]
────────────────────────────────────────────────────────────────────────

Coverage pattern insights:
  Which outlets seem most open to this space: [Outlet names]
  Which journalists write about competitors: [Names — these are warm to the space]
  What story angles are overused: [Avoid these — editors are tired of them]
  What story angles are underused: [Opportunity gaps — uncovered territory]
```

### Step 4 — Editorial Calendar Research

```
Upcoming editorial opportunities:
────────────────────────────────────────────────────────────────────────
Date     Publication    Theme / Special issue    Lead time    Fit for us?
────────────────────────────────────────────────────────────────────────
[Date]   [Outlet]       [Annual list / topic]    [6 wks]      [Y/N — why]
[Date]   [Outlet]       [Awards / rankings]      [3 months]   [Y/N — why]
[Date]   [Conference]   [Speaking / media]       [4 months]   [Y/N — why]
────────────────────────────────────────────────────────────────────────

Award / recognition opportunities:
  [Award name] — submission deadline: [Date] — eligibility: [Criteria]
  [Award name] — deadline: [Date] — eligibility: [Criteria]

Conference media opportunities:
  [Conference] — [Date] — [Media credential / press room / briefing availability]
```

### Step 5 — Podcast and Newsletter Landscape

```
Podcast landscape — [Domain]:
────────────────────────────────────────────────────────────────────────
Podcast          Host           Audience size   Format        Guest pitch process
────────────────────────────────────────────────────────────────────────
[Podcast name]   [Host name]    [N listeners]   [Interview]   [Email / form / agent]
────────────────────────────────────────────────────────────────────────

Newsletter landscape:
────────────────────────────────────────────────────────────────────────
Newsletter       Author         Subscribers     Audience fit  Collaboration type
────────────────────────────────────────────────────────────────────────
[Newsletter]     [Author]       [N]             [H/M/L]       [Guest post / sponsor / mention]
────────────────────────────────────────────────────────────────────────

Podcast/newsletter priority: [Top 3 with highest audience fit + lowest pitch difficulty]
```

### Step 6 — Social Media Influence Map

```
Influential voices in this space (beyond traditional media):
────────────────────────────────────────────────────────────────────────
Handle/name    Platform    Followers   Topic focus   Relationship type
────────────────────────────────────────────────────────────────────────
[Handle]       LinkedIn    [N]         [Focus]       [Analyst / practitioner / investor]
[Handle]       Twitter/X   [N]         [Focus]       [Type]
────────────────────────────────────────────────────────────────────────

Top 5 influencers to engage (not pitch — build relationship with):
  1. [Name] — why: [Their reach, their audience fit, their credibility]
  2. [Name]
  ...
```

### Step 7 — Priority 20-Contact Outreach List

```
Priority media contact list:
────────────────────────────────────────────────────────────────────────────────────────
Rank  Name             Outlet      Tier  Beat                    Contact method  Priority angle
────────────────────────────────────────────────────────────────────────────────────────
1.    [Name]           [Outlet]    T1    [Beat]                  [Method]        [Angle]
2.    [Name]
3.    [Name]
...
20.   [Name]
────────────────────────────────────────────────────────────────────────────────────────

Contact priority logic:
  Top 5 (exclusive candidates): highest reach + most relevant beat + open to this story type
  6–10 (simultaneous tier 1 pitch): Tier 2 outlets where we're competitive
  11–20 (broad outreach): Tier 2-3, podcast hosts, newsletter authors
```

---

## Final Output
- Outlet tier inventory (T1/T2/T3 with audience size and pitch difficulty)
- Journalist profiles (beat, recent articles, story preference, fit assessment)
- Competitor coverage analysis (which outlets, which angles, which journalists)
- Editorial calendar opportunities with lead times
- Podcast and newsletter landscape (top options with collaboration type)
- Social influence map (top 5 to cultivate)
- Priority 20-contact outreach list with angles per contact

**Recommended next skill**: `/ds-pr-communications-message-architecture` — build the message architecture before designing the campaign and pitches.
