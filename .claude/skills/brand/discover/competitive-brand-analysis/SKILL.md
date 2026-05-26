---
name: ds-brand-competitive-brand-analysis
description: Analyzes competitor brand positioning, visual identity, voice, and archetypes to find whitespace. Use when defining positioning, doing a rebrand, or asking "how do competitors show up and where can we be different". Also triggers on: Positioning 2×2, visual identity comparison, brand archetype mapping, voice spectrum analysis, whitespace identification.
tags: [brand, discover]
model: inherit
---

# Competitive Brand Analysis
**Domain**: Brand | **Phase**: Discover | **Invocation**: `/ds-brand-competitive-brand-analysis`

## What this produces
A competitive brand landscape: positioning 2×2, visual identity comparison, voice spectrum analysis, brand archetype mapping, and 3 whitespace opportunities with recommended positioning territory.

## Methods
Competitor positioning map, visual identity comparison, voice and tone analysis, tagline and message analysis, brand archetype mapping, digital presence comparison, social brand analysis, whitespace identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Positioning map (top 5 competitors), top 3 differentiators |
| Tuna | Positioning, visual identity, voice comparison, whitespace |
| Salmon | Full landscape with archetypes, digital presence, social analysis |
| Willy | All methods — perception research, full opportunity map |

## Execution prompt
You are running Competitive Brand Analysis for [project]. Map the competitive brand landscape and identify where differentiation is possible.

**Input**: the product/company and top 5–8 competitors.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Competitor Brand Overview

```
Competitor brand snapshot:
────────────────────────────────────────────────────────────────────────
Competitor    Tagline/claim        Core positioning           Target audience
────────────────────────────────────────────────────────────────────────
[Comp A]      "[Their tagline]"    [1-sentence positioning]   [Who they're speaking to]
[Comp B]      "[Their tagline]"    [1-sentence positioning]   [Who they're speaking to]
[Comp C]      "[Their tagline]"    [1-sentence positioning]   [Who they're speaking to]
[Comp D]      "[Their tagline]"    [1-sentence positioning]   [Who they're speaking to]
[Us]          "[Our tagline]"      [1-sentence positioning]   [Who we're speaking to]
────────────────────────────────────────────────────────────────────────
```

### Step 2 — Positioning 2×2

```
Select the 2 dimensions that matter most to buyers in this category.
Avoid dimensions where all competitors cluster — those don't help differentiate.

Dimension X: [e.g., Enterprise-grade ↔ Consumer-friendly]
Dimension Y: [e.g., Point solution ↔ Platform/suite]

Mapping:
  [Comp A]: High X, High Y  → [quadrant label — e.g., "Enterprise Platform"]
  [Comp B]: Low X, Low Y   → [quadrant label — e.g., "Consumer Point Tool"]
  [Comp C]: High X, Low Y  → [quadrant label]
  [Us]:     [X position], [Y position] → [quadrant label]

Whitespace quadrant: [Describe the underoccupied space]
Opportunity: [What positioning in that quadrant would look like]
```

### Step 3 — Visual Identity Comparison

```
Visual identity landscape:
────────────────────────────────────────────────────────────────────────────────────
Competitor  Primary color   Secondary   Typography style   Imagery style   Logo style
────────────────────────────────────────────────────────────────────────────────────
[Comp A]    [color/hex]     [color]     [Modern sans]      [Photography]   [Wordmark]
[Comp B]    [color/hex]     [color]     [Geometric]        [Illustration]  [Symbol]
[Comp C]    [color/hex]     [color]     [Classic serif]    [Abstract]      [Lettermark]
[Us]        [color/hex]     [color]     [Type]             [Style]         [Type]
────────────────────────────────────────────────────────────────────────────────────

Visual territory clusters:
  Dominant colors in category:  [Blue / Navy cluster / Bright colors / Neutral]
  Dominant typography:          [What most competitors use — so we can differ]
  Dominant imagery style:       [Photography / illustration / minimal / bold]

Visual whitespace:
  Color opportunity: [Color or palette unused by major competitors]
  Typography opportunity: [Style no one has claimed]
  Imagery opportunity: [Style that would stand out]
```

### Step 4 — Voice and Tone Spectrum

```
Voice spectrum axes:
  Formal ←──────────────────────→ Informal
  Serious ←─────────────────────→ Playful
  Technical ←───────────────────→ Accessible
  Authoritative ←───────────────→ Peer-level

Competitor voice placement:
────────────────────────────────────────────────────────────────────────
Competitor    Formal/Informal   Serious/Playful   Technical/Access   Auth/Peer
────────────────────────────────────────────────────────────────────────
[Comp A]      [7/10 formal]     [8/10 serious]    [6/10 technical]   [8/10 auth]
[Comp B]      [4/10 formal]     [5/10 serious]    [4/10 technical]   [4/10 auth]
[Us]          [?]               [?]               [?]                [?]
────────────────────────────────────────────────────────────────────────

Voice whitespace: [Where no competitor sits on the spectrum — describe the open territory]
Voice recommendation: [Where our brand should position on each axis and why]
```

### Step 5 — Brand Archetype Mapping

```
The 12 brand archetypes (Jung-derived, marketing adaptation):
  The Innocent    — optimistic, pure, simple (e.g., Dove, Airbnb)
  The Everyman    — down-to-earth, relatable (e.g., IKEA, Target)
  The Hero        — courageous, achievement-driven (e.g., Nike, Army)
  The Outlaw      — rebellious, disruptive (e.g., Harley, Red Bull)
  The Explorer    — adventurous, free, authentic (e.g., Patagonia, Jeep)
  The Creator     — innovative, imaginative (e.g., Apple, Adobe)
  The Ruler       — controlling, responsible, authority (e.g., Rolex, Microsoft)
  The Magician    — transformative, visionary (e.g., Disney, Tesla)
  The Lover       — intimate, passionate, sensory (e.g., Chanel, Victoria's Secret)
  The Caregiver   — nurturing, generous, altruistic (e.g., Johnson's, UNICEF)
  The Jester      — fun, irreverent, lighthearted (e.g., Mailchimp, Slack)
  The Sage        — wisdom, knowledge, expertise (e.g., Google, Harvard)

Competitor archetype mapping:
────────────────────────────────────────────────────────────────────────
Competitor    Primary archetype    Secondary archetype    Differentiation
────────────────────────────────────────────────────────────────────────
[Comp A]      [Archetype]          [Archetype]            [Cluster / crowded]
[Comp B]      [Archetype]          [Archetype]            [Cluster / unique]
[Comp C]      [Archetype]          [Archetype]
[Us]          [Recommended]        [Secondary]            [Why this is differentiated]
────────────────────────────────────────────────────────────────────────

Archetype whitespace: [Which archetypes are underrepresented in the category]
Recommended archetype: [Primary] + [Secondary nuance] — because: [Why this fits audience and competitive gap]
```

### Step 6 — Digital and Social Brand Presence

```
Digital presence comparison:
────────────────────────────────────────────────────────────────────────
Competitor    Website clarity  Content quality  Social consistency  Community
────────────────────────────────────────────────────────────────────────
[Comp A]      [H/M/L]          [H/M/L]          [H/M/L]             [H/M/L]
[Comp B]      [H/M/L]          [H/M/L]          [H/M/L]             [H/M/L]
[Us]          [H/M/L]          [H/M/L]          [H/M/L]             [H/M/L]
────────────────────────────────────────────────────────────────────────

Best-in-class digital brand in category: [Competitor] — why: [What they do best]
Our digital brand gap: [The most significant area where we fall short]
```

### Step 7 — Whitespace Opportunities

```
Top 3 brand whitespace opportunities:

1. [Opportunity name]:
   Description: [What territory is unoccupied — specific]
   Why it's available: [No competitor owns this — reason]
   Why it fits us: [What makes us credible to claim this]
   Risk: [Could a competitor claim this easily? / Is there a reason it's empty?]

2. [Opportunity name]:
   Description: [What territory]
   Why available: [Reason]
   Why it fits: [Our right to claim]
   Risk: [Risk assessment]

3. [Opportunity name]:
   Description: [What territory]
   Why available: [Reason]
   Why it fits: [Our right to claim]
   Risk: [Risk assessment]

Recommended positioning territory: [Option 1 / 2 / 3 — and why this is the best bet]
```

---

## Final Output
- Competitor brand overview (tagline, positioning, audience per competitor)
- Positioning 2×2 with whitespace identified
- Visual identity comparison (color, type, imagery, logo style)
- Voice and tone spectrum placement per competitor
- Brand archetype mapping with recommended archetype
- Digital/social presence comparison
- Top 3 whitespace opportunities with recommended territory

**Recommended next skill**: `/ds-brand-brand-positioning` — translate whitespace insights into a positioning statement and differentiation framework.


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
