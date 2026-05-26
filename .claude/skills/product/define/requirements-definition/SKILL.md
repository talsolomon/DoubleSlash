---
name: ds-product-requirements-definition
description: Writes a buildable spec — PRD, user story map, acceptance criteria, definition of done. Use when moving from problem to build, handing off to engineering, or asking "what exactly are we building". Also triggers on: PRD writing, user story mapping, job stories, acceptance criteria, API contract design, dependency mapping.
tags: [product, define, prd, user-stories, acceptance-criteria, engineering-handoff]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# Requirements Definition
**Domain**: Product | **Phase**: Define | **Invocation**: `/ds-product-requirements-definition`

## What this produces
A buildable specification. On Nemo: a lean story map + acceptance criteria. On Tuna: a full PRD with scope boundary. On Salmon/Willy: an enterprise-grade PRD with API contracts, dependency map, non-functional requirements, and assumption log.

## Methods
PRD writing, user story mapping, job stories (Alistair Cockburn), acceptance criteria (Given/When/Then), API contract design, dependency mapping, constraint documentation, assumption log, definition of done, feature spec, scope boundary definition, non-functional requirements, edge case enumeration

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Lean spec | 3–5 user stories + acceptance criteria + DoD |
| Tuna | Full PRD | PRD with all sections + story map + scope boundary |
| Salmon | Engineering-ready | PRD + API contracts + dependency map + edge cases + assumption log |
| Willy | Enterprise PRD | All above + non-functional requirements + full constraint doc + stakeholder sign-off checklist |

---

## Execution Prompt

Read the project context: the problem statement and POV from Define phase, FISH classification, any solution direction agreed, team size and stack constraints, and any existing engineering conventions from memory.

---

### Step 1 — Context Block (all FISH levels)

Open the spec with a context block that grounds every reader:

```
## Context
Problem: [one-sentence problem statement from framing]
User: [primary persona from POV statement]
Why now: [why this is being built at this moment — business or user urgency]
FISH: [classification] — [one-sentence consequence for scope]
```

---

### Step 2 — User Story Map

Structure requirements as a story map: activities across the top, tasks below each activity, stories below each task.

**Activity** = high-level user goal ("Manage my weekly schedule")
**Task** = step the user takes within that goal ("See what's due this week")
**Story** = the atomic deliverable ("As a [persona], when [context], I want [action] so that [outcome]")

Story format (Connextra + context):
> **As a** [specific persona, not "user"]  
> **when** [triggering context — what just happened or what they're trying to do]  
> **I want to** [action or capability]  
> **so that** [outcome — the value, not a feature]

Story sizing:
- Each story should be completable by one developer in 1–3 days
- If a story takes longer, split it
- Stories are independent, negotiable, valuable, estimable, small, testable (INVEST)

**Nemo**: 3–5 stories max — only the core happy path
**Tuna**: 8–15 stories — core path + top 3 edge cases
**Salmon/Willy**: full story map, all activities, all tasks, happy path + error states + edge cases

---

### Step 3 — Acceptance Criteria (all FISH levels)

For every user story, write acceptance criteria in Given/When/Then format:

```
Given [precondition — what state the system or user is in]
When [action the user takes]
Then [observable outcome — what the system does]
And [additional outcome if needed]
```

Rules for good acceptance criteria:
- Testable by a QA engineer without asking clarifying questions
- No UI prescription ("a button appears" is bad; "the user can submit" is good)
- Covers the happy path AND the most likely failure case
- One criterion per observable behavior — don't bundle

Write minimum 2 criteria per story (happy path + one error/edge case).

---

### Step 4 — Scope Boundary (Tuna, Salmon, Willy)

Explicitly state what is NOT in scope. This is as important as what is in scope.

Format:
```
## Out of Scope — v1
- [Feature or capability] — [one-sentence reason it's deferred]
- [Feature or capability] — [reason]
...

## Explicitly deferred to v2
- [Thing] — [what would need to be true before we build it]
```

---

### Step 5 — Definition of Done (all FISH levels)

Write the DoD — the shared agreement on what "shipped" means. Must include:

**Code quality**
- [ ] Code reviewed by at least one other engineer
- [ ] No new linting errors introduced
- [ ] Unit tests written for all new logic (coverage ≥ [X]%)

**Functional**
- [ ] All acceptance criteria pass
- [ ] Happy path tested manually on [staging / device / environment]
- [ ] Top 3 edge cases tested

**Non-functional** (Salmon/Willy only)
- [ ] Performance: [specific threshold, e.g., "page loads in < 2s on 3G"]
- [ ] Accessibility: [WCAG level, e.g., "AA compliant"]
- [ ] Security: [specific check, e.g., "no PII logged"]

**Release**
- [ ] Feature flag wired (if applicable)
- [ ] Analytics event(s) firing
- [ ] Documentation updated (if public-facing)
- [ ] Stakeholder sign-off (Willy only)

---

### Step 6 — API Contracts (Salmon, Willy only)

For each system boundary (new endpoint, changed integration, third-party dependency):

```
## [Endpoint or Integration Name]

Method: [GET/POST/PUT/DELETE]
Path: [/api/v1/...]
Auth: [who can call this]

Request:
  [field]: [type] — [required/optional] — [description]

Response (200):
  [field]: [type] — [description]

Error states:
  400: [when this happens]
  401: [when this happens]
  404: [when this happens]
```

---

### Step 7 — Dependency Map (Salmon, Willy only)

List every dependency that must resolve before this can ship:

| Dependency | Type | Owner | Status | Blocking? |
|---|---|---|---|---|
| [Name] | Internal / External / Infra | [Team or person] | Not started / In progress / Done | Yes / No |

For each blocking dependency: name the resolution path and escalation owner.

---

### Step 8 — Assumption Log (Tuna, Salmon, Willy only)

Inherit from Problem Framing. Add any new assumptions introduced by the requirements themselves:

| Assumption | Impact if wrong | Validation method | Validation owner |
|---|---|---|---|

Flag assumptions that must be validated before engineering starts vs. those that can be validated during development.

---

### Step 9 — Non-Functional Requirements (Willy only)

Explicit requirements for qualities that cut across all stories:

**Performance**: [e.g., "P95 API response time < 200ms under 1,000 concurrent users"]
**Scalability**: [e.g., "Must support 10× current load without architecture changes"]
**Security**: [e.g., "All PII encrypted at rest and in transit; no credentials in logs"]
**Accessibility**: [e.g., "WCAG 2.1 AA for all user-facing surfaces"]
**Compliance**: [e.g., "GDPR Article 17 (right to erasure) supported"]
**Observability**: [e.g., "All errors emitted as structured logs with request ID"]

---

### Final Output

**Context Block** — problem, user, why now, FISH
**User Story Map** — activities → tasks → stories (INVEST-compliant)
**Acceptance Criteria** — Given/When/Then for every story, 2+ per story
**Scope Boundary** — explicit out-of-scope list (Tuna+)
**Definition of Done** — checklist, shipping-grade
**API Contracts** — per boundary (Salmon+)
**Dependency Map** — with owners and blocking status (Salmon+)
**Assumption Log** — with validation approach (Tuna+)
**Non-Functional Requirements** — explicit and measurable (Willy)
**Recommended next skill** — `/ds-product-roadmap-design` or `/ds-engineering-architecture` with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
