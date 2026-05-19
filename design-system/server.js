/**
 * Duble//Slash — Design System Server
 * Serves the viewer UI and proxies Figma API (CORS-safe).
 * Entry point when the feature boots inside the app.
 */

import express from 'express';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dir, 'data');
const VIEWER = path.join(__dir, 'viewer');
const CONFIG_FILE = path.join(DATA, 'config.json');
const PORT = process.env.DS_PORT ?? 6006;

mkdirSync(path.join(DATA, 'thumbnails'), { recursive: true });

const app = express();
app.use(express.json());
app.use('/data', express.static(DATA));
app.use(express.static(VIEWER));

// ── Config (stored token + last URL) ─────────────────────────────────────────

async function loadConfig() {
  try { return JSON.parse(await fs.readFile(CONFIG_FILE, 'utf8')); } catch { return {}; }
}
async function saveConfig(cfg) {
  await fs.writeFile(CONFIG_FILE, JSON.stringify(cfg, null, 2));
}

app.get('/api/config', async (_, res) => {
  const cfg = await loadConfig();
  res.json({ hasToken: !!cfg.token, lastUrl: cfg.lastUrl ?? null, synced: existsSync(path.join(DATA, 'manifest.json')) });
});

app.post('/api/config', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'token required' });
  const cfg = await loadConfig();
  await saveConfig({ ...cfg, token });
  res.json({ ok: true });
});

// ── Figma sync ────────────────────────────────────────────────────────────────

app.post('/api/sync', async (req, res) => {
  const { figmaUrl } = req.body;
  const cfg = await loadConfig();
  const token = cfg.token;

  if (!token) return res.status(400).json({ error: 'No Figma token saved. Add it in Settings first.' });
  if (!figmaUrl) return res.status(400).json({ error: 'figmaUrl required' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders();

  const emit = (stage, msg, data = {}) => {
    res.write(`data: ${JSON.stringify({ stage, msg, ...data })}\n\n`);
  };

  try {
    const fileKey = parseFileKey(figmaUrl);
    emit('parse', `File key: ${fileKey}`);

    emit('fetch', 'Fetching Figma file…');
    const file = await figmaGet(`/files/${fileKey}?depth=5`, token);
    emit('fetch', `Got: "${file.name}"`, { fileName: file.name });

    emit('tokens', 'Fetching design tokens…');
    let variablesData = { variables: {}, variableCollections: {} };
    try {
      variablesData = await figmaGet(`/files/${fileKey}/variables/local`, token);
    } catch {
      emit('tokens', 'Variables not available (requires Enterprise plan) — skipping.');
    }

    const components = extractComponents(file);
    emit('components', `Found ${components.length} components`);

    const tokens = extractTokens(variablesData);
    emit('tokens', `Found ${tokens.colors.length} colors, ${tokens.spacing.length} spacing`);

    emit('thumbnails', 'Fetching thumbnails…');
    const ids = components.map((c) => c.id);
    const imageMap = ids.length ? await fetchImages(fileKey, ids, token) : {};

    let done = 0;
    for (const comp of components) {
      const url = imageMap[comp.id];
      if (url) {
        comp.thumbnail = await downloadThumbnail(url, comp.id);
        if (comp.thumbnail) done++;
      }
      if (done % 10 === 0 && done > 0) emit('thumbnails', `Downloaded ${done}/${components.length}…`);
    }
    emit('thumbnails', `Done — ${done} thumbnails`);

    const manifest = {
      name: file.name,
      fileKey,
      figmaUrl,
      syncedAt: new Date().toISOString(),
      componentCount: components.length,
      tokenCount: tokens.colors.length + tokens.spacing.length + tokens.other.length,
    };

    await Promise.all([
      fs.writeFile(path.join(DATA, 'components.json'), JSON.stringify(components, null, 2)),
      fs.writeFile(path.join(DATA, 'tokens.json'), JSON.stringify(tokens, null, 2)),
      fs.writeFile(path.join(DATA, 'tokens.css'), generateCss(tokens)),
      fs.writeFile(path.join(DATA, 'manifest.json'), JSON.stringify(manifest, null, 2)),
    ]);

    await saveConfig({ ...cfg, lastUrl: figmaUrl });

    emit('done', 'Sync complete!', { manifest });
    res.end();
  } catch (e) {
    emit('error', e.message);
    res.end();
  }
});

// ── Figma API helpers ─────────────────────────────────────────────────────────

async function figmaGet(path, token) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Figma ${path} → ${res.status}${body ? ': ' + body.slice(0, 200) : ''}`);
  }
  return res.json();
}

async function fetchImages(fileKey, ids, token) {
  const results = {};
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const data = await figmaGet(`/images/${fileKey}?ids=${chunk.join(',')}&format=png&scale=2`, token);
    Object.assign(results, data.images ?? {});
  }
  return results;
}

async function downloadThumbnail(url, id) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const safe = id.replace(/:/g, '-');
    await fs.writeFile(path.join(DATA, 'thumbnails', `${safe}.png`), buf);
    return `data/thumbnails/${safe}.png`;
  } catch { return null; }
}

// ── Figma data extraction ─────────────────────────────────────────────────────

function parseFileKey(url) {
  const m = url.match(/figma\.com\/(?:file|design)\/([A-Za-z0-9_-]+)/);
  if (!m) throw new Error('Could not extract file key from URL');
  return m[1];
}

function walk(node, fn) {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
}

function extractComponents(file) {
  const components = [];
  const meta = file.components ?? {};
  const setMeta = file.componentSets ?? {};
  const seen = new Set();

  walk(file.document, (node) => {
    if (seen.has(node.id)) return;

    if (node.type === 'COMPONENT_SET') {
      seen.add(node.id);
      const m = setMeta[node.id] ?? {};
      const variants = (node.children ?? []).map((c) => ({
        id: c.id,
        name: c.name,
        props: parseVariantProps(c.name),
      }));
      variants.forEach((v) => seen.add(v.id));
      components.push({
        id: node.id,
        name: node.name,
        type: 'COMPONENT_SET',
        description: m.description ?? '',
        group: groupFrom(node.name),
        variantCount: variants.length,
        variants,
        thumbnail: null,
      });
    } else if (node.type === 'COMPONENT') {
      seen.add(node.id);
      const m = meta[node.id] ?? {};
      if (m.containingStateGroup) return;
      components.push({
        id: node.id,
        name: node.name,
        type: 'COMPONENT',
        description: m.description ?? '',
        group: groupFrom(node.name),
        variantCount: 1,
        variants: [],
        thumbnail: null,
      });
    }
  });

  return components;
}

function groupFrom(name) {
  const i = name.indexOf('/');
  return i > 0 ? name.slice(0, i).trim() : 'Components';
}

function parseVariantProps(name) {
  const p = {};
  for (const part of name.split(',')) {
    const [k, v] = part.trim().split('=');
    if (k && v !== undefined) p[k.trim()] = v.trim();
  }
  return p;
}

function extractTokens(data) {
  const { variables = {}, variableCollections = {} } = data;
  const tokens = { colors: [], spacing: [], other: [] };

  for (const v of Object.values(variables)) {
    const col = variableCollections[v.variableCollectionId];
    const modeId = col?.defaultModeId;
    const raw = v.valuesByMode?.[modeId];
    const value = resolveValue(raw, variables);
    const token = {
      id: v.id,
      name: v.name,
      collection: col?.name ?? '',
      type: v.resolvedType,
      value,
      cssVar: '--' + v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    };
    if (v.resolvedType === 'COLOR') tokens.colors.push(token);
    else if (v.resolvedType === 'FLOAT' && /spacing|gap|pad|margin/i.test(v.name)) tokens.spacing.push(token);
    else tokens.other.push(token);
  }

  return tokens;
}

function resolveValue(raw, vars) {
  if (!raw) return null;
  if (raw.type === 'VARIABLE_ALIAS') {
    const ref = vars[raw.id];
    if (!ref) return null;
    const modeId = Object.keys(ref.valuesByMode ?? {})[0];
    return resolveValue(ref.valuesByMode?.[modeId], vars);
  }
  if (raw.r !== undefined) {
    const h = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
    return `#${h(raw.r)}${h(raw.g)}${h(raw.b)}${raw.a < 1 ? h(raw.a) : ''}`;
  }
  return raw;
}

function generateCss(tokens) {
  const lines = [':root {'];
  for (const t of [...tokens.colors, ...tokens.spacing, ...tokens.other]) {
    if (t.value == null) continue;
    const val = typeof t.value === 'number' ? `${t.value}px` : t.value;
    lines.push(`  ${t.cssVar}: ${val};`);
  }
  lines.push('}');
  return lines.join('\n');
}

// ── Boot ──────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Design System  →  http://localhost:${PORT}`);
});
