---
name: ds-manufacturing-quality-framework
description: Defines the quality management system, standards, and control plan for manufacturing. Use when establishing quality standards, certifying for ISO or similar, or asking "how do we ensure every product meets spec". Also triggers on: Quality standard selection (ISO 9001, IATF, etc.), control plan design, FMEA (Failure Mode and Effects Analysis), SPC (Statistical Process Control) design.
tags: [manufacturing, define]
model: inherit
---

# Quality Framework
**Domain**: Manufacturing | **Phase**: Define | **Invocation**: `/ds-manufacturing-quality-framework`

## What this produces
A quality framework with control plan, inspection criteria, defect classification, corrective action process, and quality KPIs.

## Methods
Quality standard selection (ISO 9001, IATF, etc.), control plan design, FMEA (Failure Mode and Effects Analysis), SPC (Statistical Process Control) design, inspection criteria definition, defect classification system, corrective action process, quality KPI definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Quality standards, control plan, top inspection criteria |
| Tuna | Framework with FMEA, defect classification, KPIs |
| Salmon | Full framework with SPC design, corrective action process |
| Willy | All methods — certification roadmap, full FMEA, control chart design |

## Execution prompt
You are running Quality Framework for [project]. Design the quality management system that ensures consistent product quality.

Input: manufacturing spec and quality requirements.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Quality is built in, not inspected in. Design controls at the process level, not just at final inspection.

Final output: control plan, FMEA top risks, inspection criteria, defect classification, corrective action process, quality KPIs with targets.
