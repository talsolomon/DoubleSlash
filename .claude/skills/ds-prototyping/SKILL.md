---
name: ds-prototyping
description: Makes solution concepts tangible enough to test through storyboards, fake prototypes, and co-creation facilitation. Use when a concept needs to be visualized before committing to build, or when the team needs to align on an interaction before design begins. Also triggers on: storyboard, fake prototype, paper prototype, wireframe, lo-fi, co-creation, concept sketch, Crazy 8s, make it tangible, sketch the flow, prototype the idea, design sprint, concept design, clickable wireframe, low-fidelity design, co-creation workshop.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [ux-design, develop, ds-core, prototyping, design]
model: inherit
---

# DS Prototyping

Makes solution concepts tangible enough to test — from rough storyboards to clickable wireframe specs — before committing to build.

**Produces:** Prototype brief specifying recommended fidelity, storyboard or interaction flow, wireframe annotations or clickable spec, and a testing readiness checklist.

---

## When to invoke

- **Concept alignment.** Team has a direction but hasn't aligned on how the interaction actually works.
- **Before design begins.** Need to validate the flow and content before investing in high-fidelity design.
- **Testing gate.** Have something to test but need to choose the right prototype fidelity for the test.
- **Co-creation session.** Facilitating a workshop where the team generates and sketches concepts together.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Single flow, low stakes | Storyboard (3–5 frames), paper prototype spec |
| Tuna | Feature or screen set, moderate complexity | Crazy 8s, storyboard, fake prototype design, interaction flow |
| Salmon | Multi-flow, multi-screen, stakeholder buy-in needed | Co-creation facilitation, multiple concepts, clickable wireframe spec, fidelity recommendation |
| Willy | Full product or service concept | Full suite including service scenario, wizard-of-oz design, testing plan per prototype |

---

## Instructions

1. **Classify** this prototyping effort: Nemo / Tuna / Salmon / Willy based on concept complexity and what it needs to prove
2. **State** the FISH level, which methods you're running, and the recommended fidelity level (paper / lo-fi / mid-fi / clickable)
3. **Run each method** in sequence:

   **Crazy 8s** *(Tuna+)*
   - Generate 8 distinct concept variations for the core interaction — one per panel
   - Each variation should make a different assumption about the solution
   - Force divergence: no two concepts should share the same mental model

   **Storyboarding**
   - Produce a 3–8 frame storyboard showing user + context + interaction + outcome
   - Each frame: what the user is doing, thinking, and feeling
   - Mark the moment the product intervenes and what changes

   **Fake prototype design** *(Tuna+)*
   - Define what the prototype needs to test (hypothesis it proves or disproves)
   - Specify screens needed, interactions to simulate, data to fake
   - Write annotations for each screen: what's real vs. faked, what decision point it tests

   **Interaction flow** *(Tuna+)*
   - Map the full interaction sequence: trigger → steps → outcome
   - Note decision branches (where user can go wrong or right)
   - Mark entry points, exit points, and error states

   **Co-creation facilitation** *(Salmon+)*
   - Design a 45–90 min session: warm-up → constraint brief → sketch round → gallery walk → vote
   - Produce the constraint brief (what participants are designing, what's in/out of scope)
   - Produce synthesis instructions (how outputs get consolidated after the session)

   **Clickable wireframe spec** *(Salmon+)*
   - List each screen with: purpose, content blocks, primary action, secondary actions
   - Define click targets and where each leads
   - Flag design system components that apply (if known)

4. **Write the prototype brief** — fidelity recommendation, what to build first, what to fake, what to skip

**Final output:** Prototype brief with fidelity recommendation, storyboard or flow, annotated screen list or wireframe spec, and testing readiness checklist for `ds-usability-testing`.

---

## Methods library

Crazy 8s, storyboarding, fake prototype design, paper prototype, interaction flow mapping, co-creation facilitation, clickable wireframe spec, concept sketching, fidelity recommendation, wizard-of-oz prototype design, service scenario scripting, multiple concepts generation, constraint brief writing

---

## Error handling

| Condition | Resolution |
|---|---|
| No concept direction to prototype | Run `ds-solution-ideation` first; prototyping requires a concept to make tangible |
| Too many ideas, unclear which to prototype | Run Crazy 8s + dot-voting to select one concept; prototype the winner |
| Team wants high-fidelity immediately | Recommend lo-fi first; flag risk of investing design time in an unvalidated flow |
| Co-creation session is remote | Adapt facilitation brief for async (Miro/FigJam board instructions instead of physical sketching) |
| Prototype scope keeps expanding | Bound the scope explicitly: one user goal, one flow, one testable hypothesis per prototype |
