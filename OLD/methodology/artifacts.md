---
name: Fish Model — artifact registry (Pillar 2)
description: Canonical types for every artifact a Fish-Model agent produces or consumes. Every outputs: field in methods.md resolves to a type defined here.
type: methodology-runtime
status: complete · 2026-05-02
---

# Fish Model — artifact registry (Pillar 2)

> `methods.md` (Pillar 1) defines what agents do.  
> This file defines what they produce — and what each artifact feeds downstream.  
> `projections.md` (Pillar 3, next) defines how each artifact lands on the Fish Kanban and foreign surfaces.

Every `outputs:` field in a skill contract is a reference to a type here. Agents must produce conformant artifacts; downstream agents rely on the schema. Nothing in `outputs:` is valid unless it resolves to a node in this graph.

---

## 1. Conventions

### 1.1 Naming

Canonical filename: `<type>.md` (or `<type>.<ext>` for non-text artifacts).  
When a card holds multiple instances of the same type, suffix with context: `interview-synthesis-round-2.md`.  
No date prefixes — dates go inside the artifact frontmatter or in the `<fish-handoff>`.

### 1.2 Location

All artifacts live inside the card directory.

```
<card>/
  explore/
    interview-guide.md
    interview-synthesis.md
    nugget-board.md
    affinity-map.md
  solidify/
    problem-statement.md
    persona.md
    brief.md
    ac-list.md
    measurement-plan.md
  build/
    schematic.md
    test-plan.md
    usability-report.md
  ship/
    baseline.md
    delta-report.md
    trust-receipt.md
    changelog.md
  handoffs/
    handoff-e-s.md
    handoff-s-b.md
    handoff-b-r.md
  learning/
    learning-log.md
    retro-notes.md
    next-loop-queue.md
```

### 1.3 Trust levels

Every artifact carries a `status:` field in its frontmatter.

| Status | Meaning |
|---|---|
| `draft` | Agent-produced; not yet reviewed by a human |
| `reviewed` | Human has accepted or amended |
| `locked` | Cannot be modified; authoritative record for this phase exit |
| `archived` | Phase closed; reference only |

`trust-receipt.md` is always `locked` on creation. `<fish-handoff>` blocks are `locked` at phase transition. Everything else starts as `draft`.

### 1.4 Versioning

Artifacts are append-only once `locked`. If a phase handback occurs, the artifact is copied to `<name>-v2.md` and the new draft reopens. The original is never mutated.

---

## 2. Type taxonomy

Nine buckets. Every artifact belongs to exactly one.

| Bucket | What it holds |
|---|---|
| **research** | Raw and synthesized discovery outputs: interview notes, field syntheses, desk research |
| **framing** | Models, maps, and personas derived from research |
| **strategy** | Scoring frameworks, prioritization tables, business-model canvases, bets |
| **brief** | The brief family, acceptance criteria, decision records, ADRs |
| **design** | Prototypes, schematics, interaction and component specs |
| **validation** | Test plans, usability reports, heuristic evaluations |
| **measurement** | Metric plans, baselines, deltas, changelogs, trust receipts |
| **learning** | Retro notes, learning logs, next-loop queues |
| **handoff** | Phase-transition blocks, stream recaps, handback blocks |

---

## 3. The artifact graph

Master reference. Every `outputs:` field in methods.md names a row here.

| Artifact type | Bucket | Phase | Produced by | Primary consumers |
|---|---|---|---|---|
| `interview-guide.md` | research | E | user-interviews (pre) | — (consumed during session) |
| `interview-synthesis.md` | research | E | user-interviews (post) | nugget-board, affinity-clustering, persona, jtbd-framing |
| `inquiry-protocol.md` | research | E | contextual-inquiry (pre) | — (consumed during session) |
| `field-synthesis.md` | research | E | contextual-inquiry, fly-on-the-wall, observations, journaling | affinity-clustering, nugget-board, persona |
| `secondary-research.md` | research | E | secondary-research | affinity-clustering, lean-canvas, five-forces, pestel, brief |
| `nugget-board.md` | research | E | nugget-board | affinity-clustering, hmw-list, problem-statement |
| `affinity-map.md` | research | E→S | affinity-clustering | hmw-list, problem-statement, brief |
| `concept-map.md` | research | E, S | concept-mapping | problem-statement, opportunity-solution-tree |
| `problem-tree.md` | research | E, S | problem-tree-analysis | problem-statement, hmw-list |
| `triangulation.md` | research | E, S | triangulation | affinity-map, problem-statement |
| `competitor-scan.md` | research | E | competitor-pattern-scan | lean-canvas, spectrum-map, brief |
| `statement-analysis.md` | research | E, S | statement-analysis | nugget-board, jtbd-statements |
| `persona.md` | framing | E (create), S (apply) | personas | journey-map, empathy-map, jtbd-statements, brief |
| `empathy-map.md` | framing | E, S | empathy-map | persona (update), brief |
| `jtbd-statements.md` | framing | E, S | jtbd-framing, goal-directed-design | brief, kano-table, opportunity-solution-tree |
| `journey-map.md` | framing | E, S | journey-mapping | service-blueprint, osd, brief |
| `service-blueprint.md` | framing | E, S | service-blueprint | brief, schematic |
| `osd.md` | framing | E, S | osd | brief, schematic |
| `stakeholder-map.md` | framing | E | stakeholder-mapping | brief |
| `scenario-plan.md` | framing | E, S | scenario-planning | brief, storyboard |
| `experience-diagram.md` | framing | E, S | experience-diagramming | journey-map, brief |
| `hmw-list.md` | framing | E→S | hmw | problem-statement, opportunity-solution-tree, brief |
| `problem-statement.md` | framing | S | problem-framing | brief, ac-list, measurement-plan |
| `opportunity-solution-tree.md` | strategy | E, S | opportunity-solution-tree | brief, rice-scores, kano-table |
| `spectrum-map.md` | strategy | S | spectrum-mapping | brief |
| `lean-canvas.md` | strategy | E, S | lean-canvas | brief, shape-up-pitch |
| `bmc.md` | strategy | E, S | business-model-canvas | brief |
| `value-prop-canvas.md` | strategy | E, S | value-prop-canvas | brief |
| `swot.md` | strategy | E, S | swot | brief |
| `pestel.md` | strategy | E | pestel | lean-canvas, brief |
| `five-forces.md` | strategy | E | five-forces | lean-canvas, brief |
| `kano-table.md` | strategy | S | kano | moscow-list, brief |
| `moscow-list.md` | strategy | S | moscow | brief, ac-list |
| `rice-scores.md` | strategy | S | rice-scoring | brief, thin-vertical-slice |
| `wsjf-scores.md` | strategy | S | wsjf | brief, thin-vertical-slice |
| `impact-map.md` | strategy | S | impact-mapping | brief |
| `bulls-eye.md` | strategy | S | bulls-eye-diagramming | brief |
| `shape-up-pitch.md` | strategy | S | shape-up-pitch | brief |
| `importance-difficulty-matrix.md` | strategy | S | importance-difficulty-matrix | brief |
| `brief.md` | brief | S | brief-method | ac-list, measurement-plan, test-plan, storyboard, schematic, thin-vertical-slice, `<fish-handoff>` |
| `micro-brief.md` | brief | S | micro-brief | ac-list, `<fish-handoff>` |
| `pitch.md` | brief | S | pitch-rfc | brief, `<fish-handoff>` |
| `ac-list.md` | brief | S | acceptance-criteria | test-plan, usability-report, thin-vertical-slice, trust-receipt |
| `decision-log.md` | brief | S (starts) → all | decision-log | `<fish-handoff>`, trust-receipt |
| `adr.md` | brief | S, B | adr | decision-log |
| `design-system-extension.md` | brief | S, B | design-system-extension | brief |
| `storyboard.md` | design | S | storyboarding | schematic, fake-prototype |
| `schematic.md` | design | S, B | schematic-diagramming | fake-prototype, usability-report |
| `fake-prototype` | design | B | fake-prototypes | test-plan, usability-report |
| `microinteractions.md` | design | S, B | microinteractions | schematic |
| `hta.md` | design | S, B | hta | test-plan, schematic |
| `motion-principles.md` | design | B | motion-principles | design-system-extension |
| `thin-vertical-slice.md` | design | B | thin-vertical-slice | ac-list (validates against) |
| `review-notes.md` | design | B | joint-product-reviews | brief (amends), ac-list (amends) |
| `test-plan.md` | validation | S, B | usability-testing (pre) | usability-report |
| `usability-report.md` | validation | B, R | usability-testing (post) | next-loop-queue, learning-log, delta-report |
| `heuristic-evaluation.md` | validation | E, R | heuristic-evaluation | brief (amends), usability-report |
| `measurement-plan.md` | measurement | S | measurement-plan | baseline, delta-report |
| `baseline.md` | measurement | R | baseline-measurement | delta-report |
| `delta-report.md` | measurement | R | post-release-measurement | learning-log, next-loop-queue |
| `changelog.md` | measurement | R | changelog-entry | release-notes |
| `release-notes.md` | measurement | R | release-notes | — (published externally) |
| `trust-receipt.md` | measurement | R | trust-receipt | — (audit record; no downstream consumer) |
| `retro-notes.md` | learning | R | retrospective (all variants) | learning-log |
| `learning-log.md` | learning | R | learning-log | next-loop-queue |
| `next-loop-queue.md` | learning | R | next-loop-queue | next Explore `<fish-handoff>` |
| `<fish-handoff>` | handoff | all | fish-handoff | next-phase agent, human receiver |
| `stream-recap.md` | handoff | all | stream-recap | `<fish-handoff>` |
| `<fish-handback>` | handoff | all | handback | prior-phase agent |

---

## 4. Carrier artifact schemas

Carrier artifacts cross phase boundaries and feed multiple downstream methods. Agents must produce these conformant to schema; downstream agents parse these fields by name.

Lighter artifacts (canvases, maps, scoring tables) follow well-known formats — their structure is implied by the method that produces them, and full schemas aren't repeated here.

---

### `nugget-board.md`

The atomic finding store. Every raw input gets distilled to nuggets before clustering.

```
---
status: draft | reviewed | locked
card: [card identifier]
phase: E
---

## Nuggets

| id    | text                                             | type      | source                          | date       |
|-------|--------------------------------------------------|-----------|---------------------------------|------------|
| N-001 | "I always export to spreadsheet because..."      | behavior  | interview-synthesis-r1:p4       | 2026-05-02 |

## Legend
type: behavior | pain | context | goal | workaround | surprise
source: <artifact>:<page/timestamp>  — always traceable to origin
```

`id` is stable — downstream artifacts reference nuggets by id. Never renumber.

---

### `affinity-map.md`

The primary analysis output. Produced by `affinity-clustering`; the main feed into framing.

```
---
status: draft | reviewed | locked
card: [card identifier]
source-count: N          (number of nuggets processed; < 10 triggers confidence flag)
confidence: normal | low
---

## Clusters

### [Cluster name]
**Insight:** one sentence — what this cluster means for the problem  
**Members:** N-001, N-007, N-012  (nugget ids)

[repeat for each cluster — N = sqrt(source-count), min 3]

## Cross-cluster tensions
- [Cluster A] vs [Cluster B]: [one-line description of the conflict]

## HMW reframes
1. How might we [reframe tied to cluster X]?
...  (3–5 total)
```

---

### `persona.md`

Living document. Born in Explore from initial research; updated co-piloted in Solidify as new evidence arrives. Never `locked` — always live until the card closes.

```
---
status: draft | reviewed   (never locked)
card: [card identifier]
last-updated: [date]
evidence-count: N
---

## [Persona name]

**Role / context:** who this person is in relation to the product

### Goals
- End goal: what they want to accomplish in the session
- Experience goal: how they want to feel
- Life goal: larger aspiration, if research surfaced one

### JTBD
- Functional: "When I [situation], I want to [job], so I can [outcome]"
- Emotional: how they want to feel doing the job
- Social: how they want to be perceived

### Behaviors
[3–5 observed behaviors, each with nugget ids]

### Pains
[ranked list; each with source nugget id]

### Mental model gaps
[where expectation diverges from system behavior — if known]

### Evidence log
| date | update | source |
|------|--------|--------|
```

Multiple personas per card: each in its own `persona-[name].md`.

---

### `problem-statement.md`

One sentence. Everything downstream points back here.

```
---
status: draft | reviewed | locked
card: [card identifier]
framing-level: abstract | mid | specific
sigil: Nemo | Tuna | Salmon | Willy
locked-by: [human name] | "Solidify phase exit"
---

## Problem statement

[One canonical sentence. No sub-bullets. No hedging.]

## Why this framing
[2–3 sentences: what evidence supports it, what alternatives were rejected]

## Scope boundary
**In:** [what this statement includes]
**Out:** [named exclusions — not "TBD" or "out of scope generally"]
```

Once `locked`, never overwritten. Handback creates `problem-statement-v2.md`.

---

### `brief.md`

The primary Solidify output. Replaces the PRD.

```
---
status: draft | reviewed | locked
card: [card identifier]
sigil: Nemo | Tuna | Salmon | Willy
---

## Problem
[link to problem-statement.md — do not re-state, link]

## Journey
[which user type(s), what they're doing, from which persona(s)]

## Shape
What the solution space allows — not the final design, but the boundaries.
- Must: [hard constraints]
- Should: [strong preferences]
- Won't: [explicit non-scope]

## Acceptance criteria
[link to ac-list.md — or embed inline if micro-brief]

## Deferred
[items that surfaced and were consciously excluded — each with one-line reasoning]

## Evidence base
[links: affinity-map, persona(s), problem-statement, key nugget ids]
```

---

### `micro-brief.md`

Nemo and Tuna variant. One paragraph, no sub-sections.

```
---
status: draft | reviewed | locked
card: [card identifier]
sigil: Nemo | Tuna
---

[One paragraph: what the problem is, who it affects, what the shape of the solution is,
and what done looks like. All of brief.md's intent — none of its ceremony.]

## Acceptance criteria
[AC-001: ...]
[AC-002: ...]
```

---

### `ac-list.md`

The testable contract. Every line independently verifiable.

```
---
status: draft | reviewed | locked
card: [card identifier]
brief-ref: brief.md | micro-brief.md
---

## Acceptance criteria

| id     | criterion                                                                  | type        | verifiable-by     | priority |
|--------|----------------------------------------------------------------------------|-------------|-------------------|----------|
| AC-001 | When [condition], the user can [outcome] within [time or steps]            | functional  | usability-test    | must     |

type: functional | experience | performance | edge-case
verifiable-by: usability-test | automated-test | analytics | visual-inspection
priority: must | should | deferred
```

`id` is stable. `trust-receipt.md` and `usability-report.md` reference by id.

---

### `measurement-plan.md`

What success looks like, before anything ships.

```
---
status: draft | reviewed | locked
card: [card identifier]
brief-ref: brief.md
---

## Primary metric
**Name:** [metric]  
**Baseline:** [current value, or "TBD — capture in baseline.md"]  
**Target:** [value at which this card is a success]  
**Capture:** [how to measure — tool, query, or method]  
**Window:** [how long after Ship before we measure]  

## Secondary metrics
[same structure, ≤ 3]

## Counter-metrics
[what we watch to catch regressions caused by this change]

## Guardrails
[any metric that triggers rollback if breached]
```

---

### `trust-receipt.md`

Signed, append-only audit record. Created at Ship exit. Never edited after creation.

```
---
status: locked   (always — set on creation)
card: [card identifier]
signed-by: [agent id] + [human reviewer]
created: [ISO timestamp]
---

## What shipped
[1–3 sentences: what the agent produced and what the human accepted]

## What was redacted
[anything the agent flagged as uncertain or explicitly excluded from the output]

## Decisions
[links to decision-log.md entries made during this card]

## AC coverage
| AC id  | Result                          |
|--------|---------------------------------|
| AC-001 | passed                          |
| AC-002 | deferred — [one-line reason]    |

## Measurement baseline
[link to baseline.md]
```

Never amended. If a handback occurs and the card re-ships, a new trust receipt is created.

---

### `<fish-handoff>`

The phase-transition block. Emitted at every phase exit. Carries full context to the next phase, session, or collaborator.

```xml
<fish-handoff
  from="E | S | B | R"
  to="S | B | R | E"
  card="[card identifier]"
  sigil="Nemo | Tuna | Salmon | Willy"
  date="[ISO date]"
  agent="[agent id]"
  status="locked"
>

<summary>
  2–3 sentences: what happened in this phase, what was learned,
  what the next phase starts with.
</summary>

<locked>
  List of artifact paths locked at this phase exit.
</locked>

<open>
  List of items explicitly deferred, each with a one-line reason.
</open>

<instructions-for-next-phase>
  Specific starting point and first action for the receiving phase.
  Not generic guidance — a named first move.
</instructions-for-next-phase>

</fish-handoff>
```

Stored as `handoffs/handoff-[from]-[to].md`. The XML block is canonical; the surrounding `.md` file may include narrative context.

---

### `learning-log.md`

Maintained continuously from all session outputs across the card's lifetime. Agent appends on every method run; human reviews at Ship.

```
---
status: draft → reviewed at Ship → archived after next-loop-queue
card: [card identifier]
---

## Entries

| date       | source                      | insight                                   | type                   | forward-ref         |
|------------|-----------------------------|-------------------------------------------|------------------------|---------------------|
| 2026-05-02 | usability-report:§3         | Users don't see the save confirmation     | friction-finding       | → next-loop-queue   |

type: friction-finding | assumption-validated | assumption-invalidated | surprising-finding | method-note
forward-ref: link to artifact where this was addressed or explicitly deferred
```

---

## 5. The artifact flow

A card moves through the artifact graph in a predictable sequence. Sigil controls which steps run — but the graph always flows in this direction.

```
[raw inputs: interviews, observations, desk research]
            ↓
interview-synthesis.md + field-synthesis.md + secondary-research.md
            ↓
       nugget-board.md
       (atomic finding store)
            ↓
       affinity-map.md
       (clusters + tensions + HMWs)
            ↓
problem-statement.md  +  persona.md  +  jtbd-statements.md
            ↓
         brief.md  ←── [strategy artifacts: kano, rice, ost, spectrum-map...]
            ↓
ac-list.md  +  measurement-plan.md
            ↓
[design artifacts: schematic, storyboard, microinteractions, hta...]
            ↓
       test-plan.md  →  usability-report.md
            ↓
    baseline.md  →  delta-report.md
            ↓
trust-receipt.md  +  changelog.md  +  release-notes.md
            ↓
  learning-log.md  →  next-loop-queue.md  →  [next Explore loop]
```

`<fish-handoff>` blocks are emitted at each phase boundary and carry the locked state forward. `stream-recap.md` is attached to each handoff.

---

## 6. How this connects out

- **`methods.md`** — every `outputs:` field in every skill contract resolves to a type in §3 above.
- **`projections.md`** (Pillar 3, next) — defines how each artifact type lands on the Fish Kanban (native) and how it syncs to Jira, Figma, Linear, and Slack (foreign adapters). Every artifact in §3 has a projection defined there.
- **Local agents** and **system agents** consume artifacts by type. An agent reading `brief.md` parses the `brief` schema. An agent reading `ac-list.md` parses the `ac-list` schema. No per-card bespoke parsing.
- **`<fish-handoff>`** is the routing layer — it carries artifact paths and phase state between agents and sessions.

---

## 7. Status

- **2026-05-02** — complete. 69 artifact types registered across 9 buckets. Carrier schemas written for 10 types. The artifact graph in §3 is the authoritative map.
- **Next:** `projections.md` — Fish Kanban spec + foreign adapter contracts (Jira, Figma, Linear, Slack).
