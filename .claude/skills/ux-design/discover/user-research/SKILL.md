---
name: ds-ux-design-user-research
description: Plans and synthesizes user research to surface behavioral patterns and unmet needs. Use when starting a design project, validating assumptions, or asking "who is our user" and "what do they actually do". Also triggers on: contextual inquiry, semi-structured interview, diary study, behavioral observation, card sorting, affinity mapping, JTBD behavioral interview.
tags: [ux-design, discover, user-research, jtbd, affinity-mapping, contextual-inquiry]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: discover
---

# User Research
**Domain**: UX Design | **Phase**: Discover | **Invocation**: `/ds-ux-design-user-research`

## What this produces
A research synthesis with behavioral patterns, unmet needs ranked by frequency × severity, mental model description, and design implications ready to brief a designer.

## Methods
Semi-structured behavioral interview, contextual inquiry, diary study, card sorting, tree testing, session replay and heatmap analysis, support ticket mining, JTBD framing, affinity mapping, Jobs Story synthesis

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Lean research | 5-user interview guide + top 3 patterns + design implications |
| Tuna | Core research | Interviews + synthesis + mental model + ranked needs |
| Salmon | Full research program | Contextual inquiry + card sort + affinity map + jobs stories |
| Willy | Research platform | All methods + longitudinal study + research repository |

---

## Execution Prompt

Read the project context: what is the design problem being researched, what is already known about users, what assumptions need validation, FISH classification.

---

### Step 1 — Research Question Definition (all FISH levels)

Before recruiting a single user, define what you're trying to learn.

```
Primary research question: [The single most important question — what would change the design if you knew the answer?]

Secondary questions:
1. [What behavior or mental model are we trying to understand?]
2. [What assumption are we testing?]
3. [What context do we not understand?]

What we already know: [existing data, prior research, support tickets]
What we're NOT trying to learn: [scope boundaries — prevents scope creep mid-study]
```

**Research question quality check:**
- Is it behavioral? (what people DO, not what they WANT) → good
- Is it a yes/no question? → too narrow, reframe
- Does the answer change a design decision? → if no, deprioritize

---

### Step 2 — Participant Recruiting Criteria (all FISH levels)

**Recruiting screener:**
```
Target: [N] participants
Profile:
  - [Characteristic 1 — e.g., has used a competing product in last 6 months]
  - [Characteristic 2 — e.g., makes [X] type of decision at work]
  - [Characteristic 3 — e.g., frequency of behavior: at least X/month]
Exclusions:
  - [People who work in the industry — too sophisticated]
  - [Extreme users only — need the middle of the distribution]
Diversity requirements:
  - [Mix of experience levels: novice / intermediate / expert]
  - [Mix of contexts: mobile / desktop / location]
```

**Sample size guidance:**
- Nemo: 5 users — Nielsen's law: 85% of usability problems found with 5 users for qualitative research
- Tuna: 8–12 users
- Salmon: 15–20 users across multiple segments
- Willy: 25+ with quantitative validation

---

### Step 3 — Interview Guide (all FISH levels)

**Behavioral interview — the JTBD format:**

Opening:
```
"Tell me about the last time you [relevant behavior]. Walk me through exactly what you did."
[Note: ask about a specific instance, not hypotheticals]
```

Trigger questions (what started the job):
```
"What was happening that made you start thinking about [problem]?"
"How long had that situation been going on?"
"What finally made you do something about it?"
```

Journey questions (the process):
```
"Walk me through what you did first. Then what?"
"What information were you looking for? Where did you look?"
"What was the hardest part of figuring out [X]?"
"Show me what you were using at the time." [request screen share or artifact]
```

Workaround questions (unmet needs):
```
"What did you wish existed that didn't?"
"What were you cobbling together to make this work?"
"If you could change one thing about how you did this, what would it be?"
```

Mental model questions:
```
"How do you think about [domain concept]? Walk me through your mental image."
"What would make you feel like this was done right?"
"What would make you trust a tool like this?"
```

Closing:
```
"Is there anything about [topic] that you expected me to ask but didn't?"
"Who else deals with this problem? Can you describe a colleague who has this problem even more than you?"
```

**Interviewing rules:**
- 80% listening, 20% talking — your job is to stay curious, not to lead
- No "would you" questions — ask about past behavior, not hypothetical future behavior
- Silence is research data — let it sit for 3 seconds before prompting
- Never explain the product or solve their problem during the interview

---

### Step 4 — Affinity Mapping (Tuna, Salmon, Willy)

After interviews, synthesize into behavioral patterns using affinity mapping.

**Process:**
1. Capture every observation on a separate note: "[User X] said/did [observation]"
2. Group notes that feel related — don't name the groups yet
3. Give each group a label that captures the behavioral pattern (not a category name)
4. Identify the top patterns across multiple users (frequency = confidence)

**Affinity map output format:**
```
Cluster: [Pattern name — behavioral, active voice]
  Evidence: [Quote 1 from User A] | [Behavior observed from User B] | [Quote 3]
  Frequency: [X of N users showed this pattern]
  Strength: High / Medium / Low
  Design implication: [what this means for the design — one sentence]
```

**Pattern quality bar:** a real pattern appears in 3+ interviews with consistent evidence. A single powerful quote is a hypothesis, not a pattern.

---

### Step 5 — Needs Ranking (all FISH levels)

Rank unmet needs by frequency and severity.

**Formula:** `Priority = (Frequency × Severity) ÷ (Workaround Quality + 1)`

| Unmet Need | Frequency (1-5) | Severity (1-5) | Workaround Quality (1-5) | Score | Priority |
|---|---|---|---|---|---|
| [Need 1] | | | | | P1 |
| [Need 2] | | | | | P2 |

- **Frequency**: how often does this come up (1=rare, 5=constant)
- **Severity**: how painful is it (1=minor friction, 5=task failure)
- **Workaround Quality**: how well do they solve it themselves (1=none, 5=perfect workaround → low priority)

Top 3 needs by score become the design input.

---

### Step 6 — Mental Model Description (Tuna, Salmon, Willy)

How does the user conceptualize the domain? The design must match their mental model or explicitly correct it.

```
Mental Model: [Name for this user's conceptual model]
How they think about it: [2-3 sentences — their internal story]
Key vocabulary they use: [exact words and phrases from interviews]
What they expect to see: [based on their mental model]
Where the product breaks their model: [specific mismatches between product and model]
Design implication: [what the design must do to meet or correct this model]
```

---

### Step 7 — Jobs Stories (Salmon, Willy)

Jobs Stories capture the motivation behind the behavior.

Format: "When [situation], I want to [motivation], so I can [outcome]."

```
Job Story 1:
  When [specific triggering situation],
  I want to [action or capability],
  so I can [downstream goal — the real why].
  Evidence: [which users, what they said]

Job Story 2: ...
```

**Jobs story rules:**
- "When" describes a moment, not a persona ("when my team asks for a status update" not "when I'm a manager")
- "I want to" describes motivation, not a feature ("understand what's at risk" not "see a dashboard")
- "So I can" is the real goal — this is why the job exists

---

### Final Output

**Research questions** — primary + secondary, clearly scoped
**Participant profile** — recruiting criteria, sample size rationale
**Interview guide** — behavioral, JTBD-structured, with rules
**Top 5 behavioral patterns** — with evidence from multiple users
**Ranked unmet needs** — frequency × severity, top 3 clearly identified
**Mental model** — how users think, vocabulary, design implications (Tuna+)
**Jobs Stories** — 3–5 motivations behind behaviors (Salmon+)
**Design implications** — one per pattern, actionable
**Recommended next skill** — `/ds-ux-design-ux-brief` (to frame the design problem) or `/ds-ux-design-usability-testing` (if testing existing designs) with one-sentence reason
