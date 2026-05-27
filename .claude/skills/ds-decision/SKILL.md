---
name: ds-decision
description: Manages the lifecycle of a decision. Scaffolds decisions/<slug>/, writes the ADR, manages resources and memory drawers, closes decisions into decisionlog.md.
license: MIT
user-invokable: true
---

# DS Decision

Handles everything around a decision — from opening it to closing it. A decision is anything where two or more real options were considered and one was chosen, with consequences.

---

## When to use

- User is about to choose between real options
- Something needs to be written down before acting on it
- A previous open question has been answered
- A disagreement is being resolved

---

## Step 1 — Open a decision

Generate a slug: `<short-descriptor>` in kebab-case (e.g., `os-intercept-strategy`, `pricing-model`)

Scaffold:
```
decisions/<slug>/
  decision-plan.md
  resources/          ← empty
  memory/
    closets.md        ← stable constraints and facts
    drawers.md        ← things to revisit later
```

Write `decision-plan.md`:
```markdown
# Decision: <title>
**Status:** Open
**Date opened:** YYYY-MM-DD
**Phase:** Discover | Define | Develop | Deliver

## Options considered
- **Option A:** [description]
- **Option B:** [description]
- **Option C:** [description] (if applicable)

## Decision
TBD

## Rationale
TBD

## Consequences
TBD — what this rules out, what it enables
```

Write `memory/closets.md` with known constraints relevant to this decision.
Write `memory/drawers.md` with related open questions to revisit after this decision closes.

Add to `decisionlog.md` as `Open`.

---

## Step 2 — Work the decision

As research or conversation clarifies the decision:
- Update `decision-plan.md` options with new information
- Add relevant artifacts to `resources/`
- Update `memory/closets.md` with facts that became clear
- Update `memory/drawers.md` with new deferred questions

---

## Step 3 — Close a decision

When the decision is made:

1. Update `decision-plan.md`:
   - Set **Status** to `Closed`
   - Fill in **Decision**, **Rationale**, **Consequences**

2. Update `decisionlog.md` entry:
   - Change status to `Closed`
   - Copy in the final Decision + Rationale + Consequences

3. If tasks flow from this decision: hand off to `ds-task` to scaffold them

4. Confirm: "Decision closed — [title] → [what was chosen]. Consequences logged."

---

## Closets vs Drawers

**Closets** — things you know are true and stable about this decision context:
- "The Figma MCP account is on Starter plan — 6 calls/month max"
- "CGEventTap requires Accessibility permission which users resist granting"

**Drawers** — things to check later, deferred, or contingent:
- "If we go with Accessibility API, revisit the permission UX in beta"
- "Check whether Tauri 2.0 resolves the cross-app event issue"

---

## Output rules

- State the decision status change in one line
- Don't summarize what the user just said — act on it
- Voice: direct, expert, friend/mentor
