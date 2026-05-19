# Dashboard PRD — Duble//Slash Desktop App

**Version:** 1.0
**Date:** 2026-05-04

---

## Problem

The current Panel view treats Dashboard as one of five peer tabs (`dash / chat / log / map / connections`), subordinating it to Chat and the Kanban map with no visual priority. When the panel opens, users must consciously choose a tab before seeing anything meaningful. The existing Dashboard tab renders a scrollable column of three stacked sections — Fish Board, System Agents, Activity — where contexts appear as minimal rows inside a phase-grouped list, showing only name, a progress bar, and a date. There is no concept of spatial organization by Space, no session summary visible without expanding, no next task exposed, and no visual signal of what is active vs. dormant. The sidebar reinforces the wrong mental model by showing a single "active context" as if the rest of the board does not exist. The net result: a user with six contexts across one space cannot take in the state of their work without switching tabs, squinting at tiny rows, and tabbing to the Kanban map to understand what is even in each phase.

---

## Goal

Dashboard is the home view of the Panel, visible immediately on open, requiring no tab selection. It shows every context across every space as a rich card organized by Fish phase, so the user can assess their entire workload at a glance and act on the right card with zero navigation. Success means a user with 6–10 contexts across 2–3 spaces can identify which context is active, which is most recently touched, what the next task is on each card, and which phase each card is in — all within 3 seconds of opening the panel, without scrolling to find a specific card.

---

## Layout Overview

The Panel retains its two-column structure: left sidebar and right main area, separated by a draggable resize handle (range `120px – 400px`, default `196px`, behavior unchanged from `Panel.tsx`).

**Left sidebar** — simplified. Shows: active context name + phase badge, compact agent signal (last session summary + next task button), tools status strip, screen capture status. The "switch context" link is removed; context switching now happens from Dashboard cards.

**Right main area** — Dashboard is rendered directly, not inside a tab. The tab bar (`dash / chat / log / map / connections`) is replaced by a compact `SecondaryNav` row that provides access to Chat, Log, Map, and Connections. Dashboard is never inside a tab; it is the default state. Switching to a secondary view renders it full-bleed in the main area; returning to Dashboard is via a `"← dashboard"` back-link or pressing Escape.

**Main area internal layout (Dashboard state):**
1. Phase swimlane header row — a sticky mini-bar at the top showing phase label, icon, and count for each of the four phases.
2. Scrollable card board — contexts grouped by Space, within each Space ordered by phase (Explore → Solidify → Build → Ship). Contexts in the same phase appear as a horizontal row of cards within that space group.
3. System agents strip — below all spaces, a compact single-row status display.
4. Activity section — below the agents strip; secondary/below-the-fold. Stat tiles, heatmap, summary text.

---

## Context Card Spec

**Component name:** `ContextCard`

The Dashboard variant is wider (approximately `240–320px` wide), with a horizontal card row per phase per space group.

### Fields displayed on the card (always visible)

| Field | Source | Display |
|---|---|---|
| Context name | `Context.name` | `text-sm font-semibold text-ds-text`, truncates at 2 lines |
| Phase badge | `Context.phase`, `PHASE_META` | Icon + label pill, colored per phase |
| Archetype tag | `Context.archetype`, `ARCHETYPE_META` | Short code (`N` / `T` / `S` / `W`) in the archetype's `cssVar` color. Top-left above the name. Omit if undefined. |
| Task progress | `Context.tasks` | Thin progress bar (phase-colored at 55% opacity) + `done/total` count label. Omit if `tasks.length === 0`. |
| Last session summary | `Context.sessions` (last by index) | Single line, truncated at ~72 chars, wrapped in quotes. `text-[10px] text-ds-text-dim`. If no sessions: `"no sessions yet"` in dim. |
| Next open task | `tasks.find(t => !t.done)` | `→ {task.name truncated at ~6 words}`. `text-[10px] font-mono text-ds-accent`. Omit if no open tasks. |
| Last session date + tool | `Session.date`, `Session.tool` | `MM-DD` + tool name. `text-[9px] font-mono text-ds-text-dim`. |
| Active indicator | `context.id === activeContextId` | Pulsing dot `w-1.5 h-1.5 rounded-full bg-ds-accent animate-pulse` + `"active"` label top-right. Hidden on inactive cards. |

### States

**Active** (`context.id === activeContextId`): border `border-ds-accent/40`, background `bg-ds-elevated`. Left-edge phase bar full opacity.

**Inactive** (default): border `border-ds-border-light`, background `bg-ds-surface`. Left-edge bar at 60% opacity.

**Hover**: border lightens to `border-ds-border`, background `bg-ds-elevated`. Agent signal section reveals. Non-active cards show `"Set as active →"` button.

**Empty** (no sessions, no tasks): card shows name + phase badge + archetype tag only. Body shows `"no activity yet"` dim placeholder. Quick action "Open →" still appears on hover.

### Agent signal section (on hover, or always on active card)

- `Paused after "{summary truncated at 64 chars}"`
- `→ {next task truncated at 6 words}` in `text-ds-accent`
- `"Review summary"` in `text-ds-text-secondary`
- `→ See {artifact.name}` if `artifacts.length > 0`
- `"Set as active context →"` (hidden if card is already active)

### Interactions

| Interaction | Behavior |
|---|---|
| Click card body | Opens Context Detail view (full-panel) |
| Click "Set as active →" | Calls `onSetActive(context.id)`. Stays on Dashboard; card becomes active in-place. |
| Click "→ {next task}" | Opens Context Detail view (Tasks section) |
| Click "Review summary" | Opens Context Detail view (Sessions section) |

---

## Space Grouping

**Component name:** `SpaceGroup`

### Space header

- Client name: `Space.client`, `text-[10px] font-mono text-ds-text-dim uppercase tracking-widest`
- Space name (if different): `Space.name`, `text-[9px] font-mono text-ds-text-dim opacity-60`
- Context count: `{n} context{n !== 1 ? 's' : ''}`, dim style
- Collapse toggle: chevron right-aligned. Default: all spaces expanded. State in component-level `useState`.

### Space body (expanded)

Contexts are laid out as a vertical stack of **phase rows**: one row per phase that has at least one context in that space. Each phase row has:
- Phase sub-header: icon + label + count (e.g., `◎ Explore · 3`)
- Horizontal flex row of `ContextCard` components, `min-w-[240px] max-w-[320px]`, `overflow-x-auto` on the row if cards overflow

Phases with zero contexts in this space are omitted.

### Empty space

Space header renders. Body shows `"No contexts yet · + New context"` with a button wired to `window.ds.createContext(space.id, …)`.

---

## Fish Board View

**Component name:** `FishBoard`

The Fish Board is the organizing logic of the Dashboard — not a standalone tab, but the core layout of the main area.

### Phase swimlane header

Sticky at the top (`position: sticky; top: 0; bg-ds-bg/90 backdrop-blur-sm`). A single compact row:

```
◎ Explore ·3   ◈ Solidify ·2   ◉ Build ·1   ▶ Ship ·0
```

Each pill: `PHASE_META[phase].icon`, `PHASE_META[phase].label`, global count across all spaces. Pills use existing `PHASE_META` colors. Not interactive in this scope.

### Card ordering within a phase row

1. Active context first (if in this phase + space)
2. By `lastSession.date` descending
3. Alphabetically by name for untouched contexts

### Cross-space organization

Dashboard does NOT create a global phase swimlane merging contexts across spaces. Canonical view: `Space → phase rows within that space`. Spaces are stacked vertically. This matches the data model and avoids mixing clients.

---

## System Agents Strip

**Component name:** `AgentsStrip`

A compact strip below all `SpaceGroup` components. Label: `"agents"` in `text-[9px] font-mono text-ds-text-dim uppercase tracking-widest` floats above the strip.

### Layout

Single horizontal flex row, `gap-2`, `flex-wrap`.

**Active agents (OSS milestone — Tally, Cipher):** Small pill `px-2.5 py-1.5 rounded-xl border`:
- Live dot: `w-1.5 h-1.5 rounded-full` colored `rgb(var(--ds-explore))`
- Agent name: `text-[10px] font-mono text-ds-text`
- Role label: `text-[8px] font-mono text-ds-text-dim`
- Border: `border-ds-explore/40`

**Roadmap agents (v1, v1.5, v2 — Relay, Beacon, Pack, Echo, Twin, Gate, Loom):** `opacity-30` pill:
- Dim dot: `w-1 h-1 rounded-full bg-ds-border`
- Agent name: `text-[9px] font-mono text-ds-text-dim`
- Milestone tag: `text-[7px] font-mono text-ds-text-dim opacity-70`

Grouped by milestone with `mx-1` gap between groups. Not interactive in this scope. Reuses `SYSTEM_AGENTS` constant from current `Dashboard.tsx`.

---

## Activity Section

**Component name:** `ActivitySection`

Below the agents strip. Below-the-fold by design — the user scrolls to it intentionally. No toggle.

### Stat tiles

Four tiles in `grid grid-cols-4 gap-1.5`:
- **sessions** — `allSessions.length` (filtered by range)
- **tokens** — `formatTokens(totalTokens)`
- **days** — `activeDays`
- **streak** — `${streak.current}d`

Range selector (`all / 30d / 7d`) top-right of the section label row. State local to component.

### Heatmap

Identical to current `Dashboard.tsx`: `buildHeatmap()` + `computeStreak()` helpers, 52-column × 7-row grid, `grid-auto-flow: column`, cells colored `rgb(var(--ds-accent) / opacity)`. All existing logic preserved.

### Summary text

`funText()` helper preserved as-is.

No architectural changes to this section. It is repositioned: instead of being one-third of a tab, it is the bottom of the Dashboard scroll.

---

## Sidebar Spec

**Component name:** `Sidebar` (refines existing sidebar in `Panel.tsx`)

### Active context section

**Keeps:**
- Active context name
- `PhaseBadge` component (unchanged)
- `SidebarAgentSignal` component (unchanged): last session summary truncated at 52 chars, next task button, "Review last summary" button, last artifact button

**Removes:**
- "switch context →" link (context switching now happens from Dashboard cards)

### Agents section — REMOVED

`AGENT_ROSTER` (Dora/Sol/Bran/May) is removed from the sidebar. Phase-based operator agents are shown on Dashboard cards per context. Operators are invoked from the Chat view.

### Tools section

Unchanged. Claude, Cursor, Figma — live dot + label + "live" tag.

### Screen section

Unchanged. Permission status dot + label + "grant access →" when needed.

### Sidebar dimensions

- Default: `196px`, Min: `120px`, Max: `400px` (all unchanged)
- Drag handle: unchanged

---

## Navigation Model

Dashboard is the default view of the Panel main area. It replaces the tab bar as the primary surface. Secondary views are accessible via `SecondaryNav`.

### Secondary nav bar

**Component name:** `SecondaryNav`

Positioned where the current tab bar sits (`h-9 border-b border-ds-border`).

**When Dashboard is active (default):**
- Left: `"dashboard"` in `text-[10px] font-mono text-ds-text-dim uppercase tracking-widest`
- Right: buttons for `chat`, `log`, `map`, `connections` — `text-xs font-mono text-ds-text-secondary hover:text-ds-text px-2.5 py-1 rounded hover:bg-ds-elevated`

**When secondary view is active:**
- Left: `"← dashboard"` (clickable, returns to Dashboard)
- Right: current view label

### View state

`Panel.tsx` manages:
```ts
type View = 'dashboard' | 'chat' | 'log' | 'map' | 'connections' | 'context-detail'
const [view, setView] = useState<View>('dashboard')
const [activeDetailContextId, setActiveDetailContextId] = useState<string | null>(null)
```

The existing `tab` state is renamed and extended. Context detail uses the existing `ContextDetail.tsx` component; its back button label changes from `"← Kanban"` to `"← dashboard"`.

**Escape key** returns to Dashboard from any secondary view (`useEffect` + `keydown` listener at Panel level).

---

## Empty States

### No spaces, no contexts

**Trigger:** `spaces.length === 0` or all spaces have `contexts.length === 0`

**Component name:** `EmptyDashboard`

Renders center of the main area:
- `//` glyph: `font-mono font-bold text-ds-accent text-4xl`
- Heading: `"No contexts yet"` `text-ds-text text-sm font-semibold`
- Sub-line: `"Start a session in any AI tool with //"` `text-ds-text-dim text-xs font-mono`
- Button: `"+ New context"` — triggers context creation (calls `window.ds.createContext`). Opens inline form: space name + context name + phase.

### Context has no sessions

Renders the card in its empty variant (name + phase badge + archetype tag only, dim `"no activity yet"` placeholder). Card is not hidden.

### Phase row is empty within a space

Not shown — phase rows with zero contexts in a given space are omitted entirely.

---

## Out of Scope

- **Drag-and-drop phase changes from Dashboard cards.** Phase changes are made from `ContextDetail`. Dashboard cards are read + navigate, not edit surfaces.
- **Creating new spaces from the Dashboard.** New context creation is in scope; new space creation is not.
- **Inline task editing on Dashboard cards.** Tasks are viewed (progress bar + next task label) but edited in `ContextDetail`.
- **Filtering or searching contexts from Dashboard.** The command palette (existing `CommandOverlay`) handles context switching.
- **Horizontal scroll Kanban view replacement.** The Map tab (`KanbanView`) is retained as a secondary view.
- **Session logging UI.** Tally agent capture is out of scope for this redesign.
- **Responsive/mobile layout.** Fixed-width Electron desktop panel only.
- **Animation / transition polish.** Existing `transition-all duration-150` pattern only; no additional animation work.
- **Archetype editing from Dashboard cards.** Archetype is displayed but not editable from the card.
- **Pinned or starred contexts.** No pinning mechanism introduced.
- **Real-time Tally agent signal in the sidebar.** Sidebar reads from `Context.sessions` array only; no WebSocket plumbing.
- **Activity section redesign.** Logic preserved exactly as in current `Dashboard.tsx`; only position changes.

---

## Critical Files for Implementation

- [Dashboard.tsx](app/src/renderer/src/views/Dashboard.tsx)
- [Panel.tsx](app/src/renderer/src/views/Panel.tsx)
- [KanbanView.tsx](app/src/renderer/src/components/KanbanView.tsx)
- [ContextDetail.tsx](app/src/renderer/src/components/ContextDetail.tsx)
- [types.ts](app/src/renderer/src/types.ts)
