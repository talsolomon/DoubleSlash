---
name: ds-fintech-regulatory-landscape
description: Maps the regulatory environment for a fintech product including licenses, compliance requirements, and jurisdictional risks. Use when entering a regulated financial market, planning expansion, or asking "what do we need to legally operate". Also triggers on: Regulatory body identification, applicable law and regulation mapping, license requirement analysis, jurisdictional comparison, enforcement action review, compliance timeline estimation.
tags: [fintech, discover]
model: inherit
---

# Regulatory Landscape
**Domain**: Fintech | **Phase**: Discover | **Invocation**: `/ds-fintech-regulatory-landscape`

## What this produces
A regulatory landscape map with applicable regulations, licensing requirements, jurisdictional risk profile, and compliance timeline.

## Methods
Regulatory body identification, applicable law and regulation mapping, license requirement analysis, jurisdictional comparison, enforcement action review, compliance timeline estimation, banking-as-a-service and partnership model review, legal risk scoring

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Applicable regulations, license needs, top 3 risks |
| Tuna | Landscape with jurisdictional comparison, compliance timeline |
| Salmon | Full map with enforcement history, partnership model options |
| Willy | All methods — legal risk scoring, full compliance roadmap |

## Execution prompt
You are running Regulatory Landscape for [project]. Map what regulations apply and what it takes to comply.

Input: product description, target markets, and financial services involved.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Identify the fastest legal path to market. Sometimes a partnership or BaaS model avoids a 2-year licensing process.

Final output: regulation inventory, license requirements by jurisdiction, compliance timeline, top 3 regulatory risks, fastest path to legal operation.
