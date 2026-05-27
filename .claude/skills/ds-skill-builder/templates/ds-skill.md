# DS-Internal Skill Template

Use this for skills going into the Duble//Slash domain registry.
File goes in: `skills/<domain>/<phase>/<skill-name>/skill.md`
Companion file: `skills/<domain>/<phase>/<skill-name>/config.json`

---

## skill.md template

```markdown
# [Display Name]
**Domain**: [Domain] | **Phase**: [discover/define/develop/deliver] | **Invocation**: `//[skill-name]`

## What this produces
[One sentence — the specific artifact. Verb-first. E.g.: "Ranked opportunity map with RICE scores and whitespace analysis."]

## Methods
[Comma-separated list of all methods this skill can run, from least to most intensive]

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | [2-3 lightweight methods — fast, good signal] |
| Tuna | [4-6 methods — moderate depth, some synthesis] |
| Salmon | [6-8 methods — qualitative + quantitative] |
| Willy | Full methods list — [all methods enumerated] |

## Execution prompt
You are running the [Skill Name] skill for [project]. Your job is to [goal — verb-first, one sentence].

FISH classification: [Nemo/Tuna/Salmon/Willy]
Run the methods listed for this FISH level.

For each method:
1. State what you're doing and why
2. Produce the output ([artifact type: interview guide / analysis / framework / etc.])
3. Summarize signal — what did you learn?

Final output: [specific deliverable with format and max length if applicable].
```

---

## config.json template

```json
{
  "id": "<domain>-<phase>-<skill-name>",
  "domain": "<domain>",
  "phase": "<phase>",
  "name": "<skill-name>",
  "display_name": "<Human Readable Name>",
  "invocation": "//<skill-name>",
  "output": "<One-line artifact description — what the user gets>"
}
```

---

## Style reference: customer-discovery (complete example)

```markdown
# Customer Discovery
**Domain**: Product | **Phase**: Discover | **Invocation**: `//customer-discovery`

## What this produces
Research synthesis surfacing real user problems before anything gets built. Output: prioritized problem list with evidence, user segments, and recommended next phase.

## Methods
JTBD interview, problem interview, contextual inquiry, ethnographic observation, diary study, day-in-the-life shadowing, empathy mapping, experience sampling, NPS deep-dive, churn interview, win/loss analysis, survey design, customer advisory board facilitation, participatory observation, longitudinal panel

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | JTBD interview (3–5 users), empathy mapping |
| Tuna | JTBD interview, problem interview, NPS deep-dive, empathy mapping |
| Salmon | Contextual inquiry, JTBD interview, win/loss analysis, survey design, empathy mapping |
| Willy | Full methods list — diary study, shadowing, longitudinal panel, all interviews |

## Execution prompt
You are running the Customer Discovery skill for [project]. Your job is to surface real user problems before anything gets built.

FISH classification: [Nemo/Tuna/Salmon/Willy]
Run the methods listed for this FISH level.

For each method:
1. State what you're doing and why
2. Produce the output (interview guide, survey, synthesis, or analysis)
3. Summarize signal — what did you learn?

Final output: prioritized problem list (max 5 problems) with evidence for each and a recommended direction into Define phase.
```
