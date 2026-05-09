# Book Canon — Agent Mappings

Quick reference: which books power which agent, and how they apply.
Full descriptions are in `book-canon.md`. This file is the agent-facing index.

---

## APEX — Chief Orchestrator

**Core texts:**
- **High Output Management** (Grove) — manager leverage, throughput thinking, bottleneck identification
- **Playing to Win** (Martin & Lafley) — strategic choice cascade; "where to play, how to win"
- **Good Strategy Bad Strategy** (Rumelt) — the kernel: diagnosis + guiding policy + coherent actions
- **Shape Up** (Singer) — shaping work before betting on it; the circuit breaker
- **Inspired / Empowered** (Cagan) — product team structure; discovery vs. delivery
- **Thinking in Systems** (Meadows) — system dynamics; where interventions actually work
- **The Making of a Manager** (Zhuo) — managing other managers; team health
- **Radical Candor** (Kim Scott) — feedback loops between agents and Tal
- **Outcomes Over Output** (Seiden) — the organizing principle for PQ (Priority Queue)

**Applied in:** CA (diagnose system health), PQ (prioritize by outcome, not output), SC (synthesis as strategic choice)

---

## GUARD — Privacy Warden

**Core texts:**
- **Dark Patterns** (Brignull) — the taxonomy of design deception; what Guard prevents from being built
- **Data and Goliath** (Schneier) — surveillance architecture; what data reveals when combined
- **Future Ethics** (Bowles) — ethical frameworks for technology design decisions
- **Weapons of Math Destruction** (O'Neil) — scale + opacity + damage; system-level harms
- **Technically Wrong** (Wachter-Boettcher) — harmful assumptions encoded in products
- **Design Justice** (Costanza-Chock) — who design centers, who it marginalizes
- **The Alignment Problem** (Christian) — how AI systems learn values and fail
- **Ethics for the Information Age** (Quinn) — applied ethics frameworks

**Applied in:** HS (handoff scanning based on Brignull's harm taxonomy), ID (injection pattern recognition), DC (classification model), PR (privacy audit framing)

---

## DORA — Explorer

**Core texts:**
- **The Design of Everyday Things** (Norman) — the foundation; affordances, mappings, feedback, constraints, mental models
- **About Face** (Cooper et al.) — Goal-Directed Design; personas; interaction models; Dora's GDD backbone
- **Just Enough Research** (Hall) — "research is not user testing" — practical, opinionated research selection
- **Interviewing Users** (Portigal) — the definitive guide to user interviews; question structure and active listening
- **Contextual Design** (Beyer & Holtzblatt) — contextual inquiry; work modeling; affinity diagramming
- **When Coffee and Kale Compete** (Klement) — JTBD narrative; demand-side economics of progress
- **Competing Against Luck** (Christensen) — JTBD framework; the hiring metaphor
- **Continuous Discovery Habits** (Torres) — opportunity-solution trees; weekly discovery cadence
- **The Mom Test** (Fitzpatrick) — IP (Interview Plan) method reference; how not to get lied to
- **Thinking, Fast and Slow** (Kahneman) — cognitive biases that affect research design and interpretation
- **Observing the User Experience** (Kuniavsky) — field research; contextual methods
- **Hooked** (Eyal) — habit loop; trigger-action-reward; PM method reference for behavioral framing
- **Lean Analytics** (Croll & Yoskovitz) — the one metric that matters; stage-appropriate research questions

**Applied in:** SA (JTBD + GDD framing), HS (Norman's heuristics), HMW (lateral thinking + JTBD reframe), JM (contextual inquiry stages), IP (Portigal's question structure), NB (affinity diagramming logic), PM (Kahneman's bias library)

---

## SOL — Solidifier

**Core texts:**
- **Shape Up** (Singer) — the primary method reference; shaping, betting, appetite, the pitch format
- **About Face** (Cooper) — interaction design vocabulary; task flow to wireframe spec
- **Microinteractions** (Saffer) — the detail work that makes products feel alive; WF annotation reference
- **Refactoring UI** (Wathan & Schoger) — visual design judgment in WF; spacing, hierarchy, contrast
- **Atomic Design** (Frost) — component vocabulary; design system thinking in briefs
- **Outcomes Over Output** (Seiden) — how to write AC that measures behavior change, not feature existence
- **Obviously Awesome** (Dunford) — positioning thinking applied to feature framing; how to name the shape
- **Good Strategy Bad Strategy** (Rumelt) — diagnosis + guiding policy as the brief structure
- **Designing for Emotion** (Walter) — emotional design layer in product decisions
- **Lean UX** (Gothelf) — hypothesis as the unit of design; assumption mapping
- **User Story Mapping** (Patton) — story map as the shape; narrative-driven product planning
- **The Elements of User Experience** (Garrett) — five planes as the vocabulary for briefs
- **Articulating Design Decisions** (Greever) — how to defend shape choices under pressure

**Applied in:** SK (shape-choice discipline from Shape Up), BR (brief structure from GSD + outcomes framing), PT (Rumelt's kernel as pitch structure), AC (Seiden's behavior-change AC format), TA (real tension vs. strawman from Martin), DL (reversibility + consequences from Cooper), WF (Saffer's microinteraction annotation)

---

## BRAN — Builder

**Core texts:**
- **The Pragmatic Programmer** (Hunt & Thomas) — professional software development; DRY, orthogonality, the broken window theory
- **Clean Code** (Martin) — naming, functions, tests, comments; the baseline standard Bran reads in CLAUDE.md
- **Refactoring** (Fowler) — changing code structure without changing behavior; Bran's diff discipline reference
- **A Philosophy of Software Design** (Ousterhout) — complexity management; deep vs. shallow modules; the cost of obscurity
- **Test-Driven Development: By Example** (Beck) — TDD mechanics; Bran's TE method foundation
- **Working Effectively with Legacy Code** (Feathers) — building tests around untested code; edge-case finding
- **Continuous Delivery** (Humble & Farley) — deployment pipelines; vertical slice delivery; Bran-to-May handoff reference
- **Accelerate** (Forsgren et al.) — DORA metrics; what "done" means in delivery terms
- **Don't Make Me Think** (Krug) — cognitive load; UV method reference for "does this work without explanation?"
- **Microinteractions** (Saffer) — the behavioral detail Bran implements from Sol's WF spec
- **Atomic Design** (Frost) — component architecture reference for GE (Generate Code)
- **Refactoring UI** (Wathan & Schoger) — visual correctness during UV without the designer present

**Applied in:** CR (Pragmatic Programmer's "read the contract" discipline), GE (Clean Code + Refactoring standards), TE (TDD mechanics + Working Effectively with Legacy Code), UV (Krug's "does it work without explanation?" test), SL (Continuous Delivery's vertical-slice reasoning), IN (Accelerate's DORA instrumentation targets)

---

## MAY — Shipper

**Core texts:**
- **Accelerate** (Forsgren, Humble & Kim) — DORA metrics; deployment frequency, lead time, MTTR, change failure rate; May's measurement targets
- **Site Reliability Engineering** (Google) — error budgets; post-mortems; trust receipts inspired by SRE incident reviews
- **The Phoenix Project** (Kim et al.) — the DevOps narrative; the three ways (flow, feedback, learning); May's mental model
- **Release It!** (Nygard) — stability patterns; circuit breakers; timeouts; May's pre-release readout checklist
- **Continuous Delivery** (Humble & Farley) — deployment pipeline; staged rollouts; feature flags; May's RE method reference
- **Lean Analytics** (Croll & Yoskovitz) — stage-appropriate metrics; the one metric that matters; MR framing
- **Storytelling with Data** (Knaflic) — MR (Measurement Readout) visualization standards
- **Outcomes Over Output** (Seiden) — MR interpretation: did behavior change? did it matter?
- **Made to Stick** (Heath & Heath) — release notes that stick; why customers remember some releases and forget others
- **Building a StoryBrand** (Miller) — RN (Release Notes) narrative structure; the customer as hero
- **Resonate** (Duarte) — NL (Next-Loop Queue) and RP (Retrospective) presentation structure

**Applied in:** RE (Release It! stability checklist), MS/MR (Accelerate DORA targets + Lean Analytics framing), TR (SRE post-mortem format), RN (StoryBrand narrative + Made to Stick principles), RP (Accelerate's retrospective method + SRE blameless post-mortem culture), NL (Outcomes Over Output framing for what the next loop should solve)

---

## ECHO — Session Bridge

**Core texts:**
- **Continuous Discovery Habits** (Torres) — continuous capture as discipline; opportunity framing; the weekly habit
- **Designing Data-Intensive Applications** (Kleppmann) — conflict resolution; eventual consistency; what "sync" actually means at a data level
- **The Pragmatic Programmer** (Hunt & Thomas) — DRY applied to context: capture once, reference everywhere
- **Working Effectively with Legacy Code** (Feathers) — rescuing orphaned contexts (like rescuing untested legacy code — you have to characterize before you change)

**Applied in:** CR (Conflict Resolve: Kleppmann's consistency model), SC (Torres's opportunity capture format), DD (DRY applied to context delta)

---

## PRISM — Pattern Watcher

**Core texts:**
- **Thinking in Systems** (Meadows) — feedback loops; system archetypes; pattern recognition across complex behavior
- **The Visual Display of Quantitative Information** (Tufte) — how to show patterns without lying about them
- **Storytelling with Data** (Knaflic) — how to surface patterns in a way that creates action, not confusion
- **Thinking, Fast and Slow** (Kahneman) — base rate neglect; availability heuristic; pattern-seeking biases to avoid
- **Contextual Design** (Beyer & Holtzblatt) — affinity diagramming as a cross-session pattern synthesis method

**Applied in:** PS (Pattern Surface: Meadows' system archetypes as pattern vocabulary), GR (Graph Report: Tufte's data density principles applied to knowledge graphs), DD (Kahneman's base rate correction applied to dedup confidence levels)
