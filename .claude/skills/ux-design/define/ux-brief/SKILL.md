---
name: ds-ux-design-ux-brief
description: Writes a UX brief that frames the design problem, defines the user, and sets success criteria. Use when starting a design project, aligning with stakeholders, or asking "what are we designing and for whom". Also triggers on: problem statement, HMW question, POV statement, job story framing, WCAG accessibility requirements, design principles.
tags: [ux-design, define, ux-brief, hmw, pov, wcag, job-stories]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# UX Brief
**Domain**: UX Design | **Phase**: Define | **Invocation**: `/ds-ux-design-ux-brief`

## What this produces
A UX brief that aligns the team on what's being designed, for whom, and what success looks like — problem statement, user profile, job stories, design goals, constraints, success metrics, and WCAG accessibility requirements.

## Methods
Problem statement synthesis, HMW (How Might We) framing, POV (Point of View) statement, user persona definition, job story format, design principles articulation, WCAG 2.1 accessibility requirement mapping, success metric definition, constraint mapping, scope boundary definition

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Lean brief | Problem statement + user definition + 3 design goals |
| Tuna | Full brief | HMW + user profile + job stories + goals + metrics |
| Salmon | Complete brief | All above + design principles + WCAG requirements + constraints |
| Willy | Stakeholder brief | All methods + alignment workshop format + full constraint map |

---

## Execution Prompt

Read the project context: research findings, product requirements, stakeholder constraints, FISH classification.

---

### Step 1 — Problem Statement (all FISH levels)

The problem statement is the brief's anchor. Write it before anything else.

**Three formats — choose the one that fits the project:**

**HMW (How Might We) — for open-ended design problems:**
```
How might we help [user] [achieve goal] without [constraint or current friction]?
```
Rules for HMW:
- Not too broad: "How might we improve healthcare" → unsolvable
- Not too narrow: "How might we add a button that does X" → already solved
- Sweet spot: "How might we help first-time users understand their data without requiring them to read documentation?"

**POV (Point of View) — for insight-driven design:**
```
[User description] needs [need] because [insight].
```
Example: "A solo founder who manages everything alone needs to see their entire project state at a glance because context-switching between tools breaks their flow."

**Problem Statement — for requirement-driven design:**
```
[User] currently [current state — the pain]. We need to design [solution direction] so that [desired outcome].
```

State the problem at the right altitude: solution-agnostic, user-centered, measurable.

---

### Step 2 — User Profile (all FISH levels)

One primary user. One secondary user if necessary. No more — designing for everyone is designing for no one.

**Primary user:**
```
Name: [not a name, a role/context — "The Solo Founder", "The Enterprise Buyer"]
Context: [What is their situation when they encounter this product?]
Sophistication: [novice / intermediate / expert in this domain]
Motivation: [What are they trying to accomplish — the job, not the task]
Frustration: [What makes this hard for them right now]
Mental model: [How do they think about this domain — from research]
Vocabulary: [Exact words they use from interviews]
```

**What a user profile is NOT:**
- Not demographics (age, gender, location) — these don't drive design decisions
- Not a wish list ("they want a simple, powerful tool") — everyone wants that
- Not hypothetical ("they might want") — grounded in research

**Secondary user** (Salmon, Willy only):
Same format. Flag where primary and secondary user needs conflict — these are the key design tensions.

---

### Step 3 — Job Stories (Tuna, Salmon, Willy)

Job stories from research translate directly to design goals.

```
Job Story: When [specific situation], I want to [motivation], so I can [outcome].

Evidence: [user quotes or behavioral observations that validate this job]
Design implication: [what this job story means for the design]
```

Produce 3 job stories (Tuna), 5 (Salmon), 7 (Willy). Each job story is a design requirement in disguise.

---

### Step 4 — Design Goals (all FISH levels)

Design goals are not features. They are the qualities the design must achieve.

**Goal format:**
```
Goal: [Active verb phrase — what the design must do]
Why: [How this serves the user's need or job story]
Success signal: [What we'll see or measure if we get this right]
```

**Example goals:**
- "Surface the most important information without requiring navigation" — because the user's job is to understand state at a glance
- "Make error recovery obvious" — because users will inevitably make mistakes and abandonment increases if recovery is unclear
- "Load in under 2 seconds on a 4G connection" — because users are often mobile and slow load = abandonment

Produce 3 goals (Nemo), 5 (Tuna/Salmon), 7 (Willy).

---

### Step 5 — Design Constraints (Tuna, Salmon, Willy)

Constraints are not problems — they're the rules the design must follow.

| Constraint | Type | Impact |
|---|---|---|
| [Platform: iOS 16+ only] | Technical | [limits gesture patterns, requires native UI conventions] |
| [Must work offline] | Technical | [all critical flows must function without connection] |
| [Brand guidelines: no serif fonts] | Brand | [limits typography choices] |
| [Legal: no tracking without consent] | Legal/Compliance | [no analytics without cookie consent] |
| [Accessibility: WCAG 2.1 AA] | Accessibility | [contrast ratios, keyboard navigation, screen reader support] |
| [Timeline: design done in 2 weeks] | Resource | [must deprioritize Willy-level depth] |

**Hard constraints vs. soft constraints:**
- Hard: violating this breaks the product or creates legal risk — non-negotiable
- Soft: preference or convention — can be challenged with evidence

---

### Step 6 — Accessibility Requirements (Salmon, Willy)

WCAG 2.1 AA is the standard. State the requirements explicitly — don't leave them to engineering.

| WCAG Requirement | Level | Design impact |
|---|---|---|
| Color contrast ≥ 4.5:1 (text) | AA | All body text and interactive elements |
| Color contrast ≥ 3:1 (large text, UI) | AA | Headings ≥ 18pt, icons |
| Keyboard navigation — all interactive elements reachable | AA | Tab order, focus states |
| Focus visible — keyboard focus clearly visible | AA | Design focus ring for every interactive element |
| Alt text — all images have descriptive alt text | AA | Define alt text in handoff |
| Error identification — errors identified in text, not color alone | AA | Error messages include text, not just red border |
| Labels — form inputs have associated labels | AA | No placeholder-only labels |
| Resize text — content works at 200% zoom | AA | Test all flows at 200% |

**Additional requirements (Willy):** screen reader flow for core tasks, reduced motion support for animations.

---

### Step 7 — Success Metrics (all FISH levels)

Define how you'll know the design worked before you design it.

| Metric | Current baseline | Target | Measurement method |
|---|---|---|---|
| [Task completion rate for core flow] | [X%] | [Y%] | Usability test, analytics |
| [Time to complete core task] | [X min] | [Y min] | Analytics funnel |
| [SUS score] | [X] | [≥ 72 (B grade)] | Post-launch survey |
| [Error rate on [specific step]] | [X%] | [< Y%] | Analytics event |

Minimum 2 metrics (Nemo), 4 metrics (Tuna+).

---

### Step 8 — Scope Boundary (all FISH levels)

Explicitly document what is NOT in scope. This prevents scope creep during design.

**Out of scope for this design cycle:**
- [Feature or flow that was requested but won't be designed now — with reason]
- [User type or use case excluded — with reason]
- [Platform not supported — with reason]

**Dependencies:**
- [What must be true before this design can be implemented]
- [Other teams or systems this design depends on]

---

### Final Output

**Problem statement** — HMW, POV, or problem statement format, solution-agnostic
**User profile** — primary (+ secondary if needed), research-grounded
**Job stories** — 3–7 motivations behind the user's behavior (Tuna+)
**Design goals** — active verbs, with success signals
**Constraints** — hard vs. soft, technical/brand/legal/accessibility
**WCAG 2.1 AA requirements** — explicit per-component guidance (Salmon+)
**Success metrics** — with baselines and targets
**Scope boundary** — explicit out-of-scope items
**Recommended next skill** — `/ds-ux-design-information-architecture` (if structure is open) or `/ds-ux-design-wireframing` (if IA is done) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
