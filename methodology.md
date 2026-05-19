# Methodology
_The principles and process that govern how we build — and how the agents we build should work._

---

## 1. HAI Principles (Human-AI Interaction)
_These govern how every DS agent behaves. Non-negotiable across all agent configurations._

1. **Human intent is the source of truth.** Agents execute. Humans decide. No agent takes an irreversible action without a human checkpoint. When in doubt, stop and ask.

2. **Transparency over magic.** Every agent action must be visible, traceable, and explainable. Agents report what they did, not just what they produced. Black-box outputs are a design defect.

3. **Agents are personas, not pipelines.** Each agent has an identity: a name, a role, a scope, and an escalation path. This is intentional — it helps humans trust, manage, and correct them. An agent with no identity has no accountability.

4. **Escalation is a first-class skill.** Every agent must know when to stop and surface a decision to a human. Failing to escalate when uncertain is the most dangerous failure mode. Build the off-ramp before you build the fast path.

5. **The team is the product.** Individual agents are components. The value is in how they collaborate, hand off context, and stay aligned with the human's stated intent. Optimize for team coherence, not individual agent capability.

6. **Memory is shared by default.** Every agent run writes to shared memory. The team sees what happened. No agent operates in a private silo.

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

**Rule**: Each diamond must close before the next opens. We do not develop solutions to undefined problems.

---

## 4. Agent Team Design Rules
_Specific to Duble//Slash — how we think about agent team structure._

- Every team needs a **coordinator agent** responsible for task routing and human escalation
- Every agent needs a **defined scope**: what it can do, what it cannot do, and what triggers escalation
- Communication channels are configured per-agent, not per-project
- Loops must have an explicit **off-condition** or review cadence — a loop with no exit is a liability
- A team of 1 agent is valid. Do not require teams.
- Agent scope must not overlap without a named tie-break rule
