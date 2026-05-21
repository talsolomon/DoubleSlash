---
name: ds-pr-communications-pr-execution
description: Executes a PR campaign with real-time monitoring and rapid response. Use when running a live campaign, managing an announcement day, or asking "what do we do in the 24 hours around the launch". Also triggers on: Execution timeline with owners, monitoring dashboard setup, social listening activation, journalist inquiry response protocol, rapid response process, escalation trigger definition.
tags: [pr-communications, deliver]
model: inherit
---

# PR Execution
**Domain**: PR/Communications | **Phase**: Deliver | **Invocation**: `/ds-pr-communications-pr-execution`

## What this produces
A PR execution runbook with day-of schedule, monitoring setup, response protocols, and escalation triggers.

## Methods
Execution timeline with owners, monitoring dashboard setup, social listening activation, journalist inquiry response protocol, rapid response process, escalation trigger definition, spokesperson availability plan, real-time coverage tracking

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Day-of schedule, monitoring setup, response protocol |
| Tuna | Execution runbook with escalation triggers, coverage tracking |
| Salmon | Full runbook with rapid response process, spokesperson plan |
| Willy | All methods — full monitoring dashboard, crisis fallback, 48-hour window plan |

## Execution prompt
You are running PR Execution for [project]. Execute the campaign and manage what happens in real time.

Input: PR campaign design and outreach plan.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Launch day is not the time to make decisions — it's the time to execute pre-made decisions. Have every response protocol ready before the embargo lifts.

Final output: hour-by-hour execution schedule, monitoring setup, response protocols, escalation triggers, coverage log template.
