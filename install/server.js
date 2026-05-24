#!/usr/bin/env node
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

// ─── Config ───────────────────────────────────────────────────────────────────
const PORT = 3333;
const argv = process.argv.slice(2);
const projectArg = argv.find(a => a.startsWith('--project='));
const PROJECT_DIR = projectArg ? path.resolve(projectArg.replace('--project=', '')) : process.cwd();
const encodedPath = PROJECT_DIR.replace(/\//g, '-');
const MEMORY_DIR = path.join(os.homedir(), '.claude', 'projects', encodedPath, 'memory');
const KANBAN_FILE = path.join(PROJECT_DIR, 'kanban.md');
const NODEMAP_FILE = path.join(PROJECT_DIR, 'node-map.md');

// ─── SSE ──────────────────────────────────────────────────────────────────────
const clients = new Set();
function broadcast() {
  const msg = `data: ${JSON.stringify({ ts: Date.now() })}\n\n`;
  for (const res of [...clients]) { try { res.write(msg); } catch { clients.delete(res); } }
}

// ─── Watchers ─────────────────────────────────────────────────────────────────
function watchDir(dir, filter) {
  if (!fs.existsSync(dir)) return false;
  try { fs.watch(dir, { persistent: true }, (_, f) => { if (!f || filter(f)) broadcast(); }); return true; }
  catch { return false; }
}
function setupWatchers() {
  watchDir(PROJECT_DIR, f => ['kanban.md', 'node-map.md', 'memory.md'].includes(f));
  if (!watchDir(MEMORY_DIR, f => f.endsWith('.md'))) setTimeout(setupWatchers, 4000);
}

// ─── Parsers ──────────────────────────────────────────────────────────────────
function parseKanban(text) {
  const cols = [], DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  let col = null;
  for (const line of text.split('\n')) {
    if (/^##\s+/.test(line)) { col = { name: line.replace(/^##\s+/, '').trim(), cards: [] }; cols.push(col); continue; }
    if (!col || !/^\s*[-*]\s+/.test(line)) continue;
    const raw = line.replace(/^\s*[-*]\s+/, '').trim();
    const done = /\[x\]/i.test(raw), blocked = /\[-\]/.test(raw);
    const tags = []; let session = null;
    let m; const tagRe = /\[([^\]]+)\]/g;
    while ((m = tagRe.exec(raw)) !== null) {
      if (/^[xX-]$/.test(m[1])) continue;
      DATE_RE.test(m[1]) ? (session = m[1]) : tags.push(m[1]);
    }
    const cardText = raw.replace(/^\[.\]\s*/, '').replace(/\s*\[[^\]]+\]/g, '').trim();
    col.cards.push({ text: cardText, tags, session, status: done ? 'done' : blocked ? 'blocked' : 'active', column: col.name });
  }
  return cols;
}

function parseNodeMap(text) {
  const nodes = [], edges = [];
  let seq = 0, currentSession = null;
  const stack = [];
  for (const line of text.split('\n')) {
    if (/^##\s+/.test(line)) {
      const id = ++seq, label = line.replace(/^##\s+/, '').trim();
      currentSession = label;
      nodes.push({ id, label, type: 'session', depth: 0, session: label });
      stack.length = 0; stack.push({ id, depth: 0 }); continue;
    }
    const m = line.match(/^(\s*)[-*]\s+(.+)$/);
    if (!m) continue;
    const depth = m[1].length + 1, raw = m[2].trim();
    const tm = raw.match(/^(\w+):\s*(.+)$/);
    const type = tm ? tm[1].toLowerCase() : 'note', label = tm ? tm[2] : raw;
    const id = ++seq;
    nodes.push({ id, label, type, depth, session: currentSession });
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
    if (stack.length) edges.push({ from: stack[stack.length - 1].id, to: id });
    stack.push({ id, depth });
  }
  const childMap = {}, parentMap = {};
  for (const { from, to } of edges) { (childMap[from] = childMap[from] || []).push(to); parentMap[to] = from; }
  const nodeById = Object.fromEntries(nodes.map(n => [n.id, n]));
  for (const n of nodes) {
    n.childIds = childMap[n.id] || [];
    n.parentId = parentMap[n.id] || null;
    n.parentLabel = n.parentId ? (nodeById[n.parentId]?.label || null) : null;
    n.childLabels = n.childIds.map(id => nodeById[id]?.label).filter(Boolean);
  }
  return { nodes, edges };
}

function parseMemoryEntry(fp) {
  try {
    const text = fs.readFileSync(fp, 'utf8'), fm = {};
    const fmm = text.match(/^---\n([\s\S]+?)\n---/);
    if (fmm) {
      for (const l of fmm[1].split('\n')) { const ci = l.indexOf(':'); if (ci < 0) continue; fm[l.slice(0, ci).trim()] = l.slice(ci + 1).trim().replace(/^["']|["']$/g, ''); }
      const meta = fmm[1].match(/metadata:\s*\n((?:[ \t]{2,}.+\n?)*)/);
      if (meta) { fm.meta = {}; for (const l of meta[1].split('\n')) { const mm = l.match(/^\s+(\w+):\s+(.+)$/); if (mm) fm.meta[mm[1]] = mm[2].trim(); } }
    }
    const body = fmm ? text.slice(fmm[0].length).trim() : text.trim();
    return { name: fm.name || path.basename(fp, '.md'), description: fm.description || '', type: fm.meta?.type || 'note', body };
  } catch { return null; }
}

function loadMemory() {
  if (!fs.existsSync(MEMORY_DIR)) return [];
  return fs.readdirSync(MEMORY_DIR).filter(f => f.endsWith('.md') && f !== 'MEMORY.md')
    .map(f => parseMemoryEntry(path.join(MEMORY_DIR, f))).filter(Boolean)
    .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function getData() {
  return {
    project: path.basename(PROJECT_DIR),
    kanban: fs.existsSync(KANBAN_FILE) ? parseKanban(fs.readFileSync(KANBAN_FILE, 'utf8')) : null,
    nodeMap: fs.existsSync(NODEMAP_FILE) ? parseNodeMap(fs.readFileSync(NODEMAP_FILE, 'utf8')) : null,
    memory: loadMemory(),
    updated: new Date().toLocaleTimeString(),
  };
}

// ─── HTML ─────────────────────────────────────────────────────────────────────
const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>// DS Live</title>

<!-- Cytoscape + dagre layout -->
<script src="https://unpkg.com/cytoscape/dist/cytoscape.min.js"></script>
<script src="https://unpkg.com/dagre@0.8.5/dist/dagre.min.js"></script>
<script src="https://unpkg.com/cytoscape-dagre/cytoscape-dagre.js"></script>
<!-- AutoAnimate — kanban card transitions -->
<script src="https://cdn.jsdelivr.net/npm/@formkit/auto-animate/dist/auto-animate.umd.js"></script>
<!-- GSAP — entrance animations -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>

<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f5f4f2; --panel:#fff; --card:#fff; --border:#e8e5e1;
  --accent:#6c53ee; --text:#1a1817; --muted:#6b7280; --dim:#ccc9c4;
  --sh:0 1px 3px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.05);
  --sh-md:0 4px 16px rgba(0,0,0,.09),0 2px 4px rgba(0,0,0,.06);
  --done:#15803d; --blocked:#dc2626;
}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px}

/* header */
header{display:flex;align-items:center;gap:10px;padding:0 20px;height:46px;background:var(--panel);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;box-shadow:var(--sh)}
.logo{font-family:'SF Mono','Fira Code',monospace;font-weight:700;font-size:14px;color:var(--accent);letter-spacing:-.3px}
.proj-tag{font-size:11px;color:var(--muted);background:var(--bg);padding:2px 8px;border-radius:4px;border:1px solid var(--border)}
.pulse{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:pulse 2.5s infinite;flex-shrink:0}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
nav{display:flex;gap:3px}
nav button{background:none;border:1px solid transparent;color:var(--muted);padding:4px 13px;border-radius:5px;cursor:pointer;font-size:12px;font-weight:500;transition:all .12s}
nav button.active{background:var(--bg);border-color:var(--border);color:var(--text)}
nav button:hover:not(.active){color:var(--text);background:var(--bg)}
.updated{font-size:11px;color:var(--dim);margin-left:auto}

/* shell */
.shell{display:flex;height:calc(100vh - 46px);overflow:hidden}
.view{display:none;flex:1;overflow:auto;padding:20px;min-width:0}
.view.active{display:block}
#nodemap-view.active{display:flex;flex-direction:column;padding:0;overflow:hidden}

/* detail pane */
.dp{width:0;flex-shrink:0;background:var(--panel);border-left:1px solid var(--border);transition:width .22s ease;overflow:hidden;position:relative}
.dp.open{width:360px}
.dp-inner{padding:22px 20px;min-width:360px;overflow-y:auto;height:100%}
.dp-close{position:absolute;top:13px;right:13px;background:none;border:none;cursor:pointer;font-size:20px;color:var(--dim);line-height:1;padding:2px 6px;border-radius:4px;transition:color .1s}
.dp-close:hover{color:var(--text);background:var(--bg)}
.dp-type{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;margin-bottom:8px;display:flex;align-items:center;gap:5px}
.dp-title{font-size:15px;font-weight:600;line-height:1.45;color:var(--text);margin-bottom:16px;padding-right:28px}
.dp-row{display:flex;gap:8px;margin-bottom:9px;font-size:12px;align-items:flex-start}
.dp-lbl{color:var(--muted);min-width:68px;flex-shrink:0;line-height:1.6}
.dp-val{color:var(--text);line-height:1.6}
.dp-hr{height:1px;background:var(--border);margin:14px 0}
.dp-body{font-size:12px;color:var(--muted);line-height:1.75;white-space:pre-wrap;word-break:break-word}
.dp-children{display:flex;flex-direction:column;gap:4px;margin-top:2px}
.dp-child{font-size:11px;color:var(--muted);padding:5px 8px;background:var(--bg);border-radius:4px;border-left:2px solid var(--dim);line-height:1.4}
.tag-pill{display:inline-block;font-size:10px;padding:2px 6px;border-radius:3px;font-family:monospace;background:var(--bg);border:1px solid var(--border);color:var(--muted);margin:1px}
.session-pill{display:inline-block;font-size:10px;padding:2px 7px;border-radius:3px;background:rgba(108,83,238,.09);border:1px solid rgba(108,83,238,.18);color:var(--accent);margin:1px}

/* empty */
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:55%;gap:8px;color:var(--dim)}
.empty-icon{font-size:28px;opacity:.4}
.empty p{font-size:12px;color:var(--muted)}

/* kanban */
.kanban{display:flex;gap:16px;align-items:flex-start}
.k-col{flex:1;min-width:200px;background:var(--bg);border-radius:10px;border:1px solid var(--border);overflow:hidden}
.k-head{padding:10px 14px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:8px;background:var(--panel);border-bottom:1px solid var(--border)}
.k-cnt{background:var(--bg);color:var(--muted);padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600;border:1px solid var(--border)}
.k-body{padding:10px;display:flex;flex-direction:column;gap:8px;min-height:52px}
.k-card{background:var(--card);border-radius:8px;padding:11px 13px;border:1px solid var(--border);border-left:3px solid var(--dim);cursor:pointer;transition:box-shadow .15s,transform .12s;box-shadow:var(--sh)}
.k-card:hover{box-shadow:var(--sh-md);transform:translateY(-2px)}
.k-card.sel{outline:2px solid var(--accent);outline-offset:1px;box-shadow:var(--sh-md)}
.k-card.active{border-left-color:var(--accent)}
.k-card.done{border-left-color:var(--done);opacity:.6}
.k-card.blocked{border-left-color:var(--blocked)}
.k-text{font-size:12.5px;line-height:1.55;color:var(--text);font-weight:450}
.k-card.done .k-text{text-decoration:line-through;color:var(--muted)}
.k-meta{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}

/* node map */
.nm-toolbar{display:flex;align-items:center;gap:6px;padding:11px 16px;border-bottom:1px solid var(--border);background:var(--panel);flex-shrink:0}
.nm-toolbar span{font-size:11px;color:var(--muted);font-weight:500}
.nm-tb-btn{background:none;border:1px solid var(--border);color:var(--muted);padding:4px 12px;border-radius:5px;cursor:pointer;font-size:11px;transition:all .12s}
.nm-tb-btn.active{background:var(--bg);border-color:var(--dim);color:var(--text);font-weight:500}
#cy-container{flex:1;min-height:0;background:var(--bg)}

/* node map list view */
.nm-scroll{flex:1;overflow:auto;padding:20px 24px}
.nm-list{display:flex;flex-direction:column;gap:1px}
.nm-list-session{margin-top:22px;margin-bottom:6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--muted);padding-bottom:5px;border-bottom:1px solid var(--border)}
.nm-list-session:first-child{margin-top:0}
.nm-list-item{display:flex;align-items:flex-start;gap:8px;padding:7px 10px;border-radius:6px;cursor:pointer;transition:background .1s}
.nm-list-item:hover{background:var(--bg)}
.nm-list-item.sel{background:rgba(108,83,238,.07)}
.nm-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px;border:1.5px solid}
.nm-item-type{font-size:9px;font-weight:700;margin-right:3px;text-transform:uppercase;letter-spacing:.4px}
.nm-item-label{font-size:12px;color:var(--text);line-height:1.5}

/* memory */
.mem-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:10px;align-content:start}
.mem-sec{grid-column:1/-1;margin-top:20px;margin-bottom:4px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);padding-bottom:6px;border-bottom:1px solid var(--border)}
.mem-sec:first-child{margin-top:0}
.mem-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:13px 14px;cursor:pointer;transition:box-shadow .15s,transform .12s;box-shadow:var(--sh)}
.mem-card:hover{box-shadow:var(--sh-md);transform:translateY(-1px)}
.mem-card.sel{outline:2px solid var(--accent);outline-offset:1px;box-shadow:var(--sh-md)}
.mb{font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;text-transform:uppercase;letter-spacing:.6px;display:inline-block;margin-bottom:7px}
.mb-feedback{background:rgba(234,88,12,.1);color:#c2410c}
.mb-user{background:rgba(6,182,212,.1);color:#0e7490}
.mb-project{background:rgba(124,58,237,.1);color:#6d28d9}
.mb-reference{background:rgba(16,185,129,.1);color:#047857}
.mb-note{background:rgba(107,114,128,.1);color:#4b5563}
.mem-name{font-size:12px;font-weight:500;color:var(--text);line-height:1.4}
.mem-desc{font-size:11px;color:var(--muted);margin-top:4px;line-height:1.5}

/* cy tooltip */
.cy-tip{position:fixed;background:#1a1817;color:#fff;font-size:11px;padding:5px 9px;border-radius:5px;pointer-events:none;display:none;z-index:9999;white-space:nowrap;max-width:320px;box-shadow:0 2px 8px rgba(0,0,0,.25)}

::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
</style>
</head>
<body>
<div class="cy-tip" id="cy-tip"></div>

<header>
  <span class="logo">// DS LIVE</span>
  <span class="proj-tag" id="proj-name">loading…</span>
  <div class="pulse"></div>
  <nav>
    <button class="active" onclick="switchTab('kanban')">Kanban</button>
    <button onclick="switchTab('nodemap')">Node Map</button>
    <button onclick="switchTab('memory')">Memory</button>
  </nav>
  <span class="updated" id="updated"></span>
</header>

<div class="shell">
  <div id="kanban-view" class="view active"></div>
  <div id="nodemap-view" class="view"></div>
  <div id="memory-view" class="view"></div>
  <div class="dp" id="dp">
    <button class="dp-close" onclick="closeDetail()">×</button>
    <div class="dp-inner" id="dp-inner"></div>
  </div>
</div>

<script>
// ─── State ────────────────────────────────────────────────────────────────────
let state = null, activeTab = 'kanban', nmMode = 'graph', selId = null;

const TC = {session:'#2563eb',decision:'#d97706',artifact:'#15803d',task:'#7c3aed',thinking:'#9ca3af',note:'#c9c5bf',feedback:'#ea580c',user:'#0891b2',project:'#7c3aed',reference:'#059669'};
const TI = {session:'◎',decision:'◆',artifact:'●',task:'◈',thinking:'◌',note:'○'};
// Node shapes for Cytoscape
const TS = {session:'ellipse',decision:'diamond',artifact:'round-rectangle',task:'hexagon',thinking:'ellipse',note:'ellipse'};

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function switchTab(tab) {
  activeTab = tab;
  closeDetail();
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById(tab + '-view').classList.add('active');
  document.querySelectorAll('nav button')[['kanban','nodemap','memory'].indexOf(tab)].classList.add('active');
  if (tab === 'nodemap' && state?.nodeMap) renderNodeMap();
}

// ─── Detail pane ──────────────────────────────────────────────────────────────
function openDetail(inner, id) {
  selId = id;
  document.getElementById('dp-inner').innerHTML = inner;
  document.getElementById('dp').classList.add('open');
  document.querySelectorAll('.sel').forEach(el => el.classList.remove('sel'));
  if (id) document.querySelectorAll('[data-sel="' + id + '"]').forEach(el => el.classList.add('sel'));
  // Animate pane content in
  if (typeof gsap !== 'undefined') {
    gsap.fromTo('#dp-inner > *', { opacity: 0, x: 14 }, { opacity: 1, x: 0, stagger: 0.04, duration: 0.22, ease: 'power2.out' });
  }
}

function closeDetail() {
  selId = null;
  document.getElementById('dp').classList.remove('open');
  document.querySelectorAll('.sel').forEach(el => el.classList.remove('sel'));
  if (window._cy) window._cy.elements().unselect();
}
document.addEventListener('keydown', e => e.key === 'Escape' && closeDetail());

function mkDetail(type, title, rows, body) {
  const color = TC[type] || '#888', icon = TI[type] || '○';
  const rowsHtml = rows.filter(r => r[1]).map(([lbl, val, raw]) =>
    \`<div class="dp-row"><span class="dp-lbl">\${lbl}</span><span class="dp-val">\${raw ? val : esc(String(val))}</span></div>\`
  ).join('');
  return \`
    <div class="dp-type" style="color:\${color}">\${icon} \${type}</div>
    <div class="dp-title">\${esc(title)}</div>
    \${rowsHtml}
    \${body ? \`<div class="dp-hr"></div><div class="dp-body">\${esc(body)}</div>\` : ''}
  \`;
}

// ─── Kanban ───────────────────────────────────────────────────────────────────
function renderKanban(cols) {
  const el = document.getElementById('kanban-view');
  if (!cols?.length) { el.innerHTML = \`<div class="empty"><div class="empty-icon">□</div><p>No kanban.md — DS creates it on first task.</p></div>\`; return; }
  el.innerHTML = '<div class="kanban">' + cols.map(col => \`
    <div class="k-col">
      <div class="k-head">\${col.name}<span class="k-cnt">\${col.cards.length}</span></div>
      <div class="k-body" data-col="\${esc(col.name)}">
        \${col.cards.map((card, i) => {
          const id = 'k-' + col.name + '-' + i;
          return \`<div class="k-card \${card.status}" data-sel="\${id}" onclick='selectCard(\${JSON.stringify(JSON.stringify(card))}, "\${id}")'>
            <div class="k-text">\${esc(card.text)}</div>
            <div class="k-meta">
              \${card.session ? \`<span class="session-pill">\${esc(card.session)}</span>\` : ''}
              \${card.tags.map(t => \`<span class="tag-pill">\${esc(t)}</span>\`).join('')}
            </div>
          </div>\`;
        }).join('')}
        \${!col.cards.length ? '<div style="font-size:11px;color:var(--dim);padding:2px 0">—</div>' : ''}
      </div>
    </div>
  \`).join('') + '</div>';

  // AutoAnimate on each column body
  if (typeof autoAnimate !== 'undefined') {
    document.querySelectorAll('.k-body').forEach(el => autoAnimate(el));
  }
  // GSAP entrance for columns
  if (typeof gsap !== 'undefined') {
    gsap.from('.k-col', { opacity: 0, y: 16, stagger: 0.07, duration: 0.35, ease: 'power2.out', clearProps: 'all' });
  }
}

function selectCard(cardJson, id) {
  const c = JSON.parse(cardJson);
  const tagsHtml = c.tags.length ? c.tags.map(t => \`<span class="tag-pill">\${esc(t)}</span>\`).join(' ') : null;
  openDetail(mkDetail(
    c.status === 'done' ? 'artifact' : c.status === 'blocked' ? 'blocked' : 'task',
    c.text,
    [['column', c.column], ['status', c.status], ['session', c.session], ['refs', tagsHtml, true]],
    null
  ), id);
}

// ─── Node Map ─────────────────────────────────────────────────────────────────
function renderNodeMap() {
  if (nmMode === 'graph') renderNmGraph();
  else renderNmList();
}

function setNmMode(mode) {
  nmMode = mode;
  document.querySelectorAll('.nm-tb-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('nm-btn-' + mode)?.classList.add('active');
  renderNodeMap();
}

function nmToolbar(activeMode) {
  return \`<div class="nm-toolbar">
    <span>Node Map</span>
    <button class="nm-tb-btn\${activeMode==='graph'?' active':''}" id="nm-btn-graph" onclick="setNmMode('graph')">● Nodes</button>
    <button class="nm-tb-btn\${activeMode==='list'?' active':''}" id="nm-btn-list" onclick="setNmMode('list')">≡ List</button>
  </div>\`;
}

// ── Cytoscape graph ───────────────────────────────────────────────────────────
function renderNmGraph() {
  const container = document.getElementById('nodemap-view');
  const data = state?.nodeMap;

  if (typeof cytoscape === 'undefined') {
    container.innerHTML = nmToolbar('graph') + \`<div class="empty"><p>Loading Cytoscape…</p></div>\`;
    return;
  }
  if (!data?.nodes.length) {
    container.innerHTML = nmToolbar('graph') + \`<div class="empty"><div class="empty-icon">◉</div><p>No node-map.md — DS seeds it on every new project.</p></div>\`;
    return;
  }

  container.innerHTML = nmToolbar('graph') + \`<div id="cy-container"></div>\`;

  // Destroy previous instance
  if (window._cy) { window._cy.destroy(); window._cy = null; }

  // Build elements
  const nodeSizes = { session: 30, decision: 22, artifact: 24, task: 22, thinking: 18, note: 18 };
  const elements = [];
  for (const n of data.nodes) {
    const color = TC[n.type] || '#9ca3af';
    const isSession = n.type === 'session';
    const maxLen = isSession ? 22 : 20;
    const truncLabel = n.label.length > maxLen ? n.label.slice(0, maxLen - 1) + '…' : n.label;
    const label = isSession ? truncLabel : n.type.slice(0, 5) + ' ' + truncLabel;
    const sz = nodeSizes[n.type] || 18;
    elements.push({ data: { id: 'n' + n.id, label, fullLabel: n.label, type: n.type, color, nmId: n.id, w: sz, h: n.type === 'artifact' ? sz * 0.65 : sz, hw: sz * 1.12, hh: (n.type === 'artifact' ? sz * 0.65 : sz) * 1.12 } });
  }
  for (const e of data.edges) {
    elements.push({ data: { id: 'e' + e.from + '-' + e.to, source: 'n' + e.from, target: 'n' + e.to } });
  }

  window._cy = cytoscape({
    container: document.getElementById('cy-container'),
    elements,
    style: [
      {
        selector: 'node',
        style: {
          'background-color': 'data(color)', 'background-opacity': 0.13,
          'border-color': 'data(color)', 'border-width': 1.8,
          'shape': 'ellipse', 'width': 'data(w)', 'height': 'data(h)',
          'label': 'data(label)', 'color': '#374151',
          'font-size': '11px', 'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          'text-valign': 'center', 'text-halign': 'right',
          'text-margin-x': 10, 'text-margin-y': 0,
          'text-wrap': 'none', 'min-zoomed-font-size': '7px',
          'overlay-padding': 14, 'overlay-opacity': 0,
          'transition-property': 'width height background-opacity',
          'transition-duration': '100ms',
          'opacity': 0,
        }
      },
      {
        selector: 'node[type="session"]',
        style: {
          'border-width': 2.5, 'font-size': '12px', 'font-weight': 700,
          'color': '#1a1817', 'text-valign': 'bottom', 'text-halign': 'center',
          'text-margin-x': 0, 'text-margin-y': 8,
        }
      },
      { selector: 'node[type="decision"]', style: { 'shape': 'diamond', 'color': 'data(color)', 'font-weight': 600 } },
      { selector: 'node[type="artifact"]', style: { 'shape': 'round-rectangle', 'color': 'data(color)', 'font-weight': 600 } },
      { selector: 'node[type="task"]', style: { 'shape': 'hexagon', 'color': 'data(color)', 'font-weight': 600 } },
      { selector: 'node[type="thinking"]', style: { 'color': 'data(color)' } },
      { selector: 'node[type="note"]', style: { 'color': 'data(color)' } },
      {
        selector: '.hovered',
        style: { 'width': 'data(hw)', 'height': 'data(hh)', 'background-opacity': 0.22 }
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'unbundled-bezier', 'target-arrow-shape': 'triangle',
          'target-arrow-color': '#c5bfb8', 'line-color': '#d8d4ce',
          'width': 1.5, 'arrow-scale': 0.8, 'opacity': 0,
        }
      },
      {
        selector: ':selected',
        style: { 'border-color': '#6c53ee', 'border-width': 3.5, 'background-opacity': 0.25, 'background-color': '#6c53ee' }
      },
    ],
    layout: {
      name: typeof cytoscapeDagre !== 'undefined' ? 'dagre' : 'breadthfirst',
      rankDir: 'TB', nodeSep: 52, rankSep: 95, edgeSep: 15, padding: 44, fit: true,
      // breadthfirst fallback
      directed: true, spacingFactor: 1.4,
    },
    userZoomingEnabled: true, userPanningEnabled: true,
    minZoom: 0.2, maxZoom: 4,
    wheelSensitivity: 0.3,
  });

  // Staggered entrance animation by depth
  const depthMap = {};
  for (const n of data.nodes) (depthMap[n.depth] = depthMap[n.depth] || []).push('n' + n.id);
  const depths = Object.keys(depthMap).map(Number).sort((a, b) => a - b);
  depths.forEach((depth, di) => {
    setTimeout(() => {
      window._cy?.nodes(depthMap[depth].map(id => '#' + id).join(',')).animate({ style: { opacity: 1 } }, { duration: 280, easing: 'ease-in-out-sine' });
    }, di * 120 + 80);
  });
  setTimeout(() => {
    window._cy?.edges().animate({ style: { opacity: 1 } }, { duration: 280, easing: 'ease-in-out-sine' });
  }, depths.length * 120 + 200);

  // Click handler
  window._cy.on('tap', 'node', evt => selectNode(evt.target.data('nmId')));

  // Hover: scale 1.12× + tooltip (spec §5.6)
  const tip = document.getElementById('cy-tip');
  window._cy.on('mouseover', 'node', evt => {
    evt.target.addClass('hovered');
    const pos = evt.target.renderedPosition();
    const rect = document.getElementById('cy-container').getBoundingClientRect();
    tip.textContent = evt.target.data('fullLabel');
    tip.style.display = 'block';
    tip.style.left = (rect.left + pos.x + 16) + 'px';
    tip.style.top = (rect.top + pos.y - 36) + 'px';
  });
  window._cy.on('mouseout', 'node', evt => {
    evt.target.removeClass('hovered');
    tip.style.display = 'none';
  });
  window._cy.on('zoom pan', () => { tip.style.display = 'none'; });

  // Store for selectNode
  window._nmNodes = Object.fromEntries(data.nodes.map(n => [n.id, n]));
}

// ── List view ─────────────────────────────────────────────────────────────────
function renderNmList() {
  const container = document.getElementById('nodemap-view');
  const data = state?.nodeMap;
  if (!data?.nodes.length) { container.innerHTML = nmToolbar('list') + \`<div class="empty"><div class="empty-icon">◉</div><p>No node-map.md.</p></div>\`; return; }

  const { nodes, edges } = data;
  const childMap = {}, parentMap = {};
  for (const { from, to } of edges) { (childMap[from] = childMap[from] || []).push(to); parentMap[to] = from; }
  const roots = nodes.filter(n => !parentMap[n.id]);
  const nodeById = Object.fromEntries(nodes.map(n => [n.id, n]));
  const visited = new Set();

  function renderItem(n, depth) {
    if (visited.has(n.id)) return '';
    visited.add(n.id);
    const color = TC[n.type] || '#9ca3af';
    const id = 'nm-' + n.id;
    let html = \`<div class="nm-list-item\${selId === id ? ' sel' : ''}" data-sel="\${id}" style="padding-left:\${10 + depth * 20}px" onclick="selectNode(\${n.id})">
      <div class="nm-dot" style="background:\${color}22;border-color:\${color}"></div>
      <div class="nm-item-label"><span class="nm-item-type" style="color:\${color}">\${n.type} </span>\${esc(n.label)}</div>
    </div>\`;
    for (const cid of (childMap[n.id] || [])) { const c = nodeById[cid]; if (c) html += renderItem(c, depth + 1); }
    return html;
  }

  let listHtml = '<div class="nm-list">';
  for (const root of roots) {
    listHtml += \`<div class="nm-list-session">\${esc(root.label)}</div>\`;
    for (const cid of (childMap[root.id] || [])) { const c = nodeById[cid]; if (c) listHtml += renderItem(c, 0); }
  }
  listHtml += '</div>';

  container.innerHTML = nmToolbar('list') + \`<div class="nm-scroll">\${listHtml}</div>\`;
  window._nmNodes = Object.fromEntries(data.nodes.map(n => [n.id, n]));

  if (typeof gsap !== 'undefined') {
    gsap.from('.nm-list-item', { opacity: 0, x: -10, stagger: 0.015, duration: 0.25, ease: 'power2.out' });
  }
}

function selectNode(id) {
  const n = window._nmNodes?.[id] || state?.nodeMap?.nodes.find(x => x.id === id);
  if (!n) return;
  const childrenHtml = n.childLabels?.length
    ? \`<div class="dp-children">\${n.childLabels.slice(0, 5).map(l => \`<div class="dp-child">\${esc(l)}</div>\`).join('')}\${n.childLabels.length > 5 ? \`<div class="dp-child" style="color:var(--accent)">+\${n.childLabels.length - 5} more</div>\` : ''}</div>\` : null;
  openDetail(mkDetail(n.type, n.label, [
    ['session', n.session],
    ['parent', n.parentLabel],
    ['children', childrenHtml, true],
  ], null), 'nm-' + id);
  if (nmMode === 'graph' && window._cy) {
    window._cy.elements().unselect();
    window._cy.getElementById('n' + id).select();
  }
}

// ─── Memory ───────────────────────────────────────────────────────────────────
function renderMemory(items) {
  const el = document.getElementById('memory-view');
  if (!items?.length) { el.innerHTML = \`<div class="empty"><div class="empty-icon">◈</div><p>Memory directory empty.</p></div>\`; return; }
  const byType = {};
  for (const item of items) (byType[item.type] = byType[item.type] || []).push(item);
  const order = ['feedback','user','project','reference','note'];
  const sorted = [...new Set([...order, ...Object.keys(byType)])].filter(t => byType[t]);
  el.innerHTML = '<div class="mem-grid">' + sorted.map(type => \`
    <div class="mem-sec">\${type}</div>
    \${byType[type].map((item, i) => {
      const id = 'mem-' + type + '-' + i;
      const cleanName = item.name.replace(/_/g,' ').replace(/^(feedback|user|project|reference|note)_?/,'');
      return \`<div class="mem-card" data-sel="\${id}" onclick='selectMem(\${JSON.stringify(JSON.stringify(item))}, "\${id}")'>
        <span class="mb mb-\${type}">\${type}</span>
        <div class="mem-name">\${esc(cleanName)}</div>
        \${item.description ? \`<div class="mem-desc">\${esc(item.description.slice(0, 100))}</div>\` : ''}
      </div>\`;
    }).join('')}
  \`).join('') + '</div>';

  if (typeof gsap !== 'undefined') {
    gsap.from('.mem-card', { opacity: 0, y: 10, stagger: 0.025, duration: 0.3, ease: 'power2.out', clearProps: 'all' });
  }
}

function selectMem(itemJson, id) {
  const item = JSON.parse(itemJson);
  const cleanName = item.name.replace(/_/g,' ').replace(/^(feedback|user|project|reference|note)_?/,'');
  openDetail(mkDetail(item.type, cleanName, [['description', item.description]], item.body), id);
}

// ─── Utils ────────────────────────────────────────────────────────────────────
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ─── Refresh & SSE ────────────────────────────────────────────────────────────
async function refresh() {
  try {
    const res = await fetch('/data');
    state = await res.json();
    document.getElementById('proj-name').textContent = state.project;
    document.getElementById('updated').textContent = 'updated ' + state.updated;
    renderKanban(state.kanban);
    renderMemory(state.memory);
    if (activeTab === 'nodemap') renderNodeMap();
  } catch(e) { console.error('refresh failed', e); }
}
function connectSSE() {
  const es = new EventSource('/events');
  es.onmessage = () => refresh();
  es.onerror = () => { es.close(); setTimeout(connectSSE, 3000); };
}

refresh();
connectSSE();
window.addEventListener('resize', () => {
  if (activeTab === 'nodemap') {
    if (nmMode === 'graph' && window._cy) { window._cy.resize(); window._cy.fit(undefined, 44); }
    else renderNodeMap();
  }
});
</script>
</body>
</html>`;

// ─── HTTP Server ──────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive', 'Access-Control-Allow-Origin': '*' });
    res.write('data: {"type":"connected"}\n\n');
    clients.add(res); req.on('close', () => clients.delete(res)); return;
  }
  if (req.url === '/data') { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(getData())); return; }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(HTML);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  // DS LIVE  →  http://localhost:${PORT}`);
  console.log(`  project:    ${PROJECT_DIR}`);
  console.log(`  memory:     ${MEMORY_DIR}\n`);
  exec(`open http://localhost:${PORT}`);
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') { exec(`open http://localhost:${PORT}`); process.exit(0); }
  console.error(err); process.exit(1);
});

setupWatchers();
