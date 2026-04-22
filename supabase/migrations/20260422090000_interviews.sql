-- =============================================================================
-- Duble Slash — Interview pool tracker
-- Adds an "Interviews" tab to the task board: a contacts table for the 30-person
-- problem-validation interview pool (see _bmad/planning-artifacts/research/
-- user-research-plan.md). Distinct from outreach_contacts because the workflows
-- and lifecycle stages are different — interviews track research evidence
-- collection, not pipeline-to-champion.
--
-- Fully idempotent. Safe to re-run.
-- =============================================================================

-- ───────────────────────────── Stages ────────────────────────────────────────
create table if not exists public.interview_stages (
  id         text primary key,
  label      text not null,
  sort_order int default 0
);

insert into public.interview_stages (id, label, sort_order) values
  ('pool',         'In pool',     10),
  ('outreach',     'Outreach',    20),
  ('scheduled',    'Scheduled',   30),
  ('conducted',    'Conducted',   40),
  ('synthesized',  'Synthesized', 50),
  ('passed',       'Passed',      60),
  ('dropped',      'Dropped',     70)
on conflict (id) do nothing;

-- ───────────────────────────── Buckets (role mix) ────────────────────────────
create table if not exists public.interview_buckets (
  id         text primary key,
  label      text not null,
  target     int default 0,
  sort_order int default 0
);

-- Targets pulled from user-research-plan §2 (Role split). 30-person pool.
insert into public.interview_buckets (id, label, target, sort_order) values
  ('design_lead', 'Design leader (Director+ / Head / VP)',  12, 10),
  ('ic_designer', 'IC designer / design engineer',           8, 20),
  ('pm',          'PM / design-adjacent PM',                 5, 30),
  ('em',          'Eng manager at design-heavy org',         5, 40),
  ('security',    'Security / IT lead (stretch)',            0, 50)
on conflict (id) do nothing;

-- ───────────────────────────── Contacts ──────────────────────────────────────
create table if not exists public.interview_contacts (
  id              text primary key,
  name            text not null,
  role            text,
  company         text,
  company_url     text,
  linkedin        text,
  email           text,
  bucket_id       text references public.interview_buckets(id),
  stage_id        text references public.interview_stages(id),
  owner_id        text references public.people(id),
  tools_used      text,                          -- e.g. "Claude, Cursor, Figma AI"
  next_step       text,
  next_step_due   date,
  conducted_at    date,
  notes_file      text,                          -- relative path under _bmad/planning-artifacts/research/interviews/
  anonymization   text,                          -- "name_omitted" | "title_ok" | "quotes_ok"
  notes           text,
  sort_order      int default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

drop trigger if exists interview_contacts_touch on public.interview_contacts;
create trigger interview_contacts_touch before update on public.interview_contacts
  for each row execute function public.touch_updated_at();

-- ───────────────────────────── Tasks ↔ Interview contacts ────────────────────
-- Allow a task to be linked to an interview contact (e.g. "schedule call with X").
-- Same shape as the outreach contact_id column on tasks.
alter table public.tasks
  add column if not exists interview_contact_id text references public.interview_contacts(id);

-- ───────────────────────────── RLS ───────────────────────────────────────────
alter table public.interview_stages    enable row level security;
alter table public.interview_buckets   enable row level security;
alter table public.interview_contacts  enable row level security;

do $$
declare t text;
begin
  foreach t in array array['interview_stages','interview_buckets','interview_contacts'] loop
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
  foreach t in array array['interview_stages','interview_buckets','interview_contacts'] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then
      null;
    end;
  end loop;
end $$;

-- No seed contacts. Tal populates the pool as outreach starts.
-- The 39 design leaders imported into outreach_contacts (see
-- 20260421240000_outreach_import_linkedin.sql) are the candidate source.
