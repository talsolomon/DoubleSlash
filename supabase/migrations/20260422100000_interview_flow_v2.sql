-- =============================================================================
-- Duble Slash — Interview flow v2 (smoother, 30-min target)
-- Replaces the 29-question template with a 17-question, 4-section flow that's
-- easier to conduct conversationally. Themes A+B merged into "Memory"; D+E
-- merged into "Install + trust". C (operating model) kept as the headline
-- differentiator. Each section has one anchor + 1–3 probes + a counter-probe.
--
-- Fully idempotent. Safe to re-run.
-- Note: drops question_keys that aren't in the new set. Since
-- interview_responses.question_key FKs with on delete cascade, any responses
-- tied to retired keys are lost — prod DB is empty of responses today.
-- =============================================================================

-- Retire keys that aren't in the new flow
delete from public.interview_questions
where question_key not in (
  'intro_consent', 'intro_setup',
  'memory_session', 'memory_team', 'memory_counter',
  'model_named', 'model_breaking', 'model_fish', 'model_counter',
  'install_story', 'install_trust', 'install_shadow', 'install_counter',
  'open_pay', 'open_missed',
  'close_referral', 'close_anon'
);

-- Upsert the new flow
insert into public.interview_questions
  (question_key, section, theme, hypotheses, timing_min, question_type, question_text, sort_order)
values
  -- Intro (2 min)
  ('intro_consent', 'Intro', null, null, 2, 'consent',
   'Ask consent to record and use anonymized quotes in investor materials. Default: name + company omitted; title/role OK unless they say otherwise.', 10),
  ('intro_setup',   'Intro', null, null, 2, 'anchor',
   'Quick setup — your role, team size, and roughly what % of your work involves AI tools right now.', 20),

  -- Memory (Themes A + B merged) — 7 min
  ('memory_session', 'Memory — yours and your team''s', 'A+B', 'H1, H2, H3, H6, H7, H11, H12', 3, 'anchor',
   'Tell me about a recent AI session you wish was still open — or that you had to restart from scratch. What happened? What got lost?', 100),
  ('memory_team',    'Memory — yours and your team''s', 'A+B', 'H1, H2, H3, H6, H7, H11, H12', 2, 'probe',
   'Who on your team knows what you just did with AI? How does that knowledge travel across people — or does it?', 110),
  ('memory_counter', 'Memory — yours and your team''s', 'A+B', 'H1, H2, H3, H6, H7, H11, H12', 2, 'counter_probe',
   'Do Claude Projects, ChatGPT memory, Cursor rules, or a shared Notion already cover this for you? Where does it break?', 120),

  -- Operating model (Theme C) — 8 min, the headline bet
  ('model_named',     'How the team actually runs', 'C', 'H4, H8, H9', 2, 'anchor',
   'Does your team have a *named* process for AI-assisted work? What do you call it? (Listen for: "not really", "kind of Agile", "we''re figuring it out".)', 200),
  ('model_breaking',  'How the team actually runs', 'C', 'H4, H8, H9', 3, 'probe',
   'Walk me through a time your existing process — Agile, sprints, Shape Up, whatever — felt *off* because AI moved faster (or slower) than the rhythm it was built for.', 210),
  ('model_fish',      'How the team actually runs', 'C', 'H4, H8, H9', 2, 'probe',
   'If I said: "Fish model — Head explores, Body builds, Tail ships, and every task is sized bigger-vs-smaller × known-vs-unknown" — does any part of that vocabulary map to something missing in your world?', 220),
  ('model_counter',   'How the team actually runs', 'C', 'H4, H8, H9', 1, 'counter_probe',
   'Is Agile-with-AI basically fine for you, just faster? What would have to change for you to switch frameworks?', 230),

  -- Install + trust (Themes D + E merged) — 6 min
  ('install_story',   'Install + trust', 'D+E', 'H5, H10, H11', 2, 'anchor',
   'Walk me through the last AI tool you tried to install on your work machine. What happened?', 300),
  ('install_trust',   'Install + trust', 'D+E', 'H5, H10, H11', 2, 'probe',
   'When something AI-powered lands on your machine, what runs through your head — permissions, data, what it''s watching, where things go?', 310),
  ('install_shadow',  'Install + trust', 'D+E', 'H5, H10, H11', 1, 'probe',
   'Does anyone on your team use personal Claude or ChatGPT accounts for work? Why? (Ask casually — surfaces shadow AI without judgment.)', 320),
  ('install_counter', 'Install + trust', 'D+E', 'H5, H10, H11', 1, 'counter_probe',
   'Is install actually the blocker, or is it something else — time, priority, permission from IT?', 330),

  -- Open-ended — 4 min, would-pay is the only thing that counts
  ('open_pay',     'The pain you''d pay to fix', null, null, 3, 'anchor',
   'What pain in your AI workflow would you pay — actual money, not "I''d try it" — to make go away?', 400),
  ('open_missed',  'The pain you''d pay to fix', null, null, 1, 'probe',
   'What should I have asked that I didn''t? What AI-workflow pain did none of my questions touch?', 410),

  -- Close — 2 min
  ('close_referral', 'Close', null, null, 1, 'close',
   'Ask for 1 referral — one design leader or hands-on practitioner who should be in this research.', 500),
  ('close_anon',     'Close', null, null, 1, 'close',
   'Confirm anonymization preferences — name/company omitted, title/role OK, or fully anonymous quotes.', 510)
on conflict (question_key) do update set
  section       = excluded.section,
  theme         = excluded.theme,
  hypotheses    = excluded.hypotheses,
  timing_min    = excluded.timing_min,
  question_type = excluded.question_type,
  question_text = excluded.question_text,
  sort_order    = excluded.sort_order;
