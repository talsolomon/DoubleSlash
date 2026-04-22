// Vercel Serverless Function — sync an interview from Supabase → GitHub.
//
// Writes _bmad/planning-artifacts/research/interviews/<slug>.md on main via
// the GitHub Contents API, using a personal access token stored in the
// GITHUB_TOKEN Vercel env var. Auth is passed through to Supabase so RLS
// enforces that only allowlisted users can trigger a sync.
//
// POST /api/sync-interview
//   Authorization: Bearer <supabase session JWT>
//   body: { interviewId: string }
// → 200 { path, commit, htmlUrl, slug }
//   4xx { error }

const SUPABASE_URL = 'https://rbuynvswyplfyxuxpyxy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_A-bo5izhAVcluPdN5d_T2Q_pPqIHSy-';
const REPO = 'talsolomon/DubleSlash';
const NOTES_DIR = '_bmad/planning-artifacts/research/interviews';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST only' });
  }

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization: Bearer <jwt>' });
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : (req.body || {});
  const { interviewId } = body;
  if (!interviewId || typeof interviewId !== 'string') {
    return res.status(400).json({ error: 'Missing interviewId' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({
      error: 'GITHUB_TOKEN env var not configured in Vercel. See tasks/README.md for setup.'
    });
  }

  // Pull data from Supabase using the caller's JWT — RLS enforces allowlist.
  const sHeaders = { apikey: SUPABASE_ANON_KEY, Authorization: authHeader };
  const get = (path) => fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: sHeaders }).then(async r => {
    if (!r.ok) throw new Error(`Supabase ${path} → ${r.status} ${await r.text()}`);
    return r.json();
  });

  let iv, responses, questions, buckets, stages;
  try {
    [[iv], responses, questions, buckets, stages] = await Promise.all([
      get(`interview_contacts?id=eq.${encodeURIComponent(interviewId)}&select=*`),
      get(`interview_responses?interview_id=eq.${encodeURIComponent(interviewId)}&select=*`),
      get(`interview_questions?select=*&order=sort_order`),
      get(`interview_buckets?select=*`),
      get(`interview_stages?select=*`)
    ]);
  } catch (e) {
    return res.status(502).json({ error: 'Supabase fetch failed: ' + e.message });
  }

  if (!iv) {
    return res.status(404).json({ error: 'Interview not found, or RLS denied access.' });
  }

  const md = buildMarkdown(iv, responses, questions, buckets, stages);
  const slug = slugify(iv.name) || iv.id;
  const path = `${NOTES_DIR}/${slug}.md`;
  const apiUrl = `https://api.github.com/repos/${REPO}/contents/${path}`;

  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'dubleslash-tasks'
  };

  // If the file already exists, we need its SHA to update it.
  let sha;
  try {
    const existing = await fetch(apiUrl + '?ref=main', { headers: ghHeaders });
    if (existing.ok) {
      const j = await existing.json();
      sha = j.sha;
    } else if (existing.status !== 404) {
      const txt = await existing.text();
      return res.status(502).json({ error: `GitHub read failed (${existing.status}): ${txt}` });
    }
  } catch (e) {
    return res.status(502).json({ error: 'GitHub read failed: ' + e.message });
  }

  const commitMsg = `Interview notes: ${iv.name || slug}${sha ? ' (update)' : ' (new)'}`;
  const putBody = {
    message: commitMsg,
    content: Buffer.from(md, 'utf-8').toString('base64'),
    branch: 'main',
    committer: {
      name: 'Tal Solomon',
      email: 'talsolomon21@gmail.com'
    }
  };
  if (sha) putBody.sha = sha;

  try {
    const put = await fetch(apiUrl, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(putBody)
    });
    if (!put.ok) {
      const txt = await put.text();
      return res.status(502).json({ error: `GitHub write failed (${put.status}): ${txt}` });
    }
    const result = await put.json();
    return res.status(200).json({
      path,
      slug,
      commit: result.commit?.sha,
      htmlUrl: result.content?.html_url,
      action: sha ? 'updated' : 'created'
    });
  } catch (e) {
    return res.status(502).json({ error: 'GitHub write failed: ' + e.message });
  }
}

/* ---------- helpers ---------- */

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}

function slugify(s) {
  if (!s) return '';
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function buildMarkdown(iv, responses, questions, buckets, stages) {
  const bucket = buckets.find(b => b.id === iv.bucket_id);
  const stage = stages.find(s => s.id === iv.stage_id);
  const responseFor = (qk) => responses.find(r => r.question_key === qk);
  const sorted = [...questions].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const lines = [];
  lines.push(`# Interview — ${iv.name || 'Unnamed'}${iv.role ? `, ${iv.role}` : ''}${iv.company ? `, ${iv.company}` : ''}`);
  lines.push('');
  lines.push(`**Date:** ${iv.conducted_at || '—'}`);
  if (iv.scheduled_at) lines.push(`**Scheduled:** ${new Date(iv.scheduled_at).toISOString()}`);
  if (iv.tools_used) lines.push(`**Tools used weekly:** ${iv.tools_used}`);
  if (bucket) lines.push(`**Pool bucket:** ${bucket.label}`);
  if (stage) lines.push(`**Stage:** ${stage.label}`);
  if (iv.anonymization) lines.push(`**Anonymization:** ${iv.anonymization}`);
  if (iv.meeting_url) lines.push(`**Meeting:** ${iv.meeting_url}`);
  lines.push('');
  lines.push(`*Synced from Tasks → Supabase. Source of truth: \`interview_contacts.id = ${iv.id}\`.*`);
  lines.push('');

  // Build section groupings in sort order
  const sections = [];
  const seen = new Set();
  sorted.forEach(q => {
    if (!seen.has(q.section)) { seen.add(q.section); sections.push(q.section); }
  });
  const bySection = {};
  sorted.forEach(q => { (bySection[q.section] ||= []).push(q); });

  sections.forEach(sec => {
    lines.push(`## ${sec}`);
    lines.push('');
    bySection[sec].forEach(q => {
      const r = responseFor(q.question_key) || {};
      const hasAnything = r.response || r.key_quote || r.signal || r.would_pay;
      lines.push(`**${(q.question_type || 'probe').replace('_', '-')}:** ${q.question_text}`);
      if (r.response) {
        lines.push('');
        r.response.split('\n').forEach(l => lines.push('> ' + l));
      }
      if (r.key_quote) lines.push(`- Key quote: "${r.key_quote}"`);
      if (r.signal) lines.push(`- Signal: **${r.signal}**`);
      if (r.would_pay) lines.push('- Would-pay marker: ✓');
      if (!hasAnything) lines.push('- *(no response)*');
      lines.push('');
    });
  });

  // Tagged quotes roll-up
  const tagged = sorted
    .map(q => ({ q, r: responseFor(q.question_key) }))
    .filter(x => x.r && x.r.key_quote);
  if (tagged.length) {
    lines.push('## Tagged quotes (cross-theme)');
    lines.push('');
    tagged.forEach(({ q, r }) => {
      const tag = q.theme ? `#${q.theme}-${q.question_type}` : `#${q.question_type}`;
      lines.push(`- "${r.key_quote}" — ${tag}${r.signal ? ` #${r.signal}` : ''}${r.would_pay ? ' #would-pay' : ''}`);
    });
    lines.push('');
  }

  if (iv.notes) {
    lines.push('## Additional notes');
    lines.push('');
    lines.push(iv.notes);
    lines.push('');
  }

  return lines.join('\n');
}
