---
name: ds-brand-brand-positioning
description: Writes a brand positioning statement with point-of-difference vs. point-of-parity analysis, perceptual map, reasons to believe, and tagline exploration. Use when clarifying market position, preparing for a launch, or asking "how are we different and why should anyone care". Also triggers on: Positioning statement writing, POD vs. POP analysis, category definition, competitive frame of reference, tagline exploration.
tags: [brand, define]
model: inherit
---

# Brand Positioning
**Domain**: Brand | **Phase**: Define | **Invocation**: `/ds-brand-brand-positioning`

## What this produces
A brand positioning framework: positioning statement (internal use), POD vs. POP analysis, perceptual map, reasons to believe, category design recommendation, and tagline candidates — ready for messaging and creative use.

## Methods
Positioning statement writing, differentiation axis mapping, perceptual mapping, category definition, competitive frame of reference, point of difference vs. point of parity analysis, reason-to-believe development, tagline exploration

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Positioning statement, top 3 PODs, reasons to believe |
| Tuna | Positioning, POD vs. POP, competitive frame of reference |
| Salmon | Full positioning with perceptual map, category design |
| Willy | All methods — category design, tagline exploration, full framework |

## Execution prompt
You are running Brand Positioning for [project]. Produce a positioning framework that marketing and creative can build from.

**Input**: brand audit findings, competitive brand analysis, audience insights.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Positioning Statement

```
Internal positioning statement formula:
"For [target audience]
who [statement of need or opportunity],
[brand name] is the [category frame of reference]
that [key benefit / promise]
because [reason to believe]."

Quality tests:
  □ Specific target — not "everyone who needs X"
  □ Names a category the buyer already uses to search
  □ The benefit is meaningful and distinct — not generic
  □ The reason to believe is specific and provable
  □ A competitor could NOT use this statement for their brand

Filled template:
  For: ___________
  Who: ___________
  [Brand] is the: ___________
  That: ___________
  Because: ___________

One-sentence version (the "elevator position"):
"[Brand name] is [the only / the first / the best] [category]
that [what it does differently] for [who], [why it matters]."
```

### Step 2 — Category Frame of Reference

```
Category options (pick the frame that buyers already use):
  Option A — Existing category: "[Standard category name]"
    Pro: Buyers already search here; easy to understand
    Con: Competitive; harder to own
    Implication: Win on differentiation within a crowded space

  Option B — Subcategory: "[Narrower category name]"
    Pro: Can own the subcategory if we define it first
    Con: Smaller total audience initially
    Implication: Category education required

  Option C — Create a new category: "[New category name we define]"
    Pro: Can be the category leader by default
    Con: High education cost; buyers may not search here yet
    Implication: Requires PR, content, and thought leadership investment

Recommended frame: Option [A/B/C] — rationale: [Why this frame matches buyer behavior]

Category naming (if creating or subcategorizing):
  Proposed category name: "[Name]"
  Why buyers will use it: [What problem or job it maps to]
  Who else validates this frame: [Industry analysts / other companies using it]
```

### Step 3 — Point of Difference vs. Point of Parity

```
POD vs. POP Framework:
  Points of Difference (POD): Attributes we have that competitors don't — our competitive advantage
  Points of Parity (POP): Attributes we must have to be credible in the category — table stakes

PODs (our unique advantages — ranked by importance to buyers):
────────────────────────────────────────────────────────────────────────
POD                    Why it matters to buyers    Proof point        Defensible?
────────────────────────────────────────────────────────────────────────
[POD 1 — strongest]    [Why buyers care]           [Specific evidence] [Y/N — why]
[POD 2]                [Why buyers care]           [Evidence]          [Y/N]
[POD 3]                [Why buyers care]           [Evidence]          [Y/N]
────────────────────────────────────────────────────────────────────────

POPs (must-have category credentials — do we have them all?):
────────────────────────────────────────────────────────────────────────
POP (table stake)       Do we have it?   If not — gap to address
────────────────────────────────────────────────────────────────────────
[Category requirement 1] [Y/N]           [What needs to change]
[Category requirement 2] [Y/N]           [What needs to change]
[Category requirement 3] [Y/N]           [What needs to change]
────────────────────────────────────────────────────────────────────────
POP gaps must be closed before leaning into PODs — buyers won't consider us if we lack the basics.
```

### Step 4 — Reasons to Believe (RTB)

```
RTB hierarchy: What makes our PODs credible?

RTB for POD 1: [Our strongest differentiator]
  RTB Type          Evidence
  ─────────────────────────────────────────────────────────────────
  Product proof:    [Feature / capability that delivers the POD]
  Performance data: [Stat — before/after, benchmark, % improvement]
  Customer proof:   [Specific customer quote / case study reference]
  Third-party:      [Analyst / media / certification that validates]

RTB for POD 2: [Same structure]
RTB for POD 3: [Same structure]

RTB quality test:
  □ Every claim has at least one specific proof point
  □ No proof point is generic ("improves efficiency" needs a %)
  □ Customer proof is named and real, or from a recognized segment
```

### Step 5 — Perceptual Map

```
Perceptual map:
  X-axis: [Dimension 1 — e.g., Easy to use ↔ Feature-rich]
  Y-axis: [Dimension 2 — e.g., Enterprise-grade ↔ SMB-focused]

  Ideal positioning for us: [Quadrant] — because: [Buyer need alignment]
  Current perceived position: [Quadrant] — based on: [Audit findings]
  Target position in 18 months: [Quadrant] — requires: [Changes to product / message / brand]

  Gap between current and target:
    Current: [Where buyers see us now]
    Target:  [Where we want to be perceived]
    Bridge:  [What needs to change to move perception — product, proof points, comms]
```

### Step 6 — Tagline Exploration

```
Tagline criteria:
  □ 3–7 words
  □ Memorable without explanation
  □ Reflects the POD or category claim
  □ Works in print, digital, spoken
  □ Does not date quickly
  □ Unique — no competitor could use it

Tagline directions (3 different angles):

Direction A — [Outcome/benefit]:
  "[What the customer gets]"
  Examples: [2–3 candidates in this direction]
  Strength: [Why this direction works]
  Risk: [What could go wrong]

Direction B — [Category redefinition]:
  "[How we reframe the category]"
  Examples: [2–3 candidates]
  Strength / Risk

Direction C — [Brand personality]:
  "[Tone and character-led]"
  Examples: [2–3 candidates]
  Strength / Risk

Recommended direction: [A/B/C] — finalist candidate: "[Best tagline]"
Reason: [Why this one wins — audience resonance, differentiation, memorability]

Not a tagline yet: test with 5 target buyers before committing.
```

---

## Final Output
- Positioning statement (internal use, quality-tested)
- One-sentence elevator position
- Category frame of reference recommendation
- POD vs. POP analysis (ranked by buyer importance, with proof points)
- Reasons to believe per POD
- Perceptual map (current vs. target position)
- Tagline candidates (3 directions, 2–3 options each, finalist recommended)

**Recommended next skill**: `/ds-brand-brand-identity-design` — translate positioning into a visual and verbal identity brief for the design team.


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
