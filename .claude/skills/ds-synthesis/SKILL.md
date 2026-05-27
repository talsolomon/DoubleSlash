---
name: ds-synthesis
description: Turns raw research into actionable design direction by clustering data into themes, insights, and opportunity spaces. Use when discovery is complete and the team needs clarity before framing solutions, or when stakeholders need to see patterns across user data. Also triggers on: affinity mapping, cluster the research, what did we learn, synthesize findings, make sense of interviews, journey mapping, persona creation, empathy map synthesis, thematic analysis, insight statements, turn research into direction, research synthesis, from research to insights.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [ux-design, define, ds-core, synthesis, research]
model: inherit
---

# DS Synthesis

Turns raw discovery data into prioritized insights, personas, and opportunity spaces — the bridge from research to direction.

**Produces:** Synthesis report with top themes, 3–5 insight statements, current-state journey map, proto-persona(s), and recommended How Might We prompts for the Define phase.

---

## When to invoke

- **Research is done, direction isn't.** Interviews or observations collected; team needs patterns, not raw notes.
- **Team misalignment.** Multiple people heard different things — need a shared model of the user.
- **Before framing.** Running `ds-problem-framing` next but don't yet have insight statements to work from.
- **Stakeholder update.** Need to communicate what was learned without dumping raw transcripts.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Quick sense-making, ≤5 interviews | Affinity mapping, empathy map synthesis, 3 insight statements |
| Tuna | Moderate research, 5–15 data points | Affinity mapping, thematic analysis, current-state journey map, proto-persona, insight statements |
| Salmon | Full research program, 15–30 data points | All Tuna methods + mental model mapping, design criteria definition, opportunity space mapping |
| Willy | Multi-stakeholder, longitudinal data | Full suite including service blueprint, experience principles, user need statement per segment |

---

## Instructions

1. **Classify** this synthesis effort: Nemo / Tuna / Salmon / Willy based on data volume and decision stakes
2. **State** the FISH level and which methods you're running — and why
3. **Run each method** in sequence:

   **Affinity mapping**
   - Group raw observations, quotes, and facts into clusters by theme
   - Name each cluster with an insight-oriented label (not a category name)
   - Count signal strength per cluster

   **Thematic analysis** *(Tuna+)*
   - Extract recurring patterns across clusters
   - Label each theme and note which user segments it affects
   - Flag surprising findings — things that contradict prior assumptions

   **Current-state journey map** *(Tuna+)*
   - Map the user's steps, thoughts, and feelings through the relevant experience
   - Mark pain points and moments of friction
   - Mark moments of delight or unexpected workarounds

   **Proto-persona creation** *(Tuna+)*
   - Synthesize a 1-page proto-persona: name, role, goal, frustration, key quote
   - If data supports multiple segments, create one per segment (max 3)

   **Insight statement writing** *(all levels)*
   - Format: "[User] needs [need] because [underlying reason]"
   - Write one per major theme; aim for 3–5 total
   - Each insight should be specific enough to generate a How Might We

   **Opportunity space mapping** *(Salmon+)*
   - Place each insight on a 2×2: effort to address vs. frequency of occurrence
   - Identify which insights sit in the high-frequency, tractable quadrant

4. **Synthesize** into a consolidated direction: which insights are most load-bearing for the next phase

**Final output:** top themes with evidence, insight statements, journey map highlights, proto-persona(s), and 3–5 HMW prompts to hand to `ds-problem-framing`.

---

## Methods library

Affinity mapping, thematic analysis, journey mapping (current state), service blueprint, persona creation, proto-persona, mental model mapping, empathy map synthesis, insight statement writing, opportunity space mapping, experience principles definition, user need statement, design criteria definition

---

## Error handling

| Condition | Resolution |
|---|---|
| No raw data provided | Ask for interview notes, observation logs, or survey data before proceeding |
| Data from a single source only | Flag the risk; note which insights have single-source support |
| Too much data to synthesize in one pass | Prioritize by recency and relevance to the stated problem; flag what was deprioritized |
| Contradictory signals across users | Surface the contradiction as a finding; do not average it away |
| Team disagrees on insights | Treat disagreement as signal; document both reads and recommend a decision |
