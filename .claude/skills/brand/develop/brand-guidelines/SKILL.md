---
name: ds-brand-brand-guidelines
description: Writes brand guidelines covering voice, visual identity rules, logo usage, color system, typography hierarchy, do/don't examples, and digital application guidance. Use when documenting a brand for a team, onboarding an agency, or asking "how do we keep the brand consistent". Also triggers on: Logo usage rules, color usage documentation, typography standards, imagery do/don'ts, accessibility standards.
tags: [brand, develop]
model: inherit
---

# Brand Guidelines
**Domain**: Brand | **Phase**: Develop | **Invocation**: `/ds-brand-brand-guidelines`

## What this produces
A brand guidelines document: voice and tone principles with examples, visual identity rules (logo, color, type), imagery do/don'ts, digital application guidance, accessibility standards, co-branding rules, and a quick reference card for contributors.

## Methods
Voice and tone documentation, visual identity rules, logo usage documentation, color usage rules, typography usage, imagery do/don'ts, co-branding guidelines, digital application guidelines, print guidelines, accessibility standards documentation

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Voice guidelines, logo usage rules, color/type rules |
| Tuna | Full visual guidelines, voice and tone, do/don'ts |
| Salmon | Complete guidelines with application examples, accessibility standards |
| Willy | All methods — co-branding, print guidelines, full application guide |

## Execution prompt
You are running Brand Guidelines for [project]. Document the brand so any team member or agency can apply it consistently.

**Input**: brand identity design spec, brand strategy, and any existing usage examples.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Section 1 — Brand Foundation (Why)

```
This section gives context before the rules — readers who understand WHY are more likely to apply guidelines correctly.

Brand mission:   [One sentence — why we exist]
Brand vision:    [One sentence — where we're going]
Brand positioning: [Internal positioning statement]
Brand personality: [3 adjectives that define our character]
Brand archetype:   [Primary — what this means in practice]
```

### Section 2 — Voice and Tone

```
Voice (constant — who we are):
────────────────────────────────────────────────────────────────────────
Trait           What it means              Example (right)      Example (wrong)
────────────────────────────────────────────────────────────────────────
[Trait 1]       [Plain-language def]       "[Right example]"    "[Wrong example]"
[Trait 2]       [Plain-language def]       "[Right example]"    "[Wrong example]"
[Trait 3]       [Plain-language def]       "[Right example]"    "[Wrong example]"
────────────────────────────────────────────────────────────────────────

Tone (adapts to context):
  Celebrating:     [e.g., "Genuine and specific — name the achievement, not just 'awesome'"]
  Teaching:        [e.g., "Peer-level — we share knowledge, not lecture"]
  Addressing issues: [e.g., "Direct and calm — acknowledge, don't deflect"]
  Selling:         [e.g., "Honest — specific benefits, no vague superlatives"]

Words we use:     [List of preferred terms and brand vocabulary]
Words we avoid:   [Banned jargon, superlatives, competitor names, weasel words]

Grammar standards:
  Sentence case for headlines: [Yes / No — specify]
  Oxford comma:    [Always / Never]
  Numbers:         [Spell out 1-9, numeral for 10+]
  Brand name usage:[How to write the brand name — capitalization, stylization]
```

### Section 3 — Logo

```
Logo usage rules:
────────────────────────────────────────────────────────────────────────

Primary logo: [Description — wordmark / symbol + wordmark / etc.]
  Use: Default in most applications
  Minimum size: [Xpx digital / Xmm print] — below this, use simplified variant
  Clear space:  [X× the height of the cap-height] on all sides — never crowd the logo

Logo variants and when to use them:
  Full color (primary):  [On white or light backgrounds]
  Reversed (white):      [On dark or brand-color backgrounds]
  Monochrome black:      [When color printing isn't available]
  Monochrome white:      [On dark when full color isn't appropriate]
  Simplified/icon:       [Favicon, app icon, very small sizes < [X]px]

Logo DO / DON'T:
  ✓ DO: Use on approved backgrounds only
  ✓ DO: Maintain minimum clear space
  ✓ DO: Download from the approved asset library
  ✗ DON'T: Stretch, distort, or rotate the logo
  ✗ DON'T: Recreate or modify the logo artwork
  ✗ DON'T: Use unapproved colors
  ✗ DON'T: Place on busy photography without testing contrast
  ✗ DON'T: Add drop shadows, outlines, or effects
  ✗ DON'T: Place on backgrounds that fail contrast requirements

Approved background colors for logo placement:
  ✓ White (#FFFFFF)
  ✓ [Brand light neutral color]
  ✓ [Brand dark color]
  ✗ [Problematic color — e.g., "our primary blue — too low contrast"]
```

### Section 4 — Color

```
Primary palette:
────────────────────────────────────────────────────────────────────────
Color name    Hex        RGB              CMYK          Pantone   Usage
────────────────────────────────────────────────────────────────────────
[Name]        #[XXXXXX]  [R], [G], [B]    [C,M,Y,K]     [PMS]     Primary — CTAs, headers, key UI
[Name]        #[XXXXXX]  [R], [G], [B]    [C,M,Y,K]     [PMS]     Accent — highlights
[Name]        #[XXXXXX]  [R], [G], [B]    [C,M,Y,K]     [PMS]     Dark — text, dark backgrounds
[Name]        #[XXXXXX]  [R], [G], [B]    [C,M,Y,K]     [PMS]     Light — backgrounds, surfaces
────────────────────────────────────────────────────────────────────────

Neutral palette:
  [Dark neutral]   #[XXXXXX] — body text, icons
  [Mid neutral]    #[XXXXXX] — secondary text, borders, dividers
  [Light neutral]  #[XXXXXX] — backgrounds, cards, surfaces
  White            #FFFFFF

Color usage rules:
  Primary color:   [Max % of any layout — e.g., "≤ 30% of page area"]
  Accent color:    [Sparingly — CTAs, links, highlights only]
  Do not:          [Specific forbidden combinations — e.g., "Never use primary on secondary"]
  Accessibility:   All text must meet WCAG AA contrast (4.5:1 for normal text, 3:1 for large text)

Color DO / DON'T:
  ✓ DO: Use approved hex codes only
  ✓ DO: Check contrast before final use
  ✗ DON'T: Approximate colors — always use exact hex values
  ✗ DON'T: Use colors from outside the approved palette
  ✗ DON'T: Use primary color as a background for large text areas (readability)
```

### Section 5 — Typography

```
Type system:
────────────────────────────────────────────────────────────────────────
Role          Font name         Weight(s)        Size range
────────────────────────────────────────────────────────────────────────
Display (H1)  [Font name]       [Bold / Black]   [48-72px]
Heading (H2)  [Font name]       [SemiBold]       [32-48px]
Subhead (H3)  [Font name]       [SemiBold]       [20-28px]
Body          [Font name]       [Regular]        [16-18px], line-height 1.5
Body small    [Font name]       [Regular]        [14px], line-height 1.4
Caption       [Font name]       [Regular/Light]  [12px]
CTA / Button  [Font name]       [SemiBold/Bold]  [14-16px], letter-spacing: 0.02em
────────────────────────────────────────────────────────────────────────

Typography DO / DON'T:
  ✓ DO: Use the approved font stack (Google Fonts / Adobe Fonts link)
  ✓ DO: Maintain line-height ≥ 1.4 for readability
  ✓ DO: Keep body text ≥ 16px for digital
  ✗ DON'T: Use more than 2 font families in one design
  ✗ DON'T: Set body text in all caps
  ✗ DON'T: Use condensed weights for body text
  ✗ DON'T: Fake bold / italic (apply the real font weight)

Fallback stack (CSS): [Font name], [Fallback 1], [Fallback 2], sans-serif
```

### Section 6 — Imagery

```
Photography:
  Style:   [Brief description — e.g., "Candid, natural light, authentic moments"]
  Color:   [Treatment — e.g., "Slightly warm, natural tones — avoid heavy filters"]
  Subjects:[What / who we show — e.g., "Real people in real work contexts"]

  ✓ DO: [Example of right image direction]
  ✓ DO: [Example of right image direction]
  ✗ DON'T: Stock photography clichés (handshakes, generic smiles, posed group shots)
  ✗ DON'T: [Specific visual style that contradicts brand]

Approved image sources: [Internal photo library / Unsplash / Licensed — specify]
Image licensing: Every image must have confirmed licensing before use. When in doubt, don't use it.

Illustration (if applicable):
  Style:  [e.g., "Flat, geometric — consistent with icon set"]
  Colors: [Use palette / reduced palette]
  ✗ DON'T: Mix illustration styles within the same piece

Icons:
  Library: [Name — e.g., "Heroicons / Phosphor / custom set"]
  Style:   [Outline / filled / 2px stroke]
  Size:    [16px / 24px / 32px base sizes]
  ✗ DON'T: Mix icon libraries
```

### Section 7 — Digital Application

```
Web / product:
  Background:    White (#FFFFFF) or [light neutral]
  Primary CTA:   [Primary color] background, white text
  Links:         [Primary color], underline on hover
  Focus state:   [Accessibility focus ring — 2px, primary color]
  Error state:   [Red — specify hex], with icon
  Success state: [Green — specify hex], with icon

Email:
  Max width:    600px
  Background:   White
  CTA button:   [Primary color], [16px] padding, [border-radius]
  Header:       Logo on white or [dark color] background
  Footer:       [Light neutral], legal text in [small], muted color

Social media:
  Profile image: Logo on [background color]
  Cover images:  [Brand color / photography style]
  Post templates: [Describe grid / style consistency rules]
  Hashtag usage: [Brand hashtags to always include]

Presentation (slides):
  Title slide:    [Color/imagery direction]
  Content slides: White background, [color] accents
  Charts:         Use brand palette only
  Font sizes:     Title ≥ 36pt, Body ≥ 18pt (legible from a distance)
```

### Section 8 — Quick Reference Card

```
[Brand Name] Brand Quick Reference
══════════════════════════════════════════════════
Logo:        [Primary logo location in asset library]
             Minimum size: [X]px / [X]mm
             Clear space: [X] cap-heights on all sides

Colors:      Primary:  #[XXXXXX]
             Secondary: #[XXXXXX]
             Dark text: #[XXXXXX]
             BG:        #[XXXXXX]

Fonts:       Heading: [Font name], Bold
             Body:    [Font name], Regular, 16px, line-height 1.5

Voice:       [Adj 1] / [Adj 2] / [Adj 3]
             Don't: [Top 3 banned words or styles]

Questions?   [Brand guardian email / Slack channel]
Asset library: [Link]
══════════════════════════════════════════════════
```

---

## Final Output
- Brand foundation section (mission, vision, positioning, personality)
- Voice and tone guide (traits, examples, word list, grammar standards)
- Logo usage rules (variants, minimum size, clear space, DO/DON'T)
- Color system (full palette with hex/RGB/CMYK, usage rules, accessibility)
- Typography system (roles, weights, sizes, DO/DON'T)
- Imagery guidelines (photography, illustration, icons)
- Digital application specs (web, email, social, slides)
- Quick reference card

**Recommended next skill**: `/ds-brand-brand-launch` — plan the rollout to introduce the brand system to teams, agencies, and the public.
