# Methodology
_The principles and process that govern how we build — and how the agents we build should work._

---

## 1. HAI Principles (Human-AI Interaction)
_To be written. This is the product's soul and primary differentiator._

**Draft principles (to be validated):**

1. **Human intent is the source of truth** — agents execute, humans decide. No agent takes an irreversible action without a human checkpoint.
2. **Transparency over magic** — every agent action should be visible, traceable, and explainable. The node map is not a nice-to-have; it's a commitment to transparency.
3. **Agents are personas, not pipelines** — each agent has an identity: a name, a role, communication preferences, working hours. This is intentional. It helps humans trust and manage them.
4. **Escalation is a first-class skill** — every agent must know when to stop and ask. Failure to escalate is a design defect.
5. **The team is the product** — individual agents are components. The value is in how they collaborate, hand off, and stay aligned with the human's intent.

_Status: DRAFT — needs a design session to harden._

---

## 2. UCD (User-Centered Design)
_All product decisions are tested against real user needs, not feature logic._

Key UCD practices we follow:
- **Jobs-to-be-done framing**: For every feature, state the job: "When I [situation], I want to [motivation], so I can [outcome]."
- **Test with the first cohort first**: No feature is "done" until at least one real user has used it and given signal.
- **Progressive disclosure**: Don't show all power upfront. Onboarding earns complexity.

---

## 3. Double Diamond Process
_How we move from problem to solution._

```
DISCOVER → DEFINE → DEVELOP → DELIVER
```

| Phase | Question | Output |
|---|---|---|
| Discover | What's the real problem? | Research, user interviews, competitive analysis |
| Define | What problem are we solving? | Problem statement, user needs, success criteria |
| Develop | What could solve it? | Concepts, prototypes, agent configurations |
| Deliver | Does it work? | Tested solution, decision log entry, shipped |

**Rule**: Each diamond must close before the next opens. We don't develop solutions to undefined problems.

---

## 4. Agent Team Design Rules
_Specific to Duble//Slash — how we think about agent team structure._

- Every team needs a **coordinator agent** responsible for task routing and human escalation
- Every agent needs a **defined scope**: what it can do, what it cannot do, and what triggers escalation
- Communication channels are configured per-agent, not per-project
- Loops (recurring behaviors) must have an explicit off-condition or review cadence
- A team of 1 agent is valid. Don't require teams.
