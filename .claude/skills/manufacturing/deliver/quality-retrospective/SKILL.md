---
name: ds-manufacturing-quality-retrospective
description: Reviews manufacturing quality performance for the period with root cause analysis and corrective actions. Use at quality reviews, after escapes or customer complaints, or asking "why are defects still happening and what do we do about it". Also triggers on: Defect rate trend analysis, Pareto analysis of defect types, root cause analysis (5-Why, Fishbone), corrective action effectiveness review, supplier quality review.
tags: [manufacturing, deliver]
model: inherit
---

# Quality Retrospective
**Domain**: Manufacturing | **Phase**: Deliver | **Invocation**: `/ds-manufacturing-quality-retrospective`

## What this produces
A quality retrospective report with defect rate trends, root cause analysis, corrective action effectiveness review, and quality improvement plan.

## Methods
Defect rate trend analysis, Pareto analysis of defect types, root cause analysis (5-Why, Fishbone), corrective action effectiveness review, supplier quality review, customer complaint analysis, warranty and field return analysis, quality improvement roadmap

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Defect rate summary, top 3 root causes, corrective actions |
| Tuna | Retro with Pareto analysis, supplier quality review |
| Salmon | Full retro with corrective action effectiveness, field returns |
| Willy | All methods — full root cause log, customer complaint analysis, improvement roadmap |

## Execution prompt
You are running Quality Retrospective for [project]. Assess quality performance and break the cycle of recurring defects.

Input: defect data, corrective action log, supplier quality data, and customer complaints.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: defect rate scorecard, Pareto of top defect types, root cause analysis, corrective action status, quality improvement plan for next period.
