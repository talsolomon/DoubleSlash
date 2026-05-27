---
name: ds-project
description: Session-end file sync for DS projects. Creates nodes, merges state, archives completed work. Updates brain/memory.md, kanban.md, node-map.md at the end of every productive session.
license: MIT
user-invokable: true
---

# DS Project — Session Sync

Runs at the end of every session (or on demand). Keeps all project state files current. No asking for permission — this is the write-back layer.

---

## When to run

- At session end (invoked by ds-dubleslash or directly)
- When the user says "update everything", "sync state", "wrap up"
- After any productive work where decisions were made or tasks completed

---

## Step 1 — Collect session state

From conversation context, identify:
- Decisions made (anything that resolved an open question or chose between options)
- Tasks completed (what was actually done)
- New tasks that emerged
- New open questions
- Any artifacts produced (files written, specs created, research done)
- Phase changes (did we move from one Diamond phase to another?)

---

## Step 2 — Update brain/memory.md

Write to `brain/memory.md`:
- Update "Current state" section with latest session summary (date + what happened)
- Update "What's done" list with completed work
- Update "What's open" list — remove resolved questions, add new ones
- Update architecture/positioning if it changed

Format for session entry:
```
- **Session YYYY-MM-DD:** [1-sentence summary of what happened and what it produced]
```

Keep it lean. Archive old session entries (> 3 sessions back) to `brain/sessions/YYYY-MM-DD.md`.

---

## Step 3 — Update kanban.md

- Move completed tasks from IN PROGRESS → DONE
- Move started tasks from TODO → IN PROGRESS
- Add new tasks that emerged in this session to TODO
- Each card must have `[YYYY-MM-DD]` tag

Format:
```markdown
## TODO
- Task name [YYYY-MM-DD]

## IN PROGRESS
- Task name [YYYY-MM-DD]

## DONE
- Task name [YYYY-MM-DD]
```

---

## Step 4 — Regenerate node-map.md from decisionlog + session

node-map.md is a **generated artifact** — never hand-edit it, always fully overwrite it.

**How to regenerate:**

1. Read `decisionlog.md`. Group every `## [DECISION-NNN]` entry by its `**Date**` field.

2. Build one `## Session YYYY-MM-DD` block per unique date, sorted oldest → newest. Under each, list its decisions:
```markdown
## Session YYYY-MM-DD
- decision: [DECISION-NNN] Title → [chosen option in 5–8 words]
  - artifact: decisions/<slug>/decision-plan.md
```

3. Add a final `## Session YYYY-MM-DD` block for this conversation (today). Include:
   - `- thinking:` for each open question or problem worked through
   - `- decision:` for any new decisions made this session (before they're in decisionlog)
   - `- artifact:` for each file written or significantly updated
   - `- open:` for unresolved questions that surfaced
   - If linking to prior work: `- connects-to: Session YYYY-MM-DD`

4. **Overwrite** `node-map.md` with the full regenerated content — do not append.

The viewer reads this file live. Keep the `## Session` headers and `- type: label` format exactly. Types the viewer knows: `session`, `decision`, `artifact`, `task`, `thinking`, `note`, `open`, `feedback`.

---

## Step 5 — Update decisionlog.md (if decisions were made)

For each decision made in this session:
- If it was a new decision: add as `Closed` with full ADR format
- If it was an existing Open decision that resolved: update status to `Closed`, fill in Decision + Rationale + Consequences

---

## Step 6 — Archive completed tasks

If any task folders in `decisions/<slug>/tasks/` are marked DONE:
- Move `brief.md` status to `Done`
- No deletion — archive in place

---

## Step 7 — Update team brain (cross-project insights only)

Write to `~/.claude/teams/dubleslash/brain/memory-wings.md` only if something changed that applies BEYOND this project:
- Positioning shifted or was locked
- A product-level architectural decision was made that affects all DS projects
- A shared convention changed (naming, file structure, default behaviors)
- New market signal was logged that reframes the product thesis

Do NOT write project-specific tasks, session notes, or details that only matter for this project.

Format: append a dated entry at the bottom of `memory-wings.md`:
```markdown
## Updated YYYY-MM-DD
- [one-liner: what changed and why it matters cross-project]
```

---

## Output

After syncing, confirm in one line what was updated:
> "Session synced — memory updated, 2 tasks moved to done, 1 new decision logged."

No verbose summary. The files speak for themselves.
