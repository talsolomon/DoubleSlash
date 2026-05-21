---
name: ds-engineering-tech-landscape-research
description: Surveys the technology landscape for a problem space — frameworks, libraries, tools, and trade-offs. Use when starting a new project, choosing a stack, evaluating options, or asking "what technology should we use". Also triggers on: Framework comparison, library evaluation, build-vs-buy analysis, OSS ecosystem scan, GitHub activity analysis, community health assessment.
tags: [engineering, discover]
model: inherit
---

# Tech Landscape Research
**Domain**: Engineering | **Phase**: Discover | **Invocation**: `/ds-engineering-tech-landscape-research`

## What this produces
A technology landscape map with evaluated options, trade-offs, and a recommended stack for the problem.

## Methods
Framework comparison, library evaluation, build-vs-buy analysis, OSS ecosystem scan, GitHub activity analysis, community health assessment, license review, performance benchmarking, dependency risk assessment, technology radar mapping, security vulnerability scan, vendor lock-in analysis

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Framework comparison (top 3), build-vs-buy decision |
| Tuna | Framework comparison, OSS ecosystem scan, community health, license review |
| Salmon | Full comparison, dependency risk, security scan, vendor lock-in analysis |
| Willy | All methods — technology radar, performance benchmarking, full ecosystem audit |

## Execution prompt
You are running Tech Landscape Research for [project]. Map the available technology options before any stack decisions are made.

Input: problem statement or feature scope requiring a technology decision.
FISH classification: [Nemo/Tuna/Salmon/Willy]

For each method at this FISH level:
1. Identify the relevant technology category and enumerate the top options
2. Evaluate each option against the project's constraints (scale, team skills, timeline, cost)
3. Flag risks: maintenance, security, lock-in, licensing

Final output: options comparison table, top recommendation with rationale, and top 3 risks with mitigations.
