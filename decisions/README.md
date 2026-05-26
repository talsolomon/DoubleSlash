# Decisions
_One folder per decision made during active work. Each folder is a complete record._

## Folder structure
```
decisions/
  <decision-slug>/
    decision-plan.md     ← the ADR: options, choice, rationale, consequences
    resources/           ← artifacts, Figma links, research, anything relevant
    memory/
      closets.md         ← things to remember (stable facts, constraints)
      drawers.md         ← things to check later (deferred, revisit when...)
    tasks/               ← work that flows from this decision
      <task-slug>/
        brief.md         ← machine-readable task brief (hook target)
        resources.md     ← context the task needs
```

## How to use
- Use `ds-decision` to scaffold a new decision folder
- Use `ds-task` to scaffold a task under a decision
- Closed historical decisions live in `../decisionlog.md` — don't move them here

## Active decisions
_(empty — add as decisions are opened)_
