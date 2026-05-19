---
name: Fish Model — method catalog (runtime)
description: Every method a Fish-Model agent may run. Each carries an ai-mode (how AI and human interact) and a skill contract. The taxonomy is built around four interaction modes — not a binary of "AI helps or doesn't."
type: methodology-runtime
status: complete · 2026-05-02 · full catalog classified across all 12 buckets
---

# Fish Model — method catalog (runtime)

> The Fish Model spec in [`fish.md`](./fish.md) tells a human *what to do*.  
> This file tells an agent *how to do it alongside the human* — and tells the human what kind of collaboration to expect.

---

## 1. The four `ai-mode` values

Every method carries one `ai-mode`. The mode describes the **shape of human-AI interaction** during the method act — not just "does AI help", but *when* and *how* relative to the human.

| `ai-mode` | Who runs the act | Agent timing | Human timing |
|---|---|---|---|
| **agent-autonomous** | Agent runs alone. | Does the work — plans, executes, produces the artifact. | Reviews output. Accepts / amends / rejects. |
| **co-piloted** | Human operates in the world. Agent lives inside the session with them, in real time. | Ingests each input as it arrives. Surfaces the next move, question, or risk immediately. | Acts, relays inputs into the session, decides what to do with the next-move nudge. |
| **agent-enabled** | Human runs the live act. Agent is not in the room. | Before: prepares materials, guides, frames. After: synthesizes outputs, structures findings. | During: owns the act entirely — the conversation, the observation, the session. |
| **human-only** | Human entirely. Agent stays out. | Nothing — agent watches state, files outputs if the human shares them, does not insert itself. | Owns the method completely. |

`retired` is a **status on the method** (not a mode) — the method is no longer in active cells; one line says why and what replaced it.

---

### Why co-piloted matters most

The `agent-enabled` model (agent prepares, human acts, agent synthesizes) is what most "AI tools" offer today. It's better than nothing. It's not the moat.

`co-piloted` is the moat. The agent is **live in the session** — reading each interviewee answer, watching each usability click, tracking each design decision as it happens — and surfacing the next move before the human has to stop and think. The human stays present with the other person or the artifact; the agent handles the cognitive overhead of "what do I do next."

This is what `//` activates mid-session. This is what the Context Cloud makes possible.

---

## 2. Skill contract schema

Every **agent-autonomous** and **co-piloted** method carries a full skill contract.  
**agent-enabled** methods carry a partial contract (prep inputs + synthesis outputs only).  
**human-only** methods carry no contract — agent has no executable role.

```
runs-on:     [artifact types this method takes as input]
inputs:      { required + optional fields the caller supplies }
outputs:     { typed artifact(s) produced — feeds artifacts.md }
done-when:   explicit completion criterion the agent is held to
posture:     how the agent behaves — autonomous or co-pilot cadence
```

---

## 3. Reference methods — five, one per interaction mode + one retired

These are the pattern contracts. Every method in §4 matches one of these shapes.

---

### 3.1 `affinity-clustering` · agent-autonomous
*§8.3 Analysis & sense-making*

**Phase:** E → S · **Archetypes:** Salmon · Willy (standard); Tuna (optional)

**One-line:** Cluster raw research inputs into labeled themes that Solidify can act on.

```
runs-on:   transcript | notes-doc | nugget-board | raw-findings-set
inputs:
  findings        [list, required]  — raw notes, quotes, observations; min 10
  framing_q       string, optional  — the question clustering should answer
  cluster_style   affinity | opportunity | action | cognitive (default: affinity)
outputs:
  affinity-map.md
    — N clusters (N = sqrt count, min 3); each: name, 1-line insight, members
    — cross-cluster tensions
    — 3–5 HMW reframes tied to specific clusters
    — confidence flag if < 10 inputs
done-when:
  every finding assigned, no cluster < 2 findings, HMWs present
posture:
  Runs without asking permission. States inferred framing_q if absent.
  Surfaces only genuine ambiguity — proposes merges, doesn't guess.
```

**Why:** Structure + breadth at scale — AI does this better than humans. 4-hour sticky-note workshop → 5-minute agent run. Human decides what the themes mean for the brief.

---

### 3.2 `user-interviews` · co-piloted
*§8.1 Generative research*

**Phase:** E · **Archetypes:** Salmon · Willy (standard); Tuna (optional); skip Nemo

**One-line:** 1:1 discovery conversations. Agent builds the session, handles outreach, and runs live — human conducts the conversation.

```
--- PRE-SESSION ---
inputs:
  card_brief          required — problem framing + sigil
  participant_profile required — who, what context
  prior_interviews    optional — to avoid re-covering ground
outputs:
  interview-guide.md
    — objective, outreach message, opener script
    — 6–10 behavioral / past-event questions (Mom Test posture)
    — 2–3 probe branches per question
    — explicit no-go list (leading questions, hypotheticals)
    — time budget per section

--- LIVE SESSION (co-piloted loop) ---
inputs (per exchange):
  interviewee_answer  string — human pastes / dictates what was just said
  current_question    string — question that produced this answer
outputs (per exchange):
  next_move  one of: [next-question] | [probe] | [pattern-flag] | [time-check] | [close]

--- POST-SESSION ---
inputs:   transcript or audio
outputs:
  interview-synthesis.md
    — direct quotes (≥5), atomic nuggets, JTBD statements, cross-session patterns
    — follow-up questions for the next session
done-when (live): agent responds to every relayed answer; never leaves human without a next-move
done-when (post): every synthesis claim ties to a quote + timestamp
posture:
  PRE: Agent writes guide + outreach. Human reviews, sends, schedules.
  LIVE: Human is present with interviewee; agent is invisible to interviewee.
  Human relays each answer. Agent returns next move. Human deviates freely — 
  agent adapts, never corrects.
  POST: Agent produces synthesis. Human interprets.
```

---

### 3.3 `usability-testing` · co-piloted
*§8.8 Validation & usability*

**Phase:** B · R · **Archetypes:** Salmon · Willy (standard); Tuna (optional)

**One-line:** Observe users completing tasks. Agent reads the session live, flags friction in real time, produces the report.

```
--- PRE-SESSION ---
inputs: artifact_ref, AC list, participant_profile, task_set (optional — agent infers from AC)
outputs: test-plan.md — task scripts, think-aloud instructions, observer prompts, time budget

--- LIVE SESSION ---
inputs (per event):
  event    screen-change | user-statement | pause | error | completion
  context  brief description
outputs (per event):
  [log] | [probe] | [friction-pattern] | [task-done] | [time-check]

--- POST-SESSION ---
outputs:
  usability-report.md
    — per-task: success rate, time-on-task, friction events
    — top 3 findings: severity, evidence, fix direction
    — AC coverage: passed / failed / inconclusive
    — recommended next action (specific, not "consider improving")
done-when: every AC mapped to a result, every friction event evidenced, next action named
posture:
  LIVE: Agent returns one signal per event. Human decides whether to probe or continue.
  Agent is never visible to the user being tested.
```

---

### 3.4 `contextual-inquiry` · agent-enabled
*§8.2 Observation & ethnographic*

**Phase:** E · **Archetypes:** Willy (standard); Salmon (optional)

**One-line:** Observation of a user in their real work environment. Agent prepares the protocol and synthesizes notes; researcher is physically present — agent is not.

```
PRE: card + participant-profile → inquiry-protocol.md
  (observation goal, focus areas + prompts, note-taking template, ethics checklist)
POST: field-notes → field-synthesis.md
  (key observed moments, workarounds, surprising findings not in the protocol)
done-when (post): every workaround documented; at least one finding outside the focus areas
  (if all findings are focus-area confirmations, agent flags it — often means 
   researcher didn't look broadly enough)
```

**Why human-only during the act:** the moment a user sees an AI interface, they explain themselves to it instead of doing their work naturally. The observation is corrupted. Agent enabled on both sides; out in the middle.

---

### 3.5 `estimation-ceremony` · RETIRED
*§8.5 Strategy / prioritization*

**Replaced by:** agent-autonomous RICE / WSJF scoring — agent reads brief + AC, estimates complexity, surfaces assumptions. Human calibrates in one conversational turn.

**Why retired:** Planning poker and WSJF-as-ceremony existed to force collective estimation and surface disagreement. In AI-era teams, the agent produces a structured first-pass estimate that reveals the same disagreements. What remains is a short conversation — not a multi-hour ritual. The scoring formulas (WSJF, RICE, Kano) remain in the catalog as `agent-autonomous` computations. The ceremony is dead.

---

## 4. Full method catalog

Every method from fish.md §8, fully classified. Tables are the standard view. Co-piloted methods get a `LIVE LOOP` spec (abbreviated from the reference contract pattern). Retired methods have a one-line reason.

---

### 4.1 Generative research

*Dominant ai-mode: co-piloted.* Research conversations are human acts — the agent can't be in the room with a user. But the cognitive overhead of "what do I ask next?" is exactly what the agent handles live. The live loop runs in every generative conversation.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| User interviews | **co-piloted** | E | See §3.2 — reference method |
| JTBD interviews | **co-piloted** | E, S | Probe the "job" a user hires the product for; agent surfaces which JTBD dimension is being revealed per answer |
| The Mom Test interviews | **co-piloted** | E | Behavioral / past-event questions only; agent flags in real time when a question drifts into leading or hypothetical territory |
| Continuous discovery interviews | **co-piloted** | E (ongoing) | Weekly customer contact woven into the workflow; agent maintains a running synthesis across sessions, surfaces emerging patterns after each one |
| 5 Whys | **co-piloted** | E, S | Iterative why-chain; agent tracks the chain, flags circular reasoning, and suggests the next "why" when the human is unsure how deep to go |
| What's on your radar | **agent-autonomous** | E | Agent generates a ranked radar of topics from the brief + context; human edits the radar before presenting to a participant |
| Statement starters | **agent-autonomous** | E | Agent generates prompt sentences from the brief ("What I need is…", "I wish I could…"); human selects and uses them in the session |
| Critical reading checklist | **agent-autonomous** | E, S | Agent runs structured bias + method-fit + applicability checks against a research doc; surfaces gaps, not just confirms quality |

**LIVE LOOP — JTBD interviews**
```
per input:  interviewee answer + the JTBD dimension being probed
            (functional / emotional / social / not yet determined)
per output: [next-probe] — the follow-up that sharpens the JTBD statement
            [jtbd-draft] — a candidate JTBD framing to test with the next question
            [dimension-shift] — "this answer reads as social, not functional — test that"
```

**LIVE LOOP — The Mom Test interviews**
```
per input:  draft question the human is about to ask
per output: [safe] — question passes Mom Test; proceed
            [flag] — specific problem named (e.g., "this asks about the future; 
                     rephrase as: 'last time you had to do X, what did you do?'")
            [rewrite] — suggested safe version of the question
```

**LIVE LOOP — 5 Whys**
```
per input:  latest "because…" answer in the why-chain
per output: [next-why] — the specific next "why" to ask, shaped to the answer
            [root-reached] — evidence that this is a root cause, not a symptom
            [loop-warning] — "this answer restates the original problem; the chain 
                             may be circular — try a different branch"
```

---

### 4.2 Observation & ethnographic

*Dominant ai-mode: agent-enabled.* Physical presence is the method. The agent cannot go to someone's home or office. It prepares the researcher to look for the right things, and synthesizes what they bring back.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| Contextual inquiry | **agent-enabled** | E | See §3.4 — reference method |
| Fly on the wall | **agent-enabled** | E | Passive observation; agent prepares focus areas, synthesizes field notes post-session |
| Walk-a-mile immersion | **human-only** | E | Designer does the user's task themselves end-to-end; must be done personally — no proxy or simulation preserves the experience |
| Observations | **agent-enabled** | E | Watch users without interviewing; agent prepares observation protocol, synthesizes time-stamped notes |
| Journaling / diary studies | **agent-enabled** | E | Longitudinal self-recording by participants; agent designs the journal prompts, synthesizes entries as they come in, surfaces patterns across participants |
| Secondary research | **agent-autonomous** | E | Literature scan, analytics review, prior-art audit; agent runs the full desk research pass and produces a structured summary |

---

### 4.3 Analysis & sense-making

*Dominant ai-mode: agent-autonomous.* Clustering, triangulating, diagramming — all structural pattern work. AI is faster and more thorough than any human doing this at a desk. The 4-hour workshop becomes a 10-minute agent run.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| Affinity clustering | **agent-autonomous** | E→S | See §3.1 — reference method |
| Nugget board | **agent-autonomous** | E→S | Agent extracts atomic findings from transcripts and tags each as behavior / pain / context / goal; produces a structured nugget-board.md the team can query |
| Concept mapping | **agent-autonomous** | E, S | Agent builds a node-and-edge diagram of how ideas relate from a findings set; surfaces connections the human may not have seen |
| Abstraction laddering | **co-piloted** | E, S | Move up/down between general and specific problem formulations; agent suggests the next rung live as human works through the ladder |
| Problem tree analysis | **agent-autonomous** | E, S | Agent decomposes a problem into causes and effects from the brief + findings; produces a tree the human reviews and amends |
| Experience diagramming | **agent-autonomous** | E, S | Agent generates a timeline of the user's lived experience across a period of use from research inputs |
| Statement analysis | **agent-autonomous** | E, S | Agent parses raw customer statements into need / want / job / expectation categories; table output feeds framing |
| Action analysis | **agent-autonomous** | S | Agent decomposes user actions required by a flow from brief + flow description; produces ordered action-task list |
| Cognitive analysis | **agent-autonomous** | S | Agent maps cognitive load at each step of a flow from the design / brief; flags high-load points with severity |
| Triangulation | **agent-autonomous** | E, S | Agent cross-references multiple independent sources (interviews, analytics, observations) to validate or challenge a finding; flags findings supported by only one source |

**LIVE LOOP — Abstraction laddering**
```
per input:  current framing of the problem (can be specific or abstract)
per output: [up] — a more abstract reframe ("you said 'fix the button label'; 
                   abstracting up: 'improve navigation confidence'")
            [down] — a more specific reframe ("you said 'improve the experience'; 
                     narrowing down: 'what specifically triggers the drop-off?'")
            [check] — "this ladder has three rungs; is this the level you want to 
                      design from, or do you want to go higher / lower?"
```

---

### 4.4 Framing & modeling

*Dominant ai-mode: agent-autonomous for structural models (maps, diagrams, canvases); co-piloted where the framing emerges through conversation.* Personas are a special case — living documents that the agent updates from new evidence, not static docs filed and forgotten.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| HMW — How Might We | **agent-autonomous** | E→S | Agent generates HMW reframes from a problem statement; produces a list the human ranks and narrows |
| Problem framing | **co-piloted** | S | Sharpen a vague problem into one canonical sentence; agent suggests framings live as human reacts |
| Personas | **co-piloted** | E (create), S (apply) | Agent drafts initial personas from research; updates them in session as new evidence arrives — never static |
| Goal-Directed Design | **agent-autonomous** | E, S | Agent populates End / Experience / Life goals per persona from the research synthesis |
| JTBD framing | **agent-autonomous** | E, S | Agent produces functional / emotional / social JTBD statements from interview synthesis |
| OSD — Operational Sequence Diagram | **agent-autonomous** | E, S | Agent generates a swim-lane of the journey across stakeholders and time from a described flow |
| Journey mapping | **agent-autonomous** | E, S | Agent drafts persona's end-to-end path across touchpoints from synthesis; human amends with nuance |
| Service blueprint | **agent-autonomous** | E, S | Agent extends a journey map with backstage operations and supporting processes |
| Stakeholder mapping | **agent-autonomous** | E | Agent builds the interest + influence map from the brief context and any named stakeholders |
| Empathy map | **agent-autonomous** | E, S | Agent generates the says / thinks / does / feels quadrant per persona from research synthesis |
| Scenario planning | **agent-autonomous** | E, S | Agent writes happy path + alternative branches + worst case from problem framing |
| Home position | **human-only** | E | The personal stance the researcher returns to when disoriented; agent cannot determine orientation on the human's behalf |
| Problem simplification | **co-piloted** | E, S | Reduce a multi-dimensional problem to a solvable version; agent suggests decompositions live as human scopes |
| Mental vs. conceptual model gap | **agent-autonomous** | S, B | Agent identifies the delta between user expectation (from research) and system behavior (from design / brief) |
| Spectrum mapping | **agent-autonomous** | S | Agent places candidate solutions on tradeoff axes from the brief's option set |

**LIVE LOOP — Problem framing**
```
per input:  a draft problem statement or reaction to a previous framing
per output: [sharper] — a more precise version ("too broad: 'improve UX'; 
                        narrower: 'reduce time-to-first-success for new users on step 3'")
            [scope-check] — "this framing implies Willy-sized scope; the sigil says Tuna — 
                            is the scope right or is the sigil wrong?"
            [lock] — "this statement is specific + testable; ready to carry into Solidify"
```

**LIVE LOOP — Personas**
```
per input:  new evidence (interview quote, observation note, analytics data point)
per output: [update] — specific change to the persona: which field, old value, new value
            [new-persona] — evidence suggests a distinct user type not in the current set
            [tension] — "this finding contradicts the current persona goal; 
                        surface it or amend the persona?"
```

---

### 4.5 Strategy, prioritization, business framing

*Dominant ai-mode: agent-autonomous for frameworks and scoring; human-only for bets and political decisions.* The key split: agent can compute and populate any framework; agent cannot decide which bet to make or navigate stakeholder priorities.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| Lean canvas | **agent-autonomous** | E, S | Agent fills all 9 boxes from brief + research; flags any box with low confidence |
| Business Model Canvas | **agent-autonomous** | E, S | Same as Lean canvas — agent populates, human amends |
| Value proposition canvas | **agent-autonomous** | E, S | Agent maps product to customer jobs / pains / gains from brief + JTBD synthesis |
| 5 forces | **agent-autonomous** | E | Agent runs a Porter's 5 forces analysis from brief + secondary research |
| PESTEL analysis | **agent-autonomous** | E | Agent scans political / economic / social / technological / environmental / legal landscape from brief context |
| SWOT | **agent-autonomous** | E, S | Agent populates SWOT from all available context; surfaces gaps where evidence is thin |
| Kano model | **agent-autonomous** | S | Agent classifies features as threshold / performance / delighter from user research synthesis |
| MoSCoW | **agent-autonomous** | S | Agent prioritizes from brief + AC; surfaces any must-have that's unshipped |
| RICE scoring | **agent-autonomous** | S | Agent computes reach × impact × confidence / effort from inputs; human adjusts weights |
| WSJF (formula) | **agent-autonomous** | S | Agent computes weighted shortest job first scores; ceremony retired (see §3.5) |
| Impact mapping | **agent-autonomous** | S | Agent builds goal → actor → impact → deliverable tree from brief |
| Opportunity solution tree | **co-piloted** | E, S | Build the outcome → opportunities → solutions → experiments tree as ideas emerge; agent adds branches in real time |
| Importance / difficulty matrix | **agent-autonomous** | S | Agent places items on the 2×2 from brief estimates; human adjusts placement |
| Bull's-eye diagramming | **agent-autonomous** | S | Agent places candidate features in must-have / maybe / not-now rings from brief + research |
| Visualize the vote | **agent-enabled** | S | Human team votes; agent tabulates and visualizes the distribution |
| Rose / thorn / bud | **co-piloted** | E (review), R (retro) | Team shares observations live; agent synthesizes patterns in real time — see §4.10 |
| Shape Up pitch | **agent-autonomous** | S | Agent drafts the 5-part bet: problem / appetite / solution / rabbit holes / no-gos from the brief |
| Betting table | **human-only** | S | Strategic bet-selection at a fixed cadence; agent can prepare context for the table but the bet decision is political and human |
| Hill chart | **co-piloted** | B | Track figuring-it-out / making-it-happen per deliverable; agent updates the chart live as human reports progress |

**LIVE LOOP — Opportunity solution tree**
```
per input:  a new opportunity, solution idea, or experiment the human names
per output: [place] — where on the tree this belongs (outcome / opportunity / solution / experiment)
            [link] — "this solution addresses opportunity X; link it?"
            [gap] — "you have 3 solutions for opportunity A and none for B — worth exploring B"
            [prune] — "this solution overlaps with Y; consolidate or distinguish?"
```

**LIVE LOOP — Hill chart**
```
per input:  progress update on a deliverable ("we figured out the auth flow; building now")
per output: [move] — updated position on the hill (figuring → making, or regression)
            [risk] — "this deliverable has been on the left side of the hill for 3 updates; 
                      what's blocking the shape?"
            [summary] — on request: full chart state across all deliverables
```

---

### 4.6 Ideation

*Dominant ai-mode: co-piloted.* Ideation is generative and social — the human's creative instinct and context is the fuel; the agent's job is to keep the divergence going and surface directions the human hasn't tried. The agent doesn't dominate; it expands.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| Brainstorming | **co-piloted** | E, S, B | Agent generates variations alongside the human in real time; expands on each idea the human names, never evaluates in divergence mode |
| Crazy 8s / Crazy 6 | **co-piloted** | S, B | Agent generates 8 distinct directions in parallel as human sketches; offers directions human hasn't tried |
| Design Sprint | **agent-enabled** | E→S→B | 5-day cycle; agent prepares each day's brief and templates, synthesizes outputs; human runs the sessions |
| Co-creation | **agent-enabled** | E, S, B | Ideation with real users in the room; agent prepares workshop materials and templates, human facilitates, agent synthesizes choices and decisions after |
| Round robin | **agent-enabled** | S, B | Structured turn-taking; agent prepares the seed idea and the rotation structure, synthesizes the built-up output |
| Alternative worlds | **co-piloted** | S, B | Agent embodies different brand / company personas in real time ("how would Apple solve this?") and generates from that lens on demand |
| SCAMPER | **agent-autonomous** | S, B | Agent applies each lens (substitute / combine / adapt / modify / put-to-other-use / eliminate / reverse) to the artifact; produces a candidates table |
| 6 thinking hats | **co-piloted** | E, S | Agent takes on each hat live and surfaces its perspective; human steers which hat to engage |
| Creative matrix | **agent-autonomous** | S, B | Agent fills the 2-axis grid with ideas for each combination; human selects and develops |
| Design studio method | **agent-enabled** | S, B | Structured group-sketching session; agent prepares briefs + critique prompts, synthesizes sketch directions after each round |
| Whiteboard session | **co-piloted** | E, S | Agent reads what the human describes or shares from the whiteboard and suggests next branches, connections, or contradictions |
| Symmetry / pattern recognition | **agent-autonomous** | S | Agent scans parallel interfaces and design patterns for structural analogies to the problem at hand |
| Marathons | **agent-enabled** | B | Multi-day deep work block; agent sets up context at the start, synthesizes outputs at the end; human owns the sustained work |
| Reversed solutions | **agent-autonomous** | B | Agent generates "how to make this worse" list from the brief; inverts each item to surface non-obvious fix directions |
| "No boundaries" | **co-piloted** | B | Agent generates unconstrained, feasibility-free variations alongside human; no evaluation, only expansion |

**LIVE LOOP — Brainstorming**
```
per input:  idea or direction the human names
per output: [expand] — 2–3 variations on the idea without evaluation
            [orthogonal] — a direction that doesn't extend the current cluster 
                           ("you've been exploring simplification; here's a complexity-embracing version")
            [combine] — "idea 3 + idea 7 haven't been combined; try it"
            [cluster] — on request: group all ideas named so far by theme
```

**LIVE LOOP — 6 thinking hats**
```
per input:  hat color requested by human (or situation that calls for a hat)
per output: [white] — facts and data about the problem, no interpretation
            [red] — emotional response, instinct, gut reaction
            [black] — risks, downsides, reasons it won't work
            [yellow] — optimism, best case, reasons it will work
            [green] — creative alternatives, new angles
            [blue] — process: what should we be doing right now in this session?
```

---

### 4.7 Prototyping & shaping

*Dominant ai-mode: mixed.* Agent-autonomous for structural artifacts (storyboards, schematics, microinteraction specs). Co-piloted for iterative design reviews. Human-only for physical acts (paper prototyping, experience prototyping). The key rule: if the prototype can be described, the agent can draft it; if it must be physically enacted, the human does it.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| Iterative prototyping | **co-piloted** | S, B | Agent suggests the next iteration direction after each review pass |
| Storyboarding | **agent-autonomous** | S | Agent generates sequential frame descriptions bridging journey map and UI from the brief |
| Thumbnail sketching | **agent-enabled** | S | Human sketches; agent evaluates directions and suggests unexplored angles after each round |
| Cover story mock-up | **agent-autonomous** | S | Agent drafts the "future press release" from brief + vision |
| Concept poster | **agent-autonomous** | S | Agent drafts the one-page concept visualization from brief |
| Video scenario | **agent-enabled** | S, B | Agent scripts the walkthrough; human produces and records |
| Schematic diagramming | **agent-autonomous** | S, B | Agent generates block-and-arrow system diagrams from the described flow or brief |
| Rough & ready prototyping | **agent-enabled** | B | Human builds; agent evaluates fidelity against the brief and flags over-investment |
| Fake prototypes | **agent-autonomous** | B | Agent produces a minimal-fidelity Figma mock or HTML shell from the brief; enough shape to validate without full build |
| Paper prototyping | **human-only** | B | Pencil-and-paper UI with a human operator; physical act with no agent equivalent |
| Wizard of Oz prototyping | **agent-enabled** | B | Agent scripts the wizard's responses and branching logic; human plays the wizard during testing |
| Experience prototyping | **human-only** | S, B | Enact the experience physically; must be done in the real world — no digital equivalent |
| Build your own | **agent-enabled** | B | Participants build their ideal version; agent analyzes choices and surfaces patterns post-session |
| Quick reference guide | **agent-autonomous** | S | Agent generates a one-page summary from existing docs in the card |
| Microinteractions | **agent-autonomous** | S, B | Agent specifies trigger / rules / feedback / loops+modes from the brief; includes timing (100–500ms) and easing curves |
| HTA — Hierarchical Task Analysis | **agent-autonomous** | S, B | Agent decomposes tasks into sub-goals from the brief and flow description |
| Motion principles | **agent-autonomous** | B | Agent applies standard motion rules (duration, easing, restraint) to design; flags animations that violate conventions |
| Component library strategy | **agent-enabled** | S, B | Agent prepares recommendations with rationale; designer + dev make the decision together |
| Shared-tool workflow | **human-only** | S, B | Team process and tooling decision; cultural and political — agent can inform but not decide |
| Joint product reviews | **co-piloted** | S, B | Agent live-reads the design against brief + AC during the review session |
| Integrated requirements process | **agent-enabled** | S, B | Agent prepares the conceptual model and requirements mapping; designer + dev discuss live |
| Thin vertical slice | **agent-autonomous** | B | Agent identifies the minimum vertical slices from the AC list and orders them by user-visible value |

**LIVE LOOP — Iterative prototyping**
```
per input:  design review feedback or reaction to the current prototype state
per output: [next-direction] — the specific change that addresses the highest-priority feedback
            [scope-check] — "this feedback implies re-opening the shape — is that intended, 
                            or is this a Build-level adjustment?"
            [pattern] — "the last 3 reviews all flagged the same navigation issue; 
                        the fix should be structural, not cosmetic"
```

**LIVE LOOP — Joint product reviews**
```
per input:  observation made during the review ("the empty state doesn't match the brief")
per output: [ac-check] — maps the observation to an AC line: which AC does this affect?
            [scope] — "this is in-brief / out-of-brief; proceed / surface to Solidify"
            [severity] — classification: must-fix before Ship / fix before next review / deferred
            [log] — adds to review-notes.md automatically
```

---

### 4.8 Validation & usability

*Dominant ai-mode: co-piloted for live sessions; agent-autonomous for heuristic / analytical methods.* Any method where a human participant is in the room runs co-piloted. Any method that can be run against an artifact without a participant runs agent-autonomous.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| Usability testing | **co-piloted** | B, R | See §3.3 — reference method |
| Concept testing | **co-piloted** | S | Test a low-fi concept with a user before committing to the shape; same live-loop structure as usability testing, with concept-specific probes |
| Think-aloud testing | **co-piloted** | B, R | Participant verbalizes thoughts while completing tasks; agent processes each verbalization live and flags insights |
| First-click testing | **agent-autonomous** | B, R | Agent runs first-click measurement against a Figma prototype or live URL; reports click distribution vs. intended target |
| Tree testing | **agent-autonomous** | S, B | Agent runs IA findability test; measures whether users can locate items through the structure |
| Card sorting | **agent-enabled** | E, S | Participants sort; agent analyzes patterns across participants and produces a category grouping map |
| First impression test | **agent-enabled** | B, R | Participants react in 5–10 seconds; agent analyzes verbal / written reactions for themes |
| Eye tracking | **agent-enabled** | R | Specialized hardware; agent analyzes recorded gaze data if provided, surfaces attention patterns |
| Heuristic evaluation | **agent-autonomous** | E, R | Agent audits an interface against Nielsen-10 (or custom set); produces severity-rated findings table with evidence |
| Effectiveness / Efficiency / Satisfaction (ISO 9241) | **agent-autonomous** | R | Agent measures the post-ship triad from instrumentation data and session recordings |
| Hick's Law | **agent-autonomous** | S, B, R | Agent applies the heuristic to any screen with multiple choices; flags excessive option count |
| Fitts's Law | **agent-autonomous** | S, B | Agent checks target size and distance for key interactive elements |
| Recognition over recall | **agent-autonomous** | S, B | Agent audits the interface for cases where users must recall rather than recognize; flags each instance |
| Competitor / pattern scan | **agent-autonomous** | E | Agent surveys parallel interfaces; notes conventions and meaningful deviations |
| Premortem | **co-piloted** | E, S | Imagine shipped-and-failed; agent generates failure scenarios in real time as human adds domain knowledge |

**LIVE LOOP — Think-aloud testing**
```
per input:  verbalization from the participant ("I'm not sure where to click here")
per output: [insight] — tagged observation: friction / confusion / delight / recovery
            [probe] — "ask: what would you expect to happen if you clicked that?"
            [pattern] — "second verbalization about navigation; emerging theme"
```

**LIVE LOOP — Premortem**
```
per input:  one failure scenario the human names (or trigger: "generate some")
per output: [scenario] — a detailed failure story if generating
            [cause-tree] — root causes behind the named scenario
            [inversion] — "to prevent this: what must be true at Ship?"
            [priority] — "3 scenarios named so far; this one has the highest probability — 
                         address it in the brief?"
```

---

### 4.9 Release & measurement

*Dominant ai-mode: agent-autonomous.* Instrumentation, measurement plans, rollout strategies, changelogs — all structural work that AI executes precisely and without fatigue. Human judgement owns the decision to ship and the interpretation of what the numbers mean.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| Acceptance criteria | **agent-autonomous** | S | Agent drafts INVEST-compliant AC from the brief; each criterion independently verifiable |
| Measurement plan | **agent-autonomous** | S | Agent writes baseline + target + instrumentation from the brief; flags any metric without a clear capture mechanism |
| Baseline measurement | **agent-autonomous** | R | Agent captures metric values before the release window; stores as `baseline.md` |
| Post-release measurement | **agent-autonomous** | R | Agent measures the same metrics after the release window; produces delta report |
| Fake door testing | **agent-autonomous** | S, R | Agent designs the fake door entry point and measurement setup from the brief |
| Smoke testing | **agent-autonomous** | R | Agent designs the minimal cohort test; defines pass/fail criteria from AC |
| Concierge test | **agent-enabled** | R | Human manually delivers the service; agent scripts the delivery and synthesizes reactions |
| Private preview | **agent-enabled** | R | Human manages the select cohort; agent prepares materials and synthesizes feedback |
| Beta group | **agent-enabled** | R | Human manages the opt-in cohort; agent synthesizes feedback themes as they arrive |
| Canary release | **agent-autonomous** | R | Agent designs the staged rollout strategy and automated rollback criteria; engineering executes |
| A/B test | **agent-autonomous** | R | Agent designs variants, sample size, and success metrics; engineering executes |
| Feature flags | **agent-autonomous** | B, R | Agent specifies flag configuration and rollout schedule from the measurement plan |
| Feedback loops | **co-piloted** | R | Agent synthesizes incoming feedback in real time as it arrives from users; surfaces emerging themes and urgent signals |
| Heat maps | **agent-autonomous** | R | Agent analyzes click / attention / scroll-depth data; flags deviations from designed intent |
| Session replay | **agent-autonomous** | R | Agent reviews recorded sessions and surfaces friction patterns, rage clicks, and abandonment triggers |
| Customer advisory board | **agent-enabled** | R, E | Human facilitates the forum; agent prepares questions from current open uncertainties, synthesizes the discussion |
| Theater screen | **agent-enabled** | R | Human presents; agent prepares the walkthrough script and synthesizes audience reactions |

**LIVE LOOP — Feedback loops**
```
per input:  one feedback item as it arrives (support ticket, NPS comment, review, DM)
per output: [tag] — category: bug / confusion / feature-request / delight / churn-risk
            [pattern] — "5th item this week mentioning the onboarding step 3; emerging signal"
            [urgent] — flags items that signal imminent churn or critical failure
            [queue] — on request: full synthesized list of themes for the next Explore loop
```

---

### 4.10 Retrospective & learning

*Dominant ai-mode: co-piloted.* Retros are conversations — team members speak, agent synthesizes in real time and names patterns the team might not see themselves. The ceremony is not the point; the insight extraction is.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| Retrospective (plain) | **co-piloted** | R | Team speaks; agent synthesizes themes, names patterns, and proposes one action item per theme in real time |
| Rose / thorn / bud | **co-piloted** | R | Same live-loop as plain retro; structure is positives / negatives / opportunities |
| Sailboat retrospective | **retired** | — | Visual ceremony (wind / anchors / rocks / island) replaced by co-piloted plain retro — same insights, no props |
| Start / stop / continue | **co-piloted** | R | Agent builds the three buckets live as team members contribute; surfaces conflicts between what's named in different buckets |
| 4Ls | **co-piloted** | R | Agent synthesizes liked / learned / lacked / longed-for in real time; surfaces the delta between what was liked and what was longed-for as the key tension |
| Futurespective | **co-piloted** | R, E | Agent generates future-state scenarios; human refines them; agent reverse-engineers what had to be true to get there |
| Mad / sad / glad | **retired** | — | Emotional-register ceremony replaced by learning log + co-piloted retro; standalone ceremony adds no value in AI-era teams |
| Learning log | **agent-autonomous** | R | Agent maintains continuously from all session outputs across the card lifecycle; human reviews at Ship |
| Next-loop queue | **agent-autonomous** | R | Agent curates explicit follow-ups for the next Explore from the learning log; produces a prioritized queue |

**LIVE LOOP — Retrospective (shared pattern for all co-piloted retros)**
```
per input:  one observation from a team member (what happened, what they felt, what they'd change)
per output: [log] — adds to the retro notes
            [pattern] — "this echoes the theme from two observations earlier"
            [tension] — "this 'stop' contradicts what was named as a 'rose' by a different team member"
            [action] — when a theme has ≥3 observations, proposes one specific action item
```

---

### 4.11 Narrative, brief, documentation

*Dominant ai-mode: agent-autonomous.* Drafting, structuring, and versioning — all agent territory. The human writes nothing from scratch; the agent produces the first draft from context, and the human shapes it. Every artifact the agent produces feeds the artifact graph in `artifacts.md`.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| Brief (not PRD) | **agent-autonomous** | S | One-page structure: Problem / Journey / Shape / AC / Deferred — agent drafts from Solidify inputs; replaces PRD |
| Micro-brief | **agent-autonomous** | S | One-paragraph brief for Nemo and Tuna cards; agent produces from Explore handoff |
| Pitch / RFC | **agent-autonomous** | S | Longer Willy shape doc with tradeoffs, alternatives, decision log — agent drafts, human fills in political context |
| Decision log | **agent-autonomous** | S | Agent records every major decision with reasoning and alternatives as it's made; append-only |
| ADR — Architecture Decision Record | **agent-autonomous** | S, B | Agent produces one ADR per significant technical decision using standard format |
| Journey meetings | **agent-enabled** | S, R | Human-facilitated; agent prepares the agenda organized around a user journey, synthesizes decisions after |
| Design-system extension | **agent-autonomous** | S, B | Agent proposes new primitives with justification; flags any addition that duplicates an existing component |
| Changelog entry | **agent-autonomous** | R | Agent writes a journey-structured, audience-appropriate changelog entry from the Ship handoff |
| Release notes | **agent-autonomous** | R | Agent produces short-form, audience-appropriate release summary |
| Trust receipt | **agent-autonomous** | R | Agent's own output: signed summary of what shipped, what was redacted, who approved; append-only; never edited after creation |

---

### 4.12 Handoff & process

*Dominant ai-mode: agent-autonomous.* These are the Fish Model's plumbing. The handoff block, sigil assist, and stream recap are things agents produce and consume directly. Sigil assist and handback are the two co-piloted exceptions — they happen in live conversation with the human.

| Method | ai-mode | Phases | One-line |
|---|---|---|---|
| `<fish-handoff>` | **agent-autonomous** | all | The universal phase-transition block; emitted by the agent at every phase exit; carries context to the next phase, session, or collaborator |
| Sigil assist | **co-piloted** | E (opening) | First 5 minutes of Explore; agent helps the human settle on a sigil through a structured conversation |
| Stream recap | **agent-autonomous** | all | Short narrative at phase exit: which stream steps ran, which were deferred, why |
| Handback | **co-piloted** | all | Reverse transition; agent facilitates the conversation that names what went wrong and what phase to return to |
| `//project-status` view | **agent-autonomous** | all | On-demand consolidated card view: every phase's brief + evidence + decisions + trust receipts, assembled by the agent |

**LIVE LOOP — Sigil assist**
```
per input:  human's answer to a familiarity or scope question
per output: [certainty-check] — "you said you've done similar work before — is the user 
                                 group the same? if not, certainty is unknown"
            [size-check] — "this touches 4 screens and 2 user types; likely bigger"
            [sigil-proposal] — "based on your answers: certainty=unknown, size=bigger → Willy. 
                               Does that feel right?"
            [lock] — sigil confirmed; record it and start the Explore stream
```

**LIVE LOOP — Handback**
```
per input:  what the human observes that requires going back (e.g., "Build revealed we 
            never validated the core assumption")
per output: [destination] — which phase to return to and why
            [handback-block] — a `<fish-handback>` artifact naming: current phase, 
                               destination phase, gap identified, evidence, instructions 
                               for the receiving phase
            [scope-check] — "this handback implies a sigil change from Nemo to Salmon; 
                            confirm before re-entering Explore"
```

---

## 5. How this connects out

- **`fish.md` §6 matrix** names methods per (archetype × phase) cell. Every name there resolves to an entry in §4 above.
- **`artifacts.md`** types every output a skill contract produces. Nothing in `outputs:` is valid unless it's a node in the artifact graph.
- **`projections.md`** describes how each artifact lands on the Fish Kanban (native) and external surfaces (Jira, Figma, Slack — foreign adapters).
- **Local agents** (`local-agents/`) and **system agents** (`system-agents/`) consume skill contracts directly. No per-method bespoke prompts — the contract is the prompt interface.

---

## 6. Status

- **2026-05-02** — full catalog classified. All ~85 methods across 12 buckets. Co-piloted live-loop specs written for all live-session methods.
- **Next:** `artifacts.md` — the typed artifact graph that every `outputs:` field here resolves to.
- **After:** `projections.md` — Fish Kanban spec + foreign adapter contracts.
