# Task Board (`doubleslash-tasks`) — setup & deploy

Live, shared task board for Tal + Shenhav. Supabase for data + auth + realtime. Vercel for hosting.

**Live URL (production):** https://tasks-seven-zeta.vercel.app
*(will become `doubleslash-tasks.vercel.app` after the Vercel rename in step 3)*

## Two layers of safety

The site is publicly reachable, but data is locked down by **two independent gates**:

1. **Password auth (Supabase)** — only the two auth accounts created by `bootstrap-users.sql` exist. No one else can sign in; there's no public signup path in the app.
2. **Row-Level Security (Postgres)** — every table policy checks `auth.email() in (select email from allowed_emails)`. Even a leaked anon key reads nothing.

So "live and easy to access" + "super safe" are not in tension here — the Vercel SSO wall is redundant and we keep it OFF (see step 3).

## 1. One-time Supabase setup (3 min, 2 SQL scripts)

1. Open [Supabase dashboard](https://supabase.com/dashboard) → your `rbuynvswyplfyxuxpyxy` project.
2. **SQL Editor** → **New query** → paste the entire contents of [`../supabase/setup.sql`](../supabase/setup.sql) → **Run**. Creates all tables, RLS, realtime publication, seed tasks + KPIs.
3. **SQL Editor** → **New query** → open [`../supabase/bootstrap-users.sql`](../supabase/bootstrap-users.sql) → edit the two passwords + Shenhav's real email at the top → paste → **Run**. This creates both auth accounts directly, pre-confirmed, no email round-trip — side-stepping Supabase's magic-link rate limit entirely.

That's it. **You don't need to configure email confirmation, providers, or redirect URLs** — the bootstrap script stamps `email_confirmed_at` directly, so Supabase's email settings don't come into play.

To add a new allowed user later, re-run `bootstrap-users.sql` with their row added (or do it via Dashboard → Authentication → Users → "Add user" → Create new user → tick "Auto Confirm User", *and* insert their email into `public.allowed_emails`).

## 2. Run it locally

Because `index.html` uses ES modules, you need to serve it over HTTP (not `file://`):

```bash
cd tasks
python3 -m http.server 5173
# then open http://localhost:5173
```

Sign in with `talsolomon21@gmail.com` and the password you set in `bootstrap-users.sql`. One screen and you're in — no email.

## 3. Vercel project settings (one-time, dashboard)

The project is already deployed (`talsolomon21-gmailcoms-projects/tasks`). Two settings to fix in the [Vercel dashboard](https://vercel.com/talsolomon21-gmailcoms-projects/tasks/settings):

1. **Settings → Deployment Protection → Vercel Authentication** → set to **Disabled** (or "Only Preview Deployments"). Without this change, Tal and Shenhav both hit a 401 SSO wall before they ever see the gate page. Safety is preserved by the Supabase magic-link + RLS combo above.
2. **Settings → General → Project Name** → rename `tasks` → `doubleslash-tasks` so it's distinguishable from the marketing site project (`website` → `doubleslash-website`). The production URL becomes `https://doubleslash-tasks.vercel.app`. Add that to Supabase redirect URLs (step 1.4) after rename.

**Redeploy after future code changes:**
```bash
cd tasks
npx vercel --prod
```

## Data model (for reference)

| Table           | Purpose                                       |
|-----------------|-----------------------------------------------|
| `allowed_emails`| Who can sign in (RLS gate).                   |
| `groups`        | Marketing / Product / Dev-Sec / …             |
| `people`        | Tal / Shenhav / Claude / Advisor              |
| `statuses`      | Todo / In Progress / Blocked / Review / Done  |
| `priorities`    | P0 / P1 / P2                                  |
| `tasks`         | One row per task                              |
| `kpis`          | M1–M9 OSS-launch scorecard                    |
| `repo_commits`  | Mirror of relevant GitHub activity            |

RLS: only rows visible/writable to `allowed_emails`. Changes stream to all connected browsers via Supabase Realtime.

## Adding people

1. Insert into `allowed_emails` (gates sign-in).
2. Insert into `people` (exposes them as a task owner). `id` should be a slug; `name` is the display label.
3. If their email's local-part matches their `people.name` (lowercased), "My Week" will follow them automatically. Otherwise, edit `emailToPersonId()` in `index.html` to add the mapping.

## Troubleshooting

- **"Not allowlisted" screen after sign-in** → their email isn't in `allowed_emails`. Re-run `bootstrap-users.sql`.
- **"Invalid login credentials"** → wrong password, or the auth row doesn't exist / got wiped. Re-run `bootstrap-users.sql` to recreate with a known password.
- **Forgot password** → easiest fix: edit the password at the top of `bootstrap-users.sql` and re-run it. The script cleans up and recreates the user.
- **Changes don't appear in other browser** → check Supabase → Database → Replication → `supabase_realtime` publication includes the table. The setup SQL does this, but verify.
- **Changes fail silently** → open browser devtools console; RLS errors show there.
