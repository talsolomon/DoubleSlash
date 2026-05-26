---
name: ds-ux-design-prototype-design
description: Designs an interactive prototype plan for user testing or stakeholder validation. Use when preparing for user testing, validating interactions, or asking "how do we test this before building". Also triggers on: fidelity selection, Figma prototype spec, hotspot mapping, transition design, prototype scenario definition, test task alignment.
tags: [ux-design, develop, prototype-design, fidelity, figma, test-scenarios, interaction-design]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Prototype Design
**Domain**: UX Design | **Phase**: Develop | **Invocation**: `/ds-ux-design-prototype-design`

## What this produces
A prototype specification: fidelity decision with rationale, interaction flow, clickable state inventory, test scenarios, transition design, and handoff notes for the designer building in Figma or Framer.

## Methods
Fidelity selection matrix, interaction flow design, hotspot mapping, transition and animation design, prototype scenario definition, test task alignment, Figma prototype specification, edge case coverage, accessibility interaction design

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Key flow prototype | Fidelity decision + flow + 3 scenarios + hotspot map |
| Tuna | Full prototype spec | Interaction flow + all states + test scenarios + handoff notes |
| Salmon | Tested prototype | All above + transition design + edge cases + accessibility interactions |
| Willy | Hi-fi prototype | All methods + animations + full accessibility + competitive benchmark |

---

## Execution Prompt

Read the project context: wireframes, the design questions the prototype must answer, the testing method (moderated/unmoderated), timeline, FISH classification.

---

### Step 1 — Fidelity Decision (all FISH levels)

Fidelity is not about quality — it's about what questions the prototype needs to answer.

| Fidelity | What it tests | When to use | Build time |
|---|---|---|---|
| **Paper** | Navigation flow, rough layout | Early concept validation, stakeholder brainstorm | 30 min |
| **Lo-fi digital** | Navigation + basic interaction | First usability test, flow validation | 2–4 hours |
| **Mid-fi** | Layout + content hierarchy | Second test round, IA validation | 4–8 hours |
| **Hi-fi** | Visual design + microinteractions | Pre-launch validation, stakeholder sign-off | 1–3 days |

**Decision output:**
```
Fidelity: [chosen level]
Rationale: [what questions this fidelity answers that lower fidelity can't]
What we're NOT testing with this prototype: [sets expectations for what won't be validated]
Tool: [Figma / Framer / Marvel / paper]
Build estimate: [X hours for designer]
```

**Anti-pattern to avoid:** hi-fi prototypes for early-stage research. Users critique visual design instead of flow and interaction. Start lo-fi, add fidelity only when it changes what you learn.

---

### Step 2 — Interaction Flow (all FISH levels)

Map every clickable state and what it connects to.

```
Flow: [name]

[Screen: starting state]
  Hotspot: [element] → [action: navigate to / overlay / reveal] → [Screen: target]
  Hotspot: [element] → [action] → [Screen: target]
  
[Screen: next state]
  Hotspot: [element] → [action] → [Screen: target]
  Back: [navigates to: [Screen]]
  
[Terminal state: completion or dead-end — flag dead-ends explicitly]
```

**Interaction types in Figma:**
- Navigate to: new screen replaces current
- Overlay: appears on top of current screen (modal, dropdown, tooltip)
- Swap: component state change in place (toggle, accordion)
- Scroll to: scroll to anchor on current screen
- Open link: external URL

For each transition, specify:
- Direction (right-to-left for drill-down, bottom-to-top for modal)
- Duration (200ms–400ms — faster than 200ms feels invisible, slower than 400ms feels sluggish)
- Easing (ease-out for enter, ease-in for exit, ease-in-out for in-place changes)

---

### Step 3 — Clickable State Inventory (Tuna, Salmon, Willy)

List every clickable element and its behavior.

| Element | Screen | Action | Target | State change |
|---|---|---|---|---|
| [Primary CTA] | [Screen 1] | Click | Navigate to Screen 2 | Button → loading state → Screen 2 |
| [Nav item: Settings] | [All screens] | Click | Navigate to Settings | — |
| [Error link: Try again] | [Error state] | Click | Retry action | — |
| [Dropdown: Options] | [Screen 3] | Click | Open overlay | Dropdown closed → open |

**Dead-end inventory:** list every element that won't be clickable in this prototype. Include a note to testers.
```
Non-clickable elements in this prototype:
- [Secondary navigation] — not required for test tasks
- [Footer links] — out of scope for this test
- [Form: email field] — use preset text, no input needed
```

---

### Step 4 — Test Scenarios (all FISH levels)

Each scenario simulates a realistic user situation. Scenarios determine what gets clicked.

```
Scenario [N]: [Title]
User situation: [The realistic context — written in second person]
Example: "You just signed up for [Product]. You've been asked by your manager to 
[task]. You've never used [Product] before. Please go ahead."

Starting screen: [exact screen in the prototype]
Expected path: [the designed path]
Success: [what the user sees when they've completed the task]
Key moments to observe: [specific decision points]
Will test: [which design question this scenario answers]
```

Produce 3 scenarios (Nemo), 5 (Tuna), 7 (Salmon), 10 (Willy).

**Scenario quality bar:**
- Written in second person ("you want to...")
- Realistic motivation (not "click the green button")
- Clear ending state (user knows when they're done)
- Mapped to a specific design question

---

### Step 5 — Transition and Animation Design (Salmon, Willy)

Transitions communicate relationship and hierarchy. Design them explicitly — don't leave it to the developer's defaults.

**Transition patterns:**
```
Pattern: [name]
Use: [when this transition plays]
Direction: [from / to]
Duration: [Xms]
Easing: [ease-out / ease-in / ease-in-out / spring]
Example: "Modal enters from bottom, ease-out, 300ms. Exits downward, ease-in, 200ms."
```

**Standard transitions to define:**
- Page navigation (forward/back)
- Modal enter/exit
- Dropdown open/close
- Loading to content
- Error state appear
- Success state appear
- Accordion expand/collapse
- Tab switch

**Performance rule:** animations must run at 60fps. Complex transitions that can't hit 60fps should be simplified. The animation is not the feature.

**Reduced motion:** all animations must have a `prefers-reduced-motion` alternative (instant transition, no animation).

---

### Step 6 — Prototype Handoff Notes (all FISH levels)

The prototype spec is for the designer building it, not for the user.

```
Prototype spec for: [designer name]
Due: [date — prototype must be ready before test session]
Tool: [Figma / Framer]

Starting point: [share link to starting frame]
Required screens: [list of frames to include]
Required connections: [list of hotspots with targets]

Preset content: [what content should be pre-filled — no blank states]
  - [e.g., User is "Sarah Chen", email "sarah@acme.com" — already visible in the form]
  - [e.g., Dashboard shows 3 existing projects — pre-populated]

What to NOT include: [elements to omit for prototype simplicity]
  - [e.g., Settings section — not testable in this round]

Known shortcuts acceptable in this prototype:
  - [e.g., Clicking any product goes to the same product detail page]
  - [e.g., Search results are pre-loaded regardless of input]
```

---

### Final Output

**Fidelity decision** — with rationale and what it tests vs. doesn't
**Interaction flow** — every screen, hotspot, and target
**Clickable state inventory** — all interactive elements + dead-end list
**Test scenarios** — realistic situations mapped to design questions
**Transition design** — patterns, durations, easings (Salmon+)
**Prototype handoff notes** — for the designer building it
**Recommended next skill** — `/ds-ux-design-usability-testing` (to run sessions with this prototype) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
