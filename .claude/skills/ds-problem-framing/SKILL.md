---
name: ds-problem-framing
description: Turns research and discovery output into a precise, buildable problem statement with HMW, POV, RICE score, and north star metric. Use when the problem feels fuzzy, the team is misaligned, or before writing any requirements. Also triggers on: define the problem, problem statement, HMW, how might we, north star metric, scope the problem, RICE prioritization, ICE score, what problem are we solving, align on the problem.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [product, define, ds-core, framing]
model: inherit
---

# DS Problem Framing

Turns discovery output into a precise, actionable problem statement that can guide a build.

**Produces:** HMW statement, POV, opportunity score (RICE or ICE), north star metric, success criteria — ready to enter Develop phase.

---

## When to invoke

- **Problem feels fuzzy.** Team is building but can't agree on what problem they're solving.
- **Research is done, direction is unclear.** Discovery produced signal but no clear frame.
- **Before writing requirements.** Can't write a good PRD without a sharp problem statement first.
- **Team misalignment.** Different stakeholders are optimizing for different things.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Quick frame | HMW reframe, POV statement, ICE score |
| Tuna | Standard framing | HMW, POV, RICE score, north star metric, assumption mapping |
| Salmon | Full framing | 5 Whys, insight clustering, full opportunity scoring, success criteria |
| Willy | Strategic framing | All methods — full assumption map, Kano model, user need hierarchy |

---

## Instructions

1. **Input required:** research or discovery output from the previous phase (problem signals, user quotes, data)
2. **Classify** scope: Nemo / Tuna / Salmon / Willy
3. **For each method** at this FISH level:
   - Apply the method to the input research
   - Produce the artifact (HMW, POV, score, etc.)
   - State what this rules in and rules out
4. **Converge** to a single problem statement

**Final output:** one problem statement, one north star metric, one RICE/ICE score, three success criteria. Recommend which DS skill to run next (ds-solution-ideation or ds-requirements-definition).

---

## Methods library

HMW (How Might We) reframing, POV statement writing, 5 Whys root cause analysis, fishbone diagram, insight clustering, opportunity scoring (RICE, ICE, WSJF, Kano), north star metric definition, success criteria definition, assumption mapping, user need hierarchy, problem statement synthesis

---

## Error handling

| Condition | Resolution |
|---|---|
| No prior research | Run ds-customer-discovery first — framing without evidence produces a guess, not a frame |
| Too many HMWs | Cluster by theme, pick the one with the highest RICE score |
| Stakeholders disagree on the problem | Surface the disagreement as an explicit assumption — don't resolve it by averaging |
