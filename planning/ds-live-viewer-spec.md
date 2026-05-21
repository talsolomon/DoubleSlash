# DS Live Viewer — Requirements Specification
**v1.0 · 2026-05-21 · FISH: Salmon**

---

## 1. What This Is and Why It Exists

The DS Live Viewer is the first visible proof of DS's zero-admin promise: *the team sees what AI has done without anyone managing it.* Every write DS makes to `kanban.md`, `node-map.md`, or `memory/` appears in the browser within 2 seconds — no dashboard, no sync, no admin work.

Three views. One data source. Three different questions answered:

| View | Question answered | Source |
|---|---|---|
| **Kanban** | What's being worked on right now? | `kanban.md` |
| **Node Map** | How did we get here? What was decided, and when? | `node-map.md` |
| **Memory** | What does DS know about this project? | `memory/*.md` |

**Architecture constraint:** Zero build step. Single `server.js`, no npm, no bundler. Runs from `~/.claude/ds-viewer/`.

---

## 2. Data Model

Every UI requirement hangs on this. DS must write to these exact formats.

### 2.1 kanban.md
```markdown
## COLUMN NAME
- Card text [DECISION-NNN] [YYYY-MM-DD]
- [x] Completed card [DECISION-NNN] [YYYY-MM-DD]
- [-] Blocked card [YYYY-MM-DD]
```

Parsed fields per card:

| Field | Source | Notes |
|---|---|---|
| `text` | Line content after stripping `[x]`/`[-]` and all `[tags]` | Required |
| `status` | `[x]` → done · `[-]` → blocked · bare `-` → active | Required |
| `session` | Any `[YYYY-MM-DD]` tag | Optional |
| `tags` | All other `[bracket]` contents | Optional |
| `column` | The `##` section it appears under | Required |

**DS write rule:** Every card DS adds must include a `[YYYY-MM-DD]` session tag. DECISION refs use `[DECISION-NNN]`.

### 2.2 node-map.md
```markdown
## Session YYYY-MM-DD
- type: label text
  - type: child label
    - type: grandchild label
```

Node types (exhaustive): `session` | `decision` | `artifact` | `task` | `thinking` | `note`

Parsed fields per node:

| Field | Source |
|---|---|
| `id` | Sequential integer (parse order) |
| `label` | Text after `type:` prefix, or full text if no prefix |
| `type` | Prefix before `:` — defaults to `note` if absent |
| `depth` | Indentation level (0 = session/root) |
| `session` | The `## Session` header it falls under |
| `parentId` | The node whose edge connects to this one |
| `childIds` | All nodes one depth below connected to this one |

**DS write rule:** Use exactly 2 spaces per indent level. Type prefix must be one of the six above.

### 2.3 memory/*.md
```yaml
---
name: slug_name
description: "One-line summary"
metadata:
  type: feedback | user | project | reference | note
---
Body text — full content of the memory entry.
```

`MEMORY.md` is excluded (it's the index, not an entry).

---

## 3. Global Requirements

### 3.1 Real-Time Updates

| Req | AC |
|---|---|
| Save to `kanban.md` updates Kanban | Edit file → browser re-renders within 2s, no page reload |
| Save to `node-map.md` updates Node Map | Same |
| Save to `memory/*.md` updates Memory | Same |
| SSE reconnects if server restarts | Browser reconnects within 5s and re-fetches data |
| Inactive views update when switched to | Tab data is fresh when you switch to it after an edit |

### 3.2 Right Detail Pane

Present on all three boards. Slides in from the right edge.

| Req | AC |
|---|---|
| Any item in any board is clickable | Click kanban card → pane opens · node → pane opens · memory card → pane opens |
| Pane width | 360px fixed |
| Transition | Width animates 0→360px in ≤200ms (CSS transition) |
| Close: Escape key | Press Escape → pane closes, selection cleared |
| Close: × button | Click × → pane closes, selection cleared |
| Selection ring | Selected item shows 2px accent-color outline |
| One selection at a time | New selection clears previous |
| Tab switch | Switching tabs closes the detail pane and clears selection |
| Pane doesn't push content off-screen | Main view shrinks by 360px when pane opens (flex layout) |

### 3.3 Empty States

| Condition | Message |
|---|---|
| `kanban.md` missing | "No kanban.md found — DS creates it on first task." |
| `node-map.md` missing | "No node-map.md — DS seeds this on every new project." |
| `memory/` empty | "Memory directory empty." |

### 3.4 Auto-Launch

| Req | AC |
|---|---|
| Server starts on DS session | `SessionStart` hook in `.claude/settings.json` boots `server.js` |
| Idempotency | Port 3333 already in use → open browser, exit cleanly (no crash) |
| Browser opens | `open http://localhost:3333` runs on server start |

---

## 4. Kanban Board

### 4.1 Purpose
Active task tracking. Every open, in-progress, and completed item — visible at a glance, connected to the session that created them.

### 4.2 Column Requirements

| Req | AC |
|---|---|
| Columns match `##` sections | Non-standard column names render as additional columns |
| Column header | Shows name + card count in a gray pill |
| Equal-width columns | `flex: 1` — share available space evenly |
| Empty column | Shows "—" placeholder |

### 4.3 Card Requirements

**Status colors:**

| Status | Left border | Text | Opacity |
|---|---|---|---|
| `active` | Accent purple `#6c53ee` | Normal | 100% |
| `done` | Green `#15803d` | Strikethrough | 65% |
| `blocked` | Red `#dc2626` | Normal | 100% |

**Card contents (top to bottom):**
1. Task text — full, wraps naturally, no truncation
2. Meta row — session badge + tag pills (only if present)

**Session badge:** `[YYYY-MM-DD]` → purple pill. Absent if no date in card.
**Tag pills:** All other `[bracket]` contents → gray monospace pill.

| Req | AC |
|---|---|
| Cards render in kanban.md order | Top card in file = top card in column |
| Long text wraps | No overflow, no ellipsis |
| Session badge absent when no date | No empty/undefined badge |
| Hover | `translateY(-1px)` + deeper shadow |
| Click target | Entire card surface |

### 4.4 Kanban Detail Pane

| Row | Value | Notes |
|---|---|---|
| Type badge | `task` / `done` / `blocked` | Colored by status |
| Title | Full task text | No truncation |
| Column | Column name | e.g. "TODO" |
| Status | active / done / blocked | |
| Session | `[YYYY-MM-DD]` or "—" | Purple badge if present |
| Refs | All tag pills | Row hidden if no tags |

### 4.5 Edge Cases

| Condition | Behavior |
|---|---|
| Card with no date tag | No session badge; detail pane session row shows "—" |
| Card with no tags | Refs row hidden in detail pane |
| Card text > 200 chars | Wraps in card, full text in detail pane |
| Empty column | "—" placeholder; column still renders |
| Non-standard column name | Renders as additional column |
| Duplicate card text | Both render independently (id = column+index) |

---

## 5. Node Map

### 5.1 Purpose
Decision history and artifact log by session. Answers: *"What did we figure out in session X, what came from it, and how does it connect to what came before?"*

### 5.2 Two Views

A toolbar at the top of the Node Map has two toggle buttons:
- **● Nodes** (default) — hierarchical SVG graph
- **≡ List** — indented text outline

Both views: fully clickable → detail pane.

### 5.3 Graph View — Layout Algorithm

Sessions pinned at the top row. Children distributed below proportionally.

1. Count leaf nodes in each subtree recursively
2. Allocate horizontal space to each session proportional to leaf count
3. Within each session's band, recursively allocate to children
4. Position internal nodes at horizontal midpoint of their children
5. Y position = `margin + depth × 120px`

| Parameter | Value |
|---|---|
| Top margin | 52px |
| Level height | 120px |
| SVG width | `max(viewport_width, total_leaves × 88px + margins)` |
| Horizontal margins | 52px each side |

**AC:**
- Sessions always at y=52
- No two nodes at the same depth overlap horizontally
- SVG scrolls horizontally if wider than viewport
- SVG height adjusts to content

### 5.4 Node Rendering

| Type | Stroke | Fill | Radius | Label position |
|---|---|---|---|---|
| `session` | `#2563eb` | color 13% opacity | 14 | Centered below |
| `decision` | `#d97706` | color 13% opacity | 8 | Right of node |
| `artifact` | `#15803d` | color 13% opacity | 8 | Right of node |
| `task` | `#7c3aed` | color 13% opacity | 8 | Right of node |
| `thinking` | `#9ca3af` | color 13% opacity | 8 | Right of node |
| `note` | `#c9c5bf` | color 13% opacity | 8 | Right of node |

**Label format:**
- Session: truncated at 22 chars, centered below, 12px bold
- Non-session: `[type in color, 9px bold] [label in #374151, 11px]`, right-anchored, truncated at 20 chars

**AC:**
- Truncated labels show full text in SVG `<title>` (native hover tooltip)
- Session stroke-width: 2.5px · other stroke-width: 1.8px

### 5.5 Edges

Cubic bezier S-curves: `M x1,y1 C x1,midY  x2,midY  x2,y2` where `midY = (y1+y2)/2`

| Property | Value |
|---|---|
| Stroke | `#d8d4ce` · 1.5px |
| Arrowhead | Small triangle at child end, `#ccc9c2` |

**AC:** Every edge in `edges[]` has a rendered curve. Curves are smooth. Arrowhead points toward child.

### 5.6 Interactions

| Interaction | Behavior |
|---|---|
| Hover | Circle scales to 1.12× |
| Hover | Native SVG tooltip shows full label |
| Click | Detail pane opens |
| Click target | r+14px radius hit area (≥44px diameter for all nodes) |
| Resize | Node map re-renders with updated SVG width |
| Selected | Stroke-width increases to 3px |

### 5.7 List View

```
SESSION 2026-05-21
  ◆ decision  Leader-driven session model locked
  ◌ thinking  DS viewer — how to make reflectional UI visible?
      ◆ decision  HTML + SSE — zero deps, real-time
      ◆ decision  Three views: kanban, node-map, memory
      ● artifact  ~/.claude/ds-viewer/server.js
```

**AC:**
- Session names are section headers (uppercase, muted, non-clickable)
- Items indented 20px per depth level
- Full label text — no truncation in list view
- All items clickable → detail pane
- Selected item has light purple background tint

### 5.8 Node Map Detail Pane

| Row | Content | Notes |
|---|---|---|
| Type badge | Colored by type | |
| Title | Full label — no truncation | Required |
| Session | Which session it belongs to | |
| Parent | Direct parent node's label | "—" if session/root |
| Children | Direct child labels as pills | Row hidden if no children |

**AC:**
- Max 5 child pills; if more → "+N more"
- Parent row hidden entirely for session nodes
- Full label in title, never truncated

### 5.9 Node Map Edge Cases

| Condition | Behavior |
|---|---|
| `node-map.md` missing | Empty state |
| Label > 22 chars | Truncated in graph, full in detail pane + tooltip |
| Orphaned node (no parent, not `##`) | Renders as additional root |
| Depth > 5 | SVG height expands, vertical scroll |
| Single session, 15+ children | All spread proportionally across full width |
| Unknown node type | Falls back to `note` (gray) |

---

## 6. Memory Feed

### 6.1 Purpose
Everything DS knows about this project — behavioral rules, user context, decisions, references. Surfaced as a browsable knowledge base. The full body is in the detail pane.

### 6.2 Layout

Responsive grid: `auto-fill, minmax(255px, 1fr)`

Type section order: `feedback → user → project → reference → note`

### 6.3 Memory Card

| Element | Content | AC |
|---|---|---|
| Type badge | Colored per type table | Top of card |
| Name | Cleaned: underscores → spaces, type prefix stripped | Required |
| Description | First 100 chars | Hidden if empty |

**Type badge colors:**

| Type | Background | Text |
|---|---|---|
| feedback | `rgba(234,88,12,.1)` | `#c2410c` |
| user | `rgba(6,182,212,.1)` | `#0e7490` |
| project | `rgba(124,58,237,.1)` | `#6d28d9` |
| reference | `rgba(16,185,129,.1)` | `#047857` |
| note | `rgba(107,114,128,.1)` | `#4b5563` |

**Name cleaning:** `feedback_greeting_behavior` → `greeting behavior`

### 6.4 Memory Detail Pane

| Row | Content | Notes |
|---|---|---|
| Type badge | Colored | |
| Title | Full cleaned name | No truncation |
| Description | Full, not 100-char truncated | Hidden if empty |
| Divider | Only if body present | |
| Body | Full body, `white-space: pre-wrap` | Scrollable |

**AC:**
- Body text preserves whitespace and line breaks
- Markdown not rendered in v1 — plain text
- Long body scrollable within pane

### 6.5 Memory Edge Cases

| Condition | Behavior |
|---|---|
| No description | Description row hidden |
| No body | Divider and body section hidden |
| Very long body | Pane scrolls, no truncation |
| `MEMORY.md` present | Excluded from cards |
| Unknown type | Renders under `note` section |

---

## 7. Cross-Cutting Acceptance Criteria

### 7.1 Header

| Req | AC |
|---|---|
| Project name | `basename` of project directory |
| Pulse dot | Green, pulsing, always visible |
| Timestamp | "updated HH:MM:SS" — refreshes on every SSE event |

### 7.2 Performance

| Scenario | Target |
|---|---|
| Initial load | < 500ms on localhost |
| Re-render after SSE event | < 200ms |
| Node map layout ≤50 nodes | < 100ms |
| Node map layout ≤150 nodes | < 500ms |

---

## 8. Scope Boundary

### In v1
- Three views: Kanban, Node Map, Memory
- Real-time SSE updates
- Right detail pane
- Auto-launch on SessionStart
- Graph + list toggle in Node Map
- Session date provenance on kanban cards
- Single project, port 3333

### Explicitly out of scope
- Search / filter
- Editing files from the viewer
- Multi-project support
- Authentication / remote access
- Markdown rendering in memory body
- Node map zoom / pan
- Session diff view
- Mobile layout
- Export (PDF, PNG)

---

## 9. Definition of Done

**Kanban:**
- [ ] 3+ columns render with correct cards
- [ ] Status colors correct (border + text treatment)
- [ ] Session badge visible only when date is present
- [ ] Tag pills render for non-date tags
- [ ] Click any card → right pane with all rows populated
- [ ] Done cards have strikethrough
- [ ] Empty column shows "—"

**Node Map:**
- [ ] Graph: circles at correct hierarchical positions
- [ ] Graph: sessions at top row, children below
- [ ] Graph: bezier S-curves between parent-child
- [ ] Graph: type colors match spec table
- [ ] Graph: hover scales node + shows tooltip
- [ ] Graph: click any node → right pane with all rows
- [ ] Graph: horizontal scroll when wider than viewport
- [ ] List: indented outline, full labels, all items clickable
- [ ] Toggle between graph/list views works

**Memory:**
- [ ] Cards grouped by type in correct order
- [ ] Type badge color-coded correctly
- [ ] Name cleaned
- [ ] Click any card → right pane with full body

**Cross-cutting:**
- [ ] SSE updates within 2s of file change
- [ ] Right pane slides in with ≤200ms transition
- [ ] Escape closes pane
- [ ] Selection ring on selected item
- [ ] Server starts on SessionStart hook
- [ ] Port already in use → browser opens, clean exit
