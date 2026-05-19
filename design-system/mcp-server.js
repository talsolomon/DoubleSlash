#!/usr/bin/env node
/**
 * mcp-server.js — Exposes the synced design system to Claude Code via MCP.
 * Add to Claude Code settings:
 *   "mcpServers": {
 *     "design-system": {
 *       "command": "node",
 *       "args": ["/path/to/design-system/mcp-server.js"]
 *     }
 *   }
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { createInterface } from 'readline';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dir, 'viewer', 'data');

function loadData() {
  const load = (file) => {
    const p = path.join(DATA_DIR, file);
    return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
  };
  return {
    components: load('components.json') ?? [],
    tokens: load('tokens.json') ?? { colors: [], spacing: [], other: [] },
    manifest: load('manifest.json'),
  };
}

// ── MCP protocol (stdio) ──────────────────────────────────────────────────────

const tools = [
  {
    name: 'list_components',
    description: 'List all components in the design system.',
    inputSchema: {
      type: 'object',
      properties: {
        group: { type: 'string', description: 'Optional group/category filter' },
        query: { type: 'string', description: 'Optional search query' },
      },
    },
  },
  {
    name: 'get_component',
    description: 'Get full details for a specific component by name or ID.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Component name (partial match ok)' },
        id: { type: 'string', description: 'Exact component ID' },
      },
    },
  },
  {
    name: 'list_tokens',
    description: 'List design tokens (colors, spacing, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['colors', 'spacing', 'other', 'all'],
          description: 'Token category to list',
        },
        query: { type: 'string', description: 'Optional name filter' },
      },
    },
  },
  {
    name: 'get_token',
    description: 'Get a specific design token by name.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Token name (partial match ok)' },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_design_system_info',
    description: 'Get metadata about the synced design system (name, file, sync date, counts).',
    inputSchema: { type: 'object', properties: {} },
  },
];

function handleTool(name, args) {
  const { components, tokens, manifest } = loadData();

  if (name === 'get_design_system_info') {
    if (!manifest) return { error: 'No design system synced yet. Run: node sync.js <figma-url>' };
    return manifest;
  }

  if (name === 'list_components') {
    let result = components;
    if (args.group) result = result.filter((c) => c.group.toLowerCase().includes(args.group.toLowerCase()));
    if (args.query) result = result.filter((c) => c.name.toLowerCase().includes(args.query.toLowerCase()));
    return result.map((c) => ({
      id: c.id,
      name: c.name,
      group: c.group,
      type: c.type,
      variantCount: c.variantCount,
      description: c.description || undefined,
    }));
  }

  if (name === 'get_component') {
    let comp;
    if (args.id) comp = components.find((c) => c.id === args.id);
    else if (args.name) comp = components.find((c) => c.name.toLowerCase().includes(args.name.toLowerCase()));
    if (!comp) return { error: `Component not found: ${args.name ?? args.id}` };
    return comp;
  }

  if (name === 'list_tokens') {
    const type = args.type ?? 'all';
    let all = [];
    if (type === 'all' || type === 'colors') all = [...all, ...tokens.colors];
    if (type === 'all' || type === 'spacing') all = [...all, ...tokens.spacing];
    if (type === 'all' || type === 'other') all = [...all, ...tokens.other];
    if (args.query) all = all.filter((t) => t.name.toLowerCase().includes(args.query.toLowerCase()));
    return all.map((t) => ({ name: t.name, cssVar: t.cssVar, value: t.value, type: t.type }));
  }

  if (name === 'get_token') {
    const all = [...tokens.colors, ...tokens.spacing, ...tokens.other];
    const token = all.find((t) => t.name.toLowerCase().includes(args.name.toLowerCase()));
    if (!token) return { error: `Token not found: ${args.name}` };
    return token;
  }

  return { error: `Unknown tool: ${name}` };
}

// ── JSON-RPC over stdio ───────────────────────────────────────────────────────

const rl = createInterface({ input: process.stdin });

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

rl.on('line', (line) => {
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    return;
  }

  const { id, method, params } = req;

  if (method === 'initialize') {
    return send({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'design-system', version: '0.1.0' },
      },
    });
  }

  if (method === 'tools/list') {
    return send({ jsonrpc: '2.0', id, result: { tools } });
  }

  if (method === 'tools/call') {
    const { name, arguments: args = {} } = params;
    try {
      const result = handleTool(name, args);
      return send({
        jsonrpc: '2.0',
        id,
        result: {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        },
      });
    } catch (e) {
      return send({
        jsonrpc: '2.0',
        id,
        error: { code: -32603, message: e.message },
      });
    }
  }

  if (method === 'notifications/initialized') return;

  send({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
});
