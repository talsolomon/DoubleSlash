---
name: ds-government-policy-framework
description: Designs the policy framework including objectives, instruments, and logic model. Use when structuring a policy intervention, designing a program, or asking "what is this policy trying to achieve and how". Also triggers on: Policy objective hierarchy design, logic model development, theory of change articulation, policy instrument comparison, target population definition, unintended consequence analysis.
tags: [government, define]
model: inherit
---

# Policy Framework
**Domain**: Government | **Phase**: Define | **Invocation**: `/ds-government-policy-framework`

## What this produces
A policy framework with objectives hierarchy, logic model, instrument selection, target population definition, and success metrics.

## Methods
Policy objective hierarchy design, logic model development, theory of change articulation, policy instrument comparison, target population definition, unintended consequence analysis, equity and distributional impact assessment, success metric definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Objectives, logic model, top 3 instruments |
| Tuna | Framework with theory of change, target population |
| Salmon | Full framework with unintended consequences, equity assessment |
| Willy | All methods — full instrument analysis, distributional impact, metrics |

## Execution prompt
You are running Policy Framework for [project]. Define what the policy does, for whom, and how we'll know it worked.

Input: policy research, stakeholder map, and political mandate.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Good policy frameworks are falsifiable — you can tell in advance what would count as failure. Design for that.

Final output: objectives hierarchy, logic model, instrument selection with rationale, target population, success metrics, top 3 unintended consequences to monitor.
