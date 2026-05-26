---
name: ds-ux-design-design-handoff
description: Prepares design specs, tokens, annotations, and assets for engineering handoff. Use when designs are approved and ready to build, or asking "what does engineering need from us". Also triggers on: design token documentation, component spec, redline annotation, WCAG accessibility checklist, implementation guide.
tags: [ux-design, deliver, design-handoff, design-tokens, wcag, component-spec, redline]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Design Handoff
**Domain**: UX Design | **Phase**: Deliver | **Invocation**: `/ds-ux-design-design-handoff`

## What this produces
A handoff package that engineering can implement accurately — design tokens, component specs, interaction annotations, accessibility checklist, asset exports, and an implementation Q&A that prevents the most common handoff failures.

## Methods
Design token documentation, component spec writing, redline annotation, asset export guide, spacing and layout specification, responsive breakpoint documentation, interaction specification, WCAG 2.1 AA checklist, implementation Q&A, developer walkthrough script

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Core specs | Component specs + key assets + spacing documentation |
| Tuna | Full handoff | Design tokens + component specs + responsive + interaction spec |
| Salmon | Complete handoff | All above + WCAG checklist + implementation guide + Q&A |
| Willy | Design system handoff | All methods + full token documentation + developer walkthrough |

---

## Execution Prompt

Read the project context: approved design files, the engineering team's questions, component library status, FISH classification.

---

### Step 1 — Design Token Documentation (Tuna, Salmon, Willy)

Design tokens are the single source of truth for visual decisions. When tokens are used correctly, design changes propagate automatically.

**Token format:**
```
Category: Color
--color-brand-primary: #5E4AE3
  Usage: Primary CTAs, active navigation, brand highlights
  Do NOT use: Body text, borders, backgrounds

--color-text-primary: #1A1A1A
  Usage: All body text, headings
  Do NOT use: Disabled states (use --color-text-disabled)

--color-text-disabled: #9B9B9B
--color-text-error: #D32F2F
--color-background-surface: #FFFFFF
--color-background-subtle: #F5F5F5

Category: Spacing
--space-1: 4px
--space-2: 8px
--space-3: 16px
--space-4: 24px
--space-5: 32px
--space-6: 40px
--space-8: 64px

Category: Typography
--font-family-base: "Inter", system-ui, sans-serif
--font-size-body: 16px
--font-size-caption: 14px
--font-size-heading-1: 32px
--font-size-heading-2: 24px
--font-size-heading-3: 20px
--line-height-body: 1.5
--line-height-heading: 1.2
--font-weight-regular: 400
--font-weight-semibold: 600

Category: Border Radius
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 16px
--radius-full: 9999px (pill)

Category: Shadow
--shadow-sm: 0 1px 3px rgba(0,0,0,0.12)
--shadow-md: 0 4px 12px rgba(0,0,0,0.12)
--shadow-lg: 0 16px 32px rgba(0,0,0,0.16)
```

**Token usage rule for engineers:** never hardcode a hex value or pixel value. Always use a token. If a token doesn't exist for a new visual decision, create it and add it to this doc.

---

### Step 2 — Component Specifications (all FISH levels)

Every component needs a spec that tells engineering exactly how to build it.

**Component spec format:**
```
Component: [name — e.g., "Primary Button"]
Variants:
  - size: sm (height: 32px) / md (height: 40px) / lg (height: 48px)
  - type: primary / secondary / ghost / danger
  
States: default / hover / focus / active / disabled / loading

Anatomy:
  - Container: padding: 12px 20px; border-radius: var(--radius-md); height: 40px (md)
  - Label: font-size: var(--font-size-body); font-weight: var(--font-weight-semibold)
  - Icon (optional): 16px × 16px; gap: 8px from label

Per-state specification:
  Default:   background: var(--color-brand-primary); color: white
  Hover:     background: #4A38C4 (10% darker); transition: 150ms ease
  Focus:     outline: 2px solid var(--color-brand-primary); outline-offset: 2px
  Active:    background: #3829A8; transform: scale(0.98)
  Disabled:  background: var(--color-background-subtle); color: var(--color-text-disabled); cursor: not-allowed
  Loading:   button locked (no click), spinner icon replaces label, width preserved

Behavior:
  - Width: shrinks to content width; can be set to full-width via prop
  - Loading: disable button immediately on click (prevent double-submit)

Accessibility:
  - role="button" or <button> element (never <div>)
  - aria-disabled="true" when disabled (not disabled attribute alone — for keyboard tab)
  - aria-label for icon-only variants
```

Produce specs for every component in the design. If an existing component library is being used, annotate deviations from the library defaults only.

---

### Step 3 — Redline Annotations (all FISH levels)

Redlines specify exact measurements and spacing that can't be inferred from the file.

**Annotation format per screen:**
```
Screen: [name]

Layout:
  Container max-width: 1200px, centered
  Screen horizontal padding: 24px (mobile) / 40px (tablet) / 80px (desktop)
  
Section: [name]
  Top margin: var(--space-8) = 64px
  Bottom margin: var(--space-6) = 40px
  
  [Component A]:
  Height: 48px
  Internal padding: 16px 24px
  Margin-bottom: var(--space-3) = 16px
  
  [Component B]:
  Margin-top: var(--space-2) = 8px
  
Non-obvious spacing decisions (annotate why):
  - [Gap between X and Y is 8px, not 16px — visually connected to indicate relationship]
  - [CTA is 24px from bottom edge — deliberate, tied to safe area on iOS]
```

---

### Step 4 — Interaction Specification (Tuna, Salmon, Willy)

Annotate every non-obvious interaction so engineering doesn't guess.

```
Interaction: [name — e.g., "Form validation on submit"]
Trigger: [what causes it]
Behavior: [exactly what happens, in sequence]
Timing: [if animated — duration and easing]
Edge cases: [what happens in unusual states]

Example:
Interaction: "Password field reveal toggle"
Trigger: User clicks the eye icon in the password field
Behavior:
  1. Input type switches from "password" to "text"
  2. Eye icon changes to eye-slash icon
  3. Focus stays on the input field (no focus shift)
Timing: instant — no animation
Edge case: if user is using a password manager that autofills, the toggle works the same way
Accessibility: aria-label on button: "Show password" / "Hide password" (toggles with state)
```

---

### Step 5 — WCAG 2.1 AA Checklist (Salmon, Willy)

Engineering must pass this checklist before the feature ships. Design is responsible for making it possible; engineering is responsible for implementation.

| Check | Requirement | How to verify |
|---|---|---|
| Color contrast (text) | ≥ 4.5:1 ratio | Chrome DevTools accessibility panel, WebAIM contrast checker |
| Color contrast (UI elements) | ≥ 3:1 ratio | Same tools |
| Keyboard navigation | All interactive elements reachable by Tab | Tab through every interactive element |
| Focus visible | Every focused element has visible focus ring | Tab through and watch for focus ring |
| Focus order | Tab order follows visual reading order | Tab through — does it make sense? |
| Alt text | All informational images have alt text | Screen reader, inspect src |
| Form labels | Every input has a visible label (not placeholder) | Remove placeholder — label must remain |
| Error identification | Errors use text, not color alone | Make the error state — is the problem clear without color? |
| Resize to 200% | No content lost at 200% zoom | Zoom browser to 200%, check all flows |
| Reduced motion | Animations respect prefers-reduced-motion | MacOS: System Preferences → Accessibility → Reduce Motion |

**Accessibility anti-patterns to flag if found:**
- `div` or `span` used as button (no role, not keyboard accessible)
- Color as the only differentiator between states
- Auto-playing video or audio
- Timeout warnings without a way to extend
- Placeholder text as the only label

---

### Step 6 — Asset Export Guide (all FISH levels)

```
Asset: [name]
Format: SVG (icons, illustrations) / PNG (photos, complex graphics) / WebP (web images)
Sizes to export:
  - 1x: [X × Y px]
  - 2x: [X × Y px] (for retina displays)
  - SVG: [for scalable icons]
File naming: [component-name-variant-size.format — e.g., icon-arrow-right-16.svg]
Color mode: [light-only / dark-only / both]
Background: [transparent / white]
```

**Optimization requirements:**
- SVGs: run through SVGO to minimize file size
- PNGs: TinyPNG compression, < 100KB for icons/UI assets
- Images: serve WebP with PNG/JPG fallback; lazy load off-screen images

---

### Step 7 — Implementation Q&A (Salmon, Willy)

The 10 most common engineering questions on handoff — answer them before they're asked.

```
Q: What happens when the content is longer than expected (text overflow)?
A: [Truncate with ellipsis at X characters / wrap to next line / expand container]

Q: What is the exact hover transition timing?
A: [150ms ease on background-color, border-color. No transition on color.]

Q: Is this component server-rendered or client-rendered?
A: [Server-rendered — must work without JavaScript]

Q: What happens on mobile when the keyboard opens?
A: [The form scrolls up so the active input is visible above the keyboard]

Q: What's the maximum number of items that will appear in this list?
A: [Maximum 50. Beyond 50, paginate with "Load more".]

Q: Can users interact with this while it's in the loading state?
A: [No — the entire screen is blocked with an overlay during the initial load]

Q: What is the error state if the API fails?
A: [See Screen: API Error State — generic error message + retry button]

Q: What breakpoint triggers the mobile layout?
A: [< 768px]
```

---

### Final Output

**Design token documentation** — color, spacing, typography, radius, shadow (Tuna+)
**Component specs** — states, anatomy, measurements, accessibility per component
**Redline annotations** — exact spacing and layout measurements per screen
**Interaction specifications** — non-obvious behaviors, timing, edge cases (Tuna+)
**WCAG 2.1 AA checklist** — pass/fail criteria + how to verify (Salmon+)
**Asset export guide** — format, sizes, naming, optimization
**Implementation Q&A** — top 10 engineering questions answered in advance (Salmon+)
**Recommended next skill** — `/ds-ux-design-design-retrospective` (run 30 days post-launch) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
