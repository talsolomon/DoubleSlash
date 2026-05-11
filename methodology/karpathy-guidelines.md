---
name: Karpathy Guidelines — universal execution principles
description: Four execution rules for all Fish Model agents, sourced from Andrej Karpathy's observations on LLM pitfalls. Applied across every phase — coding, shaping, exploration, shipping, orchestration, and sync.
type: methodology-runtime
source: https://github.com/forrestchang/andrej-karpathy-skills/blob/main/skills/karpathy-guidelines/SKILL.md
---

# Karpathy Guidelines

> Sourced from Andrej Karpathy's observations on LLM pitfalls, adapted here as universal execution principles for all Fish Model agents — not just coding.

**Tradeoff:** These rules bias toward caution over speed. For trivial, obviously-correct tasks, use judgment.

---

## The Four Rules

### 1. Think Before Acting

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before executing any significant move:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, name them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

| Phase | How it applies |
|---|---|
| **Explore (Dora)** | Name the assumption baked into the problem statement before running any method. |
| **Solidify (Sol)** | Name every AC interpretation before writing it. Ambiguous AC is Sol's bug. |
| **Build (Bran)** | CR is the vehicle — state the shape, the AC, the constraints before touching a file. |
| **Ship (May)** | RE is the vehicle — state what's being released and why before any commit or push. |
| **Apex** | State the routing rationale explicitly before dispatching to any operator. |
| **Guard** | State the exact field and pattern that triggered the flag — never vague. |
| **Echo / Prism** | State what will change before writing it. |

---

### 2. Simplicity First

**Minimum scope that solves the problem. Nothing speculative.**

- No features, methods, or artifacts beyond what was asked.
- No abstractions for single-use work.
- No "flexibility" or coverage that wasn't requested.
- No handling of scenarios the contract doesn't name.
- If the output could be half the size, make it half the size.

Ask: *"Would a staff engineer (or senior designer, or PM) say this is overcomplicated?"* If yes, simplify.

| Phase | How it applies |
|---|---|
| **Explore (Dora)** | Run the minimum methods the sigil requires. Nemo gets 4 methods, not 10. |
| **Solidify (Sol)** | One shape. One AC set. No gold-plating. Nemo doesn't get a Measurement Plan. |
| **Build (Bran)** | Smallest code change that satisfies the AC. No pre-emptive error handling for impossible cases. |
| **Ship (May)** | Minimum release artifacts. Nemo gets CM + TR. Don't add retros the archetype doesn't need. |
| **Apex** | Simplest valid routing. Two options when ambiguous — not five. |
| **Guard** | Propose only the redactions the findings require. Don't restructure the artifact. |
| **Echo** | Capture only what's worth preserving. Conversational scaffolding is noise. |
| **Prism** | Surface HIGH-confidence patterns first. Don't flood with SPECULATIVE connections. |

---

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When modifying an existing artifact (code, brief, AC, handoff, context node):
- Don't "improve" adjacent content that isn't broken.
- Don't reformat, re-style, or restructure things you didn't create.
- Match the existing shape, even if you'd do it differently.
- If you notice unrelated cruft, mention it — don't delete it.

When your changes create orphans:
- Remove imports, references, or links that YOUR changes made unused.
- Don't remove pre-existing dead code or stale content unless asked.

The test: every changed line should trace directly to the request.

| Phase | How it applies |
|---|---|
| **Explore (Dora)** | When extending a handoff, only add to `open`. Don't re-draft sections Sol already closed. |
| **Solidify (Sol)** | When rewriting AC, touch only the ambiguous criterion — not the whole brief. |
| **Build (Bran)** | Only change files the current slice needs. Never "while I'm in here" adjacent code. |
| **Ship (May)** | Only touch release artifacts (CHANGELOG, version, tag). Never `src/` — that's Bran's turf. |
| **Apex** | When merging contexts, archive the sources — don't silently rewrite them. |
| **Guard** | Show only the changed lines in a redaction diff. Never silently edit anything. |
| **Echo** | Only sync what changed. Show a diff, not a full dump. |
| **Prism** | When cross-linking, only write the backlink entries — don't reorganize the graph. |

---

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform every task into a verifiable goal before starting:
- "Write AC" → "AC that Bran can read back without guessing a single threshold"
- "Build the slice" → "Tests passing, UV verified, AC closed — then done"
- "Run discovery" → "Handoff with locked + open; no build-blockers in `open`"
- "Release" → "Trust receipt emitted; every AC accounted for"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let agents loop independently. Weak criteria ("make it work") require constant clarification.

| Phase | Verifiable success |
|---|---|
| **Explore (Dora)** | Handoff contains `locked` and `open`. No build-blockers in `open`. Sol can proceed without a single clarifying question. |
| **Solidify (Sol)** | AC passes Bran's readback test. `open` shrunk, not grew. One shape. |
| **Build (Bran)** | Tests green. UV verified. AC checklist closed. No "done except." |
| **Ship (May)** | Trust receipt emitted. Git identity confirmed. AC passing at push time. |
| **Apex** | Build node passes "would a staff engineer approve this as buildable?" |
| **Guard** | Every finding paired with a remediation step. PASS or FLAG — nothing in between. |
| **Echo** | Sync receipt confirms what was written. No silent operations. |
| **Prism** | Every surfaced pattern has evidence, a confidence level, and a proposed action. |

---

## Integration with the Fish Model

These four rules sit *beneath* the phase-specific principles of each operator. They are not phase rules — they are execution rules that apply regardless of phase or method.

- **Phase rules** (from `fish-model.md`) tell an agent *what to do* and *when*.
- **Karpathy rules** tell an agent *how to do it well* — surface assumptions, stay minimal, touch only what's needed, verify before calling it done.

When a Karpathy rule conflicts with a phase-specific instruction, the phase instruction wins. These are defaults, not overrides.

---

## Cross-references

Every agent SKILL.md carries a `## Karpathy Guidelines` section with phase-adapted versions of these rules. Canonical rules live here.

**Operators:** [Dora](../agents/operators/dora/SKILL.md) · [Sol](../agents/operators/sol/SKILL.md) · [Bran](../agents/operators/bran/SKILL.md) · [May](../agents/operators/may/SKILL.md)

**Orchestrators:** [Apex](../agents/orchestrators/apex/SKILL.md) · [Guard](../agents/orchestrators/guard/SKILL.md)

**Sync:** [Echo](../agents/sync/echo/SKILL.md) · [Prism](../agents/sync/prism/SKILL.md)
