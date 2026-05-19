#!/usr/bin/env node
/**
 * sync.js — Pull a Figma design system file and generate viewer data.
 * Usage:  node sync.js <figma-url>
 * Needs:  FIGMA_TOKEN env var (Figma personal access token)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dir, 'viewer', 'data');

const token = process.env.FIGMA_TOKEN;
if (!token) {
  console.error('❌  FIGMA_TOKEN is not set. Copy .env.example → .env and fill it in.');
  process.exit(1);
}

const figmaUrl = process.argv[2];
if (!figmaUrl) {
  console.error('❌  Usage: node sync.js <figma-url>');
  process.exit(1);
}

// ── URL parsing ────────────────────────────────────────────────────────────────

function parseUrl(url) {
  const match = url.match(/figma\.com\/(?:file|design)\/([A-Za-z0-9_-]+)/);
  if (!match) throw new Error(`Could not extract file key from: ${url}`);
  const fileKey = match[1];
  const nodeMatch = url.match(/node-id=([^&]+)/);
  const nodeId = nodeMatch ? decodeURIComponent(nodeMatch[1]).replace(/-/g, ':') : null;
  return { fileKey, nodeId };
}

// ── Figma API helpers ──────────────────────────────────────────────────────────

async function figma(path) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) throw new Error(`Figma API ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function fetchImages(fileKey, ids) {
  if (!ids.length) return {};
  const chunks = [];
  for (let i = 0; i < ids.length; i += 50) chunks.push(ids.slice(i, i + 50));
  const results = {};
  for (const chunk of chunks) {
    const data = await figma(`/images/${fileKey}?ids=${chunk.join(',')}&format=png&scale=2`);
    Object.assign(results, data.images ?? {});
  }
  return results;
}

// ── Node traversal ─────────────────────────────────────────────────────────────

function walk(node, fn) {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
}

function extractComponents(file) {
  const components = [];
  const meta = file.components ?? {};
  const setMeta = file.componentSets ?? {};

  walk(file.document, (node) => {
    if (node.type === 'COMPONENT_SET') {
      const m = setMeta[node.id] ?? {};
      components.push({
        id: node.id,
        name: node.name,
        type: 'COMPONENT_SET',
        description: m.description ?? '',
        group: groupFromName(node.name),
        variantCount: (node.children ?? []).length,
        variants: (node.children ?? []).map((c) => ({
          id: c.id,
          name: c.name,
          props: parseVariantProps(c.name),
        })),
        thumbnail: null,
      });
    } else if (node.type === 'COMPONENT' && !meta[node.id]?.containingStateGroup) {
      if (!components.find((c) => c.variants?.some((v) => v.id === node.id))) {
        const m = meta[node.id] ?? {};
        components.push({
          id: node.id,
          name: node.name,
          type: 'COMPONENT',
          description: m.description ?? '',
          group: groupFromName(node.name),
          variantCount: 1,
          variants: [],
          thumbnail: null,
        });
      }
    }
  });

  return components;
}

function groupFromName(name) {
  const slash = name.indexOf('/');
  return slash > 0 ? name.slice(0, slash).trim() : 'Uncategorized';
}

function parseVariantProps(name) {
  const props = {};
  for (const part of name.split(',')) {
    const [k, v] = part.trim().split('=');
    if (k && v) props[k.trim()] = v.trim();
  }
  return props;
}

// ── Token extraction ───────────────────────────────────────────────────────────

function extractTokens(variablesData) {
  const tokens = { colors: [], typography: [], spacing: [], other: [] };
  const { variables = {}, variableCollections = {} } = variablesData;

  for (const [, v] of Object.entries(variables)) {
    const collection = variableCollections[v.variableCollectionId];
    const modeId = collection?.defaultModeId;
    const rawValue = v.valuesByMode?.[modeId];
    const value = resolveValue(rawValue, variables);

    const token = {
      id: v.id,
      name: v.name,
      collection: collection?.name ?? 'Unknown',
      type: v.resolvedType,
      value,
      cssVar: '--' + v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    if (v.resolvedType === 'COLOR') tokens.colors.push(token);
    else if (v.resolvedType === 'FLOAT') {
      const lower = v.name.toLowerCase();
      if (lower.includes('spacing') || lower.includes('gap') || lower.includes('padding') || lower.includes('margin')) {
        tokens.spacing.push(token);
      } else {
        tokens.other.push(token);
      }
    } else {
      tokens.other.push(token);
    }
  }

  return tokens;
}

function resolveValue(raw, variables) {
  if (!raw) return null;
  if (raw.type === 'VARIABLE_ALIAS') {
    const ref = variables[raw.id];
    if (!ref) return null;
    const col = Object.values(variables).find((v) => v.id === raw.id);
    return resolveValue(col?.valuesByMode?.[Object.keys(col.valuesByMode ?? {})[0]], variables);
  }
  if (raw.r !== undefined) {
    return rgbaToHex(raw);
  }
  return raw;
}

function rgbaToHex({ r, g, b, a = 1 }) {
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? hex + toHex(a) : hex;
}

function generateCss(tokens) {
  const lines = [':root {'];
  const all = [...tokens.colors, ...tokens.spacing, ...tokens.other];
  for (const t of all) {
    if (t.value !== null && t.value !== undefined) {
      const val = typeof t.value === 'number' ? `${t.value}px` : t.value;
      lines.push(`  ${t.cssVar}: ${val};`);
    }
  }
  lines.push('}');
  return lines.join('\n');
}

// ── Image downloads ────────────────────────────────────────────────────────────

async function downloadThumbnail(url, id) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const safe = id.replace(/:/g, '-');
    const file = path.join(DATA_DIR, 'thumbnails', `${safe}.png`);
    await fs.writeFile(file, buf);
    return `data/thumbnails/${safe}.png`;
  } catch {
    return null;
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔍  Parsing Figma URL…');
  const { fileKey } = parseUrl(figmaUrl);
  console.log(`📁  File key: ${fileKey}`);

  await fs.mkdir(path.join(DATA_DIR, 'thumbnails'), { recursive: true });

  console.log('📡  Fetching Figma file…');
  const file = await figma(`/files/${fileKey}?depth=5`);
  console.log(`✅  File: "${file.name}"`);

  console.log('🎨  Fetching variables/tokens…');
  let variablesData = { variables: {}, variableCollections: {} };
  try {
    variablesData = await figma(`/files/${fileKey}/variables/local`);
  } catch (e) {
    console.warn('⚠️   Could not fetch variables (may need Enterprise plan):', e.message);
  }

  const components = extractComponents(file);
  console.log(`🧩  Found ${components.length} components`);

  const tokens = extractTokens(variablesData);
  console.log(
    `🎨  Found ${tokens.colors.length} colors, ${tokens.spacing.length} spacing, ${tokens.other.length} other tokens`,
  );

  console.log('🖼️   Fetching thumbnails…');
  const allIds = components.map((c) => c.id);
  const imageMap = await fetchImages(fileKey, allIds);

  let downloaded = 0;
  for (const comp of components) {
    const url = imageMap[comp.id];
    if (url) {
      comp.thumbnail = await downloadThumbnail(url, comp.id);
      if (comp.thumbnail) downloaded++;
    }
  }
  console.log(`🖼️   Downloaded ${downloaded} thumbnails`);

  const css = generateCss(tokens);

  const manifest = {
    name: file.name,
    fileKey,
    figmaUrl,
    syncedAt: new Date().toISOString(),
    componentCount: components.length,
    tokenCount: tokens.colors.length + tokens.spacing.length + tokens.other.length,
  };

  await Promise.all([
    fs.writeFile(path.join(DATA_DIR, 'components.json'), JSON.stringify(components, null, 2)),
    fs.writeFile(path.join(DATA_DIR, 'tokens.json'), JSON.stringify(tokens, null, 2)),
    fs.writeFile(path.join(DATA_DIR, 'tokens.css'), css),
    fs.writeFile(path.join(DATA_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2)),
  ]);

  console.log('\n✨  Sync complete!');
  console.log(`   Components : ${components.length}`);
  console.log(`   Colors     : ${tokens.colors.length}`);
  console.log(`   Spacing    : ${tokens.spacing.length}`);
  console.log(`   Other      : ${tokens.other.length}`);
  console.log('\n👉  Run: npm run view   → opens viewer on http://localhost:6006');
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
