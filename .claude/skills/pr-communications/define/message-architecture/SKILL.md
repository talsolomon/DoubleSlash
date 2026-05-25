---
name: ds-pr-communications-message-architecture
description: Builds a PR message architecture with SOCO, core messages (max 3), proof points, bridging phrases, audience variants, and spokesperson guide. Use when preparing for a launch, briefing spokespeople, or asking "what are the 3 things we want every audience to believe". Also triggers on: Core message development, proof point validation, audience adaptation, bridging phrases, message testing.
tags: [pr-communications, define]
model: inherit
---

# Message Architecture
**Domain**: PR/Communications | **Phase**: Define | **Invocation**: `/ds-pr-communications-message-architecture`

## What this produces
A message architecture document: SOCO (Single Overriding Communications Objective), core messages (max 3), proof points per message, bridging phrases, audience-specific variants, competitive differentiation, and a spokesperson quick reference guide.

## Methods
SOCO definition, core message development, proof point identification and validation, audience message adaptation, message hierarchy design, bridging phrase development, competitive message differentiation, narrative arc design, message testing framework

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | SOCO, 3 core messages, proof points, audience variants |
| Tuna | Full architecture with message hierarchy, bridging phrases |
| Salmon | Full architecture with competitive differentiation, narrative arc |
| Willy | All methods — spokesperson guide, testing framework, full proof point library |

## Execution prompt
You are running Message Architecture for [project]. Build the message system that every communication is built from.

**Input**: communications strategy objectives, reputation audit findings, audience definitions, key announcement details.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — SOCO (Single Overriding Communications Objective)

```
The SOCO is the one thing every piece of communication must accomplish.
If a reporter leaves a briefing remembering only one thing — this is it.

SOCO formula: "We want [audience] to believe [belief] because [evidence/reason]."

Draft SOCO:
"We want [target audience] to believe [the single most important perception shift]
because [the most compelling reason — data, proof, story]."

SOCO quality test:
  □ One sentence — not a paragraph
  □ States a belief, not an action ("believe" not "purchase")
  □ Is measurable — we can track whether this belief is shifting
  □ Every core message supports this SOCO
  □ A CEO can say it under pressure in 30 seconds
```

### Step 2 — Core Message Architecture (Rule of 3)

```
Max 3 core messages. Every additional message competes with the others for recall.

Core Message Template:
────────────────────────────────────────────────────────────────────────
Message 1: [The single most important thing to believe]
  Proof point A: [Specific stat, case study, or example]
  Proof point B: [Specific stat, case study, or example]
  Proof point C: [Specific stat, case study, or example]

Message 2: [The second most important belief]
  Proof point A: [Specific]
  Proof point B: [Specific]
  Proof point C: [Specific]

Message 3: [The third belief — often differentiates from competition]
  Proof point A: [Specific]
  Proof point B: [Specific]
  Proof point C: [Specific]
────────────────────────────────────────────────────────────────────────

Message quality test (apply to each):
  □ Can it be delivered in one sentence?
  □ Is it memorable — would a journalist repeat it?
  □ Is it differentiated — could a competitor say the same thing?
  □ Is it provable — every claim has a proof point?
  □ Does it support the SOCO?
```

### Step 3 — Message Hierarchy

```
Full message hierarchy (pyramid from strategic to tactical):

Level 1 — SOCO:          [The single overriding objective]
Level 2 — Core messages:  [Message 1] / [Message 2] / [Message 3]
Level 3 — Proof points:   [3 per core message]
Level 4 — Stories:        [Human stories and case studies that illustrate each message]
Level 5 — Sound bites:    [Quotable, repeatable phrases for each message — ≤15 words]

Sound bite examples (per message):
  Message 1 sound bite: "[Quotable phrase — short, specific, repeatable]"
  Message 2 sound bite: "[Quotable phrase]"
  Message 3 sound bite: "[Quotable phrase]"
```

### Step 4 — Bridging Phrases

Bridging allows a spokesperson to acknowledge a question and redirect to a core message:

```
Bridging phrase library:

To core message after a hostile or off-topic question:
  "What's important to understand here is..."
  "Let me put that in context..."
  "The real issue is..."
  "What our customers tell us is..."
  "That's a fair question. What we know is..."

To proof point after a claim is challenged:
  "Here's what the data shows..."
  "We've seen this with [customer/example]..."
  "In fact, [proof point]..."

To redirect from a sensitive topic:
  "I'm not going to speculate on that. What I can tell you is..."
  "That's outside my area. What I can speak to directly is..."
  "We'll have more to share on that. Right now, the most relevant thing is..."

Anti-bridging patterns (never do these):
  □ "No comment" — sounds guilty
  □ "Off the record..." — nothing is off the record
  □ Repeating the hostile framing ("You're right that we lost customers...")
  □ Speculating ("I think what might happen is...")
```

### Step 5 — Audience-Specific Message Variants

```
Core messages stay constant. Language and emphasis adapt per audience.

Audience: [Media / Analysts]
  Language register: [Professional, direct, evidence-based]
  Message 1 adaptation: [How to frame it for maximum headline value]
  Message 2 adaptation: [What proof points resonate most with this audience]
  Key stat to lead with: [The most credible, surprising data point]
  What to avoid: [Jargon / promotional language / forward-looking statements without proof]

Audience: [Customers / Users]
  Language register: [Practical, benefit-focused, peer-level]
  Message 1 adaptation: [Translate benefit to their daily job]
  What resonates: [Use case examples, peer references]

Audience: [Investors / Analysts]
  Language register: [Financial context, market position, growth narrative]
  Message framing: [Market size → our position → evidence of winning]
  What they care about: [Defensibility, growth rate, competitive moat]

Audience: [Employees]
  Message adaptation: [Internal narrative — why this matters for team, mission link]
  Tone: [Honest, direct, energizing — not promotional]

Audience: [Potential talent]
  Adaptation: [Mission and culture emphasis, growth narrative]
```

### Step 6 — Competitive Message Differentiation

```
Competitor message landscape:
────────────────────────────────────────────────────────────────────────
Competitor    Their core claim        Our counter-positioning
────────────────────────────────────────────────────────────────────────
[Comp A]      "[Their main message]"  "[How we acknowledge and reframe]"
[Comp B]      "[Their main message]"  "[How we acknowledge and reframe]"
────────────────────────────────────────────────────────────────────────

Owned territory (what we can claim that they can't):
  [The message space only we occupy — based on proof points competitors lack]

Message we are deliberately NOT fighting on:
  [Where a competitor has unassailable proof points — don't try to compete here]
```

### Step 7 — Spokesperson Quick Reference Guide

```
SPOKESPERSON QUICK REFERENCE — [Announcement / Campaign]
──────────────────────────────────────────────────────────────────
SOCO: "[One sentence]"

Core messages (in priority order):
  1. "[Message 1]" — prove with: [best proof point]
  2. "[Message 2]" — prove with: [best proof point]
  3. "[Message 3]" — prove with: [best proof point]

Sound bites (use these verbatim when possible):
  "[Sound bite 1]"
  "[Sound bite 2]"
  "[Sound bite 3]"

Bridge to: "[Best bridging phrase for expected hostile questions]"

Topics that are OFF LIMITS (do not speculate):
  - [Topic — e.g., future funding, specific competitors, unannounced products]
  - [Topic]

If asked about [anticipated difficult question]:
  "[Prepared response using bridge + core message]"
──────────────────────────────────────────────────────────────────
```

---

## Final Output
- SOCO (Single Overriding Communications Objective)
- Core message architecture (max 3 messages, 3 proof points each)
- Full message hierarchy (SOCO → messages → proof points → stories → sound bites)
- Bridging phrase library
- Audience-specific message variants (media, customers, investors, employees, talent)
- Competitive message differentiation map
- Spokesperson quick reference guide

**Recommended next skill**: `/ds-pr-communications-pr-campaign-design` — translate the message architecture into a campaign with news hooks, assets, and media targets.
