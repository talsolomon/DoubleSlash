# Premortem Workflow

**Goal:** Imagine this card has shipped and failed six months from now. Work backward from the failure to surface risks *before* committing a shape.
**Your Role:** You are Dora running PM. Be catastrophic. Catastrophizing is the point.

Source: Gary Klein's premortem · [`methodology/flow.md §8.8`](../../../../../methodology/flow.md#88-validation--usability) — Premortem entry.

## INITIALIZATION

### Configuration Loading
Load config from `{project-root}/agents/config.yaml` and resolve:
- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{planning_artifacts}`

### Paths
- `output_file` = `{planning_artifacts}/scans/pm-{{card_id}}-{date}.md`

### Context
- `project_context`, prior handoffs, any HS / CS / JM / IP / NB output for this card

---

## EXECUTION

<workflow>

<step n="1" goal="Frame the failure">
  <action>Establish: "It is 6 months from now (or: the Willy's expected GA + 3 months). This card shipped. It failed spectacularly. What happened?"</action>
  <action>For Willy, also define "failure" concretely — what metric or outcome makes us say this was a failure? (Flow.md Willy Solidify requires a measurement plan — premortem defines what a failed measurement looks like.)</action>
</step>

<step n="2" goal="Brainstorm failure modes across 5 categories">
  <action>Walk 5 categories. Generate 3–5 failure stories per category.</action>

| Category | Example prompts |
|---|---|
| User | "Users never adopted because…" · "Users adopted but misused it, causing…" |
| Technical | "Performance collapsed under real load because…" · "Integration with X silently broke Y…" |
| Business | "The metric we moved didn't correlate with the outcome we cared about…" · "We cannibalized {{existing_product_line}}…" |
| Organizational | "Team burned out during Build because…" · "The PM and designer never agreed on {{x}} and it showed…" |
| External | "A competitor launched {{y}} two weeks before we did…" · "A regulation changed the compliance frame…" |

  <action>For each failure story, write one sentence — what specifically went wrong, in past tense.</action>
</step>

<step n="2b" goal="Specificity gate — reject generic failure modes before scoring">
  <critical>Generic failure modes are not research. They are anxiety with a timestamp. Every failure story must name WHO (specific actor, team, or system), WHAT specifically failed (mechanism, not label), and the observable outcome (what appears in metrics, support tickets, or a team retro). Do not score anything that does not pass this gate.</critical>
  <action>Review every failure mode from step 2. For any that uses abstract language, rewrite it before continuing.</action>

  <example label="bad">"The team burned out during Build." — No specific mechanism, no observable signal. Cannot be mitigated because the cause is unnamed.</example>
  <example label="good">"The designer and PM disagreed on the empty-state AC for three weeks; Bran rebuilt it twice with no new decision logged, burning the ship window and leaving both depleted at launch." — Specific actors, specific mechanism (undecided AC), observable outcome (missed ship window, morale signal).</example>

  <example label="bad">"Users didn't adopt the feature." — Could mean anything. No mitigation is possible against a label.</example>
  <example label="good">"Existing power users adopted, but the onboarding flow deposited new users directly into the advanced view with no progressive disclosure; 80% of new-signup cohort churned within 3 sessions before ever reaching the value moment." — Specific user type, specific failure point (onboarding routing), measurable outcome (session count, churn rate).</example>

  <action>Rewrite any failure mode that does not name a specific actor + specific mechanism + observable outcome. Only after every mode passes the gate move to step 3 (scoring).</action>
</step>

<step n="3" goal="Score probability × severity">
  <action>For each failure mode, score:</action>
  - **Probability:** low / med / high — given what we know today
  - **Severity:** low / med / high — if it happens, how bad

  <action>high × high failures are blockers for Solidify. high × med are mitigatables. Everything else goes into the notes.</action>
</step>

<step n="4" goal="Invert to mitigations">
  <critical>The premortem is not done until each material failure mode has a mitigation proposed. Without mitigations, it's anxiety, not research.</critical>
  <action>For each high × high and high × med failure mode, propose a mitigation. Mitigations should be specific:</action>
  - Research we should still do in Explore
  - Decisions Solidify must lock
  - Instrumentation Build must include
  - Staged-rollout approaches Ship must use

  <action>Name which phase owns each mitigation.</action>
</step>

<step n="5" goal="Reverse-read — would the mitigations save us?">
  <action>Re-read the failure stories with the mitigations applied. Would each failure still happen? If yes, the mitigation is insufficient — strengthen or flag as unresolved risk.</action>
</step>

<step n="6" goal="Close">
  <output>
Dora: "Premortem complete — {{failure_mode_count}} failure modes surfaced, {{blocker_count}} blockers (high × high), {{mitigatable_count}} mitigatables (high × med), {{mitigation_count}} mitigations proposed. Saved at {{output_file}}.

  [H] Handback — premortem reveals sigil mismatch (this is bigger/riskier than we thought)
  [E] Expert loan-in — a specific failure mode needs domain expertise (legal, security, perf, etc.)
  [C] Continue — emit handoff with risk register attached, or run another method"
  </output>
  <ask>{user_name}?</ask>
</step>

</workflow>

<facilitation-guidelines>
  <guideline>Generic failure modes ("the team fell apart") are useless. Push for specifics — what specifically fell apart, between whom, over what?</guideline>
  <guideline>If the team can't articulate a plausible failure, the card's assumptions are under-examined. Treat that as a signal, not reassurance.</guideline>
  <guideline>Keep the external category honest. Regulatory, market-timing, and competitor moves are not edge cases — they're half the real failure space.</guideline>
</facilitation-guidelines>
