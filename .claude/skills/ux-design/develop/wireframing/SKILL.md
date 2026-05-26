---
name: ds-ux-design-wireframing
description: Produces annotated wireframes for a flow or feature — Gestalt principles, 8pt grid, interaction states, edge cases, and accessibility notes. Use when moving from IA to design, aligning on layout before high-fidelity, or asking "what should this screen look like". Also triggers on: low-fidelity wireframe, interaction state documentation, empty state design, responsive breakpoints.
tags: [ux-design, develop, wireframing, gestalt, grid, interaction-states, accessibility]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Wireframing
**Domain**: UX Design | **Phase**: Develop | **Invocation**: `/ds-ux-design-wireframing`

## What this produces
Annotated wireframes for a user flow — described in structured text — with component notes, interaction states, edge cases, responsive considerations, and accessibility annotations.

## Methods
Low-fidelity wireframe, Gestalt principles application, 8pt grid system, flow mapping, component inventory, interaction state documentation, empty/error/loading state design, responsive breakpoint design, accessibility annotation

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Key screens | 3–5 screens described + flow map + key annotations |
| Tuna | Full flow | All screens in the flow + interaction states + component inventory |
| Salmon | Annotated wireframes | All screens + error/empty/loading states + responsive notes |
| Willy | Full component system | All above + accessibility annotations + component library spec |

---

## Execution Prompt

Read the project context: UX brief, IA, the specific flow or feature to wireframe, component library (if exists), FISH classification.

---

### Step 1 — Flow Map (all FISH levels)

Before wireframing screens, map the flow. Every screen is a node, every decision is a branch.

```
Flow: [name — e.g., "First-time user onboarding"]

[Entry point: what triggers this flow]
  ↓
[Screen 1: name]
  Decision: [what does the user choose or encounter?]
  ↓ Yes path          ↓ No/Error path
[Screen 2a]           [Screen 2b: error state]
  ↓
[Screen 3]
  ↓
[Exit: [what has been accomplished]]

Edge cases in this flow:
- [What if the user drops off at step 2?]
- [What if required data is missing?]
- [What if the user is on mobile with slow connection?]
```

---

### Step 2 — Wireframe Description Format (all FISH levels)

Since wireframes are described in text (not drawn), use this structured format.

```
Screen: [name]
Purpose: [what the user accomplishes on this screen]
Entry: [how the user arrives here]
Exit: [where the user goes next — happy path + error path]

Layout (top to bottom, left to right):
  [Zone 1: Header]
    - [Component: Navigation bar]
    - [Content: Back button / Title / Primary action]
    
  [Zone 2: Body]
    - [Component: Form — 3 fields]
      Field 1: [label] [type: text/select/date] [validation: required, max 50 chars]
      Field 2: [label] [type] [validation]
      Field 3: [label] [type] [validation]
    - [Helper text below each field: [content]]
    
  [Zone 3: Footer]
    - [Component: Primary CTA — "Continue"] [action: submits form, navigates to Screen 3]
    - [Component: Secondary link — "Skip"] [action: navigates to Screen 4]

Annotations:
  - [Annotation 1: why this layout choice — e.g., "Single column keeps focus on form completion"]
  - [Annotation 2: non-obvious interaction — e.g., "CTA disabled until required fields are valid"]
  - [Annotation 3: design decision — e.g., "Skip is low-prominence to discourage but not block"]

Open design questions:
  - [Question the designer needs to resolve before high-fidelity]
```

---

### Step 3 — Gestalt Principles Application (Tuna, Salmon, Willy)

Gestalt principles explain why users perceive layouts the way they do. Apply them explicitly.

| Principle | How it applies | Design rule |
|---|---|---|
| **Proximity** | Elements placed close together are perceived as related | Group related form fields; separate unrelated sections with whitespace (not lines) |
| **Similarity** | Similar visual appearance = same function | All primary CTAs look the same; all secondary actions look the same |
| **Continuation** | Eyes follow a line or curve naturally | Use vertical alignment to guide reading flow |
| **Closure** | Users complete incomplete shapes | Cards don't need outlines — whitespace creates the boundary |
| **Figure/Ground** | Users separate foreground from background | Main content is on white; modals on dimmed background |
| **Common fate** | Elements moving together belong together | Animate related elements in the same direction |

For each wireframe, annotate which Gestalt principles govern the major layout decisions.

---

### Step 4 — 8pt Grid System (Tuna, Salmon, Willy)

The 8pt grid ensures spacing is consistent and scales across screen densities.

**Rules:**
- All spacing values must be multiples of 8: 8, 16, 24, 32, 40, 48, 64, 80
- 4pt is allowed for fine adjustments (icon padding, border widths)
- Typography leading (line height) is a multiple of 4
- Component heights: 32, 40, 48, 56, 64 (choose for target device)

**Standard spacing annotations:**
```
Screen margin: 24px (mobile) / 40px (tablet) / 80px (desktop)
Section padding: 32px top/bottom
Component internal padding: 16px
Spacing between components: 8px (tightly related) / 16px (related) / 32px (separate)
```

Annotate spacing decisions in wireframes so they're not left to interpretation.

---

### Step 5 — Interaction States (all FISH levels)

Every interactive element has multiple states. Design them all — engineers can't build what isn't specified.

**State checklist per interactive component:**
```
Component: [name]
States:
  Default:    [description]
  Hover:      [cursor change, background shift, tooltip]
  Focus:      [visible focus ring — required for keyboard nav]
  Active:     [depressed/pressed state]
  Disabled:   [visual treatment, cursor: not-allowed]
  Loading:    [if async action — spinner, skeleton, or button lock]
  Success:    [confirmation state]
  Error:      [error state with message]
```

**Interaction state annotation format:**
```
[Component name] — [State]
Visual change: [what changes]
Behavior: [what happens]
Duration: [if animated — Xs]
Accessibility: [ARIA state — aria-disabled, aria-pressed, etc.]
```

---

### Step 6 — Edge Case Screens (Tuna, Salmon, Willy)

The happy path is never enough. Design these states explicitly.

**Empty state:**
```
Screen: [name — Empty State]
When: [what triggers this — first use / no search results / deleted all items]
Content:
  - Illustration or icon: [describes visual — not "nice illustration"]
  - Headline: [action-oriented — not "No data"]
  - Body: [2 sentences — what this is for and how to start]
  - Primary action: [CTA that gets the user started]
Rule: empty state is a sales pitch for the feature, not a dead end
```

**Error state:**
```
Screen: [name — Error State]
When: [what causes this error]
Error type: [validation / system / network / permission]
Content:
  - Icon: [warning or error icon]
  - Headline: [plain language — what happened]
  - Body: [why it happened and what to do]
  - Recovery action: [exactly what to click to fix it]
Rule: every error has a recovery path — never a dead end
```

**Loading state:**
```
Screen: [name — Loading State]
Duration: [expected load time]
Treatment: [skeleton screen / spinner / progress bar — choose based on duration]
  < 300ms: no treatment (flash avoidance)
  300ms – 1s: spinner
  > 1s: skeleton screen (shows structure before content)
  > 3s: progress bar with estimated time
```

---

### Step 7 — Responsive Breakpoints (Salmon, Willy)

Document how the layout changes across breakpoints.

| Breakpoint | Width | Columns | Changes from previous |
|---|---|---|---|
| Mobile | 320–767px | 4 | Single column, stacked nav |
| Tablet | 768–1023px | 8 | Two-column, side nav visible |
| Desktop | 1024–1439px | 12 | Full layout, sidebar expanded |
| Wide | 1440px+ | 12 | Max-width container, margins increase |

For each wireframe, document:
- What collapses or stacks at mobile?
- What navigation pattern changes at tablet?
- What content is hidden vs. shown at different breakpoints?

---

### Final Output

**Flow map** — screens, decisions, edge case branches
**Wireframe descriptions** — every screen in the flow, structured format
**Gestalt principle annotations** — layout rationale (Tuna+)
**8pt grid specification** — spacing values per component (Tuna+)
**Interaction states** — all states per interactive component
**Edge case screens** — empty, error, loading states (Tuna+)
**Responsive breakpoint changes** — per screen (Salmon+)
**Accessibility annotations** — focus states, ARIA labels, contrast notes (Salmon+)
**Open design questions** — flagged for design team resolution
**Recommended next skill** — `/ds-ux-design-prototype-design` (to make it interactive for testing) or `/ds-ux-design-design-handoff` (if going straight to build) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
