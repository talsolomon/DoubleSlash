---
name: ds-task
description: Creates and manages task briefs under a decision. Writes machine-readable brief.md for hook execution. Updates kanban.md. Marks tasks done at session end.
license: MIT
user-invokable: true
---

# DS Task

Creates task briefs that both humans and hooks can act on. Every task lives under a parent decision. The brief is the source of truth — hooks read it, humans read it, kanban reflects it.

---

## When to use

- Work flows from a decision and needs to be tracked
- A concrete action needs a brief (assigned to human, AI, or both)
- A task changes status (started, done, blocked)

---

## Step 1 — Identify parent

Every task belongs to a decision. If no decision folder exists yet for this work, run `ds-decision` first to open one.

Parent: `decisions/<decision-slug>/`

---

## Step 2 — Scaffold the task

Generate a slug: `<short-descriptor>` kebab-case.

Create `decisions/<decision-slug>/tasks/<task-slug>/brief.md`:

```markdown
# Task: <title>
**Status:** TODO | IN PROGRESS | DONE | BLOCKED
**Date created:** YYYY-MM-DD
**Parent decision:** <decision-slug>
**Assigned to:** Human | AI | Both

## What to do
[Concrete, actionable — 1-3 sentences. Specific enough that an agent can execute it without asking questions.]

## Done when
[Definition of done — what state means this task is complete?]

## Resources
- [Link to relevant file, spec, or artifact]
- [Link to parent decision-plan.md]

## Context
[Any background the executor needs. Keep it lean.]

## Notes
[Open, for updates during execution]
```

---

## Step 3 — Update kanban.md

Add a TODO card:
```
- <Task title> [YYYY-MM-DD]
```

If task is starting now: move to IN PROGRESS immediately.

---

## Step 4 — Brief format rules (for hook execution)

The brief must be machine-readable — hooks parse it to know what to do:

- **Status** must be one of: `TODO | IN PROGRESS | DONE | BLOCKED`
- **Assigned to** must be one of: `Human | AI | Both`
- **What to do** must be actionable without context (hooks can't ask questions)
- **Done when** must be verifiable (hooks check this to mark complete)

When `Assigned to: AI` or `Assigned to: Both` — the brief is executable. An agent reading it should be able to start immediately.

---

## Step 5 — Status updates

When a task status changes:
1. Update `brief.md` **Status** field
2. Update `kanban.md` — move the card to the right column
3. If DONE: update parent `decision-plan.md` if relevant; note in `node-map.md`

---

## Output rules

- Scaffold the brief with real content from the conversation — not just headers
- State the result in one line: "Task created — [title] under [decision], added to kanban."
- If AI-executable: say so and offer to start now
- Voice: direct, expert, gets things done
