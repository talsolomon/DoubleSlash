# // Router — Dispatch Logic
_How any `//` invocation gets resolved to a skill and executed._

---

## How it works

When a message begins with `//`, the router runs before anything else:

```
1. PARSE     → extract intent from // message
2. MATCH     → find the skill in the registry
3. LOAD      → read skill.md + config.json
4. CLASSIFY  → FISH classification (see methodology.md)
5. EXECUTE   → run the skill's execution prompt with FISH depth
6. RETURN    → deliver the output + write to memory
```

---

## Parse rules

| Input format | What the router does |
|---|---|
| `//skill-name` | Direct skill lookup in skills/ |
| `//skill-name [context]` | Skill lookup + pass context as input |
| `//` (bare) | Surface phase-matched skill menu |
| `//help` | List skills relevant to current phase |
| `//[domain]` | List all skills in that domain |
| `//[unknown]` | Fuzzy match + suggest 3 closest skills |

---

## Skill resolution

**Exact match**: `//customer-discovery` → `skills/product/discover/customer-discovery/`

**Fuzzy match algorithm** (when exact match fails):
1. Tokenize the invocation: `//comp-intel` → ["comp", "intel"]
2. Scan all `config.json` files for token matches in `name`, `display_name`, `id`
3. Return top 3 matches by token overlap
4. Present options: `Did you mean: //competitive-intelligence, //market-research, //competitive-teardown?`

**Cross-domain match**: If the skill name matches skills in multiple domains, surface the domain selector:
```
Found "//system-design" in:
  [//engineering/system-design]   Engineering
  [//ai-ml/ai-system-design]      AI / ML
Which do you want?
```

---

## FISH classification

Before executing any skill, classify the invocation:

```
1. Read memory.md — what's the current project? What do we know?
2. Ask two questions (internally, not out loud):
   - How familiar are we with this domain/problem? (High/Low)
   - How wide is the scope? (Small/Large)
3. Map to FISH: Nemo / Tuna / Salmon / Willy
4. Load the matching methods from skill.md FISH Guide
5. State the classification: "This is a Salmon. Running: [method 1], [method 2], [method 3]."
```

Never skip FISH. A Willy treated like a Nemo ships the wrong thing polished.

---

## Execution

Load the skill's `skill.md` → find the `## Execution prompt` section → run it with:
- FISH classification filled in
- Project context from memory.md
- Any input the user provided after the `//` invocation

Output format: whatever the skill specifies in `## What this produces`.

---

## Memory write (DS-007)

After every skill execution:
1. Append to the session's kanban.md: `[DONE] //skill-name — [one-line output summary]`
2. Update node-map.md: add a node for this skill run
3. Flag any new open questions or drift signals discovered during execution

---

## Skill menu (bare `//`)

When the user types `//` with no skill name, surface the phase-matched menu:

```
What would you like to do?
  [//customer-discovery]       Discover real user problems
  [//opportunity-landscape]    Map the problem space
  [//problem-framing]          Turn research into a problem statement
  [//requirements-definition]  Define what gets built
  [//solution-ideation]        Generate solution concepts
```

Rules for generating the menu:
- Read memory.md → identify current Double Diamond phase
- Pull skills from the matching phase folder for the active domain
- Show max 5, ranked by relevance to the current open question in memory.md
- Phrase each as an action, not a function name

---

## Error handling

| Situation | Router behavior |
|---|---|
| Skill not found, no fuzzy match | "I don't recognize `//[name]`. Type `//` to see available skills." |
| Skill found, no execution prompt | Run the skill's methods manually using the FISH guide |
| FISH classification unclear | Default to Salmon (full Problem Diamond) — never guess Nemo |
| memory.md missing or empty | Execute skill without project context; flag the gap after |

---

_Source: DECISION-001, DECISION-013, DECISION-014_  
_Last updated: 2026-05-20_
