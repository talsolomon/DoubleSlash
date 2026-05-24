---
name: ds-product-customer-discovery
description: Surfaces real user problems through interviews, empathy mapping, and observation. Use when starting a new project, validating an idea, or asking "who is this for" and "what problem are we solving". Also triggers on: JTBD interview, problem interview, contextual inquiry, ethnographic observation, diary study, day-in-the-life shadowing.
tags: [product, discover, research, jtbd, interviews]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: discover
---

# Customer Discovery
**Domain**: Product | **Phase**: Discover | **Invocation**: `/ds-product-customer-discovery`

## What this produces
A ranked problem list with evidence, user segments with characteristics, and a clear recommendation into the Define phase. On Salmon/Willy: a research plan + interview guide the human runs, plus a synthesis template.

## Methods
JTBD interview, problem interview, contextual inquiry, ethnographic observation, diary study, day-in-the-life shadowing, empathy mapping, experience sampling, NPS deep-dive, churn interview, win/loss analysis, survey design, participatory observation, longitudinal panel

## FISH Guide
| Fish | Depth | What runs |
|---|---|---|
| Nemo | AI-led, fast | JTBD guide → 3 synthetic interviews → affinity map → problem list |
| Tuna | AI-led, broader | JTBD + problem interviews → NPS deep-dive → full affinity map → segmented problem list |
| Salmon | Human-led | Research plan + interview guide → synthesis template → handoff to human |
| Willy | Human-led, wide | Multi-stakeholder research plan + observation guide + diary study protocol → synthesis framework |

---

## Execution Prompt

Read the project context: what is known about the problem space, who the target users are (even as a hypothesis), what FISH classification applies, and any prior research or signal already captured in memory.

---

### If FISH = Nemo or Tuna (AI-led discovery)

**Step 1 — JTBD Interview Guide**

Produce a structured interview guide for 3 (Nemo) or 5 (Tuna) user interviews using this exact question architecture:

**Opening — get them into a specific memory**
- "Tell me about the last time you had to [job this product addresses]. Walk me through what happened from the beginning."
- "When did this come up? What triggered it?"

**Job Mapping — understand the full workflow**
- "What were you trying to accomplish? What's the end goal?"
- "What did you do right before this? What came after?"
- "Who else was involved? What did they need from you?"

**Struggle Probing — surface the real pain**
- "What was the hardest part of that process?"
- "What did you try that didn't work the way you expected?"
- "What do you wish had been different?"
- "How did you know when you'd succeeded — or failed?"

**Workaround Mapping — find the DIY solutions**
- "How do you currently handle [specific pain]? Walk me through exactly what you do."
- "What tools, hacks, or shortcuts have you built up over time?"

**Motivation and Stakes — understand why it matters**
- "What happens if this problem doesn't get solved?"
- "Who notices when this goes wrong?"

**Closing — get the wish**
- "If you could wave a magic wand and change one thing about how this works today, what would it be?"

---

**Step 2 — Synthetic Interviews**

Run 3 (Nemo) or 5 (Tuna) synthetic interviews using the guide above. For each:
- Give the user a name and 3 contextual characteristics (role, environment, frequency of the job)
- Answer each interview question from that user's perspective, grounded in real-world plausibility
- Surface 1–2 distinct insight moments per interview: an unexpected pain, a surprising workaround, or an unmet expectation

**Tuna only — also run:**
- NPS Deep-Dive: for the 3 lowest-rated experiences surfaced in interviews, map: moment of disappointment → emotional reaction → workaround behavior → lasting attitude change
- Segment split: are there distinct user groups responding to the same pain differently? Name and characterize them.

---

**Step 3 — Affinity Map**

Cluster all interview signals by theme. Name each cluster in insight language:
- "Users don't trust [X] because…"
- "Users compensate for [gap] by…"
- "Users fear [outcome] when…"
- "The real job isn't [assumed], it's [actual]"

Aim for 4–6 themes. Each theme: name, 2–3 supporting quotes or signals, one "so what" sentence.

---

**Step 4 — Problem List**

Ranked problem list, max 5 problems:

| # | Problem statement | Supporting evidence (2–3 signals) | Frequency (1–5) | Severity (1–5) | Workaround quality (0=none, 5=fully solved) |
|---|---|---|---|---|---|

Rank by: (Frequency × Severity) ÷ (Workaround Quality + 1). Highest score = most urgent.

---

### If FISH = Salmon or Willy (Human-led discovery)

Do not run synthetic interviews. Design the research process so the human can collect real signal.

**Step 1 — Research Plan**

- **Who to recruit**: primary qualifying characteristic + 3–5 screening criteria
- **Session count**: Salmon = 8–12; Willy = 15–25+ across 3–5 stakeholder groups
- **Format**: duration, remote vs. in-person recommendation with reason, recording approach

**Willy only — also include:**
- Stakeholder map: distinct groups that must be heard (users, buyers, approvers, affected parties) with participant count per group
- Observation protocol (AEIOU): Activities, Environment, Interactions, Objects, Users — what to look for and how to document
- Diary study option if the job happens infrequently: 5–7 day format with daily prompts

**Step 2 — Interview Guide**

Produce the same JTBD guide from above, adapted with concrete domain language — replace generic terms with the actual job, context, and user vocabulary.

**Step 3 — Synthesis Template**

```
## Interview [N] — [Participant code]
Profile: [role, context, frequency of job]
Key quote: "[most revealing thing they said]"
Main job: When [situation], I want to [motivation], so I can [outcome]
Biggest pain: [specific struggle]
Current workaround: [what they do today]
Insight moment: [something unexpected]
```

**Step 4 — Handoff**

End with: *"Research plan is ready. Run [N] interviews using this guide. Bring the notes back and I'll synthesize the themes, build the problem list, and recommend the Define path."*

---

### Final Output (AI-led path)

**Problem List** — ranked table, max 5 problems
**User Segments** — 2–3 segments with name, 3 defining characteristics, which problems hit them hardest
**What this rules in and out** — 2–3 sentences on which directions are now open and which are closed
**Recommended next skill** — `/ds-product-problem-framing` with one-sentence reason based on what discovery found
