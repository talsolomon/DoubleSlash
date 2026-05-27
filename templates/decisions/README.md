# Decisions

One folder per decision. Write the ADR before acting on it.

**When to open a decision:**
- You're choosing between two or more real options
- The choice rules something out you might want to revisit
- A disagreement needs to be resolved with a written record

**When NOT to open one:** implementation details, easily reversible choices, one obvious path.

---

## Folder structure

```
decisions/
  <slug>/
    decision-plan.md   ← the ADR: options, decision, rationale, consequences
    resources/         ← any supporting artifacts (research, mockups, data)
    memory/
      closets.md       ← stable facts and constraints known to be true
      drawers.md       ← deferred questions to revisit after this closes
    tasks/             ← work items that flow from this decision
```

Use `/ds-decision` to open, work, and close decisions.
