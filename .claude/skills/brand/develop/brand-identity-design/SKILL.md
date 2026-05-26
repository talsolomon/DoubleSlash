---
name: ds-brand-brand-identity-design
description: Designs or briefs the visual identity system with logo direction, color psychology, typography pairing, imagery style, WCAG contrast check, and design rationale. Use when building a new brand identity, briefing a designer, or asking "what should our brand look like". Also triggers on: Logo design brief, color palette development, typography selection, imagery style direction, accessibility check.
tags: [brand, develop]
model: inherit
---

# Brand Identity Design
**Domain**: Brand | **Phase**: Develop | **Invocation**: `/ds-brand-brand-identity-design`

## What this produces
A brand identity brief or design spec: logo direction, primary and extended color palette with hex codes, typography pairing with hierarchy, imagery style direction, iconography guidance, accessibility check, moodboard direction, and design rationale document.

## Methods
Logo design brief, color palette development with psychology, typography selection and pairing, imagery style direction, iconography style, motion and animation principles, design system foundations, accessibility color check, moodboard direction, design rationale documentation

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Logo brief, color palette (primary), type selection |
| Tuna | Logo brief, color system, typography, imagery direction |
| Salmon | Full identity spec with iconography, accessibility check, moodboard |
| Willy | All methods — motion principles, design system foundations, full rationale |

## Execution prompt
You are running Brand Identity Design for [project]. Produce a brief that translates brand strategy into a concrete visual direction a designer can execute.

**Input**: brand strategy, positioning statement, competitive visual landscape, brand archetype.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Logo Design Brief

```
Logo design brief:
────────────────────────────────────────────────────────────────────────
Brand name:          [Name to be represented]
Positioning:         [One-sentence brand position]
Archetype:           [Primary archetype — guides visual personality]
Audience:            [Who needs to immediately "get" this logo]

Logo type direction:
  Option A — Wordmark (logotype): Name in custom/modified typeface
    When: When the name is distinctive and the typography can carry the brand
  Option B — Lettermark: Initials or abbreviation
    When: When the name is long or initials are already recognized
  Option C — Symbol + wordmark: Icon paired with name
    When: When you need recognition independent of the name (app icons, signage)
  Option D — Abstract mark: Non-literal symbol
    When: Category leadership allows abstraction (requires time to build recognition)

Recommended direction: [A/B/C/D] — rationale: [Why this fits the brand]

Visual personality descriptors (translate from brand strategy):
  [Adjective 1]: [What this means visually — e.g., "Bold" → thick strokes, confident letterforms]
  [Adjective 2]: [Visual translation]
  [Adjective 3]: [Visual translation]

What to avoid:
  [Visual cliché in the category to not do]
  [Style that contradicts positioning]

Deliverables required:
  □ Primary logo (full color)
  □ Logo reversed (white on dark)
  □ Logo monochrome (black / white)
  □ Favicon / app icon variant (simplified)
  □ Horizontal variant (for headers)
  □ Stacked variant (for square formats)
  File formats: SVG (primary), PNG (transparent BG), PDF
```

### Step 2 — Color Palette

```
Color psychology reference:
  Blue:     Trust, reliability, calm — overused in tech/finance
  Green:    Growth, health, nature, money
  Red:      Energy, urgency, passion, danger
  Orange:   Warmth, enthusiasm, creativity, approachable
  Yellow:   Optimism, clarity, warmth, caution
  Purple:   Luxury, creativity, wisdom, spirituality
  Black:    Sophistication, luxury, authority, mystery
  White:    Purity, simplicity, clarity, space

Primary color:
  Name:     [Color name]
  Hex:      #[XXXXXX]
  RGB:      [R, G, B]
  Rationale:[Why this color fits the brand archetype and positioning]
  Emotional: [What it communicates to the audience]

Secondary colors (2-3):
  Color 1:  #[XXXXXX] — role: [e.g., accent / CTA / warmth]
  Color 2:  #[XXXXXX] — role: [e.g., dark neutral / backgrounds]
  Color 3:  #[XXXXXX] — role: [e.g., light neutral / surfaces]

Neutral system:
  Dark:     #[XXXXXX] — use: body text, dark backgrounds
  Mid:      #[XXXXXX] — use: secondary text, borders
  Light:    #[XXXXXX] — use: backgrounds, cards
  White:    #FFFFFF

WCAG Accessibility Check:
  Primary on white:    Contrast ratio [X.X:1] — WCAG AA (text ≥ 4.5:1)? [Pass/Fail]
  Primary on dark:     Contrast ratio [X.X:1] — WCAG AA? [Pass/Fail]
  Secondary on white:  Contrast ratio [X.X:1] — WCAG AA? [Pass/Fail]
  Note: Contrast < 4.5:1 on body text is a WCAG AA failure — choose a darker shade.

Color usage rules:
  Primary color: [Where it lives — headers, CTAs, key UI elements]
  Secondary:     [Supporting role — not dominant]
  Neutrals:      [Body text, backgrounds, structure]
  Forbidden:     [Color combinations that fail accessibility or clash badly]
```

### Step 3 — Typography

```
Typography role:
  Heading font:   Dominates first impression — bold, distinctive, on-brand
  Body font:      Readability is paramount — legible at small sizes, screen-friendly
  Accent font:    Optional — used sparingly for callouts, quotes, UI labels

Typography pairing options:

Option A — Modern pairing:
  Heading: [Font name] — [Sans-serif / Geometric / Display]
  Body:    [Font name] — [Readable serif or humanist sans]
  Accent:  [Optional — Monospace / Slab / Script for specific uses]
  Character: [Personality description]

Option B — Classic pairing:
  Heading: [Font name] — [Serif]
  Body:    [Font name] — [Clean sans-serif]
  Character: [Personality description]

Option C — Bold pairing:
  Heading: [Font name] — [Extended / Heavy weight display]
  Body:    [Font name] — [Neutral body]
  Character: [Personality description]

Recommended pairing: Option [A/B/C]
Licensing: [Google Fonts (free) / Adobe Fonts / Commercial — note cost]

Typography hierarchy:
  H1:  [Font name], [Weight], [Size range — e.g., 40-64px]
  H2:  [Font name], [Weight], [Size range — e.g., 28-40px]
  H3:  [Font name], [Weight], [Size range — e.g., 20-28px]
  Body:[Font name], [Weight], [16-18px], [Line height: 1.5-1.6]
  Caption:[Font name], [Weight], [12-14px]
  CTA: [Font name], [Weight], [Uppercase / sentence case]
```

### Step 4 — Imagery Style Direction

```
Photography style:
  Subject:    [People / product / environment / abstract / all]
  Lighting:   [Natural light / studio / high contrast / soft]
  Color grade:[Warm / cool / desaturated / vivid / monochrome]
  Composition:[Centered / asymmetric / tight crop / wide]
  Mood:       [Authentic / aspirational / editorial / documentary]
  Diversity:  [Representation guidance for people imagery]

  DO:   [3 specific "do" direction notes — e.g., "Candid, genuine moments; real workspaces"]
  DON'T:[3 specific "don't" notes — e.g., "No stock photo clichés; no handshakes"]

Illustration style (if applicable):
  Style:      [Flat / line art / 3D / mixed media / none]
  Line weight:[Thin/minimal / bold / varied]
  Color use:  [Full palette / limited 2-3 colors / monochrome]
  Character:  [Geometric / organic / abstract / character-based]

Iconography:
  Style:      [Outline / filled / duotone / custom]
  Corner radius: [Sharp / slightly rounded / fully rounded]
  Line weight:[1.5px / 2px / varied]
  Grid:       [24px / 32px base grid]
  Consistency rule: Never mix icon styles — use one library or custom set only.
```

### Step 5 — Design Rationale

```
Design rationale document — [Brand Name]:

Visual strategy summary:
"The visual identity for [Brand] is designed to express [archetype] — [1-2 sentences on strategic intent].
The [color] palette communicates [emotion/meaning], the [typography] projects [personality],
and the imagery direction reinforces [brand value]."

Color rationale:     [Why this specific palette — beyond "it looks good"]
Typography rationale:[Why this pairing — personality + readability + category fit]
Logo rationale:      [Why this mark direction — strategic + visual reasons]
Imagery rationale:   [Why this style — what it communicates about the brand]

Anti-pattern decisions (what we explicitly avoided and why):
  "[Visual direction rejected]": [Reason — too similar to competitor / contradicts positioning / wrong archetype]
```

---

## Final Output
- Logo design brief (type direction, visual personality descriptors, deliverables list)
- Color palette (primary + secondary + neutrals, hex codes, WCAG contrast check)
- Typography pairing recommendation (heading + body + hierarchy)
- Imagery style direction (photography DO/DON'T, illustration, iconography)
- Design rationale document

**Recommended next skill**: `/ds-brand-brand-guidelines` — document the identity system so any team member or agency can apply it consistently.


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
