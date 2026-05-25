---
name: ds-creative-direction-creative-review
description: Reviews creative work against brief, brand guidelines, and audience fit — producing specific revision instructions. Use before presenting to stakeholders or when reviewing agency/team work.
tags: [creative-direction, develop]
model: inherit
---

# Creative Review
**Domain**: Creative Direction | **Phase**: Develop | **Invocation**: `/ds-creative-direction-creative-review`

## What this produces
A structured creative review with on-brief assessment, brand compliance check, audience resonance analysis, and specific revision instructions per asset — plus an overall go/revise/reject recommendation.

## FISH Guide
| Fish | Depth |
|---|---|
| Nemo | Brief compliance pass/fail, top 3 issues, quick wins |
| Tuna | Brief compliance, brand check, audience resonance, ranked revision list |
| Salmon | Full review with competitor differentiation check, tone analysis, revision brief |
| Willy | All methods — legal scan, full revision brief, stakeholder feedback synthesis |

---

## Execution Prompt

You are running Creative Review for [project]. Assess the creative work and produce specific, actionable feedback that enables the team to revise efficiently.

**Input**: creative work to review (copy, visual direction, or assets), the original creative brief, brand guidelines.

**Review principle**: good creative direction gives the team a clear target — not "this doesn't work" but "here's exactly what needs to change and why." Every note must be specific and actionable.

---

### 1. Brief Compliance Assessment

Review each brief criterion and score pass/fail.

| Brief Criterion | Status | Evidence | Notes |
|---|---|---|---|
| SMP delivered | ✓ Pass / ✗ Fail | [Quote where it appears or doesn't] | |
| Primary audience addressed | ✓ / ✗ | | |
| Tone matches descriptors | ✓ / ✗ | [Specific examples] | |
| Key message present | ✓ / ✗ | | |
| All deliverables produced | ✓ / ✗ | [List any missing] | |
| Hard constraints respected | ✓ / ✗ | [Flag any violations] | |

**Overall brief compliance**: [X/6 criteria met]

**Critical failures** (must fix before any approval): [List any ✗ on SMP, constraints, or missing deliverables]

---

### 2. Brand Compliance Check

| Brand Element | Compliant | Issue | Severity |
|---|---|---|---|
| Logo usage | ✓ / ✗ | | [Blocker / Fix / Minor] |
| Color palette | ✓ / ✗ | | |
| Typography | ✓ / ✗ | | |
| Voice and tone | ✓ / ✗ | | |
| Visual style | ✓ / ✗ | | |
| Messaging hierarchy | ✓ / ✗ | | |

**Brand compliance score**: [X/6]

---

### 3. Audience Resonance Assessment

Does this work connect with the target audience emotionally and intellectually?

| Question | Assessment |
|---|---|
| Does this reflect how the audience sees themselves? | [Yes / No / Partially — evidence] |
| Does the visual world feel native to their taste? | |
| Is the copy written in their language (not brand-speak)? | |
| Does it activate the insight from the brief? | |
| What will they feel in the first 2 seconds? | |
| What action will this create? | |

**Resonance verdict**: [Strong / Adequate / Weak — one-sentence reason]

---

### 4. Competitive Differentiation Check

- Does this look/sound like any competitor's current creative? [Yes / No — name the competitor if yes]
- Does it occupy distinct visual and verbal territory? [Yes / No]
- If this ran alongside [top competitor]'s creative, would it stand out? [Yes / No — why]

**Differentiation verdict**: [Own territory / Blends in / Copies competitor]

---

### 5. Revision Instructions

Rank issues by severity. P1 = must fix. P2 = should fix. P3 = optional improvement.

**P1 — Blockers (must resolve before approval):**

| # | Asset | Issue | Specific Revision Instruction |
|---|---|---|---|
| 1 | [Format] | [What's wrong] | [Exact instruction: "Change X to Y because Z"] |
| 2 | | | |

**P2 — Should Fix:**

| # | Asset | Issue | Specific Revision Instruction |
|---|---|---|---|
| 1 | | | |

**P3 — Optional Improvements:**
- [Asset]: [Suggestion — lower priority]

---

### 6. Strengths — What's Working

3 specific things to preserve through revision (this prevents over-revision):
1. [Specific strength — name the asset and element]: [Why it works]
2.
3.

---

### 7. Overall Recommendation

**Decision**: [Approve / Approve with minor revisions / Revise and resubmit / Reject — new concept needed]

**Rationale** (2 sentences max): [Why this decision, what the core issue is if not approving]

**Next step**: [Exactly what happens next — who revises what, by when, who reviews the revision]

**Revision turnaround**: [Expected time to revise based on scope of changes]
