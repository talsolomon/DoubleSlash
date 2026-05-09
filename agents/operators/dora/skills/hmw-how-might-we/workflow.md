# How-Might-We Workflow

**Goal:** Reframe the card's problem as 3–5 *"How might we…"* questions that open the solution space without pre-deciding the shape.
**Your Role:** You are Dora running HMW. Stay generative — this is divergence, not convergence.

Source: classic design-thinking HMW (Min Basadur → IDEO → Stanford d.school) · [`methodology/flow.md §8.4`](../../../../../methodology/flow.md#84-framing--modeling) (HMW catalog entry).

## INITIALIZATION

### Configuration Loading
Load config from `{project-root}/agents/config.yaml` and resolve:
- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{planning_artifacts}`

### Paths
- `output_file` = `{planning_artifacts}/scans/hmw-{{card_id}}-{date}.md`

### Context
- `project_context` = `**/project-context.md` (load if exists)
- Any preceding HS / CS / IP / NB output for this card (load if present)

---

## EXECUTION

<workflow>

<step n="0" goal="Reason through the problem space before generating">
  <critical>Do not write HMWs from first instinct. The most common failure mode is generating obvious reframings that close the aperture instead of opening it. Thinking before drafting is the gap between a shallow HMW list and one a team actually uses.</critical>
  <action>Before writing any HMW, internally work through these four questions:
    1. Who specifically experiences this problem? What is their actual goal, and what is physically/cognitively in their way?
    2. What assumption about this situation would, if wrong, open a completely different solution space?
    3. What adjacent domain (different industry, different product, different era) has solved a structurally similar problem?
    4. What would make the current pain an active feature — something someone would pay for — rather than just a reduced harm?
  Only after working through these internally should you draft HMWs. The answers to questions 2–4 are where non-obvious reframings come from.</action>
</step>

<step n="1" goal="Confirm the problem statement">
  <action>Pull the latest problem statement from the card (handoff, HS output, or ask).</action>
  <critical>HMW works from a problem, not a solution. If the input is already solution-shaped ("add a tooltip"), reframe before proceeding.</critical>
  <check if="input is solution-shaped">
    <output>
Dora: "That's a solution, not a problem. Let me flip it: the underlying problem seems to be '{{inferred_problem}}'. Sound right, or is there a different problem?"
    </output>
    <ask>{user_name}?</ask>
  </check>
</step>

<step n="2" goal="Generate HMWs across 3 lenses">
  <action>Produce 3–5 HMW questions across these lenses (flow.md-aligned):</action>

| Lens | HMW form |
|---|---|
| Goal | *"How might we help {{persona}} {{achieve_goal}} while {{constraint}}?"* |
| Obstacle | *"How might we remove / reduce {{blocker}} that {{persona}} hits at {{moment}}?"* |
| Assumption | *"How might we serve {{persona}} if {{current_assumption}} is wrong?"* |
| Analogy | *"How might we borrow from {{adjacent_pattern}} to solve {{this_problem}}?"* |
| Inversion | *"How might we make {{current_behavior}} actively better instead of only less bad?"* |

  <action>Aim for 3 minimum, 5 maximum. Quality over quantity. Each must pass the "so what?" test — a team could start sketching against it.</action>
</step>

<examples label="good-vs-bad-hmw">
  <context>Problem: Designers lose decision reasoning when moving work from Figma exploration to written specs in Notion.</context>

  <bad label="solution-shaped">"How might we add a Figma plugin that syncs frames to Notion automatically?" — Already a solution. One specific mechanism pre-decided. The aperture closes immediately.</bad>
  <bad label="too-vague">"How might we make design handoff seamless?" — 'Seamless' and 'handoff' are undefined. No team can sketch against this. It is a goal disguised as a question.</bad>
  <bad label="answers-itself">"How might we help designers document decisions in their existing tools?" — There is only one obvious answer: add a text field. The HMW answers itself; it is a feature spec in disguise.</bad>

  <good label="goal-lens">"How might we help a designer preserve decision reasoning while moving from exploration to documentation — without adding a separate capture step?" — Names persona, the goal (preserve reasoning), and the constraint (no extra step). Five different solutions emerge immediately.</good>
  <good label="obstacle-lens">"How might we reduce the loss of 'why we rejected option B' that happens when a Figma frame becomes a Notion page?" — Specific blocker, specific transition moment. A team can start sketching against this in under an hour.</good>
  <good label="inversion-lens">"How might we make the handoff moment an active knowledge gain instead of a translation tax?" — Reframes the pain as opportunity. Opens a question the team hasn't asked: maybe the handoff itself is the product, not a cost to minimize.</good>
</examples>

<step n="3" goal="Score each HMW against the sigil">
  <action>For each HMW, flag: aperture (wide / medium / narrow), effort match for the archetype, and whether it's within scope for this card or suggests a sibling card.</action>
  <action>Narrow HMWs on Willy/Salmon cards are a red flag — they close the aperture too early. Call it out.</action>
  <action>Wide HMWs on Nemos are also a red flag — they inflate scope.</action>
</step>

<step n="4" goal="Pick one (or two) for Solidify to shape">
  <output>
Dora: "Here are {{hmw_count}} HMWs. Which 1–2 do you want to hand to Sol as the target framing for Solidify?

  {{numbered_hmw_list_with_scores}}

  [H] Handback — none of these hit; let me rework
  [E] Expert loan-in — bring in a domain lens to sharpen a specific HMW
  [C] Continue — pick 1–2"
  </output>
  <ask>{user_name}?</ask>
</step>

<step n="5" goal="Write output + optional handoff">
  <action>Write the full HMW list + chosen HMW(s) + scoring to output_file.</action>
  <check if="chosen HMW list is non-empty and Explore has enough coverage for the archetype">
    <action>Offer to emit handoff via ds-handoff-compose with:
      - methods_run = [..prior, HMW]
      - locked = ["Target HMW: {{chosen_hmw_1}}", ...]
      - open = [remaining HMWs deferred for next-loop]
      - artifacts = [{{output_file}}]</action>
  </check>
  <check if="archetype needs more Explore (Salmon/Willy and IP not yet run)">
    <output>
Dora: "HMWs logged. Sigil {{archetype}} wants IP next — interviews before Solidify. Want me to run it, or go to Sol now on what we have?"
    </output>
    <ask>{user_name}?</ask>
  </check>
</step>

</workflow>

<facilitation-guidelines>
  <guideline>HMWs are not goals. A goal says "increase conversion by 10%"; an HMW says "how might we help someone feel ready to buy at checkout?"</guideline>
  <guideline>Never accept an HMW that answers itself. If there's only one answer, it's a spec, not a generative question.</guideline>
  <guideline>Keep Dora's voice. Do not suggest specific solutions here — that's Sol's job.</guideline>
</facilitation-guidelines>
