---
name: Fish Model — projections (Pillar 3)
description: How Fish state projects onto the native Fish Kanban and onto foreign surfaces (Jira, Linear, Figma, Slack, GitHub). Canonical data lives in the card directory; projections are derived.
type: methodology-runtime
status: complete · 2026-05-02
---

# Fish Model — projections (Pillar 3)

> `methods.md` (Pillar 1) defines what agents do.  
> `artifacts.md` (Pillar 2) defines what they produce.  
> This file defines how that state becomes visible — on the native Fish Kanban and on every foreign surface.

**The canonical principle:** the card directory is the source of truth. The Fish Kanban is a view derived from it. Foreign surfaces (Jira, Linear, Figma, Slack, GitHub) are write-only projections that Fish pushes to — they do not write back. If a foreign system diverges from the Fish card state, the Fish card wins.

---

## 1. The Fish Kanban (native projection)

### 1.1 Board anatomy

The Fish Kanban is the native view of all active cards. It is a four-column board shaped by the convergence metaphor of the Fish Model — wide at the head, narrow at the tail.

```
╔═══════════════╦══════════════╦══════════════╦═════════╗
║   EXPLORE     ║   SOLIDIFY   ║    BUILD     ║  SHIP   ║
║   (head)      ║  (left body) ║ (right body) ║  (tail) ║
╠═══════════════╬══════════════╬══════════════╬═════════╣
║ card A [🐟]   ║ card B [🐋]  ║ card C [🐟]  ║         ║
║ card D [🐠]   ║              ║              ║         ║
╚═══════════════╩══════════════╩══════════════╩═════════╝
```

Conceptually, Explore is the widest column (many unknowns, divergent work); Ship is the narrowest (convergent, near-done). The board is not a gate system — a card can move backwards via handback; forward movement is earned, not forced.

**Rows:** each row is a project or team. Cards from the same project cluster in the same row so blockers and dependencies are visible.

**Column phases:**

| Column | Fish phase | Agent | Posture |
|---|---|---|---|
| Explore | E | explorer | divergent — open the aperture |
| Solidify | S | solidifier | convergent — lock one shape |
| Build | B | builder | executive — make it real |
| Ship | R | shipper | measured — release and learn |

### 1.2 Card node fields

Each card on the board is a node. Minimum fields:

```
card-id:          [stable identifier, e.g. onboarding-password-2026-04]
name:             [human-readable label]
archetype:        Nemo | Tuna | Salmon | Willy
phase:            E | S | B | R
status:           active | blocked | at-exit
stream-progress:  N/M  (steps completed / total steps for this archetype × phase)
confidence:       float 0.0–1.0  (from last <fish-handoff>.confidence_to_advance)
last-handoff:     [ISO date]
open-items:       N  (count of unresolved open: items from the last handoff)
locked-artifacts: N  (count of locked artifacts in the current phase directory)
```

**Status rules:**

| Status | Condition |
|---|---|
| `active` | At least one method run in the past 48h; no declared blocker |
| `blocked` | Agent or human has declared a blocker in the current phase |
| `at-exit` | Exit criteria met; `<fish-handoff>` drafted but not yet consumed by next phase |

### 1.3 Drill-down view

Clicking a card expands to the artifact state view for the current phase:

```
[Card name] — [archetype] — [sigil: size × certainty]

Phase: SOLIDIFY

Artifacts in this phase:
  ✓ problem-statement.md         [locked]
  ✓ persona-maya.md              [reviewed]
  ● brief.md                     [draft]
  ○ ac-list.md                   [not started]
  ○ measurement-plan.md          [not started]

Open items from Explore handoff:
  → Which copy pattern for the strength meter — passive or instructional?
  → Is step 3 the right place to educate on password hygiene?

Decision log: 3 entries
Last method run: problem-framing (2026-05-02)
```

`✓` = done · `●` = in progress · `○` = not yet started

### 1.4 Board signals

The Kanban state changes in response to these events. Agents update the board automatically; humans can also trigger updates through `//`.

| Event | Board change |
|---|---|
| Method runs; artifact written | `stream-progress` increments; `last-method-run` updates |
| Artifact status → `locked` | `locked-artifacts` increments |
| `<fish-handoff>` emitted | Card `status` → `at-exit`; `confidence` updates |
| Next phase agent consumes handoff | Card moves to next column; `status` → `active`; `open-items` resets |
| Blocker declared | `status` → `blocked`; blocker description stored |
| Handback triggered | Card moves to prior column; `stream-progress` resets to v2 baseline |
| `trust-receipt.md` locked | Card flagged as Ship-complete in the R column |

---

## 2. Foreign adapter contracts

### 2.1 Jira

**Direction:** Fish → Jira (one-way push). Jira status changes do not write back to Fish.

**Card mapping:**

| Sigil | Jira object |
|---|---|
| Nemo | Story |
| Tuna | Story with sub-tasks |
| Salmon | Epic with child Stories |
| Willy | Epic with child Epics |

**Field mapping:**

| Trigger | Fish artifact / field | Jira target |
|---|---|---|
| `brief.md` locked | `brief.md` body | Epic / Story description |
| `ac-list.md` locked | Each `ac-list` row | Jira sub-task (one per AC entry) |
| Phase entry | Phase column | Jira status (see phase-to-status table below) |
| `<fish-handoff>` locked | `summary`, `open`, `locked` fields | Jira comment on the issue |
| `decision-log.md` entry | Decision text + reasoning | Jira comment |
| `trust-receipt.md` locked | Summary + AC coverage | Jira resolution comment; issue closed |
| `adr.md` created | ADR title + decision | Jira comment |

**Phase → Jira status:**

| Fish phase | Jira status |
|---|---|
| E | In Discovery |
| S | In Design |
| B | In Development |
| R (active) | In Review |
| R (trust-receipt locked) | Done |
| blocked | Blocked |

**What is never pushed:**
- Raw interview transcripts, field notes, secondary research
- Draft artifacts (status: draft)
- `persona.md` content (PII risk)
- `learning-log.md` and `retro-notes.md` (internal process)
- `nugget-board.md`

**Limitations:** Jira has no concept of sigil, confidence_to_advance, stream steps, or Fish archetype. These are stored in the Fish card only.

---

### 2.2 Linear

**Direction:** Fish → Linear (one-way push). Linear status changes do not write back to Fish.

**Card mapping:**

| Sigil | Linear object |
|---|---|
| Nemo | Issue |
| Tuna | Issue with sub-issues |
| Salmon | Issue with sub-issues (or Project for large teams) |
| Willy | Project with Issues |

**Field mapping:**

| Trigger | Fish artifact / field | Linear target |
|---|---|---|
| Card created | Card name + archetype | Linear issue title + `[archetype]` label |
| `brief.md` locked | `brief.md` body | Issue description |
| `ac-list.md` locked | Each AC row | Linear sub-issue (one per entry) |
| Phase entry | Phase | Linear status (see below) |
| `<fish-handoff>` locked | `summary` + `open` | Linear comment |
| `trust-receipt.md` locked | Summary | Linear issue closed with comment |
| `rice-scores.md` / `wsjf-scores.md` locked | Top-scored items | Linear priority field (P0–P3 mapped from score) |

**Phase → Linear status:**

| Fish phase | Linear status |
|---|---|
| E | Triage |
| S | In Progress |
| B | In Progress |
| R (active) | In Review |
| R (trust-receipt locked) | Done |

**Limitations:** Linear has no built-in concept of sigil, confidence, or phase-level stream progress. Archetype is stored as a label only.

---

### 2.3 Figma

**Direction:** primarily Fish → Figma (spec pushed in). Figma comments return as signals — they are ingested into Fish as learning-log entries, not as artifact mutations.

**File structure:** each Fish card that produces design artifacts gets one Figma file, organized by page:

| Figma page | Fish source |
|---|---|
| `Cover` | `brief.md` summary + sigil + problem statement |
| `Personas` | `persona-[name].md` for each persona on the card |
| `Schematics` | `schematic.md` content, annotated |
| `Prototype` | `fake-prototype` link or embedded frame |
| `AC Annotations` | `ac-list.md` entries overlaid on prototype frames |
| `Design System` | `design-system-extension.md` proposed components |

**Sync events:**

| Trigger | Fish artifact | Figma action |
|---|---|---|
| `brief.md` locked | Problem statement + shape | Figma file cover page description updated |
| `persona.md` reviewed | Persona content | `Personas` page frame updated |
| `schematic.md` locked | Schematic content | `Schematics` page updated |
| `ac-list.md` locked | AC rows | `AC Annotations` overlaid on prototype frames |
| `microinteractions.md` locked | Interaction specs | Prototype interaction notes updated |
| `design-system-extension.md` locked | Component proposals | `Design System` page draft section added |

**Figma → Fish signal ingestion:**

Figma comments are not canonical data. The agent polls comments on the linked file at the start of each session and routes them:

| Comment type | Fish destination |
|---|---|
| Critique or UX observation | `review-notes.md` entry (draft) |
| AC dispute ("this doesn't pass AC-003") | `review-notes.md` flagged for human |
| Approval ("looks good to ship") | `review-notes.md` positive signal |
| Out-of-scope request | Surfaced as a new card proposal in `next-loop-queue.md` |

**What is never pushed to Figma:** interview transcripts, nugget boards, decision logs, measurement plans, trust receipts.

---

### 2.4 Slack

**Direction:** Fish → Slack (push only). Slack is a notification surface, not a data store.

**Channel configuration:** one channel per project (or team); shipper posts Ship announcements to a wider `#releases` channel if configured.

**Push events:**

| Trigger | Fish source | Slack message |
|---|---|---|
| `<fish-handoff>` locked (E→S) | `summary` field | "📋 [Card] moved to Solidify: [summary]" |
| `<fish-handoff>` locked (S→B) | `summary` + locked artifacts | "🔨 [Card] moved to Build: brief locked, N ACs ready" |
| `<fish-handoff>` locked (B→R) | `summary` + confidence | "🚀 [Card] ready to Ship: [summary]" |
| `trust-receipt.md` locked | Trust receipt summary | "✅ [Card] shipped: [what landed, AC coverage]" |
| Card `status` → `blocked` | Blocker description | "🚫 [Card] is blocked: [blocker description]" |
| `next-loop-queue.md` locked | Top 3 queue items | Weekly digest (if recurring schedule configured) |
| Urgent signal in `learning-log.md` | Urgency + finding | "@channel [Card] urgent signal: [finding]" |

**What is never posted to Slack:** interview content, persona details, draft artifacts, full trust receipts (summary only), decision log entries.

---

### 2.5 GitHub (PR descriptions)

**Direction:** Fish → GitHub PR (push at Build exit). The PR description is generated from locked Fish artifacts. GitHub PR state (open/merged/closed) does not write back to Fish.

**When it runs:** triggered when `<fish-handoff>` from B→R is emitted, or on manual `//ship` command.

**PR description structure:**

```markdown
## What this does
[problem-statement.md — one sentence]

## Why
[brief.md § Problem + Journey — 2–3 sentences]

## Shape
[brief.md § Shape — must / should / won't]

## Acceptance criteria
[ac-list.md — full table, markdown-rendered]
- [x] AC-001: ...
- [x] AC-002: ...
- [ ] AC-003: deferred — [reason]

## Decisions
[decision-log.md links — titles only, link to full log]

## Measurement
[measurement-plan.md — primary metric + target + window]

## What's not here
[brief.md § Deferred]
```

**Field mapping:**

| GitHub PR field | Fish source |
|---|---|
| PR title | Card name + sigil |
| PR body | Generated from brief.md + ac-list.md (template above) |
| PR labels | Archetype label + phase label (`ship`) |
| PR milestone | Release window from `measurement-plan.md` |
| PR description footer | Link to `trust-receipt.md` in the card directory |

**What is never included in the PR:** interview content, persona details, raw analysis artifacts, `learning-log.md` content.

---

## 3. Projection rules

### 3.1 Automatic vs. manual

| Event | Automatic | Manual trigger |
|---|---|---|
| Kanban card state update | Yes — every method run | — |
| Jira / Linear status change | Yes — on phase transition | — |
| Jira / Linear field push | Yes — on artifact `locked` | `//sync jira` overrides timing |
| Figma file update | Yes — on `schematic.md` / `brief.md` locked | `//sync figma` |
| Slack phase notification | Yes — on handoff lock | Can be suppressed with `--quiet` flag |
| GitHub PR description | No — requires explicit `//ship` or manual trigger | `//ship` |

### 3.2 Conflict resolution

If a foreign system's state diverges from the Fish card:

1. **Foreign status ahead of Fish** (e.g., Jira marked Done before trust-receipt exists): agent flags the divergence in `review-notes.md`, does not update Fish to match.
2. **Foreign status behind Fish** (e.g., Jira still In Progress after trust-receipt locked): next sync event corrects it automatically.
3. **Foreign artifact content differs from Fish artifact** (e.g., someone edited the Jira description): the next `//sync` overwrites the foreign field with the locked Fish artifact. Foreign edits to pushed fields are overwritten without warning.
4. **Figma comment contradicts a locked artifact**: routed to `review-notes.md` as a signal; human decides whether to open a handback.

### 3.3 What foreign systems never own

The following are Fish-native and never written to foreign systems:
- `<fish-handoff>` blocks in full (summary is pushed; the full block stays in the card directory)
- `nugget-board.md`, `affinity-map.md`, `interview-synthesis.md` — research artifacts
- `persona.md` full content (PII risk; cover-page summary only)
- `learning-log.md`, `retro-notes.md` — internal learning
- `trust-receipt.md` full content (link only; the receipt is kept in the card)
- Any artifact in `draft` status

### 3.4 Projection identifiers

Each Fish card that projects to a foreign system stores the external reference in its frontmatter:

```yaml
# In brief.md or the card's index:
projections:
  jira: PROJ-1234
  linear: ABC-567
  figma: https://figma.com/file/...
  github-pr: 89
```

Agents use these to route pushes without re-lookup.

---

## 4. How this connects out

- **`methods.md`** (Pillar 1) — defines what agents do; every method run triggers Kanban updates.
- **`artifacts.md`** (Pillar 2) — defines what gets produced; every `locked` artifact triggers a foreign push.
- **Local agents** (`local-agents/`) — consume the projection identifiers to route pushes to the right foreign targets.
- **System agents** (`system-agents/`) — the Context Cloud stores projection state across sessions so the desktop app always knows which external IDs belong to which card.
- **`<fish-handoff>`** — the single routing event that triggers phase transitions on both the native Kanban and all configured foreign adapters simultaneously.

---

## 5. Status

- **2026-05-02** — complete. Fish Kanban spec, five foreign adapter contracts (Jira, Linear, Figma, Slack, GitHub), projection rules, conflict resolution.
- **Fish Model methodology trilogy is now complete:** `methods.md` → `artifacts.md` → `projections.md`.
- **Next:** Fish Model rename sweep — retire remaining `flow.md` / FLOW references across docs; align all fish/ files to "Fish Model" terminology.
