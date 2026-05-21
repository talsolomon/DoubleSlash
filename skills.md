# Skills
_Every skill Allen can invoke. Organized by domain and Double Diamond phase._

---

## What a skill is
A skill is a **complete, executable capability** — Allen runs it and produces an outcome. The methods within each skill are how Allen executes depending on context, FISH classification, and what the situation calls for. MCP servers, APIs, and tool integrations are the execution plumbing underneath — not the skills themselves.

**Structure:** Domain → Phase → Skill → Methods  
**FISH determines depth:** Nemo runs 1–2 methods. Willy runs the full library.

---

## Domains (MVP)
1. [Product](#product)
2. [UX / Design](#ux--design)
3. [Engineering](#engineering)
4. [Analytics](#analytics)
5. [Marketing](#marketing)
6. [Operations](#operations)
7. [Strategy / Business](#strategy--business)
8. [Legal / Compliance](#legal--compliance)
9. [AI / ML](#ai--ml)
10. [DevOps / Infrastructure](#devops--infrastructure)
11. [Blockchain / Web3](#blockchain--web3)
12. [Content Strategy](#content-strategy)
13. [PR / Communications](#pr--communications)
14. [Brand](#brand)
15. [Creative Direction](#creative-direction)
16. [Fintech](#fintech)
17. [Media](#media)
18. [Government / Public Sector](#government--public-sector)
19. [Non-profit](#non-profit)
20. [Retail / E-commerce](#retail--e-commerce)
21. [Manufacturing](#manufacturing)

---

## Product

### Discover
**customer-discovery** — Surface real user problems before building anything.  
Methods: JTBD interview, problem interview, contextual inquiry, ethnographic observation, diary study, day-in-the-life shadowing, empathy mapping, experience sampling, NPS deep-dive, churn interview, win/loss analysis, survey design, customer advisory board facilitation, participatory observation, longitudinal panel

**opportunity-landscape** — Map the space of problems worth solving.  
Methods: TAM/SAM/SOM sizing, whitespace analysis, horizontal/vertical market scan, adjacent market mapping, pain/gain mapping, demand signal aggregation, early adopter profiling, Jobs-to-be-done market segmentation, unmet needs scoring, technology readiness assessment

### Define
**problem-framing** — Turn research into a precise, actionable problem statement.  
Methods: HMW (How Might We) reframing, POV statement writing, 5 Whys root cause analysis, fishbone diagram, insight clustering, opportunity scoring (RICE, ICE, WSJF, Kano), north star metric definition, success criteria definition, assumption mapping, user need hierarchy, problem statement synthesis

**requirements-definition** — Specify what gets built and what done looks like.  
Methods: PRD writing, user story mapping, job stories (Alistair Cockburn format), acceptance criteria definition, API contract design, dependency mapping, constraint documentation, assumption log, definition of done, feature spec, scope boundary definition, non-functional requirements, edge case enumeration

### Develop
**solution-ideation** — Generate and evaluate solution concepts before committing.  
Methods: Crazy 8s, design studio facilitation, analogical thinking, SCAMPER, worst possible idea (reverse brainstorming), Rose/Bud/Thorn, co-design session, concept sketching, assumption poker, impact/effort matrix, 2×2 prioritization, concept sprint, solution narrative, build/buy/partner analysis

**roadmap-design** — Sequence what gets built, when, and why.  
Methods: NOW/NEXT/LATER mapping, outcome roadmap, opportunity roadmap, theme-based roadmap, quarterly planning session, OKR design, release planning, dependency sequencing, stakeholder alignment workshop, capacity planning, risk-adjusted sequencing, portfolio prioritization

### Deliver
**launch-planning** — Get a feature or product to users safely and measurably.  
Methods: GTM strategy, launch checklist, rollout plan, feature flag strategy, beta program design, stakeholder communication plan, success metrics definition, post-launch review framework, launch retrospective, soft launch vs. hard launch decision, launch risk assessment

**product-retrospective** — Close the loop on what shipped and what it taught you.  
Methods: Sprint retrospective (Start/Stop/Continue), product retrospective, lessons learned synthesis, decision log update, OKR grading, quarterly business review, assumption audit, kill/continue/pivot decision, north star metric review

---

## UX / Design

### Discover
**user-research** — Understand users deeply before designing anything.  
Methods: Contextual inquiry, semi-structured interview, diary study, ethnographic observation, JTBD interview, cognitive walkthrough, card sorting (open/closed), tree testing, participatory design session, field study, shadowing, experience sampling method, photo diary, cultural probes, longitudinal study, guerrilla research

**usability-baseline** — Establish how usable the current product actually is.  
Methods: Heuristic evaluation (Nielsen's 10), expert review, cognitive walkthrough, PURE evaluation, accessibility audit (WCAG 2.2 AA/AAA), first-click test, five-second test, benchmark usability test, SUPR-Q scoring, System Usability Scale (SUS), comparative usability study, eye-tracking analysis brief, keystroke-level model

### Define
**synthesis** — Turn raw research into actionable design direction.  
Methods: Affinity mapping, thematic analysis, journey mapping (current state), service blueprint, persona creation, proto-persona, mental model mapping, empathy map synthesis, insight statement writing, opportunity space mapping, experience principles definition, user need statement, design criteria definition

**design-principles** — Define the rules design decisions must follow.  
Methods: Design system audit, pattern library review, brand alignment check, accessibility requirements definition, interaction principles documentation, visual language definition, design criteria matrix, anti-pattern cataloging, design debt assessment, component inventory

### Develop
**ideation** — Generate and explore design concepts rapidly.  
Methods: Crazy 8s, design sprint facilitation, storyboarding, bodystorming, roleplaying, paper prototyping, dot voting, affinity clustering, HMW ideation, creative matrix, worst idea inversion, SCAMPER for UX, parallel design, design charrette, 6-3-5 brainwriting

**ux-flow-design** — Define how users move through the product.  
Methods: User flow mapping, task flow mapping, information architecture design, site map design, navigation design, wireframing brief, interaction specification, microcopy design, empty state design, error state design, onboarding flow design, progressive disclosure mapping, accessibility flow review, cross-platform flow harmonization, notification flow design

**prototyping** — Make ideas tangible enough to test.  
Methods: Low-fidelity prototype spec, high-fidelity prototype spec, interactive prototype design, clickthrough spec, animation and motion spec, responsive breakpoint design, dark mode specification, gesture interaction design, voice UI flow, AR/VR interaction spec

### Deliver
**usability-testing** — Validate design decisions with real users.  
Methods: Moderated usability test, unmoderated usability test, A/B test design, multivariate test design, guerrilla testing session, remote usability test, think-aloud protocol, retrospective probing, accessibility testing, beta feedback synthesis, first-use study, longitudinal diary study debrief, desirability testing

**design-QA** — Ensure what ships matches what was designed.  
Methods: Redline review, implementation QA checklist, design system compliance check, accessibility audit (WCAG), cross-browser and cross-device review, motion and animation review, copy and microcopy audit, responsive design review, dark mode QA, localization readiness check

---

## Engineering

### Discover
**technical-research** — Evaluate options before committing to an architecture.  
Methods: Technology evaluation matrix, library comparison, architectural options analysis (ADO), proof of concept design, tech spike, build vs. buy vs. OSS analysis, OSS license audit, dependency audit, technical debt assessment, security threat model (initial), API landscape survey, latency/throughput benchmark design, vendor lock-in analysis

**system-audit** — Understand the current state of a codebase or system.  
Methods: Codebase audit, performance profiling, bottleneck analysis, load testing plan, capacity planning, incident post-mortem, technical debt mapping (SQALE model), code quality assessment, dependency vulnerability scan, observability gap analysis, on-call burden analysis

### Define
**system-design** — Define the architecture before writing a line of code.  
Methods: C4 model (Context, Container, Component, Code), Architecture Decision Record (ADR), API contract design (OpenAPI/GraphQL schema), data model design, ER diagram, event storming, domain-driven design workshop, sequence diagram, state machine design, system context diagram, component interaction diagram, failure mode analysis

**technical-specification** — Document exactly what gets built.  
Methods: RFC (Request for Comments) writing, engineering spec, interface definition, error handling specification, logging and observability spec, SLA/SLO/SLI definition, API versioning strategy, backward compatibility plan, rate limiting design, caching strategy, data retention policy

### Develop
**implementation-planning** — Sequence the build intelligently.  
Methods: Task decomposition, sprint planning, pair programming spec, TDD specification, feature branch strategy, code scaffold design, scaffolding decision (monorepo vs. polyrepo), technical approach document, integration sequencing, rollout order planning, canary group definition

**code-design** — Design the internal structure of a system.  
Methods: Design pattern selection (GoF, SOLID, DDD patterns), refactoring plan, interface design, module boundary definition, API design (REST/GraphQL/gRPC), database schema design, migration plan, event schema design, message queue topology, caching layer design, concurrency model

### Deliver
**code-review** — Verify quality before merging.  
Methods: PR review checklist, architecture review, performance review, security scan brief, test coverage analysis, documentation completeness review, changelog writing, release notes, backward compatibility check, breaking change detection, accessibility review (for frontend)

**deployment** — Ship safely with a recovery path.  
Methods: Deployment plan, rollback strategy, blue/green deployment design, canary release plan, feature flag rollout strategy, post-deploy monitoring plan, smoke test suite design, database migration runbook, secret rotation plan, certificate management review

---

## Analytics

### Discover
**data-discovery** — Understand what the data actually says before framing conclusions.  
Methods: SQL exploratory analysis, data profiling, funnel analysis, cohort analysis, session analysis, behavioral segmentation analysis, retention curve analysis, event tracking audit, data quality assessment, anomaly detection, heatmap analysis, path analysis, drop-off analysis, feature usage analysis

**metric-research** — Find the metrics that actually matter.  
Methods: Metric tree mapping, north star metric definition, counter-metric identification, leading vs. lagging indicator mapping, benchmarking (internal and competitive), proxy metric validation, vanity metric audit, metric sensitivity analysis, signal vs. noise assessment

### Define
**measurement-framework** — Design how you'll know if something worked.  
Methods: KPI definition, OKR design, metric hierarchy (L1/L2/L3), dashboard architecture, data model design, tracking plan, event schema design, attribution model design (first-touch, last-touch, linear, time-decay, data-driven), data governance policy, instrumentation spec

**experiment-design** — Set up tests that produce trustworthy results.  
Methods: A/B test design, multivariate test design, holdout group design, power analysis, statistical significance planning (frequentist/Bayesian), minimum detectable effect calculation, experiment prioritization framework, pre-mortem analysis, novelty effect mitigation, network effect handling, interference analysis (SUTVA)

### Develop
**analysis** — Extract actionable insight from data.  
Methods: Descriptive statistics, regression analysis (linear, logistic, multivariate), segmentation analysis, clustering (k-means, hierarchical), time-series analysis, attribution analysis, LTV modeling, CAC analysis, payback period calculation, churn prediction model spec, propensity score matching, causal inference design (DiD, RDD, IV)

**dashboard-design** — Make data legible and actionable for stakeholders.  
Methods: Dashboard specification, data visualization selection (chart type decision tree), metric alerting design, report template design, self-serve analytics spec, executive summary design, operational vs. strategic dashboard distinction, mobile dashboard spec, real-time vs. batch data decision

### Deliver
**insight-communication** — Turn analysis into decisions.  
Methods: Executive report writing, insight narrative, data storytelling, recommendation synthesis, decision brief, stakeholder presentation, metric review facilitation, uncertainty communication, confidence interval explanation, "so what" framing

**experiment-readout** — Close the loop on what you learned.  
Methods: Test results synthesis, statistical interpretation, practical vs. statistical significance distinction, next-steps recommendation, iteration planning, learnings documentation, experiment registry update, rollout vs. kill decision

---

## Marketing

### Discover
**market-research** — Understand the market before making claims about it.  
Methods: Competitive analysis (feature, positioning, pricing), positioning map, customer segment research, voice-of-customer analysis, keyword research (SEO and PPC), social listening, trend analysis (Google Trends, social, news), influencer landscape mapping, media landscape audit, search intent analysis, review mining (G2, Capterra, App Store)

**audience-research** — Understand who you're selling to with precision.  
Methods: Persona development (data-driven), psychographic research, behavioral segmentation, ICP (Ideal Customer Profile) definition, buying committee mapping, channel preference research, brand perception survey, NPS cohort analysis, Jobs-to-be-done interview for buying behavior

### Define
**positioning** — Stake a clear, defensible position in the market.  
Methods: Positioning statement (Geoffrey Moore format), value proposition design (Value Proposition Canvas), messaging hierarchy, differentiation matrix, category design (Play Bigger framework), competitive moat analysis, brand narrative arc, category POV, positioning test design

**content-strategy** — Plan what gets made, for whom, and why.  
Methods: Content pillar definition, topic cluster mapping (SEO), editorial calendar design, content audit, SEO strategy, distribution-first content planning, content repurposing framework, content-market fit assessment, channel-content matrix

### Develop
**campaign-design** — Build campaigns that convert.  
Methods: Campaign brief, integrated channel mix design, creative brief, messaging matrix, launch calendar, budget allocation (80/20 rule), creative concept development, A/B test creative design, funnel stage mapping, retargeting logic, lookalike audience design, influencer brief

**content-creation** — Produce content that moves buyers.  
Methods: Blog post outline, case study structure, white paper outline, landing page copy, email nurture sequence, social content calendar, video script, podcast outline, webinar design, comparison page, ROI calculator spec, product demo script, sales enablement content

### Deliver
**launch-execution** — Execute launches that create momentum.  
Methods: Launch playbook, go-to-market checklist, press release, launch email sequence, social launch campaign, influencer brief, PR outreach strategy, community seeding plan, Product Hunt launch strategy, AppSumo strategy, launch retrospective

**performance-review** — Know what worked and double down.  
Methods: Campaign analytics review, multi-touch attribution analysis, content performance audit, channel ROI analysis, CAC by channel, competitive response analysis, share of voice measurement, media mix modeling brief, quarterly marketing review

---

## Operations

### Discover
**process-audit** — Understand how work actually flows before redesigning it.  
Methods: Current-state process mapping (swim lane, BPMN), bottleneck identification, waste analysis (Lean 8 wastes), SIPOC analysis, process mining, time-motion study, escalation pattern analysis, ticket/request volume analysis, meeting audit, decision lag analysis, handoff failure mapping

**team-research** — Understand how the team actually works.  
Methods: Team health assessment (Spotify Squad Health Check), workload analysis, communication flow mapping, decision-making pattern analysis, RACI gap analysis, meeting effectiveness audit, tool sprawl audit, information architecture review, psychological safety survey design

### Define
**process-design** — Design workflows that reduce friction and increase reliability.  
Methods: Future-state process mapping, SOP writing, RACI matrix design, workflow design (linear, parallel, conditional), escalation path definition, SLA definition, process KPI design, exception handling design, audit trail design, compliance checkpoint mapping

**organizational-design** — Structure teams for the work they need to do.  
Methods: Team topology design (stream-aligned, platform, enabling, complicated-subsystem), role definition, scope boundary mapping, coordination mechanism design, cognitive load assessment, team API design, hiring plan

### Develop
**tooling-design** — Select and configure tools to support the work.  
Methods: Tool evaluation matrix, integration design, automation specification, workflow automation design, notification design, reporting design, tool consolidation plan, vendor RFP design, tool onboarding plan, API integration spec

**playbook-creation** — Make knowledge executable.  
Methods: Runbook writing, incident response playbook, onboarding checklist, decision framework, escalation tree, knowledge base architecture, FAQ design, troubleshooting guide, process video script, training module outline

### Deliver
**process-rollout** — Implement process changes without breaking what works.  
Methods: Change management plan, training design, adoption tracking, feedback loop design, iteration planning, pilot group definition, rollback plan, communication cascade design

**operational-review** — Continuously improve what's running.  
Methods: Quarterly ops review, process audit, metric review, retrospective facilitation (Start/Stop/Continue), continuous improvement log, Kaizen event design, OKR grading, vendor review

---

## Strategy / Business

### Discover
**strategic-research** — Understand the forces shaping your space before placing bets.  
Methods: Industry landscape analysis, Porter's Five Forces, PESTLE analysis, Jobs-to-be-done market analysis, emerging trend mapping, weak signal detection, scenario planning research, Wardley Mapping, technology adoption curve positioning, disruption pattern analysis (Christensen), ecosystem mapping

**competitive-intelligence** — Know your competition deeply enough to outmaneuver them.  
Methods: Competitive teardown, positioning analysis, pricing research, go-to-market analysis, feature comparison matrix, customer perception research, funding and trajectory analysis, hiring signal analysis (LinkedIn), patent landscape scan, competitive narrative analysis

### Define
**strategic-framing** — Articulate a clear direction that can guide decisions.  
Methods: Vision statement, mission definition, strategic bets (1-page), north star definition, moat analysis (Hamilton Helmer's 7 Powers), platform vs. product decision, business model canvas, value chain analysis, strategic narrative, category design, where-to-play / how-to-win framework

**business-model** — Design how the business creates and captures value.  
Methods: Revenue model design, pricing strategy (value-based, cost-plus, freemium, usage-based, tiered), unit economics model, LTV/CAC analysis, monetization architecture, partnership strategy, distribution model, pricing sensitivity analysis, ARPU/ARPA modeling

### Develop
**planning** — Translate strategy into sequenced action.  
Methods: Strategic roadmap, OKR design (company, team, individual), initiative prioritization (effort/impact), resource allocation model, scenario modeling (base/bull/bear), risk/opportunity matrix, go/no-go framework, portfolio balancing, capacity planning, dependency sequencing

**narrative** — Shape how the strategy is understood externally and internally.  
Methods: Investor narrative, board presentation, strategic memo, all-hands brief, external positioning narrative, analyst briefing, media narrative, category POV, company story arc, pitch deck structure

### Deliver
**decision-making** — Close decisions cleanly and make them stick.  
Methods: Decision brief, pre-mortem analysis, decision log entry, stakeholder alignment workshop, recommendation synthesis, DACI/RACI for decisions, reversible vs. irreversible decision framework, dissent capture, decision communication plan

**strategic-review** — Audit whether the strategy is still right.  
Methods: Quarterly strategy review, OKR grading, strategic assumption audit, pivot/persevere/double-down decision, lessons learned, competitive re-evaluation, market signal synthesis

---

## Legal / Compliance

### Discover
**regulatory-research** — Map the compliance landscape before building.  
Methods: Regulatory landscape mapping (GDPR, CCPA, SOC2, ISO 27001, HIPAA adjacent, PCI-DSS, AI Act, NIS2), compliance gap analysis, jurisdictional requirements mapping, industry standards research, precedent research, regulatory change monitoring design, legal risk mapping, IP landscape analysis

**risk-assessment** — Identify legal and compliance exposure early.  
Methods: Legal risk mapping, liability analysis, IP landscape analysis (Freedom to Operate), contract risk assessment, data residency risk analysis, third-party vendor risk assessment, force majeure analysis, employment law risk mapping, regulatory enforcement trend analysis

### Define
**compliance-framework** — Define what compliance looks like in your specific context.  
Methods: Compliance requirements definition (mapped to specific regs), control design, policy writing, data processing agreement (DPA) template, privacy policy design, terms of service structure, data classification scheme, retention schedule, consent management design, audit trail requirements

**ip-strategy** — Protect what you build.  
Methods: IP audit, patent landscape analysis, trademark search and filing strategy, open source license compliance review (SBOM), trade secret protection plan, IP assignment clauses, joint development agreement framework, licensing strategy

### Develop
**contract-design** — Draft agreements that protect without creating friction.  
Methods: Master service agreement (MSA) template, SLA design, NDA (mutual/one-way), partnership agreement framework, vendor agreement, data processing addendum (DPA), employment agreement framework, contractor agreement, API terms of use, enterprise license agreement (ELA)

**policy-design** — Write policies people can actually follow.  
Methods: Privacy policy, cookie policy, acceptable use policy (AUP), incident response policy, data retention policy, AI usage policy, bring-your-own-device (BYOD) policy, whistleblower policy, conflict of interest policy, information security policy

### Deliver
**compliance-review** — Verify compliance before it becomes a liability.  
Methods: Compliance audit, SOC2 readiness assessment, GDPR compliance review, accessibility compliance review (WCAG 2.2), AI Act compliance review, penetration test scope definition, vendor compliance questionnaire, data subject access request (DSAR) process design, breach notification procedure

**legal-review** — Close the legal loop on agreements and obligations.  
Methods: Contract redline, legal risk memo, compliance certification prep, regulatory submission review, litigation hold design, indemnification analysis, governing law and venue analysis

---

## AI / ML

### Discover
**ai-research** — Understand what AI can and can't do for a specific problem.  
Methods: Use case identification and scoping, model landscape research (open/closed weight), benchmark comparison (MMLU, HumanEval, HELM, domain-specific), dataset availability assessment, compute requirements analysis, AI risk assessment, ethical AI audit, hallucination risk analysis, regulatory compliance check (AI Act, NIST AI RMF), latency/cost tradeoff analysis

**data-assessment** — Evaluate the data before committing to an AI approach.  
Methods: Dataset evaluation, data quality audit, labeling requirements analysis, feature engineering opportunity mapping, training data strategy, data flywheel design, synthetic data feasibility assessment, bias audit, data lineage mapping, PII exposure analysis

### Define
**ai-system-design** — Architect AI systems that behave reliably.  
Methods: Model architecture selection (fine-tune vs. RAG vs. prompt engineering vs. agent), RAG system design (chunking strategy, embedding model, retrieval mechanism, reranker), agent design (tool use, memory, planning, ReAct, CoT), human-in-the-loop checkpoint design, fallback strategy, safety specification, output validation design, multi-model routing strategy, context window management

**ml-specification** — Specify what gets built in the ML pipeline.  
Methods: Training pipeline spec, feature store design, model versioning strategy (MLflow, W&B), shadow mode deployment plan, A/B test design for models, online vs. offline evaluation design, ground truth collection plan, active learning strategy, feedback loop design

### Develop
**prompt-engineering** — Design prompts that produce reliable, high-quality outputs.  
Methods: System prompt design, few-shot example curation, chain-of-thought (CoT) prompting, tree-of-thought (ToT), structured output specification (JSON schema), tool use specification (function calling), guardrail design, red-teaming and adversarial prompting, prompt versioning strategy, prompt regression testing design, meta-prompting, self-consistency sampling, retrieval-augmented prompt design

**model-development** — Build, fine-tune, and evaluate AI models.  
Methods: Fine-tuning pipeline (SFT, RLHF, DPO, ORPO), synthetic data generation spec, evaluation harness design, benchmark suite creation, model card writing, PEFT configuration (LoRA, QLoRA), distillation strategy, quantization plan (GPTQ, GGUF), multi-modal model integration

### Deliver
**ai-evaluation** — Measure model quality before and after deployment.  
Methods: Offline evaluation (held-out test set), online evaluation (user feedback, implicit signals), human evaluation design, LLM-as-judge setup, regression test suite, safety evaluation (harmlessness, helpfulness, honesty), bias and fairness audit, hallucination rate assessment, latency benchmarking, cost-per-query analysis, confidence calibration

**ai-deployment** — Ship AI systems that stay reliable in production.  
Methods: Model serving design (API, streaming, batch), latency optimization (caching, speculative decoding, quantization), cost optimization, monitoring design (drift, performance, safety), alert design, rollback strategy, shadow deployment, model refresh cadence, A/B rollout plan, incident response for AI failures

---

## DevOps / Infrastructure

### Discover
**infrastructure-audit** — Understand the current state before changing it.  
Methods: Architecture review, cloud cost audit, performance baseline, reliability assessment (SLO gap analysis), incident history analysis, dependency mapping, blast radius analysis, SPOF (single point of failure) mapping, vendor lock-in assessment, compliance gap analysis, infrastructure as code coverage audit

**platform-research** — Evaluate options before committing to a platform or tool.  
Methods: Cloud provider evaluation (AWS/GCP/Azure), service comparison (managed vs. self-hosted), open source alternative analysis, vendor RFP design, TCO (total cost of ownership) model, edge vs. cloud tradeoff, multi-cloud strategy assessment, FinOps maturity assessment

### Define
**infrastructure-design** — Architect the environment the product runs on.  
Methods: Infrastructure architecture design, network topology (VPC, subnets, peering), security group and firewall design, IAM policy design (least privilege), disaster recovery plan (RTO/RPO), backup strategy, multi-region design, SLO/SLI/SLA definition, data residency design, compliance architecture (SOC2, ISO 27001)

**platform-design** — Design the developer experience layer.  
Methods: Developer experience (DevEx) design, CI/CD pipeline design (GitHub Actions, GitLab CI, Buildkite), local dev environment spec (devcontainer, Nix, Docker Compose), testing infrastructure spec, observability stack design (metrics, logs, traces — OpenTelemetry), internal developer portal design, golden path design

### Develop
**platform-build** — Specify how infrastructure gets provisioned and managed.  
Methods: Infrastructure as Code spec (Terraform, Pulumi, CDK), Kubernetes configuration spec (Helm charts, Kustomize), container design (Dockerfile, multi-stage build), service mesh design (Istio, Linkerd), API gateway design, secrets management design (Vault, AWS Secrets Manager), certificate management (cert-manager, Let's Encrypt), GitOps workflow design (ArgoCD, Flux)

**automation** — Eliminate manual toil.  
Methods: CI/CD pipeline automation, deployment automation, infrastructure drift detection, runbook automation (runbook → code), alert routing automation, on-call rotation design, incident auto-triage, chaos engineering spec (Chaos Monkey, Gremlin), cost anomaly alerting

### Deliver
**deployment** — Ship changes safely.  
Methods: Deployment plan, blue/green deployment, canary release, feature flag rollout (LaunchDarkly, Unleash), database migration plan (expand/contract pattern), rollback runbook, post-deploy smoke test, performance regression detection, zero-downtime deployment design

**operations** — Keep systems running reliably.  
Methods: Incident response runbook, post-mortem facilitation (blameless), SLA review, capacity planning, cloud cost optimization (rightsizing, reserved instances, spot), reliability review (Game Day design), on-call health assessment, toil reduction planning

---

## Blockchain / Web3

### Discover
**web3-research** — Understand the protocol landscape and user behavior.  
Methods: Protocol landscape mapping (L1s, L2s, appchains), tokenomics research, DeFi mechanism analysis (AMMs, lending, perps, restaking), DAO governance model research, L2 ecosystem analysis (Optimism, Arbitrum, Base, zkSync, Starknet), regulatory landscape (MiCA, SEC guidance), on-chain user behavior analysis, MEV (maximal extractable value) landscape, cross-chain bridge risk analysis

**smart-contract-audit** — Identify risk before deploying immutable code.  
Methods: Contract security review (reentrancy, overflow, access control, oracle manipulation, flash loan attacks), gas optimization analysis, upgrade pattern research (transparent proxy, UUPS, diamond), oracle dependency analysis (Chainlink, Pyth, TWAP), economic security analysis, invariant definition, formal verification scope

### Define
**tokenomics-design** — Design token economies that are sustainable and aligned.  
Methods: Token model design (utility, governance, revenue-sharing), supply/demand mechanics, emission schedule, incentive alignment design, governance model (on-chain voting, multisig, optimistic governance), vesting schedule design, treasury management framework, staking mechanism design, liquidity incentive design (ve-tokenomics, Curve Wars dynamics)

**protocol-design** — Architect the on-chain system.  
Methods: Smart contract architecture, consensus mechanism selection, cross-chain bridge design, oracle integration design, governance framework (Compound Governor, OpenZeppelin Governor, Snapshot), upgrade strategy (timelocked, multisig-gated), fee mechanism design (EIP-1559 style), sequencer design (for L2s)

### Develop
**smart-contract-development** — Specify contracts that behave correctly under all conditions.  
Methods: Contract specification (NatSpec), invariant definition (for Echidna/Foundry fuzzing), test suite design (unit, integration, fork tests), deployment script (Hardhat, Foundry), upgrade migration script, multisig configuration (Safe), emergency pause mechanism, circuit breaker design, timelock configuration

**dapp-design** — Design user experiences that abstract blockchain complexity.  
Methods: Wallet integration spec (wagmi, ethers.js, viem), transaction UX design (pending/success/failure states), gas UX design (fee estimation, EIP-4337 account abstraction), error state design, L2 onboarding flow, cross-chain UX design, NFT display design, on-chain data display (indexer spec — The Graph, Goldsky)

### Deliver
**smart-contract-deployment** — Launch on-chain with full traceability.  
Methods: Deployment plan (testnet → audit → mainnet), audit remediation tracking, mainnet launch checklist, monitoring setup (Tenderly, OpenZeppelin Defender, Forta), incident response plan, address verification (Etherscan), multi-sig key ceremony, emergency contact tree

**protocol-review** — Continuously validate protocol health.  
Methods: Protocol health dashboard spec, governance proposal writing, security council review, economic security audit, protocol upgrade proposal, DAO vote design, bug bounty scope definition, post-incident on-chain forensics

---

## Content Strategy

### Discover
**content-audit** — Understand what exists and what's working before creating more.  
Methods: Content inventory (URL-level), gap analysis (topic vs. audience vs. funnel stage), content performance audit (traffic, engagement, conversion), competitive content analysis, SEO audit (crawlability, indexability, Core Web Vitals), audience content preference research, search intent mapping, topic demand analysis (keyword volume, trend), content decay analysis

**brand-voice-research** — Understand what voice the audience responds to.  
Methods: Tone-of-voice analysis (existing content), competitor voice mapping, audience language research (community forums, reviews, interviews), existing content audit (voice consistency), voice and tone spectrum definition

### Define
**content-strategy** — Define what gets made, for whom, why, and where it goes.  
Methods: Content pillar definition (3–5 pillars), topic cluster mapping (hub/spoke SEO), editorial mission statement, content-market fit assessment, distribution-first content planning, content calendar framework, repurposing hierarchy (long → short), channel-content matrix, gating strategy (free vs. gated), thought leadership strategy

**brand-voice** — Define the rules of how the brand communicates.  
Methods: Voice and tone guide, messaging hierarchy, persona-specific voice variants (B2B vs. B2C, technical vs. exec), content rules (do/don't list), editorial style guide, inclusive language guide, terminology glossary, AI writing guidelines

### Develop
**content-creation** — Produce content that earns attention and drives action.  
Methods: Long-form article (pillar page), case study, white paper, landing page copy, email nurture sequence (6–10 emails), social content calendar, short-form video script, podcast episode outline, webinar script, changelog/release notes, technical documentation, comparison page, ROI calculator spec, product demo script, customer story interview guide

**seo-optimization** — Make content findable.  
Methods: Keyword strategy (primary/secondary/LSI), on-page optimization (title, meta, H1–H3, schema), internal linking strategy, external link acquisition brief, schema markup (FAQ, How-To, Article, Product), content brief for SEO, content refresh strategy, featured snippet optimization, local SEO strategy, international SEO (hreflang) strategy

### Deliver
**content-distribution** — Get content in front of the right audience.  
Methods: Distribution playbook (channel-by-channel), content syndication strategy, community seeding plan, influencer amplification brief, paid amplification brief, newsletter strategy, podcast guesting pitch, cross-posting strategy, content partnerships

**content-performance** — Learn what works and do more of it.  
Methods: Analytics review (traffic, engagement, conversion), content attribution analysis, SEO ranking review, engagement analysis (time on page, scroll depth), conversion analysis, content iteration brief, content retirement decision, competitive content benchmarking

---

## PR / Communications

### Discover
**media-landscape** — Understand the media environment before pitching.  
Methods: Journalist and publication mapping (tier 1/2/3), publication analysis (beat, audience, format), competitor coverage analysis, narrative landscape mapping, reputation audit (brand mentions, sentiment), share of voice analysis, social listening, crisis signal monitoring

**story-research** — Find the stories worth telling.  
Methods: Company narrative audit, founding story development, proof points inventory (data, customer wins, milestones), customer story pipeline, executive voice audit, thought leadership positioning, third-party validation inventory (awards, analyst coverage, media mentions)

### Define
**communications-strategy** — Define how the company communicates proactively and reactively.  
Methods: Narrative framework (company/product/executive tracks), key message hierarchy, spokesperson strategy, media tier strategy, proactive vs. reactive cadence, crisis comms framework, embargo strategy, spokesperson training brief, press office process design

**brand-narrative** — Build the story the company tells consistently everywhere.  
Methods: Company story (origin, mission, impact), mission narrative, product narrative, category narrative, founder story, customer success narrative, social impact narrative, technical credibility narrative (for developer audiences)

### Develop
**media-materials** — Create the assets that move journalists to write.  
Methods: Press release, media pitch (email + angle), executive briefing document, press kit, fact sheet, Q&A document (anticipated media questions), spokesperson talking points, byline article outline, contributed content spec, analyst briefing deck, media backgrounder

**crisis-comms** — Prepare for things going wrong before they do.  
Methods: Crisis playbook, dark site design, holding statement templates, stakeholder communication cascade, social media monitoring plan, escalation tree, response time SLA, spokesperson protocol, legal clearance process, post-crisis reputation repair plan

### Deliver
**media-outreach** — Execute coverage strategies that land.  
Methods: Journalist outreach plan (personalized, tiered), embargo strategy, exclusive strategy, launch announcement cadence, analyst briefing plan, investor communications, community announcement, product launch PR wave, award submission strategy, conference speaking strategy

**comms-review** — Measure what the communications function actually achieved.  
Methods: Media coverage analysis (volume, sentiment, tier, message pull-through), share of voice measurement, message penetration analysis, coverage report, crisis retrospective, quarterly comms review, spokesperson effectiveness review

---

## Brand

### Discover
**brand-audit** — Understand where the brand stands before trying to move it.  
Methods: Brand perception research (qualitative + quantitative), visual identity audit, competitive brand analysis, brand equity assessment (awareness, consideration, preference, loyalty), employee brand perception survey, customer touchpoint audit, brand consistency audit across channels, share of voice vs. share of heart analysis

**brand-research** — Understand what the brand could become.  
Methods: Target audience perception research, aspirational brand mapping (brands people love and why), cultural context research, trend analysis (visual, cultural, language), brand archetype mapping, emotional territory mapping, brand elasticity testing

### Define
**brand-strategy** — Define what the brand stands for and how it behaves.  
Methods: Brand positioning statement, brand architecture (branded house, house of brands, endorsed), brand essence (one-line brand truth), brand values (lived, not aspirational), brand personality (Big Five dimensions), target audience definition, brand ladder (attributes → benefits → values → identity), brand promise

**visual-identity** — Define the visual language the brand speaks.  
Methods: Logo concept brief, color palette strategy (primary, secondary, semantic), typography system (typeface pairing, hierarchy, scale), iconography direction, photography style guide, illustration style, motion and animation principles, data visualization style, environmental design direction, packaging direction

### Develop
**brand-expression** — Translate strategy into tangible brand experiences.  
Methods: Brand guidelines document, design system foundations (color tokens, type tokens, spacing tokens), brand voice guide, campaign concept, brand activation design, merchandise design brief, environmental/spatial design brief, event brand design brief, brand partnership framework, social media visual system

**brand-system** — Build the infrastructure that keeps the brand consistent at scale.  
Methods: Design token definition, component library strategy, pattern library architecture, brand governance framework, brand asset management (DAM) spec, brand training program design, brand compliance review process, brand evolution trigger criteria

### Deliver
**brand-launch** — Introduce or re-introduce the brand.  
Methods: Brand rollout plan (internal before external), internal launch (all-hands, swag, comms), external launch (press, social, website), brand training program, asset distribution plan, agency and vendor briefing, brand compliance review checklist

**brand-review** — Measure brand health and evolve deliberately.  
Methods: Brand health metrics (awareness, consideration, NPS, brand love), perception tracking study, visual consistency audit, brand usage audit (internal misuse, external), brand evolution recommendation, brand extension assessment

---

## Creative Direction

### Discover
**creative-research** — Find the creative territory that's available and resonant.  
Methods: Visual trend research (Pinterest, Behance, Are.na, Awwwards), cultural reference mapping, competitor creative audit, audience aesthetic preference research, platform-specific creative research (TikTok vs. Instagram vs. LinkedIn creative norms), motion and animation trend analysis, sound design trend analysis, typography trend analysis

**campaign-research** — Understand what creative has worked and why.  
Methods: Campaign history audit, performance data analysis (CTR, view-through, conversion by creative), creative testing history, audience insight synthesis (what resonates emotionally), cultural moment mapping, seasonal creative opportunity calendar

### Define
**creative-strategy** — Define the creative territory before producing anything.  
Methods: Creative brief, campaign concept, creative platform (the big idea that scales), visual territory definition, messaging territory, tone of voice for campaign, target emotion mapping, cultural tension identification, brand vs. performance creative split

**art-direction** — Give clear direction that a team can execute.  
Methods: Visual direction document, moodboard, reference collection and rationale, color story, typographic direction, photography direction, illustration direction, motion direction, sound design direction, talent/casting direction

### Develop
**creative-production** — Specify what gets made with enough precision to execute.  
Methods: Production brief, asset specifications (dimensions, formats, file types by platform), shot list, storyboard, copy deck, design mockup direction, animation storyboard, 3D rendering brief, CGI specification, voiceover direction, music brief

**creative-iteration** — Test and improve creative before full production.  
Methods: Concept testing plan (quantitative + qualitative), focus group brief, creative review framework, iteration brief, A/B test creative design, creative pre-testing (Kantar, Ipsos brief), rapid prototype for creative (animatic, roughcut)

### Deliver
**creative-launch** — Ship creative assets at production quality.  
Methods: Asset delivery checklist, quality assurance review, platform-specific adaptation brief (asset resizing, format conversion), localization brief (translation, cultural adaptation), accessibility review (captions, alt text, contrast), version control for creative assets

**creative-review** — Learn from what shipped.  
Methods: Performance analysis (by creative variant, platform, audience), creative learning synthesis, iteration recommendation, campaign retrospective, winning creative autopsy (why it worked), creative refresh trigger criteria

---

## Fintech

### Discover
**fintech-research** — Understand the regulatory, competitive, and user landscape.  
Methods: Regulatory landscape mapping (PSD2, Open Banking, PCI-DSS, FCA/SEC/FINRA requirements, DORA), user financial behavior research, competitive product teardown, payment flow analysis, fraud pattern research, BNPL/embedded finance landscape, banking-as-a-service (BaaS) provider evaluation, crypto regulatory landscape

**financial-user-research** — Understand financial behavior and trust barriers.  
Methods: Financial decision-making interview, trust and anxiety research, financial literacy level mapping, job-to-be-done for financial products, onboarding drop-off analysis, financial goal research, behavioral economics audit (loss aversion, anchoring, present bias)

### Define
**fintech-product-spec** — Define financial products with regulatory and UX precision.  
Methods: Financial product specification, KYC/AML framework design, risk model definition, compliance requirement mapping, fraud prevention specification, regulatory sandbox planning, open banking integration spec (PSD2 APIs), data minimization design, consent management design

**payment-design** — Design payment flows that convert and comply.  
Methods: Payment flow design, checkout optimization spec, 3DS2 authentication UX, payment method selection logic, currency and localization design, refund flow design, dispute resolution flow, subscription billing design, usage-based billing design

### Develop
**fintech-ux** — Design financial UX that builds trust.  
Methods: Financial dashboard design, transaction history design, portfolio visualization, financial health score design, goal-setting flow, financial education integration, notification design (balance, fraud alert, payment confirmation), progressive KYC flow, account linking UX

**compliance-build** — Build compliance into the product, not onto it.  
Methods: AML transaction monitoring spec, fraud detection integration spec, regulatory reporting automation design, audit log design, data residency enforcement, PCI-DSS scope reduction design, GDPR compliance in financial data context

### Deliver
**fintech-launch** — Launch financial products safely.  
Methods: Regulatory submission preparation, financial product launch checklist, beta program with compliance controls, incident response for financial systems, user communication design (regulatory disclosures), launch monitoring design (fraud spike detection)

**fintech-review** — Review financial product performance.  
Methods: Financial performance review (conversion, ATV, LTV), fraud rate analysis, compliance audit, regulatory change impact assessment, competitive benchmarking, customer financial health metrics review

---

## Media

### Discover
**audience-research** — Understand what the audience wants to watch, read, or listen to.  
Methods: Audience segmentation analysis, content preference research, platform behavior analysis, competitive media teardown, content performance audit, monetization model research (subscription, advertising, licensing, events), distribution channel analysis, creator economy landscape

**content-landscape** — Map the content territory.  
Methods: Content gap analysis (topics not covered by competitors), format trend analysis (short-form video, newsletters, podcasts, live), algorithm behavior research (YouTube, TikTok, Spotify, Apple), SEO/discoverability analysis, licensing opportunity mapping

### Define
**media-strategy** — Define the content and business model.  
Methods: Content strategy, audience segmentation, monetization framework (ad-supported, subscription, hybrid, licensing), platform strategy, editorial standards and ethics policy, content ownership and IP strategy, creator/contributor model design

**editorial-framework** — Define the rules of what gets made.  
Methods: Editorial mission statement, content format library, editorial calendar, contributor guidelines, fact-checking process, legal review process, accessibility standards, syndication policy

### Develop
**content-production** — Specify the production pipeline.  
Methods: Content production workflow design, editorial calendar management, distribution automation spec, CMS architecture, video production pipeline, podcast production pipeline, newsletter production pipeline, interactive content spec, live event production brief

**monetization-design** — Build revenue into the content experience.  
Methods: Paywall design (hard, soft, metered), subscription onboarding flow, ad placement design, sponsorship integration spec, affiliate integration, premium tier design, events monetization, community membership design

### Deliver
**media-launch** — Launch new content products or formats.  
Methods: Content launch playbook, platform launch strategy, audience acquisition plan, creator partnership plan, PR and earned media strategy, social amplification plan, launch analytics setup

**audience-review** — Measure and grow the audience.  
Methods: Audience metrics review (reach, engagement, retention, churn), content performance audit, monetization performance review, platform algorithm performance analysis, subscriber health review, content iteration recommendation

---

## Government / Public Sector

### Discover
**policy-research** — Understand the policy environment and stakeholder landscape.  
Methods: Policy landscape research, stakeholder mapping (elected officials, civil servants, advocacy groups, affected citizens), citizen needs research, regulatory environment analysis, political context mapping, international precedent research, public opinion research

**service-audit** — Understand how public services actually work in practice.  
Methods: Current-state service mapping, citizen journey research, accessibility audit, digital inclusion assessment, back-office process audit, inter-agency dependency mapping, equity and inclusion audit

### Define
**policy-design** — Define policy that achieves intended outcomes.  
Methods: Policy brief, theory of change, impact assessment (economic, social, environmental), stakeholder consultation design, regulatory impact assessment, sunset clause design, implementation plan, success metrics definition, unintended consequence analysis

**service-design** — Design public services that work for everyone.  
Methods: Service design specification, citizen journey mapping, accessibility requirements (WCAG, EN 301 549), procurement requirements (open standards, vendor neutrality), plain language writing, multi-channel design (digital + in-person + telephone)

### Develop
**public-service-build** — Specify government digital services.  
Methods: Government API design (open standards), citizen authentication design (GOV.UK Verify, Login.gov style), data sharing framework, privacy-by-design specification, legacy system integration spec, open source strategy, transparency reporting design

**stakeholder-engagement** — Design meaningful participation.  
Methods: Public consultation design, citizen assembly facilitation brief, participatory budgeting design, co-design workshop facilitation, community engagement plan, vulnerable population inclusion strategy

### Deliver
**policy-submission** — Deliver policy outputs.  
Methods: Policy submission, regulatory filing, legislative brief, ministerial submission, committee testimony preparation, public consultation summary, implementation guidance

**service-launch** — Launch public-facing services.  
Methods: Phased rollout plan, accessibility compliance review, user acceptance testing with representative citizens, frontline staff training, communications plan (plain language), feedback mechanism design, post-launch monitoring

---

## Non-profit

### Discover
**impact-research** — Understand the problem space and who else is working on it.  
Methods: Impact landscape research, beneficiary needs assessment, theory of change research, donor landscape analysis, grant opportunity mapping, competitor organization analysis, volunteer motivation research, community asset mapping

**beneficiary-research** — Deeply understand the people you serve.  
Methods: Participatory research, beneficiary interview, lived experience co-design session, community listening session, equity and power analysis, stakeholder mapping (funders, partners, beneficiaries, advocates)

### Define
**theory-of-change** — Define the logic of how your work creates impact.  
Methods: Theory of change (inputs → activities → outputs → outcomes → impact), logic model, impact measurement framework, indicator selection (leading/lagging), data collection strategy, baseline assessment design, counterfactual definition

**program-design** — Specify programs that achieve the theory of change.  
Methods: Program design, grant proposal framework, budget design, staffing model, volunteer program design, partnership framework, evaluation plan, equity integration framework

### Develop
**fundraising** — Build campaigns and relationships that fund the mission.  
Methods: Fundraising campaign design, major donor strategy, grant proposal writing, crowdfunding campaign design, planned giving strategy, corporate partnership prospectus, events fundraising design, digital fundraising funnel

**impact-reporting** — Make impact legible to funders and stakeholders.  
Methods: Impact report design, data visualization for impact, beneficiary story collection, outcome data synthesis, donor report, board report, public annual report, grant reporting template

### Deliver
**program-launch** — Roll out programs safely and equitably.  
Methods: Program launch plan, community communication strategy, volunteer recruitment and onboarding, partner activation, digital channel launch, monitoring and evaluation setup

**organizational-review** — Assess organizational health and mission alignment.  
Methods: Program evaluation, funder relationship review, board effectiveness review, staff wellbeing assessment, mission drift audit, strategic plan review, annual impact report

---

## Retail / E-commerce

### Discover
**shopper-research** — Understand how, why, and where people buy.  
Methods: Customer journey research, conversion funnel analysis, cart abandonment analysis, competitive product analysis, pricing research (willingness to pay, price elasticity), return pattern analysis, search behavior analysis (on-site and Google), review mining, in-store vs. digital behavior research, social commerce behavior analysis

**market-research** — Understand the retail landscape.  
Methods: Category analysis, competitive assortment analysis, pricing landscape, supplier landscape, channel mix analysis (DTC, marketplace, wholesale, social commerce), seasonal demand analysis, trend forecasting

### Define
**commerce-strategy** — Define how you sell and to whom.  
Methods: Product catalog strategy, pricing strategy (value, cost-plus, competitive, dynamic), channel strategy (DTC, Amazon, retail), customer segmentation, loyalty program design, subscription commerce design, inventory strategy, international expansion assessment

**experience-design** — Define the commerce experience.  
Methods: Checkout flow specification, product page design spec, search and filter design, recommendation engine spec, personalization framework, mobile commerce design, social commerce integration spec, AR try-on spec, omnichannel experience design

### Develop
**commerce-build** — Specify the technical commerce systems.  
Methods: E-commerce platform evaluation (Shopify, Commerce Layer, custom), headless commerce architecture, payment gateway integration (Stripe, Adyen, Braintree), order management system spec, warehouse management integration, returns management system, loyalty platform integration, CDP integration spec

**marketing-automation** — Build the campaigns that drive repeat purchase.  
Methods: Email marketing automation (welcome, browse abandonment, cart abandonment, post-purchase, winback), SMS marketing design, push notification strategy, loyalty campaign design, referral program design, affiliate program spec

### Deliver
**launch** — Bring new products or experiences to market.  
Methods: Product launch playbook, promotional campaign design, seasonal planning (Black Friday/Cyber Monday, peak periods), influencer and affiliate launch brief, paid media launch strategy

**commerce-review** — Measure and optimize commercial performance.  
Methods: Conversion rate optimization (CRO) review, customer acquisition cost analysis, LTV/cohort analysis, return rate analysis, inventory turnover review, channel performance review, pricing elasticity analysis, customer satisfaction review (NPS, CSAT, CES)

---

## Manufacturing

### Discover
**operations-research** — Understand how production actually works.  
Methods: Process efficiency analysis, value stream mapping, supply chain mapping, quality defect analysis (Pareto, fishbone), equipment performance audit (OEE — Overall Equipment Effectiveness), worker safety assessment, waste analysis (Lean 8 wastes), material flow analysis, capacity analysis

**supply-chain-research** — Map dependencies and risks.  
Methods: Supplier landscape mapping, single-source dependency audit, lead time analysis, inventory carrying cost analysis, demand forecasting model assessment, supply chain risk assessment (geopolitical, climate, logistics), nearshoring/reshoring feasibility

### Define
**process-specification** — Define manufacturing processes with precision.  
Methods: Process specification (work instructions, SOPs), quality control framework (SPC, Six Sigma DMAIC), supply chain requirements definition, safety protocol design (OSHA, ISO 45001), lean manufacturing plan, Kaizen event design, total productive maintenance (TPM) plan, FMEA (Failure Mode and Effects Analysis)

**product-specification** — Define what gets made.  
Methods: Bill of materials (BOM), design for manufacturability review, tolerance analysis, material specification, supplier qualification criteria, prototype specification, regulatory compliance requirements (CE, UL, RoHS, REACH)

### Develop
**process-redesign** — Improve how manufacturing works.  
Methods: Future-state value stream map, automation specification (robotic process, CNC, collaborative robot), quality system redesign, supplier development program, Kanban production system design, 5S implementation plan, visual factory design, ergonomics redesign

**training-design** — Build manufacturing capability.  
Methods: Operator training program, safety training design, quality training, maintenance training (predictive, preventive), skills matrix design, cross-training program, SOP documentation

### Deliver
**process-rollout** — Implement process improvements without disruption.  
Methods: Change management plan (manufacturing context), pilot line design, ramp-up plan, acceptance testing, workforce training rollout, supplier notification and onboarding, ERP/MES configuration spec

**quality-review** — Continuously improve quality and efficiency.  
Methods: Quality audit, Six Sigma project review, OEE review, supply chain performance review, safety audit, continuous improvement log, supplier scorecard review, cost reduction initiative review

---

_Last updated: 2026-05-19_  
_Post-MVP domains (Finance, HR, Sales, CS, Security, Data Science, Research, Education, Healthcare, Real Estate) are logged in memory and queued for the next phase._
