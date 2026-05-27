---
name: ds-customer-discovery
description: Surfaces real user problems through interviews, empathy mapping, and observation before anything gets built. Use when starting a new project, validating an idea, running user research, or asking "who is this for" and "what problem are we solving". Also triggers on: user interviews, talk to users, JTBD, jobs to be done, validate assumptions, empathy mapping, problem interview, contextual inquiry, who are our users, discovery research.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [product, discover, ds-core, research]
model: inherit
---

# DS Customer Discovery

Runs the Customer Discovery workflow — surfaces real user problems with evidence before anything gets built.

**Produces:** Prioritized problem list (max 5) with evidence, user segments, and recommended direction into Define phase.

---

## When to invoke

- **Starting a project.** Nothing built yet — need to understand who the user is and what problem actually matters.
- **Validating an idea.** Have a hypothesis; need signal before committing to build.
- **Running user research.** Need interview guides, observation protocols, or synthesis frameworks.
- **Stuck on problem definition.** Team is misaligned on who the customer is or what they need.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Quick signal check | JTBD interview (3–5 users), empathy mapping |
| Tuna | Moderate validation | JTBD interview, problem interview, NPS deep-dive, empathy mapping |
| Salmon | Full discovery | Contextual inquiry, JTBD interview, win/loss analysis, survey design, empathy mapping |
| Willy | Comprehensive program | Diary study, day-in-the-life shadowing, longitudinal panel, all interviews |

---

## Instructions

1. **Classify** this discovery effort: Nemo / Tuna / Salmon / Willy based on what's at stake and how much is known
2. **State** the FISH level and which methods you're running — and why
3. **Run each method** in sequence:
   - Produce the instrument (interview guide, survey, observation protocol)
   - Synthesize findings per method
   - State the signal: what did you learn?
4. **Synthesize** across methods into a prioritized problem list

**Final output:** top 5 problems with evidence for each, user segments identified, recommended direction into Define phase (which DS skill to run next).

---

## Methods library

JTBD interview, problem interview, contextual inquiry, ethnographic observation, diary study, day-in-the-life shadowing, empathy mapping, experience sampling, NPS deep-dive, churn interview, win/loss analysis, survey design, customer advisory board facilitation, participatory observation, longitudinal panel

---

## Error handling

| Condition | Resolution |
|---|---|
| No users to interview | Use proxy methods: churn interviews, support ticket analysis, online review mining |
| Problem space too broad | Narrow to one user segment first — run Nemo to get initial signal |
| Conflicting signals | Surface the conflict explicitly — don't average it out |
