// Duble//Slash — Design System Viewer

let DS = { components: [], tokens: { colors: [], spacing: [], other: [] }, manifest: null };

// ── Boot ──────────────────────────────────────────────────────────────────────

async function boot() {
  const { hasToken, synced, lastUrl } = await get('/api/config');

  if (!hasToken || !synced) {
    showSetup(lastUrl);
  } else {
    await loadViewer();
  }
}

// ── Setup screen ──────────────────────────────────────────────────────────────

function showSetup(prefillUrl = '') {
  const screen = id('setup-screen');
  screen.hidden = false;

  const tokenInput = id('token-input');
  const urlInput = id('url-input');
  const connectBtn = id('connect-btn');

  if (prefillUrl) urlInput.value = prefillUrl;

  id('token-toggle').addEventListener('click', () => {
    tokenInput.type = tokenInput.type === 'password' ? 'text' : 'password';
  });

  const validate = () => {
    connectBtn.disabled = !tokenInput.value.trim() || !urlInput.value.trim();
  };
  tokenInput.addEventListener('input', validate);
  urlInput.addEventListener('input', validate);

  connectBtn.addEventListener('click', async () => {
    id('setup-error').hidden = true;
    const token = tokenInput.value.trim();
    const figmaUrl = urlInput.value.trim();

    await post('/api/config', { token });
    screen.hidden = true;
    await runSync(figmaUrl);
  });
}

// ── Sync with live progress ───────────────────────────────────────────────────

async function runSync(figmaUrl) {
  const overlay = id('sync-overlay');
  const stageEl = id('sync-stage');
  const logEl = id('sync-log');
  overlay.hidden = false;
  logEl.innerHTML = '';

  return new Promise((resolve) => {
    fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ figmaUrl }),
    }).then((res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';

      const pump = () =>
        reader.read().then(({ value, done }) => {
          if (done) {
            overlay.hidden = true;
            resolve();
            loadViewer();
            return;
          }
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split('\n');
          buf = lines.pop();
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            try {
              const ev = JSON.parse(line.slice(5));
              stageEl.textContent = ev.msg;
              if (ev.stage !== 'done') {
                const row = document.createElement('div');
                row.className = 'sync-log-line';
                row.innerHTML = `<span class="stage-tag">${esc(ev.stage)}</span><span>${esc(ev.msg)}</span>`;
                logEl.appendChild(row);
                logEl.scrollTop = logEl.scrollHeight;
              }
              if (ev.stage === 'error') {
                overlay.hidden = true;
                showError(ev.msg);
                resolve();
              }
            } catch {}
          }
          pump();
        });
      pump();
    });
  });
}

function showError(msg) {
  const el = id('setup-error');
  el.textContent = msg;
  el.hidden = false;
  id('setup-screen').hidden = false;
}

// ── Load viewer data ──────────────────────────────────────────────────────────

async function loadViewer() {
  const [components, tokens, manifest] = await Promise.all([
    fetch('/data/components.json').then((r) => r.json()),
    fetch('/data/tokens.json').then((r) => r.json()),
    fetch('/data/manifest.json').then((r) => r.json()),
  ]);

  DS = { components, tokens, manifest };

  // Inject token CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/data/tokens.css';
  document.head.appendChild(link);

  document.title = manifest.name;
  id('ds-name').textContent = manifest.name;

  const d = new Date(manifest.syncedAt);
  id('synced-at').textContent =
    'Synced ' + d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
    ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  if (manifest.figmaUrl) id('figma-link').href = manifest.figmaUrl;

  id('setup-screen').hidden = true;
  id('sync-overlay').hidden = true;
  id('app').hidden = false;

  renderTree();
  bindEvents();
}

// ── Sidebar tree ──────────────────────────────────────────────────────────────

function renderTree(query = '') {
  const lower = query.toLowerCase();
  const filtered = lower
    ? DS.components.filter((c) => c.name.toLowerCase().includes(lower))
    : DS.components;

  const groups = {};
  for (const c of filtered) (groups[c.group] ??= []).push(c);

  const tree = id('component-tree');
  tree.innerHTML = '';

  for (const [group, items] of Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))) {
    const li = document.createElement('li');
    li.className = 'tree-group';

    const label = document.createElement('div');
    label.className = 'tree-group-label open';
    label.innerHTML =
      `<svg class="tree-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${esc(group)}`;

    const children = document.createElement('ul');
    children.className = 'tree-children';

    for (const comp of items.sort((a, b) => leafName(a).localeCompare(leafName(b)))) {
      const item = document.createElement('li');
      item.className = 'tree-item';
      item.dataset.id = comp.id;
      item.textContent = leafName(comp);
      item.addEventListener('click', () => selectComponent(comp.id));
      children.appendChild(item);
    }

    label.addEventListener('click', () => {
      label.classList.toggle('open');
      children.style.display = label.classList.contains('open') ? '' : 'none';
    });

    li.appendChild(label);
    li.appendChild(children);
    tree.appendChild(li);
  }
}

function leafName(comp) {
  return comp.name.includes('/') ? comp.name.split('/').slice(1).join('/') : comp.name;
}

// ── Component view ────────────────────────────────────────────────────────────

function selectComponent(cid) {
  document.querySelectorAll('.tree-item').forEach((el) => {
    el.classList.toggle('active', el.dataset.id === cid);
  });
  document.querySelectorAll('[data-tab]').forEach((el) => el.classList.remove('active'));

  const comp = DS.components.find((c) => c.id === cid);
  if (!comp) return;

  setBreadcrumb(comp.group, leafName(comp));

  const content = id('canvas-content');
  content.innerHTML =
    `<div class="canvas-title">${esc(leafName(comp))}</div>` +
    (comp.description ? `<div class="canvas-desc">${esc(comp.description)}</div>` : '');

  if (comp.type === 'COMPONENT_SET' && comp.variants.length > 1) {
    const grid = make('div', 'variants-grid');
    for (const v of comp.variants) {
      const card = make('div', 'variant-card');
      const prev = make('div', 'variant-preview');

      if (comp.thumbnail) {
        const img = document.createElement('img');
        img.src = '/' + comp.thumbnail;
        img.alt = v.name;
        img.loading = 'lazy';
        prev.appendChild(img);
      } else {
        prev.innerHTML = '<span class="no-prev">No preview</span>';
      }

      const lbl = make('div', 'variant-label');
      lbl.textContent =
        Object.entries(v.props).map(([k, val]) => `${k}=${val}`).join(', ') || v.name;

      card.appendChild(prev);
      card.appendChild(lbl);
      card.addEventListener('click', () => {
        content.querySelectorAll('.variant-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        showVariantProps(comp, v);
      });
      grid.appendChild(card);
    }
    content.appendChild(grid);
  } else {
    const card = make('div', 'variant-card');
    card.style.maxWidth = '280px';
    const prev = make('div', 'variant-preview');
    if (comp.thumbnail) {
      const img = document.createElement('img');
      img.src = '/' + comp.thumbnail;
      img.alt = comp.name;
      prev.appendChild(img);
    } else {
      prev.innerHTML = '<span class="no-prev">No preview</span>';
    }
    card.appendChild(prev);
    content.appendChild(card);
  }

  showComponentProps(comp);
}

function showComponentProps(comp) {
  id('details-content').innerHTML =
    row('Name', comp.name) +
    row('Type', `<code>${comp.type}</code>`) +
    (comp.variantCount > 1 ? row('Variants', comp.variantCount) : '') +
    (comp.description ? row('Description', comp.description) : '');
}

function showVariantProps(comp, v) {
  const chips = Object.entries(v.props)
    .map(([k, val]) => `<span class="prop-chip"><span class="prop-k">${esc(k)}</span>=<span class="prop-v">${esc(val)}</span></span>`)
    .join('');
  id('details-content').innerHTML =
    row('Variant', v.name) +
    (chips ? row('Properties', chips) : '') +
    row('Component', comp.name);
}

// ── Token views ───────────────────────────────────────────────────────────────

function selectTokenTab(tab) {
  document.querySelectorAll('[data-tab]').forEach((el) => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
  document.querySelectorAll('.tree-item[data-id]').forEach((el) => el.classList.remove('active'));

  const tokens = DS.tokens[tab] ?? [];
  setBreadcrumb('Tokens', tab[0].toUpperCase() + tab.slice(1));

  const content = id('canvas-content');
  content.innerHTML =
    `<div class="canvas-title">${tab[0].toUpperCase() + tab.slice(1)}</div>` +
    `<div class="tokens-meta">${tokens.length} token${tokens.length !== 1 ? 's' : ''}</div>`;

  if (tab === 'colors') {
    const grid = make('div', 'color-grid');
    for (const t of tokens) {
      const card = make('div', 'color-card');
      const hex = typeof t.value === 'string' ? t.value : '#ccc';
      card.innerHTML =
        `<div class="swatch" style="background:${hex}"></div>` +
        `<div class="color-info"><div class="color-name" title="${esc(t.name)}">${esc(t.name.split('/').pop())}</div><div class="color-hex">${esc(hex)}</div></div>`;
      card.addEventListener('click', () => showTokenDetail(t));
      grid.appendChild(card);
    }
    content.appendChild(grid);
  } else {
    const table = document.createElement('table');
    table.className = 'token-table';
    table.innerHTML = '<thead><tr><th>Name</th><th>CSS var</th><th>Value</th></tr></thead>';
    const tbody = document.createElement('tbody');
    for (const t of tokens) {
      const val = typeof t.value === 'number' ? `${t.value}px` : (t.value ?? '—');
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${esc(t.name)}</td><td class="t-var">${esc(t.cssVar)}</td><td class="t-val">${esc(String(val))}</td>`;
      tr.addEventListener('click', () => showTokenDetail(t));
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    content.appendChild(table);
  }

  id('details-content').innerHTML =
    row('Count', tokens.length) +
    row('Usage', 'Import <code>tokens.css</code> and use CSS custom properties.');
}

function showTokenDetail(t) {
  const val = typeof t.value === 'number' ? `${t.value}px` : (t.value ?? '—');
  id('details-content').innerHTML =
    row('Name', t.name) +
    row('CSS var', `<code>${t.cssVar}</code>`) +
    row('Value', `<code>${esc(String(val))}</code>`) +
    row('Collection', t.collection) +
    (t.type === 'COLOR' ? `<div class="d-row"><div class="d-label">Preview</div><div style="height:36px;border-radius:6px;background:${esc(String(val))};border:1px solid var(--border);margin-top:2px"></div></div>` : '');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function id(s) { return document.getElementById(s); }
function make(tag, cls) { const e = document.createElement(tag); if (cls) e.className = cls; return e; }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function row(label, val) { return `<div class="d-row"><div class="d-label">${label}</div><div class="d-val">${val}</div></div>`; }
function setBreadcrumb(a, b) {
  id('breadcrumb').innerHTML = `${esc(a)}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" style="margin:0 4px"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${esc(b)}`;
}

async function get(url) { return fetch(url).then((r) => r.json()); }
async function post(url, body) {
  return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then((r) => r.json());
}

// ── Event wiring ──────────────────────────────────────────────────────────────

function bindEvents() {
  id('search').addEventListener('input', (e) => renderTree(e.target.value));

  document.querySelectorAll('[data-tab]').forEach((el) => {
    el.addEventListener('click', () => selectTokenTab(el.dataset.tab));
  });

  id('resync-btn').addEventListener('click', async () => {
    const { lastUrl } = await get('/api/config');
    if (lastUrl) {
      id('app').hidden = true;
      await runSync(lastUrl);
    }
  });
}

boot();
