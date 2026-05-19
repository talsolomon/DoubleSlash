-- =============================================================================
-- Duble Slash — folder reorg path update (2026-04-24)
-- Moves content out of `_bmad/` into top-level `planning/`. Rewrites any path
-- references in `public.tasks.notes`. Idempotent — safe to re-run.
--
-- Old → New:
--   _bmad/planning-artifacts/<x>              → planning/<x>
--   _bmad/implementation-artifacts/           → planning/stories/
--   _bmad/docs/redaction-rules.md             → planning/redaction-rules.md
--   _bmad/docs/{market,domain,technical}-*.md → planning/research/{bucket}/<x>
--
-- _bmad/docs/bmad-*.md (BMAD-about-BMAD) stays put.
-- =============================================================================

-- Most-specific patterns first so they don't get swallowed by the general ones.
update public.tasks set notes = replace(notes,
  '_bmad/planning-artifacts/research/interviews/',
  'planning/research/user/interviews/')
  where notes like '%_bmad/planning-artifacts/research/interviews/%';

update public.tasks set notes = replace(notes,
  '_bmad/planning-artifacts/research/',
  'planning/research/user/')
  where notes like '%_bmad/planning-artifacts/research/%';

update public.tasks set notes = replace(notes,
  '_bmad/planning-artifacts/company/',
  'planning/company/')
  where notes like '%_bmad/planning-artifacts/company/%';

update public.tasks set notes = replace(notes,
  '_bmad/planning-artifacts/briefs/',
  'planning/briefs/')
  where notes like '%_bmad/planning-artifacts/briefs/%';

update public.tasks set notes = replace(notes,
  '_bmad/planning-artifacts/brainstorms/',
  'planning/brainstorms/')
  where notes like '%_bmad/planning-artifacts/brainstorms/%';

update public.tasks set notes = replace(notes,
  '_bmad/planning-artifacts/pitch-decks/',
  'planning/pitch-decks/')
  where notes like '%_bmad/planning-artifacts/pitch-decks/%';

update public.tasks set notes = replace(notes,
  '_bmad/planning-artifacts/prd/',
  'planning/prd/')
  where notes like '%_bmad/planning-artifacts/prd/%';

update public.tasks set notes = replace(notes,
  '_bmad/planning-artifacts/ux/',
  'planning/ux/')
  where notes like '%_bmad/planning-artifacts/ux/%';

update public.tasks set notes = replace(notes,
  '_bmad/planning-artifacts/task-board.md',
  'planning/task-board.md')
  where notes like '%_bmad/planning-artifacts/task-board.md%';

update public.tasks set notes = replace(notes,
  '_bmad/implementation-artifacts/',
  'planning/stories/')
  where notes like '%_bmad/implementation-artifacts/%';

-- Research docs moved from _bmad/docs/ into planning/research/<bucket>/.
update public.tasks set notes = replace(notes,
  '_bmad/docs/market-research-agent-frameworks.md',
  'planning/research/market/market-research-agent-frameworks.md')
  where notes like '%_bmad/docs/market-research-agent-frameworks.md%';

update public.tasks set notes = replace(notes,
  '_bmad/docs/market-research-collab-capture-layer.md',
  'planning/research/market/market-research-collab-capture-layer.md')
  where notes like '%_bmad/docs/market-research-collab-capture-layer.md%';

update public.tasks set notes = replace(notes,
  '_bmad/docs/domain-research-capture-legality.md',
  'planning/research/domain/domain-research-capture-legality.md')
  where notes like '%_bmad/docs/domain-research-capture-legality.md%';

update public.tasks set notes = replace(notes,
  '_bmad/docs/domain-research-oss-license-governance.md',
  'planning/research/domain/domain-research-oss-license-governance.md')
  where notes like '%_bmad/docs/domain-research-oss-license-governance.md%';

update public.tasks set notes = replace(notes,
  '_bmad/docs/technical-research-duble-slash-stack.md',
  'planning/research/technical/technical-research-duble-slash-stack.md')
  where notes like '%_bmad/docs/technical-research-duble-slash-stack.md%';

update public.tasks set notes = replace(notes,
  '_bmad/docs/redaction-rules.md',
  'planning/redaction-rules.md')
  where notes like '%_bmad/docs/redaction-rules.md%';

-- Generic "save memo under _bmad/docs/" for non-BMAD topics → planning/research/.
-- Rewrite only trailing-slash references so we don't touch bmad-teardown-for-our-agents.md
-- or bmad-shape-adoption.md (both stay in _bmad/docs/).
update public.tasks set notes = replace(notes,
  'under `_bmad/docs/`',
  'under `planning/research/`')
  where notes like '%under `_bmad/docs/`%';

update public.tasks set notes = replace(notes,
  'add to `_bmad/docs/`',
  'add to `planning/research/`')
  where notes like '%add to `_bmad/docs/`%';
