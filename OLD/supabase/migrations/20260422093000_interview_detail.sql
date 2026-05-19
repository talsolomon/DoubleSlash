-- =============================================================================
-- Duble Slash — Interview detail + template
-- Extends the interview tracking to support running an interview *inside* Tasks:
--   1. Adds scheduled_at / meeting_url / calendar_event_link to interview_contacts
--   2. interview_questions — static template of the 29-question guide, seeded
--      from _bmad/planning-artifacts/research/interview-guide.csv
--   3. interview_responses — per-interview responses for each template question
--
-- Fully idempotent. Safe to re-run.
-- =============================================================================

-- ───────────────────────────── Extend interview_contacts ─────────────────────
alter table public.interview_contacts
  add column if not exists scheduled_at         timestamptz,
  add column if not exists meeting_url          text,
  add column if not exists calendar_event_link  text;

-- ───────────────────────────── Question template ─────────────────────────────
-- One row per question in the guide. Immutable reference data.
-- question_key is a stable identifier (e.g. "theme_a_anchor") used to link
-- responses back to questions — safe to rename question_text without losing data.
create table if not exists public.interview_questions (
  question_key   text primary key,
  section        text not null,          -- "Intro" | "Theme A — Context memory" | ...
  theme          text,                   -- "A" | "B" | "C" | "D" | "E" | null for Intro/Open/Close
  hypotheses     text,                   -- "H1, H2, H7, H12" etc.
  timing_min     int,
  question_type  text,                   -- "anchor" | "probe" | "counter_probe" | "consent" | "context" | "screening" | "close"
  question_text  text not null,
  sort_order     int default 0
);

-- ───────────────────────────── Responses ─────────────────────────────────────
-- One row per (interview, question). Holds the interviewee's response,
-- an optional lifted quote, a signal tag (validates/falsifies/surprise),
-- and a would-pay flag for the §6 open-ended "what would you pay to fix" probe.
create table if not exists public.interview_responses (
  id             text primary key,
  interview_id   text references public.interview_contacts(id) on delete cascade,
  question_key   text references public.interview_questions(question_key),
  response       text,
  key_quote      text,
  signal         text,                   -- "validates" | "falsifies" | "surprise" | null
  would_pay      boolean default false,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now(),
  unique (interview_id, question_key)
);

drop trigger if exists interview_responses_touch on public.interview_responses;
create trigger interview_responses_touch before update on public.interview_responses
  for each row execute function public.touch_updated_at();

-- ───────────────────────────── RLS ───────────────────────────────────────────
alter table public.interview_questions  enable row level security;
alter table public.interview_responses  enable row level security;

do $$
declare t text;
begin
  foreach t in array array['interview_questions','interview_responses'] loop
    execute format('drop policy if exists "allowed_all" on public.%I', t);
    execute format(
      'create policy "allowed_all" on public.%I for all using (public.is_allowed()) with check (public.is_allowed())',
      t
    );
  end loop;
end $$;

-- ───────────────────────────── Realtime ──────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array['interview_questions','interview_responses'] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then
      null;
    end;
  end loop;
end $$;

-- ───────────────────────────── Seed the template ─────────────────────────────
-- Mirrors _bmad/planning-artifacts/research/interview-guide.csv and
-- _bmad/planning-artifacts/research/user-research-plan.md §4.
insert into public.interview_questions
  (question_key, section, theme, hypotheses, timing_min, question_type, question_text, sort_order)
values
  ('intro_consent',     'Intro', null, null, 3, 'consent',
   'Consent to record + use anonymized quotes in investor materials. Name/company omitted by default; title/role OK unless you say otherwise.', 10),
  ('intro_context',     'Intro', null, null, 3, 'context',
   'What''s your role? Team size? Rough % of your work that involves AI tools right now?', 20),
  ('intro_screening',   'Intro', null, null, 3, 'screening',
   'Which AI tools are you using weekly? (Need 2+ of: Claude, ChatGPT, Cursor, Copilot, Perplexity, Figma AI)', 30),

  ('theme_a_anchor',    'Theme A — Context memory', 'A', 'H1, H2, H7, H12', 6, 'anchor',
   'Walk me through the last time you had to re-explain context to Claude, ChatGPT, or Cursor. What happened, and how did it feel?', 100),
  ('theme_a_probe_1',   'Theme A — Context memory', 'A', 'H1, H2, H7, H12', 6, 'probe',
   'Across the AI tools you use, where does context live? When you switch tools, what do you lose?', 110),
  ('theme_a_probe_2',   'Theme A — Context memory', 'A', 'H1, H2, H7, H12', 6, 'probe',
   'How long does it typically take to get back into a session from yesterday or last week?', 120),
  ('theme_a_counter',   'Theme A — Context memory', 'A', 'H1, H2, H7, H12', 6, 'counter_probe',
   'Do Claude Projects, ChatGPT memory, or Cursor''s rules already solve this for you?', 130),
  ('theme_a_probe_h1',  'Theme A — Context memory', 'A', 'H1',               6, 'probe',
   'If someone built a "project management app for AI work" that you had to open and work inside — would you use it? Why or why not?', 140),

  ('theme_b_anchor',    'Theme B — Team memory', 'B', 'H3, H6, H11', 6, 'anchor',
   'How does your team share what people have done with AI? Slack? Shared docs? Not at all?', 200),
  ('theme_b_probe_1',   'Theme B — Team memory', 'B', 'H3, H6, H11', 6, 'probe',
   'In the last 30 days, can you name a moment two people on your team solved the same thing with AI separately?', 210),
  ('theme_b_probe_2',   'Theme B — Team memory', 'B', 'H3, H6, H11', 6, 'probe',
   'If a teammate disappeared tomorrow, what AI work of theirs would be lost — and would anyone notice?', 220),
  ('theme_b_counter',   'Theme B — Team memory', 'B', 'H3, H6, H11', 6, 'counter_probe',
   'Does Slack + shared Notion already cover this? Where specifically does it break down?', 230),

  ('theme_c_anchor',    'Theme C — Operating model', 'C', 'H4, H8, H9', 8, 'anchor',
   'Does your team have a *named* process for working WITH AI? What do you call it? (Listen for: "we don''t really", "kind of Agile", "we''re figuring it out".)', 300),
  ('theme_c_probe_1',   'Theme C — Operating model', 'C', 'H4, H8, H9', 8, 'probe',
   'Tell me about a time your team''s existing process — Agile, Scrum, Shape Up, whatever — felt *wrong* for AI-assisted work.', 310),
  ('theme_c_probe_2',   'Theme C — Operating model', 'C', 'H4, H8, H9', 8, 'probe',
   'Does AI ever feel like it''s running too fast for your team''s rhythm? Or too slow?', 320),
  ('theme_c_probe_3',   'Theme C — Operating model', 'C', 'H4, H8, H9', 8, 'probe',
   'If I said "we run a Fish model — Head phase is explore, Body is build, Tail is ship, and every card is sized bigger-vs-smaller and known-vs-unknown" — does any part of that vocabulary map to something missing in your world?', 330),
  ('theme_c_counter',   'Theme C — Operating model', 'C', 'H4, H8, H9', 8, 'counter_probe',
   'Is Agile-with-AI basically fine for you, just faster? What would have to change for you to switch frameworks?', 340),

  ('theme_d_anchor',    'Theme D — Install + trust', 'D', 'H5', 6, 'anchor',
   'Walk me through the last AI tool you installed. What happened?', 400),
  ('theme_d_probe_1',   'Theme D — Install + trust', 'D', 'H5', 6, 'probe',
   'Any AI tool you wanted to try but gave up on? Why?', 410),
  ('theme_d_probe_2',   'Theme D — Install + trust', 'D', 'H5', 6, 'probe',
   'When you install something AI-powered on your work machine, what goes through your head? Any hesitation about permissions, data, what it''s watching?', 420),
  ('theme_d_counter',   'Theme D — Install + trust', 'D', 'H5', 6, 'counter_probe',
   'For you, is install complexity the blocker, or is it something else — time, priority, permission from IT?', 430),

  ('theme_e_anchor',    'Theme E — Governance + ROI', 'E', 'H10, H11', 5, 'anchor',
   'Does anyone on your team use personal Claude or ChatGPT accounts for work? (Ask casually — surfaces shadow AI without judgment.)', 500),
  ('theme_e_probe_1',   'Theme E — Governance + ROI', 'E', 'H10, H11', 5, 'probe',
   'If your VP asked "is AI paying off for your team", could you answer with data?', 510),
  ('theme_e_probe_2',   'Theme E — Governance + ROI', 'E', 'H10, H11', 5, 'probe',
   'Has your company''s security or legal team raised AI usage concerns? What happened?', 520),

  ('open_missing',      'Section 6 — Open-ended', null, null, 5, 'anchor',
   'What didn''t I ask about that I should have? What AI-workflow pain have you hit that none of my questions touched?', 600),
  ('open_would_pay',    'Section 6 — Open-ended', null, null, 5, 'probe',
   'What pain in your AI workflow would you pay — actual money, not "I''d try it" — to make go away?', 610),

  ('close_thanks',      'Close', null, null, 2, 'close',
   'Thank the interviewee.', 700),
  ('close_referral',    'Close', null, null, 2, 'close',
   'Ask for 1 referral (design leader or hands-on practitioner who should be in this research).', 710),
  ('close_anon',        'Close', null, null, 2, 'close',
   'Confirm anonymization preferences — name/company omitted, title/role OK, quotes OK.', 720)
on conflict (question_key) do update set
  section       = excluded.section,
  theme         = excluded.theme,
  hypotheses    = excluded.hypotheses,
  timing_min    = excluded.timing_min,
  question_type = excluded.question_type,
  question_text = excluded.question_text,
  sort_order    = excluded.sort_order;
