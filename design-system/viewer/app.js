// Storybook-like viewer for Duble//Slash design system

let state = {
  components: [],
  tokens: { colors: [], spacing: [], other: [] },
  manifest: null,
  active: null, // { type: 'component' | 'tokens', id?, tab? }
  query: '',
};

// ── Boot ──────────────────────────────────────────────────────────────────────

async function boot() {
  try {
    const [components, tokens, manifest] = await Promise.all([
      fetch('data/components.json').then((r) => r.json()),
      fetch('data/tokens.json').then((r) => r.json()),
      fetch('data/manifest.json').then((r) => r.json()),
    ]);
    state.components = components;
    state.tokens = tokens;
    state.manifest = manifest;

    // Inject design tokens as CSS custom properties
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'data/tokens.css';
    document.head.appendChild(link);

    applyManifest();
    renderSidebar();
    document.getElementById('empty-state').hidden = true;
  } catch {
    document.getElementById('empty-state').hidden = false;
  }
}

function applyManifest() {
  if (!state.manifest) return;
  document.title = state.manifest.name;
  document.getElementById('ds-name').textContent = state.manifest.name;
  const d = new Date(state.manifest.syncedAt);
  document.getElementById('synced-at').textContent =
    'Synced ' + d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  if (state.manifest.figmaUrl) {
    document.getElementById('figma-link').href = state.manifest.figmaUrl;
  }
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function renderSidebar() {
  renderComponentTree(state.query);
}

function renderComponentTree(query = '') {
  const tree = document.getElementById('component-tree');
  const lower = query.toLowerCase();

  const filtered = lower
    ? state.components.filter(
        (c) => c.name.toLowerCase().includes(lower) || c.group.toLowerCase().includes(lower),
      )
    : state.components;

  // Group
  const groups = {};
  for (const c of filtered) {
    (groups[c.group] ??= []).push(c);
  }

  tree.innerHTML = '';

  for (const [group, items] of Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))) {
    const li = document.createElement('li');

    const label = document.createElement('div');
    label.className = 'tree-group-label open';
    label.innerHTML = `
      <svg class="arrow" width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ${esc(group)}
    `;

    const children = document.createElement('ul');
    children.className = 'tree-group-children';

    for (const comp of items.sort((a, b) => a.name.localeCompare(b.name))) {
      const baseName = comp.name.includes('/') ? comp.name.split('/').slice(1).join('/') : comp.name;
      const item = document.createElement('li');
      item.className = 'tree-item';
      item.dataset.id = comp.id;
      item.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        </svg>
        ${esc(baseName)}
      `;
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

// ── Selection ─────────────────────────────────────────────────────────────────

function selectComponent(id) {
  state.active = { type: 'component', id };
  document.querySelectorAll('.tree-item').forEach((el) => {
    el.classList.toggle('active', el.dataset.id === id);
  });
  const comp = state.components.find((c) => c.id === id);
  if (comp) renderComponent(comp);
}

function selectTokenTab(tab) {
  state.active = { type: 'tokens', tab };
  document.querySelectorAll('[data-token-tab]').forEach((el) => {
    el.classList.toggle('active', el.dataset.tokenTab === tab);
  });
  document.querySelectorAll('.tree-item[data-id]').forEach((el) => el.classList.remove('active'));
  renderTokens(tab);
}

// ── Component renderer ────────────────────────────────────────────────────────

function renderComponent(comp) {
  setBreadcrumb(comp.group, comp.name.split('/').pop());

  const content = document.getElementById('canvas-content');
  content.innerHTML = '';

  const header = el('div', 'component-header');
  header.innerHTML = `
    <div class="component-title">${esc(comp.name.split('/').pop())}</div>
    ${comp.description ? `<div class="component-description">${esc(comp.description)}</div>` : ''}
  `;
  content.appendChild(header);

  // Main thumbnail or variants grid
  if (comp.type === 'COMPONENT_SET' && comp.variants.length > 0) {
    const grid = el('div', 'variants-grid');
    for (const v of comp.variants) {
      const card = el('div', 'variant-card');
      const preview = el('div', 'variant-preview');
      if (comp.thumbnail) {
        const img = document.createElement('img');
        img.src = comp.thumbnail;
        img.alt = v.name;
        img.loading = 'lazy';
        preview.appendChild(img);
      } else {
        preview.innerHTML = `<span class="no-thumb">No preview</span>`;
      }
      const labelEl = el('div', 'variant-label');
      labelEl.textContent = Object.entries(v.props).map(([k, val]) => `${k}=${val}`).join(', ') || v.name;
      card.appendChild(preview);
      card.appendChild(labelEl);
      card.addEventListener('click', () => {
        content.querySelectorAll('.variant-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        renderVariantDetails(comp, v);
      });
      grid.appendChild(card);
    }
    content.appendChild(grid);
  } else {
    const card = el('div', 'variant-card');
    card.style.maxWidth = '320px';
    const preview = el('div', 'variant-preview');
    if (comp.thumbnail) {
      const img = document.createElement('img');
      img.src = comp.thumbnail;
      img.alt = comp.name;
      preview.appendChild(img);
    } else {
      preview.innerHTML = `<span class="no-thumb">No preview</span>`;
    }
    card.appendChild(preview);
    content.appendChild(card);
  }

  renderComponentDetails(comp);
}

function renderComponentDetails(comp) {
  const d = document.getElementById('details-content');
  d.innerHTML = `
    <div class="detail-section">
      <div class="detail-label">Name</div>
      <div class="detail-value">${esc(comp.name)}</div>
    </div>
    <div class="detail-section">
      <div class="detail-label">Type</div>
      <div class="detail-value"><code>${comp.type}</code></div>
    </div>
    ${
      comp.variantCount > 1
        ? `<div class="detail-section">
            <div class="detail-label">Variants</div>
            <div class="detail-value">${comp.variantCount}</div>
          </div>`
        : ''
    }
    <div class="detail-section">
      <div class="detail-label">Group</div>
      <div class="detail-value">${esc(comp.group)}</div>
    </div>
    ${
      comp.description
        ? `<div class="detail-section">
            <div class="detail-label">Description</div>
            <div class="detail-value">${esc(comp.description)}</div>
          </div>`
        : ''
    }
  `;
}

function renderVariantDetails(comp, variant) {
  const d = document.getElementById('details-content');
  const propsHtml = Object.entries(variant.props)
    .map(
      ([k, v]) =>
        `<span class="prop-chip"><span class="prop-key">${esc(k)}</span><span class="prop-sep">=</span><span class="prop-val">${esc(v)}</span></span>`,
    )
    .join('');

  d.innerHTML = `
    <div class="detail-section">
      <div class="detail-label">Variant</div>
      <div class="detail-value">${esc(variant.name)}</div>
    </div>
    ${
      Object.keys(variant.props).length
        ? `<div class="detail-section">
            <div class="detail-label">Properties</div>
            <div class="detail-value">${propsHtml}</div>
          </div>`
        : ''
    }
    <div class="detail-section">
      <div class="detail-label">Component</div>
      <div class="detail-value">${esc(comp.name)}</div>
    </div>
    <div class="detail-section">
      <div class="detail-label">ID</div>
      <div class="detail-value"><code>${comp.id}</code></div>
    </div>
  `;
}

// ── Token renderer ────────────────────────────────────────────────────────────

function renderTokens(tab) {
  const tokens = state.tokens[tab] ?? [];
  setBreadcrumb('Tokens', tab.charAt(0).toUpperCase() + tab.slice(1));

  const content = document.getElementById('canvas-content');
  content.innerHTML = '';

  const header = el('div', 'tokens-header');
  header.innerHTML = `
    <div class="tokens-title">${tab.charAt(0).toUpperCase() + tab.slice(1)}</div>
    <div class="tokens-count">${tokens.length} token${tokens.length !== 1 ? 's' : ''}</div>
  `;
  content.appendChild(header);

  if (tab === 'colors') {
    renderColorTokens(tokens, content);
  } else {
    renderGenericTokens(tokens, content);
  }

  document.getElementById('details-content').innerHTML = `
    <div class="detail-section">
      <div class="detail-label">Count</div>
      <div class="detail-value">${tokens.length}</div>
    </div>
    <div class="detail-section">
      <div class="detail-label">Usage</div>
      <div class="detail-value">Import <code>data/tokens.css</code> and use CSS custom properties.</div>
    </div>
  `;
}

function renderColorTokens(tokens, container) {
  if (!tokens.length) {
    container.innerHTML += '<p style="color:var(--text-dim)">No color tokens found.</p>';
    return;
  }
  const grid = el('div', 'color-grid');
  for (const t of tokens) {
    const card = el('div', 'color-card');
    const hex = typeof t.value === 'string' ? t.value : '#ccc';
    card.innerHTML = `
      <div class="color-swatch">
        <div class="color-swatch-inner" style="background:${hex}"></div>
      </div>
      <div class="color-info">
        <div class="color-name" title="${esc(t.name)}">${esc(t.name.split('/').pop())}</div>
        <div class="color-value">${esc(hex)}</div>
      </div>
    `;
    card.addEventListener('click', () => renderTokenDetails(t));
    grid.appendChild(card);
  }
  container.appendChild(grid);
}

function renderGenericTokens(tokens, container) {
  if (!tokens.length) {
    container.innerHTML += '<p style="color:var(--text-dim)">No tokens found.</p>';
    return;
  }
  const table = document.createElement('table');
  table.className = 'token-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>CSS Variable</th>
        <th>Value</th>
      </tr>
    </thead>
  `;
  const tbody = document.createElement('tbody');
  for (const t of tokens) {
    const val = typeof t.value === 'number' ? `${t.value}px` : (t.value ?? '—');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${esc(t.name)}</td>
      <td class="token-css-var">${esc(t.cssVar)}</td>
      <td class="token-val">${esc(String(val))}</td>
    `;
    row.addEventListener('click', () => renderTokenDetails(t));
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  container.appendChild(table);
}

function renderTokenDetails(token) {
  const d = document.getElementById('details-content');
  const val = typeof token.value === 'number' ? `${token.value}px` : (token.value ?? '—');
  d.innerHTML = `
    <div class="detail-section">
      <div class="detail-label">Name</div>
      <div class="detail-value">${esc(token.name)}</div>
    </div>
    <div class="detail-section">
      <div class="detail-label">CSS Variable</div>
      <div class="detail-value"><code>${esc(token.cssVar)}</code></div>
    </div>
    <div class="detail-section">
      <div class="detail-label">Value</div>
      <div class="detail-value"><code>${esc(String(val))}</code></div>
    </div>
    <div class="detail-section">
      <div class="detail-label">Collection</div>
      <div class="detail-value">${esc(token.collection)}</div>
    </div>
    <div class="detail-section">
      <div class="detail-label">Type</div>
      <div class="detail-value"><code>${esc(token.type)}</code></div>
    </div>
    ${
      token.type === 'COLOR'
        ? `<div class="detail-section">
            <div class="detail-label">Preview</div>
            <div style="width:100%;height:40px;border-radius:6px;background:${esc(String(val))};border:1px solid var(--border);margin-top:4px"></div>
          </div>`
        : ''
    }
  `;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function el(tag, className) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  return e;
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setBreadcrumb(group, name) {
  document.getElementById('breadcrumb').innerHTML =
    `<span>${esc(group)}</span>
     <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
     <span>${esc(name)}</span>`;
}

// ── Events ────────────────────────────────────────────────────────────────────

document.getElementById('search').addEventListener('input', (e) => {
  state.query = e.target.value;
  renderComponentTree(state.query);
});

document.querySelectorAll('[data-token-tab]').forEach((el) => {
  el.addEventListener('click', () => selectTokenTab(el.dataset.tokenTab));
});

document.getElementById('sync-btn').addEventListener('click', () => {
  alert('To re-sync, run:\n\nnode sync.js <figma-url>');
});

// ── Start ─────────────────────────────────────────────────────────────────────

boot();
