---
name: ds-pr-communications-media-outreach-planning
description: Plans targeted media outreach with personalized pitch templates, contact priority tiers, outreach sequence, embargo management, and follow-up cadence. Use when preparing to pitch journalists, planning a media tour, or asking "how do we actually get coverage". Also triggers on: Contact prioritization, pitch personalization, outreach sequence design, exclusive offer strategy, follow-up cadence.
tags: [pr-communications, develop]
model: inherit
---

# Media Outreach Planning
**Domain**: PR/Communications | **Phase**: Develop | **Invocation**: `/ds-pr-communications-media-outreach-planning`

## What this produces
A media outreach plan: tiered contact list with personalization notes, pitch templates (one per tier), outreach sequence with timing, embargo management protocol, follow-up cadence, and response management process.

## Methods
Contact prioritization, pitch personalization strategy, outreach sequence design, embargo management, exclusive offer strategy, follow-up cadence, response tracking, spokesperson briefing design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Contact list, pitch approach, outreach sequence |
| Tuna | Outreach plan with personalization, follow-up cadence |
| Salmon | Full plan with embargo management, exclusive strategy |
| Willy | All methods — spokesperson briefings, full pitch library, response tracking |

## Execution prompt
You are running Media Outreach Planning for [project]. Build the outreach plan that earns coverage through personalization and discipline.

**Input**: PR campaign design, media landscape, message architecture.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Contact Priority List

```
Priority tiers:
  Tier A (exclusive / first offer): 1 journalist — highest reach, best fit, open to this angle
  Tier B (simultaneous T1 pitch):  3–5 journalists — top-tier, personalized simultaneously
  Tier C (broad T2 pitch):         10–15 outlets — industry vertical, personalized by beat
  Tier D (broadcast T3):           10–20 contacts — niche, regional, podcast, newsletter

Contact list:
────────────────────────────────────────────────────────────────────────────────────────────
Tier  Name             Outlet       Beat              Contact method   Personalization note
────────────────────────────────────────────────────────────────────────────────────────────
A     [Name]           [Outlet]     [Beat]            [Email / DM]     [Their recent article + angle fit]
B     [Name]           [Outlet]     [Beat]            [Email]          [Their specific interest]
B     [Name]           [Outlet]     [Beat]            [Email]          [Their specific interest]
C     [Name]           [Outlet]     [Beat]            [Email]          [Beat connection]
...
────────────────────────────────────────────────────────────────────────────────────────────
```

### Step 2 — Pitch Templates

**Pitch formula: Hook (1 sentence) + Context (1-2 sentences) + Ask (1 sentence) + Offer (1 sentence). Total: ≤150 words.**

```
TIER A PITCH — Exclusive offer:
──────────────────────────────────────────────────────────────────
Subject: [Specific to their beat — not "exciting news" or "press release"]
        Example: "Exclusive: [Company] data showing [finding] — ahead of [announcement]"

[First name],

[Personalization — one specific sentence about their recent work and why you're reaching out to them specifically.]

[Hook sentence — the one thing that makes this newsworthy for their audience.]

[Context — what's happening, why now, why it matters to their readers. 1-2 sentences max.]

I'm offering you an exclusive look ahead of [embargo date]. [What they get: interview access / data first look / executive briefing.]

Interested in a 20-minute briefing this week?

[Your name]
[Title] | [Company]
[Phone — journalists will call if interested]
──────────────────────────────────────────────────────────────────

TIER B PITCH — Simultaneous T1:
──────────────────────────────────────────────────────────────────
Subject: [Beat-specific subject — same principle as Tier A]

[First name],

[Personalization — their beat, a recent article, why this fits their coverage area.]

[Hook — identical core fact, angle adapted to what matters to this outlet's audience.]

[Context — 2 sentences.]

Happy to arrange a briefing or provide additional data. Embargo lifts [date/time].

[Your name]
──────────────────────────────────────────────────────────────────

TIER C PITCH — Industry vertical:
──────────────────────────────────────────────────────────────────
Subject: [Trade publication angle — more specific, less broad]

[First name],

[One sentence: why this matters specifically to their industry audience.]

[Hook — framed for their vertical, not general business press.]

[One concrete data point or customer example relevant to their readers.]

Full press release and assets available. Let me know if you'd like more.

[Your name]
──────────────────────────────────────────────────────────────────
```

### Step 3 — Outreach Sequence and Timing

```
Outreach sequence:
────────────────────────────────────────────────────────────────────────────────────────
Day/Time     Action                                           Notes
────────────────────────────────────────────────────────────────────────────────────────
D-7, AM      Send Tier A exclusive offer                      One contact only; 48h decision window
D-5, AM      Tier A accepts / declines decision               If decline: move to simultaneous T1
D-3, AM      Send Tier B simultaneous pitches                 Personalized per contact; embargo noted
D-2, AM      Send Tier C trade / vertical pitches             Broader but still personalized by beat
D-0, embargo lift  Press release + assets to all tiers        Owned channels go live simultaneously
D+1, AM      Follow-up to non-responders (Tier B only)        One follow-up, 24h after pitch
D+1, PM      Tier D broadcast outreach begins                 Niche / regional / podcast / newsletter
D+3          Second follow-up only for Tier A / B if silence  Final contact before removing
D+7          Close outreach; compile response log             Who responded / declined / covered
────────────────────────────────────────────────────────────────────────────────────────

Follow-up rules:
  Max 2 follow-ups per contact (initial + 1 follow-up)
  Follow-up wait: minimum 24 hours for Tier B/C; 48 hours for Tier A
  Follow-up tone: brief — add one new angle or piece of information; never just "checking in"
  If no response after 2 contacts: remove and do not contact again for this campaign
```

### Step 4 — Embargo Management

```
Embargo protocol:
  Embargo date/time: [Date at HH:MM timezone — specify timezone explicitly]

  Who receives under embargo:
    □ Tier A exclusive (receives [X] days early)
    □ Tier B simultaneous pitches (receive [X] days early)
    □ NOT Tier C / D until embargo lifts

  Embargo breach protocol:
    If a publication breaks embargo:
      Step 1: Contact editor immediately — ask for retraction or delay
      Step 2: If not retracted within [30 minutes]: lift embargo for all
      Step 3: Notify all embargoed contacts that embargo is lifted early
      Step 4: Document the breach; remove publication from future embargo lists

  Embargo language for all pitches:
    "This information is provided under embargo until [date] at [time] [timezone].
     By receiving this briefing, you agree not to publish before the embargo lifts.
     Breaking the embargo will result in removal from future press briefings."

  Tracking:
    Log every journalist who receives embargoed material: [Name / outlet / date received / confirmed]
```

### Step 5 — Response Management Process

```
Response categories and handling:
────────────────────────────────────────────────────────────────────────
Response type        Action                            SLA
────────────────────────────────────────────────────────────────────────
Interview request    Schedule within 24h; brief spokes  24 hours
Data/asset request   Send immediately with press kit    2 hours
Follow-up question   Respond with approved messaging    4 hours (Tier 1), 24h (Tier 2/3)
Declined / no fit    Thank; note for future campaigns   No follow-up
No response          One follow-up; then close          D+1 follow-up, D+3 close
Hostile / negative   Do not ignore; engage professionally  2 hours
────────────────────────────────────────────────────────────────────────

Coverage log (update in real time):
────────────────────────────────────────────────────────────────────────
Journalist    Outlet    Pitch sent    Response    Published    URL    Sentiment
────────────────────────────────────────────────────────────────────────
[Name]        [Outlet]  [Date]        [Y/N]       [Y/N]        [URL]  [Pos/Neu/Neg]
────────────────────────────────────────────────────────────────────────

Spokesperson briefing checklist (before every media briefing/interview):
  □ Spokesperson has reviewed SOCO and core messages
  □ Spokesperson has practiced bridging phrases
  □ Off-limits topics confirmed
  □ Expected hostile questions reviewed with prepared responses
  □ Key proof points and stats memorized (not just available)
  □ Interview format confirmed (background? on record? video?)
```

---

## Final Output
- Tiered contact list with personalization notes
- Pitch templates (Tier A exclusive, Tier B simultaneous, Tier C trade)
- Outreach sequence with day-by-day timing
- Follow-up rules (max 2, with timing and tone guidance)
- Embargo management protocol with breach response
- Response management process with SLAs per response type
- Coverage log template
- Spokesperson briefing checklist

**Recommended next skill**: `/ds-pr-communications-pr-execution` — run the live campaign with a day-of schedule, monitoring setup, and real-time response protocols.
