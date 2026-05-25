---
name: ds-ai-ml-prompt-engineering
description: Designs, tests, and optimizes prompts for LLM-based features — system prompt design, few-shot examples, chain-of-thought strategy, output format spec, parameter tuning, and an evaluation test suite.
tags: [ai-ml, develop]
model: inherit
---

# Prompt Engineering
**Domain**: AI/ML | **Phase**: Develop | **Invocation**: `/ds-ai-ml-prompt-engineering`

## What this produces
A prompt design specification with system prompt, few-shot examples, chain-of-thought instructions, output format spec, parameter recommendations, adversarial tests, and a pass/fail evaluation suite.

## FISH Guide
| Fish | Depth |
|---|---|
| Nemo | System prompt, 3 few-shot examples, output format spec |
| Tuna | Prompt spec with chain-of-thought strategy, parameter recommendations |
| Salmon | Full spec with adversarial tests, evaluation set, failure mode catalog |
| Willy | All methods — prompt versioning, full eval suite, A/B test design |

---

## Execution Prompt

You are running Prompt Engineering for [project]. Design and test prompts that reliably produce target outputs. Test against failures, not just successes — a prompt is only as good as its worst-case output.

**Input**: task description, desired output examples, known failure modes, model to be used.

---

### 1. Task Decomposition

Before writing a prompt, decompose the task into atomic steps. Complex tasks need structured reasoning, not a single instruction.

```
Task: [What the LLM must accomplish]

Subtasks (in order):
1. [First thing the model must do — e.g., "understand the user's intent"]
2. [Second thing — e.g., "retrieve relevant facts from the context"]
3. [Third — e.g., "formulate a response in the correct format"]

Reasoning required: [Factual recall / Logical deduction / Creative generation / Judgment call]
Context needed: [What information must be in the prompt for the model to succeed]
```

---

### 2. System Prompt Design

The system prompt sets the model's role, constraints, and behavior. Write it once, test it across hundreds of inputs.

```
[SYSTEM PROMPT]

You are [role description]. Your job is to [primary task].

[Behavioral constraints — what the model must always/never do]
- Always: [required behavior]
- Never: [prohibited behavior]
- When uncertain: [fallback behavior]

[Output requirements]
Format your response as: [exact format spec]
Tone: [formal/conversational/technical/etc.]
Length: [target length — e.g., "under 150 words" / "one paragraph" / "a structured JSON object"]

[Context injection placeholder]
{context}

[User input placeholder]
{user_input}
```

**System prompt quality checklist:**
- [ ] Role is specific enough to constrain behavior (not just "helpful assistant")
- [ ] Prohibited behaviors are stated explicitly (not implied)
- [ ] Output format is unambiguous
- [ ] Context is separated from instructions
- [ ] Prompt doesn't rely on model "knowing" unstated facts

---

### 3. Few-Shot Examples

Few-shot examples teach the model by demonstration — more reliable than instructions for edge cases.

**Example format:**
```
User: [Input example 1]
Assistant: [Ideal output for example 1]

User: [Input example 2]
Assistant: [Ideal output for example 2]

User: [Input example 3]
Assistant: [Ideal output for example 3]
```

**Example selection criteria:**
- Cover the most common case (30% of inputs)
- Cover the most common edge case (boundary of task definition)
- Cover the most common failure mode (what the model gets wrong without guidance)
- Span the output space (don't pick 3 examples that all look the same)

**Negative example** (show what NOT to do, if the task has a common wrong answer):
```
User: [Input that often triggers wrong output]
WRONG: [What the model would produce without guidance]
CORRECT: [What it should produce]
```

---

### 4. Chain-of-Thought Strategy

For reasoning tasks, chain-of-thought (CoT) dramatically improves accuracy. Use when the task requires multiple steps.

**CoT trigger options:**
- "Think step by step before answering."
- "Before giving your final answer, reason through the problem:"
- "Work through this carefully: [step 1]... [step 2]... [step 3]... Now give your final answer:"

**Structured CoT template:**
```
For this task:
1. First, identify: [what to identify]
2. Then, consider: [what to consider]
3. Finally, conclude: [how to form the final answer]

Show your reasoning for steps 1-2. Only output [final answer format] as your response.
```

**When to hide CoT from users**: include reasoning in the prompt but instruct the model to only output the final answer: "Reason internally but only output [X]."

---

### 5. Output Format Specification

Unstructured outputs are harder to parse. Define the format precisely.

**For JSON output:**
```
Output your response as a JSON object with this exact schema:
{
  "field_1": string,    // [description]
  "field_2": integer,   // [description, valid range]
  "field_3": boolean,   // [description]
  "field_4": array      // [description, elements are: ...]
}
Do not include any text outside the JSON object.
```

**For structured text:**
```
Format your response as:
SUMMARY: [one sentence]
DETAILS: [2-3 sentences]
ACTION: [one specific next step]
```

---

### 6. Parameter Recommendations

| Parameter | Recommended value | When to adjust |
|---|---|---|
| Temperature | 0.0–0.3 for extraction/classification | Increase to 0.7–1.0 for creative generation |
| Top-p | 0.9 | Decrease if outputs are too random |
| Max tokens | [N — set to 2× expected output length] | Increase if outputs truncate |
| Stop sequences | [Define if output should stop at a specific token] | Use for JSON end, section headers |

---

### 7. Evaluation Test Suite

Test every prompt against these categories before production.

| Test | Input | Expected output | Pass criteria |
|---|---|---|---|
| Happy path | [Typical input] | [Expected output] | [Exact match / contains / format valid] |
| Edge case 1 | [Boundary input] | [Expected output] | |
| Edge case 2 | [Another boundary] | [Expected output] | |
| Adversarial 1 | [Prompt injection attempt] | [Model refuses or stays on task] | |
| Adversarial 2 | [Input designed to trigger wrong output] | [Correct output] | |
| Empty/null input | [Empty or null] | [Graceful fallback, not error] | |
| Very long input | [Input at max token limit] | [Correct output or truncation handling] | |

**Minimum pass rate for production**: [e.g., 95% of test cases pass]
