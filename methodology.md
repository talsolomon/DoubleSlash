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
- **Behavior before visuals**: Define and prototype behavior before opening a design tool. A code prototype forces complete behavioral specification — you cannot fake an interaction state in code the way you can in a design tool. Visual polish is not the same as solved behavior.

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

## 4. Fish Model — Right-Sizing the Process
_Not every problem deserves the same investment. Classify the work before entering the diamond._

Two questions determine the classification:
1. **How familiar are we?** — Do we know the domain, the users, and the relevant patterns?
2. **How wide is the scope?** — How many flows, components, and dependencies are involved?

| Fish | Familiarity | Scope | Discovery source | Track |
|---|---|---|---|---|
| Nemo | High | Small | AI-led, brief | Agent runs discovery autonomously. Short arc. Prototype → ship. |
| Tuna | High | Large | AI-led, broader | Agent runs deeper research autonomously. User stories required. Figma optional. |
| Salmon | Low | Small | Human-led | Agent designs the research process and directs the user to go talk to real people. Full Problem Diamond. |
| Willy | Low | Large | Human-led, wide | Agent orchestrates multi-stakeholder engagement. Multiple people, multiple rounds. Full both diamonds. |

**Discovery rule**: Discovery always happens — what scales is the source. On Nemo/Tuna the agent IS the researcher. On Salmon/Willy the agent is the director of research — it designs the process and the human collects the signal.

**Rule**: Classify honestly before starting. A Willy treated like a Nemo ships the wrong thing polished. A Nemo treated like a Willy produces process theater.

---

## 5. Phase Completion Criteria — per FISH level
_The agent owns the completion judgment. It measures the current phase against these criteria and advances when they're met — the human does not gate phases. The human approves the next move, not the phase transition._

### DISCOVER complete when:
| FISH | Criteria |
|---|---|
| Nemo | Problem space is understood. Key assumptions are named. AI research sufficient — no signal gaps that would change the direction. |
| Tuna | Problem space is understood with breadth. Competitive landscape mapped. Assumptions documented. No critical unknowns remain. |
| Salmon | Human signal collected. At least one real user / stakeholder consulted. Synthesis complete. Assumptions validated or invalidated against real input. |
| Willy | Multiple stakeholders engaged across relevant perspectives. Patterns across signal sources identified. Contradictions surfaced and resolved or noted. |

### DEFINE complete when:
| FISH | Criteria |
|---|---|
| Nemo | Problem statement exists. Success criteria are specific and measurable. Scope is bounded (what's in, what's out). |
| Tuna | All Nemo criteria + user needs documented. Edge cases named. Constraints captured (time, team, stack). |
| Salmon | All Tuna criteria + validated against human signal. Problem statement has been tested against real user language. |
| Willy | All Salmon criteria + stakeholder alignment confirmed. No open disagreements on what we're solving. |

### DEVELOP complete when:
| FISH | Criteria |
|---|---|
| Nemo | Working prototype or implementation exists. Core interaction is functional. Key edge cases handled. |
| Tuna | All Nemo criteria + Figma or equivalent design artifact if visual. User stories covered. |
| Salmon | All Tuna criteria + tested with at least one real user. Feedback incorporated or explicitly deferred with rationale. |
| Willy | All Salmon criteria + multiple rounds of iteration. Design and technical approach aligned across stakeholders. |

### DELIVER complete when:
| FISH | Criteria |
|---|---|
| Nemo | Shipped. Success criteria from Define measured. Decision log entry written. |
| Tuna | All Nemo criteria + rollout documented. Known issues logged. |
| Salmon | All Tuna criteria + user validation post-ship. Learnings captured in memory. |
| Willy | All Salmon criteria + stakeholder debrief done. Full retrospective written. |

---

## 6. Agent Decision Algorithm
_This is the agent's cognitive loop. It runs at every session open and at every task intake. The agent follows this sequence before producing any output._

### Step 0 — Phase Gate (constitutional rule, always runs first)
Before producing any output on any task, classify:
1. What Double Diamond phase is this task in?
2. Has the previous phase met its completion criteria?

If a prior phase is incomplete → do not advance. Name what's missing and complete it first.
This is not an invoked skill. It is how the agent thinks.

### Step 1 — Read full project state
The agent reads ALL of the following before deciding anything:
- `node-map.md` — phases completed, artifacts produced, current phase
- `kanban.md` — what is actively in flight right now
- `memory.md` — current state, open questions, known constraints
- `decisionlog.md` — closed decisions (never relitigate without explicit flag)
- Project brief — original intent, project type/domain, constraints (deadline, team, stack)
- Signal files — research, interviews, competitive intel (especially Salmon/Willy)

### Step 2 — Confirm or run FISH classification
- If FISH is already classified and confirmed → proceed
- If not → run FISH classification now (familiarity × scope → Nemo/Tuna/Salmon/Willy)
- FISH determines: which phases apply, how deep each goes, who does discovery

### Step 3 — Determine current phase completeness
Using the completion criteria in §5, the agent judges: is the current phase done?
- **Done** → advance to next phase in this FISH arc
- **Not done** → identify the specific gap, execute the next step that closes it
- **Blocked on human input** (Salmon/Willy discovery, stakeholder approval) → surface the exact ask. Name who needs to do what.

### Step 4 — Name one next move
The agent names a single, specific next move. Not a menu. Not options. One move with a reason.

Format: `"[Phase] → [What]. [Why now — one sentence]. Ready?"`

Example: `"Define → requirements spec for the leader-driven session behavior. Discover is complete — we have the full brain model. Ready?"`

### Step 5 — Execute on confirmation
Human says go → execute the move, write outputs to Node Map + memory, advance phase if transition criteria met.
Human deviates → read the deviation. If it's a course correction, adjust and re-run Step 4. If they want to call a specific skill, surface the `/` escape hatch.

### Step 6 — Write state
After every execution:
- Update `node-map.md` with what was produced
- Update `kanban.md` — close completed tasks, open new ones
- Write any new signal or decisions to the appropriate file

---

## 7. Agent Team Design Rules
_Specific to Duble//Slash — how we think about agent team structure._

- Every team needs a **coordinator agent** responsible for task routing and human escalation
- Every agent needs a **defined scope**: what it can do, what it cannot do, and what triggers escalation
- Communication channels are configured per-agent, not per-project
- Loops must have an explicit **off-condition** or review cadence — a loop with no exit is a liability
- A team of 1 agent is valid. Do not require teams.
- Agent scope must not overlap without a named tie-break rule
