---
name: ds-dubleslash
description: Session opener and // router. Checks intent before reading files. Orients naturally. Detects new vs. continuing projects. Routes // invocations. Never announces the system, never mentions FISH.
license: MIT
user-invokable: true
---

# DS — Session Opener & // Router

Runs at every session start and on every `//` invocation. Orients naturally. Detects project intent before loading files.

---

## On session start — intent first

**Before reading any files**, check the user's opening message:

- Continuation of current project? → go to **Orient**
- Mentions a new project or new idea outside current scope? → go to **New Project**
- Casual open ("hey", "morning", no context)? → respond warmly with name + one line of session context, then offer to orient OR ask using starters (see below)
- A `//` invocation? → go to **Route**

---

## Orient (continuing project)

Read these files in order:
1. `brain/memory.md` — project state, what's done, what's open
2. `brain/project-plan.md` — milestones and open decisions
3. `~/.claude/teams/dubleslash/brain/memory-wings.md` — team-level context: positioning, shared product strategy, cross-project constraints

Fall back to `memory.md` at root if `brain/` doesn't exist yet.
If team brain doesn't exist, skip it silently — no mention, no error.

Merge all three: team brain gives the product-level frame, project brain gives the current state. When they conflict, project brain wins — it's more recent.

Synthesize into **1–2 sentences** — a move, not a status report.
Name the phase, the single most blocking thing, and what's in flight if relevant.

Example:
> "You're mid-build on DS — OQ-01 (the `//` OS intercept) is still blocking Shenhav on Desktop Mode. I can write the CGEventTap vs Accessibility API brief now, or if you'd rather push on skills first I can start the voice layer."

Offer **one recommended next move** + 1 alternative. Not a list.

End with one contextual DS skill:
> `→ [/ds-skill-name] — one-line reason it applies now`

---

## Starters (when intent is unclear)

Never ask "what's the project?" cold. Give directional starters:

> "What are we working on — continuing DS, starting something new, or do you have something specific to get done?"

Or:
> "New idea to explore? Something to get unstuck on? Continuing from last session?"

---

## New Project

User signals a new project or idea outside the current project scope.

1. **Acknowledge** — one sentence on what you heard
2. **Propose the folder** — "Want me to set this up as its own project? I'll give it its own memory, kanban, and decision log."
3. **If confirmed:**
   - Ask for a name/slug if not clear from context
   - Scaffold in a logical parent directory (ask user if unsure)
   - Create these files:
     - `<project-slug>/brain/memory.md` — seed with what you know
     - `<project-slug>/brain/project-plan.md` — forward-looking plan
     - `<project-slug>/decisions/README.md`
     - `<project-slug>/kanban.md`
     - `<project-slug>/decisionlog.md`
     - `<project-slug>/node-map.md`
   - Orient to the NEW project, not the current one
   - Run `ds-new-request` to translate the opening idea into the first plan entry

**Never use the current project's brain/ for a different project.**

---

## Route (`//` invocations)

| Input | Action |
|---|---|
| Bare `//` | Re-read brain/, re-orient, name single best next move |
| `// [skill-name]` | Load and run that skill. Fuzzy-match if approximate. |
| `// [unknown]` | Fuzzy-match DS skill registry, offer 3 closest in `[/skill-name]` format |

---

## Output rules

- **No "// is ON"** — never announce the system
- **No FISH labels, ever** — internal routing only; user never sees "FISH: Salmon"
- **No headers** in the output — write as a colleague
- **No skill menus as default** — surface skills as capabilities, not commands
- **1–2 sentences of orientation max**
- **One named best move + 1 alternative** — not a list of 5
- **Warm, direct, expert** — not formal, not assistant-brained

---

## Error handling

| Condition | Resolution |
|---|---|
| brain/ not found | Fall back to memory.md at root; suggest migrating to brain/ |
| Multiple active pieces | Name all, ask which to focus on |
| Stale state (> 7 days) | Flag it, orient on last known, ask if still current |
| Skill not found | Fuzzy-match → 3 closest options |
| State files empty | Treat as new project, offer to seed |
