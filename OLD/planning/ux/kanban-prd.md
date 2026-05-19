# Kanban PRD — Fish-Model-Bound Project Board

**Version:** 1.0  
**Date:** 2026-05-04  
**Status:** shipped  
**Owner:** Tal

---

## Problem

The current Dashboard is not a Kanban. It is a scrollable list of context cards grouped by Space and sub-grouped by phase. It renders no methodology signal whatsoever: no fish type, no stream progress, no prescribed methods, no handoff state, no blocked/at-exit indicators. A user cannot tell, from the board, what the project's *recipe* is (what archetype, what methods are prescribed, which ones have been run, which are pending), what the handoff state is between phases, or what is blocking forward motion. The card shows a session summary and a next-task shortcut — that's it. The rest of the Fish Model exists only in the methodology files, never surfaced to the user as live signal.

The result: the board tells you *what exists* but not *how the work is going, what comes next methodologically, or what the project is configured to do*. That gap is fatal for a product whose moat is the Fish Model.

---

## Goal

Replace the current Dashboard context-list with a real Kanban board that is **structurally bound to the Fish Model**. Every column is a Fish phase. Every card is a context (one unit of work) with full methodology signal: archetype, sigil, stream progress, prescribed methods, handoff confidence, blocked status, open items, artifacts produced. The board also surfaces the **recipe** for the selected project — which fish type it is running, what the canonical method set looks like for that archetype × phase matrix, and how far through the recipe each context is.

A user with six active contexts across two projects should be able to open the Kanban and answer the following in under 5 seconds, with no navigation:

- What phase is each context in?
- What archetype (recipe) is each context running?
- Which contexts are blocked or waiting to advance?
- For the active context: what methods have been run, which are next, how confident is the last handoff?
- What artifacts have been produced and locked?

---

## Scope (this PRD)

- Full Kanban view component (`KanbanView.tsx`) replacing the current Dashboard context display
- Project switcher (top-of-board nav, one project at a time)
- Recipe sidebar panel (collapses / expands, shows method prescription for the selected project's archetype)
- Card anatomy and all card states
- Drill-down drawer (click card → full methodology detail)
- Board-level signals (stuck, blocked, at-exit)
- Phase column anatomy (fish-shaped, header, count, WIP behavior)
- Data model additions to `Context` and `Space`

**Out of scope (this PRD):** foreign adapter push (Jira/Linear/Figma/Slack/GitHub) — that is projections.md territory and a separate build. Foreign adapters are referenced for context only.

---

## Core Concepts

### Project = Space

In code, the existing `Space` type is the project. The Kanban renders one project's board at a time. The project switcher at the top of the board cycles between projects. "Project" and "Space" are interchangeable; in UI copy we use **Project**.

### Context = Card

A `Context` is one unit of work — one fish. On the Kanban, each context appears as a **card** in the column corresponding to its current phase. The card carries all the methodology signal for that piece of work.

### Archetype = Recipe

The **archetype** of a context (Nemo / Tuna / Salmon / Willy) determines its **recipe**: the prescribed set of methods per phase, derived from the archetype × phase matrix in `fish-model.md §6`. The board surfaces this recipe as a checklist. The recipe tells the user not just what phase they are in but *what they are supposed to be doing in this phase for this kind of work*.

### Stream Progress

For a given archetype and phase, the Fish Model prescribes a specific ordered set of methods (the "stream"). Stream progress is the ratio of methods completed to methods prescribed for the current archetype × phase cell. It is distinct from task progress (`tasks.done / tasks.length`) — it is methodology progress.

---

## Layout

### Top-level panel

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Project: Firma Rebrand ▾]        [◎5  ◈3  ◉2  ▶1]    [Recipe ▸]      │
├────────────────┬──────────────────┬──────────────────┬──────────────────┤
│   EXPLORE      │   SOLIDIFY       │   BUILD          │   SHIP           │
│   ◎ · 5 cards  │   ◈ · 3 cards    │   ◉ · 2 cards    │   ▶ · 1 card     │
├────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ [card]         │ [card]           │ [card]           │ [card]           │
│ [card]         │ [card]           │ [card]           │                  │
│ [card]         │ [card]           │                  │                  │
│ [card]         │                  │                  │                  │
│ [card]         │                  │                  │                  │
├────────────────┴──────────────────┴──────────────────┴──────────────────┤
│  [Recipe panel — collapsed by default, expands as right drawer]         │
└─────────────────────────────────────────────────────────────────────────┘
```

The four columns correspond to the four Fish phases. Conceptually, Explore is the widest (divergent, many open threads), Ship is the narrowest (convergent, near-done). In practice the columns are equal width — the fish shape is suggested through the card count and column header rather than literal pixel width variation (which would be disorienting in a narrow panel).

### Column ordering

Left → right: **Explore → Solidify → Build → Ship**. This is the canonical Fish anatomy (head → left body → right body → tail). Forward motion flows left-to-right. Reverse (handback) flows right-to-left.

### Scrolling

Each column scrolls independently (vertical overflow within the column). The header row and phase column headers are sticky. The overall board does not have horizontal scroll — the four columns are always visible.

---

## Project Switcher

A compact dropdown at the top-left of the board.

**Fields shown in dropdown:**
- Project name (`Space.name`)
- Client (`Space.client`)
- Context count and archetype breakdown (e.g., `6 contexts · 2N 1T 2S 1W`)
- Active context indicator (pulsing dot if the active context belongs to this project)

**Behavior:** selecting a project re-renders the board with only that project's contexts. The project switcher remembers the last-selected project across sessions. If there is only one project, the switcher is hidden and the project name is shown as a non-interactive label.

**"All projects" view:** a toggle in the switcher collapses the four-column board and instead renders a compact multi-project summary — one row per project showing phase counts and any blocked cards. This is a secondary mode; the single-project board is the default.

---

## Phase Column Header

Each column has a header that is **sticky** (does not scroll with cards).

```
┌─────────────────────────────┐
│ ◎  EXPLORE           5 ≡   │
│ ─────────────────────────── │
│ [cards scroll below]        │
└─────────────────────────────┘
```

**Header elements:**

| Element | Description |
|---|---|
| Phase icon | `PHASE_META[phase].icon` in phase color |
| Phase label | `PHASE_META[phase].label` in caps, `font-mono text-[10px] tracking-widest` |
| Card count | Count of contexts in this phase for the current project |
| WIP icon (`≡`) | Opens a WIP limit popover (future; renders as static in v1) |
| Blocked indicator | If any card in this column is `blocked`, the header shows a red `✕N` badge where N is the count of blocked cards |
| At-exit indicator | If any card is `at-exit`, the header shows a yellow `→N` badge |

**Column color accent:** a 2px top border on each column header in the phase color (full opacity).

---

## Card Anatomy

Each card is a vertical unit inside its phase column.

### Card dimensions

- Width: fills the column (with `mx-2` padding on each side)
- Min-height: 80px; grows with content
- No horizontal scroll within a card

### Card states

| State | Visual |
|---|---|
| `active` | Border `border-ds-accent/50`, background `bg-ds-elevated`. Left-edge phase bar full opacity. Pulsing accent dot top-right. |
| `blocked` | Border `border-red-500/40`, background `bg-ds-surface`. Red `✕` icon top-right. Left-edge bar red. |
| `at-exit` | Border `border-yellow-500/30`, background `bg-ds-surface`. Yellow `→` icon top-right. Left-edge bar at full phase-color opacity. |
| `inactive` (default) | Border `border-ds-border-light`, background `bg-ds-surface`. Left-edge bar at 50% phase-color opacity. |

### Card content (always visible)

**Header row (top of card):**
- Left: Archetype pill — `{archetype.short}` (N/T/S/W) in archetype color, e.g. `S` in salmon-orange. If archetype is unset, show `?` in dim.
- Right: Status icon — pulsing dot (active), `✕` (blocked), `→` (at-exit), or nothing (inactive)

**Name:**
- `Context.name`, `text-sm font-semibold text-ds-text`, truncates at 2 lines

**Sigil chip:** (only if `context.sigil` is set)
- Small mono badge: `known·S` or `unknown·B` in dim text. Tooltip: "certainty · size"
- Nemo renders as `K·S`, Tuna as `K·B`, Salmon as `U·S`, Willy as `U·B`

**Stream progress bar:**
- Label: `stream` in `text-[9px] font-mono text-ds-text-dim`
- Bar: thin progress bar (phase-colored) showing `streamProgress.completed / streamProgress.total`
- Count: `N/M` to the right of the bar in `text-[9px] font-mono text-ds-text-dim`
- If `streamProgress` is unset (no archetype), renders as indeterminate dotted line

**Next prescribed method:**
- The next unrun method in the stream for this archetype × phase (from the recipe)
- Prefixed with `→` in accent color, `text-[10px] font-mono`
- If all stream methods are done: shows `→ ready to advance` in green-ish
- If blocked: shows `✕ {blocker_description truncated}` in red

**Handoff confidence chip:** (only if `confidence` field exists)
- `conf: 0.7` in `text-[9px] font-mono`. Color: green ≥ 0.8, yellow 0.5–0.8, red < 0.5
- Only shown after a handoff has been emitted (when `lastHandoffDate` exists)

**Footer row:**
- Left: `{lastHandoffDate slice(5)}` or last session date
- Right: `{lockedArtifacts}↓ {openItems}?` — count of locked artifacts and open items
- If `openItems > 0`, that count renders in yellow

### Card content (on hover — expanded inline)

On hover, the card grows by approximately 48px and reveals:

- **Last session summary** — one line, quoted, `text-[10px] text-ds-text-dim`
- **Quick actions:**
  - `→ Run next method` (if next prescribed method exists) — opens Drill-down to that method
  - `Review handoff` (if `at-exit`) — opens Drill-down to handoff block
  - `Resolve blocker` (if `blocked`) — opens Drill-down to blocker
  - `Set as active` (if not active)

### Card click → Drill-down drawer

Clicking anywhere on the card (not a quick-action button) opens the **Drill-down Drawer**.

---

## Drill-Down Drawer

A right-side drawer that slides in from the right edge of the Kanban panel (or, if the panel is docked, overlays the main area). It shows the full methodology state of one context.

**Header:**
- Context name (full)
- Archetype badge + sigil chip
- Phase label
- Close button `✕`

**Sections (scrollable):**

### 1. Stream progress (the recipe)

Title: **Recipe · {Archetype} {Phase}**

A checklist of every method prescribed for this archetype × phase cell. For each method:
- `✓ {method name}` — run (green check)
- `● {method name}` — in progress (phase-colored dot)
- `○ {method name}` — not yet run (dim circle)
- `— {method name}` — explicitly deferred (strikethrough + reason in `text-[9px]`)

The checklist is drawn from the canonical matrix in `fish-model.md §6`. It is not editable in the Kanban — it is read state from the card's recorded method runs. "Running" a method requires a session with the agent.

Below the checklist: **Budget estimate** — the stream's time budget for this archetype × phase (e.g., Nemo Explore: 10–30 min, Willy Solidify: 1–3 weeks). Rendered as a dim monospace label.

### 2. Handoff block

Title: **Last handoff**

If a `<fish-handoff>` exists for the current phase exit or phase entry, render it structured:

- **Locked decisions** — bulleted, each locked item in a light bordered chip
- **Open items** — bulleted in yellow, each open item with a checkbox (tapping it marks it resolved — write back via `updateContext`)
- **Confidence** — `conf: {float}` with color coding
- **Artifacts listed** — file/link names with status badges
- **Notes** — free text in dim
- **Emitted by / to** — `from: explorer → to: solidifier`

If no handoff exists yet: `"No handoff yet. This phase has not exited."` in dim.

### 3. Artifacts

Title: **Artifacts · {lockedCount} locked**

A two-column grid of artifact chips:
- Status badge: `✓ locked` / `● draft` / `○ not started`
- Artifact name
- Phase tag (Explore / Solidify / Build / Ship)

Click an artifact chip → opens a link or note preview (for linked artifacts). Non-interactive for `not started` status.

Artifacts are grouped by phase bucket (research / framing / strategy / brief / design / validation / measurement / learning / handoff).

### 4. Decisions

Title: **Decision log**

A scrollable list of `Decision` entries:
- Date — `MM-DD` in dim
- Decision text — full text
- Author (if available)

If empty: `"No decisions logged."` in dim.

### 5. Session history

Title: **Sessions · {count}**

Compact list: `{date} · {tool} · {model}` per session, most recent first.
Below each: session summary truncated at one line.

### 6. Sub-tasks

Title: **Tasks · {done}/{total}**

Full task list with checkboxes (tapping toggles `task.done` via `updateContext`). Tasks that are done render with strikethrough in dim.

Below the task list: **Agents that have worked on this context** — a chip row showing which agent names appear across session metadata (if available).

### 7. Forward action

A sticky bottom bar in the Drill-down Drawer:

| State | CTA |
|---|---|
| Has next stream method | `→ Continue in {tool}` (opens agent in linked tool) |
| `at-exit`, next phase is not blocked | `→ Advance to {next phase}` (updates `context.phase`) |
| `blocked` | `Resolve blocker` (opens inline text input to clear the blocker description) |
| All stream methods done, no handoff | `→ Emit handoff` (no-op in v1; placeholder for agent action) |

---

## Recipe Panel (Sidebar)

A collapsible right-side panel anchored to the board. Collapsed by default; toggled via the `[Recipe ▸]` button in the board header.

When expanded, it shows the **project-level recipe** — not a single context's recipe, but the archetype × phase matrix for all archetypes in the current project.

### Recipe panel anatomy

**Header:**
- `Recipe` in caps, font-mono
- Close button `✕`

**Archetype summary row:**
A row of four archetype badges showing how many contexts in the current project use each archetype:
- `N · 2` `T · 1` `S · 3` `W · 0`
- Tapping an archetype badge filters the board to show only contexts of that archetype

**Matrix table:**
A 4×4 grid (Phase × Archetype). Each cell shows the prescribed methods for that combination, truncated to 3 method names + `+N more` if the list is longer. Methods that have been run (across any context in this project with that archetype in that phase) are shown in a slightly brighter color; unrun methods are dim.

Tapping a cell expands it inline to show the full method list.

**Method detail chip (expanded cell):**
- Method name
- Phase tag (E / S / B / R)
- Source/lineage in tiny dim text (e.g., Nielsen, Cooper, Tomer Sharon)
- Archetype applicability (which archetypes use this method)

**WIP note:**
Below the matrix: a one-line note: `"This is the canonical Fish Model recipe. Your team may add methods in flow.yaml."`

---

## Board-Level Signals

Board-level signals appear in the column headers and in a top-of-board signal strip if more than one signal is active.

### Signal strip

A thin bar below the project switcher row. Only rendered when at least one signal is active. Shows chips:

- `✕ 2 blocked` — red chip; clicking filters to blocked cards only
- `→ 3 at exit` — yellow chip; clicking filters to at-exit cards only
- `⏸ 1 stuck` — grey chip; clicking filters to stuck cards (no method run in 48h)

Clicking a chip applies a filter overlay on the board (non-selected cards dim to 30% opacity). Clicking again clears the filter.

### Stuck detection

A context is **stuck** if:
- `status === 'active'`
- No session in the past 48 hours (computed from `sessions[last].date` vs current date)
- The context is not in Ship phase with a locked trust receipt

Stuck is a soft signal — not a status in the data model, purely a display computation. No data model changes required.

### At-exit

A context is `at-exit` if:
- Stream progress is 100% (`streamProgress.completed === streamProgress.total`)
- Or `confidence_to_advance >= 0.8`
- And a `<fish-handoff>` has been emitted (handoff artifact exists and is locked)

In v1, the `at-exit` state is set manually via `updateContext` or derived from the handoff artifact status. The agent sets this state when it emits a handoff.

### Blocked

A context is `blocked` if `context.status === 'blocked'` and `context.blockerDescription` is non-empty. This is set by the agent or manually by the user via the Drill-down drawer.

---

## Data Model Changes

The following additions are required to `Context` in `types.ts`. All fields are optional for backward compatibility with existing context data.

```typescript
export interface StreamProgress {
  total: number          // total prescribed methods for archetype × phase
  completed: number      // methods confirmed run
  methods: StreamMethod[]
}

export interface StreamMethod {
  id: string             // canonical method name slug (e.g., 'user-interviews')
  name: string           // display name
  status: 'done' | 'in-progress' | 'pending' | 'deferred'
  deferredReason?: string
}

export interface FishHandoff {
  from: string           // agent name
  to: string             // agent name
  phaseExited: Phase
  locked: string[]       // locked decisions
  open: string[]         // open items
  artifactPaths: string[]
  confidence: number     // 0.0–1.0
  notes: string
  emittedAt: string      // ISO date
}

// Add to Context:
export interface Context {
  // ... existing fields ...
  status?: 'active' | 'blocked' | 'at-exit'
  blockerDescription?: string
  streamProgress?: StreamProgress
  lastHandoff?: FishHandoff
  lockedArtifacts?: number
  openItems?: number
}
```

The `Space` type gains no new fields — the project model is satisfied by the existing `Space` structure.

The `ARCHETYPE_META` table gains a corrected agent mapping:

```typescript
export const ARCHETYPE_META = {
  nemo:   { ..., agent: 'Bran' },   // was 'Bram'
  tuna:   { ..., agent: 'Sol'  },
  salmon: { ..., agent: 'Dora' },   // was 'Nova'
  willy:  { ..., agent: 'Dora' },   // was 'Nova'
}
```

---

## The Prescription Engine (v1 approximation)

The **recipe** — the list of prescribed methods per archetype × phase — is a static lookup derived from `fish-model.md §6` and §7. In v1, this lookup is hardcoded in a file `src/data/fish-recipe.ts` as a nested constant:

```typescript
export const FISH_RECIPE: Record<Archetype, Record<Phase, StreamMethod[]>> = {
  nemo: {
    explore:  [ competitorScan, microBrief, heuristicEval ],
    solidify: [ hmw, problemFraming, oneSketch, ac3to5 ],
    build:    [ smallestChange, goldenPathTest, acAsTests ],
    ship:     [ betaGroups, heatmaps, oneLineChangelog, trustReceipt ],
  },
  tuna: {
    explore:  [ ...nemoExplore, journeyMeetings, osd, conventionInventory ],
    ...
  },
  salmon: { ... },
  willy: { ... },
}
```

This constant drives:
1. The stream progress bar on each card (total = `recipe[archetype][phase].length`, completed = count of methods with `status === 'done'`)
2. The recipe panel matrix display
3. The drill-down stream checklist

When `context.streamProgress` is not yet set on a context, the board computes a synthetic `streamProgress` from the recipe constant (all methods pending, progress = 0). When the agent runs methods and updates the context, `streamProgress` reflects actual state.

---

## Navigation and Routing

The Kanban view replaces the current `map` tab in the secondary nav. The tab label is renamed from `map` to `kanban` (or `board`). The Dashboard (cards-by-space view) remains the default home view in the sidebar. The Kanban is a secondary view accessible via:

- The `board` tab in the secondary nav
- A `"View on board →"` link from any context card in the Dashboard
- The keyboard shortcut `K` (when the Panel is focused)

---

## Empty States

### No contexts in a project

If all four phase columns are empty for the selected project:

```
┌──────────────────────────────────────────┐
│            //                            │
│   No contexts in this project.           │
│   Start a session with // in any tool.   │
└──────────────────────────────────────────┘
```

Centered in the board area. The phase column headers still render (showing `·0` counts) to orient the user to the shape.

### No archetype set on a card

Cards without an archetype show `?` in the archetype pill and render the stream progress as `○ archetype needed to show recipe`. The drill-down prompt: `"Set an archetype to unlock the recipe and stream progress for this context."`

### No handoff yet

In the Drill-down handoff section: `"No handoff yet."` with a dim sub-note: `"The handoff is emitted when your agent completes this phase and advances the card."`

---

## Interaction Summary

| Interaction | Result |
|---|---|
| Click project switcher | Dropdown of all projects; select to re-render board |
| Click "All projects" toggle | Multi-project summary row view |
| Click column header phase icon | Selects/deselects phase filter |
| Click signal strip chip (blocked, at-exit, stuck) | Applies filter; non-matching cards dim |
| Hover a card | Card expands to show session summary + quick actions |
| Click a card | Opens Drill-down drawer (right side) |
| Click archetype pill on card | Filters board to same archetype |
| Toggle Recipe panel | Expands/collapses recipe sidebar |
| Click archetype badge in Recipe panel | Filters board to that archetype |
| Click a matrix cell in Recipe panel | Expands to full method list for that cell |
| Checkbox in Drill-down task list | Toggles `task.done`, writes via `updateContext` |
| Checkbox in Drill-down open items | Marks open item resolved, writes via `updateContext` |
| "Advance to {phase}" CTA | Updates `context.phase`, moves card column |
| "Resolve blocker" in Drill-down | Clears `context.blockerDescription` and `context.status` |

---

## Visual Language

### Colors (existing CSS vars)

The board uses the existing phase CSS variables: `--ds-explore`, `--ds-solidify`, `--ds-build`, `--ds-ship`. Archetype colors are phase-derived:

| Archetype | Color |
|---|---|
| Nemo | `--ds-ship` (teal / done) |
| Tuna | `--ds-solidify` (purple) |
| Salmon | `--ds-explore` (orange / warm) |
| Willy | `--ds-build` (blue) |

### Typography

All mono labels: `font-mono`. All display names: `font-sans font-semibold`. Sizes follow the existing `ds-text-dim / ds-text-secondary / ds-text` scale. No new type scales introduced.

### Motion

Card hover expansion: `transition-all duration-150`. Drawer slide-in: `transition-transform duration-200`. Signal strip chip click: board cards dim via `transition-opacity duration-150`. No other motion.

---

## Component Map

| Component | Description |
|---|---|
| `KanbanView` | Top-level board: project switcher, signal strip, 4-column grid |
| `PhaseColumn` | One column per phase: sticky header, scrollable card list |
| `PhaseColumnHeader` | Sticky header with phase icon, label, count, signal badges |
| `KanbanCard` | A context rendered as a Kanban card (default + hover states) |
| `CardHeader` | Archetype pill + status icon row |
| `StreamProgressBar` | Thin bar + N/M counter |
| `NextMethodChip` | `→ {method}` chip in accent |
| `ConfidenceChip` | `conf: 0.X` with color |
| `DrillDownDrawer` | Right-side drawer with 7 sections |
| `RecipeSection` | Stream checklist in DrillDown |
| `HandoffSection` | Handoff block with locked/open/confidence |
| `ArtifactSection` | Two-column artifact grid |
| `RecipePanel` | Collapsible right sidebar: archetype summary + matrix |
| `RecipeMatrix` | 4×4 phase × archetype grid of method chips |
| `SignalStrip` | Blocked/at-exit/stuck chip row |
| `ProjectSwitcher` | Dropdown for project selection |

---

## What This Unlocks

Once the Kanban is live, the board becomes the first surface in the app that answers the question designers and PMs actually ask: *"what is this project set to do, how far has it gone, and what should happen next?"* That is the product. The current card list is a file browser. The Kanban is a methodology surface.

The Recipe panel specifically makes the Fish Model tangible to a first-time user: they can open a Salmon context, read the prescribed 6 Solidify methods, see that 3 are done and 3 are pending, and know immediately what the agent is supposed to do next — without reading the docs. That is the core UX value of the Fish Model as a desktop product.
