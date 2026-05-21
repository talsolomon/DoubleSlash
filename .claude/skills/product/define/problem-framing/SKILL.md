---
name: ds-product-problem-framing
description: Turns research into a precise, buildable problem statement with HMW, POV, RICE score, and north star metric. Use when the problem feels fuzzy, the team is misaligned, or before writing any requirements. Also triggers on: HMW (How Might We) reframing, POV statement writing, 5 Whys root cause analysis, fishbone diagram, insight clustering, opportunity scoring (RICE.
tags: [product, define]
model: inherit
---

# Problem Framing
**Domain**: Product | **Phase**: Define | **Invocation**: `/ds-product-problem-framing`

## What this produces
A precise, actionable problem statement that can guide a build. Output: HMW statement, POV, opportunity score (RICE or ICE), north star metric, and success criteria.

## Methods
HMW (How Might We) reframing, POV statement writing, 5 Whys root cause analysis, fishbone diagram, insight clustering, opportunity scoring (RICE, ICE, WSJF, Kano), north star metric definition, success criteria definition, assumption mapping, user need hierarchy, problem statement synthesis

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | HMW reframe, POV statement, ICE score |
| Tuna | HMW, POV, RICE score, north star metric, assumption mapping |
| Salmon | 5 Whys, insight clustering, full opportunity scoring, success criteria |
| Willy | All methods — full assumption map, Kano model, user need hierarchy |

## Execution prompt
You are running Problem Framing for [project]. Turn research into a precise, actionable problem statement.

Input: research or discovery output from the previous phase.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Run the methods for this FISH level. For each:
1. Apply the method to the input research
2. Produce the artifact (HMW, POV, score, etc.)
3. State what this rules in and rules out

Final output: one problem statement, one north star metric, one RICE/ICE score, three success criteria. Ready to enter Develop phase.
